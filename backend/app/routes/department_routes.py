from fastapi import FastAPI,Request,HTTPException
from jose import jwt 
from dotenv import load_dotenv
import os 
from database import org_collection
from bson import ObjectId


load_dotenv()
SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"
department_app = FastAPI()

@department_app.get("/")
def get_department():
        return {"hello" : "department"}


@department_app.middleware("http")
def verify_organization(request:Request,call_next):
        token = request.cookies.get("access_token")
        data = jwt.decode(token,SECRET_KEY,algorithms=ALGORITHM)
        print(data)
        # if data == 'Not enough segments':
        #     raise HTTPException(status_code=400,detail="Unauthorized Request")
        authorize_user = org_collection.find_one({"_id": ObjectId(data["sub"])})
        print(authorize_user)
        response =  call_next(request)
        return response
