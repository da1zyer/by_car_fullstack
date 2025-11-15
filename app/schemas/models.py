from pydantic import BaseModel, EmailStr, StrictStr

class LoginModel(BaseModel):
    username: StrictStr
    password: StrictStr

class RegisterModel(BaseModel):
    email: EmailStr
    username: StrictStr
    password: StrictStr