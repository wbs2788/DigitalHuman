# 神经渲染微服务部署指南

## 1. 模块概述 (Module Overview)
本模块（LiveTalking Subsystem）负责处理高保真数字人的视觉生成任务。系统基于 **MuseTalk** 算法实现，作为一个独立的 **API 微服务** 运行，通过 HTTP 协议接收主系统的音频流并实时返回唇形同步的视频流。

## 2. 硬件要求 (System Requirements)
由于涉及到实时的 GANs/Diffusion 推理，建议配置如下：
* **GPU**: NVIDIA RTX 3060 (12GB) 或更高性能显卡。
* **CUDA**: Version 11.8 或兼容版本。
* **Storage**: 至少 10GB 可用空间（用于存储预训练权重）。

## 3. 部署流程 (Deployment Pipeline)

建议在独立的 Conda 环境中部署此微服务，以避免与主系统依赖冲突。

### 3.1 获取推理引擎
```bash
# 克隆推理引擎仓库
git clone [https://github.com/wbs2788/LiveTalking](https://github.com/wbs2788/LiveTalking)
cd LiveTalking

```

### 3.2 环境构建

```bash
# 创建独立环境
conda create -n neural_renderer python=3.9
conda activate neural_renderer

# 安装深度学习依赖
# 建议优先安装 Pytorch (视 CUDA 版本而定)
pip install -r requirements.txt

```

> **注意**: 如果遇到 `ffmpeg` 相关错误，请确保系统路径中已安装 FFmpeg 库。

### 3.3 模型权重配置 (Weights Setup)

请按照 LiveTalking 官方文档指引，下载 MuseTalk 及其依赖的 Checkpoints（如 `musetalk.json`, `pytorch_model.bin` 等），并将其放置于 `LiveTalking/weights/` 目录下。

## 4. 身份资产配置 (Identity Asset Configuration)

为了初始化数字人形象，需要准备源媒体文件：

1. **源文件准备**:
* 准备一张高质量的人像图片（或一段静止状态的参考视频）。
* 建议分辨率：512x512 或 720p。
* 文件命名规范：`reference_subject_v1.png` (避免使用非 ASCII 字符)。


2. **路径放置**:
将文件置于 `LiveTalking/data/imgs` 或 `LiveTalking/data/video` 目录中。

## 5. 启动推理服务 (Service Initiation)

在 `LiveTalking` 根目录下运行 API 服务端点：

```bash
python app.py
# 如：python app.py --transport webrtc --model musetalk --avatar_id musetalk_avatar1

```

* **默认端口**: `http://localhost:8010`
* **状态检查**: 启动成功后，控制台应显示 "Inference server listening on port 8010"。

## 6. 主系统集成 (Integration)

回到主项目框架 (`LLM-Driven-Digital-Human-Framework`) 进行对接配置：

1. 打开配置文件: `backend/app/core/config.py`
2. 修正微服务地址参数：
```python
NEURAL_RENDERING_SERVICE_URL = "http://localhost:8010"

```

