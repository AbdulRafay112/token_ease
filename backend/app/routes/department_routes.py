from fastapi import APIRouter,Request,HTTPException,Depends
from jose import jwt 
from dotenv import load_dotenv
import os 
from database import org_collection
from bson import ObjectId
load_dotenv()
SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"
def verify_organization(request:Request):
        try:
            token = request.cookies.get("access_token")
            print(token)
            if not token:
                   raise HTTPException(status_code=400,detail="Invalid Token")
            print(token)
            try:
                data = jwt.decode(token,SECRET_KEY,algorithms=ALGORITHM)
            except Exception as e:
                raise HTTPException(status_code=400,detail="Invalid Token")
            # if data == 'Not enough segments':
            #     raise HTTPException(status_code=400,detail="Unauthorized Request")
            authorize_user = org_collection.find_one({"_id": ObjectId(data["sub"])})
            if not authorize_user:
                raise HTTPException(status_code=400,detail="Invalid Token")
            request.state.user_id = authorize_user['_id']
            # response =  call_next(request)
            # return response
        except Exception as e:
                    raise e



department_app = APIRouter(prefix="/department",dependencies=[Depends(verify_organization)])

@department_app.get("/")
def get_department(request:Request):
        try:
            user_id = request.state.user_id
            print(user_id)
            return {"hello" : "department"}
        except Exception as e:
              print(e)
              raise HTTPException(status_code=500,detail="Internal Server Error")


