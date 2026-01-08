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

# OpenAI client - Using standard OpenAI API
openai_client = AsyncOpenAI(
    api_key=os.environ.get('OPENAI_API_KEY')
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
    conversation_id: str = ""

class QuizSubmission(BaseModel):
    name: str
    email: str = ""
    department: str
    answers: dict
    score: int
    time_taken: int  # in seconds
    feedback: str
    module_id: int = 1
    module_name: str = "Module 1"

class ChatMessage(BaseModel):
    message: str
    conversation_id: str

class ModuleAssistantRequest(BaseModel):
    message: str
    module_id: int
    module_name: str
    module_context: str
    conversation_id: str | None = None

class SuccessStory(BaseModel):
    name: str
    email: str
    department: str = ""
    title: str
    content: str
    imageUrl: str = ""
    linkUrl: str = ""

class StoryLike(BaseModel):
    email: str

class CertificateRequest(BaseModel):
    name: str
    email: str

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
            
            # Convert lists to strings if needed (AI sometimes returns steps as arrays)
            if isinstance(ai_response.get('approach'), list):
                ai_response['approach'] = '\n'.join(f"{i+1}. {step}" if not step.startswith(f"{i+1}.") else step 
                                                     for i, step in enumerate(ai_response['approach']))
            
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
        
        # Generate conversation ID
        conversation_id = str(uuid.uuid4())
        ai_response['conversation_id'] = conversation_id
        
        # Store conversation context
        await db.conversations.insert_one({
            "conversation_id": conversation_id,
            "name": request.name,
            "department": request.department,
            "challenge": request.challenge,
            "initial_response": ai_response,
            "messages": [],
            "timestamp": datetime.now(timezone.utc).isoformat()
        })
        
        return AIHelperResponse(**ai_response)
        
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        logging.error(f"Error in AI helper: {str(e)}")
        logging.error(f"Full traceback: {error_details}")
        raise HTTPException(status_code=500, detail=f"Error generating AI suggestions: {str(e)}")

@api_router.post("/ai-chat")
async def ai_chat(chat_request: ChatMessage):
    """
    Continue the conversation with follow-up questions about Microsoft Copilot.
    Restricted to Copilot-related topics only.
    """
    try:
        # Get conversation context
        conversation = await db.conversations.find_one(
            {"conversation_id": chat_request.conversation_id},
            {"_id": 0}
        )
        
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
        
        # Build conversation history
        messages = [
            {"role": "system", "content": """You are an AI assistant for Dynamics G-Ex, helping employees learn how to use Microsoft Copilot.

IMPORTANT RESTRICTIONS:
- ONLY answer questions related to Microsoft Copilot usage (Word, Excel, PowerPoint, Outlook, Teams)
- If the question is not about Copilot, politely redirect: "I'm here to help with Microsoft Copilot questions. Could you ask about how Copilot can assist with your work?"
- Stay focused on practical, actionable Copilot advice
- Reference the user's original challenge when relevant

Your tone should be:
- Professional yet cheerful
- Practical and actionable
- Encouraging and supportive
- Include smart Aussie humor when appropriate (light and tasteful)

Keep responses concise (2-4 paragraphs max) but helpful."""},
            {"role": "assistant", "content": f"I provided these initial suggestions:\n\nApproach: {conversation['initial_response']['approach']}\n\nTool: {conversation['initial_response']['tool']}\n\nLet me know if you'd like me to elaborate or if you have follow-up questions!"}
        ]
        
        # Add previous messages from this conversation
        for msg in conversation.get('messages', []):
            messages.append({"role": "user", "content": msg['user']})
            messages.append({"role": "assistant", "content": msg['assistant']})
        
        # Add current user message
        messages.append({"role": "user", "content": chat_request.message})
        
        # Call OpenAI
        response = await openai_client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            temperature=0.7,
            max_tokens=1000
        )
        
        assistant_response = response.choices[0].message.content
        
        # Store in conversation history
        await db.conversations.update_one(
            {"conversation_id": chat_request.conversation_id},
            {
                "$push": {
                    "messages": {
                        "user": chat_request.message,
                        "assistant": assistant_response,
                        "timestamp": datetime.now(timezone.utc).isoformat()
                    }
                }
            }
        )
        
        return {"response": assistant_response}
        
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error in chat: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing chat: {str(e)}")

