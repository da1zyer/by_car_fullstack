from services.parser import parse_link
from services.image import save_images
from db.repositories import CarRepository, ImageRepository
from sqlalchemy.orm import Session
from db.models import User

def create_car(user: User, db: Session, link: str = None, title: str = None):
    """
    Создает машину либо из ссылки на auto.ru, при этом сохраняя картинки оттуда,
    либо вручную тольку с названием, без картинок.
    Если передан link: из ссылки
    Если не передан link, но передан title: вручную
    """
    if link:
        title, images_urls = parse_link(link)
    elif not title:
        raise Exception

    car = CarRepository.create_car(db=db, user=user, url=link, title=title)

    if link:
        images = [ImageRepository.create_image(user=user, db=db, car=car, is_analyzed=False, url=url) for url in images_urls]
        save_images(db, car)
    
    return car
