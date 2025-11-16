from fastapi import APIRouter, Depends
from services.parser.main import parse_link
from services.saver import save_images
from core.jwt.auth import get_current_user
from db.repositories.car import CarRepository
from db.repositories.image import ImageRepository
from sqlalchemy.orm import Session
from db.session import get_db
from db.models.user import User
from services.car import add_car

router = APIRouter(prefix='/car', tags=['car'])

@router.post('/add')
def add_car_from_link(link: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    car = add_car(user, db, link)

    return {'msg': 'Машина успешно добавлена',
            'method': 'link',
            'id': car.id,
            'url': car.url,
            'title': car.title
    }

@router.post('/add_manual')
def add_car_manual(title: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    car = add_car(user, db, title=title)

    return {'msg': 'Машина успешно добавлена вручную',
            'method': 'manual',
            'id': car.id,
            'title': car.title
    }

@router.get('/get_all')
def get_all_cars(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    cars = CarRepository.get_all(db, user)
    car_ids = [car.id for car in cars]

    return {'msg': 'Машины успешно получены',
            'car_ids': car_ids}

@router.get('/get')
def get(id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    car = CarRepository.get_by_id(db, user, id)

    return {'msg': 'Машины успешно получены',
            'id': car.id,
            'title': car.title}


@router.get('/get_images')
def get_images(car_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    car = CarRepository.get_by_id(db, user, car_id)
    images = ImageRepository.get_all(db=db, car=car)
    response_images = []
    for image in images:
        response_images.append('localhost:8000/images/{}.png'.format(image.id))
    return {'msg': 'Изображения успешно получены',
            'images': response_images}

@router.post('/add_image')
def add_image(id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    pass

@router.delete('/delete_image')
def delete_image(id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    
    # TODO: удаляется из базы, но не из каталога
    
    result = ImageRepository.delete_by_id(db, id)

    if result:
        return {'msg': 'Изображение удалено'}
    else:
        return {'msg': 'Не удалось удалить изображение'}