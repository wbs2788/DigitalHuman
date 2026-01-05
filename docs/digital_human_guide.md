# Digital Human (MuseTalk) Setup Guide

To enable the realistic "Digital Human" mode, we use **MuseTalk**, specifically the [lipku/LiveTalking](https://github.com/lipku/LiveTalking) implementation.

> [!IMPORTANT]
> This feature requires a powerful NVIDIA GPU (RTX 3060 or better recommended) and about 10GB+ of disk space.

## 1. Installation

We recommend running `LiveTalking` in a separate environment.

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/lipku/LiveTalking
    cd LiveTalking
    ```

2.  **Install Dependencies**:
    It is highly recommended to use Conda.
    ```bash
    conda create -n livetalking python=3.9
    conda activate livetalking
    pip install -r requirements.txt
    ```
    *Note: You may need to install ffmpeg manually.*

3.  **Download Weights**:
    Follow the instructions in the `LiveTalking` README to download the necessary model weights (MuseTalk, etc.) and place them in the correct folders.

## 2. Preparing Avatar

You need a source image or video for the avatar.
1.  Find a high-quality portrait (or a short video of the avatar moving slightly).
2.  Place it in the `data/imgs` or `data/video` folder of `LiveTalking`.

## 3. Running the Server

We need to run the `LiveTalking` API server so the system can communicate with it.

```bash
# Inside LiveTalking directory
python app.py
```
By default, this starts a server at `http://localhost:8010`.

## 4. Configuration

1.  Open `backend/app/core/config.py`.
2.  Ensure `LIVE_TALKING_URL` matches your running server (default is `http://localhost:8010`).

## 5. Usage

1.  Start the System (Backend & Frontend).
2.  On the main page, toggle the switch from "Live2D" to "Digital Human".
3.  Chat with the Agent! Response audio will be sent to MuseTalk to generate a lip-synced video stream.
