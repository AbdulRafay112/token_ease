from pydantic import BaseModel 
class DepartmentCreate(BaseModel):
    name: str 
    org_id: str
    total_tokens: int 
    current_token: int 
    status: bool 