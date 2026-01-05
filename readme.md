# Localized Multimodal Digital Human Interaction System

## 1. Project Overview
This project aims to construct a low-latency, privacy-preserving framework for real-time digital human interaction. The system integrates **Qwen-3 (8B)** as the cognitive core, utilizes **GPT-SoVITS** for high-fidelity few-shot text-to-speech (TTS), and employs **LiveTalking** technology for audio-driven lip synchronization and visual synthesis.

The core objective is to explore the feasibility of deploying a full-link (ASR-LLM-TTS-Visual) AI Agent on consumer-grade hardware.

## 2. System Architecture & Tech Stack

### Core Components
- **Cognitive Layer**: Powered by the **Qwen-3 (8B)** local model running on **Ollama**, ensuring data privacy and inference speed.
- **Memory Module**: Integrates **RAG (Retrieval-Augmented Generation)** technology to mount Domain-Specific Knowledge Bases, mitigating Large Language Model (LLM) hallucinations.
- **Acoustic Layer**: Adopts the **GPT-SoVITS** framework, supporting personalized few-shot voice cloning and streaming audio output.
- **Generative Visual Synthesis Layer**:
  Abandoning traditional Mesh Deformation rendering schemes, this layer utilizes the **LiveTalking** driven Neural Rendering Pipeline.
  * **Technical Route**: Audio-Driven Facial Reenactment.

### Directory Structure
```text
Project-Root/
├── backend/        # FastAPI (Core Control Service / Inference Interface)
├── frontend/       # Next.js (Web-based Visual Interaction Terminal)
└── docs/           # Technical Documentation & API Reference

```

## 3. Getting Started

### 3.1 Prerequisites

* **Node.js**: v18.0 or higher
* **Python**: 3.10 or higher
* **Ollama Runtime**: Required for local LLM inference
```bash
ollama pull qwen3:8b

```


* **GPT-SoVITS Service**: Must be deployed locally and running at `http://127.0.0.1:9880`
> *For detailed configuration parameters, please refer to `docs/tts_integration_guide.md*`


* **LiveTalking Service**: Must be deployed locally and running at `http://127.0.0.1:8010`
> *For detailed configuration parameters, please refer to `docs/digital_human_guide.md*`



### 3.2 Backend Setup

The backend is built with FastAPI and handles dialogue logic and RAG retrieval.

```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate | Mac/Linux: source venv/bin/activate
pip install -r requirements.txt

# Start the core service
python -m app.main

```

*Service runs by default at: `http://localhost:8000*`

### 3.3 Frontend Setup

The frontend is built with Next.js and handles the neural rendering stream and user interaction.

```bash
cd frontend
npm install
npm run dev

```

*Client runs by default at: `http://localhost:3000*`

## 4. Configuration

To modify the LLM model version or service ports, please edit the configuration file:
`backend/app/core/config.py`