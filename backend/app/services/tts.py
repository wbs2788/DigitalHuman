import httpx
from app.core.config import settings
from loguru import logger
from fastapi.responses import StreamingResponse

class TTSService:
    def __init__(self):
        self.api_url = settings.TTS_API_URL
        self.client = httpx.AsyncClient(timeout=30.0)
        logger.info(f"TTS Service initialized with URL: {self.api_url}")

    async def generate_audio(self, text: str, ref_audio_path: str = "reference_audio.wav", prompt_text: str = ""):
        # GPT-SoVITS standard API payload structure
        # Note: This might need adjustment based on the specific GPT-SoVITS API version user installs
        payload = {
            "text": text,
            "text_language": "zh",
            "refer_wav_path": ref_audio_path,
            "prompt_text": prompt_text,
            "prompt_language": "zh"
        }
        
        try:
            # Using the streaming endpoint usually at / or /tts
            # Changing to / as /tts returned 404
            async with self.client.stream("POST", f"{self.api_url}/", json=payload) as response:
                if response.status_code != 200:
                    error_content = await response.aread()
                    logger.error(f"TTS Error: {error_content}")
                    yield b""
                    return
                
                async for chunk in response.aiter_bytes():
                    yield chunk
                    
        except Exception as e:
            logger.error(f"TTS Connection failed: {e}")
            yield b""

tts_service = TTSService()
