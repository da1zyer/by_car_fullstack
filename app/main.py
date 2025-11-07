from fastapi import FastAPI
from api import car_router, auth_router

app = FastAPI(title='by_car_api')

app.include_router(car_router.router)
app.include_router(auth_router.router)