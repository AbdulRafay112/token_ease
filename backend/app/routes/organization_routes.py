from fastapi import APIRouter , HTTPException , Response
from app.schema.organization_schema import OrganizationCreate , OrganizationLogin
from app.database import org_collection # create connection with mongodb 
from app.utils import get_password_hash , verify_password , create_access_token

router = APIRouter()

@router.post("/signup")
def signup(org: OrganizationCreate):
    existing_user = org_collection.find_one({"user_name": org.user_name})
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
def login(user: OrganizationLogin , response: Response):
    db_user = org_collection.find_one({"user_name":user.user_name})
    if not db_user:
        raise HTTPException(status_code = 401 , detail = "invalid user name or password")
    if not verify_password(user.password , db_user["password"]):
        raise HTTPException(status_code=401 , detail="invalid user name or password")
    access_token = create_access_token(data={"sub":str(db_user["_id"])})
    response.set_cookie(
        key = "access_token",
        value= access_token,
        httponly= True , 
        max_age=3600 , 
        samesite="lax",
        secure=False 
    )
    return {"message":"login successful" , "org_name" : db_user["user_name"] }