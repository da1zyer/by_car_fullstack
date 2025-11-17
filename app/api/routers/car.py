from fastapi import APIRouter, Depends, Query, UploadFile, File
from core.jwt.auth import get_current_user
from db.repositories import CarRepository
from sqlalchemy.orm import Session
from db.session import get_db
from db.models import User
from services.car import create_car
import services.image as image_service
from schemas.models import CarResponse, CarsResponse, ImagesResponse, ImageResponse

router = APIRouter(prefix='/car', tags=['car'])

@router.post('', response_model=CarResponse)
def add_car(link: str | None = Query(None), title: str | None = Query(None), user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if link:
        car = create_car(user, db, link)
    elif title:
        car = create_car(user, db, title=title)
    
    return {'msg': 'Машина успешно добавлена',
            'id': car.id,
            'url': car.url,
            'title': car.title
    }

@router.get('/get_all', response_model=CarsResponse)
def get_all_cars(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    cars = CarRepository.get_all(db, user)
    car_ids = [car.id for car in cars]

    return {'msg': 'Машины успешно получены',
            'car_ids': car_ids
    }

@router.get('/{id}', response_model=CarResponse)
def get_car(id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    car = CarRepository.get_by_id(db, user, id)

    return {'msg': 'Машина успешно получена',
            'id': car.id,
            'url': car.url,
            'title': car.title
    }

@router.delete('/{id}')
def delete_car(id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    result = CarRepository.delete_by_id(db, user, id)

    return {'msg': result}

@router.post('/{id}', response_model=ImageResponse)
def add_image(id: int, image: UploadFile = File(...), user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    car = CarRepository.get_by_id(db, user, id)
    i = image_service.add_image(db, car, user, image)

    return {'id': i.id}

@router.get('/images/{car_id}', response_model=ImagesResponse)
def get_images(car_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    response_images = image_service.get_images(car_id, user, db)

    return {'msg': 'Изображения успешно получены',
            'images': response_images
    }

@router.delete('/images/{id}')
def delete_image(id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    result = image_service.delete_image(db, user, id)

    return {'msg': result}
