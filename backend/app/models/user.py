from sqlalchemy import Column, Integer, String, Enum
import enum
from app.database import Base


class UserRole(str, enum.Enum):
    ADMIN = "admin"
    TEAM_LEAD = "team_lead"
    MEMBER = "member"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)

    # We NEVER store the raw password. hashed_password stores the output
    # of a one-way hashing function — it can be verified against, but
    # never reversed back into the original password.
    hashed_password = Column(String, nullable=False)

    role = Column(Enum(UserRole), default=UserRole.MEMBER)