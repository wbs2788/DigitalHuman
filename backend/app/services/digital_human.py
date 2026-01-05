import httpx
from app.core.config import settings
from loguru import logger

class DigitalHumanService:
    def __init__(self):
        self.api_url = settings.LIVE_TALKING_URL
        self.client = httpx.AsyncClient(timeout=10.0)
        logger.info(f"Digital Human Service initialized with URL: {self.api_url}")

    async def check_health(self) -> bool:
        try:
            # Simple health check (assuming root returns something or 404 is fine as connectivity check)
            response = await self.client.get(f"{self.api_url}/")
            return response.status_code < 500
        except Exception as e:
            logger.warning(f"Digital Human Service not available: {e}")
            return False

    async def send_audio(self, audio_content: bytes) -> bool:
        try:
            # LiveTalking expects 'file' field and endpoint /humanaudio for audio uploads
            files = {'file': ('response.wav', audio_content, 'audio/wav')}
            # Optional: Add sessionid if needed, defaults to 0 in LiveTalking
            data = {'sessionid': 0} 
            response = await self.client.post(f"{self.api_url}/humanaudio", files=files, data=data)
            return response.status_code == 200
        except Exception as e:
            logger.error(f"Failed to send audio to Digital Human: {e}")
            return False

digital_human_service = DigitalHumanService()
