from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger
from app.api.v1.api import api_router
from app.core.config import settings

app = FastAPI(
    title="AIKano API",
    description="Backend for Digital Human Interaction System",
    version="2.0.0"
)

# CORS (Allow Frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    logger.info("Digital Human Backend Starting up...")
    # TODO: Check connection to Ollama and GPT-SoVITS

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {"message": "Welcome to Digital Human System API. Agent is listening."}

@app.get("/health")
async def health_check():
    return {"status": "ok", "components": {"llm": "pending", "tts": "pending"}}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
