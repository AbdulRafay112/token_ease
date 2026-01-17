from fastapi import APIRouter,Request,HTTPException,Depends
from app.database import  dept_collection
from bson import ObjectId 
from app.utils import verify_organization , parse_json

department_app = APIRouter(prefix="/department",dependencies=[Depends(verify_organization)])
@department_app.get("/")
def get_departments(request:Request):
            user_id = request.state.user_id
            id = request.query_params.get("id")
            is_valid_object  = ObjectId.is_valid(id)
            if(not is_valid_object):
                    raise HTTPException(status_code=400,detail="Not Access")
            department= dept_collection.find_one({
                    "_id" : ObjectId(id),
                    "org_id" : user_id
                  })
            if (not department):
                  raise HTTPException(status_code=400,detail="Not Access")
            return parse_json(department)

        
@department_app.post("/")
async def add_department(request:Request):
            body = await request.json()
            name = body["name"]
            user_id = request.state.user_id
            department_exist = dept_collection.find_one({
                  "name" : name,
                  "org_id" : user_id
            })
            if department_exist:
                  raise HTTPException(status_code=400,detail="department already exists")
            created_department = dept_collection.insert_one({
                  "name" : name,
                  "org_id" : ObjectId(user_id),
                  "total_tokens" : 0,
                  "current_token" : 0,
                  "status" : True
            })
            department = {
                    "name" : name,
                    "_id" : created_department.inserted_id,
                    "total_tokens" : 0,
                    "current_token" : 0,
                    "status" : True
            }

            return parse_json(department)

@department_app.put("/")
async def change_dept(request:Request):
            user_id = request.state.user_id
            body = await request.json()
            name = body['name']
            print(name)
            id = request.query_params.get("id")
            is_valid_object  = ObjectId.is_valid(id)
            if(not is_valid_object):
                    raise HTTPException(status_code=400,detail="Not Access")
            department_exist = dept_collection.find_one({
                  "name" : name,
                  "org_id" : user_id
            })
            if department_exist:
                  raise HTTPException(status_code=400,detail=f"{name} department already exists")
            
            dept_collection.update_one(
                    {"_id" : ObjectId(id)},
                    {"$set" : {"name" : name}}
                    )
            
            return {
                    'name' : name
            }

            



