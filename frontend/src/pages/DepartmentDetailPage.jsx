import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Megaphone, Settings, Users, Code, HeadphonesIcon, Copy, Check, ArrowLeft, ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const departmentData = {
  sales: {
    name: "Sales",
    icon: Briefcase,
    color: "bg-blue-600",
    description: "Boost productivity and close deals faster with AI-powered tools",
    benefits: [
      "Personalize outreach at scale",
      "Reduce time spent on admin tasks",
      "Improve deal forecasting accuracy",
      "Enhance customer relationship management"
    ],
    useCases: [
      {
        title: "Email Personalization",
        description: "Draft personalized follow-up emails that resonate with prospects",
        prompt: "Draft a personalized follow-up email for a prospect interested in our premium tier, highlighting ROI and next steps. Tone: Professional yet warm.",
        tool: "Copilot in Outlook",
        outcome: "Save 2-3 hours per day on email composition"
      },
      {
        title: "Call Preparation",
        description: "Generate comprehensive call scripts with objection handling",
        prompt: "Create a call script for discussing product features with a technical buyer, including objection handling for common concerns about integration and security.",
        tool: "Copilot in Word",
        outcome: "Increase call confidence and conversion rates"
      },
      {
        title: "Deal Analysis & Forecasting",
        description: "Analyze historical data to predict trends and optimize strategy",
        prompt: "Analyze historical deal data in Excel to identify patterns in successful closures. Highlight correlations between deal size, industry, and close time. Predict Q4 trends.",
        tool: "Copilot in Excel",
        outcome: "Make data-driven decisions to improve win rates"
      },
      {
        title: "Proposal Writing",
        description: "Create compelling proposals tailored to client needs",
        prompt: "Draft a proposal for [Company Name] addressing their need for [solution], including executive summary, value proposition, pricing options, and next steps.",
        tool: "Copilot in Word",
        outcome: "Reduce proposal creation time by 60%"
      }
    ],
    strategicAlignment: "Supports GLOBAL EDGE by enabling proactive, data-driven outreach and improving customer engagement through personalized communication."
  },
  marketing: {
    name: "Marketing",
    icon: Megaphone,
    color: "bg-purple-600",
    description: "Create compelling campaigns and content effortlessly",
    benefits: [
      "Generate fresh content ideas quickly",
      "Analyze customer sentiment at scale",
      "Optimize campaign performance",
      "Maintain brand consistency"
    ],
    useCases: [
      {
        title: "Social Media Content",
        description: "Generate engaging posts for multiple platforms",
        prompt: "Generate 5 engaging LinkedIn post ideas about AI adoption in enterprise, with a professional yet conversational tone. Include hooks, key points, and CTAs.",
        tool: "Copilot",
        outcome: "Maintain consistent social presence with less effort"
      },
      {
        title: "Campaign Brainstorming",
        description: "Develop creative campaign concepts for launches",
        prompt: "Brainstorm 3 creative campaign concepts for our Q1 product launch targeting mid-market companies. Include theme, key messages, channel mix, and success metrics.",
        tool: "Copilot",
        outcome: "Accelerate campaign planning cycles"
      },
      {
        title: "Voice of Customer Analysis",
        description: "Extract insights from customer feedback and surveys",
        prompt: "Analyze customer feedback from recent surveys (paste survey data). Identify top 3 themes, sentiment scores, and actionable recommendations.",
        tool: "Copilot in Excel",
        outcome: "Make customer-centric decisions based on data"
      },
      {
        title: "Content Calendar Planning",
        description: "Organize and schedule content across channels",
        prompt: "Create a 30-day content calendar for [product/service] covering blog posts, social media, and email. Align with key dates and themes.",
        tool: "Copilot in Excel",
        outcome: "Streamline content operations"
      }
    ],
    strategicAlignment: "Drives Innovation Focus by experimenting with AI-powered content strategies and amplifies GLOBAL EDGE through data-driven marketing."
  },
  operations: {
    name: "Operations",
    icon: Settings,
    color: "bg-green-600",
    description: "Streamline processes and documentation",
    benefits: [
      "Standardize operational procedures",
      "Reduce manual documentation time",
      "Improve cross-team communication",
      "Enhance process efficiency"
    ],
    useCases: [
      {
        title: "SOP Creation",
        description: "Draft comprehensive standard operating procedures",
        prompt: "Create an SOP for onboarding new team members, including checklist items, timeline, and responsible parties. Structure: Purpose, Scope, Procedure Steps, References.",
        tool: "Copilot in Word",
        outcome: "Ensure consistency across operations"
      },
      {
        title: "Meeting Summaries",
        description: "Automatically capture action items and decisions",
        prompt: "Summarize today's operations meeting, highlighting key decisions, action items with owners, and deadlines. Format as a table.",
        tool: "Copilot in Teams",
        outcome: "Save 30 minutes per meeting"
      },
      {
        title: "Process Optimization",
        description: "Identify inefficiencies and improvement opportunities",
        prompt: "Review our inventory management workflow (describe current process). Suggest 3 efficiency improvements with implementation steps and expected impact.",
        tool: "Copilot",
        outcome: "Continuous operational improvement"
      },
      {
        title: "Incident Reports",
        description: "Document incidents quickly and thoroughly",
        prompt: "Create an incident report for [describe incident]. Include timeline, root cause analysis, impact assessment, and corrective actions.",
        tool: "Copilot in Word",
        outcome: "Faster incident resolution"
      }
    ],
    strategicAlignment: "Supports STOCKSMART through optimized inventory processes and strengthens ONE TEAM via clear documentation and communication."
  },
  leadership: {
    name: "Leadership",
    icon: Users,
    color: "bg-orange-600",
    description: "Make strategic decisions with clarity",
    benefits: [
      "Gain quick insights from complex data",
      "Communicate vision effectively",
      "Track strategic initiatives",
      "Make informed decisions faster"
    ],
    useCases: [
      {
        title: "Executive Summaries",
        description: "Transform detailed reports into executive briefs",
        prompt: "Summarize Q4 performance data into an executive brief. Include key metrics, insights, challenges, and strategic recommendations. Keep to 1 page.",
        tool: "Copilot in PowerPoint",
        outcome: "Communicate effectively with stakeholders"
      },
      {
        title: "Market Trend Analysis",
        description: "Stay ahead with industry intelligence",
        prompt: "Analyze recent market trends in [industry]. Identify 3 strategic opportunities and potential threats. Include data sources and confidence levels.",
        tool: "Copilot",
        outcome: "Make proactive strategic moves"
      },
      {
        title: "AI Roadmap Development",
        description: "Plan organizational AI adoption",
        prompt: "Create a 6-month AI adoption roadmap for our organization. Include phases, milestones, success metrics, change management considerations, and resource requirements.",
        tool: "Copilot in Word",
        outcome: "Drive digital transformation"
      },
      {
        title: "Board Presentations",
        description: "Create compelling board presentations",
        prompt: "Create a board presentation covering strategic priorities, financial performance, market position, and key initiatives. Include executive summary slide.",
        tool: "Copilot in PowerPoint",
        outcome: "Present with confidence"
      }
    ],
    strategicAlignment: "Embodies Innovation Focus by leading AI adoption and supports GLOBAL EDGE through strategic market intelligence."
  },
  it: {
    name: "IT",
    icon: Code,
    color: "bg-indigo-600",
    description: "Enhance governance and technical excellence",
    benefits: [
      "Accelerate documentation",
      "Improve security posture",
      "Streamline support processes",
      "Enable better governance"
    ],
    useCases: [
      {
        title: "Technical Documentation",
        description: "Create clear, comprehensive technical docs",
        prompt: "Create technical documentation for our new API integration. Include architecture overview, authentication flow, endpoints, request/response examples, and error handling.",
        tool: "Copilot in Word",
        outcome: "Reduce onboarding time for developers"
      },
      {
        title: "Security Policy Development",
        description: "Draft governance and security policies",
        prompt: "Draft a data governance policy for AI tool usage. Cover data classification, confidentiality requirements, compliance considerations, and approval workflows.",
        tool: "Copilot",
        outcome: "Ensure compliance and security"
      },
      {
        title: "Troubleshooting Guides",
        description: "Build knowledge base for common issues",
        prompt: "Create a troubleshooting guide for common Office 365 authentication issues. Include symptoms, causes, step-by-step resolution, and escalation criteria.",
        tool: "Copilot in Word",
        outcome: "Reduce support tickets by 40%"
      },
      {
        title: "System Integration Planning",
        description: "Plan technical integrations effectively",
        prompt: "Outline integration plan for connecting [System A] with [System B]. Include technical requirements, data mapping, testing strategy, and rollout plan.",
        tool: "Copilot in Word",
        outcome: "Smoother system implementations"
      }
    ],
    strategicAlignment: "Enables Innovation Focus through robust technical infrastructure and supports ONE TEAM via improved systems and support."
  },
  "customer-service": {
    name: "Customer Service",
    icon: HeadphonesIcon,
    color: "bg-pink-600",
    description: "Deliver exceptional support experiences",
    benefits: [
      "Respond faster with quality",
      "Maintain empathetic tone",
      "Scale knowledge base",
      "Improve customer satisfaction"
    ],
    useCases: [
      {
        title: "Response Templates",
        description: "Create empathetic, solution-focused responses",
        prompt: "Draft an empathetic response to a customer frustrated with delayed delivery. Acknowledge concern, explain situation, offer concrete solutions, and provide compensation if appropriate.",
        tool: "Copilot in Outlook",
        outcome: "Faster resolution with higher satisfaction"
      },
      {
        title: "FAQ Generation",
        description: "Build comprehensive self-service resources",
        prompt: "Generate a FAQ section based on the top 10 customer inquiries this month: [list inquiries]. Provide clear, concise answers with helpful tone.",
        tool: "Copilot",
        outcome: "Reduce repetitive inquiries"
      },
      {
        title: "Escalation Scripts",
        description: "Handle complex issues professionally",
        prompt: "Create a script for escalating complex technical issues to the engineering team. Include information to gather, customer expectations setting, and follow-up process.",
        tool: "Copilot in Word",
        outcome: "Smoother escalation process"
      },
      {
        title: "Customer Sentiment Analysis",
        description: "Understand customer emotions and trends",
        prompt: "Analyze customer support tickets from last month (paste data). Identify sentiment trends, common pain points, and improvement opportunities.",
        tool: "Copilot in Excel",
        outcome: "Proactive service improvements"
      }
    ],
    strategicAlignment: "Exemplifies Service Excellence and strengthens customer relationships, supporting GLOBAL EDGE through superior customer experience."
  }
};

