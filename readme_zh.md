# 本地化多模态数字人交互系统

## 1. 项目概述 (Project Overview)
本项目旨在构建一个低延迟、高隐私保护的实时数字人交互框架。系统整合了 **Qwen-3 (8B)** 大语言模型作为认知核心，利用 **GPT-SoVITS** 实现高保真少样本语音合成（Few-shot TTS），并通过 **Live2D** 技术实现基于音频驱动的唇形同步（Lip-sync）与视觉呈现。

项目核心目标是探索在消费级硬件上部署全链路（ASR-LLM-TTS-Visual）AI Agent 的可行性方案。

## 2. 系统架构与技术栈 (System Architecture)

### 核心组件
- **认知推理层 (Cognitive Layer)**: 基于 **Ollama** 运行的 **Qwen-3 (8B)** 本地模型，保障数据隐私与推理速度。
- **记忆增强模块 (Memory Module)**: 集成 **RAG (检索增强生成)** 技术，用于挂载领域特定知识库（Domain-Specific Knowledge Base），解决大模型幻觉问题。
- **语音合成层 (Acoustic Layer)**: 采用 **GPT-SoVITS** 框架，支持基于少样本参考音频的个性化语音克隆与流式输出。
- **生成式视觉合成层 (Generative Visual Synthesis Layer)**:
  摒弃传统的基于网格变形（Mesh Deformation）的渲染方案，采用 **LiveTalking** 驱动的神经渲染管线（Neural Rendering Pipeline）。
  * **技术路线**: 基于音频驱动的面部重演（Audio-Driven Facial Reenactment）。

### 目录结构 (Directory Structure)
```text
Project-Root/
├── backend/        # FastAPI (核心控制服务/推理接口)
├── frontend/       # Next.js (Web可视化交互终端)
└── docs/           # 技术文档与API说明

```

## 3. 快速开始 (Getting Started)

### 3.1 环境预备 (Prerequisites)

* **Node.js**: v18.0 或更高版本
* **Python**: 3.10 或更高版本
* **Ollama Runtime**: 用于本地 LLM 推理
    ```bash
    ollama pull qwen3:8b

    ```


* **GPT-SoVITS Service**: 需在本地部署并运行于 `http://127.0.0.1:9880`
    > *详细配置参数请参阅 `docs/tts_integration_guide.md*`

* **LiveTalking Service**: 需在本地部署并运行于 `http://127.0.0.1:8010`
    > *详细配置参数请参阅 `docs/digital_human_guide.md*`


### 3.2 后端部署 (Backend Setup)

后端采用 FastAPI 构建，负责处理对话逻辑与 RAG 检索。

```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate | Mac/Linux: source venv/bin/activate
pip install -r requirements.txt

# 启动核心服务
python -m app.main

```

*服务默认运行于: `http://localhost:8000*`

### 3.3 前端部署 (Frontend Setup)

前端采用 Next.js 构建，负责 Live2D 渲染与用户交互。

```bash
cd frontend
npm install
npm run dev
```

*客户端默认运行于: `http://localhost:3000*`

## 4. 参数配置 (Configuration)

如需修改 LLM 模型版本或服务端口，请编辑配置文件：
`backend/app/core/config.py`
