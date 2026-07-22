from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.item import ItemCreate, ItemOut
from app.crud import item as item_crud

router = APIRouter(prefix="/items", tags=["Items"])


@router.post("/", response_model=ItemOut)
def create_item(item: ItemCreate, db: Session = Depends(get_db)):
    return item_crud.create_item(db, item)


@router.get("/company/{company_id}", response_model=List[ItemOut])
def read_items_for_company(company_id: int, db: Session = Depends(get_db)):
    return item_crud.get_items_by_company(db, company_id)


@router.delete("/{item_id}")
def remove_item(item_id: int, db: Session = Depends(get_db)):
    deleted = item_crud.delete_item(db, item_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item deleted successfully"}


@router.get("/conflicts")
def read_conflicts(db: Session = Depends(get_db)):
    return item_crud.get_conflicts(db)