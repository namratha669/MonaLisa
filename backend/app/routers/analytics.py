from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.crud import analytics as analytics_crud

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/dashboard")
def dashboard_stats(db: Session = Depends(get_db)):
    return analytics_crud.get_dashboard_stats(db)


@router.get("/by-category")
def category_breakdown(db: Session = Depends(get_db)):
    return analytics_crud.get_category_breakdown(db)


@router.get("/status-distribution")
def status_distribution(db: Session = Depends(get_db)):
    return analytics_crud.get_status_distribution(db)