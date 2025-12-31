from fastapi import APIRouter,Request,HTTPException,Depends
from fastapi.responses import JSONResponse
from jose import jwt 
from dotenv import load_dotenv
import os 
from app.database import org_collection
from bson import ObjectId
from bson import json_util
import json
load_dotenv()
SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"


def parse_json(data):
    return json.loads(json_util.dumps(data))

def verify_organization(request:Request):
            token = request.cookies.get("access_token")
            if not token:
                   raise HTTPException(status_code=400,detail="Invalid Token")
            try:
                data = jwt.decode(token,SECRET_KEY,algorithms=ALGORITHM)
            except Exception as e:
                raise HTTPException(status_code=400,detail="Invalid Token")
            authorize_user = org_collection.find_one({"_id": ObjectId(data["sub"])})
            if not authorize_user:
                raise HTTPException(status_code=400,detail="Invalid Token")
            request.state.user_id = authorize_user['_id']



department_app = APIRouter(prefix="/department",dependencies=[Depends(verify_organization)])

@department_app.get("/")
def get_department(request:Request):
            user_id = request.state.user_id
            departments = dept_collection.find({
                   "org_id" : user_id
            })
            listed_departments = list(departments)
            if not listed_departments:
                  raise HTTPException(status_code=200,detail="No Departments Yet")
            return parse_json(listed_departments)
        

@department_app.post("/")
async def add_department(request:Request):
            body = await request.json()
            name = body["name"]
            user_id = request.state.user_id
            counter_exist = dept_collection.find_one({
                  "name" : name,
                  "org_id" : user_id
            })
            if counter_exist:
                  raise HTTPException(status_code=400,detail=f"{name} exists")
            created_department = dept_collection.insert_one({
                  "name" : name,
                  "org_id" : ObjectId(user_id),
                  "total_tokens" : 0,
                  "current_token" : 0,
                  "status" : True
            })
            return {
                  "the department is",str(created_department.inserted_id)
            }



