# backend/services/output_parser.py

# This script is responsible for converting the raw output from the FET engine
# into a clean, structured JSON format that the frontend can easily understand
# and render. FET can produce several output files; this parser is designed
# to read the primary HTML results, which are human-readable but need to be
# systematically scraped for data.

import os
from typing import Dict, Any, List
from lxml import html

def parse_fet_output(output_dir: str, institution_name: str) -> Dict[str, Any]:
    """
    Parses the generated HTML timetable files from a FET run.

    FET creates a sub-directory for its results. This function locates the
    key HTML file containing the student timetables, scrapes the schedule tables
    for each student group, and structures the data into a nested dictionary.

    Args:
        output_dir: The directory where FET was instructed to save its results.
        institution_name: The name of the institution, used to find the specific
                          results sub-directory created by FET.

    Returns:
        A dictionary containing the parsed schedule or an error message if
        the parsing fails.
    """
    # FET typically creates a results directory named after the input .fet file.
    # e.g., 'My_University_timetables'. We need to replace spaces with underscores
    # to match the filename convention.
    safe_institution_name = institution_name.replace(' ', '_')
    timetable_folder_name = f"{safe_institution_name}_timetables"
    
    # The 'years_days_horizontal.html' file provides the most useful view for parsing.
    students_html_file = os.path.join(output_dir, timetable_folder_name, "years_days_horizontal.html")

    if not os.path.exists(students_html_file):
        error_msg = f"Could not find the expected FET output file at: {students_html_file}"
        print(error_msg)
        return {"error": error_msg}

    print(f"Parsing FET output from: {students_html_file}")
    
    try:
        with open(students_html_file, 'r', encoding='utf-8') as f:
            page = html.fromstring(f.read())
    except Exception as e:
        error_msg = f"Failed to read or parse the HTML file: {e}"
        print(error_msg)
        return {"error": error_msg}

    # This will hold the final structured data, e.g., {'CS-3A': {'Monday': [...], 'Tuesday': [...]}}
    schedule: Dict[str, Dict[str, List[Dict[str, str]]]] = {}
    
    # Timetables are usually preceded by an <h1> tag with the group's name.
    # We find all these headers to iterate through each group's schedule.
    group_headers = page.xpath('//h1')
    
    for header in group_headers:
        group_name = header.text_content().strip()
        if not group_name:
            continue
        
        schedule[group_name] = {}
        
        # The timetable table is the very next element after the <h1> header.
        table = header.getnext()
        if table is None or table.tag != 'table':
            continue

        # Extract days from the table header (thead).
        header_cells = table.xpath('.//thead/tr/th')
        # The first column is 'Time', so we skip it to get the day names.
        days = [day.text_content().strip() for day in header_cells[1:]]

        # Initialize day lists for the current group to ensure all days are present.
        for day in days:
            schedule[group_name][day] = []

        # Process the table body (tbody) for all the scheduled class entries.
        body_rows = table.xpath('.//tbody/tr')
        for row in body_rows:
            cells = row.xpath('.//td')
            if not cells:
                continue
            
            time_slot = cells[0].text_content().strip()
            
            # Iterate through the rest of the cells for each day in the current row.
            for i, day_cell in enumerate(cells[1:]):
                day_name = days[i]
                cell_content = day_cell.text_content().strip()
                
                # If the cell is not empty, it contains class details.
                if cell_content:
                    # FET often formats this with Subject\nTeacher\nRoom.
                    parts = cell_content.splitlines()
                    schedule[group_name][day_name].append({
                        "time": time_slot,
                        "subject": parts[0].strip() if len(parts) > 0 else "N/A",
                        "teacher": parts[1].strip() if len(parts) > 1 else "N/A",
                        "room": parts[2].strip() if len(parts) > 2 else "N/A",
                    })

    if not schedule:
        return {"error": "Could not find any timetable data in the output file. The schedule might be empty or the generation failed."}

    return {"status": "success", "schedule_by_group": schedule}

