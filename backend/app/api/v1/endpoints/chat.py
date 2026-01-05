from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.services.llm import llm_service
from app.services.rag import rag_service
from fastapi.responses import StreamingResponse

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[dict]] = []

@router.post("/")
async def chat(request: ChatRequest):
    # 1. Retrieve RAG context
    context = rag_service.query_lore(request.message)
    context_str = "\n".join(context)
    
    # 2. Augment prompt (simple concatenation for now)
    augmented_message = f"Context: {context_str}\n\nUser: {request.message}" if context else request.message
    
    # 3. Call LLM
    response = await llm_service.chat(augmented_message, request.history)
    return {"response": response}

@router.post("/stream")
async def chat_stream(request: ChatRequest):
    # 1. Retrieve RAG context
    context = rag_service.query_lore(request.message)
    context_str = "\n".join(context)
    augmented_message = f"Context: {context_str}\n\nUser: {request.message}" if context else request.message
    
    return StreamingResponse(
        llm_service.stream_chat(augmented_message, request.history),
        media_type="text/event-stream"
    )
