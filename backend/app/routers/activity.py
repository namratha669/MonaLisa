from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.activity import ActivityOut
from app.crud import activity as activity_crud

router = APIRouter(prefix="/activities", tags=["Activities"])


@router.get("/", response_model=List[ActivityOut])
def read_activities(db: Session = Depends(get_db)):
    return activity_crud.get_recent_activities(db)