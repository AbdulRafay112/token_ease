from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from routes.organization_routes import router
from routes.department_routes import department_app
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
app.mount("/department",department_app)

if __name__ == "__main__":
    main()