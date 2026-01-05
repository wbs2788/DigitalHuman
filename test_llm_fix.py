import asyncio
import sys
import os

# Add backend to sys.path
# Assuming we run this from e:\AIKano
sys.path.append(os.path.join(os.getcwd(), 'backend'))

try:
    from app.services.llm import llm_service
except ImportError as e:
    print(f"ImportError: {e}")
    # Try adding just 'app' if we are inside backend
    sys.path.append(os.getcwd())
    from app.services.llm import llm_service

async def main():
    print("Testing chat...")
    try:
        response = await llm_service.chat("Hello")
        print(f"Response: {response}")
    except Exception as e:
        print(f"Chat failed: {e}")
    
    print("\nTesting stream_chat...")
    try:
        async for chunk in llm_service.stream_chat("Hello"):
            print(f"Chunk: {chunk}", end='', flush=True)
    except Exception as e:
        print(f"Stream failed: {e}")
    print("\nDone.")

if __name__ == "__main__":
    asyncio.run(main())
