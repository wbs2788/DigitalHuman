from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "DigitalHumanSystem"
    
    # LLM Settings (Ollama)
    OLLAMA_BASE_URL: str = "http://localhost:11434/v1"
    MODEL_NAME: str = "qwen3:8b"
    
    # TTS Settings (GPT-SoVITS)
    TTS_API_URL: str = "http://localhost:9880"

    # Digital Human Settings (MuseTalk/LiveTalking)
    LIVE_TALKING_URL: str = "http://localhost:8010"
    
    class Config:
        case_sensitive = True

settings = Settings()
