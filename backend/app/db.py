from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os
from dotenv import load_dotenv, dotenv_values 
# loading variables from .env file
load_dotenv()
from datetime import date, datetime

# MongoDB client and database initialization

print(os.getenv("MONGO_URI"))
client = AsyncIOMotorClient(os.getenv("MONGO_URI"))
db = client.mydatabase

def convert_dates(obj):
    """ Recursively convert any datetime.date to datetime.datetime in dicts/lists """
    if isinstance(obj, dict):
        return {k: convert_dates(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_dates(item) for item in obj]
    elif isinstance(obj, date) and not isinstance(obj, datetime):
        # If it's a date (and not already a datetime), convert to datetime
        return datetime.combine(obj, datetime.min.time())
    return obj

def to_object_id(id_str: str):
    return ObjectId(id_str)
