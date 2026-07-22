from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database import Base


class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    actor = Column(String, nullable=False)       # e.g. "Ritesh"
    description = Column(String, nullable=False) # e.g. "added Chinese Wok"
    created_at = Column(DateTime, default=datetime.utcnow)