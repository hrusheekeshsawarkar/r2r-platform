from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class Event(BaseModel):
    id: Optional[str]
    name: str
    description: str
    domains: List[str]  # List of domains (e.g., running, cycling, etc.)

class EventProgress(BaseModel):
    event_id: str
    domain: str
    date: date
    progress: float  # Progress in a particular domain (e.g., distance, time, etc.)

class UserRegistration(BaseModel):
    user_id: str
    event_ids: List[str]  # List of event IDs the user is registered for
    progress: List[EventProgress]  # Track progress of registered events
