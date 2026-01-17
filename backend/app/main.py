from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.organization_routes import router
from app.routes.department_routes import department_app
from app.routes.token_routes import token_route

app = FastAPI()


origins = [
    "http://localhost:5173", 
    "http://localhost:3000",
    "https://token-easefrontend.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,     
    allow_credentials=True,    
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(department_app)
app.include_router(token_route)