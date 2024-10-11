from fastapi import APIRouter, HTTPException
from app.models import Event
from app.db import db, to_object_id

router = APIRouter()

@router.post("/events", response_model=Event)
async def create_event(event: Event):
    event_data = event.dict()
    result = await db.events.insert_one(event_data)
    event.id = str(result.inserted_id)
    return event

@router.put("/events/{event_id}", response_model=Event)
async def update_event(event_id: str, event: Event):
    result = await db.events.update_one({"_id": to_object_id(event_id)}, {"$set": event.dict()})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    return {**event.dict(), "id": event_id}

@router.delete("/events/{event_id}")
async def delete_event(event_id: str):
    result = await db.events.delete_one({"_id": to_object_id(event_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"message": "Event deleted successfully"}
