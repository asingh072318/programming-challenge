from fastapi import Depends, FastAPI
from routers import movements

app = FastAPI()


app.include_router(movements.router)

@app.get("/")
async def root():
    return {"message": "Hello from the MTracker Application!"}
