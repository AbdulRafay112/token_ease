from fastapi import APIRouter,Request,HTTPException,Depends
from app.database import  dept_collection
from bson import ObjectId 
from app.utils import verify_organization , parse_json

department_app = APIRouter(prefix="/department",dependencies=[Depends(verify_organization)])
@department_app.get("/")
def get_departments(request:Request):
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
            department_exist = dept_collection.find_one({
                  "name" : name,
                  "org_id" : user_id
            })
            if department_exist:
                  raise HTTPException(status_code=400,detail=f"{name} department already exists")
            created_department = dept_collection.insert_one({
                  "name" : name,
                  "org_id" : ObjectId(user_id),
                  "total_tokens" : 0,
                  "current_token" : 0,
                  "status" : True
            })
            return {
                  "the department added successfully", str(created_department.inserted_id)
            }

@department_app.patch("/{dept_id}")
def get_department_details(dept_id):
            try:
                department = dept_collection.find_one({
                       "_id" : ObjectId(dept_id)
                })
                return parse_json(department)
            except Exception as e:
                raise HTTPException(status_code=400,detail="Invalid Id")
            
# error hai abhi
@department_app.put("/{dept_id}")
async def update_department_details(dept_id,request:Request):
            body = await request.json()
            name = body["name"]
            user_id = request.state.user_id
            department_exist = dept_collection.find_one({
                  "name" : name,
                  "org_id" : user_id
            })
            if department_exist:
                  raise HTTPException(status_code=400,detail=f"{name} exists")
            department_to_update = dept_collection.find_one_and_update({
                   "_id" : ObjectId(dept_id)
            },{
                   "$set" : {
                          "name" : name
                   }
            })
            return parse_json(department_to_update)


