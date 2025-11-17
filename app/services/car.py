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
        save_images(db, car)
    
    return car
