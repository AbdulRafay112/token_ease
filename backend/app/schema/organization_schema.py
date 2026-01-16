from pydantic import BaseModel

class OrganizationCreate(BaseModel):
    user_name: str 
    email: str 
    password: str 
    category: str 


class OrganizationLogin(BaseModel):
    user_name: str 
    password: str

