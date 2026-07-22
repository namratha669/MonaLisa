import enum
from sqlalchemy import Column, Integer, String, Float, DateTime, Enum, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


# An Enum restricts the "status" column to only these exact values.
# This directly maps to your status color system:
# Grey, Yellow, Blue, Green, Orange, Red
class CompanyStatus(str, enum.Enum):
    NOT_CONTACTED = "not_contacted"
    NEGOTIATION = "negotiation"
    MEETING_SCHEDULED = "meeting_scheduled"
    CONFIRMED = "confirmed"
    FOLLOW_UP_REQUIRED = "follow_up_required"
    REJECTED = "rejected"


class Company(Base):
    __tablename__ = "companies"

    # Primary key: unique ID for every company, auto-increments (1, 2, 3...)
    id = Column(Integer, primary_key=True, index=True)

    # Core spreadsheet columns
    name = Column(String, unique=True, index=True, nullable=False)
    person_in_charge = Column(String, nullable=False)          # who is handling this company
    category = Column(String, nullable=True)         # e.g. "Food", "Tech"
    contact_person = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    email = Column(String, nullable=True)

    status = Column(Enum(CompanyStatus), default=CompanyStatus.NOT_CONTACTED)

    offer_amount = Column(Float, default=0.0)
    priority = Column(String, nullable=True)          # e.g. "High", "Medium", "Low"
    notes = Column(Text, nullable=True)

    meeting_date = Column(DateTime, nullable=True)
    follow_up_date = Column(DateTime, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # This creates a link to the Item table (one company -> many items).
    # "items" isn't a real column in the database — SQLAlchemy uses it to let us
    # write company.items in Python and automatically get all related rows.
    items = relationship("Item", back_populates="company", cascade="all, delete-orphan")