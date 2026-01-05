import chromadb
from chromadb.config import Settings
from loguru import logger
import os

class RAGService:
    def __init__(self):
        self.chroma_client = chromadb.PersistentClient(path="./data/chroma_db")
        self.collection = self.chroma_client.get_or_create_collection(name="digital_human_knowledge")
        logger.info("RAG Service initialized with ChromaDB")

    def add_lore(self, documents: list[str], metadatas: list[dict] = None, ids: list[str] = None):
        if not ids:
            ids = [f"doc_{i}" for i in range(len(documents))]
        self.collection.add(
            documents=documents,
            metadatas=metadatas,
            ids=ids
        )
        logger.info(f"Added {len(documents)} lore documents.")

    def query_lore(self, query_text: str, n_results: int = 2) -> list[str]:
        results = self.collection.query(
            query_texts=[query_text],
            n_results=n_results
        )
        return results['documents'][0] if results['documents'] else []

rag_service = RAGService()
