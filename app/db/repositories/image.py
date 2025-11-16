from sqlalchemy.orm import Session
from db.models.car import Car
from db.models.user import User
from db.models.image import Image
from db.repositories.car import CarRepository
from services.db import add_to_db

class ImageRepository:

    @staticmethod
    def create_image(db: Session, car: Car, is_analyzed: bool, url: str):
        image = Image(car=car, url=url, is_analyzed=is_analyzed)
        add_to_db(db, image)
        return image

    @staticmethod
    def get_all(db: Session, car: Car):
        return db.query(Image).filter(Image.car_id == car.id)
    
    @staticmethod
    def delete_by_id(db: Session, image_id: int):
        image = db.query(Image).filter(Image.id == image_id).first()
        if not image:
            return None
        db.delete(image)
        db.commit()
        return True
