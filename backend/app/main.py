from fastapi import FastAPI
from app.routes import admin, user
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add the frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)
# Include admin and user routes
app.include_router(admin.router, prefix="/admin")
app.include_router(user.router, prefix="/user")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
