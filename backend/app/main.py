from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import nest_asyncio
import asyncio;
from routes import user
from db.connectToMongo import connectToMongo
nest_asyncio.apply()
app = FastAPI()
async def main():
    try:
        await connectToMongo()
    except Exception as e:
        raise Exception("The mongo error is",e)

asyncio.run(main())

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def home():
    return {"message": "TokenEase Backend Running"}

app.include_router(user.router)
