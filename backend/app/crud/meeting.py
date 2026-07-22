from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import List
from app.models.meeting import Meeting
from app.schemas.meeting import MeetingCreate


def create_meeting(db: Session, meeting_data: MeetingCreate) -> dict:
    new_meeting = Meeting(**meeting_data.model_dump())
    db.add(new_meeting)
    db.commit()
    db.refresh(new_meeting)

    return {
        "id": new_meeting.id,
        "company_id": new_meeting.company_id,
        "company_name": new_meeting.company.name,
        "meeting_date": new_meeting.meeting_date,
        "location": new_meeting.location,
        "notes": new_meeting.notes,
        "status": new_meeting.status,
        "created_at": new_meeting.created_at,
    }


def get_meetings(db: Session) -> List[dict]:
    meetings = db.query(Meeting).order_by(Meeting.meeting_date).all()
    # Manually build a dict per meeting, pulling company_name from the
    # relationship (Meeting.company, set up back in Step 12) since
    # company_name isn't a real database column.
    result = []
    for m in meetings:
        result.append({
            "id": m.id,
            "company_id": m.company_id,
            "company_name": m.company.name,
            "meeting_date": m.meeting_date,
            "location": m.location,
            "notes": m.notes,
            "status": m.status,
            "created_at": m.created_at,
        })
    return result

def get_todays_meetings(db: Session) -> List[Meeting]:
    today = datetime.utcnow().date()
    tomorrow = today + timedelta(days=1)
    # filter meetings where meeting_date falls within today's 24-hour window
    return (
        db.query(Meeting)
        .filter(Meeting.meeting_date >= today, Meeting.meeting_date < tomorrow)
        .all()
    )