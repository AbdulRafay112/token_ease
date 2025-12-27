from fastapi import FastAPI , HTTPException , Response , Depends
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import OrganizationCreate , UserLogin
from app.database import org_collection
from app.utils import get_password_hash , verify_password , create_access_token
app = FastAPI()

# === signup api ===
@app.post("/signup")
def signup_organization(org: OrganizationCreate):
    existing_user = org_collection.find_one({"email": org.email})
    if existing_user:
        raise HTTPException(status_code=400 , detail = "email already exists")
    result = org_collection.insert_one({
        "name": org.name , 
        "email": org.email , 
        "password": get_password_hash(org.password),
        "category": org.category
    })
    return {
        "message": "organization created successfully",
        "org_id": str(result.inserted_id)
    }


# === login api === 
origins = [
    "http://localhost:3000",  
    "http://127.0.0.1:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,     
    allow_credentials=True,    
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/login")
def login(user: UserLogin , response: Response):
    db_user = org_collection.find_one({"email":user.email})
    if not db_user:
        raise HTTPException(status_code = 401 , detail = "account not found for this email or password")
    if not verify_password(user.password , db_user["password"]):
        raise HTTPException(status_code=401 , detail="invalid email or password")
    access_token = create_access_token(data={"sub":str(db_user["_id"])})
    response.set_cookie(
        key = "access_token",
        value= f"Bearer {access_token}",
        httponly= True , 
        max_age=3600 , 
        samesite="lax",
        secure=False 
    )
    return {"message":"login successful" , "org_name" : db_user["name"] }