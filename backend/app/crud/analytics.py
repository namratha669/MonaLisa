from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.company import Company, CompanyStatus


def get_dashboard_stats(db: Session) -> dict:
    total_companies = db.query(func.count(Company.id)).scalar()

    confirmed_count = (
        db.query(func.count(Company.id))
        .filter(Company.status == CompanyStatus.CONFIRMED)
        .scalar()
    )

    pending_count = (
        db.query(func.count(Company.id))
        .filter(Company.status.in_([
            CompanyStatus.NEGOTIATION,
            CompanyStatus.MEETING_SCHEDULED,
            CompanyStatus.FOLLOW_UP_REQUIRED,
        ]))
        .scalar()
    )

    # func.sum() adds up offer_amount only for confirmed companies —
    # this becomes your "Total Sponsorship Value" KPI card.
    total_value = (
        db.query(func.sum(Company.offer_amount))
        .filter(Company.status == CompanyStatus.CONFIRMED)
        .scalar()
    ) or 0.0   # sum() returns None if there are zero matching rows — default to 0

    highest_offer = (
        db.query(func.max(Company.offer_amount)).scalar()
    ) or 0.0

    return {
        "total_companies": total_companies,
        "confirmed_sponsors": confirmed_count,
        "pending_sponsors": pending_count,
        "total_sponsorship_value": total_value,
        "highest_offer": highest_offer,
    }


def get_category_breakdown(db: Session) -> list[dict]:
    # GROUP BY category, summing offer amounts and counting companies per category.
    # This directly feeds your "Offer Amount by Category" chart.
    results = (
        db.query(
            Company.category,
            func.count(Company.id).label("company_count"),
            func.sum(Company.offer_amount).label("total_offer")
        )
        .filter(Company.category.isnot(None))
        .group_by(Company.category)
        .all()
    )

    return [
        {"category": r.category, "company_count": r.company_count, "total_offer": r.total_offer or 0}
        for r in results
    ]


def get_status_distribution(db: Session) -> list[dict]:
    # Powers a pie/donut chart showing how many companies are in each status.
    results = (
        db.query(Company.status, func.count(Company.id).label("count"))
        .group_by(Company.status)
        .all()
    )
    return [{"status": r.status.value, "count": r.count} for r in results]