import React, { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Trophy, ArrowRight, ExternalLink, BookOpen, Lightbulb, Users, Settings, 
  HeadphonesIcon, Mail, FileText, TrendingUp, Code, Sparkles, CheckCircle, 
  AlertTriangle, Target, Megaphone, BarChart3, Package, Award, Heart,
  MessageSquare, Send, Download, Star, Clock, Briefcase, Loader2, X,
  Image as ImageIcon, Link as LinkIcon, Shield, Zap, RefreshCw, Brain,
  Rocket, Calendar, UserCheck, Eye, ThumbsUp, CircleDot, ChevronDown
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CollapsibleSection } from "@/components/training/CollapsibleSection";
import { QuizComponent } from "@/components/training/QuizComponent";
import { ModuleAIExpert } from "@/components/training/ModuleAIExpert";
import { ModuleTutorial } from "@/components/training/ModuleTutorial";
import { quizQuestionsModule4 } from "@/data/quizQuestionsModule4";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://dgx-copilot-hub.preview.emergentagent.com';

export default function Module4() {
  const navigate = useNavigate();
  const [successStories, setSuccessStories] = useState([]);
  const [loadingStories, setLoadingStories] = useState(true);
  const [showStoryForm, setShowStoryForm] = useState(false);
  const [storyForm, setStoryForm] = useState({ name: '', department: '', email: '', title: '', content: '', imageUrl: '', linkUrl: '' });
  const [submittingStory, setSubmittingStory] = useState(false);
  
  // Certificate state
  const [certForm, setCertForm] = useState({ name: '', email: '' });
  const [certLoading, setCertLoading] = useState(false);
  const [certResult, setCertResult] = useState(null);
  
  // Expanded adoption strategy cards
  const [expandedStrategy, setExpandedStrategy] = useState(null);
  
  // Expanded department cards
  const [expandedDept, setExpandedDept] = useState(null);

  const moduleContext = `This is Module 4: Advanced Tips for AI Champions at Dynamics G-Ex.

Key Topics:
- Troubleshooting common AI issues: Most problems stem from unclear prompts. Check specificity, context, and expected output format first.
- Driving adoption through storytelling: Share success stories and live demos to inspire colleagues. People connect with relatable wins.
- Collecting feedback and reporting impact: Use regular surveys, conversations, and track metrics like time saved and quality improvements.
- Advanced Copilot features: Power Automate integration, custom prompts, multi-step workflows, and cross-application automation.
- Departmental use cases for champions: Sales (proposal automation), Marketing (campaign analysis), Operations (stock forecasting), Customer Service (response optimization), Leadership (strategic insights), IT (documentation automation).
- AI Champion mindset: Focus on helping others succeed, not just personal productivity. Train, support, share best practices, celebrate wins.
- Certificate criteria: Complete all 4 module quizzes with 70%+ score to earn DGX AI Champion certification.`;

  // Fetch success stories on mount
  useEffect(() => {
    fetchSuccessStories();
  }, []);

  const fetchSuccessStories = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/success-stories`);
      setSuccessStories(response.data.stories || []);
    } catch (error) {
      console.error("Error fetching stories:", error);
    } finally {
      setLoadingStories(false);
    }
  };

  const handleStorySubmit = async (e) => {
    e.preventDefault();
    if (!storyForm.name || !storyForm.email || !storyForm.title || !storyForm.content) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setSubmittingStory(true);
    try {
      await axios.post(`${BACKEND_URL}/api/success-stories`, storyForm);
      toast.success("Success story shared!");
      setStoryForm({ name: '', department: '', email: '', title: '', content: '', imageUrl: '', linkUrl: '' });
      setShowStoryForm(false);
      fetchSuccessStories();
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to share story");
    } finally {
      setSubmittingStory(false);
    }
  };

  const handleLike = async (storyId, userEmail) => {
    if (!userEmail) {
      const email = prompt("Enter your email to like this story (must have completed a quiz):");
      if (!email) return;
      try {
        await axios.post(`${BACKEND_URL}/api/success-stories/${storyId}/like`, { email });
        toast.success("Liked!");
        fetchSuccessStories();
      } catch (error) {
        toast.error(error.response?.data?.detail || "Unable to like. Make sure you've completed at least one quiz.");
      }
    }
  };

  const handleCertificateRequest = async (e) => {
    e.preventDefault();
    if (!certForm.name || !certForm.email) {
      toast.error("Please enter your name and email");
      return;
    }
    
    setCertLoading(true);
    setCertResult(null);
    
    try {
      const response = await axios.post(`${BACKEND_URL}/api/certificate/check`, {
        name: certForm.name,
        email: certForm.email
      });
      setCertResult(response.data);
    } catch (error) {
      setCertResult({
        eligible: false,
        message: error.response?.data?.detail || "Error checking eligibility"
      });
    } finally {
      setCertLoading(false);
    }
  };

  const downloadCertificate = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/certificate/generate`,
        { name: certForm.name, email: certForm.email },
        { responseType: 'blob' }
      );
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `DGX_AI_Champion_Certificate_${certForm.name.replace(/\s+/g, '_')}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Certificate downloaded!");
    } catch (error) {
      toast.error("Failed to download certificate");
    }
  };

  const troubleshootingTips = [
    {
      title: "Unclear or Generic Responses",
      icon: AlertTriangle,
      problem: "AI gives vague, unhelpful answers",
      solution: "Add more context to your prompt. Include specific details about what you're working on, the desired outcome, and any constraints.",
      example: "Instead of 'Help with email', try 'Draft a follow-up email to a customer who asked about delivery delays for Order #12345, tone should be apologetic and solution-focused'"
    },
    {
      title: "Incorrect Information",
      icon: AlertTriangle,
      problem: "AI provides wrong facts or outdated data",
      solution: "Always fact-check AI outputs. For current data, explicitly ask AI to note its knowledge cutoff. Cross-reference with reliable sources.",
      example: "Ask: 'Based on the data I've provided, analyze...' rather than asking for information the AI might not have accurately."
    },
    {
      title: "Inconsistent Formatting",
      icon: AlertTriangle,
      problem: "Output format varies unpredictably",
      solution: "Specify exact format in your prompt. Use examples of desired output structure.",
      example: "'Format as: 1) Key finding 2) Supporting data 3) Recommended action' or 'Present as a table with columns: Item, Quantity, Status'"
    },
    {
      title: "Context Loss in Long Conversations",
      icon: AlertTriangle,
      problem: "AI forgets earlier parts of conversation",
      solution: "Summarize key points periodically. Start new conversations for different topics. Reference earlier decisions explicitly.",
      example: "'Building on our earlier discussion about Q3 targets (15% growth), now let's plan the marketing budget...'"
    }
  ];

  const adoptionStrategies = [
    {
      title: "Share Quick Wins",
      description: "Document and share small victories - 30 minutes saved on a report, a perfectly drafted email. These relatable wins inspire others.",
      icon: Trophy,
      expandedContent: {
        intro: "Quick wins are the foundation of AI adoption. Here's how to capture and share them effectively:",
        steps: [
          {
            title: "Identify Your Win",
            detail: "Look for tasks where AI saved you time, improved quality, or reduced effort. Even 10 minutes saved counts!"
          },
          {
            title: "Document the Before & After",
            detail: "Note how long the task took before AI vs. after. 'Report formatting: 45 mins → 10 mins with Copilot'"
          },
          {
            title: "Keep It Relatable",
            detail: "Focus on common tasks your colleagues also do. Email drafting, meeting summaries, data formatting – universal wins!"
          },
          {
            title: "Share in Team Channels",
            detail: "Post in Teams or Slack with a simple format: Task + Time Saved + How You Did It. Keep it to 3-4 sentences."
          },
          {
            title: "Use the Success Stories Feature",
            detail: "Share your wins on this platform! Your story could inspire dozens of colleagues to try AI."
          }
        ],
        tip: "💡 Pro Tip: Screenshot your Copilot conversation and share it – visual proof is powerful!"
      }
    },
    {
      title: "Live Demonstrations",
      description: "Show, don't tell. Run 15-minute 'Copilot Coffee' sessions where you solve real problems live. Seeing is believing.",
      icon: Target,
      expandedContent: {
        intro: "Nothing beats seeing AI in action. Here's your guide to running engaging demos:",
        steps: [
          {
            title: "Pick a Real Problem",
            detail: "Choose a task your audience actually does – drafting emails, summarizing documents, analyzing data. Relevance is key."
          },
          {
            title: "Keep It Short (15 mins max)",
            detail: "Attention spans are limited. Demo one or two use cases well rather than rushing through many."
          },
          {
            title: "Embrace Imperfection",
            detail: "If Copilot gives an imperfect response, show how to refine the prompt. This teaches more than a 'perfect' demo!"
          },
          {
            title: "Invite Participation",
            detail: "Ask attendees to suggest prompts or bring their own challenges. Interactive demos are memorable demos."
          },
          {
            title: "Follow Up with Resources",
            detail: "Share the prompts you used and links to training materials. Make it easy for them to try it themselves."
          }
        ],
        tip: "💡 Pro Tip: Schedule recurring 'Copilot Coffee' sessions – 15 mins, same time each week. Consistency builds attendance."
      }
    },
    {
      title: "Create Template Libraries",
      description: "Build a shared repository of proven prompts for common tasks. Lower the barrier to entry for colleagues.",
      icon: FileText,
      expandedContent: {
        intro: "Great prompts shouldn't be reinvented every time. Build a team resource everyone can use:",
        steps: [
          {
            title: "Start with High-Impact Tasks",
            detail: "Identify the 5-10 tasks your team does most often. Email responses, report formatting, meeting agendas – start there."
          },
          {
            title: "Create a Prompt Template Format",
            detail: "Use a consistent structure: Task Name, Prompt Text, Expected Output, Tips for Customization."
          },
          {
            title: "Test Before You Share",
            detail: "Run each prompt multiple times. Refine until it consistently produces good results."
          },
          {
            title: "Make It Accessible",
            detail: "Store prompts in a shared location – Teams channel, SharePoint, or OneNote. Easy access = higher adoption."
          },
          {
            title: "Keep It Updated",
            detail: "Assign someone to review and update prompts monthly. AI capabilities evolve, and so should your templates."
          }
        ],
        tip: "💡 Pro Tip: Create a 'Prompt of the Week' email – introduce one new template each week to gradually build the library."
      }
    },
    {
      title: "Celebrate Champions",
      description: "Recognize team members who find innovative AI uses. Public recognition encourages experimentation.",
      icon: Star,
      expandedContent: {
        intro: "Recognition fuels innovation. Here's how to create a culture that celebrates AI experimentation:",
        steps: [
          {
            title: "Spot the Innovators",
            detail: "Watch for colleagues trying new things with AI – even failed experiments show initiative worth recognizing."
          },
          {
            title: "Make Recognition Public",
            detail: "Share wins in team meetings, newsletters, or all-hands. 'Sarah saved 3 hours on client reports using Copilot!'"
          },
          {
            title: "Create an 'AI Champion of the Month'",
            detail: "Formal recognition programs drive behaviour. A simple certificate or shout-out goes a long way."
          },
          {
            title: "Reward Sharing, Not Just Using",
            detail: "Recognize people who teach others, not just those who use AI themselves. Multipliers matter most."
          },
          {
            title: "Connect Wins to Business Impact",
            detail: "Frame recognition around outcomes: time saved, quality improved, customer satisfaction increased."
          }
        ],
        tip: "💡 Pro Tip: Create a dedicated Teams channel for AI wins. Encourage peer recognition – it's more powerful than top-down praise."
      }
    }
  ];

  const advancedFeatures = [
    {
      title: "Copilot in Power Automate",
      description: "Create automated workflows using natural language. 'When I receive an email from a VIP customer, create a Teams notification and add to my priority list.'",
      icon: Settings
    },
    {
      title: "Cross-App Intelligence",
      description: "Reference data across Microsoft 365. 'Summarize the Excel data from the Q3 report and draft an email to the sales team.'",
      icon: Sparkles
    },
    {
      title: "Custom Instructions",
      description: "Set persistent preferences: 'Always use Australian English, formal tone, include action items at the end of summaries.'",
      icon: Code
    },
    {
      title: "Multi-Step Workflows",
      description: "Chain prompts together: First analyze, then summarize, then draft recommendations. Build complex outputs step by step.",
      icon: TrendingUp
    }
  ];

  const departmentUseCases = [
    {
      dept: "Sales & Marketing",
      icon: Briefcase,
      color: "purple",
      tips: [
        { title: "Proposal Automation", tip: "Create proposal templates with placeholders. Use Copilot to customize for each client based on their industry and needs." },
        { title: "Campaign Analysis", tip: "Input campaign metrics into Excel, ask Copilot to identify top performers and suggest optimizations." },
        { title: "Lead Scoring", tip: "Use Copilot to analyze lead data and suggest prioritization based on engagement patterns." }
      ]
    },
    {
      dept: "Inventory Management",
      icon: Package,
      color: "green",
      tips: [
        { title: "Stock Forecasting", tip: "Feed historical sales data to Copilot and ask for demand predictions with seasonal adjustments." },
        { title: "Reorder Optimization", tip: "Create automated alerts when stock hits thresholds, with Copilot suggesting optimal reorder quantities." },
        { title: "Supplier Analysis", tip: "Use anonymized data to compare supplier performance and identify cost-saving opportunities." }
      ]
    },
    {
      dept: "Customer Service",
      icon: HeadphonesIcon,
      color: "blue",
      tips: [
        { title: "Response Optimization", tip: "Analyze successful resolution patterns and create AI-assisted response templates for common issues." },
        { title: "Sentiment Tracking", tip: "Use Copilot to summarize customer feedback themes and identify emerging issues." },
        { title: "Knowledge Base", tip: "Generate FAQ content from resolved tickets, keeping documentation current and comprehensive." }
      ]
    },
    {
      dept: "Leadership",
      icon: Users,
      color: "orange",
      tips: [
        { title: "Strategic Insights", tip: "Consolidate reports from multiple departments and ask Copilot to identify cross-functional opportunities." },
        { title: "Meeting Efficiency", tip: "Use Copilot to prepare agendas, capture decisions, and track action items across leadership meetings." },
        { title: "Communication", tip: "Draft company-wide communications that maintain consistent tone and key messaging." }
      ]
    },
    {
      dept: "IT",
      icon: Code,
      color: "indigo",
      tips: [
        { title: "Documentation", tip: "Generate technical documentation from code comments and system configurations automatically." },
        { title: "Troubleshooting Guides", tip: "Create step-by-step guides from resolved tickets, building a self-service knowledge base." },
        { title: "Security Reports", tip: "Summarize security logs and identify patterns that might indicate issues." }
      ]
    },
    {
      dept: "Operations",
      icon: Settings,
      color: "teal",
      tips: [
        { title: "Process Optimization", tip: "Document current workflows and ask Copilot to identify bottlenecks and suggest improvements." },
        { title: "SOP Creation", tip: "Generate standard operating procedures from expert knowledge, ensuring consistency across teams." },
        { title: "Quality Control", tip: "Analyze quality data to identify trends and predict potential issues before they occur." }
      ]
    }
  ];

  const resources = [
    {
      title: "G-Ex AI Champions Toolkit",
      description: "Templates, prompts, and best practices for AI Champions",
      link: "#toolkit",
      icon: BookOpen,
      comingSoon: true
    },
    {
      title: "Microsoft Copilot Advanced Training",
      description: "Official Microsoft learning paths for power users",
      link: "https://learn.microsoft.com/en-us/collections/6wpf7tdggkn5g",
      icon: ExternalLink,
      comingSoon: false
    },
    {
      title: "Feedback Form",
      description: "Share your AI experience and suggestions",
      link: "#feedback",
      icon: MessageSquare,
      comingSoon: true
    }
  ];

  const colorClasses = {
    purple: "border-purple-200 bg-purple-50 dark:bg-purple-950",
    green: "border-green-200 bg-green-50 dark:bg-green-950",
    blue: "border-blue-200 bg-blue-50 dark:bg-blue-950",
    orange: "border-orange-200 bg-orange-50 dark:bg-orange-950",
    indigo: "border-indigo-200 bg-indigo-50 dark:bg-indigo-950",
    teal: "border-teal-200 bg-teal-50 dark:bg-teal-950"
  };

  const textColorClasses = {
    purple: "text-purple-600",
    green: "text-green-600",
    blue: "text-blue-600",
    orange: "text-orange-600",
    indigo: "text-indigo-600",
    teal: "text-teal-600"
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 bg-gradient-to-b from-background to-secondary/20">
        {/* Module Banner */}
        <div 
          className="relative bg-amber-600 overflow-hidden"
          style={{
            backgroundImage: `url('/dynamics-gex-logo.png')`,
            backgroundSize: '120px',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center',
            opacity: 0.95
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/95 via-amber-600/90 to-amber-600/95"></div>
          <div className="relative py-8 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <Trophy className="w-6 h-6 text-white" />
                <span className="text-2xl sm:text-3xl font-heading font-bold text-white">
                  Module 4: AI Champions
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-amber-50 via-background to-orange-50 dark:from-amber-950 dark:via-background dark:to-orange-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <Badge className="bg-amber-100 text-amber-800 border-amber-200">
              <Trophy className="w-3 h-3 mr-1" /> Advanced Level
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground">
              Advanced Tips for <span className="text-amber-600">AI Champions</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              You're the AI trailblazer – here's how to lead the charge. 
              Master advanced techniques, drive adoption, and become the go-to AI expert for your team.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground pt-4">
              <Clock className="w-4 h-4" />
              <span>Estimated time: 35 minutes</span>
            </div>
          </div>
        </section>

        {/* AI Champion Role Section - New */}
        <section className="py-16 bg-gradient-to-br from-blue-50 via-background to-orange-50 dark:from-blue-950 dark:via-background dark:to-orange-950">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Section Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full mb-4">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
                What It Means to Be an <span className="text-blue-600">AI Champion</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Your role as an AI Champion is crucial – but don't worry, you won't need a cape. 
                Just a passion for innovation and a knack for helping others succeed! 🦸‍♂️
              </p>
            </div>

            {/* Expectations & Responsibilities Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Expectations Card */}
              <Card className="shadow-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-background">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                      <Target className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl text-blue-700 dark:text-blue-300">Expectations</CardTitle>
                  </div>
                  <CardDescription>What your team and organisation expect from you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-white/5 rounded-lg">
                    <UserCheck className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Be the Go-To AI Expert</p>
                      <p className="text-xs text-muted-foreground">Your team's first stop for AI queries, guidance, and support</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-white/5 rounded-lg">
                    <Target className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Align with SOAP</p>
                      <p className="text-xs text-muted-foreground">AI adoption only counts when it directly supports our Strategic Objectives and Priorities</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-white/5 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Promote Responsible AI</p>
                      <p className="text-xs text-muted-foreground">Champion AI use aligned with Dynamics G-Ex governance policies</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-white/5 rounded-lg">
                    <Sparkles className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Encourage Experimentation</p>
                      <p className="text-xs text-muted-foreground">Microsoft Copilot (primary) and ChatGPT (secondary) – authorised tools only!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Responsibilities Card */}
              <Card className="shadow-lg border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white dark:from-orange-950 dark:to-background">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-xl">
                      <CheckCircle className="w-6 h-6 text-orange-600" />
                    </div>
                    <CardTitle className="text-xl text-orange-700 dark:text-orange-300">Responsibilities</CardTitle>
                  </div>
                  <CardDescription>Your key duties as an AI Champion</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-white/5 rounded-lg">
                    <Users className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Support Your Team</p>
                      <p className="text-xs text-muted-foreground">Help colleagues learn and confidently apply AI tools in their work</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-white/5 rounded-lg">
                    <Star className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Share Best Practices</p>
                      <p className="text-xs text-muted-foreground">Post success stories and tips on G-Ex AI Hub – be the inspiration!</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-white/5 rounded-lg">
                    <Eye className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Monitor Compliance</p>
                      <p className="text-xs text-muted-foreground">Keep an eye on AI governance – DOs and DON'Ts matter!</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-white/5 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Collect & Report</p>
                      <p className="text-xs text-muted-foreground">Gather feedback and track adoption progress for continuous improvement</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Balancing Your Role & Fostering Innovation */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Balancing Your Role */}
              <Card className="shadow-lg border-2 border-green-200">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
                      <RefreshCw className="w-6 h-6 text-green-600" />
                    </div>
                    <CardTitle className="text-xl text-green-700 dark:text-green-300">Balancing Your Role</CardTitle>
                  </div>
                  <CardDescription>
                    Being an AI Champion doesn't mean working extra hours – it means working smarter! 🧠
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg bg-green-50/50 dark:bg-green-950/30">
                    <Calendar className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Dedicate Short Weekly Slots</p>
                      <p className="text-xs text-muted-foreground">Just 30 mins/week for AI support makes a huge difference</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg bg-green-50/50 dark:bg-green-950/30">
                    <Zap className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Use Copilot to Free Up Time</p>
                      <p className="text-xs text-muted-foreground">Automate your repetitive tasks first – lead by example!</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg bg-green-50/50 dark:bg-green-950/30">
                    <Target className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Prioritise High-Impact Initiatives</p>
                      <p className="text-xs text-muted-foreground">Delegate where possible, focus on what moves the needle</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Fostering Team Innovation */}
              <Card className="shadow-lg border-2 border-purple-200">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
                      <Rocket className="w-6 h-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl text-purple-700 dark:text-purple-300">Fostering Team Innovation</CardTitle>
                  </div>
                  <CardDescription>
                    Create an environment where AI curiosity thrives! 🚀
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg bg-purple-50/50 dark:bg-purple-950/30">
                    <Lightbulb className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Encourage New Use Cases</p>
                      <p className="text-xs text-muted-foreground">Ask team members: "What task takes too long?" – AI might help!</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg bg-purple-50/50 dark:bg-purple-950/30">
                    <Users className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Run AI Power Hours</p>
                      <p className="text-xs text-muted-foreground">Quick demos with Copilot & ChatGPT – show don't tell!</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg bg-purple-50/50 dark:bg-purple-950/30">
                    <ThumbsUp className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Create a Safe Space</p>
                      <p className="text-xs text-muted-foreground">Mistakes are learning opportunities – celebrate experiments!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Champion Journey Flowchart */}
            <Card className="shadow-lg border-2 border-amber-200 bg-gradient-to-r from-amber-50 via-white to-amber-50 dark:from-amber-950 dark:via-background dark:to-amber-950">
              <CardHeader className="text-center">
                <CardTitle className="text-xl text-amber-700 dark:text-amber-300 flex items-center justify-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>The AI Champion Journey</span>
                </CardTitle>
                <CardDescription>Your continuous impact cycle</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center p-4 bg-blue-100 dark:bg-blue-900/50 rounded-xl min-w-[140px]">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Champion</p>
                    <p className="text-xs text-muted-foreground">Lead by example</p>
                  </div>
                  
                  <ArrowRight className="w-8 h-8 text-amber-400 hidden md:block" />
                  <div className="w-8 h-8 text-amber-400 md:hidden">↓</div>
                  
                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center p-4 bg-green-100 dark:bg-green-900/50 rounded-xl min-w-[140px]">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-green-700 dark:text-green-300">Team Support</p>
                    <p className="text-xs text-muted-foreground">Help others succeed</p>
                  </div>
                  
                  <ArrowRight className="w-8 h-8 text-amber-400 hidden md:block" />
                  <div className="w-8 h-8 text-amber-400 md:hidden">↓</div>
                  
                  {/* Step 3 */}
                  <div className="flex flex-col items-center text-center p-4 bg-orange-100 dark:bg-orange-900/50 rounded-xl min-w-[140px]">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-2">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-orange-700 dark:text-orange-300">Feedback</p>
                    <p className="text-xs text-muted-foreground">Collect insights</p>
                  </div>
                  
                  <ArrowRight className="w-8 h-8 text-amber-400 hidden md:block" />
                  <div className="w-8 h-8 text-amber-400 md:hidden">↓</div>
                  
                  {/* Step 4 */}
                  <div className="flex flex-col items-center text-center p-4 bg-purple-100 dark:bg-purple-900/50 rounded-xl min-w-[140px]">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-2">
                      <RefreshCw className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">Improve</p>
                    <p className="text-xs text-muted-foreground">Continuous growth</p>
                  </div>
                </div>
                
                {/* Loop indicator */}
                <div className="hidden md:flex justify-center mt-4">
                  <div className="text-sm text-muted-foreground flex items-center space-x-2 bg-amber-100 dark:bg-amber-900/30 px-4 py-2 rounded-full">
                    <RefreshCw className="w-4 h-4 text-amber-600" />
                    <span>Repeat & Scale Success</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Reminder */}
            <Card className="shadow-lg border-2 border-red-200 bg-gradient-to-r from-red-50 to-white dark:from-red-950 dark:to-background">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-red-100 dark:bg-red-900 rounded-xl flex-shrink-0">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-red-700 dark:text-red-300 text-lg">
                      🛡️ Champion Compliance Reminders
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      As an AI Champion, you lead by example. Always model these critical behaviours:
                    </p>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="p-3 bg-red-50 dark:bg-red-950/50 rounded-lg border border-red-100 dark:border-red-900">
                        <p className="text-xs font-semibold text-red-700 dark:text-red-300 mb-1">❌ NEVER</p>
                        <p className="text-xs text-muted-foreground">Input confidential or proprietary data into AI tools</p>
                      </div>
                      <div className="p-3 bg-green-50 dark:bg-green-950/50 rounded-lg border border-green-100 dark:border-green-900">
                        <p className="text-xs font-semibold text-green-700 dark:text-green-300 mb-1">✅ ALWAYS</p>
                        <p className="text-xs text-muted-foreground">Opt out of data training in all AI tools you use</p>
                      </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/50 rounded-lg border border-blue-100 dark:border-blue-900">
                        <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1">✅ ALWAYS</p>
                        <p className="text-xs text-muted-foreground">Fact-check AI outputs before using or sharing them</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Resources - 2 Column Layout */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Main Resource - Official Advanced Copilot Training */}
              <Card 
                className="shadow-lg border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 cursor-pointer hover:shadow-xl hover:border-orange-400 transition-all"
                onClick={() => window.open('https://learn.microsoft.com/en-us/collections/6wpf7tdggkn5g', '_blank')}
              >
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="p-2 bg-white rounded-xl flex-shrink-0 shadow-sm">
                    <img 
                      src="/copilot-logo.png" 
                      alt="Microsoft Copilot" 
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-lg font-bold text-orange-700 dark:text-orange-300">Official Advanced Copilot Training</p>
                      <Badge className="bg-orange-500 text-white text-xs">Recommended</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Microsoft Learn collection with comprehensive tutorials for power users</p>
                    <div className="flex items-center space-x-1 mt-2 text-xs text-orange-600">
                      <ExternalLink className="w-3 h-3" />
                      <span>Opens in new tab</span>
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-orange-400" />
                </CardContent>
              </Card>

              {/* Secondary Resources - Stacked */}
              <div className="flex flex-col gap-4">
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex items-center space-x-3 border-2 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950 flex-1"
                  onClick={() => toast.info("Champions Toolkit coming soon!")}
                >
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <div className="text-left flex-1">
                    <p className="text-sm font-semibold">Champions Toolkit</p>
                    <p className="text-xs text-muted-foreground">Templates & guides</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex items-center space-x-3 border-2 hover:border-green-300 hover:bg-green-50 dark:hover:bg-green-950 flex-1"
                  onClick={() => navigate('/training/module-2')}
                >
                  <Shield className="w-5 h-5 text-green-600" />
                  <div className="text-left flex-1">
                    <p className="text-sm font-semibold">Governance Guide</p>
                    <p className="text-xs text-muted-foreground">Module 2 refresh</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-green-400" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Troubleshooting Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-heading font-bold text-foreground">
                🔧 Troubleshooting Common AI Issues
              </h2>
              <p className="text-muted-foreground">
                As a Champion, you'll help colleagues overcome these common challenges
              </p>
            </div>

            <div className="grid gap-6">
              {troubleshootingTips.map((tip, idx) => (
                <Card key={idx} className="shadow-card border-l-4 border-l-amber-500">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <tip.icon className="w-5 h-5 text-amber-600" />
                      <span>{tip.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Problem</Badge>
                      <p className="text-sm text-muted-foreground">{tip.problem}</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Solution</Badge>
                      <p className="text-sm text-muted-foreground">{tip.solution}</p>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-xs font-medium mb-1">💡 Example:</p>
                      <p className="text-xs text-muted-foreground italic">{tip.example}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Driving Adoption Section */}
        <section className="py-12 bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-amber-500/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-heading font-bold text-foreground">
                🚀 Driving Adoption Through Storytelling
              </h2>
              <p className="text-muted-foreground">
                The most powerful adoption tool? Real stories from real colleagues
              </p>
              <p className="text-xs text-muted-foreground">
                Click any card to expand detailed guidance
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {adoptionStrategies.map((strategy, idx) => (
                <Card 
                  key={idx} 
                  className={`shadow-card hover:shadow-lg transition-all cursor-pointer border-2 ${
                    expandedStrategy === idx ? 'border-amber-400 bg-amber-50/50 dark:bg-amber-950/30' : 'border-transparent hover:border-amber-200'
                  }`}
                  onClick={() => setExpandedStrategy(expandedStrategy === idx ? null : idx)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
                          <strategy.icon className="w-5 h-5 text-amber-600" />
                        </div>
                        <CardTitle className="text-lg">{strategy.title}</CardTitle>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-amber-600 transition-transform duration-300 ${
                        expandedStrategy === idx ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{strategy.description}</p>
                    
                    {/* Expanded Content */}
                    {expandedStrategy === idx && strategy.expandedContent && (
                      <div className="pt-4 border-t border-amber-200 dark:border-amber-800 space-y-4 animate-in slide-in-from-top-2 duration-300">
                        <p className="text-sm font-medium text-foreground">
                          {strategy.expandedContent.intro}
                        </p>
                        
                        <div className="space-y-3">
                          {strategy.expandedContent.steps.map((step, stepIdx) => (
                            <div key={stepIdx} className="flex items-start space-x-3 p-3 bg-white dark:bg-background rounded-lg border border-amber-100 dark:border-amber-900">
                              <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                {stepIdx + 1}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-foreground">{step.title}</p>
                                <p className="text-xs text-muted-foreground">{step.detail}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
                          <p className="text-sm text-amber-800 dark:text-amber-200">{strategy.expandedContent.tip}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Advanced Features Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-heading font-bold text-foreground">
                ⚡ Advanced Copilot Features for Power Users
              </h2>
              <p className="text-muted-foreground">
                Level up with these advanced capabilities
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {advancedFeatures.map((feature, idx) => (
                <Card key={idx} className="shadow-card border-2 border-amber-100 hover:border-amber-300 transition-colors">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg">
                        <feature.icon className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Department Use Cases */}
        <section className="py-12 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-heading font-bold text-foreground">
                🎯 Departmental Champion Tips
              </h2>
              <p className="text-muted-foreground">
                Advanced AI strategies tailored for each department
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departmentUseCases.map((dept, idx) => {
                const Icon = dept.icon;
                return (
                  <Card key={idx} className={`shadow-card border-2 ${colorClasses[dept.color]}`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center space-x-2 ${textColorClasses[dept.color]}`}>
                        <Icon className="w-5 h-5" />
                        <span>{dept.dept}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {dept.tips.map((tip, tipIdx) => (
                        <div key={tipIdx} className="border-l-2 border-current pl-3 py-1">
                          <h4 className="text-sm font-semibold">{tip.title}</h4>
                          <p className="text-xs text-muted-foreground">{tip.tip}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-heading font-bold text-foreground">
                📚 Champion Resources
              </h2>
              <p className="text-muted-foreground">
                Tools and training to support your AI Champion journey
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {resources.map((resource, idx) => {
                const Icon = resource.icon;
                return (
                  <Card 
                    key={idx}
                    className={`shadow-card hover:shadow-lg transition-all cursor-pointer ${resource.comingSoon ? 'opacity-75' : ''}`}
                    onClick={() => !resource.comingSoon && resource.link.startsWith('http') && window.open(resource.link, '_blank')}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Icon className="w-8 h-8 text-amber-600" />
                        {resource.comingSoon && (
                          <Badge variant="secondary">Coming Soon</Badge>
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
        <section className="py-16 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <QuizComponent 
              questions={quizQuestionsModule4} 
              moduleId={4}
              moduleName="Advanced Tips for AI Champions"
            />
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-heading font-bold text-foreground">
                🌟 Success Stories
              </h2>
              <p className="text-muted-foreground">
                Share your AI wins and inspire your colleagues
              </p>
            </div>

            {/* Share Story Button */}
            <div className="text-center">
              <Button 
                onClick={() => setShowStoryForm(!showStoryForm)}
                className="bg-amber-600 hover:bg-amber-700"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Share Your Success Story
              </Button>
            </div>

            {/* Story Form */}
            {showStoryForm && (
              <Card className="shadow-lg border-2 border-amber-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-amber-600" />
                    <span>Share Your AI Success Story</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleStorySubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="story-name">Your Name *</Label>
                        <Input 
                          id="story-name"
                          value={storyForm.name}
                          onChange={(e) => setStoryForm({...storyForm, name: e.target.value})}
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="story-email">Email *</Label>
                        <Input 
                          id="story-email"
                          type="email"
                          value={storyForm.email}
                          onChange={(e) => setStoryForm({...storyForm, email: e.target.value})}
                          placeholder="your.email@dynamicsgex.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="story-dept">Department</Label>
                      <Input 
                        id="story-dept"
                        value={storyForm.department}
                        onChange={(e) => setStoryForm({...storyForm, department: e.target.value})}
                        placeholder="e.g., Sales, Marketing, Operations"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="story-title">Story Title *</Label>
                      <Input 
                        id="story-title"
                        value={storyForm.title}
                        onChange={(e) => setStoryForm({...storyForm, title: e.target.value})}
                        placeholder="e.g., How Copilot Saved Me 5 Hours on Report Generation"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="story-content">Your Story *</Label>
                      <Textarea 
                        id="story-content"
                        value={storyForm.content}
                        onChange={(e) => setStoryForm({...storyForm, content: e.target.value})}
                        placeholder="Share what you did, what AI tools you used, and the impact..."
                        rows={5}
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="story-image">Image URL (optional)</Label>
                        <div className="flex space-x-2">
                          <ImageIcon className="w-5 h-5 text-muted-foreground mt-2" />
                          <Input 
                            id="story-image"
                            value={storyForm.imageUrl}
                            onChange={(e) => setStoryForm({...storyForm, imageUrl: e.target.value})}
                            placeholder="https://..."
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="story-link">Related Link (optional)</Label>
                        <div className="flex space-x-2">
                          <LinkIcon className="w-5 h-5 text-muted-foreground mt-2" />
                          <Input 
                            id="story-link"
                            value={storyForm.linkUrl}
                            onChange={(e) => setStoryForm({...storyForm, linkUrl: e.target.value})}
                            placeholder="https://..."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <Button type="button" variant="outline" onClick={() => setShowStoryForm(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={submittingStory} className="bg-amber-600 hover:bg-amber-700">
                        {submittingStory ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                        Share Story
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Stories List */}
            <div className="space-y-4">
              {loadingStories ? (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-amber-600" />
                  <p className="text-muted-foreground mt-2">Loading stories...</p>
                </div>
              ) : successStories.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <Star className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">No success stories yet. Be the first to share!</p>
                  </CardContent>
                </Card>
              ) : (
                successStories.map((story, idx) => (
                  <Card key={idx} className="shadow-card hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{story.title}</CardTitle>
                          <CardDescription className="flex items-center space-x-2 mt-1">
                            <span>{story.name}</span>
                            {story.department && (
                              <>
                                <span>•</span>
                                <Badge variant="secondary">{story.department}</Badge>
                              </>
                            )}
                            <span>•</span>
                            <span className="text-xs">{new Date(story.timestamp).toLocaleDateString()}</span>
                          </CardDescription>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleLike(story.id)}
                          className="flex items-center space-x-1 text-pink-600 hover:text-pink-700 hover:bg-pink-50"
                        >
                          <Heart className={`w-4 h-4 ${story.likes > 0 ? 'fill-pink-600' : ''}`} />
                          <span>{story.likes || 0}</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">{story.content}</p>
                      {story.imageUrl && (
                        <img src={story.imageUrl} alt="Story" className="rounded-lg max-h-64 object-cover" />
                      )}
                      {story.linkUrl && (
                        <a 
                          href={story.linkUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-primary hover:underline"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View Related Resource
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Certificate Section */}
        <section className="py-12 bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-heading font-bold text-foreground">
                🏆 Get Your AI Champion Certificate
              </h2>
              <p className="text-muted-foreground">
                Complete all 4 module quizzes with 70%+ to earn your certification
              </p>
            </div>

            <Card className="shadow-lg border-2 border-amber-300 max-w-xl mx-auto">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <CardTitle>DGX AI Champion Certificate</CardTitle>
                <CardDescription>Enter your details to check eligibility</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCertificateRequest} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cert-name">Full Name (as it will appear on certificate)</Label>
                    <Input 
                      id="cert-name"
                      value={certForm.name}
                      onChange={(e) => setCertForm({...certForm, name: e.target.value})}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cert-email">Email (used for quiz submissions)</Label>
                    <Input 
                      id="cert-email"
                      type="email"
                      value={certForm.email}
                      onChange={(e) => setCertForm({...certForm, email: e.target.value})}
                      placeholder="your.email@dynamicsgex.com"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700" disabled={certLoading}>
                    {certLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                    Check Eligibility
                  </Button>
                </form>

                {/* Certificate Result */}
                {certResult && (
                  <div className={`mt-6 p-4 rounded-lg ${certResult.eligible ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
                    {certResult.eligible ? (
                      <div className="text-center space-y-4">
                        <div className="flex items-center justify-center space-x-2 text-green-700">
                          <CheckCircle className="w-6 h-6" />
                          <span className="font-semibold">Congratulations! You're eligible!</span>
                        </div>
                        <p className="text-sm text-green-600">You've completed all modules with 70%+ scores.</p>
                        <Button onClick={downloadCertificate} className="bg-green-600 hover:bg-green-700">
                          <Download className="w-4 h-4 mr-2" />
                          Download Certificate
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-amber-700">
                          <AlertTriangle className="w-5 h-5" />
                          <span className="font-semibold">Not Yet Eligible</span>
                        </div>
                        <p className="text-sm text-amber-600">{certResult.message}</p>
                        {certResult.modules && (
                          <div className="mt-3 space-y-2">
                            <p className="text-xs font-medium text-amber-700">Your Progress:</p>
                            {certResult.modules.map((mod, idx) => (
                              <div key={idx} className="flex items-center justify-between text-xs">
                                <span>{mod.name}</span>
                                <Badge variant={mod.passed ? "default" : "destructive"}>
                                  {mod.score !== null ? `${mod.score}%` : 'Not taken'}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Next Steps */}
        <section className="py-12 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl font-heading font-bold text-foreground">
              🎉 You're Now an AI Champion!
            </h2>
            <p className="text-lg text-muted-foreground">
              You have the knowledge and tools to lead AI adoption at Dynamics G-Ex. 
              Now go make an impact!
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
                className="bg-amber-600 hover:bg-amber-700"
                onClick={() => navigate('/')}
              >
                Visit G-Ex AI Hub <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <div className="pt-6 border-t mt-6">
              <p className="text-sm text-muted-foreground mb-4">
                🌟 Your mission: Help one colleague succeed with AI this week!
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Module Tutorial */}
      <ModuleTutorial 
        moduleId={4}
        moduleName="Advanced Tips for AI Champions"
      />
      
      {/* Module AI Expert */}
      <ModuleAIExpert 
        moduleId={4}
        moduleName="Advanced Tips for AI Champions"
        moduleContext={moduleContext}
      />
    </div>
  );
}
