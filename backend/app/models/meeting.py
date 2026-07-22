from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.database import Base


class MeetingStatus(str, enum.Enum):
    UPCOMING = "upcoming"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=False)
    meeting_date = Column(DateTime, nullable=False)
    location = Column(String, nullable=True)
    notes = Column(String, nullable=True)
    status = Column(Enum(MeetingStatus), default=MeetingStatus.UPCOMING)
    created_at = Column(DateTime, default=datetime.utcnow)

    company = relationship("Company")