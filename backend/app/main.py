from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models import company, item, meeting, activity, user
from app.routers import (
    company as company_router,
    item as item_router,
    meeting as meeting_router,
    activity as activity_router,
    analytics as analytics_router,
    auth as auth_router,
)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="MonaLisa API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(company_router.router)
app.include_router(item_router.router)
app.include_router(meeting_router.router)
app.include_router(activity_router.router)
app.include_router(analytics_router.router)
app.include_router(auth_router.router)

@app.get("/")
def read_root():
    return {"message": "MonaLisa backend is running"}