from pydantic import BaseModel 
from typing import Optional

class OrganizationCreate(BaseModel):
    name: str 
    email: str 
    password: str 
    category: str 

class DepartmentCreate(BaseModel):
    name: str 
    org_id: str
    prefix: str # e.g sara-101

class TokenCreate(BaseModel):
    customer_name: str 
    customer_phone: Optional[str] = None 
    dept_id: str 
    org_id: str 

class TokenResponse(BaseModel):
    token_number: int 
    dept_name: str 
    estimated_wait: int 

class UserLogin(BaseModel):
    email: str 
    password: str 
