# LLM-Driven Digital Human Framework

## Overview
This project implements a High-Fidelity Digital Human Interaction System driven by Large Language Models (LLMs). It integrates Natural Language Processing (NLP), Affective Computing, and Multimodal Interaction technologies to create a responsive and context-aware virtual agent.

## Key Features
-   **LLM Integration**: Utilizes advanced language models for context-aware dialogue generation.
-   **Affective Computing**: Simulates emotional responses based on interaction weights and user engagement.
-   **Multimodal Output**: Supports text-to-speech (TTS) and visual avatar synchronization (lip-sync).
-   **Modular Architecture**: Decoupled system prompts and configuration for flexible research applications.

## System Architecture
The system consists of the following core components:
1.  **Backend Service**: Python-based API handling dialogue management and external service orchestration.
2.  **LLM Service**: Interface for communicating with language models (e.g., Ollama, OpenAI).
3.  **Digital Human Service**: Manages audio-visual synthesis and avatar control.

## Configuration
System prompts and agent personas are defined in `backend/app/config/persona_academic.json`. This allows researchers to modify the agent's behavior and knowledge base without altering the core codebase.

## Getting Started
1.  Install dependencies: `pip install -r requirements.txt`
2.  Configure environment variables in `.env`.
3.  Run the backend server: `python main.py`

## License
[License Information]
