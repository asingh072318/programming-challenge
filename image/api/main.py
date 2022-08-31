from fastapi import Depends, FastAPI
from routers import movements
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(movements.router)

@app.get("/")
async def root():
    return {"message": "Hello from the MTracker Application!"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8001, log_level="info")
