from fastapi import APIRouter
from schemas.models import LoginModel, RegisterModel

router = APIRouter(prefix='/auth', tags=['auth'])

@router.post('/login')
def login(request_body: LoginModel):
    return {'response': request_body}

@router.post('/register')
def register(request_body: RegisterModel):
    return {'response': request_body}