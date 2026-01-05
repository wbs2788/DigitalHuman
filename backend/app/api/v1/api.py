from fastapi import APIRouter
from app.api.v1.endpoints import chat, voice

api_router = APIRouter()
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(voice.router, prefix="/voice", tags=["voice"])
from app.api.v1.endpoints import digital_human
api_router.include_router(digital_human.router, prefix="/human", tags=["human"])
