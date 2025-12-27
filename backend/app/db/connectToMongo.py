from pymongo import MongoClient;

uri = "mongodb://localhost:27017/"
client = ""
async def connectToMongo():
    try:
        global client
        client = MongoClient(uri)
        # await client.admin.command("ping")
        # database = await client['Videotube']
        # print(database)
        db =  client.get_database("test")
        # db.create_collection("user",{
        #     "validator" : {
        #         "$jsonSchema" :  {
        #             "bsonType" : object,
        #             "required" : ['name','phone_no','gender'],
        #             "properties" : {
        #                 "name" : {
        #                     "bsonType" : str,
        #                     "description" : "must be a string and required"
        #                 },
        #                 "phone_no" : {
        #                     "bsonType" : str,
        #                     "description" : "must be a string and required"
        #                 },
        #                 "gender" : {
        #                     "bsonType" : int,
        #                     "description" : "must be a int and required"
        #                 }
        #             }
        #         } 
        #     }
        # })
        collection = db.user
        # collection.insert_one({
        #     "name" : "arqam",
        #     "phone_no" :  92317895462,
        #     "gender" : 0
        # })
        print(collection)
        
         
    except Exception as e:
        raise Exception("The Following Error is", e)
  
async def get_client():
    try:
        global client
        return client
    except Exception as e:
        return {"the error is",e}