@api_router.post("/module-assistant")
async def module_assistant(request: ModuleAssistantRequest):
    """
    AI assistant for module-specific questions.
    Trained on module content to help users understand the material.
    """
    try:
        # Create or retrieve conversation
        conversation_id = request.conversation_id
        
        if conversation_id:
            # Try to retrieve existing conversation
            conversation = await db.module_conversations.find_one(
                {"conversation_id": conversation_id},
                {"_id": 0}
            )
            if not conversation:
                # Conversation not found, create new one
                logging.warning(f"Conversation {conversation_id} not found, creating new one")
                conversation_id = str(uuid.uuid4())
                conversation = {
                    "conversation_id": conversation_id,
                    "module_id": request.module_id,
                    "module_name": request.module_name,
                    "messages": [],
                    "timestamp": datetime.now(timezone.utc).isoformat()
                }
                await db.module_conversations.insert_one(conversation)
        else:
            # Create new conversation
            conversation_id = str(uuid.uuid4())
            conversation = {
                "conversation_id": conversation_id,
                "module_id": request.module_id,
                "module_name": request.module_name,
                "messages": [],
                "timestamp": datetime.now(timezone.utc).isoformat()
            }
            await db.module_conversations.insert_one(conversation)
        
        # Build context-aware system prompt
        system_prompt = f"""You are the DGX AI Expert, a knowledgeable and helpful teacher specializing in Microsoft Copilot, ChatGPT, and AI productivity tools at Dynamics G-Ex. You're currently helping with: {request.module_name}.

YOUR ROLE:
You are an expert instructor who can answer ANY question about Microsoft Copilot, ChatGPT, and AI tools in the workplace. Think of yourself as a friendly teacher who:
- Gives detailed, step-by-step explanations when helpful
- Provides practical examples and tips
- Explains both the "how" and the "why"
- Helps students truly understand the material

WHAT YOU CAN HELP WITH:
- All Microsoft Copilot features (Word, Excel, PowerPoint, Outlook, Teams, etc.)
- ChatGPT usage and best practices
- AI prompting techniques and strategies
- Data protection and governance when using AI
- Practical workplace applications of AI tools
- Troubleshooting and tips for better AI results
- Comparisons between different AI tools
- Any topic covered in the training modules

HOW TO RESPOND:
- Provide comprehensive, helpful answers with step-by-step guidance when appropriate
- Use bullet points or numbered steps for clarity
- Include practical examples relevant to workplace scenarios
- If a question relates to the current module, reference that content
- For questions outside the current module but related to AI/Copilot, still answer helpfully
- Be encouraging and supportive as a teacher would be

MODULE CONTEXT (for reference):
{request.module_context}

Remember: Your goal is to be the most helpful AI teacher possible, ensuring users truly understand and can apply what they learn about Copilot and AI tools."""

        # Build message history
        messages = [{"role": "system", "content": system_prompt}]
        
        # Add previous messages
        for msg in conversation.get("messages", []):
            messages.append({"role": "user", "content": msg["user"]})
            messages.append({"role": "assistant", "content": msg["assistant"]})
        
        # Add current message
        messages.append({"role": "user", "content": request.message})
        
        # Call OpenAI
        response = await openai_client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            temperature=0.7,
            max_tokens=1000
        )
        
        assistant_response = response.choices[0].message.content
        
        # Store conversation
        await db.module_conversations.update_one(
            {"conversation_id": conversation_id},
            {
                "$push": {
                    "messages": {
                        "user": request.message,
                        "assistant": assistant_response,
                        "timestamp": datetime.now(timezone.utc).isoformat()
                    }
                }
            }
        )
        
        return {
            "response": assistant_response,
            "conversation_id": conversation_id
        }
        
    except Exception as e:
        logging.error(f"Error in module assistant: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")

