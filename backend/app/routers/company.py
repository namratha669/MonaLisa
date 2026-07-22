from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.company import CompanyCreate, CompanyOut, CompanyUpdate
from app.crud import company as company_crud
from app.dependencies import require_role
from app.models.user import UserRole

router = APIRouter(prefix="/companies", tags=["Companies"])


@router.post("/", response_model=CompanyOut)
def create_company(company: CompanyCreate, db: Session = Depends(get_db)):
    return company_crud.create_company(db, company)


@router.get("/", response_model=List[CompanyOut])
def read_companies(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return company_crud.get_companies(db, skip=skip, limit=limit)


@router.get("/{company_id}", response_model=CompanyOut)
def read_company(company_id: int, db: Session = Depends(get_db)):
    company = company_crud.get_company(db, company_id)
    if company is None:
        # HTTPException lets us return a proper error status code (404)
        # instead of crashing or silently returning null.
        raise HTTPException(status_code=404, detail="Company not found")
    return company


@router.put("/{company_id}", response_model=CompanyOut)
def edit_company(company_id: int, company: CompanyUpdate, db: Session = Depends(get_db)):
    updated = company_crud.update_company(db, company_id, company)
    if updated is None:
        raise HTTPException(status_code=404, detail="Company not found")
    return updated


@router.delete("/{company_id}")
def remove_company(
    company_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(require_role(UserRole.ADMIN)),
):
    deleted = company_crud.delete_company(db, company_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Company not found")
    return {"message": "Company deleted successfully"}