from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.models import LoginModel, RegisterModel
from db import get_db
from db.repositories.user import UserRepository

router = APIRouter(prefix='/auth', tags=['auth'])

@router.post('/login')
def login(data: LoginModel, db: Session = Depends(get_db)):
    user = UserRepository.get_by_username(db, data.username)

    if user.password == data.password:
        return {"msg": "logged in", "user_id": user.id}
    return {"msg": "wrong login or password", "user_id": user.id}


@router.post('/register')
def register(data: RegisterModel, db: Session = Depends(get_db)):
    user = UserRepository.get_by_username(db, data.username)

    if user:
        return {"msg": "logged in", "user_id": user.id}

    # если нет — создаём
    new_user = UserRepository.create_user(
        db,
        username=data.username,
        email=data.email,
        password=data.password
    )

    return {"msg": "user created", "user_id": new_user.id}