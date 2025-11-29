import requests
import os
import shutil
import db.repositories as repositories

def get_images(car_id, user, db):
    car = repositories.CarRepository.get_by_id(db, user, car_id)
    images = repositories.ImageRepository.get_all(db=db, car=car)
    response_images = [{'id': image.id, 'url': 'http://localhost:8000/images/{}.png'.format(image.id)} for image in images]
    return response_images

def save_images(db, car):
    """Сохраняет все изображения из images в /images/user_id/car_id/"""
    save_path = '../../../images/'
    os.makedirs(save_path, exist_ok=True)
    images = repositories.ImageRepository.get_all(db=db, car=car)
    for image in images:
        image_url = image.url
        response = requests.get(image_url)
        path = open(save_path + '{}.png'.format(image.id), 'wb')
        path.write(response.content)
        print('Image saved with id={}'.format(image.id))
        path.close()

def add_image(db, car, user, image):
    i = repositories.ImageRepository.create_image(db, user, car, False, None)
    path = '../../../images/{}.png'.format(i.id)
    buffer = open(path, 'wb')
    shutil.copyfileobj(image.file, buffer)
    return i


def delete_image(db, user, id):
    result = repositories.ImageRepository.delete_by_id(db, user, id)
    if result == 'Изображение удалено':
        path = '../../../images/{}.png'.format(id)
        if os.path.exists(path):
            os.remove(path)
    return result
