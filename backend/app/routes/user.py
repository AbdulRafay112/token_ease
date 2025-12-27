from fastapi import APIRouter
from pydantic import BaseModel
import bcrypt
from db.connectToMongo import get_client
from utils.jwt_util import create_access_token
router = APIRouter()

class Register_User(BaseModel):
      email : str
      company_name : str
      user_name : str
      password : str
class Login_User(BaseModel):
      user_name : str
      password : str

@router.post("/user/register")
async def create_user(user : Register_User):
        try:
            client = await get_client()
            db = client.get_database("test")
            collection = db.user
            user_exist = collection.find_one({
                  "user_name" : user.user_name
            })
            if(user_exist):
                return{"username already exist"}
            
            password_bytes = user.password.encode("utf-8")
            salt =  bcrypt.gensalt(10)
            hash_password = bcrypt.hashpw(password_bytes,salt)
            inserted_user =  collection.insert_one({
                  "email" : user.email,
                  "companyname" : user.company_name,
                  "username" : user.user_name,
                  "password" : hash_password,
                  "counter" : 0 
            })
            return {"register_user_id":str(inserted_user.inserted_id)}
        except Exception as e:
               return ("the error is",e)


@router.post("/user/login")
async def login_user(user : Login_User):
        try:
            client = await get_client()
            db = client.get_database("test")
            collection = db.user
            user_exist =  collection.find_one({
                  "username" : user.user_name
            })
            if(user_exist == None):
                return{"Enter Valid Credentials"}
            user_password = user_exist.get("password")
            password_bytes = user.password.encode("utf-8")
            password_check = bcrypt.checkpw(password_bytes,user_password)
            if(password_check==False):
                return{"Enter Valid Credentials"}  

            user_id = user_exist.get("_id"),
            username = user_exist.get("username")
            
            access_token = await create_access_token(user_id,username,user_password)
            save_user =  collection.update_one({
                  "username" : username
            },{
                  "$set" : {
                        "access_token" : access_token
                    } 
            })
            return {"login" : 1}
        except Exception as e:
               print(e)
               return {"the error is",e}

@router.post("/user/logout")
async def logout_user():
        try:
            return {"login_user" : 1}
        except Exception as e:
              return ("the error is",e)