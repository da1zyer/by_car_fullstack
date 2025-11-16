# api/routers/dev.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.session import get_db
from db.models.user import User
from db.base import Base
from sqlalchemy import text

router = APIRouter()

@router.post("/drop-users-table")
def drop_users_table(db: Session = Depends(get_db)):
    # вариант 1: через raw SQL
    db.execute(text("DROP TABLE Users CASCADE;"))
    db.execute(text("DROP TABLE Cars CASCADE;"))
    db.execute(text("DROP TABLE Images CASCADE;"))
    db.commit()

    # вариант 2: через SQLAlchemy
    # User.__table__.drop(db.bind)

    return {"status": "users table dropped"}
