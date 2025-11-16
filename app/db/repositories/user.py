from sqlalchemy.orm import Session
from db.models.user import User
from core.jwt.auth import get_password_hash, verify_password
from services.db import add_to_db

class UserRepository:

    @staticmethod
    def create_user(db: Session, username: str, email: str, password: str):
        user = User(username=username, email=email, password_hash=get_password_hash(password))
        add_to_db(db, user)
        return user

    @staticmethod
    def get_by_username(db: Session, username: str):
        return db.query(User).filter(User.username == username).first()
    
    @staticmethod
    def get_by_id(db: Session, user_id: int):
        return db.query(User).filter(User.id == user_id).first()

    @staticmethod
    def authenticate_user(db: Session, username: str, password: str):
        user = UserRepository.get_by_username(db, username)
        if not user:
            return None
        if not verify_password(password, user.password_hash):
            return None
        return user
