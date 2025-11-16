from sqlalchemy.orm import Session
from db.models.car import Car
from db.models.user import User
from services.db import add_to_db

class CarRepository:

    @staticmethod
    def create_car(db: Session, user: User, url: str, title: str):
        car = Car(url = url, user = user, title = title)
        add_to_db(db, car)
        return car

    @staticmethod
    def get_all(db: Session, user: User):
        return db.query(Car).filter(Car.user_id == user.id)
    
    @staticmethod
    def get_by_id(db: Session, user: int, id: int):
        return db.query(Car).filter(Car.user_id == user.id).filter(Car.id == id).first()
