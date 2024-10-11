from fastapi import FastAPI
from app.routes import admin, user

app = FastAPI()

# Include admin and user routes
app.include_router(admin.router, prefix="/admin")
app.include_router(user.router, prefix="/user")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
