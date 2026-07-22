from pydantic import BaseModel
from datetime import datetime


class ActivityOut(BaseModel):
    id: int
    actor: str
    description: str
    created_at: datetime

    class Config:
        from_attributes = True