from fastapi import APIRouter
from pydantic import BaseModel
from app.services.tts import tts_service
from fastapi.responses import StreamingResponse

router = APIRouter()

class TTSRequest(BaseModel):
    text: str
    ref_audio_path: str = "archive/reference_audio.wav" # Default ref audio
    prompt_text: str = ""

@router.post("/speak")
async def speak(request: TTSRequest):
    return StreamingResponse(
        tts_service.generate_audio(request.text, request.ref_audio_path, request.prompt_text),
        media_type="audio/wav"
    )
