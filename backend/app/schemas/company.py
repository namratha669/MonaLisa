from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.models.company import CompanyStatus


# Shared fields between creating and reading a company.
# Other schemas will inherit from this to avoid repeating fields.
class CompanyBase(BaseModel):
    name: str
    person_in_charge: str
    category: Optional[str] = None
    contact_person: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    status: CompanyStatus = CompanyStatus.NOT_CONTACTED
    offer_amount: float = 0.0
    priority: Optional[str] = None
    notes: Optional[str] = None
    meeting_date: Optional[datetime] = None
    follow_up_date: Optional[datetime] = None


# Used when the frontend sends data to CREATE a new company.
# It only needs what CompanyBase already defines — no id, no timestamps,
# since the database generates those automatically.
class CompanyCreate(CompanyBase):
    pass


# Used when the frontend sends data to UPDATE an existing company.
# Every field is Optional here because an edit might only change
# one field (e.g. just the status) — we don't want to force resending everything.
class CompanyUpdate(BaseModel):
    name: Optional[str] = None
    person_in_charge: Optional[str] = None
    category: Optional[str] = None
    contact_person: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    status: Optional[CompanyStatus] = None
    offer_amount: Optional[float] = None
    priority: Optional[str] = None
    notes: Optional[str] = None
    meeting_date: Optional[datetime] = None
    follow_up_date: Optional[datetime] = None


# Used when sending a company back to the frontend (e.g. in GET requests).
# This includes everything CompanyBase has, PLUS fields the database
# generates itself: id, created_at, updated_at.
class CompanyOut(CompanyBase):
    id: int
    created_at: datetime
    updated_at: datetime

    # This tells Pydantic: "it's okay to build this schema directly from
    # a SQLAlchemy model object, not just from a dictionary."
    # Without this, passing a Company database object to CompanyOut would fail.
    class Config:
        from_attributes = True