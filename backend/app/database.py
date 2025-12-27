from pymongo import MongoClient
from dotenv import load_dotenv
import os 
# load env file
load_dotenv()
# get url from env file
MONGO_URL = os.getenv("MONGO_URL")
# create client in mongodb
client = MongoClient(MONGO_URL)
# create db 
db = client["token_ease_db"]
# create collections 
org_collection = db["organizations"]
dept_collection = db["departments"]
token_collection = db["tokens"]
print("mongodb connected successfully")




