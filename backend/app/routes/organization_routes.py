from fastapi import APIRouter , HTTPException , Response,Request
from schema.organization_schema import OrganizationCreate,OrganizationLogin
from database import org_collection # create connection with mongodb 
from database import  dept_collection
from utils import get_password_hash , verify_password , create_access_token
from utils import find_organization
from utils import verify_organization , parse_json

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
async def login(response: Response,org:OrganizationLogin):
    existing_user = find_organization(org.user_name)
    if not existing_user:
        raise HTTPException(status_code = 401 , detail = "invalid user name or password")
    if not verify_password(org.password , existing_user["password"]):
        raise HTTPException(status_code=401 , detail="invalid user name or password")
    access_token = create_access_token(data={"sub":str(existing_user["_id"])})
    response.set_cookie(
        key = "access_token",
        value= access_token,
        httponly= False , 
        max_age=3600 , 
        samesite="none",
        secure=True 
    )
    return {"message":"login successful"}

@router.get("/org")
def org_details(request:Request):
            verify_organization(request)
            user_id = request.state.user_id
            user_name = request.state.user_name
            departments = dept_collection.find({
                   "org_id" : user_id
            })
            listed_departments = list(departments)
            if not listed_departments:
                  raise HTTPException(status_code=200,detail="No Departments Yet")
            return parse_json({
                 "user_name" : user_name,
                 "departments" : listed_departments
            })