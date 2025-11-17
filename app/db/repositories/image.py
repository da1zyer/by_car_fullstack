from sqlalchemy.orm import Session
from db.models import Car, Image, User
from services.db import add_to_db
from . import CarRepository

class ImageRepository:

    @staticmethod
    def create_image(db: Session, user: User, car: Car, is_analyzed: bool, url: str | None):
        image = Image(car=car, url=url, is_analyzed=is_analyzed)
        if car.user_id == user.id:
            add_to_db(db, image)
            return image
        else:
            raise Exception

    @staticmethod
    def get_all(db: Session, car: Car):
        return db.query(Image).filter(Image.car_id == car.id)
    
    @staticmethod
    def delete_by_id(db: Session, user: User, id: int):
        image = db.query(Image).filter(Image.id == id).first()
        if not image:
            return 'Изображение не найдено'
        cars = CarRepository.get_all(db, user)
        for car in cars:
            car.id == image.car_id
            db.delete(image)
            db.commit()
            return 'Изображение удалено'
        return 'Изображение не принадлежит пользователю'
