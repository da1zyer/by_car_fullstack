from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support import expected_conditions as EC
import os

def parse_link(link: str):
    """Парсит с объявления на сайте auto.ru название объявления и изображения"""
    selenium_url = os.getenv("SELENIUM_URL", "http://localhost:4444")

    options = Options()
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--no-sandbox")

    try:
        driver = webdriver.Remote(command_executor=selenium_url, options=options)

        driver.get(link)
        wait = WebDriverWait(driver, 15) # ждем загрузку js

        title = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "CardHead__title"))).text # название объявления

        # Переходим на полноразмерные изображения
        front_image = driver.find_element(By.CLASS_NAME, 'ImageGalleryDesktop__image')
        front_image.click()

        # Получаем изображения
        images = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "ImageGalleryFullscreenVertical__image")))

        # Получаем url изображений
        images_urls = [i.get_attribute('src') for i in images]

        return title, images_urls

    except Exception as e:
        print("Произошла ошибка при парсинге: {}".format(e))
        raise

    finally:
        if driver: driver.quit()

if __name__ == '__main__':
    parse_link('https://auto.ru/cars/used/sale/nissan/micra/1128474160-6b00d7eb/')