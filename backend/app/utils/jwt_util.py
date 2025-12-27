import jwt

async def create_access_token(id:str ,username: str,password : str):
    try:
        payload = {
        "id" : str(id),
        "username" : username,
        "password" : str(password)
        }
        private_key = "queuemanagementsystem"
        encode = jwt.encode(payload,private_key)
        return encode


    except Exception as e:
        return {
            "the error is",e
        }