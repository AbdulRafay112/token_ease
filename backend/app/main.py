from fastapi import FastAPI ,Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from routes.organization_routes import router
from routes.department_routes import department_app
from routes.token_routes import token_route
app = FastAPI()



origins = [
        "http://localhost:5173",  
        "http://127.0.0.1:5173",
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
