from fastapi import APIRouter, Depends, UploadFile, File
from core.jwt.auth import get_current_user
from db.repositories import CarRepository
from sqlalchemy.orm import Session
from db.session import get_db
from db.models import User
from services.car import create_car
import services.image as image_service
from schemas import *

router = APIRouter(prefix='/car', tags=['car'])

@router.post('', response_model=CarOut)
def add_car(data: CarCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if data.url:
        car = create_car(user, db, data.url)
    elif data.title:
        car = create_car(user, db, title=data.title)

    return CarOut.model_validate(car)

@router.get('/get_all', response_model=list[CarOut])
def get_all_cars(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    cars = CarRepository.get_all(db, user)

    return [CarOut.model_validate(car) for car in cars]

@router.get('/{id}', response_model=CarOut)
def get_car(id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    car = CarRepository.get_by_id(db, user, id)

    return CarOut.model_validate(car)

@router.delete('/{id}')
def delete_car(id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    result = CarRepository.delete_by_id(db, user, id)

    return {'msg': result}

@router.post('/{id}', response_model=ImageOut)
def add_image(id: int, image_file: UploadFile = File(...), user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    car = CarRepository.get_by_id(db, user, id)
    image = image_service.add_image(db, car, user, image_file)

    return ImageOut.model_validate(image)

@router.get('/images/{car_id}', response_model=list[ImageOut])
def get_images(car_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    images = image_service.get_images(car_id, user, db)

    return [ImageOut.model_validate(image) for image in images]

@router.delete('/images/{id}')
def delete_image(id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    result = image_service.delete_image(db, user, id)

    return {'msg': result}
