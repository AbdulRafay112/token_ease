from fastapi import APIRouter,Request,HTTPException,Depends
from jose import jwt 
from dotenv import load_dotenv
import os 
from database import org_collection,dept_collection,token_collection
from bson import ObjectId
from bson import json_util
import json
from utils import parse_json , verify_organization
load_dotenv()
SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"

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



