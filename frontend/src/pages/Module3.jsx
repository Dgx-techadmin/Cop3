import React from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, ArrowRight, ExternalLink, BookOpen, Lightbulb,
  Users, Settings, HeadphonesIcon, Mail, FileText, TrendingUp,
  Code, Sparkles, Play, CheckCircle, X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CollapsibleSection } from "@/components/training/CollapsibleSection";
import { QuizComponent } from "@/components/training/QuizComponent";
import { ModuleAIExpert } from "@/components/training/ModuleAIExpert";
import { ModuleTutorial } from "@/components/training/ModuleTutorial";
import { quizQuestionsModule3 } from "@/data/quizQuestionsModule3";

export default function Module3() {
  const navigate = useNavigate();
  const [expandedVideo, setExpandedVideo] = React.useState(null);

  const moduleContext = `This is Module 3: Practical AI Applications for Your Role at Dynamics G-Ex.

Key Topics:
- Hands-on Copilot applications across departments
- Sales & Marketing: Draft proposals, summarize emails, create campaigns, analyze customer feedback
- Inventory Management: Predict stock needs, generate reorder lists, optimize warehouse operations
- Customer Service: Create response templates, handle complaints, build FAQ responses
- Leadership: Meeting summaries, strategic planning, performance reports
- IT: Documentation, troubleshooting guides, system reports
- Operations: Process optimization, SOPs, workflow automation
- ChatGPT for brainstorming: Use for creative ideation WITHOUT company data
- Effective prompting: Be specific, provide context, iterate for better results
- Testing approach: Start with low-risk tasks, validate results, gradually expand
- AI Champion mindset: Use strategically, maintain quality, share learnings`;

  const copilotVideos = [
    {
      title: "Copilot Full, Short Training",
      description: "Complete overview of Microsoft 365 Copilot features",
      videoId: "kLxOCW2Em7M",
      app: "All Apps",
      icon: Sparkles
    },
    {
      title: "Copilot in Excel",
      description: "Data analysis, formulas, and insights",
      videoId: "4UkKFnuAHSY",
      app: "Excel",
      icon: TrendingUp,
      timestamp: "?t=142"
    },
    {
      title: "Copilot in Outlook",
      description: "Learn email management, drafting, and summarization",
      videoId: "4UkKFnuAHSY",
      app: "Outlook",
      icon: Mail,
      timestamp: "?t=1913"
    },
    {
      title: "Copilot in Teams",
      description: "Meeting summaries and collaboration features",
      videoId: "4UkKFnuAHSY",
      app: "Teams",
      icon: Users,
      timestamp: "?t=3002"
    },
    {
      title: "Copilot in Word",
      description: "Document creation, editing, and formatting assistance",
      videoId: "4UkKFnuAHSY",
      app: "Word",
      icon: FileText,
      timestamp: "?t=3790"
    },
    {
      title: "Copilot in PowerPoint",
      description: "Create and design presentations quickly",
      videoId: "4UkKFnuAHSY",
      app: "PowerPoint",
      icon: FileText,
      timestamp: "?t=4701"
    },
    {
      title: "Microsoft 365 Copilot App",
      description: "Web and Desktop Copilot experience",
      videoId: "4UkKFnuAHSY",
      app: "M365 App",
      icon: Briefcase,
      timestamp: "?t=5301"
    }
  ];

  const salesMarketingExamples = [
    {
      title: "Draft Sales Proposals",
      icon: FileText,
      prompt: "Draft a proposal for ABC Mining Corp for 500 Core Trays, highlighting our quality certifications and delivery timelines",
      description: "Copilot helps structure proposals quickly. You add pricing, specific customer details, and relationship context.",
      tips: "Always review for accuracy, add customer-specific customizations, and verify all claims."
    },
    {
      title: "Summarize Customer Emails",
      icon: Mail,
      prompt: "Summarize this email thread with XYZ Operations, highlighting their concerns and requested delivery dates",
      description: "Get quick summaries of long email chains to prepare for calls or meetings.",
      tips: "Check for missed nuances, verify dates and numbers, add context from your relationship."
    },
    {
      title: "Create Marketing Campaign Ideas",
      icon: Lightbulb,
      prompt: "Generate 5 email campaign ideas for Q2 targeting mining operations managers, focusing on safety and efficiency",
      description: "Brainstorm campaign themes and content angles quickly.",
      tips: "Evaluate ideas for brand fit, refine based on past campaign performance, test with small audience first."
    },
    {
      title: "Analyze Customer Feedback (Anonymized)",
      icon: TrendingUp,
      prompt: "Analyze common themes in this customer feedback: [paste anonymized feedback without names]",
      description: "Identify patterns in customer sentiment and common requests.",
      tips: "Remove all customer names and identifying details before analysis. Use insights to improve products/services."
    }
  ];

  const inventoryExamples = [
    {
      title: "Predict Stock Needs",
      icon: TrendingUp,
      prompt: "Based on last 6 months sales data for Sample Bags (Region A: avg 1200/month, Region B: avg 850/month), suggest Q3 stock levels",
      description: "Use historical data to forecast demand and optimize inventory levels.",
      tips: "Factor in seasonality, upcoming projects, and market trends that AI might not know about."
    },
    {
      title: "Generate Reorder Lists",
      icon: FileText,
      prompt: "Review current stock levels: Core Trays (200 units, reorder at 300), Sample Bags (450 units, reorder at 500). Generate priority reorder list",
      description: "Automate reorder list generation based on predefined thresholds.",
      tips: "Double-check lead times, verify supplier availability, consider upcoming demand changes."
    },
    {
      title: "Optimize Warehouse Operations",
      icon: Settings,
      prompt: "Suggest warehouse layout improvements for faster picking of top 20 products: [list products with pick frequency]",
      description: "Get recommendations for warehouse efficiency based on product movement.",
      tips: "Consider physical constraints, equipment limitations, and staff workflow in final decisions."
    },
    {
      title: "Inventory Report Generation",
      icon: FileText,
      prompt: "Create weekly inventory status report showing: slow-moving items, low-stock alerts, and top sellers",
      description: "Automate routine reporting to save time for analysis and action.",
      tips: "Customize report format for your team, add contextual notes, highlight action items."
    }
  ];

  const customerServiceExamples = [
    {
      title: "Response Templates for Common Issues",
      icon: Mail,
      prompt: "Create empathetic response template for delayed shipment complaints, acknowledging inconvenience and outlining next steps",
      description: "Build a library of templates for frequent customer inquiries.",
      tips: "Personalize each response with customer name, order details, and specific situation before sending."
    },
    {
      title: "Handle Difficult Customer Situations",
      icon: HeadphonesIcon,
      prompt: "Draft professional response to customer complaint about product quality issue, offering solution and maintaining relationship",
      description: "Get guidance on tone and structure for challenging conversations.",
      tips: "Review for empathy, ensure solution is actually feasible, escalate if needed."
    },
    {
      title: "FAQ Response Generation",
      icon: BookOpen,
      prompt: "Create clear, concise FAQ answer: 'What certifications do your sample bags have for mining applications?'",
      description: "Build comprehensive FAQ database with consistent, professional answers.",
      tips: "Verify technical accuracy with product team, keep language simple and customer-friendly."
    },
    {
      title: "Follow-up Communication",
      icon: CheckCircle,
      prompt: "Draft follow-up email to customer after resolving delivery issue, asking for feedback and reinforcing commitment to quality",
      description: "Maintain relationships with professional, timely follow-up communications.",
      tips: "Time follow-ups appropriately, reference specific resolution details, be genuine."
    }
  ];

  const leadershipExamples = [
    {
      title: "Meeting Summaries",
      icon: Users,
      prompt: "Summarize this leadership team meeting, highlighting decisions made, action items with owners, and discussion points",
      description: "Quickly generate meeting notes to share with team.",
      tips: "Review for completeness, add context that wasn't explicitly stated, distribute promptly."
    },
    {
      title: "Strategic Planning Support",
      icon: TrendingUp,
      prompt: "Draft Q3 strategic plan outline covering: market expansion, operational efficiency, team development, and innovation goals",
      description: "Get structured frameworks for strategic planning sessions.",
      tips: "Customize with specific company goals, add financial targets, involve team in refinement."
    },
    {
      title: "Performance Reports",
      icon: FileText,
      prompt: "Create monthly performance report template tracking: sales growth, customer satisfaction, operational metrics, and team achievements",
      description: "Standardize reporting for consistency and time savings.",
      tips: "Ensure metrics align with company KPIs, add narrative context, celebrate wins."
    }
  ];

  const itExamples = [
    {
      title: "Technical Documentation",
      icon: Code,
      prompt: "Create user guide for new inventory management system covering: login, basic navigation, common tasks, and troubleshooting",
      description: "Generate clear documentation for systems and processes.",
      tips: "Test instructions with actual users, include screenshots, keep language non-technical."
    },
    {
      title: "Troubleshooting Guides",
      icon: Settings,
      prompt: "Create step-by-step troubleshooting guide for common Microsoft Teams connection issues",
      description: "Build library of solutions for frequent technical problems.",
      tips: "Verify each step works, include visual aids, update based on user feedback."
    }
  ];

  const operationsExamples = [
    {
      title: "Process Optimization",
      icon: Settings,
      prompt: "Analyze current order fulfillment process (8 steps, 4 handoffs) and suggest efficiency improvements",
      description: "Get recommendations for streamlining operational workflows.",
      tips: "Validate suggestions with team doing the work, consider change management, pilot before full rollout."
    },
    {
      title: "SOP Creation",
      icon: FileText,
      prompt: "Create standard operating procedure for quality inspection of incoming sample bags, including acceptance criteria",
      description: "Document processes consistently for training and compliance.",
      tips: "Involve subject matter experts, include safety considerations, keep updated."
    }
  ];

  const resources = [
    {
      title: "Microsoft Copilot for Excel",
      description: "Learn to use Copilot for data analysis and forecasting",
      link: "https://support.microsoft.com/en-us/office/get-started-with-copilot-in-excel-d7110502-0334-4b4f-a175-a73abdfc118a",
      icon: ExternalLink
    },
    {
      title: "Microsoft Copilot for Outlook",
      description: "Master email management and communication",
      link: "https://support.microsoft.com/en-us/office/get-started-with-copilot-in-outlook-7a2f910e-8b1a-47b3-8e95-a95849f0eb52",
      icon: ExternalLink
    },
    {
      title: "Microsoft Copilot for Teams",
      description: "Enhance collaboration and meeting productivity",
      link: "https://support.microsoft.com/en-us/office/get-started-with-copilot-in-microsoft-teams-meetings-0bf9dd3c-96f7-44e2-8bb8-790bedf066b1",
      icon: ExternalLink
    },
    {
      title: "Top 10 Copilot Prompts Guide",
      description: "Quick reference for effective prompting",
      link: "/ai-governance-policy.pdf",
      icon: FileText
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 bg-gradient-to-b from-background to-secondary/20">
        {/* Module Banner */}
        <div 
          className="relative bg-purple-600 overflow-hidden"
          style={{
            backgroundImage: `url('/dynamics-gex-logo.png')`,
            backgroundSize: '120px',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center',
            opacity: 0.95
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/95 via-purple-600/90 to-purple-600/95"></div>
          <div className="relative py-8 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <Briefcase className="w-6 h-6 text-white" />
                <span className="text-2xl sm:text-3xl font-heading font-bold text-white">
                  Module 3: Practical Applications
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 via-background to-blue-50 dark:from-purple-950 dark:via-background dark:to-blue-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground">
              Practical AI Applications for <span className="text-purple-600">Your Role</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Let's get practical – AI isn't just theory, it's your new workmate. 
              Learn hands-on applications that save you time TODAY.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground pt-4">
              <Briefcase className="w-4 h-4" />
              <span>Estimated time: 30 minutes</span>
            </div>
          </div>
        </section>

        {/* Overview Video */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-heading font-bold text-foreground">
                <Play className="inline w-8 h-8 mr-2 text-purple-600" />
                See Copilot in Action
              </h2>
              <p className="text-muted-foreground">
                Watch this quick overview to see how Copilot transforms your daily work
              </p>
            </div>
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/S7xTBa93TX8"
                    title="Microsoft 365 Copilot Overview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Microsoft 365 Copilot - Official Overview (1:32)
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Core Content - Sales & Marketing */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-heading font-bold text-foreground">
                Copilot for Your Department
              </h2>
              <p className="text-muted-foreground">
                Click each section to see practical examples and prompts you can use today
              </p>
            </div>

            {/* Sales & Marketing */}
            <Card className="shadow-card border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-purple-600">
                  <Briefcase className="w-6 h-6" />
                  <span>Sales & Marketing</span>
                </CardTitle>
                <CardDescription>
                  Draft proposals, summarize emails, create campaigns, and analyze feedback
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {salesMarketingExamples.map((example, idx) => (
                  <CollapsibleSection
                    key={idx}
                    title={example.title}
                    icon={example.icon}
                    defaultOpen={false}
                  >
                    <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-purple-700 dark:text-purple-400">
                          📝 Example Prompt:
                        </h4>
                        <div className="bg-white dark:bg-gray-900 p-3 rounded border-l-4 border-purple-500">
                          <p className="text-sm font-mono text-muted-foreground">
                            "{example.prompt}"
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-1">What it does:</h4>
                        <p className="text-sm text-muted-foreground">{example.description}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-1">💡 Pro Tips:</h4>
                        <p className="text-sm text-muted-foreground">{example.tips}</p>
                      </div>
                    </div>
                  </CollapsibleSection>
                ))}
              </CardContent>
            </Card>

            {/* Inventory Management */}
            <Card className="shadow-card border-2 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-600">
                  <TrendingUp className="w-6 h-6" />
                  <span>Inventory Management</span>
                </CardTitle>
                <CardDescription>
                  Predict stock needs, generate reorder lists, and optimize operations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {inventoryExamples.map((example, idx) => (
                  <CollapsibleSection
                    key={idx}
                    title={example.title}
                    icon={example.icon}
                    defaultOpen={false}
                  >
                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-green-700 dark:text-green-400">
                          📝 Example Prompt:
                        </h4>
                        <div className="bg-white dark:bg-gray-900 p-3 rounded border-l-4 border-green-500">
                          <p className="text-sm font-mono text-muted-foreground">
                            "{example.prompt}"
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-1">What it does:</h4>
                        <p className="text-sm text-muted-foreground">{example.description}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-1">💡 Pro Tips:</h4>
                        <p className="text-sm text-muted-foreground">{example.tips}</p>
                      </div>
                    </div>
                  </CollapsibleSection>
                ))}
              </CardContent>
            </Card>

            {/* Customer Service */}
            <Card className="shadow-card border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-600">
                  <HeadphonesIcon className="w-6 h-6" />
                  <span>Customer Service</span>
                </CardTitle>
                <CardDescription>
                  Create response templates, handle complaints, and build FAQs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {customerServiceExamples.map((example, idx) => (
                  <CollapsibleSection
                    key={idx}
                    title={example.title}
                    icon={example.icon}
                    defaultOpen={false}
                  >
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-blue-700 dark:text-blue-400">
                          📝 Example Prompt:
                        </h4>
                        <div className="bg-white dark:bg-gray-900 p-3 rounded border-l-4 border-blue-500">
                          <p className="text-sm font-mono text-muted-foreground">
                            "{example.prompt}"
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-1">What it does:</h4>
                        <p className="text-sm text-muted-foreground">{example.description}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-1">💡 Pro Tips:</h4>
                        <p className="text-sm text-muted-foreground">{example.tips}</p>
                      </div>
                    </div>
                  </CollapsibleSection>
                ))}
              </CardContent>
            </Card>

            {/* Leadership */}
            <Card className="shadow-card border-2 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-orange-600">
                  <Users className="w-6 h-6" />
                  <span>Leadership</span>
                </CardTitle>
                <CardDescription>
                  Meeting summaries, strategic planning, and performance reports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {leadershipExamples.map((example, idx) => (
                  <CollapsibleSection
                    key={idx}
                    title={example.title}
                    icon={example.icon}
                    defaultOpen={false}
                  >
                    <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-orange-700 dark:text-orange-400">
                          📝 Example Prompt:
                        </h4>
                        <div className="bg-white dark:bg-gray-900 p-3 rounded border-l-4 border-orange-500">
                          <p className="text-sm font-mono text-muted-foreground">
                            "{example.prompt}"
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-1">What it does:</h4>
                        <p className="text-sm text-muted-foreground">{example.description}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-1">💡 Pro Tips:</h4>
                        <p className="text-sm text-muted-foreground">{example.tips}</p>
                      </div>
                    </div>
                  </CollapsibleSection>
                ))}
              </CardContent>
            </Card>

            {/* IT */}
            <Card className="shadow-card border-2 border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-indigo-600">
                  <Code className="w-6 h-6" />
                  <span>IT</span>
                </CardTitle>
                <CardDescription>
                  Documentation, troubleshooting guides, and system reports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {itExamples.map((example, idx) => (
                  <CollapsibleSection
                    key={idx}
                    title={example.title}
                    icon={example.icon}
                    defaultOpen={false}
                  >
                    <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-indigo-700 dark:text-indigo-400">
                          📝 Example Prompt:
                        </h4>
                        <div className="bg-white dark:bg-gray-900 p-3 rounded border-l-4 border-indigo-500">
                          <p className="text-sm font-mono text-muted-foreground">
                            "{example.prompt}"
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-1">What it does:</h4>
                        <p className="text-sm text-muted-foreground">{example.description}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-1">💡 Pro Tips:</h4>
                        <p className="text-sm text-muted-foreground">{example.tips}</p>
                      </div>
                    </div>
                  </CollapsibleSection>
                ))}
              </CardContent>
            </Card>

            {/* Operations */}
            <Card className="shadow-card border-2 border-teal-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-teal-600">
                  <Settings className="w-6 h-6" />
                  <span>Operations</span>
                </CardTitle>
                <CardDescription>
                  Process optimization, SOPs, and workflow automation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {operationsExamples.map((example, idx) => (
                  <CollapsibleSection
                    key={idx}
                    title={example.title}
                    icon={example.icon}
                    defaultOpen={false}
                  >
                    <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-teal-700 dark:text-teal-400">
                          📝 Example Prompt:
                        </h4>
                        <div className="bg-white dark:bg-gray-900 p-3 rounded border-l-4 border-teal-500">
                          <p className="text-sm font-mono text-muted-foreground">
                            "{example.prompt}"
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-1">What it does:</h4>
                        <p className="text-sm text-muted-foreground">{example.description}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-1">💡 Pro Tips:</h4>
                        <p className="text-sm text-muted-foreground">{example.tips}</p>
                      </div>
                    </div>
                  </CollapsibleSection>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Application-Specific Video Tutorials */}
        <section className="py-12 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-heading font-bold text-foreground">
                📺 Application-Specific Tutorials
              </h2>
              <p className="text-muted-foreground">
                Click any card to watch a detailed tutorial for that application
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {copilotVideos.map((video, idx) => {
                const Icon = video.icon;
                return (
                  <Card 
                    key={idx} 
                    className="shadow-card hover:shadow-xl transition-all cursor-pointer border-2 hover:border-primary overflow-hidden"
                    onClick={() => setExpandedVideo(video)}
                  >
                    {/* Video Thumbnail */}
                    <div className="relative aspect-video bg-muted overflow-hidden group">
                      <img 
                        src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </div>
                      <div className={`absolute top-3 left-3 p-2 rounded-lg bg-white/90 backdrop-blur-sm`}>
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-lg">{video.title}</CardTitle>
                      <CardDescription>{video.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" variant="outline">
                        <Play className="w-4 h-4 mr-2" />
                        Watch Tutorial
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="text-center pt-4">
              <p className="text-xs text-muted-foreground">
                💡 Pro Tip: Watch the tutorial for the tool you use most frequently first
              </p>
            </div>
          </div>
        </section>

        {/* Video Modal */}
        {expandedVideo && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
            onClick={() => setExpandedVideo(null)}
          >
            <div 
              className="bg-background rounded-lg shadow-2xl max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">{expandedVideo.title}</h3>
                  <p className="text-sm text-muted-foreground">{expandedVideo.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedVideo(null)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="p-4">
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${expandedVideo.videoId}${expandedVideo.timestamp || ''}`}
                    title={expandedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ChatGPT for Brainstorming */}
        <section className="py-12 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-card border-2 border-pink-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-pink-600">
                  <Sparkles className="w-6 h-6" />
                  <span>ChatGPT for Brainstorming & Ideation</span>
                </CardTitle>
                <CardDescription>
                  Use ChatGPT for creative thinking WITHOUT company or customer data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">When to Use ChatGPT:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Brainstorming product names or campaign themes</li>
                    <li>• Exploring different approaches to a problem</li>
                    <li>• Learning new concepts or skills</li>
                    <li>• Generating creative content ideas (without company specifics)</li>
                    <li>• Practice scenarios and role-playing</li>
                  </ul>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950 border-l-4 border-amber-500 p-4 rounded-r-lg">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <span>⚠️ Critical Rule:</span>
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    NEVER input company data, customer information, proprietary processes, or confidential details into ChatGPT. 
                    Use Microsoft Copilot for work within M365 environment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Resources */}
        <section className="py-12 bg-secondary/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-heading font-bold text-foreground">
                Additional Resources
              </h2>
              <p className="text-muted-foreground">
                Dive deeper with official Microsoft guides and tutorials
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource, idx) => {
                const Icon = resource.icon;
                return (
                  <Card 
                    key={idx}
                    className="shadow-card hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/30"
                    onClick={() => window.open(resource.link, resource.link.startsWith('http') ? '_blank' : '_self')}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Icon className="w-8 h-8 text-primary" />
                        {resource.link.startsWith('http') && (
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <QuizComponent 
              questions={quizQuestionsModule3} 
              moduleId={3}
              moduleName="Practical AI Applications"
            />
          </div>
        </section>

        {/* Next Steps */}
        <section className="py-12 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl font-heading font-bold text-foreground">
              🎉 Excellent! You're Now an AI Practitioner!
            </h2>
            <p className="text-lg text-muted-foreground">
              You have the practical skills to use AI effectively in your daily work. 
              Try one Copilot feature today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/training')}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Back to Training Hub
              </Button>
              <Button 
                size="lg"
                className="bg-accent hover:bg-accent/90"
                disabled
              >
                Module 4: Coming Soon <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <div className="pt-6 border-t mt-6">
              <p className="text-sm text-muted-foreground mb-4">
                💡 Action Item: Try one Copilot feature today and share your experience!
              </p>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => navigate('/')}
              >
                Visit G-Ex AI Hub for More Tips
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Module Tutorial */}
      <ModuleTutorial 
        moduleId={3}
        moduleName="Practical AI Applications for Your Role"
      />
      
      {/* Module AI Expert */}
      <ModuleAIExpert 
        moduleId={3}
        moduleName="Practical AI Applications for Your Role"
        moduleContext={moduleContext}
      />
    </div>
  );
}
