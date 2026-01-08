from fastapi import FastAPI ,Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.routes.organization_routes import router
from app.routes.department_routes import department_app
from app.routes.token_routes import token_route
app = FastAPI()



def main(): 
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

app.include_router(router)
app.include_router(department_app)
app.include_router(token_route)
if __name__ == "__main__":
    main()