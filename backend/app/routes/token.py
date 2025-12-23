from fastapi import APIRouter

router = APIRouter()

@router.post("/token/create")
def create_token():
    return {"token": 1}
