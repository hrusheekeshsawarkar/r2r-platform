from fastapi import APIRouter, HTTPException
from app.models import UserRegistration, EventProgress
from app.db import db, to_object_id
from datetime import date,datetime


router = APIRouter()

@router.post("/users/register")
async def register_for_event(user_registration: UserRegistration):
    existing_user = await db.user_registrations.find_one({"user_id": user_registration.user_id})
    
    if existing_user:
        # Update registered events
        event_ids = set(existing_user["event_ids"] + user_registration.event_ids)
        await db.user_registrations.update_one(
            {"user_id": user_registration.user_id},
            {"$set": {"event_ids": list(event_ids)}}
        )
    else:
        # Register new user
        await db.user_registrations.insert_one(user_registration.dict())
    
    return {"message": "User registered successfully"}

@router.put("/users/progress")
async def update_progress(user_id: str, event_progress: EventProgress):
    user = await db.user_registrations.find_one({"user_id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Update or insert progress for the specified date
    progress_item = {
        "event_id": event_progress.event_id,
        "domain": event_progress.domain,
        # "date": event_progress.date,
        "date": datetime.combine(event_progress.date, datetime.min.time()),  # Combine with minimum time
        "progress": event_progress.progress
    }
    
    await db.user_registrations.update_one(
        {"user_id": user_id, "progress.date": event_progress.date, "progress.event_id": event_progress.event_id, "progress.domain": event_progress.domain},
        {"$set": {"progress.$": progress_item}},
        upsert=True
    )
    
    return {"message": "Progress updated successfully"}

@router.get("/users/{user_id}/events")
async def get_registered_events(user_id: str):
    user = await db.user_registrations.find_one({"user_id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    event_ids = user.get("event_ids", [])
    events = await db.events.find({"_id": {"$in": [to_object_id(event_id) for event_id in event_ids]}}).to_list(None)
    
    return events
