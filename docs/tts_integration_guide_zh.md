# GPT-SoVITS 部署指南

为了赋予数字人语音交互能力，我们采用 **GPT-SoVITS**，这是一套业界领先的语音克隆工具包。该模块作为独立服务与主系统并行运行。

## 1. 安装说明 (语音引擎)

我们建议使用官方的 GPT-SoVITS 代码库。

### 方案 A：一键整合包 (Windows/Mac)

如果您使用的是 Windows 系统，最便捷的方式是从 [GPT-SoVITS 发布页](https://github.com/RVC-Boss/GPT-SoVITS/releases) 下载“一键整合包”。
*注：Mac 系统目前主要依赖手动安装。*

### 方案 B：手动安装 (Mac/Linux)

1. **克隆代码库**：
```bash
git clone https://github.com/RVC-Boss/GPT-SoVITS
cd GPT-SoVITS

```


2. **安装依赖**：
```bash
conda create -n GPTSoVits python=3.9
conda activate GPTSoVits
pip install -r requirements.txt

```


*注：在 Mac (Apple Silicon 芯片) 上，可能需要安装特定的 PyTorch nightly 构建版本。*
3. **下载预训练模型**：
从 HuggingFace (`GPT_SoVITS/pretrained_models`) 下载基础模型，并将其放置在 `GPT_SoVITS/pretrained_models` 目录下。

## 2. 获取语音模型

您需要准备两个基于目标人声训练的模型文件：

1. **SoVITS 模型** (`.pth` 文件) 例如：`Voice_e8_s200.pth`
2. **GPT 模型** (`.ckpt` 文件) 例如：`Voice-e15.ckpt`

### 获取途径

* **Civitai / HuggingFace**：搜索 "GPT-SoVITS models"。
* **自行训练**：
1. 从源音频中提取语音片段。
2. 使用 GPT-SoVITS WebUI (运行 `python webui.py`) 基于这些音频文件对基础模型进行微调 (Fine-tune)。



## 3. 配置与运行

1. **放置模型**：
将您的 `.pth` 和 `.ckpt` 文件放置在指定目录，例如 `GPT-SoVITS/weights/`。
2. **参考音频配置**：
您需要准备一段目标人声的简短音频（3-10秒），以及该音频对应的文本内容。
* 将音频保存为 `reference_audio.wav`
* 记录文本内容（例如："Hello world"）。


3. **启动 API 服务**：
在 `GPT-SoVITS` 目录下运行 API 脚本。您必须指定模型路径。
```bash
# 示例命令 (请根据实际文件路径进行调整)
python api.py \
  -s "weights/Voice_e8_s200.pth" \
  -g "weights/Voice-e15.ckpt" \
  -dr "reference_audio.wav" \
  -dt "Hello world" \
  -dl "en" \
  -a "127.0.0.1" \
  -p 9880

```


*参数说明：*
* `-s`: SoVITS 模型路径
* `-g`: GPT 模型路径
* `-dr`: 默认参考音频路径
* `-dt`: 默认参考文本内容
* `-dl`: 默认参考语言
* `-p`: 端口号 (默认 9880)



## 4. 系统接入

当 API 在 `http://127.0.0.1:9880` 成功运行后，后端服务将根据 `backend/app/core/config.py` 中的配置自动连接该服务。

### 故障排查

* **无声音？**：检查后端日志。如果提示 "Connection refused"，请确保 `api.py` 正在运行。
* **音色不对？**：请确保参考音频 (`reference_audio.wav`) 与您期望克隆的目标音色特征一致。