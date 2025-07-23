# 🧠 Smart Waste Management System – AI/ML Model API

This is the **AI/ML microservice** of the **Smart Waste Management System**, built with **FastAPI**.  
It integrates:
- 🖼️ Image classification using Hugging Face Transformers
- 🤖 Environmental guidance powered by **Google Gemini** via LangChain

---

## 🚀 Features

- Upload an image of waste, get back its predicted class
- Get eco-friendly reuse or disposal tips via **Gemini 1.5 Flash**
- Gemini-powered chatbot for environmental queries

---

## 🛠️ Tech Stack

- **FastAPI** (API framework)
- **Transformers (Hugging Face)** for image classification (`google/vit-base-patch16-224`)
- **LangChain + Gemini 1.5 Flash** (Generative AI model)
- **PIL** (image handling)
- **Uvicorn** (ASGI server)

---

## ⚙️ Setup Instructions

### 1. Create a Virtual Environment
```bash
python -m venv venv
```
### 2. Activate the Virtual Environment

Windows:

```bash
venv\Scripts\activate
```
macOS/Linux:

```bash
source venv/bin/activate
```
### 4. Install Dependencies
```bash
pip install -r requirements.txt
```
Make sure requirements.txt includes:

```bash
fastapi
uvicorn
python-dotenv
transformers
pillow
langchain
langchain-google-genai
```
### 5. Set Environment Variables
Create a .env file in the root directory:
`
env

GOOGLE_API_KEY=your_google_gemini_api_key_here
🔐 Keep your API key secret — do not commit .env to version control.

6. Run the Server
```bash
uvicorn main:app --reload
```
Server will be running at: http://localhost:8000
