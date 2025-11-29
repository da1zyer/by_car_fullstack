from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from db.session import get_db
from db.repositories.user import UserRepository
from db.models import User
from core.jwt.auth import *
from schemas import *

router = APIRouter(prefix='/auth', tags=['auth'])

@router.post("/register", response_model=UserOut)
def register(data: UserCreate, db: Session = Depends(get_db)):
    existing = UserRepository.get_by_username(db, data.username)
    if existing:
        raise HTTPException(status_code=400, detail="Пользователь с таким именем уже существует")
    user = UserRepository.create_user(db, data.username, data.email, data.password)
    return user

@router.post("/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = UserRepository.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60")))
    access_token = create_access_token(subject=str(user.id), expires_delta=access_token_expires)
    
    refresh_token = create_refresh_token(subject=str(user.id))

    return Token(access_token=access_token, refresh_token=refresh_token)


@router.post("/refresh", response_model=Token)
def refresh_token(token_data: TokenRefresh, db: Session = Depends(get_db)):
    user = verify_refresh_token(token_data.refresh_token, db)
    
    access_token_expires = timedelta(minutes=int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60")))
    access_token = create_access_token(subject=str(user.id), expires_delta=access_token_expires)
    
    new_refresh_token = create_refresh_token(subject=str(user.id))

    return Token(access_token=access_token, refresh_token=new_refresh_token)

@router.get("/me", response_model=UserOut)
def get_user(user: User = Depends(get_current_user)):
    return user