from typing import Optional
from pydantic import BaseModel 

class TokenCreate(BaseModel):
    token_number: int 
    customer_name: str 
    customer_phone: Optional[str] = None 
    dept_id: str 
    org_id: str 
    status: str 