@api_router.post("/quiz-submit")
async def submit_quiz(submission: QuizSubmission):
    """
    Store quiz submission results
    """
    try:
        doc = {
            "name": submission.name,
            "department": submission.department,
            "answers": submission.answers,
            "score": submission.score,
            "time_taken": submission.time_taken,
            "feedback": submission.feedback,
            "module_id": submission.module_id,
            "module_name": submission.module_name,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
        await db.quiz_submissions.insert_one(doc)
        return {"success": True}
    except Exception as e:
        logging.error(f"Error submitting quiz: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error submitting quiz: {str(e)}")

@api_router.get("/module-stats")
async def get_module_stats():
    """
    Get completion stats and average scores for each module
    """
    try:
        # Get all quiz submissions
        submissions = await db.quiz_submissions.find({}, {"_id": 0}).to_list(1000)
        
        # Calculate stats per module
        module_stats = {}
        for submission in submissions:
            module_id = submission.get("module_id", 1)
            if module_id not in module_stats:
                module_stats[module_id] = {
                    "completions": 0,
                    "total_score": 0,
                    "count": 0
                }
            
            module_stats[module_id]["completions"] += 1
            module_stats[module_id]["total_score"] += submission.get("score", 0)
            module_stats[module_id]["count"] += 1
        
        # Calculate average scores
        for module_id in module_stats:
            if module_stats[module_id]["count"] > 0:
                # Assuming 10 questions per quiz
                avg_percentage = (module_stats[module_id]["total_score"] / (module_stats[module_id]["count"] * 10)) * 100
                module_stats[module_id]["avgScore"] = round(avg_percentage)
            else:
                module_stats[module_id]["avgScore"] = 0
        
        return module_stats
        
    except Exception as e:
        logging.error(f"Error fetching module stats: {str(e)}")
        return {}

@api_router.get("/quiz-results/download")
async def download_quiz_results(password: str):
    """
    Admin endpoint to download all quiz results as CSV
    """
    if password != "Dynamics@26":
        raise HTTPException(status_code=403, detail="Invalid password")
    
    try:
        # Get all quiz submissions
        submissions = await db.quiz_submissions.find({}, {"_id": 0}).to_list(1000)
        
        if not submissions:
            return {"message": "No quiz submissions found"}
        
        # Convert to CSV format
        import csv
        import io
        
        output = io.StringIO()
        
        if submissions:
            # Get all unique answer keys from first submission
            first_submission = submissions[0]
            fieldnames = ["name", "department", "score", "time_taken", "feedback", "timestamp"]
            
            # Add answer columns
            if "answers" in first_submission and first_submission["answers"]:
                # Sort answer keys numerically, not alphabetically
                answer_keys = sorted([int(k) for k in first_submission["answers"].keys()])
                for key in answer_keys:
                    fieldnames.append(f"q{key}_answer")
                    fieldnames.append(f"q{key}_correct")
            
            writer = csv.DictWriter(output, fieldnames=fieldnames)
            writer.writeheader()
            
            for sub in submissions:
                row = {
                    "name": sub.get("name", ""),
                    "department": sub.get("department", ""),
                    "score": sub.get("score", 0),
                    "time_taken": sub.get("time_taken", 0),
                    "feedback": sub.get("feedback", ""),
                    "timestamp": sub.get("timestamp", "")
                }
                
                # Add answers
                if "answers" in sub:
                    for key in answer_keys:
                        row[f"q{key}_answer"] = sub["answers"].get(str(key), {}).get("selected", "")
                        row[f"q{key}_correct"] = "Correct" if sub["answers"].get(str(key), {}).get("correct", False) else "Incorrect"
                
                writer.writerow(row)
        
        csv_content = output.getvalue()
        
        from fastapi.responses import Response
        return Response(
            content=csv_content,
            media_type="text/csv",
            headers={
                "Content-Disposition": f"attachment; filename=quiz_results_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
            }
        )
        
    except Exception as e:
        logging.error(f"Error downloading quiz results: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error downloading results: {str(e)}")

@api_router.get("/quiz-results/view")
async def view_quiz_results(password: str):
    """
    Admin endpoint to view quiz results in a copyable HTML table
    """
    if password != "Dynamics@26":
        raise HTTPException(status_code=403, detail="Invalid password")
    
    try:
        # Get all quiz submissions
        submissions = await db.quiz_submissions.find({}, {"_id": 0}).to_list(1000)
        
        if not submissions:
            html = """
            <!DOCTYPE html>
            <html>
            <head>
                <title>Quiz Results - No Data</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 40px; text-align: center; }
                    .message { color: #666; font-size: 18px; }
                </style>
            </head>
            <body>
                <h1>Quiz Results</h1>
                <p class="message">No quiz submissions found yet.</p>
            </body>
            </html>
            """
            from fastapi.responses import HTMLResponse
            return HTMLResponse(content=html)
        
        # Build HTML table
        html = """
        <!DOCTYPE html>
        <html>
        <head>
            <title>Quiz Results - Dynamics G-Ex AI Training</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { 
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                    padding: 20px; 
                    background: #f5f5f5;
                }
                .header {
                    background: white;
                    padding: 20px;
                    margin-bottom: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                h1 { color: #2B8FBD; margin-bottom: 10px; }
                .info { color: #666; font-size: 14px; margin-bottom: 10px; }
                .actions {
                    margin-top: 15px;
                    display: flex;
                    gap: 10px;
                }
                button {
                    background: #FF8C1A;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                }
                button:hover { background: #e67d15; }
                .table-container {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    overflow-x: auto;
                }
                table { 
                    width: 100%; 
                    border-collapse: collapse; 
                    font-size: 13px;
                }
                th, td { 
                    padding: 12px; 
                    text-align: left; 
                    border: 1px solid #ddd;
                    white-space: nowrap;
                }
                th { 
                    background: #2B8FBD; 
                    color: white; 
                    font-weight: 600;
                    position: sticky;
                    top: 0;
                }
                tr:nth-child(even) { background: #f9f9f9; }
                tr:hover { background: #f0f7fa; }
                .correct { color: #22c55e; font-weight: 600; }
                .incorrect { color: #ef4444; font-weight: 600; }
                .score-high { background: #dcfce7; color: #166534; font-weight: 600; }
                .score-medium { background: #fef3c7; color: #854d0e; font-weight: 600; }
                .score-low { background: #fee2e2; color: #991b1b; font-weight: 600; }
                .copied-message {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #22c55e;
                    color: white;
                    padding: 15px 20px;
                    border-radius: 5px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.2);
                    display: none;
                    z-index: 1000;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>📊 Quiz Results - AI Training Module</h1>
                <p class="info">Total Submissions: <strong>""" + str(len(submissions)) + """</strong> | 
                Generated: <strong>""" + datetime.now().strftime('%Y-%m-%d %H:%M:%S') + """</strong></p>
                <div class="actions">
                    <button onclick="copyTable()">📋 Copy Table to Clipboard</button>
                    <button onclick="copyAsCSV()">📄 Copy as CSV</button>
                    <button onclick="window.print()">🖨️ Print</button>
                </div>
            </div>
            
            <div class="copied-message" id="copiedMessage">✓ Copied to clipboard!</div>
            
            <div class="table-container">
                <table id="resultsTable">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Score</th>
                            <th>Time (sec)</th>
                            <th>Feedback</th>
                            <th>Date</th>
        """
        
        # Add question columns
        if submissions and "answers" in submissions[0]:
            # Sort answer keys numerically
            answer_keys = sorted([int(k) for k in submissions[0]["answers"].keys()])
            for key in answer_keys:
                html += f"<th>Q{key} Answer</th><th>Q{key} Result</th>"
        
        html += "</tr></thead><tbody>"
        
        # Add data rows
        for idx, sub in enumerate(submissions, 1):
            score = sub.get("score", 0)
            total = 10
            percentage = (score / total) * 100
            
            score_class = "score-high" if percentage >= 80 else "score-medium" if percentage >= 60 else "score-low"
            
            html += f"""
            <tr>
                <td>{idx}</td>
                <td><strong>{sub.get("name", "")}</strong></td>
                <td>{sub.get("department", "").title()}</td>
                <td class="{score_class}">{score}/{total} ({percentage:.0f}%)</td>
                <td>{sub.get("time_taken", 0)}s</td>
                <td>{sub.get("feedback", "")}</td>
                <td>{sub.get("timestamp", "")[:10]}</td>
            """
            
            # Add answers
            if "answers" in sub:
                for key in answer_keys:
                    answer_data = sub["answers"].get(str(key), {})
                    answer = answer_data.get("selected", "N/A")
                    is_correct = answer_data.get("correct", False)
                    result_class = "correct" if is_correct else "incorrect"
                    result_text = "✓ Correct" if is_correct else "✗ Incorrect"
                    
                    html += f"<td>{answer}</td><td class='{result_class}'>{result_text}</td>"
            
            html += "</tr>"
        
        html += """
                    </tbody>
                </table>
            </div>
            
            <script>
                function showCopiedMessage() {
                    const msg = document.getElementById('copiedMessage');
                    msg.style.display = 'block';
                    setTimeout(() => { msg.style.display = 'none'; }, 2000);
                }
                
                function copyTable() {
                    const table = document.getElementById('resultsTable');
                    const range = document.createRange();
                    range.selectNode(table);
                    window.getSelection().removeAllRanges();
                    window.getSelection().addRange(range);
                    document.execCommand('copy');
                    window.getSelection().removeAllRanges();
                    showCopiedMessage();
                }
                
                function copyAsCSV() {
                    const table = document.getElementById('resultsTable');
                    let csv = [];
                    
                    // Get headers
                    const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent);
                    csv.push(headers.join(','));
                    
                    // Get rows
                    table.querySelectorAll('tbody tr').forEach(row => {
                        const cols = Array.from(row.querySelectorAll('td')).map(td => {
                            let text = td.textContent.trim();
                            // Escape commas and quotes
                            if (text.includes(',') || text.includes('"')) {
                                text = '"' + text.replace(/"/g, '""') + '"';
                            }
                            return text;
                        });
                        csv.push(cols.join(','));
                    });
                    
                    const csvContent = csv.join('\\n');
                    navigator.clipboard.writeText(csvContent).then(() => {
                        showCopiedMessage();
                    });
                }
            </script>
        </body>
        </html>
        """
        
        from fastapi.responses import HTMLResponse
        return HTMLResponse(content=html)
        
    except Exception as e:
        logging.error(f"Error viewing quiz results: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error viewing results: {str(e)}")

# ==================== SUCCESS STORIES ENDPOINTS ====================

@api_router.get("/success-stories")
async def get_success_stories():
    """Get all success stories"""
    try:
        stories = await db.success_stories.find({}, {"_id": 0}).sort("timestamp", -1).to_list(100)
        return {"stories": stories}
    except Exception as e:
        logging.error(f"Error fetching success stories: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/success-stories")
async def create_success_story(story: SuccessStory):
    """Create a new success story"""
    try:
        doc = {
            "id": str(uuid.uuid4()),
            "name": story.name,
            "email": story.email,
            "department": story.department,
            "title": story.title,
            "content": story.content,
            "imageUrl": story.imageUrl,
            "linkUrl": story.linkUrl,
            "likes": 0,
            "liked_by": [],
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
        await db.success_stories.insert_one(doc)
        return {"message": "Story created successfully", "id": doc["id"]}
    except Exception as e:
        logging.error(f"Error creating success story: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/success-stories/{story_id}/like")
async def like_story(story_id: str, like: StoryLike):
    """Like a success story (requires email that has completed a quiz)"""
    try:
        # Check if user has completed at least one quiz
        quiz_submission = await db.quiz_submissions.find_one(
            {"email": like.email.lower()},
            {"_id": 0}
        )
        
        # Also check with case-insensitive search
        if not quiz_submission:
            quiz_submission = await db.quiz_submissions.find_one(
                {"email": {"$regex": f"^{like.email}$", "$options": "i"}},
                {"_id": 0}
            )
        
        if not quiz_submission:
            raise HTTPException(status_code=403, detail="You must complete at least one quiz to like stories")
        
        # Check if already liked
        story = await db.success_stories.find_one({"id": story_id}, {"_id": 0})
        if not story:
            raise HTTPException(status_code=404, detail="Story not found")
        
        if like.email.lower() in [e.lower() for e in story.get("liked_by", [])]:
            raise HTTPException(status_code=400, detail="You've already liked this story")
        
        # Add like
        await db.success_stories.update_one(
            {"id": story_id},
            {
                "$inc": {"likes": 1},
                "$push": {"liked_by": like.email.lower()}
            }
        )
        
        return {"message": "Story liked!"}
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error liking story: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# ==================== CERTIFICATE ENDPOINTS ====================

@api_router.post("/certificate/check")
async def check_certificate_eligibility(request: CertificateRequest):
    """Check if user is eligible for AI Champion certificate"""
    try:
        email = request.email.lower()
        
        # Test bypass - skip eligibility check for this email
        if email == "certificate@dynamicsgex.com.au":
            return {
                "eligible": True,
                "message": "Congratulations! You've completed all modules with 70%+ scores!",
                "modules": [
                    {"name": "Module 1: AI Fundamentals", "score": 100, "passed": True},
                    {"name": "Module 2: Governance", "score": 100, "passed": True},
                    {"name": "Module 3: Practical Applications", "score": 100, "passed": True},
                    {"name": "Module 4: AI Champions", "score": 100, "passed": True}
                ]
            }
        
        # Get all quiz submissions for this email
        submissions = await db.quiz_submissions.find(
            {"email": {"$regex": f"^{email}$", "$options": "i"}},
            {"_id": 0}
        ).to_list(100)
        
        # Also try exact match
        if not submissions:
            submissions = await db.quiz_submissions.find(
                {"email": email},
                {"_id": 0}
            ).to_list(100)
        
        # Group by module and get best score for each
        module_scores = {}
        for sub in submissions:
            module_id = sub.get("module_id", 1)
            score = sub.get("score", 0)
            if module_id not in module_scores or score > module_scores[module_id]:
                module_scores[module_id] = score
        
        # Check all 4 modules
        modules = [
            {"id": 1, "name": "Module 1: AI Fundamentals"},
            {"id": 2, "name": "Module 2: Governance"},
            {"id": 3, "name": "Module 3: Practical Applications"},
            {"id": 4, "name": "Module 4: AI Champions"}
        ]
        
        result_modules = []
        all_passed = True
        missing_modules = []
        
        for mod in modules:
            score = module_scores.get(mod["id"])
            passed = score is not None and score >= 7
            if not passed:
                all_passed = False
                if score is None:
                    missing_modules.append(mod["name"])
                else:
                    missing_modules.append(f"{mod['name']} (score: {score}/10, need 7+)")
            
            result_modules.append({
                "name": mod["name"],
                "score": score * 10 if score is not None else None,  # Convert to percentage
                "passed": passed
            })
        
        if all_passed:
            return {
                "eligible": True,
                "message": "Congratulations! You've completed all modules with 70%+ scores!",
                "modules": result_modules
            }
        else:
            message = "To earn your certificate, please complete the following:\n" + "\n".join(f"• {m}" for m in missing_modules)
            return {
                "eligible": False,
                "message": message,
                "modules": result_modules
            }
            
    except Exception as e:
        logging.error(f"Error checking certificate eligibility: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/certificate/generate")
async def generate_certificate(request: CertificateRequest):
    """Generate PDF certificate for eligible users"""
    try:
        # First verify eligibility
        email = request.email.lower()
        
        # Test bypass - skip eligibility check for this email
        if email != "certificate@dynamicsgex.com.au":
            submissions = await db.quiz_submissions.find(
                {"email": {"$regex": f"^{email}$", "$options": "i"}},
                {"_id": 0}
            ).to_list(100)
            
            if not submissions:
                submissions = await db.quiz_submissions.find(
                    {"email": email},
                    {"_id": 0}
                ).to_list(100)
            
            module_scores = {}
            for sub in submissions:
                module_id = sub.get("module_id", 1)
                score = sub.get("score", 0)
                if module_id not in module_scores or score > module_scores[module_id]:
                    module_scores[module_id] = score
            
            # Verify all 4 modules passed
            for mod_id in [1, 2, 3, 4]:
                score = module_scores.get(mod_id)
                if score is None or score < 7:
                    raise HTTPException(status_code=403, detail="Not eligible for certificate. Complete all modules with 70%+ score.")
        
        # Generate PDF certificate
        from reportlab.lib.pagesizes import landscape, A4
        from reportlab.lib import colors
        from reportlab.lib.units import inch
        from reportlab.pdfgen import canvas
        from reportlab.pdfbase import pdfmetrics
        from reportlab.pdfbase.ttfonts import TTFont
        from io import BytesIO
        import math
        
        buffer = BytesIO()
        c = canvas.Canvas(buffer, pagesize=landscape(A4))
        width, height = landscape(A4)
        
        # Define brand colors
        # Dynamics G-Ex: Orange (#F37021) and Blue (#0066B3)
        # Copilot: Purple (#7B83EB), Blue (#0078D4), Teal (#00B7C3)
        dgx_orange = colors.Color(0.95, 0.44, 0.13)  # #F37021
        dgx_blue = colors.Color(0, 0.4, 0.7)  # #0066B3
        copilot_purple = colors.Color(0.48, 0.51, 0.92)  # #7B83EB
        copilot_teal = colors.Color(0, 0.72, 0.76)  # #00B7C3
        gold = colors.Color(0.85, 0.65, 0.13)
        
        # Create gradient background
        # Draw multiple rectangles to simulate gradient
        steps = 50
        for i in range(steps):
            ratio = i / steps
            # Blend from light orange-cream at top to light purple-blue at bottom
            r = 0.99 - (ratio * 0.04)  # 0.99 to 0.95
            g = 0.96 - (ratio * 0.06)  # 0.96 to 0.90
            b = 0.93 + (ratio * 0.05)  # 0.93 to 0.98
            c.setFillColor(colors.Color(r, g, b))
            strip_height = height / steps
            c.rect(0, height - (i + 1) * strip_height, width, strip_height + 1, fill=True, stroke=False)
        
        # Draw subtle logo pattern in background
        c.saveState()
        c.setFillColor(colors.Color(0, 0, 0, 0.03))  # Very light opacity
        
        # Pattern of small geometric shapes representing logos
        pattern_size = 60
        for row in range(int(height / pattern_size) + 1):
            for col in range(int(width / pattern_size) + 1):
                x = col * pattern_size + (25 if row % 2 else 0)
                y = row * pattern_size
                
                # Alternate between two shapes
                if (row + col) % 2 == 0:
                    # Dynamics G-Ex inspired shape (hexagon-like)
                    c.setFillColor(colors.Color(0.95, 0.44, 0.13, 0.04))
                    path = c.beginPath()
                    cx, cy = x + 15, y + 15
                    for angle_idx in range(6):
                        angle = math.pi / 3 * angle_idx - math.pi / 6
                        px = cx + 12 * math.cos(angle)
                        py = cy + 12 * math.sin(angle)
                        if angle_idx == 0:
                            path.moveTo(px, py)
                        else:
                            path.lineTo(px, py)
                    path.close()
                    c.drawPath(path, fill=True, stroke=False)
                else:
                    # Copilot inspired shape (infinity/loop)
                    c.setFillColor(colors.Color(0.48, 0.51, 0.92, 0.04))
                    c.circle(x + 10, y + 15, 8, fill=True, stroke=False)
                    c.circle(x + 22, y + 15, 8, fill=True, stroke=False)
        
        c.restoreState()
        
        # Decorative corner flourishes
        c.setStrokeColor(gold)
        c.setLineWidth(2)
        
        # Top-left corner
        c.line(40, height - 40, 40, height - 80)
        c.line(40, height - 40, 80, height - 40)
        
        # Top-right corner
        c.line(width - 40, height - 40, width - 40, height - 80)
        c.line(width - 40, height - 40, width - 80, height - 40)
        
        # Bottom-left corner
        c.line(40, 40, 40, 80)
        c.line(40, 40, 80, 40)
        
        # Bottom-right corner
        c.line(width - 40, 40, width - 40, 80)
        c.line(width - 40, 40, width - 80, 40)
        
        # Elegant double border
        c.setStrokeColor(gold)
        c.setLineWidth(3)
        c.roundRect(25, 25, width - 50, height - 50, 10, fill=False)
        
        c.setStrokeColor(colors.Color(0.75, 0.55, 0.08))
        c.setLineWidth(1)
        c.roundRect(35, 35, width - 70, height - 70, 8, fill=False)
        
        # Header - Company Logo Image
        import os
        logo_path = os.path.join(os.path.dirname(__file__), 'dynamics-gex-logo-header.png')
        if os.path.exists(logo_path):
            # Draw the logo centered at top
            logo_width = 180  # Adjust size as needed
            logo_height = 50  # Adjust based on aspect ratio
            logo_x = (width - logo_width) / 2
            logo_y = height - 95
            c.drawImage(logo_path, logo_x, logo_y, width=logo_width, height=logo_height, preserveAspectRatio=True, mask='auto')
        
        # Decorative line under header
        c.setStrokeColor(gold)
        c.setLineWidth(0.5)
        c.line(width/2 - 100, height - 105, width/2 + 100, height - 105)
        
        # Certificate Title (elegant serif font)
        c.setFillColor(colors.Color(0.15, 0.15, 0.15))
        c.setFont("Times-Bold", 42)
        c.drawCentredString(width / 2, height - 155, "Certificate of Achievement")
        
        # Decorative elements around title
        c.setStrokeColor(gold)
        c.setLineWidth(1)
        c.line(width/2 - 220, height - 165, width/2 - 80, height - 165)
        c.line(width/2 + 80, height - 165, width/2 + 220, height - 165)
        
        # Small diamond decorations
        c.setFillColor(gold)
        for x_offset in [-230, 230]:
            cx = width/2 + x_offset
            cy = height - 165
            c.saveState()
            c.translate(cx, cy)
            c.rotate(45)
            c.rect(-3, -3, 6, 6, fill=True, stroke=False)
            c.restoreState()
        
        # "This is to certify that"
        c.setFont("Times-Italic", 16)
        c.setFillColor(colors.Color(0.4, 0.4, 0.4))
        c.drawCentredString(width / 2, height - 200, "This is to certify that")
        
        # Recipient Name (prominent, elegant)
        c.setFont("Times-Bold", 38)
        c.setFillColor(colors.Color(0.1, 0.1, 0.1))
        c.drawCentredString(width / 2, height - 250, request.name)
        
        # Elegant underline for name
        name_width = c.stringWidth(request.name, "Times-Bold", 38)
        c.setStrokeColor(gold)
        c.setLineWidth(2)
        c.line(width/2 - name_width/2 - 20, height - 265, width/2 + name_width/2 + 20, height - 265)
        c.setLineWidth(0.5)
        c.line(width/2 - name_width/2 - 40, height - 270, width/2 + name_width/2 + 40, height - 270)
        
        # Achievement description
        c.setFont("Times-Roman", 14)
        c.setFillColor(colors.Color(0.35, 0.35, 0.35))
        c.drawCentredString(width / 2, height - 300, "has successfully completed the")
        
        c.setFont("Times-Bold", 22)
        c.setFillColor(colors.Color(0.2, 0.2, 0.2))
        c.drawCentredString(width / 2, height - 330, "DGX AI Champions Training Program")
        
        c.setFont("Times-Roman", 14)
        c.setFillColor(colors.Color(0.35, 0.35, 0.35))
        c.drawCentredString(width / 2, height - 355, "and is hereby recognized as a")
        
        # Champion Title (grand, prominent)
        c.setFont("Times-Bold", 32)
        c.setFillColor(gold)
        c.drawCentredString(width / 2, height - 395, "DGX AI CHAMPION")
        
        # Copilot proficiency note
        c.setFont("Times-Italic", 12)
        c.setFillColor(copilot_purple)
        c.drawCentredString(width / 2, height - 420, "Demonstrating proficiency in Microsoft Copilot and AI Best Practices")
        
        # Date section with elegant formatting
        from datetime import datetime
        today = datetime.now().strftime("%B %d, %Y")
        
        c.setFont("Times-Roman", 11)
        c.setFillColor(colors.Color(0.4, 0.4, 0.4))
        c.drawCentredString(width / 2, height - 460, "Awarded on")
        
        c.setFont("Times-Bold", 14)
        c.setFillColor(colors.Color(0.3, 0.3, 0.3))
        c.drawCentredString(width / 2, height - 478, today)
        
        # Footer section
        c.setStrokeColor(colors.Color(0.8, 0.8, 0.8))
        c.setLineWidth(0.5)
        c.line(60, 90, width - 60, 90)
        
        # Footer logos/text
        c.setFont("Times-Bold", 10)
        c.setFillColor(dgx_orange)
        c.drawString(70, 70, "Dynamics G-Ex AI Hub")
        
        c.setFillColor(copilot_purple)
        c.drawRightString(width - 70, 70, "Powered by Microsoft Copilot")
        
        # Certificate ID
        cert_id = str(uuid.uuid4())[:8].upper()
        c.setFont("Times-Roman", 8)
        c.setFillColor(colors.Color(0.6, 0.6, 0.6))
        c.drawCentredString(width / 2, 55, f"Certificate ID: DGX-CHAMPION-{cert_id}")
        
        # Seal/Badge in bottom center
        seal_x, seal_y = width / 2, 115
        c.setFillColor(colors.Color(gold.red, gold.green, gold.blue, 0.15))
        c.circle(seal_x, seal_y, 30, fill=True, stroke=False)
        c.setStrokeColor(gold)
        c.setLineWidth(2)
        c.circle(seal_x, seal_y, 30, fill=False, stroke=True)
        c.setLineWidth(1)
        c.circle(seal_x, seal_y, 25, fill=False, stroke=True)
        
        # Star in seal
        c.setFillColor(gold)
        points = []
        for i in range(5):
            angle = math.pi / 2 + i * 4 * math.pi / 5
            points.append((seal_x + 15 * math.cos(angle), seal_y + 15 * math.sin(angle)))
            angle = math.pi / 2 + i * 4 * math.pi / 5 + 2 * math.pi / 5
            points.append((seal_x + 7 * math.cos(angle), seal_y + 7 * math.sin(angle)))
        
        path = c.beginPath()
        path.moveTo(points[0][0], points[0][1])
        for px, py in points[1:]:
            path.lineTo(px, py)
        path.close()
        c.drawPath(path, fill=True, stroke=False)
        
        c.save()
        
        buffer.seek(0)
        
        from fastapi.responses import StreamingResponse
        return StreamingResponse(
            buffer,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename=DGX_AI_Champion_Certificate_{request.name.replace(' ', '_')}.pdf"
            }
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error generating certificate: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

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