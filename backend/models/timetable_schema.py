# backend/models/timetable_schema.py

# This file defines the structure and validation rules for the data your API expects.
# It uses Pydantic's `BaseModel` to create clear, concise, and robust data models.
# This ensures that any data coming from the frontend is well-formed before your
# backend logic even begins to process it.

# Corrected: Import Annotated
from pydantic import BaseModel, Field
from typing import List, Optional, Annotated

# --- Core Data Models ---
# These represent the fundamental entities in your timetabling system.

class Teacher(BaseModel):
    """Represents a single teacher."""
    name: str = Field(..., description="The full name of the teacher.")

class Subject(BaseModel):
    """Represents a course or subject."""
    name: str = Field(..., description="The name of the subject (e.g., 'Computer Science 101').")
    credits: int = Field(..., gt=0, description="The number of credit hours for the subject.")

class StudentGroup(BaseModel):
    """Represents a group of students, like a class or a section."""
    name: str = Field(..., description="The unique name for the student group (e.g., 'CS-Section-A').")
    num_students: int = Field(..., gt=0, description="The number of students in the group.")

class Room(BaseModel):
    """Represents a physical room where classes can be held."""
    name: str = Field(..., description="The name or number of the room (e.g., 'Room 301').")
    capacity: int = Field(..., gt=0, description="The maximum number of students the room can hold.")

class Activity(BaseModel):
    """
    Represents a single teaching session that needs to be scheduled.
    This is the core unit of the timetable problem, linking a teacher, subject, and group.
    """
    teacher: str = Field(..., description="The name of the teacher for this activity.")
    subject: str = Field(..., description="The name of the subject being taught.")
    student_group: str = Field(..., description="The student group attending this activity.")
    duration: int = Field(1, gt=0, description="The duration of the activity in hours (default is 1).")

class Constraint(BaseModel):
    """
    Represents a specific rule or constraint, like teacher unavailability.
    This model can be expanded to include many other types of rules.
    """
    teacher: str = Field(..., description="The teacher the constraint applies to.")
    day: str = Field(..., description="The day of the week for the constraint.")
    start_time: str = Field(..., description="The start time of the constrained period.")
    end_time: str = Field(..., description="The end time of the constrained period.")
    constraint_type: str = Field("unavailable", description="The type of constraint (e.g., 'unavailable').")


# --- Main Input Schema ---
# This is the top-level model that the frontend will send to the API.
# It bundles all the other models into a single, cohesive structure.

class TimetableInput(BaseModel):
    """The complete input payload for generating a new timetable."""
    institution_name: str = Field(..., description="The name of the educational institution.")
    
    # Corrected: Use Annotated for validation
    days: Annotated[List[str], Field(min_length=1, description="A list of days to schedule for (e.g., ['Monday', 'Tuesday']).")]
    hours: Annotated[List[str], Field(min_length=1, description="A list of time slots for each day (e.g., ['09:00-10:00', '10:00-11:00']).")]
    
    teachers: List[Teacher]
    subjects: List[Subject]
    student_groups: List[StudentGroup]
    rooms: List[Room]
    activities: List[Activity]
    
    # This field is optional and can be an empty list if there are no specific constraints.
    constraints: Optional[List[Constraint]] = Field([], description="A list of specific constraints to apply.")

