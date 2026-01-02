from fastapi import APIRouter,Request,HTTPException,Depends
from jose import jwt 
from dotenv import load_dotenv
import os 
from database import org_collection,dept_collection,token_collection
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



token_route = APIRouter(prefix="/token",dependencies=[Depends(verify_organization)])

# @token_route.get("/{dept_id}")
# async def get_department(dept_id):
#             try:
#                 department = dept_collection.find_one({
#                        "_id" : ObjectId(dept_id)
#                 })
#                 return parse_json(department)
#             except Exception as e:
#                 raise HTTPException(status_code=400,detail="Invalid Id")
        

@token_route.post("/")
async def add_token(request:Request):
            body = await request.json()
            name,phone_no,dept_id = body.values()
            tokens = token_collection.find({
                   "dept_id" : ObjectId(dept_id)
            })
            listed_tokens = list(tokens)
            print(len(listed_tokens))
            created_token = token_collection.insert_one({
                   "_id" : len(listed_tokens)+1,
                   "name" : name,
                   "phone_no" : int(phone_no),
                   "dept_id" : ObjectId(dept_id)
            })
            return {
                  "the token is",str(created_token.inserted_id)
            }



