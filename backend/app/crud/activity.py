from sqlalchemy.orm import Session
from typing import List
from app.models.activity import Activity


def log_activity(db: Session, actor: str, description: str) -> Activity:
    activity = Activity(actor=actor, description=description)
    db.add(activity)
    db.commit()
    db.refresh(activity)
    return activity


def get_recent_activities(db: Session, limit: int = 10) -> List[Activity]:
    return db.query(Activity).order_by(Activity.created_at.desc()).limit(limit).all()