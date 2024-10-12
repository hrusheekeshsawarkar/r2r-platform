from fastapi import APIRouter, HTTPException
from app.models import UserRegistration, EventProgress
from app.db import db, to_object_id, convert_dates
from datetime import date,datetime


router = APIRouter()

@router.post("/users/register")
async def register_for_event(user_registration: UserRegistration):
    existing_user = await db.user_registrations.find_one({"user_id": user_registration.user_id})
    
    user_data = user_registration.dict()
    user_data = convert_dates(user_data)  # Apply date conversion

    if existing_user:
        # Update registered events
        event_ids = set(existing_user["event_ids"] + user_registration.event_ids)
        await db.user_registrations.update_one(
            {"user_id": user_registration.user_id},
            {"$set": {"event_ids": list(event_ids)}}
        )
    else:
        # Register new user
        # await db.user_registrations.insert_one(user_registration.dict())
        await db.user_registrations.insert_one(user_data)
    
    return {"message": "User registered successfully"}

@router.put("/users/progress")
async def update_progress(user_id: str, event_progress: EventProgress):
    user = await db.user_registrations.find_one({"user_id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    progress_item = event_progress.dict()
    progress_item = convert_dates(progress_item)  # Convert date to datetime
    
    # Update or insert progress for the specified date
    # progress_item = {
    #     "event_id": event_progress.event_id,
    #     "domain": event_progress.domain,
    #     # "date": event_progress.date,
    #     "date": datetime.combine(event_progress.date, datetime.min.time()),  # Combine with minimum time
    #     "progress": event_progress.progress
    # }
    
    # await db.user_registrations.update_one(
    #     {"user_id": user_id, "progress.date": progress_item["date"], "progress.event_id": event_progress.event_id, "progress.domain": event_progress.domain},
    #     {"$set": {"progress.$": progress_item}},
    #     upsert=True
    # )
    # Check if there is already progress for the given date, event, and domain
    result = await db.user_registrations.update_one(
        {"user_id": user_id, 
         "progress.event_id": event_progress.event_id, 
         "progress.date": progress_item["date"], 
         "progress.domain": event_progress.domain},
        {"$set": {"progress.$.progress": event_progress.progress}}
    )
    
    # If no matching progress entry exists, we add a new one
    if result.matched_count == 0:
        await db.user_registrations.update_one(
            {"user_id": user_id},
            {"$push": {"progress": progress_item}}
        )
    
    return {"message": "Progress updated successfully"}

@router.get("/users/{user_id}/events")
async def get_registered_events(user_id: str):
    user = await db.user_registrations.find_one({"user_id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    event_ids = user.get("event_ids", [])
    # events = await db.events.find({"_id": {"$in": [to_object_id(event_id) for event_id in event_ids]}}).to_list(None)
    events = await db.events.find({"id": {"$in": [event_id for event_id in event_ids]}}).to_list(None)
    print(type(events))
     # Remove the `_id` field before returning the response
    for event in events:
        event.pop("_id", None)  # Remove _id if it exists
    
    return events
