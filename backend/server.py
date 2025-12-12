from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone
from openai import AsyncOpenAI


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# OpenAI client
openai_client = AsyncOpenAI(api_key=os.environ.get('OPENAI_API_KEY'))

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class AIHelperRequest(BaseModel):
    name: str
    department: str
    challenge: str

class AIHelperResponse(BaseModel):
    approach: str
    tool: str
    why: str
    strategic_alignment: str = ""

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/ai-helper", response_model=AIHelperResponse)
async def ai_helper(request: AIHelperRequest):
    """
    Generate personalized AI suggestions using GPT-5 based on user's challenge and department.
    """
    try:
        # Map department to strategic pillar
        strategic_pillars = {
            "sales": "GLOBAL EDGE by improving proactive outreach and data-driven decision making",
            "marketing": "Innovation Focus through AI-powered content strategies and GLOBAL EDGE via data-driven marketing",
            "operations": "STOCKSMART through optimized processes and ONE TEAM via clear documentation",
            "leadership": "Innovation Focus by leading AI adoption and GLOBAL EDGE through strategic intelligence",
            "it": "Innovation Focus through robust technical infrastructure and ONE TEAM via improved systems",
            "customer-service": "Service Excellence and customer relationships, supporting GLOBAL EDGE through superior experience"
        }
        
        strategic_pillar = strategic_pillars.get(request.department, "organizational excellence")
        
        # Create prompt for GPT-5
        system_prompt = """You are an AI assistant for Dynamics G-Ex, helping employees learn how to use Microsoft Copilot to solve their challenges. 
        
Your tone should be:
- Professional yet cheerful
- Practical and actionable
- Encouraging and supportive
- Include smart Aussie humor when appropriate (light and tasteful)

You should provide:
1. Step-by-step approach (3-5 practical steps)
2. Recommended Microsoft Copilot tool/feature
3. Why this helps (connected to company strategy)
4. Strategic alignment with company pillars

Keep responses concise but helpful. Focus on practical, actionable advice."""

        user_prompt = f"""A {request.department} team member named {request.name} has the following challenge:

"{request.challenge}"

Please provide:
1. A step-by-step approach to tackle this challenge (be specific and actionable)
2. The recommended Microsoft Copilot tool or feature (e.g., "Copilot in Excel", "Copilot in Word", "Copilot in Teams", "Copilot in Outlook", "Copilot in PowerPoint", or just "Copilot")
3. Why this helps the {request.department} department
4. How this aligns with Dynamics G-Ex's strategic pillar: {strategic_pillar}

Format your response as JSON with keys: approach, tool, why, strategic_alignment"""

        # Call GPT-5
        response = await openai_client.chat.completions.create(
            model="gpt-4o",  # Using GPT-4o as it's the latest available
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7,
            max_tokens=800,
            response_format={"type": "json_object"}
        )
        
        # Parse response
        import json
        ai_response = json.loads(response.choices[0].message.content)
        
        # Store in database for analytics
        doc = {
            "name": request.name,
            "department": request.department,
            "challenge": request.challenge,
            "response": ai_response,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
        await db.ai_helper_requests.insert_one(doc)
        
        return AIHelperResponse(**ai_response)
        
    except Exception as e:
        logging.error(f"Error in AI helper: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating AI suggestions: {str(e)}")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()