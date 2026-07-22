from typing import List

from sqlalchemy.orm import Session

from app.models.company import Company
from app.schemas.company import CompanyCreate, CompanyUpdate
from app.crud.activity import log_activity


def create_company(db: Session, company_data: CompanyCreate) -> Company:
    new_company = Company(**company_data.model_dump())

    db.add(new_company)
    db.commit()
    db.refresh(new_company)

    # Log the creation
    log_activity(
        db,
        actor=new_company.person_in_charge,
        description=f"added {new_company.name}"
    )

    return new_company


def get_companies(db: Session, skip: int = 0, limit: int = 100) -> List[Company]:
    return db.query(Company).offset(skip).limit(limit).all()


def get_company(db: Session, company_id: int) -> Company | None:
    return db.query(Company).filter(Company.id == company_id).first()


def update_company(
    db: Session,
    company_id: int,
    company_data: CompanyUpdate
) -> Company | None:

    company = db.query(Company).filter(Company.id == company_id).first()

    if company is None:
        return None

    update_data = company_data.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(company, field, value)

    db.commit()
    db.refresh(company)

    # Log updates
    if "status" in update_data and update_data["status"] == "confirmed":
        log_activity(
            db,
            actor=company.person_in_charge,
            description=f"confirmed {company.name}"
        )
    else:
        log_activity(
            db,
            actor=company.person_in_charge,
            description=f"updated {company.name}"
        )

    return company


def delete_company(db: Session, company_id: int) -> bool:
    company = db.query(Company).filter(Company.id == company_id).first()

    if company is None:
        return False

    # Log deletion before removing the company
    log_activity(
        db,
        actor=company.person_in_charge,
        description=f"deleted {company.name}"
    )

    db.delete(company)
    db.commit()

    return True