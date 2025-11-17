from sqlalchemy.orm import Session
from db.models import Car, User
from services.db import add_to_db
import services.image

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
    
    @staticmethod
    def delete_by_id(db: Session, user: User, id: int):
        car = db.query(Car).filter(Car.id == id).first()
        if not car:
            return 'Машина не найдена'
        if car.user_id == user.id:
            images = car.images
            for image in images:
                services.image.delete_image(db, user, image.id)
            db.delete(car)
            db.commit()
            return 'Машина удалена'
        else:
            return 'Машина не принадлежит пользователю'
