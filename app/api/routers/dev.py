from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.session import get_db
from sqlalchemy import text

router = APIRouter()

@router.post("/drop-users-table")
def drop_users_table(db: Session = Depends(get_db)):
    db.execute(text("DROP TABLE Users CASCADE;"))
    db.execute(text("DROP TABLE Cars CASCADE;"))
    db.execute(text("DROP TABLE Images CASCADE;"))
    db.commit()

    return {"status": "tables dropped"}
