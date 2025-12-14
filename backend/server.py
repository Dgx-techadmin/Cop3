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

# OpenAI client - Using Emergent Universal Key with their API endpoint
openai_client = AsyncOpenAI(
    api_key=os.environ.get('OPENAI_API_KEY'),
    base_url="https://api.emergent.sh/v1"
)

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
async def get_status_checks(skip: int = 0, limit: int = 100):
    # Exclude MongoDB's _id field from the query results with pagination
    # Limit max to 100 items per request for better performance
    limit = min(limit, 100)
    status_checks = await db.status_checks.find({}, {"_id": 0}).skip(skip).limit(limit).to_list(limit)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/ai-helper", response_model=AIHelperResponse)
async def ai_helper(request: AIHelperRequest):
    """
    Generate personalized AI suggestions using live AI (Emergent Universal Key -> GPT-4o).
    Falls back to intelligent mock responses if API fails.
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
        
        # Try live AI first
        try:
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

            # Call GPT-4o via Emergent
            response = await openai_client.chat.completions.create(
                model="gpt-4o",
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
            logging.info("✅ Live AI response generated successfully")
            
        except Exception as ai_error:
            logging.warning(f"Live AI failed, using fallback: {str(ai_error)}")
            
            # Fallback: Generate intelligent responses based on department
            responses_by_dept = {
            "sales": {
                "approach": "1. Use Copilot in Excel to analyze historical sales data and identify patterns\n2. Create predictive models by asking Copilot to \"analyze trends in deal closures by industry and size\"\n3. Generate automated reports with key insights and forecasts\n4. Use Copilot in Outlook to draft personalized follow-up emails based on customer data\n5. Set up Copilot-powered dashboards to track real-time performance against forecasts",
                "tool": "Copilot in Excel",
                "why": "Excel Copilot excels at data analysis and pattern recognition, making it perfect for sales forecasting. It can process large datasets quickly, identify correlations you might miss, and generate actionable insights that help you close deals faster and more predictably.",
                "strategic_alignment": f"This directly supports {strategic_pillar}, enabling your team to make proactive, data-backed decisions that improve win rates and revenue predictability."
            },
            "marketing": {
                "approach": "1. Use Copilot to brainstorm creative campaign concepts tailored to your target audience\n2. Draft compelling copy for multiple channels (email, social, ads) in minutes\n3. Analyze customer feedback and sentiment from surveys using Copilot in Excel\n4. Generate content calendars and coordinate across teams using Copilot in Teams\n5. Create polished presentations with Copilot in PowerPoint for stakeholder buy-in",
                "tool": "Copilot",
                "why": "Copilot streamlines content creation and campaign planning, allowing you to test more ideas faster. It helps maintain brand consistency while adapting tone for different audiences, and frees up time for strategic thinking rather than repetitive writing tasks.",
                "strategic_alignment": f"This supports {strategic_pillar}, enabling faster campaign launches and more data-informed creative decisions that resonate with customers."
            },
            "operations": {
                "approach": "1. Document your current process in Copilot in Word as a starting point\n2. Ask Copilot to identify potential bottlenecks and inefficiencies\n3. Use Copilot in Teams to capture meeting notes and action items automatically\n4. Create standardized SOPs with Copilot assistance for consistency\n5. Generate process maps and flowcharts to visualize improvements",
                "tool": "Copilot in Word",
                "why": "Copilot makes documentation effortless and helps you spot optimization opportunities you might overlook. It ensures your SOPs are clear, comprehensive, and easy to update, which is crucial for maintaining operational excellence as your team grows.",
                "strategic_alignment": f"This supports {strategic_pillar}, creating the foundation for scalable, efficient operations that free up your team to focus on high-value work."
            },
            "leadership": {
                "approach": "1. Use Copilot to synthesize data from multiple reports into executive summaries\n2. Ask Copilot in PowerPoint to create board-ready presentations with key insights\n3. Analyze market trends and competitive intelligence using Copilot's research capabilities\n4. Draft strategic communications to align your team using Copilot in Outlook\n5. Use Copilot in Teams to stay on top of important discussions without getting lost in threads",
                "tool": "Copilot in PowerPoint",
                "why": "Leaders need to make quick, informed decisions without getting bogged down in details. Copilot helps you extract insights from complex data, communicate vision clearly, and stay strategic rather than tactical. It's like having a chief of staff that works 24/7.",
                "strategic_alignment": f"This supports {strategic_pillar}, enabling you to lead with clarity and confidence while driving AI adoption across the organization."
            },
            "it": {
                "approach": "1. Use Copilot in Word to draft comprehensive technical documentation quickly\n2. Create troubleshooting guides by describing common issues to Copilot\n3. Generate security policies and governance frameworks with Copilot assistance\n4. Use Copilot to document API integrations with clear examples\n5. Build knowledge base articles that make complex tech accessible to non-technical users",
                "tool": "Copilot in Word",
                "why": "Good documentation is critical but time-consuming. Copilot accelerates doc creation while maintaining clarity and completeness. It helps you capture institutional knowledge before team members move on, and makes technical concepts accessible to everyone.",
                "strategic_alignment": f"This supports {strategic_pillar}, building robust technical infrastructure through better knowledge sharing and system documentation."
            },
            "customer-service": {
                "approach": "1. Use Copilot in Outlook to draft empathetic, solution-focused customer responses\n2. Analyze support ticket trends in Excel to identify common pain points\n3. Create comprehensive FAQ documents with Copilot in Word based on frequent inquiries\n4. Generate customer satisfaction survey analysis and insights\n5. Use Copilot to maintain a knowledge base that reduces response time",
                "tool": "Copilot in Outlook",
                "why": "Customer service is all about speed and empathy. Copilot helps you respond faster without sacrificing quality, maintain the right tone even when rushed, and scale your support without losing the personal touch. It's like giving every team member superpowers.",
                "strategic_alignment": f"This supports {strategic_pillar}, enabling you to deliver consistently excellent experiences that build customer loyalty and drive referrals."
            }
            }
            
            # Get department-specific response or use a default
            ai_response = responses_by_dept.get(request.department, {
                "approach": "1. Start by clearly defining your objective and desired outcome\n2. Use Copilot to draft, analyze, or generate content relevant to your challenge\n3. Iterate and refine the output by providing specific feedback\n4. Validate the results and adapt them to your specific context\n5. Share insights with your team to multiply the impact",
                "tool": "Copilot",
                "why": "Copilot accelerates your work by handling routine tasks, providing smart suggestions, and helping you focus on what matters most. It's designed to augment your expertise, not replace it.",
                "strategic_alignment": f"This supports {strategic_pillar}, enabling you to work smarter and achieve better results faster."
            })
        
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
        import traceback
        error_details = traceback.format_exc()
        logging.error(f"Error in AI helper: {str(e)}")
        logging.error(f"Full traceback: {error_details}")
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