from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from transformers import pipeline
from PIL import Image
from dotenv import load_dotenv
import io
import os

# --- Load environment variables ---
load_dotenv()
google_api_key = os.getenv("GOOGLE_API_KEY")

# --- Initialize FastAPI app ---
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Initialize ML Models ---
# 1. Image classification pipeline from Hugging Face
classifier = pipeline("image-classification", model="google/vit-base-patch16-224")

# 2. Gemini (Google Generative AI) setup via LangChain
llm = ChatGoogleGenerativeAI(
    model="models/gemini-1.5-flash",
    temperature=0.7,
    google_api_key=google_api_key
)
prompt = PromptTemplate.from_template(
    "My trash includes {object} as an object and I want some tips to make it something useful for nature such that it doesn't harm the environment. What should I do?"
)
chain = prompt | llm

# --- Request Model ---
class PromptRequest(BaseModel):
    prompt: str

# --- Routes ---
@app.post("/classify-and-check")
async def classify_and_check(file: UploadFile = File(...)):
    image_bytes = await file.read()
    try:
        image = Image.open(io.BytesIO(image_bytes))
    except Exception:
        return {"error": "Uploaded file is not a valid image."}

    # Step 1: Image Classification
    prediction = classifier(image)
    predicted_class = prediction[0]["label"]

    # Step 2: Generate environmental tip using Gemini
    response = chain.invoke({"object": predicted_class})
    response_text = getattr(response, "content", str(response))  # Safe access

    return {
        "predicted_class": predicted_class,
        "gemini_response": response_text
    }

@app.post("/gemini-chat")
async def gemini_chat(prompt_data: PromptRequest):
    try:
        response = llm.invoke(prompt_data.prompt)
        response_text = getattr(response, "content", str(response))
        return {"response": response_text}
    except Exception as e:
        return {"error": str(e)}
