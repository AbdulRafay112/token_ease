from typing import Optional
from pydantic import BaseModel 

class TokenCreate(BaseModel):
    customer_name: str 
    customer_phone: Optional[str] = None 
    dept_id: str 
    org_id: str 

class TokenResponse(BaseModel):
    token_number: int 
    dept_name: str 
    estimated_wait: int 