from fastapi import APIRouter, Request, HTTPException, Depends
from database import token_collection, dept_collection
from bson import ObjectId
from utils import verify_organization,parse_json


token_route = APIRouter(prefix="/token", dependencies=[Depends(verify_organization)])


@token_route.get("/")
async def get_token(request:Request):
    token_no  = request.query_params.get("token_no")
    dept = request.query_params.get("dept")
    token = token_collection.find_one({
        "token_number" : int(token_no),
        "dept_id" : ObjectId(dept) 
    })
    return parse_json(token)


# 1. ADD TOKEN API
@token_route.post("/generate")
async def add_token(request: Request):
    body = await request.json()
    name = body.get("name")
    phone_no = body.get("phone_no") 
    dept_id = body.get("dept_id")
    user_id = request.state.user_id # Org ID automatically middleware
    # 1. Department check
    department = dept_collection.find_one({
        "_id": ObjectId(dept_id),
        "org_id": user_id
    })
    if not department:
        raise HTTPException(status_code=404, detail="Department not found")

    # 2. Token Number Calculation
    current_total = department.get("total_tokens", 0)
    new_token_number = current_total + 1

    # 3. Token Insert 
    new_token_data = {
        "token_number": new_token_number,
        "name": name,
        "phone_no": str(phone_no),
        "dept_id": ObjectId(dept_id),
        "org_id": user_id,
        "status": "pending"
    }
    
    result = token_collection.insert_one(new_token_data)
    dept_collection.update_one(
        {"_id": ObjectId(dept_id)},
        {"$set": {"total_tokens": new_token_number}}
    )

    return {
        "message": "Token generated successfully",
        "token_number": new_token_number,
        "token_id": str(result.inserted_id)
    }


#  NEXT TOKEN API (Click to Chat Logic)
@token_route.post("/next")
async def call_next_token(request: Request):
    body = await request.json()
    dept_id = body.get("dept_id")
    user_id = request.state.user_id # org_id 

    # 1. Department data finding
    dept = dept_collection.find_one({"_id": ObjectId(dept_id), "org_id": user_id})
    if not dept:
        raise HTTPException(status_code=404, detail="Department not found")

    current_val = dept.get("current_token", 0)
    total_val = dept.get("total_tokens", 0)

    # Queue check
    if current_val >= total_val:
        return {"message": "No more customers waiting", "current_token": current_val}

    # 2. Token increment
    next_token_val = current_val + 1
    
    # DB Updates
    dept_collection.update_one(
        {"_id": ObjectId(dept_id)},
        {"$set": {"current_token": next_token_val}}
    )
    token_collection.update_one(
        {"dept_id": ObjectId(dept_id), "token_number": next_token_val},
        {"$set": {"status": "serving"}}
    )

    # 3. WHATSAPP ALERT LOGIC 
    alert_gap = 3
    target_alert_token = next_token_val + alert_gap
    
    alert_customer = token_collection.find_one({
        "dept_id": ObjectId(dept_id),
        "token_number": target_alert_token
    })

    alert_data = None
    if alert_customer and alert_customer.get("phone_no"):
        alert_data = {
            "alert_needed": True,
            "name": alert_customer["name"],
            "phone": alert_customer["phone_no"],
            "token_number": target_alert_token
        }

    return {
        "message": f"Now serving token {next_token_val}",
        "current_token": next_token_val,
        "alert_data": alert_data 
    }