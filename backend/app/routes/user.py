from fastapi import APIRouter, HTTPException
from app.models import UserRegistration, EventProgress
from app.db import db, to_object_id, convert_dates
from datetime import date,datetime
from typing import List

router = APIRouter()


@router.post("/users/register")
async def register_for_event(user_registration: UserRegistration):
    existing_user = await db.user_registrations.find_one({"user_id": user_registration.user_id})
    
    user_data = user_registration.dict()
    print(f"user_data_progress: {user_data}")
    print(user_registration.event_ids[0])
    event = await db.events.find_one({"id":user_registration.event_ids[0]})
    print(f"event_domains: {event}")
    event_domains=event["domains"]
    print(f"event_domains: {event_domains}")
    new_event_progress =existing_user["progress"]
    for domain in event_domains:
        domain_progress=  {'event_id': user_registration.event_ids[0], 'domain': domain, 'date': date.today(), 'progress': 0.0}
        new_event_progress.append(domain_progress)
    print(new_event_progress)
    user_data["progress"]=new_event_progress


    user_data = convert_dates(user_data)  # Apply date conversion
    print(f"user_data_progress: {user_data}")

    if existing_user:
        # Update registered events
        event_ids = set(existing_user["event_ids"] + user_registration.event_ids)

        progress = user_data["progress"]
        # progress.append(user_data["progress"])
        await db.user_registrations.update_one(
            {"user_id": user_registration.user_id},
            {"$set": 
                {
                    "event_ids": list(event_ids),
                    "progress": list(progress)
                }
            }
        )
        # pass
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
