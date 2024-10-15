from fastapi import APIRouter, HTTPException
from app.models import UserRegistration, EventProgress,UserProgress
from app.db import db, to_object_id, convert_dates
from datetime import date,datetime
from typing import List

router = APIRouter()

def add_domain(event_domains,user_registration,existing_user=None):
    if existing_user:
        new_event_progress=existing_user["progress"]
    else:
        new_event_progress=[]

    for domain in event_domains:
        domain_progress=  {'event_id': user_registration.event_ids[0], 'domain': domain, 'date': date.today(), 'progress': 0.0}
        new_event_progress.append(domain_progress)
    print(new_event_progress)
    return new_event_progress

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

    new_event_progress = add_domain(event_domains,user_registration,existing_user)
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
        await db.user_registrations.insert_one(user_data)
    
    return {"message": "User registered successfully"}

@router.put("/users/progress")
async def update_progress(event_progress: UserProgress):
# async def update_progress(user_id: str,event_id:str, progress: list):
    user = await db.user_registrations.find_one({"user_id": event_progress.user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    event_progress.date = convert_dates(event_progress.date)  # Convert date to datetime
    
    progress_date = await db.user_progress.find_one({"user_id": event_progress.user_id, "event_id": event_progress.event_id,"date": event_progress.date,})

    if not progress_date:
        print("no match")
        # event_progress.date=convert_dates(event_progress.date)
        print(type(event_progress))
        print(event_progress)
        await db.user_progress.insert_one(event_progress.dict())
        return {"message": "Progress updated successfully"}
    else:
        print(event_progress)

        for progress_item in event_progress.progress:
            domain = progress_item.domain
            # date = convert_dates(progress_item.date)
            # event_progress.date = convert_dates(event_progress.date)
            progress_value = progress_item.progress
            print(f"domain: {domain}, progress_value: {progress_value},event_progress.event_id: {event_progress.event_id}, userid: {event_progress.user_id}")

            # result = await db.user_registrations.update_one(
            #     {"user_id": event_progress.user_id, 
            #     "progress.event_id": event_progress.event_id, 
            #     "progress.date": date, 
            #     "progress.domain": domain},
            #     {"$set": {"progress.$.progress": progress_value}}
            # )
                        # Assuming you're using MongoDB, this updates each domain's progress
            result=await db.user_progress.update_one(
                    {"user_id": event_progress.user_id, "event_id": event_progress.event_id,"date": event_progress.date,},
                    {
                        "$set": {
                            f"progress.{domain}": {
                                # "date": date,
                                "progress": progress_value
                            },                       
                        }
                    },
                    upsert=True
                )
            print(result)        
        # result = await db.user_registrations.update_one(
        #     {"user_id": event_progress.user_id, 
        #     "progress.event_id": event_progress.event_id, 
        #     "progress.date": event_progress["date"], 
        #     "progress.domain": event_progress.domain},
        #     {"$set": {"progress.$.progress": event_progress.progress}}
        # )
    
    # # If no matching progress entry exists, we add a new one
        # if result.matched_count == 0:
        #     print("no match")
        #     await db.user_progress.insert_one(event_progress)
        #     break
    
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

@router.get("/users/{user_id}/{event_id}/{progress_date}/progress")
async def get_user_event_progress(user_id: str,event_id: str,progress_date: date):
    user = await db.user_registrations.find_one({"user_id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    date = convert_dates(progress_date)
    event_progress_item = await db.user_progress.find_one({"user_id": user_id,"event_id":event_id,"date":date})
    if event_progress_item:
        print(event_progress_item)
        print(type(event_progress_item))
        event_progress_item.pop("_id", None)
        # for event in event_progress_item:
        #     event.pop("_id", None)  # Remove _id if it exists
        return event_progress_item
    else:
        return "No Progress found for the date"