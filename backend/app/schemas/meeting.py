from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.models.meeting import MeetingStatus


class MeetingBase(BaseModel):
    company_id: int
    meeting_date: datetime
    location: Optional[str] = None
    notes: Optional[str] = None
    status: MeetingStatus = MeetingStatus.UPCOMING


class MeetingCreate(MeetingBase):
    pass


class MeetingOut(MeetingBase):
    id: int
    created_at: datetime
    company_name: str   # added: resolved from the related Company

    class Config:
        from_attributes = True