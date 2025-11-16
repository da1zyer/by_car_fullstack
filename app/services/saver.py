import requests
import os
from db.repositories.car import CarRepository
from db.repositories.user import UserRepository
from db.repositories.image import ImageRepository

def save_images(db, user, car):
    """Сохраняет все изображения из images в /images/user_id/car_id/"""
    save_path = '../../../images/'
    os.makedirs(save_path, exist_ok=True)
    images = ImageRepository.get_all(db=db, car=car)
    for image in images:
        image_url = image.url
        response = requests.get(image_url)
        path = open(save_path + '{}.png'.format(image.id), 'wb')
        path.write(response.content)
        print('Image saved with id={}'.format(image.id))
        path.close()