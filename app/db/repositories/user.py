from sqlalchemy.orm import Session
from db.models.user import User

class UserRepository:

    @staticmethod
    def create_user(db: Session, username: str, email: str, password: str):
        user = User(username=username, email=email, password=password)
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def get_by_username(db: Session, username: str):
        return db.query(User).filter(User.username == username).first()
