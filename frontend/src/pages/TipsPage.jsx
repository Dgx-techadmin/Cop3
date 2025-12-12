import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Megaphone, Settings, Users, Code, HeadphonesIcon, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const departments = [
  {
    id: "sales",
    name: "Sales",
    icon: Briefcase,
    color: "bg-blue-600",
    prompts: [
      {
        title: "Email Drafting",
        prompt: "Draft a personalized follow-up email for a prospect interested in our premium tier, highlighting ROI and next steps.",
        tool: "Copilot in Outlook"
      },
      {
        title: "Call Prep Scripts",
        prompt: "Create a call script for discussing product features with a technical buyer, including objection handling.",
        tool: "Copilot in Word"
      },
      {
        title: "Deal Analysis",
        prompt: "Analyze historical deal data in Excel to identify patterns in successful closures and predict Q4 trends.",
        tool: "Copilot in Excel"
      }
    ]
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: Megaphone,
    color: "bg-purple-600",
    prompts: [
      {
        title: "Social Media Ideas",
        prompt: "Generate 5 engaging LinkedIn post ideas about AI adoption in enterprise, with a professional yet conversational tone.",
        tool: "Copilot"
      },
      {
        title: "Campaign Brainstorming",
        prompt: "Brainstorm creative campaign concepts for our Q1 product launch targeting mid-market companies.",
        tool: "Copilot"
      },
      {
        title: "VOC Analysis",
        prompt: "Analyze customer feedback from surveys and identify top 3 themes with sentiment scores.",
        tool: "Copilot in Excel"
      }
    ]
  },
  {
    id: "operations",
    name: "Operations",
    icon: Settings,
    color: "bg-green-600",
    prompts: [
      {
        title: "SOP Drafting",
        prompt: "Create an SOP for onboarding new team members, including checklist items and timeline.",
        tool: "Copilot in Word"
      },
      {
        title: "Meeting Summaries",
        prompt: "Summarize today's operations meeting, highlighting action items, owners, and deadlines.",
        tool: "Copilot in Teams"
      },
      {
        title: "Process Optimization",
        prompt: "Review our inventory management workflow and suggest 3 efficiency improvements.",
        tool: "Copilot"
      }
    ]
  },
  {
    id: "leadership",
    name: "Leadership",
    icon: Users,
    color: "bg-orange-600",
    prompts: [
      {
        title: "Executive Summaries",
        prompt: "Summarize Q4 performance data into an executive brief with key insights and recommendations.",
        tool: "Copilot in PowerPoint"
      },
      {
        title: "Market Trend Analysis",
        prompt: "Analyze recent market trends in our industry and identify 3 strategic opportunities.",
        tool: "Copilot"
      },
      {
        title: "AI Roadmap",
        prompt: "Create a 6-month AI adoption roadmap for our organization with milestones and success metrics.",
        tool: "Copilot in Word"
      }
    ]
  },
  {
    id: "it",
    name: "IT",
    icon: Code,
    color: "bg-indigo-600",
    prompts: [
      {
        title: "Technical Documentation",
        prompt: "Create technical documentation for our new API integration with step-by-step instructions.",
        tool: "Copilot in Word"
      },
      {
        title: "Security Policy",
        prompt: "Draft a data governance policy for AI tool usage, covering confidentiality and compliance.",
        tool: "Copilot"
      },
      {
        title: "Troubleshooting Guide",
        prompt: "Create a troubleshooting guide for common Office 365 authentication issues.",
        tool: "Copilot in Word"
      }
    ]
  },
  {
    id: "customer-service",
    name: "Customer Service",
    icon: HeadphonesIcon,
    color: "bg-pink-600",
    prompts: [
      {
        title: "Response Templates",
        prompt: "Draft an empathetic response to a customer frustrated with delayed delivery, offering solutions.",
        tool: "Copilot in Outlook"
      },
      {
        title: "FAQ Generation",
        prompt: "Generate a FAQ section based on the top 10 customer inquiries this month.",
        tool: "Copilot"
      },
      {
        title: "Escalation Scripts",
        prompt: "Create a script for escalating complex technical issues to the engineering team.",
        tool: "Copilot in Word"
      }
    ]
  }
];

export default function TipsPage() {
  const [copiedPrompt, setCopiedPrompt] = useState(null);
  const navigate = useNavigate();
  
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground">
              AI Tips & <span className="gradient-text">Use Cases</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Ready-to-use prompts for every department. Just copy, paste, and watch the magic happen!
            </p>
          </div>
        </section>
        
        {/* Tips by Department */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {departments.map((dept, deptIdx) => {
              const Icon = dept.icon;
              return (
                <div key={dept.id} className="space-y-6">
                  {/* Department Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg ${dept.color} flex items-center justify-center shadow-card`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-heading font-bold text-foreground">{dept.name}</h2>
                        <p className="text-sm text-muted-foreground">{dept.prompts.length} ready-to-use prompts</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/department/${dept.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                  
                  {/* Prompts Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dept.prompts.map((item, idx) => {
                      const uniqueIdx = `${deptIdx}-${idx}`;
                      return (
                        <Card key={idx} className="shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] border-2 hover:border-primary/20">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <CardTitle className="font-heading text-lg">{item.title}</CardTitle>
                              <Badge variant="secondary" className="text-xs">
                                {item.tool}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="bg-muted/50 rounded-lg p-3">
                              <p className="text-sm text-foreground italic">"{item.prompt}"</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full group hover:border-primary hover:text-primary"
                              onClick={() => copyPrompt(item.prompt, uniqueIdx)}
                            >
                              {copiedPrompt === uniqueIdx ? (
                                <>
                                  <Check className="mr-2 w-4 h-4" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="mr-2 w-4 h-4" />
                                  Copy Prompt
                                </>
                              )}
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
