from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)

    # The actual item name, e.g. "Pizza", "Garlic Bread"
    # Indexed because we'll constantly query "find all items with this name"
    # for conflict detection — indexing makes that lookup fast.
    name = Column(String, nullable=False, index=True)

    # This is the foreign key: it stores the id of the company that owns this item.
    # ForeignKey("companies.id") tells SQLAlchemy (and the database itself)
    # that this column must reference a valid row in the companies table.
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=False)

    # This lets us write item.company in Python to get the full Company object
    # back, without writing a manual join query ourselves.
    company = relationship("Company", back_populates="items")