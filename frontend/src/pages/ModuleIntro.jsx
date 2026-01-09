import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, MessageSquare, Mail, FileText, Video, Shield, CheckCircle,
  ArrowRight, Sparkles, Monitor, Table, BookOpen, Users, ChevronRight,
  Play, Settings, Mic, Calendar, PenLine, ListChecks, Calculator
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CollapsibleSection } from "@/components/training/CollapsibleSection";

export default function ModuleIntro() {
  const navigate = useNavigate();

  const teamsBasics = [
    {
      title: "Access Copilot in Teams",
      icon: MessageSquare,
      steps: [
        "Open Microsoft Teams on your desktop or browser",
        "Look for the Copilot icon in the left sidebar (sparkle icon)",
        "Click to open the Copilot chat panel",
        "Start typing your question or request"
      ]
    },
    {
      title: "Use Copilot During Meetings",
      icon: Video,
      steps: [
        "Join or start a Teams meeting as usual",
        "Click the Copilot icon in the meeting toolbar",
        "Ask questions like 'What have I missed?' or 'Summarise the discussion so far'",
        "Copilot will provide real-time insights based on the meeting transcript"
      ]
    }
  ];

  const meetingRecording = [
    {
      title: "Enable Meeting Recording & Transcription",
      icon: Mic,
      steps: [
        "During a meeting, click the '...' (More actions) button in the toolbar",
        "Select 'Record and transcribe' → 'Start recording'",
        "A notification will appear for all participants that recording has started",
        "The transcript will appear in real-time in the meeting panel"
      ]
    },
    {
      title: "Use the Intelligent Meeting Recap",
      icon: ListChecks,
      steps: [
        "After the meeting ends, go to your Teams Calendar",
        "Find the meeting and click to open it",
        "Select the 'Recap' tab to see AI-generated notes, action items, and key topics",
        "Share the recap with colleagues who couldn't attend"
      ]
    }
  ];

  const outlookTips = [
    {
      title: "Draft Emails with Copilot",
      icon: PenLine,
      description: "Let Copilot help you write professional emails in seconds",
      steps: [
        "Click 'New Email' in Outlook",
        "Click the Copilot icon in the email toolbar",
        "Describe what you want: e.g., 'Write a follow-up email thanking Sarah for the meeting and confirming next steps'",
        "Review the draft, make any tweaks, and send!"
      ]
    },
    {
      title: "Summarise Long Email Threads",
      icon: Mail,
      description: "Catch up on lengthy conversations instantly",
      steps: [
        "Open a long email thread you need to catch up on",
        "Click the 'Summary by Copilot' button at the top of the thread",
        "Copilot will provide key points, decisions made, and any action items",
        "Use this to quickly understand the context before responding"
      ]
    },
    {
      title: "Coach Your Email Tone",
      icon: MessageSquare,
      description: "Ensure your message strikes the right tone",
      steps: [
        "After drafting your email, highlight the text",
        "Click Copilot and select 'Coaching by Copilot'",
        "Copilot will analyse tone, clarity, and sentiment",
        "Apply suggestions to make your email more effective"
      ]
    }
  ];

  const copilotVsChatGPT = {
    title: "Why Copilot in Teams is More Secure than ChatGPT",
    points: [
      {
        heading: "Your Data Stays Protected",
        description: "Unlike public ChatGPT, Copilot in Teams operates within Microsoft's secure enterprise environment. Your conversations and data never leave the G-Ex security boundary."
      },
      {
        heading: "No Training on Your Data",
        description: "Microsoft Copilot doesn't use your prompts or company data to train AI models. With ChatGPT's free tier, your inputs may be used for model improvement."
      },
      {
        heading: "Compliance & Audit Ready",
        description: "Copilot conversations are covered by our existing Microsoft 365 compliance policies, including data retention and audit capabilities."
      },
      {
        heading: "Access to Company Context",
        description: "Copilot can safely reference your emails, documents, and Teams chats to provide more relevant answers - something ChatGPT cannot do securely."
      }
    ],
    howToUse: [
      "Open the Copilot app in Teams (left sidebar)",
      "Ask anything you'd normally ask ChatGPT: brainstorm ideas, explain concepts, draft content",
      "For sensitive topics, you can confidently use Copilot knowing your data is protected",
      "Try: 'Help me prepare talking points for tomorrow's client presentation'"
    ]
  };

  const wordTips = [
    {
      title: "Draft Documents from Scratch",
      icon: FileText,
      steps: [
        "Open a new Word document",
        "Click the Copilot icon in the Home ribbon",
        "Describe what you need: 'Create a project proposal for a new inventory system'",
        "Copilot generates a full draft you can refine and personalise"
      ]
    },
    {
      title: "Rewrite & Improve Text",
      icon: PenLine,
      steps: [
        "Select the text you want to improve",
        "Click the Copilot icon that appears",
        "Choose 'Rewrite' and select your preferred tone (professional, casual, concise)",
        "Preview options and insert your favourite version"
      ]
    },
    {
      title: "Summarise Long Documents",
      icon: ListChecks,
      steps: [
        "Open a lengthy document you need to review",
        "Click Copilot and ask: 'Summarise this document in 5 key points'",
        "Use follow-up questions: 'What are the main recommendations?' or 'List all action items'",
        "Perfect for quickly reviewing reports, policies, or meeting notes"
      ]
    }
  ];

  const excelTips = [
    {
      title: "Analyse Data with Natural Language",
      icon: Table,
      steps: [
        "Select your data table in Excel",
        "Click the Copilot icon in the Home ribbon",
        "Ask questions like: 'What are the top 5 products by revenue?' or 'Show me sales trends by month'",
        "Copilot creates charts, highlights, and insights automatically"
      ]
    },
    {
      title: "Get Help with Formulas",
      icon: Calculator,
      steps: [
        "Click in the cell where you need a formula",
        "Open Copilot and describe what you need: 'Calculate the percentage change between columns B and C'",
        "Copilot will suggest the correct formula (e.g., =(C2-B2)/B2)",
        "Click to insert the formula, then drag to apply to other rows"
      ]
    },
    {
      title: "Create Instant Visualisations",
      icon: Monitor,
      steps: [
        "Select your data range",
        "Ask Copilot: 'Create a chart showing monthly sales comparison'",
        "Choose from suggested chart types (bar, line, pie)",
        "Copilot inserts a formatted chart you can customise further"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Navigation />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-orange-100 text-orange-700 border-orange-200">
            <Zap className="w-3 h-3 mr-1" />
            Quick Start Guide
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Intro & Quick Wins
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
            Hit the ground running. Some stuff you can do without being AI-savvy.
          </p>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            No quiz required - just practical tips to start using AI today.
          </p>
        </div>

        {/* Section 1: Copilot in Teams Basics */}
        <section className="mb-10">
          <Card className="border-2 border-purple-200 shadow-card">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">How to Use Copilot in Teams</CardTitle>
                  <CardDescription>Your AI assistant, right where you work</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {teamsBasics.map((item, idx) => (
                <CollapsibleSection key={idx} title={item.title} icon={item.icon} defaultOpen={idx === 0}>
                  <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg">
                    <ol className="space-y-2">
                      {item.steps.map((step, stepIdx) => (
                        <li key={stepIdx} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-purple-200 dark:bg-purple-800 rounded-full flex items-center justify-center text-sm font-semibold text-purple-700 dark:text-purple-300">
                            {stepIdx + 1}
                          </span>
                          <span className="text-sm text-muted-foreground pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </CollapsibleSection>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Section 2: Meeting Recording & Assistant */}
        <section className="mb-10">
          <Card className="border-2 border-blue-200 shadow-card">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Video className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Meeting Recording & AI Assistant</CardTitle>
                  <CardDescription>Never miss important details from your meetings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {meetingRecording.map((item, idx) => (
                <CollapsibleSection key={idx} title={item.title} icon={item.icon} defaultOpen={idx === 0}>
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                    <ol className="space-y-2">
                      {item.steps.map((step, stepIdx) => (
                        <li key={stepIdx} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-200 dark:bg-blue-800 rounded-full flex items-center justify-center text-sm font-semibold text-blue-700 dark:text-blue-300">
                            {stepIdx + 1}
                          </span>
                          <span className="text-sm text-muted-foreground pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </CollapsibleSection>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Section 3: Copilot in Outlook */}
        <section className="mb-10">
          <Card className="border-2 border-amber-200 shadow-card">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-lg">
                  <Mail className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Copilot in Outlook</CardTitle>
                  <CardDescription>Master your inbox with AI assistance</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {outlookTips.map((tip, idx) => (
                <CollapsibleSection key={idx} title={tip.title} icon={tip.icon} defaultOpen={idx === 0}>
                  <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-3 italic">{tip.description}</p>
                    <ol className="space-y-2">
                      {tip.steps.map((step, stepIdx) => (
                        <li key={stepIdx} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-amber-200 dark:bg-amber-800 rounded-full flex items-center justify-center text-sm font-semibold text-amber-700 dark:text-amber-300">
                            {stepIdx + 1}
                          </span>
                          <span className="text-sm text-muted-foreground pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </CollapsibleSection>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Section 4: Copilot vs ChatGPT - Security */}
        <section className="mb-10">
          <Card className="border-2 border-green-200 shadow-card">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Copilot in Teams: Your Secure ChatGPT Alternative</CardTitle>
                  <CardDescription>All the power of AI, with enterprise-grade security</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-4 mb-6">
                {copilotVsChatGPT.points.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">{point.heading}</h4>
                      <p className="text-sm text-muted-foreground">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <CollapsibleSection title="How to Use Copilot as Your ChatGPT Replacement" icon={Sparkles} defaultOpen={true}>
                <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                  <ol className="space-y-2">
                    {copilotVsChatGPT.howToUse.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-200 dark:bg-green-800 rounded-full flex items-center justify-center text-sm font-semibold text-green-700 dark:text-green-300">
                          {idx + 1}
                        </span>
                        <span className="text-sm text-muted-foreground pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </CollapsibleSection>
            </CardContent>
          </Card>
        </section>

        {/* Section 5: Word and Excel */}
        <section className="mb-10">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Word Tips */}
            <Card className="border-2 border-indigo-200 shadow-card">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                    <FileText className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Copilot in Word</CardTitle>
                    <CardDescription>Create documents faster</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                {wordTips.map((tip, idx) => (
                  <CollapsibleSection key={idx} title={tip.title} icon={tip.icon} defaultOpen={idx === 0}>
                    <div className="bg-indigo-50 dark:bg-indigo-950/30 p-3 rounded-lg">
                      <ol className="space-y-2">
                        {tip.steps.map((step, stepIdx) => (
                          <li key={stepIdx} className="flex items-start gap-2">
                            <span className="flex-shrink-0 w-5 h-5 bg-indigo-200 dark:bg-indigo-800 rounded-full flex items-center justify-center text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                              {stepIdx + 1}
                            </span>
                            <span className="text-xs text-muted-foreground pt-0.5">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </CollapsibleSection>
                ))}
              </CardContent>
            </Card>

            {/* Excel Tips */}
            <Card className="border-2 border-teal-200 shadow-card">
              <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-100 dark:bg-teal-900 rounded-lg">
                    <Table className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Copilot in Excel</CardTitle>
                    <CardDescription>Data analysis made easy</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                {excelTips.map((tip, idx) => (
                  <CollapsibleSection key={idx} title={tip.title} icon={tip.icon} defaultOpen={idx === 0}>
                    <div className="bg-teal-50 dark:bg-teal-950/30 p-3 rounded-lg">
                      <ol className="space-y-2">
                        {tip.steps.map((step, stepIdx) => (
                          <li key={stepIdx} className="flex items-start gap-2">
                            <span className="flex-shrink-0 w-5 h-5 bg-teal-200 dark:bg-teal-800 rounded-full flex items-center justify-center text-xs font-semibold text-teal-700 dark:text-teal-300">
                              {stepIdx + 1}
                            </span>
                            <span className="text-xs text-muted-foreground pt-0.5">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </CollapsibleSection>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 6: Next Steps */}
        <section className="mb-10">
          <Card className="border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 shadow-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                  <ArrowRight className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Ready for More?</CardTitle>
                  <CardDescription>Continue your AI journey with these next steps</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <Button 
                  variant="default"
                  className="h-auto p-4 flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  onClick={() => navigate('/training/module-1')}
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5" />
                    <div className="text-left">
                      <p className="font-semibold">Start Training Module 1</p>
                      <p className="text-xs opacity-90">AI Fundamentals & Strategy</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </Button>

                <Button 
                  variant="outline"
                  className="h-auto p-4 flex items-center justify-between border-2 border-orange-300 hover:bg-orange-100 dark:hover:bg-orange-950"
                  onClick={() => navigate('/training/module-4')}
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-orange-600" />
                    <div className="text-left">
                      <p className="font-semibold">Share Success Stories</p>
                      <p className="text-xs text-muted-foreground">Inspire others with your wins</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-orange-600" />
                </Button>
              </div>

              <div className="mt-6 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg border border-orange-200">
                <p className="text-sm text-center text-muted-foreground">
                  <Sparkles className="w-4 h-4 inline mr-1 text-orange-500" />
                  <strong>Pro Tip:</strong> Try one of these Copilot features today. The best way to learn AI is by doing!
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Back to Training Hub */}
        <div className="text-center">
          <Button variant="ghost" onClick={() => navigate('/training')}>
            ← Back to Training Hub
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
