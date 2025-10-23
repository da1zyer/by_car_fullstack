from fastapi import FastAPI
from api import router

app = FastAPI(title='by_car_api')

app.include_router(router.router)