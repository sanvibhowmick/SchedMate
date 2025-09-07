import os
import uuid
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware

# Import Pydantic models and service functions from your other backend files
from models.timetable_schema import TimetableInput
from services.validator import validate_constraints
from services.json_to_fet import generate_fet_xml
from services.fet_runner import run_fet_cli
from services.output_parser import parse_fet_output

# --- 1. Application Initialization ---
# Create an instance of the FastAPI class. This is the core of your API.
app = FastAPI(
    title="SchedMate API",
    description="Backend API to power the SchedMate timetabling application, using FET as the core engine.",
    version="1.0.0"
)

# --- 2. CORS (Cross-Origin Resource Sharing) Configuration ---
# This middleware is essential for allowing your React frontend (which runs on a
# different port, e.g., localhost:5173) to send requests to this backend.
origins = [
    "http://localhost:5173",  # The default URL for a Vite React development server
    "http://127.0.0.1:5173",
    # When you deploy your application, you should add your frontend's public URL here.
    # For example: "https://www.schedmate.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      # Specifies which origins are allowed to make requests.
    allow_credentials=True,     # Allows cookies to be included in requests.
    allow_methods=["*"],        # Allows all HTTP methods (GET, POST, PUT, DELETE, etc.).
    allow_headers=["*"],        # Allows all request headers.
)

# --- 3. Directory Setup ---
# Define the paths for storing FET input and output files and ensure they exist.
FET_INPUT_DIR = os.path.join("fet_data", "input")
FET_OUTPUT_DIR = os.path.join("fet_data", "output")
os.makedirs(FET_INPUT_DIR, exist_ok=True)
os.makedirs(FET_OUTPUT_DIR, exist_ok=True)


# --- 4. API Endpoints ---

@app.get("/", tags=["Health Check"])
def read_root():
    """
    A simple 'health check' endpoint. You can visit this in your browser
    (e.g., http://127.0.0.1:8000/) to confirm that the server is running.
    """
    return {"status": "success", "message": "Welcome to the SchedMate Backend API!"}


@app.post("/generate-timetable", tags=["Timetable Generation"])
async def generate_timetable(data: TimetableInput = Body(...)):
    """
    This is the main endpoint that orchestrates the entire timetable generation process.
    It receives the complete set of constraints from the frontend and returns a generated schedule.
    """
    # Step A: Validate the incoming data against hard-coded rules.
    print("Step 1/4: Validating input data...")
    validation_errors = validate_constraints(data)
    if validation_errors:
        # If there are errors, stop immediately and return a 400 Bad Request error.
        raise HTTPException(
            status_code=400,
            detail={"message": "Invalid input data provided. Please fix the following issues:", "errors": validation_errors}
        )

    # Step B: Convert the validated JSON data into the .fet XML format.
    print("Step 2/4: Generating .fet XML file...")
    # Create a unique ID for this specific request to prevent file name clashes.(concurrency issue)
    session_id = str(uuid.uuid4())
    institution_name_safe = data.institution_name.replace(' ', '_')
    input_filename = f"{institution_name_safe}_{session_id}.fet"
    input_filepath = os.path.join(FET_INPUT_DIR, input_filename)
    
    try:
        generate_fet_xml(data, input_filepath)
    except Exception as e:
        # If XML generation fails, return a 500 Internal Server Error.
        raise HTTPException(status_code=500, detail=f"Failed to generate FET XML file: {e}")

    # Step C: Run the external FET command-line tool.
    print("Step 3/4: Running FET scheduling engine...")
    session_output_dir = os.path.join(FET_OUTPUT_DIR, session_id)
    fet_success = run_fet_cli(input_filepath, session_output_dir)
    
    if not fet_success:
        # If the FET process fails, return a 500 error.
        raise HTTPException(
            status_code=500,
            detail="The FET engine failed to generate a timetable. The constraints may be too restrictive or there might be a configuration issue."
        )

    # Step D: Parse the HTML output from FET back into a clean JSON format.
    print("Step 4/4: Parsing FET output...")
    result = parse_fet_output(session_output_dir, institution_name_safe)
    
    if "error" in result:
        # If parsing fails, return a 500 error.
        raise HTTPException(status_code=500, detail=f"Failed to parse the generated timetable files: {result['error']}")
        
    print("Timetable generation process completed successfully.")
    return result

