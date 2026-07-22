from fastapi import FastAPI
from app.database import Base, engine
from app.models import company, item, meeting, activity, user
from app.routers import company as company_router
from app.routers import item as item_router
from app.routers import meeting as meeting_router
from app.routers import activity as activity_router
from app.routers import analytics as analytics_router
from app.routers import auth as auth_router
from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all(bind=engine)

app = FastAPI(title="MonaLisa API")

# This line "mounts" all the routes defined in company_router
# onto our main app. Without this line, those routes would exist
# in the file but never actually be reachable.
app.include_router(company_router.router)

@app.get("/")
def read_root():
    return {"message": "MonaLisa backend is running"}

app.include_router(company_router.router)
app.include_router(item_router.router)

Base.metadata.create_all(bind=engine)

app.include_router(company_router.router)
app.include_router(item_router.router)
app.include_router(meeting_router.router)
app.include_router(activity_router.router)
app.include_router(analytics_router.router)
app.include_router(auth_router.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)