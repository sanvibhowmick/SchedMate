# This script acts as the first line of defense for the timetabling engine.
# Before attempting the complex task of scheduling, this validator performs a series
# of checks for logical impossibilities or "hard constraints". This prevents the
# FET engine from wasting time on a problem that is fundamentally unsolvable.

from typing import List
from backend.models.timetable_schema import TimetableInput

def validate_constraints(data: TimetableInput) -> List[str]:
    """
    Validates hard constraints based on the input data from the frontend.

    This function checks for common-sense issues that would make a timetable
    impossible to generate.

    Args:
        data: A Pydantic TimetableInput object containing all the teachers,
              rooms, subjects, and activities.

    Returns:
        A list of string error messages. If the list is empty,
        the validation has passed.
    """
    errors: List[str] = []

    # --- Create maps for efficient lookups to avoid slow, repetitive searches ---
    room_map = {room.name: room for room in data.rooms}
    group_map = {group.name: group for group in data.student_groups}
    all_teachers_set = {t.name for t in data.teachers}
    all_subjects_set = {s.name for s in data.subjects}
    all_groups_set = {g.name for g in data.student_groups}

    # --- Validation Check 1: Entity Existence ---
    # Ensure every teacher, subject, and group listed in an activity
    # has a corresponding definition in the main lists.
    for i, activity in enumerate(data.activities):
        if activity.teacher not in all_teachers_set:
            errors.append(f"Activity {i+1} ('{activity.subject}'): Teacher '{activity.teacher}' is not defined in the teachers list.")
        if activity.subject not in all_subjects_set:
            errors.append(f"Activity {i+1} (for '{activity.teacher}'): Subject '{activity.subject}' is not defined in the subjects list.")
        if activity.student_group not in all_groups_set:
            errors.append(f"Activity {i+1} ('{activity.subject}'): Student group '{activity.student_group}' is not defined in the student groups list.")

    # --- Validation Check 2: Room Capacity ---
    # Ensure that for every student group, there is at least one room in the
    # institution that is large enough to accommodate them.
    for group in data.student_groups:
        can_fit_anywhere = any(room.capacity >= group.num_students for room in data.rooms)
        if not can_fit_anywhere:
            errors.append(
                f"Student group '{group.name}' with {group.num_students} students cannot fit into any available room. "
                f"The largest room has a capacity of {max(r.capacity for r in data.rooms)}."
            )

    # --- Validation Check 3: Scheduling Volume ---
    # A simple but powerful check to see if the total number of class hours
    # exceeds the total available time slots across all rooms.
    total_activity_hours = sum(act.duration for act in data.activities)
    total_available_slots = len(data.days) * len(data.hours) * len(data.rooms)

    if total_activity_hours > total_available_slots:
        errors.append(
            f"Scheduling is likely impossible. The total required class hours ({total_activity_hours}) "
            f"exceed the total available room slots ({total_available_slots})."
        )

    # If errors were found, print a summary to the server console for debugging.
    if errors:
        print(f"Validator found {len(errors)} potential issues.")
    else:
        print("Validator passed successfully.")

    return errors

