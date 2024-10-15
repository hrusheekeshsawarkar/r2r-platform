from pydantic import BaseModel
from typing import List, Optional
from datetime import date, datetime

class Event(BaseModel):
    id: Optional[str]
    name: str
    description: str
    domains: List[str]  # List of domains (e.g., running, cycling, etc.)

class EventProgress(BaseModel):
    event_id: str
    domain: str
    # date: date
    progress: float  # Progress in a particular domain (e.g., distance, time, etc.)
    # def dict(self, *args, **kwargs):
    #     data = super().dict(*args, **kwargs)
    #     # Convert date to datetime
    #     data['date'] = datetime.combine(data['date'], datetime.min.time())
    #     return data


class UserRegistration(BaseModel):
    user_id: str
    event_ids: List[str]  # List of event IDs the user is registered for
    progress: List[EventProgress]  # Track progress of registered events

class UserProgress(BaseModel):
    user_id: str
    event_id: str  # List of event IDs the user is registered for
    date: date
    progress: List[EventProgress]  # Track progress of registered events


    def dict(self, *args, **kwargs):
        data = super().dict(*args, **kwargs)
        # Convert date to datetime
        data['date'] = datetime.combine(data['date'], datetime.min.time())
        return data