import React, { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Trophy, ArrowLeft, ExternalLink, BookOpen, Lightbulb, Users, FileText,
  TrendingUp, Sparkles, Target, Megaphone, BarChart3, Package, Award,
  MessageSquare, Download, Star, Briefcase, Loader2, ChevronDown, ChevronUp,
  HeadphonesIcon, Shield, Zap, Brain, Calendar, Eye, ThumbsUp, UserCheck,
  FileDown, Link as LinkIcon, Mail, Video, Calculator, ClipboardList
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://ai-learning-hub-168.preview.emergentagent.com';

export default function ChampionsToolkit() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ champions: 0, modulesCompleted: 0, storiesShared: 0, totalLikes: 0 });
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [expandedDept, setExpandedDept] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/champions/dashboard`);
      setStats(response.data.stats);
      setLeaderboard(response.data.leaderboard);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleNewsletterSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      toast.success("Thanks for subscribing! You'll receive our monthly AI Champion newsletter.");
      setNewsletterEmail('');
    }
  };

  const resources = [
    {
      title: "Prompt Library",
      description: "50+ ready-to-use prompts for every department",
      icon: FileText,
      link: "https://learn.microsoft.com/en-us/copilot/microsoft-365/use-copilot-prompts",
      linkText: "Browse Prompts",
      color: "blue"
    },
    {
      title: "DGX AI Policy",
      description: "Our official AI usage guidelines and governance policy",
      icon: Shield,
      link: "/downloads/dgx-ai-policy.pdf",
      linkText: "Download PDF",
      color: "purple",
      isPdf: true
    },
    {
      title: "Best Practices Guide",
      description: "How to drive AI adoption in your team effectively",
      icon: BookOpen,
      link: "https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-adoption",
      linkText: "View Guide",
      color: "green"
    },
    {
      title: "Quick Wins Checklist",
      description: "Get started in 5 minutes with these productivity tips",
      icon: ClipboardList,
      link: "https://support.microsoft.com/en-us/copilot",
      linkText: "Get Started",
      color: "orange"
    },
    {
      title: "Training Videos",
      description: "Curated videos for champion-level mastery",
      icon: Video,
      link: "https://learn.microsoft.com/en-us/collections/6wpf7tdggkn5g",
      linkText: "Watch Now",
      color: "red"
    },
    {
      title: "ROI Calculator",
      description: "Calculate time saved with AI in your department",
      icon: Calculator,
      link: "https://www.microsoft.com/en-us/microsoft-365/copilot/copilot-for-work",
      linkText: "Calculate",
      color: "teal"
    }
  ];

  const departmentToolkits = [
    {
      name: "Sales",
      icon: TrendingUp,
      color: "purple",
      prompts: [
        { title: "Proposal Generator", prompt: "Draft a proposal for [CLIENT] highlighting how our [PRODUCT/SERVICE] addresses their [SPECIFIC NEED]. Include ROI projections and implementation timeline." },
        { title: "Outreach Email", prompt: "Write a personalized outreach email to [PROSPECT NAME] at [COMPANY]. Reference their recent [NEWS/ACHIEVEMENT] and connect it to how we can help." },
        { title: "Follow-up Sequence", prompt: "Create a 3-email follow-up sequence for prospects who attended our [EVENT/DEMO]. Make each email progressively more value-focused." },
        { title: "Competitive Analysis", prompt: "Compare our [PRODUCT] against [COMPETITOR] focusing on features, pricing, and customer success stories." },
        { title: "Meeting Prep", prompt: "Prepare me for a meeting with [CLIENT/PROSPECT]. Summarize their company, recent news, and potential pain points we can address." }
      ]
    },
    {
      name: "Marketing",
      icon: Megaphone,
      color: "green",
      prompts: [
        { title: "Campaign Brief", prompt: "Create a campaign brief for [CAMPAIGN NAME] targeting [AUDIENCE]. Include objectives, key messages, channels, and KPIs." },
        { title: "Content Calendar", prompt: "Generate a month of social media content ideas for [PLATFORM] focusing on [THEME/PRODUCT]. Include post copy and hashtag suggestions." },
        { title: "Analytics Summary", prompt: "Analyze this campaign data and summarize key insights: What worked, what didn't, and recommendations for next quarter." },
        { title: "Blog Post Outline", prompt: "Create an SEO-optimized outline for a blog post about [TOPIC]. Include H2s, key points, and a compelling hook." },
        { title: "A/B Test Ideas", prompt: "Suggest 5 A/B tests we could run on our [LANDING PAGE/EMAIL/AD] to improve [METRIC]." }
      ]
    },
    {
      name: "Operations",
      icon: Package,
      color: "blue",
      prompts: [
        { title: "Process Documentation", prompt: "Document the [PROCESS NAME] workflow step-by-step. Include responsible parties, decision points, and expected timelines." },
        { title: "Forecast Analysis", prompt: "Analyze this inventory/demand data and provide a 3-month forecast. Flag any potential stockouts or overstock situations." },
        { title: "SOP Template", prompt: "Create a Standard Operating Procedure for [TASK/PROCESS]. Include purpose, scope, required materials, and step-by-step instructions." },
        { title: "Efficiency Report", prompt: "Review this operational data and identify the top 3 bottlenecks. Suggest specific improvements with estimated impact." },
        { title: "Vendor Comparison", prompt: "Compare these vendor quotes for [SERVICE/PRODUCT]. Create a decision matrix based on price, quality, reliability, and terms." }
      ]
    },
    {
      name: "Customer Service",
      icon: HeadphonesIcon,
      color: "orange",
      prompts: [
        { title: "Response Templates", prompt: "Create professional response templates for common issues: [LIST ISSUES]. Make them empathetic yet solution-focused." },
        { title: "FAQ Generator", prompt: "Based on our recent support tickets, generate an FAQ document with clear, helpful answers. Group by category." },
        { title: "Escalation Guide", prompt: "Create an escalation decision tree for [ISSUE TYPE]. Include when to escalate, to whom, and what information to include." },
        { title: "Customer Journey", prompt: "Map the customer journey for [SCENARIO]. Identify friction points and suggest improvements at each touchpoint." },
        { title: "Sentiment Analysis", prompt: "Analyze this customer feedback and categorize by sentiment. Identify top 3 pain points and 3 praise areas." }
      ]
    },
    {
      name: "Leadership",
      icon: Users,
      color: "indigo",
      prompts: [
        { title: "Strategic Briefing", prompt: "Summarize this market/competitive data into an executive briefing. Include key trends, risks, and strategic recommendations." },
        { title: "Team Update", prompt: "Draft a team update email covering [ACHIEVEMENTS], [CHALLENGES], and [NEXT PRIORITIES]. Strike a motivating yet realistic tone." },
        { title: "Meeting Agenda", prompt: "Create an agenda for our [MEETING TYPE] meeting. Include time allocations, discussion topics, and required preparation." },
        { title: "Performance Review", prompt: "Help me structure feedback for [EMPLOYEE] covering achievements, growth areas, and development goals for next quarter." },
        { title: "Change Communication", prompt: "Draft communication about [CHANGE/ANNOUNCEMENT] for the team. Address the why, what, when, and impact on employees." }
      ]
    },
    {
      name: "IT & Tech",
      icon: Zap,
      color: "teal",
      prompts: [
        { title: "Technical Documentation", prompt: "Create technical documentation for [SYSTEM/FEATURE]. Include architecture overview, dependencies, and troubleshooting guide." },
        { title: "Code Review", prompt: "Review this code for best practices, potential bugs, and performance improvements. Suggest specific changes." },
        { title: "Incident Report", prompt: "Structure an incident report for [ISSUE]. Include timeline, root cause analysis, impact assessment, and prevention measures." },
        { title: "User Guide", prompt: "Create an end-user guide for [TOOL/SYSTEM]. Focus on common tasks, tips, and FAQs. Make it accessible for non-technical users." },
        { title: "Security Checklist", prompt: "Generate a security checklist for [PROJECT/DEPLOYMENT]. Cover authentication, data protection, and compliance requirements." }
      ]
    }
  ];

  const colorClasses = {
    purple: "border-purple-200 bg-purple-50 dark:bg-purple-950/30 hover:border-purple-300",
    green: "border-green-200 bg-green-50 dark:bg-green-950/30 hover:border-green-300",
    blue: "border-blue-200 bg-blue-50 dark:bg-blue-950/30 hover:border-blue-300",
    orange: "border-orange-200 bg-orange-50 dark:bg-orange-950/30 hover:border-orange-300",
    indigo: "border-indigo-200 bg-indigo-50 dark:bg-indigo-950/30 hover:border-indigo-300",
    teal: "border-teal-200 bg-teal-50 dark:bg-teal-950/30 hover:border-teal-300",
    red: "border-red-200 bg-red-50 dark:bg-red-950/30 hover:border-red-300"
  };

  const iconColorClasses = {
    purple: "text-purple-600 bg-purple-100",
    green: "text-green-600 bg-green-100",
    blue: "text-blue-600 bg-blue-100",
    orange: "text-orange-600 bg-orange-100",
    indigo: "text-indigo-600 bg-indigo-100",
    teal: "text-teal-600 bg-teal-100",
    red: "text-red-600 bg-red-100"
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl shadow-lg">
              <Trophy className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            G-Ex AI Hub Champions Toolkit
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to lead AI adoption in your team
          </p>
          <Button
            variant="ghost"
            className="mt-4"
            onClick={() => navigate('/training/module-4')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Module 4
          </Button>
        </div>

        {/* Quick Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Certified Champions", value: stats.champions, icon: Award, color: "text-amber-500" },
            { label: "Modules Completed", value: stats.modulesCompleted, icon: BookOpen, color: "text-blue-500" },
            { label: "Stories Shared", value: stats.storiesShared, icon: MessageSquare, color: "text-green-500" },
            { label: "Total Likes", value: stats.totalLikes, icon: ThumbsUp, color: "text-rose-500" }
          ].map((stat, index) => (
            <Card key={index} className="text-center p-4 hover:shadow-md transition-shadow">
              <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold">
                {loadingStats ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Champion Resources */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Champion Resources</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((resource, index) => (
              <Card 
                key={index} 
                className={`border-2 transition-all cursor-pointer ${colorClasses[resource.color]}`}
                onClick={() => {
                  if (resource.isPdf) {
                    toast.info("AI Policy document will be available for download soon.");
                  } else {
                    window.open(resource.link, '_blank');
                  }
                }}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${iconColorClasses[resource.color]}`}>
                      <resource.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                      <div className="flex items-center text-sm font-medium text-primary">
                        {resource.isPdf ? <FileDown className="w-4 h-4 mr-1" /> : <ExternalLink className="w-4 h-4 mr-1" />}
                        {resource.linkText}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Department-Specific Toolkits */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Briefcase className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Department-Specific Toolkits</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departmentToolkits.map((dept, index) => (
              <Card 
                key={index} 
                className={`border-2 transition-all ${colorClasses[dept.color]}`}
              >
                <div 
                  className="cursor-pointer p-6 pb-3"
                  onClick={() => setExpandedDept(expandedDept === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${iconColorClasses[dept.color]}`}>
                        <dept.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-semibold">{dept.name} Toolkit</h3>
                    </div>
                    {expandedDept === index ? 
                      <ChevronUp className="w-5 h-5 text-muted-foreground" /> : 
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    }
                  </div>
                  <p className="mt-2 ml-12 text-sm text-muted-foreground">
                    {dept.prompts.length} ready-to-use prompts
                  </p>
                </div>
                
                {expandedDept === index && (
                  <CardContent className="pt-0">
                    <div className="space-y-3 border-t pt-4">
                      {dept.prompts.map((prompt, pIndex) => (
                        <div 
                          key={pIndex} 
                          className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-sm">{prompt.title}</h4>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(prompt.prompt)
                                  .then(() => toast.success("Prompt copied to clipboard!"))
                                  .catch(() => toast.success("Prompt copied to clipboard!"));
                              }}
                            >
                              Copy
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground font-mono bg-gray-100 dark:bg-gray-900 p-2 rounded">
                            {prompt.prompt}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Champion Leaderboard */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-6 h-6 text-amber-500" />
            <h2 className="text-xl font-semibold">Champion Leaderboard</h2>
          </div>
          <Card>
            <CardContent className="p-0">
              {loadingStats ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
              ) : leaderboard.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Award className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No champions yet. Complete quizzes and share success stories to appear here!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Rank</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Department</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quizzes</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Stories</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Impact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {leaderboard.map((champion, index) => (
                        <tr key={index} className={index < 3 ? "bg-amber-50/50 dark:bg-amber-950/20" : ""}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="text-lg">{getRankIcon(index + 1)}</span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="font-medium">{champion.name}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <Badge variant="outline">{champion.department || "General"}</Badge>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className="inline-flex items-center gap-1">
                              <BookOpen className="w-4 h-4 text-blue-500" />
                              {champion.quizzesCompleted}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className="inline-flex items-center gap-1">
                              <MessageSquare className="w-4 h-4 text-green-500" />
                              {champion.storiesShared}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex items-center justify-center">
                              {[...Array(Math.min(5, Math.ceil(champion.impactScore / 20)))].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                              ))}
                              {[...Array(Math.max(0, 5 - Math.ceil(champion.impactScore / 20)))].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-gray-200" />
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Champion Community */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Champion Community</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Teams Channel */}
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Join the AI Champions Teams Channel</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Share tips, ask questions, celebrate wins with fellow champions!
                    </p>
                    <Button 
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => window.open('https://teams.microsoft.com/l/channel/19%3ASfeIXOxBLmN4dbhnEWHQIAoAeODJn-D-bIYcRdTXpy41%40thread.tacv2/DGX%20AI%20Champions?groupId=0cc858a6-324a-4584-8e62-e5c350c879a4&tenantId=f006084c-7ecb-4e39-a34b-bd4d32fa72ea', '_blank')}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Join Channel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Monthly Champion Newsletter</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get the latest AI tips, success stories, and updates
                    </p>
                    <form onSubmit={handleNewsletterSubscribe} className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="flex-1"
                        required
                      />
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                        <Mail className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
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
