from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

# MongoDB client and database initialization
client = AsyncIOMotorClient("mongodb://34.171.126.76:27017/")
db = client.mydatabase

def to_object_id(id_str: str):
    return ObjectId(id_str)
