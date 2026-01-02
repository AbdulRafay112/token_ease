from fastapi import FastAPI ,Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from routes.organization_routes import router
from routes.department_routes import department_app
from routes.token_routes import token_route
app = FastAPI()

# class Custom_Exception():
#     status_code = 404
#     detail = "Invalid Token"

# def exception_handler(app:FastAPI):
#     @app.exception_handler(Custom_Exception)
#     async def custom_exception_handler(request:Request,exception:Exception):
#         return JSONResponse(status_code=exception.status_code,content={"error":exception.detail})


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
# exception_handler(app)
# exception_handler(department_app)
app.include_router(router)
app.include_router(department_app)
app.include_router(token_route)
if __name__ == "__main__":
    main()