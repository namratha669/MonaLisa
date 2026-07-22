from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List
from app.models.item import Item
from app.schemas.item import ItemCreate


def create_item(db: Session, item_data: ItemCreate) -> Item:
    new_item = Item(**item_data.model_dump())
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item


def get_items_by_company(db: Session, company_id: int) -> List[Item]:
    return db.query(Item).filter(Item.company_id == company_id).all()


def delete_item(db: Session, item_id: int) -> bool:
    item = db.query(Item).filter(Item.id == item_id).first()
    if item is None:
        return False
    db.delete(item)
    db.commit()
    return True


def get_conflicts(db: Session):
    # Find item names that are sold by more than one company.
    conflicting_names = (
        db.query(Item.name)
        .group_by(Item.name)
        .having(func.count(Item.id) > 1)
        .all()
    )

    results = []

    for (name,) in conflicting_names:
        # Get every company selling this conflicting item.
        items = (
            db.query(Item)
            .filter(Item.name == name)
            .all()
        )

        companies = []

        for item in items:
            # Fetch every OTHER item sold by this company,
            # excluding the conflicting item itself.
            other_items = (
                db.query(Item.name)
                .filter(
                    Item.company_id == item.company_id,
                    Item.name != name
                )
                .all()
            )

            companies.append({
                "company_id": item.company.id,
                "company_name": item.company.name,
                "offer_amount": item.company.offer_amount,
                "other_items": [other_item.name for other_item in other_items],
            })

        results.append({
            "item_name": name,
            "companies": companies,
        })

    return results