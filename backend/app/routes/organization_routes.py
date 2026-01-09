from fastapi import APIRouter , HTTPException , Response
from app.schema.organization_schema import OrganizationCreate
from app.database import org_collection # create connection with mongodb 
from app.utils import get_password_hash , verify_password , create_access_token
from app.utils import find_organization

router = APIRouter()

@router.post("/signup") 
def signup(org: OrganizationCreate):
    existing_user = find_organization(org.user_name)
    if existing_user:
        raise HTTPException(status_code=400 , detail = "user name already exists")
    result = org_collection.insert_one({
        "user_name": org.user_name , 
        "email": org.email , 
        "password": get_password_hash(org.password),
        "category": org.category
    })
    return {
        "message": "organization created successfully",
        "org_id": str(result.inserted_id)
    }

@router.post("/login")
async def login(response: Response,org:OrganizationCreate):
    existing_user = find_organization(org.user_name)
    if not existing_user:
        raise HTTPException(status_code = 401 , detail = "invalid user name or password")
    if not verify_password(org.password , existing_user["password"]):
        raise HTTPException(status_code=401 , detail="invalid user name or password")
    access_token = create_access_token(data={"sub":str(existing_user["_id"])})
    response.set_cookie(
        key = "access_token",
        value= access_token,
        httponly= True , 
        max_age=3600 , 
        samesite="lax",
        secure=False 
    )
    return {"message":"login successful" , "org_name" : existing_user["user_name"] }