export default function DepartmentDetailPage() {
  const { dept } = useParams();
  const navigate = useNavigate();
  const [copiedPrompt, setCopiedPrompt] = useState(null);
  
  const department = departmentData[dept];
  
  if (!department) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-heading font-bold text-foreground">Department not found</h2>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }
  
  const Icon = department.icon;
  
  const copyPrompt = (prompt, idx) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(idx);
    toast.success("Prompt copied to clipboard!");
    setTimeout(() => setCopiedPrompt(null), 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 bg-gradient-to-b from-background to-secondary/20">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-br from-background via-background to-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/tips')}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to All Tips
            </Button>
            
            <div className="flex items-start space-x-6">
              <div className={`w-16 h-16 rounded-xl ${department.color} flex items-center justify-center shadow-elegant flex-shrink-0`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-2">
                    {department.name} <span className="gradient-text">AI Toolkit</span>
                  </h1>
                  <p className="text-lg text-muted-foreground">{department.description}</p>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-foreground">
                    <strong className="text-primary">🎯 Strategic Alignment:</strong> {department.strategicAlignment}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Key Benefits</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {department.benefits.map((benefit, idx) => (
                <Card key={idx} className="shadow-card">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold text-sm">{idx + 1}</span>
                      </div>
                      <p className="text-sm text-foreground font-medium">{benefit}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Use Cases */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <h2 className="text-2xl font-heading font-bold text-foreground">Practical Use Cases</h2>
            
            <div className="space-y-6">
              {department.useCases.map((useCase, idx) => (
                <Card key={idx} className="shadow-card hover:shadow-elegant transition-all duration-300 border-2 hover:border-primary/20">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="w-8 h-8 rounded-lg gradient-primary text-white flex items-center justify-center text-sm font-bold">
                            {idx + 1}
                          </span>
                          <CardTitle className="font-heading text-xl">{useCase.title}</CardTitle>
                        </div>
                        <CardDescription className="text-sm">{useCase.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="text-xs whitespace-nowrap">
                          {useCase.tool}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-foreground">Ready-to-Use Prompt:</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyPrompt(useCase.prompt, idx)}
                          className="h-8"
                        >
                          {copiedPrompt === idx ? (
                            <>
                              <Check className="mr-2 w-4 h-4" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="mr-2 w-4 h-4" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                      <p className="text-sm text-foreground italic">"{useCase.prompt}"</p>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-muted-foreground">Expected Outcome:</span>
                      <span className="text-primary font-semibold">{useCase.outcome}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-elegant border-2 border-primary/20 bg-gradient-to-br from-card to-secondary/20">
              <CardContent className="pt-8 text-center space-y-6">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-2xl font-heading font-bold text-foreground">Ready to Level Up?</h3>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Explore our comprehensive tutorials to master Microsoft Copilot and transform the way you work.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    className="gradient-primary text-white shadow-elegant hover:shadow-xl transition-all duration-300 group"
                    onClick={() => navigate('/tutorials')}
                  >
                    View Tutorials
                    <ExternalLink className="ml-2 w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate('/')}
                  >
                    Try AI Helper
                  </Button>
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
