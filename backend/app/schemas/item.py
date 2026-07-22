from pydantic import BaseModel


class ItemBase(BaseModel):
    name: str
    company_id: int


class ItemCreate(ItemBase):
    pass


class ItemOut(ItemBase):
    id: int

    class Config:
        from_attributes = True