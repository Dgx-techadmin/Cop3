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
  Image as ImageIcon, Link as LinkIcon
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
      icon: Trophy
    },
    {
      title: "Live Demonstrations",
      description: "Show, don't tell. Run 15-minute 'Copilot Coffee' sessions where you solve real problems live. Seeing is believing.",
      icon: Target
    },
    {
      title: "Create Template Libraries",
      description: "Build a shared repository of proven prompts for common tasks. Lower the barrier to entry for colleagues.",
      icon: FileText
    },
    {
      title: "Celebrate Champions",
      description: "Recognize team members who find innovative AI uses. Public recognition encourages experimentation.",
      icon: Star
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
      link: "https://learn.microsoft.com/en-us/copilot/",
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
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {adoptionStrategies.map((strategy, idx) => (
                <Card key={idx} className="shadow-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
                        <strategy.icon className="w-5 h-5 text-amber-600" />
                      </div>
                      <CardTitle className="text-lg">{strategy.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{strategy.description}</p>
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
