from fastapi import Request , HTTPException
from passlib.context import CryptContext
from datetime import timedelta , datetime
from jose import jwt 
from dotenv import load_dotenv
import os 
import json 
from app.database import org_collection
from bson import ObjectId , json_util 

# === password hash logic ===
pwd_context = CryptContext(schemes=["bcrypt"] , deprecated = "auto")
def get_password_hash(password):
    """Return hashed password"""
    return pwd_context.hash(password)
def verify_password(plain_password , hashed_password):
    return pwd_context.verify(plain_password , hashed_password)



# === find organization === 
def find_organization(user_name: str):
    """find organization based on that user_name"""
    return org_collection.find_one({"user_name":user_name})



# ==== create cookie ==== 

load_dotenv()
SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp":expire})
    encoded_jwt = jwt.encode(to_encode , SECRET_KEY , algorithm=ALGORITHM)
    return encoded_jwt


# ==== json parse logic === 
def parse_json(data):
    """Convert json in to python dictionary"""
    return json.loads(json_util.dumps(data))

# === verify organization === 
def verify_organization(request: Request):
    """Verify organization based on cookie"""
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=400 , detail="Invalid Token")
    try:
        data = jwt.decode(token , SECRET_KEY , algorithms=ALGORITHM)
    except Exception as e:
        raise HTTPException(status_code=400 , detail="Invalid Token")
    authorize_user = org_collection.find_one({"_id":ObjectId(data["sub"])})
    if not authorize_user:
        raise HTTPException(status_code=400 , detail="Invalid Token")
    request.state.user_id = authorize_user["_id"]

