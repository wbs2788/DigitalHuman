from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.digital_human import digital_human_service
from loguru import logger

router = APIRouter()

@router.post("/speak")
async def speak_to_human(audio: UploadFile = File(...)):
    try:
        content = await audio.read()
        success = await digital_human_service.send_audio(content)
        if not success:
            raise HTTPException(status_code=500, detail="Failed to send audio to Digital Human service")
        return {"status": "ok", "message": "Audio sent to Digital Human"}
    except Exception as e:
        logger.error(f"Error in speak_to_human: {e}")
        raise HTTPException(status_code=500, detail=str(e))
