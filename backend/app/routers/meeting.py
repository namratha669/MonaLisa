from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.meeting import MeetingCreate, MeetingOut
from app.crud import meeting as meeting_crud

router = APIRouter(prefix="/meetings", tags=["Meetings"])


@router.post("/", response_model=MeetingOut)
def create_meeting(meeting: MeetingCreate, db: Session = Depends(get_db)):
    return meeting_crud.create_meeting(db, meeting)


@router.get("/", response_model=List[MeetingOut])
def read_meetings(db: Session = Depends(get_db)):
    return meeting_crud.get_meetings(db)


@router.get("/today", response_model=List[MeetingOut])
def read_todays_meetings(db: Session = Depends(get_db)):
    return meeting_crud.get_todays_meetings(db)