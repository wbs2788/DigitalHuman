# GPT-SoVITS Setup Guide

To give the Digital Human a voice, we use **GPT-SoVITS**, a state-of-the-art voice cloning toolkit. This runs as a separate service alongside the system.

## 1. Installation (The Voice Engine)

We recommend using the official GPT-SoVITS repository.

### Option A: One-Click Package (Windows/Mac)
If you are on Windows, the easiest way is to download the "One-Click Package" from the [GPT-SoVITS Release Page](https://github.com/RVC-Boss/GPT-SoVITS/releases).
*Note: Mac support is manual installation mostly.*

### Option B: Manual Installation (Mac/Linux)
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/RVC-Boss/GPT-SoVITS
   cd GPT-SoVITS
   ```

2. **Install Dependencies**:
   ```bash
   conda create -n GPTSoVits python=3.9
   conda activate GPTSoVits
   pip install -r requirements.txt
   ```
   *Note: On Mac (Apple Silicon), you might need specific PyTorch nightly builds.*

3. **Download Pretrained Models**:
   Download the base models from HuggingFace (`GPT_SoVITS/pretrained_models`) and place them in `GPT_SoVITS/pretrained_models`.

## 2. Getting a Voice Model

You need two model files trained on the target voice:
1. **SoVITS Model** (`.pth` file) e.g., `Voice_e8_s200.pth`
2. **GPT Model** (`.ckpt` file) e.g., `Voice-e15.ckpt`

### Where to find them?
- **Civitai / HuggingFace**: Search for "GPT-SoVITS models".
- **Train Your Own**:
    1. Extract voice lines from source audio.
    2. Use the GPT-SoVITS WebUI (`python webui.py`) to fine-tune the base model on these audio files.

## 3. Configuration & Running

1. **Place Models**:
   Put your `.pth` and `.ckpt` files in a known folder, e.g., `GPT-SoVITS/weights/`.

2. **Reference Audio**:
   You need a short (3-10s) audio clip of the target voice, and the text of what was said.
   - Save the audio as `reference_audio.wav`
   - Note the text content (e.g., "Hello world").

3. **Start the API Server**:
   Inside the `GPT-SoVITS` directory, run the API script. You must specify the model paths.

   ```bash
   # Example command (adjust paths to your actual files)
   python api.py \
     -s "weights/Voice_e8_s200.pth" \
     -g "weights/Voice-e15.ckpt" \
     -dr "reference_audio.wav" \
     -dt "Hello world" \
     -dl "en" \
     -a "127.0.0.1" \
     -p 9880
   ```

   *Flags:*
   - `-s`: SoVITS model path
   - `-g`: GPT model path
   - `-dr`: Default reference audio path
   - `-dt`: Default reference text
   - `-dl`: Default reference language
   - `-p`: Port (Default 9880)

## 4. Connect to System
Once the API is running at `http://127.0.0.1:9880`, the backend will automatically connect to it using the settings in `backend/app/core/config.py`.

### Troubleshooting
- **No Sound?**: Check the backend logs. If it says "Connection refused", ensure `api.py` is running.
- **Wrong Voice?**: Make sure the reference audio (`reference_audio.wav`) matches the texture of the voice you want to clone.
