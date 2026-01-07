import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, BookOpen, Target, Users, Package, HeadphonesIcon, CheckCircle, 
  XCircle, ArrowRight, AlertCircle, Briefcase, Mail, MessageSquare, 
  FileText, Settings, Code, Globe, Monitor, Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CollapsibleSection } from "@/components/training/CollapsibleSection";
import { StepByStepGuide } from "@/components/training/StepByStepGuide";
import { UseCaseCard } from "@/components/training/UseCaseCard";
import { QuizComponent } from "@/components/training/QuizComponent";
import { ModuleAIExpert } from "@/components/training/ModuleAIExpert";
import { quizQuestions } from "@/data/quizQuestions";

export default function TrainingModuleEnhanced() {
  const navigate = useNavigate();

  const moduleContext = `This is Module 1: Intro to AI & Dynamics G-Ex Strategy. 
  
Key Topics:
- What AI IS: A tool to augment human capabilities, great at pattern recognition, helpful for drafting/summarizing, time-saving for repetitive tasks
- What AI IS NOT: A replacement for human judgment, always 100% accurate, capable of understanding context like humans, a substitute for emotional intelligence
- Strategic Pillars: ONE TEAM (collaboration), GLOBAL EDGE (international reach), STOCKSMART (inventory optimization), Innovation Focus (leading with AI)
- Microsoft Copilot: Primary authorized AI tool at G-Ex, integrated with Teams, Outlook, Word, Excel, PowerPoint
- Department Use Cases: Sales (forecasting, email campaigns), Marketing (content creation, SEO), Operations (SOPs, process optimization), Leadership (executive summaries, strategic planning), IT (technical documentation), Customer Service (empathetic responses, FAQ generation)
- Getting Started: Access Copilot via Microsoft 365 sidebar, use clear prompts, fact-check outputs, apply human judgment`;


  const aiIsExamples = [
    {
      title: "A tool to augment human capabilities",
      example: "Copilot helps you write faster emails, but you choose the tone and final message. It's your assistant, not your replacement."
    },
    {
      title: "Great at pattern recognition and data analysis",
      example: "Ask Copilot to 'analyze sales trends from the last 6 months' and it'll spot patterns you might miss in thousands of rows."
    },
    {
      title: "Helpful for drafting, summarizing, and brainstorming",
      example: "Stuck on a report? Ask Copilot to 'draft an executive summary of this quarter's performance' as a starting point."
    },
    {
      title: "Time-saving for repetitive tasks",
      example: "Instead of manually formatting 50 spreadsheets, ask Copilot to 'apply consistent formatting to all sheets.'"
    },
    {
      title: "Always learning and improving",
      example: "The more you use AI with clear prompts, the better it understands your preferences and work style."
    }
  ];

  const aiIsNotExamples = [
    {
      title: "A replacement for human judgment",
      example: "AI can suggest a strategy, but only you know your customer's unique needs and can make the final call."
    },
    {
      title: "Always 100% accurate (fact-check outputs!)",
      example: "If Copilot drafts an email with incorrect product specs, you'll catch it - AI can hallucinate or mix up details."
    },
    {
      title: "Capable of understanding context like humans",
      example: "AI doesn't know your customer is going through a tough time - you add the empathy and personal touch."
    },
    {
      title: "A substitute for emotional intelligence",
      example: "When resolving a customer complaint, AI can draft words, but you provide the genuine care and understanding."
    },
    {
      title: "Magic – it needs good prompts to work well",
      example: "Bad prompt: 'Do sales stuff.' Good prompt: 'Draft a follow-up email for prospect X highlighting ROI from our Core Trays.'"
    }
  ];

  const pillarUseCases = {
    globalEdge: [
      {
        title: "Multi-region Customer Insights",
        description: "Use Copilot in Excel to analyze customer feedback across Australia, US, Canada, and identify regional preferences instantly."
      },
      {
        title: "24/7 Email Response",
        description: "Draft professional responses to international clients in different time zones using Copilot in Outlook, ensuring no delay in communication."
      },
      {
        title: "Market Trend Analysis",
        description: "Ask Copilot to analyze global mining trends and identify opportunities for expansion in new territories."
      }
    ],
    oneTeam: [
      {
        title: "Knowledge Sharing",
        description: "Use Copilot in Teams to summarize key learnings from meetings and share with the entire organization instantly."
      },
      {
        title: "Collaborative Documentation",
        description: "Teams can co-create SOPs in Word with Copilot suggesting improvements, ensuring consistent processes globally."
      },
      {
        title: "Cross-Department Communication",
        description: "Copilot helps translate technical jargon into simple language, making it easier for different teams to understand each other."
      }
    ],
    stockSmart: [
      {
        title: "Predictive Inventory Management",
        description: "Copilot in Excel analyzes historical data to predict which products (Core Trays, Sample Bags) will be in high demand next quarter."
      },
      {
        title: "Automated Reorder Alerts",
        description: "Set up Copilot-powered dashboards that alert you when stock levels hit reorder points, preventing shortages."
      },
      {
        title: "Waste Reduction",
        description: "Identify slow-moving inventory with Copilot's data analysis and make informed decisions about promotions or discontinuation."
      }
    ],
    innovation: [
      {
        title: "Competitive Advantage",
        description: "Being AI-proficient makes G-Ex more efficient than competitors still doing everything manually."
      },
      {
        title: "Customer-First Innovation",
        description: "Use AI insights to anticipate customer needs before they ask, positioning G-Ex as a forward-thinking partner."
      },
      {
        title: "Employee Empowerment",
        description: "Every team member can work smarter with AI tools, freeing time for creative problem-solving and customer relationships."
      }
    ]
  };

  const departmentUseCases = [
    {
      title: "Sales & Marketing",
      icon: Briefcase,
      color: "bg-blue-100",
      iconColor: "text-blue-600",
      description: "Boost productivity with AI-powered CRM insights, email automation, and campaign generation.",
      examples: [
        {
          title: "Email Campaigns",
          prompt: "Draft 5 personalized email templates for different customer segments (mining, exploration, labs) highlighting our Sample Bags' quality advantage."
        },
        {
          title: "Teams Meeting Follow-up",
          prompt: "After a sales call, use Copilot in Teams to generate a summary with action items and send to the prospect within minutes."
        },
        {
          title: "Automated Lead Scoring",
          prompt: "Ask Copilot in Excel: 'Analyze our leads from last quarter, score by engagement level, and highlight top 10 for immediate follow-up.'"
        }
      ]
    },
    {
      title: "Operations",
      icon: Settings,
      color: "bg-green-100",
      iconColor: "text-green-600",
      description: "Streamline processes with automated documentation, meeting summaries, and workflow optimization.",
      examples: [
        {
          title: "SOP Automation",
          prompt: "Use Copilot in Word to draft an SOP for warehouse receiving process, including safety checks and inventory logging."
        },
        {
          title: "Meeting Action Items",
          prompt: "During operations meetings in Teams, Copilot automatically captures action items, assigns owners, and sets deadlines."
        },
        {
          title: "Low-Level Task Automation",
          prompt: "Automate weekly inventory reports: 'Generate a formatted report comparing this week's stock levels to last week, highlight variances.'"
        }
      ]
    },
    {
      title: "Customer Service",
      icon: HeadphonesIcon,
      color: "bg-pink-100",
      iconColor: "text-pink-600",
      description: "Deliver exceptional support with AI-powered response templates and sentiment analysis.",
      examples: [
        {
          title: "Empathetic Email Responses",
          prompt: "Draft a response to customer frustrated with delayed shipment. Tone: empathetic and solution-focused. Include apology and compensation offer."
        },
        {
          title: "FAQ Generation from Tickets",
          prompt: "Analyze last month's support tickets in Excel, identify top 5 recurring questions, and draft FAQ answers."
        },
        {
          title: "Teams Chat for Quick Resolutions",
          prompt: "In Teams, ask Copilot: 'What's our return policy for damaged Core Trays?' Get instant answers from company knowledge base."
        }
      ]
    },
    {
      title: "Leadership",
      icon: Users,
      color: "bg-orange-100",
      iconColor: "text-orange-600",
      description: "Make strategic decisions faster with AI-generated insights and executive summaries.",
      examples: [
        {
          title: "Executive Summaries",
          prompt: "Copilot in PowerPoint: 'Create a 3-slide executive summary of Q4 performance with key metrics and recommendations.'"
        },
        {
          title: "Email Time Management",
          prompt: "Use Copilot in Outlook to prioritize emails: 'Summarize unread emails and flag urgent items requiring immediate attention.'"
        },
        {
          title: "Strategic Planning",
          prompt: "In Word, ask Copilot: 'Based on current market trends, suggest 3 strategic initiatives for FY26 aligned with Innovation Focus.'"
        }
      ]
    },
    {
      title: "IT",
      icon: Code,
      color: "bg-indigo-100",
      iconColor: "text-indigo-600",
      description: "Accelerate technical documentation and system troubleshooting with AI assistance.",
      examples: [
        {
          title: "Technical Documentation",
          prompt: "Use Copilot in Word: 'Create step-by-step guide for setting up new employee Microsoft 365 accounts with security protocols.'"
        },
        {
          title: "Troubleshooting Scripts",
          prompt: "In Teams, ask Copilot: 'Common fixes for Outlook sync issues' to quickly help colleagues without creating tickets."
        },
        {
          title: "Low-Level Automation",
          prompt: "Automate routine tasks: 'Create Excel macro to consolidate IT tickets by category and generate weekly summary report.'"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 bg-gradient-to-b from-background to-secondary/20">
        {/* Module Banner */}
        <div 
          className="relative bg-primary overflow-hidden"
          style={{
            backgroundImage: `url('/dynamics-gex-logo.png')`,
            backgroundSize: '120px',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center',
            opacity: 0.95
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-primary/95"></div>
          <div className="relative py-8 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <BookOpen className="w-6 h-6 text-white" />
                <span className="text-2xl sm:text-3xl font-heading font-bold text-white">
                  Module 1: Foundation
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-background via-background to-secondary/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground">
              Intro to AI & <span className="text-primary">Dynamics G-Ex</span> Strategy
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Welcome! AI isn't magic pixie dust – it's a practical tool to make your work easier and help Dynamics G-Ex stay ahead. Let's explore how AI aligns with our FY26 strategy.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <Badge variant="outline" className="text-sm px-3 py-1">
                <Target className="w-3 h-3 mr-1" /> ONE TEAM
              </Badge>
              <Badge variant="outline" className="text-sm px-3 py-1">
                <Globe className="w-3 h-3 mr-1" /> GLOBAL EDGE
              </Badge>
              <Badge variant="outline" className="text-sm px-3 py-1">
                <Package className="w-3 h-3 mr-1" /> STOCKSMART
              </Badge>
              <Badge variant="outline" className="text-sm px-3 py-1">
                <Sparkles className="w-3 h-3 mr-1" /> Innovation Focus
              </Badge>
            </div>
          </div>
        </section>

        {/* What AI Is and Isn't - Collapsible */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <Card className="shadow-card border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <span>What AI Is (and Isn't)</span>
                </CardTitle>
                <CardDescription>Click each item to see practical examples</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-600 flex items-center space-x-2 mb-3">
                    <CheckCircle className="w-5 h-5" />
                    <span>AI IS:</span>
                  </h4>
                  {aiIsExamples.map((item, idx) => (
                    <CollapsibleSection
                      key={idx}
                      title={item.title}
                      icon={CheckCircle}
                    >
                      <p className="text-sm text-muted-foreground italic bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                        💡 <strong>Example:</strong> {item.example}
                      </p>
                    </CollapsibleSection>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-red-600 flex items-center space-x-2 mb-3">
                    <XCircle className="w-5 h-5" />
                    <span>AI ISN'T:</span>
                  </h4>
                  {aiIsNotExamples.map((item, idx) => (
                    <CollapsibleSection
                      key={idx}
                      title={item.title}
                      icon={XCircle}
                    >
                      <p className="text-sm text-muted-foreground italic bg-red-50 dark:bg-red-950 p-3 rounded-lg">
                        ⚠️ <strong>Example:</strong> {item.example}
                      </p>
                    </CollapsibleSection>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why AI Matters - With Use Cases */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-heading font-bold text-foreground">Why AI Matters for Dynamics G-Ex</h2>
              <p className="text-muted-foreground">AI drives our strategic pillars forward</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-card border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-primary" />
                    <span>GLOBAL EDGE</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pillarUseCases.globalEdge.map((useCase, idx) => (
                    <div key={idx} className="bg-muted/50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-foreground mb-1">{useCase.title}</p>
                      <p className="text-xs text-muted-foreground">{useCase.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-card border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span>ONE TEAM</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pillarUseCases.oneTeam.map((useCase, idx) => (
                    <div key={idx} className="bg-muted/50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-foreground mb-1">{useCase.title}</p>
                      <p className="text-xs text-muted-foreground">{useCase.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-card border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-primary" />
                    <span>STOCKSMART</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pillarUseCases.stockSmart.map((useCase, idx) => (
                    <div key={idx} className="bg-muted/50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-foreground mb-1">{useCase.title}</p>
                      <p className="text-xs text-muted-foreground">{useCase.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-card border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span>Innovation Focus</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pillarUseCases.innovation.map((useCase, idx) => (
                    <div key={idx} className="bg-muted/50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-foreground mb-1">{useCase.title}</p>
                      <p className="text-xs text-muted-foreground">{useCase.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Authorised Tools with Step-by-Step */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-heading font-bold text-foreground">Authorised AI Tools & How to Access</h2>
              <p className="text-muted-foreground">Step-by-step guides for getting started</p>
            </div>

            <Card className="shadow-card border-2 border-primary/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Badge className="bg-primary text-white">PRIMARY</Badge>
                      <span>Microsoft Copilot</span>
                    </CardTitle>
                    <CardDescription>Integrated with all Microsoft 365 apps - Your main AI tool</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <StepByStepGuide
                    title="Copilot in Teams"
                    icon={MessageSquare}
                    steps={[
                      "Open Microsoft Teams (desktop or web)",
                      "Look for the Copilot icon in the left sidebar",
                      "Click the icon to open Copilot chat",
                      "Ask questions like 'Summarize today's messages' or 'What action items do I have?'",
                      "During meetings, Copilot appears automatically to take notes"
                    ]}
                  />

                  <StepByStepGuide
                    title="Copilot in Outlook"
                    icon={Mail}
                    steps={[
                      "Open Outlook (desktop app or web)",
                      "When composing an email, look for the Copilot icon in the toolbar",
                      "Click 'Draft with Copilot'",
                      "Describe what you want: e.g., 'Reply to this email professionally, thanking them for their inquiry'",
                      "Review and edit the draft before sending"
                    ]}
                  />

                  <StepByStepGuide
                    title="Copilot in Browser"
                    icon={Monitor}
                    steps={[
                      "Go to copilot.microsoft.com in your web browser",
                      "Sign in with your @dynamicsgex.com Microsoft account",
                      "Start chatting - ask about Excel formulas, document drafting, or general questions",
                      "Use the plugin options to connect to your Microsoft 365 data",
                      "Bookmark the page for quick access"
                    ]}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-2 border-orange-200">
              <CardHeader>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline">SECONDARY</Badge>
                    <CardTitle>ChatGPT</CardTitle>
                  </div>
                  <CardDescription>For general brainstorming - Professional access available with justification</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <StepByStepGuide
                    title="Accessing ChatGPT"
                    icon={Globe}
                    steps={[
                      "Go to chat.openai.com in your browser",
                      "Create a free account with your personal email (NOT work email)",
                      "Start chatting for general questions and brainstorming",
                      "NEVER input confidential data, customer info, or proprietary information",
                      "For professional access, submit request per AI Governance policy"
                    ]}
                  />

                  <StepByStepGuide
                    title="Self-Education with ChatGPT"
                    icon={BookOpen}
                    steps={[
                      "Ask ChatGPT: 'Teach me how to write better prompts for AI'",
                      "Practice by asking: 'Show me examples of good vs bad prompts for [your task]'",
                      "Use it to learn: 'Explain [concept] in simple terms with examples'",
                      "Test different prompt styles to see what works best",
                      "Join the #ai-learning channel in Teams to share tips"
                    ]}
                  />
                </div>

                <div className="bg-orange-50 dark:bg-orange-950 border-2 border-orange-200 dark:border-orange-800 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                    <div className="space-y-2">
                      <h4 className="font-semibold text-orange-900 dark:text-orange-100">Data Protection Steps for ChatGPT Free</h4>
                      <ul className="text-sm text-orange-700 dark:text-orange-200 space-y-1">
                        <li>✓ Only use for general questions and public information</li>
                        <li>✓ Never mention customer names, project details, or financials</li>
                        <li>✓ Avoid company-specific strategies or proprietary processes</li>
                        <li>✓ Use generic examples: 'a mining company' not 'BHP'</li>
                        <li>✓ When in doubt, use Copilot instead (it's more secure)</li>
                      </ul>
                      <div className="mt-3 pt-3 border-t border-orange-200 dark:border-orange-800">
                        <p className="text-sm text-orange-900 dark:text-orange-100">
                          <strong>💼 Professional Access:</strong> ChatGPT Plus/Enterprise can be requested with valid business justification according to our AI Governance policy. Submit request to IT with use case details.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* AI in Action - Enhanced */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-heading font-bold text-foreground">AI in Action Across Departments</h2>
              <p className="text-muted-foreground">Practical examples with emphasis on email, Teams meetings, and automation</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departmentUseCases.map((dept, idx) => (
                <UseCaseCard
                  key={idx}
                  title={dept.title}
                  icon={dept.icon}
                  color={dept.color}
                  iconColor={dept.iconColor}
                  description={dept.description}
                  examples={dept.examples}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-card border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-6 h-6 text-primary" />
                  <span>Your AI Learning Resources</span>
                </CardTitle>
                <CardDescription>Everything you need to get started with AI at Dynamics G-Ex</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="justify-start h-auto py-4 border-2 hover:border-primary hover:bg-primary/5"
                    onClick={() => navigate('/')}
                  >
                    <div className="text-left">
                      <div className="font-semibold flex items-center space-x-2 mb-1">
                        <Sparkles className="w-4 h-4" />
                        <span>G-Ex AI Hub Homepage</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Interactive AI helper and department tips</p>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start h-auto py-4 border-2 hover:border-primary hover:bg-primary/5"
                    onClick={() => navigate('/tutorials')}
                  >
                    <div className="text-left">
                      <div className="font-semibold flex items-center space-x-2 mb-1">
                        <BookOpen className="w-4 h-4" />
                        <span>Microsoft Copilot Tutorials</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Step-by-step video guides</p>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start h-auto py-4 border-2 hover:border-primary hover:bg-primary/5"
                    onClick={() => window.open('https://learn.microsoft.com/en-us/copilot/microsoft-365/', '_blank')}
                  >
                    <div className="text-left">
                      <div className="font-semibold flex items-center space-x-2 mb-1">
                        <Target className="w-4 h-4" />
                        <span>Microsoft Copilot Documentation</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Official Microsoft resources</p>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start h-auto py-4 border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950"
                    onClick={() => window.open('/ai-governance-policy.pdf', '_blank')}
                  >
                    <div className="text-left">
                      <div className="font-semibold flex items-center space-x-2 mb-1 text-orange-700 dark:text-orange-300">
                        <AlertCircle className="w-4 h-4" />
                        <span>AI Governance Policy</span>
                      </div>
                      <p className="text-xs text-orange-600 dark:text-orange-400">Required reading - Data protection guidelines</p>
                    </div>
                    <FileText className="w-4 h-4 ml-auto text-orange-600" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quiz Section */}
        <section id="quiz-section" className="py-12 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <QuizComponent 
              questions={quizQuestions} 
              moduleId={1}
              moduleName="Intro to AI & Dynamics G-Ex Strategy"
            />
          </div>
        </section>

        {/* Next Steps */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-elegant bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
              <CardContent className="pt-8 space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-heading font-bold text-foreground">What's Next?</h2>
                  <p className="text-muted-foreground">Continue your AI journey with these next steps</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-card rounded-lg p-6 space-y-3 border border-border hover:border-primary/30 transition-all cursor-pointer"
                       onClick={() => navigate('/training/module-2')}>
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-foreground">Module 2: Governance & Responsible AI Use</h3>
                    <p className="text-sm text-muted-foreground">Learn the dos and don'ts of AI usage, data protection, and responsible AI practices</p>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/training/module-2');
                      }}
                    >
                      Start Module 2
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>

                  <div className="bg-card rounded-lg p-6 space-y-3 border border-border">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-semibold text-foreground">Bookmark the AI Hub</h3>
                    <p className="text-sm text-muted-foreground">Access prompts, tutorials, and get AI suggestions anytime</p>
                    <Button
                      size="sm"
                      className="bg-accent hover:bg-accent-light text-white"
                      onClick={() => navigate('/')}
                    >
                      Visit AI Hub
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground">
                    Questions? Reach out to your team lead or visit the AI Hub for support.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
