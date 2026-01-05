import json
import os
from openai import AsyncOpenAI
from app.core.config import settings
from loguru import logger

class LLMService:
    def __init__(self):
        # self.client = AsyncOpenAI(
        #     base_url=settings.OLLAMA_BASE_URL,
        #     api_key="ollama", # Required but unused for Ollama
        # )
        self.system_prompt = self._load_system_prompt()
        logger.info(f"LLM Service initialized with model: {settings.MODEL_NAME} (MOCKED)")

    def _load_system_prompt(self) -> str:
        try:
            config_path = os.path.join(os.path.dirname(__file__), "../config/persona_academic.json")
            with open(config_path, "r", encoding="utf-8") as f:
                config = json.load(f)
                return config.get("system_prompt", "You are a helpful digital assistant.")
        except Exception as e:
            logger.error(f"Failed to load system prompt: {e}")
            return "You are a helpful digital assistant."

    async def chat(self, user_message: str, history: list = None) -> str:
        # messages = [{"role": "system", "content": self.system_prompt}]
        # if history:
        #     messages.extend(history)
        # messages.append({"role": "user", "content": user_message})

        # try:
        #     response = await self.client.chat.completions.create(
        #         model=settings.MODEL_NAME,
        #         messages=messages,
        #         temperature=0.7,
        #         max_tokens=1000,
        #     )
        #     return response.choices[0].message.content
        # except Exception as e:
        #     logger.error(f"LLM Generation failed: {e}")
        #     return "I apologize. I seem to be having trouble processing your request right now."
        return "Connection successful. I am ready to assist you."

    async def stream_chat(self, user_message: str, history: list = None):
        # messages = [{"role": "system", "content": self.system_prompt}]
        # if history:
        #     messages.extend(history)
        # messages.append({"role": "user", "content": user_message})

        # try:
        #     stream = await self.client.chat.completions.create(
        #         model=settings.MODEL_NAME,
        #         messages=messages,
        #         stream=True,
        #         temperature=0.7,
        #     )
        #     async for chunk in stream:
        #         if chunk.choices[0].delta.content:
        #             yield chunk.choices[0].delta.content
        # except Exception as e:
        #     logger.error(f"LLM Stream failed: {e}")
        #     yield "..."
        yield "Connection successful. I am ready to assist you."

llm_service = LLMService()
