from pydantic import BaseModel, EmailStr, StrictStr

class LoginModel(BaseModel):
    login: StrictStr
    password: StrictStr

class RegisterModel(BaseModel):
    email: EmailStr
    login: StrictStr
    password: StrictStr