# How to Deploy Gram-Voice (Frontend + Backend) to Vercel

Vercel is traditionally for static sites, but **I have configured it to host your Python Backend too** using "Serverless Functions".

## Prerequisites

- A GitHub Account
- A Vercel Account

## Steps to Deploy

1.  **Push to GitHub**
    - Create a new repository on GitHub.
    - Push all files in the `translator` folder to this repository.

2.  **Import to Vercel**
    - Go to your Vercel Dashboard.
    - Click **"Add New Project"**.
    - Import your GitHub Repository.

3.  **Project Settings (Important)**
    - **Framework Preset**: Select "Other".
    - **Root Directory**: Leave as `./` (Root).
    - **Build Command**: Leave empty.
    - **Output Directory**: Leave empty.

    _Note: Vercel automatically detects `requirements.txt` and `api/` folder and installs Python._

4.  **Deploy**
    - Click **Deploy**.

## How it Works

- **Frontend**: Served from `/project` folder (via `vercel.json` rules).
- **Backend**: Served from `/api` folder (Python Serverless).
- **TTS**: The app automatically calls `/api/tts` for perfect audio.

## Troubleshooting

- If audio fails on Vercel: Check Vercel Function Logs.
- Use `python backend/server.py` for local testing on your machine.
