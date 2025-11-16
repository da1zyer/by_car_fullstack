from fastapi import APIRouter, Depends
from services.parser.main import parse_link
from services.saver import save_images
from core.jwt.auth import get_current_user
from db.repositories.car import CarRepository
from db.repositories.image import ImageRepository
from sqlalchemy.orm import Session
from db.session import get_db
from db.models.user import User

def add_car(user: User, db: Session, link: str = None, title: str = None):
    """
    Добавляет машину либо из ссылки на auto.ru, при этом сохраняя картинки оттуда,
    либо вручную тольку с названием, без картинок.
    Если передан link: из ссылки
    Если не передан link, но передан title: вручную
    """
    images = None
    if link:
        title, images = parse_link(link)
    elif not title:
        raise Exception

    car = CarRepository.create_car(db=db, user=user, url=link, title=title)

    if images:
        response_images = []
        for i in images:
            image = ImageRepository.create_image(db=db, car=car, is_analyzed=False, url=i.get_attribute('src'))
            response_images.append('localhost:8000/images/{}.png'.format(image.id))
        save_images(db, user, car)
    
    return car
