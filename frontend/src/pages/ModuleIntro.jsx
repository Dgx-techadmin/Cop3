import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, MessageSquare, Mail, FileText, Video, Shield, CheckCircle,
  ArrowRight, Sparkles, Monitor, Table, BookOpen, Users, ChevronRight,
  Play, Settings, Mic, Calendar, PenLine, ListChecks, Calculator,
  MousePointer, Eye, AlertCircle, Lightbulb, ExternalLink, Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CollapsibleSection } from "@/components/training/CollapsibleSection";
import { ModuleAIExpert } from "@/components/training/ModuleAIExpert";
import { ModuleTutorial } from "@/components/training/ModuleTutorial";

export default function ModuleIntro() {
  const navigate = useNavigate();

  const moduleContext = `This is the Intro & Quick Wins module - a quick start guide for using Microsoft Copilot.

Key Topics:
- How to access and use Copilot in Microsoft Teams
- Setting up meeting recording and using the intelligent meeting recap
- Using Copilot in Outlook: drafting emails, summarising threads, coaching tone
- Why Copilot in Teams is more secure than ChatGPT (enterprise security, no data training, compliance)
- Copilot in Word: drafting documents, rewriting text, summarising long documents
- Copilot in Excel: analysing data with natural language, getting help with formulas, creating visualisations
- This is a no-quiz introductory module designed for quick practical wins`;

  // Video tutorial data
  const videoTutorials = {
    teams: {
      title: "Copilot in Teams Tutorial",
      videoId: "Z7DwJtTkNSE",
      description: "Full beginner's guide to using Copilot in Microsoft Teams"
    },
    outlook: {
      title: "Copilot in Outlook Tutorial",
      videoId: "Q2WsFayNjwo",
      description: "How to use Microsoft Copilot in Outlook"
    },
    word: {
      title: "Copilot in Word Tutorial",
      videoId: "7VlpfA_A7Tg",
      description: "Getting started with Copilot in Word"
    },
    excel: {
      title: "Copilot in Excel Tutorial",
      videoId: "Aucr_qrwEwE",
      description: "Using Copilot to analyse data in Excel"
    }
  };

  const VideoEmbed = ({ videoId, title }) => (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900 group cursor-pointer"
         onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')}>
      <img 
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
        onError={(e) => {
          e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
          <Play className="w-8 h-8 text-white ml-1" fill="white" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <p className="text-white text-sm font-medium">{title}</p>
      </div>
    </div>
  );

  const StepCard = ({ number, title, description, tip, warning }) => (
    <div className="flex gap-4 p-4 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold text-lg shadow-md">
        {number}
      </div>
      <div className="flex-1 space-y-2">
        <h4 className="font-semibold text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
        {tip && (
          <div className="flex items-start gap-2 mt-2 p-2 bg-blue-50 dark:bg-blue-950/30 rounded-md">
            <Lightbulb className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 dark:text-blue-300">{tip}</p>
          </div>
        )}
        {warning && (
          <div className="flex items-start gap-2 mt-2 p-2 bg-amber-50 dark:bg-amber-950/30 rounded-md">
            <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 dark:text-amber-300">{warning}</p>
          </div>
        )}
      </div>
    </div>
  );

  const LocationCallout = ({ icon: Icon, location, color = "purple" }) => (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-${color}-100 dark:bg-${color}-900/30 rounded-full text-sm font-medium text-${color}-700 dark:text-${color}-300`}>
      <Icon className="w-4 h-4" />
      <span>{location}</span>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 bg-gradient-to-b from-background to-secondary/20">
        {/* Module Banner with Logomark Pattern */}
        <div 
          className="relative bg-gradient-to-r from-orange-500 to-amber-500 overflow-hidden"
          style={{
            backgroundImage: `url('/dynamics-gex-logo.png')`,
            backgroundSize: '120px',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center',
            opacity: 0.95
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/95 via-orange-500/90 to-amber-500/95"></div>
          <div className="relative py-8 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <Zap className="w-6 h-6 text-white" />
                <span className="text-2xl sm:text-3xl font-heading font-bold text-white">
                  Quick Start Guide
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-background via-background to-secondary/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground">
              Intro & <span className="text-orange-500">Quick Wins</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hit the ground running. Some stuff you can do without being AI-savvy.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <Badge variant="outline" className="text-sm px-3 py-1 bg-orange-50 border-orange-200">
                <Zap className="w-3 h-3 mr-1 text-orange-500" /> No Quiz Required
              </Badge>
              <Badge variant="outline" className="text-sm px-3 py-1 bg-green-50 border-green-200">
                <CheckCircle className="w-3 h-3 mr-1 text-green-500" /> 10 Min Read
              </Badge>
              <Badge variant="outline" className="text-sm px-3 py-1 bg-blue-50 border-blue-200">
                <Sparkles className="w-3 h-3 mr-1 text-blue-500" /> Practical Tips
              </Badge>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Section 1: Copilot in Teams */}
        <section className="mb-12">
          <Card className="border-2 border-purple-200 shadow-card overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
                  <MessageSquare className="w-7 h-7 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl">How to Use Copilot in Teams</CardTitle>
                  <CardDescription className="text-base">Your AI assistant, right where you work</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Video Tutorial */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Play className="w-4 h-4 text-purple-500" />
                    Watch: Copilot in Teams Tutorial
                  </h4>
                  <VideoEmbed videoId={videoTutorials.teams.videoId} title={videoTutorials.teams.title} />
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <MousePointer className="w-4 h-4 text-purple-600" />
                      Where to Find Copilot
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 font-bold">→</span>
                        <span><strong>New Teams:</strong> Look for the <span className="bg-purple-100 px-1.5 py-0.5 rounded text-purple-700 font-mono text-xs">✨ Copilot</span> icon in the <strong>top-right corner</strong> of the Teams window</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 font-bold">→</span>
                        <span><strong>In Meetings:</strong> Find the Copilot button in the <strong>meeting toolbar</strong> at the top of your meeting window</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 font-bold">→</span>
                        <span><strong>In Chats:</strong> Open any chat and click Copilot to get summaries or ask questions about the conversation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Detailed Steps */}
              <div>
                <h4 className="font-semibold mb-4 text-lg">Step-by-Step: Access Copilot in Teams</h4>
                <div className="space-y-3">
                  <StepCard 
                    number="1" 
                    title="Open Microsoft Teams"
                    description="Launch the Teams desktop app or open Teams in your web browser. Make sure you're signed in with your G-Ex account."
                    tip="Use the desktop app for the best experience - it's faster and more reliable than the web version."
                  />
                  <StepCard 
                    number="2" 
                    title="Locate the Copilot Icon"
                    description="In the new Teams interface, look at the top-right corner of your window. You'll see a sparkle icon (✨) - this is Copilot. In older versions, it may be in the left sidebar."
                    tip="Can't see the icon? Your admin may need to enable Copilot for your account."
                  />
                  <StepCard 
                    number="3" 
                    title="Open the Copilot Panel"
                    description="Click the Copilot icon to open a side panel on the right. This is your AI assistant chat window where you can type questions or requests."
                  />
                  <StepCard 
                    number="4" 
                    title="Start Chatting"
                    description="Type your request in natural language. Try: 'Summarise my unread messages' or 'What meetings do I have today?' or 'Help me draft a message to my team about the project update.'"
                    tip="Be specific! Instead of 'Help me write an email', try 'Help me write a professional email to John about rescheduling our Friday meeting to Monday.'"
                  />
                </div>
              </div>

              {/* Using Copilot in Meetings */}
              <div className="border-t pt-6">
                <h4 className="font-semibold mb-4 text-lg">Using Copilot During Meetings</h4>
                <div className="space-y-3">
                  <StepCard 
                    number="1" 
                    title="Join Your Meeting"
                    description="Join or start a Teams meeting as usual. Copilot works with both scheduled meetings and ad-hoc calls."
                  />
                  <StepCard 
                    number="2" 
                    title="Enable Transcription (Required)"
                    description="For Copilot to work in meetings, transcription must be on. Click the '...' (More actions) button, then 'Record and transcribe' → 'Start transcription'. All participants will be notified."
                    warning="Without transcription, Copilot can't 'hear' the meeting and won't be able to help."
                  />
                  <StepCard 
                    number="3" 
                    title="Open Copilot"
                    description="Click the Copilot icon in the meeting toolbar. A panel will open on the right side of your meeting window."
                  />
                  <StepCard 
                    number="4" 
                    title="Ask Questions"
                    description="Try these powerful prompts during your meeting:"
                    tip="'What have I missed?' • 'Summarise the discussion so far' • 'What action items have been mentioned?' • 'What questions are still unresolved?'"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 2: Meeting Recording & Recap */}
        <section className="mb-12">
          <Card className="border-2 border-blue-200 shadow-card overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                  <Video className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Meeting Recording & AI Recap</CardTitle>
                  <CardDescription className="text-base">Never miss important details from your meetings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Key Feature Callouts */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-center">
                  <Mic className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h5 className="font-semibold text-sm">Live Transcription</h5>
                  <p className="text-xs text-muted-foreground mt-1">Real-time text of everything said</p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-center">
                  <ListChecks className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h5 className="font-semibold text-sm">AI-Generated Notes</h5>
                  <p className="text-xs text-muted-foreground mt-1">Automatic action items & decisions</p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-center">
                  <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h5 className="font-semibold text-sm">Intelligent Recap</h5>
                  <p className="text-xs text-muted-foreground mt-1">Chapters, highlights & summaries</p>
                </div>
              </div>

              {/* How to Record */}
              <div>
                <h4 className="font-semibold mb-4 text-lg">How to Record & Transcribe Meetings</h4>
                <div className="space-y-3">
                  <StepCard 
                    number="1" 
                    title="Start or Join Your Meeting"
                    description="Open your scheduled meeting or start an instant meeting in Teams."
                  />
                  <StepCard 
                    number="2" 
                    title="Click 'More Actions' (⋯)"
                    description="In the meeting toolbar at the top, find and click the three dots '...' menu (More actions)."
                  />
                  <StepCard 
                    number="3" 
                    title="Select 'Record and Transcribe'"
                    description="From the dropdown menu, hover over 'Record and transcribe', then click 'Start recording'. This automatically starts both recording and transcription."
                    tip="You can also start transcription without recording if you just want the text transcript."
                  />
                  <StepCard 
                    number="4" 
                    title="Confirm Recording Has Started"
                    description="A red recording indicator will appear in the meeting. All participants will see a notification that the meeting is being recorded and transcribed."
                    warning="Always inform participants that the meeting is being recorded. This is both courteous and often legally required."
                  />
                </div>
              </div>

              {/* Intelligent Recap */}
              <div className="border-t pt-6">
                <h4 className="font-semibold mb-4 text-lg">Using the Intelligent Meeting Recap</h4>
                <div className="space-y-3">
                  <StepCard 
                    number="1" 
                    title="Wait for Processing"
                    description="After your meeting ends, Teams needs a few minutes to process the recording and generate the AI recap. You'll receive a notification when it's ready."
                  />
                  <StepCard 
                    number="2" 
                    title="Open the Meeting Recap"
                    description="Go to your Teams Calendar, find the meeting, and click to open it. Select the 'Recap' tab to see AI-generated content."
                  />
                  <StepCard 
                    number="3" 
                    title="Review AI-Generated Content"
                    description="The Recap includes: Summary of key topics discussed, Chapters with timestamps for easy navigation, Action items extracted from the conversation, and notes organised by speaker."
                    tip="Click on any chapter to jump directly to that part of the recording!"
                  />
                  <StepCard 
                    number="4" 
                    title="Share with Your Team"
                    description="Use the Share button to send the recap to colleagues who couldn't attend. They'll get the summary, transcript, and recording link."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 3: Copilot in Outlook */}
        <section className="mb-12">
          <Card className="border-2 border-amber-200 shadow-card overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-xl">
                  <Mail className="w-7 h-7 text-amber-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Copilot in Outlook</CardTitle>
                  <CardDescription className="text-base">Master your inbox with AI assistance</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Video Tutorial */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Play className="w-4 h-4 text-amber-500" />
                    Watch: Copilot in Outlook Tutorial
                  </h4>
                  <VideoEmbed videoId={videoTutorials.outlook.videoId} title={videoTutorials.outlook.title} />
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200">
                    <h4 className="font-semibold mb-2">Three Ways Copilot Helps in Outlook</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <PenLine className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Draft Emails</p>
                          <p className="text-xs text-muted-foreground">Generate professional emails from a simple description</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Eye className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Summarise Threads</p>
                          <p className="text-xs text-muted-foreground">Get the key points from long email conversations</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MessageSquare className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Coach Your Tone</p>
                          <p className="text-xs text-muted-foreground">Get feedback on clarity, tone, and sentiment</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tip 1: Draft Emails */}
              <div className="border-t pt-6">
                <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
                  <span className="bg-amber-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                  Drafting Emails with Copilot
                </h4>
                <div className="space-y-3">
                  <StepCard 
                    number="1" 
                    title="Click 'New Email'"
                    description="In Outlook, click 'New Email' or 'New Mail' to start composing a new message."
                  />
                  <StepCard 
                    number="2" 
                    title="Find the Copilot Icon"
                    description="Look for the Copilot icon (✨) in the email composition toolbar. In the new Outlook, it's prominently displayed above your email."
                  />
                  <StepCard 
                    number="3" 
                    title="Select 'Draft with Copilot'"
                    description="Click the Copilot icon and choose 'Draft with Copilot' or simply 'Draft' from the menu."
                  />
                  <StepCard 
                    number="4" 
                    title="Describe What You Need"
                    description="Type a description of the email you want. Be specific about the recipient, purpose, and tone."
                    tip="Example: 'Write a polite follow-up email to Sarah thanking her for yesterday's meeting and confirming our next steps for the project launch.'"
                  />
                  <StepCard 
                    number="5" 
                    title="Review and Refine"
                    description="Copilot generates a draft. You can: Accept it as-is, Regenerate for a different version, Adjust the tone (formal, casual, direct), or Make it longer/shorter."
                  />
                </div>
              </div>

              {/* Tip 2: Summarise Threads */}
              <div className="border-t pt-6">
                <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
                  <span className="bg-amber-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                  Summarising Long Email Threads
                </h4>
                <div className="space-y-3">
                  <StepCard 
                    number="1" 
                    title="Open the Email Thread"
                    description="Click on the email conversation you want to catch up on. This works best with threads that have multiple replies."
                  />
                  <StepCard 
                    number="2" 
                    title="Look for 'Summary by Copilot'"
                    description="At the top of the email thread, you should see a 'Summary by Copilot' option or a Copilot icon. Click it."
                  />
                  <StepCard 
                    number="3" 
                    title="Review the Summary"
                    description="Copilot provides: Key points from the conversation, Decisions that were made, Action items assigned to people, and Important dates or deadlines mentioned."
                    tip="Use the summary to quickly understand the context before responding, especially if you've been CC'd on a long thread!"
                  />
                </div>
              </div>

              {/* Tip 3: Coaching */}
              <div className="border-t pt-6">
                <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
                  <span className="bg-amber-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                  Coaching Your Email Tone
                </h4>
                <div className="space-y-3">
                  <StepCard 
                    number="1" 
                    title="Draft Your Email"
                    description="Write your email as you normally would, or use Copilot to generate a draft first."
                  />
                  <StepCard 
                    number="2" 
                    title="Select Your Text"
                    description="Highlight the email text you want Copilot to review."
                  />
                  <StepCard 
                    number="3" 
                    title="Click 'Coaching by Copilot'"
                    description="Click the Copilot icon and select 'Coaching by Copilot' or look for the coaching option."
                  />
                  <StepCard 
                    number="4" 
                    title="Review Feedback"
                    description="Copilot analyses your email and provides suggestions for: Tone (too formal? too casual?), Clarity (is your message clear?), Sentiment (how might the reader feel?), and Reader impact."
                    tip="This is especially useful for sensitive emails - get a 'second opinion' before you send!"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 4: Copilot vs ChatGPT Security */}
        <section className="mb-12">
          <Card className="border-2 border-green-200 shadow-card overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
                  <Shield className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Copilot vs ChatGPT: Security Matters</CardTitle>
                  <CardDescription className="text-base">Why Copilot in Teams is your secure AI choice</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-green-200">
                      <th className="text-left py-3 px-4 font-semibold">Feature</th>
                      <th className="text-center py-3 px-4 font-semibold text-green-600">
                        <div className="flex items-center justify-center gap-1">
                          <Shield className="w-4 h-4" />
                          Copilot in Teams
                        </div>
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-500">ChatGPT (Free)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">Data stays in G-Ex security boundary</td>
                      <td className="py-3 px-4 text-center"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="py-3 px-4 text-center text-red-500">✗</td>
                    </tr>
                    <tr className="border-b bg-gray-50 dark:bg-gray-800/30">
                      <td className="py-3 px-4">Your prompts NOT used to train AI</td>
                      <td className="py-3 px-4 text-center"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="py-3 px-4 text-center text-red-500">✗</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Covered by Microsoft 365 compliance</td>
                      <td className="py-3 px-4 text-center"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="py-3 px-4 text-center text-red-500">✗</td>
                    </tr>
                    <tr className="border-b bg-gray-50 dark:bg-gray-800/30">
                      <td className="py-3 px-4">Access to your emails, files & chats</td>
                      <td className="py-3 px-4 text-center"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="py-3 px-4 text-center text-red-500">✗</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Audit trail & data retention</td>
                      <td className="py-3 px-4 text-center"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="py-3 px-4 text-center text-red-500">✗</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Key Security Points */}
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Your Data Stays Protected",
                    description: "Copilot operates within Microsoft's secure enterprise environment. Your conversations and data never leave the G-Ex security boundary."
                  },
                  {
                    title: "No Training on Your Data",
                    description: "Microsoft doesn't use your prompts or company data to train AI models. With ChatGPT free tier, your inputs may be used for improvement."
                  },
                  {
                    title: "Compliance & Audit Ready",
                    description: "Copilot is covered by our existing Microsoft 365 compliance policies, including data retention and audit capabilities."
                  },
                  {
                    title: "Access to Company Context",
                    description: "Copilot can safely reference your emails, documents, and chats to provide relevant answers - ChatGPT can't do this securely."
                  }
                ].map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">{point.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* How to Use as ChatGPT Replacement */}
              <div className="border-t pt-6">
                <h4 className="font-semibold mb-4 text-lg">How to Use Copilot as Your ChatGPT Replacement</h4>
                <div className="space-y-3">
                  <StepCard 
                    number="1" 
                    title="Open Copilot in Teams"
                    description="Click the Copilot icon in the top-right corner of Teams (or in the left sidebar in older versions)."
                  />
                  <StepCard 
                    number="2" 
                    title="Chat Like You Would with ChatGPT"
                    description="Ask anything you'd normally ask ChatGPT: brainstorm ideas, explain concepts, draft content, summarise information, or get help with writing."
                    tip="Try: 'Help me prepare talking points for tomorrow's client presentation about our Q3 results.'"
                  />
                  <StepCard 
                    number="3" 
                    title="Use for Sensitive Work with Confidence"
                    description="Unlike ChatGPT, you can discuss internal projects, client names, and business strategies knowing your data is protected within the Microsoft 365 security boundary."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 5: Word and Excel */}
        <section className="mb-12">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Word */}
            <Card className="border-2 border-indigo-200 shadow-card overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                    <FileText className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Copilot in Word</CardTitle>
                    <CardDescription>Create documents faster</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                {/* Video */}
                <VideoEmbed videoId={videoTutorials.word.videoId} title={videoTutorials.word.title} />
                
                {/* Tips */}
                <div className="space-y-4 mt-4">
                  <CollapsibleSection title="Draft Documents from Scratch" icon={PenLine} defaultOpen={true}>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-start gap-2"><span className="font-bold text-indigo-500">1.</span> Open a new Word document</p>
                      <p className="flex items-start gap-2"><span className="font-bold text-indigo-500">2.</span> Click the <span className="bg-indigo-100 px-1.5 rounded font-mono text-xs">Copilot</span> icon in the Home ribbon</p>
                      <p className="flex items-start gap-2"><span className="font-bold text-indigo-500">3.</span> Describe what you need: <em>"Create a project proposal for a new inventory system"</em></p>
                      <p className="flex items-start gap-2"><span className="font-bold text-indigo-500">4.</span> Review and personalise the generated draft</p>
                      <div className="mt-2 p-2 bg-indigo-50 rounded text-xs">
                        <strong>💡 Tip:</strong> You can reference existing files: "Create a summary based on the Q3 report in my OneDrive"
                      </div>
                    </div>
                  </CollapsibleSection>

                  <CollapsibleSection title="Rewrite & Improve Text" icon={Settings} defaultOpen={false}>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-start gap-2"><span className="font-bold text-indigo-500">1.</span> Select the text you want to improve</p>
                      <p className="flex items-start gap-2"><span className="font-bold text-indigo-500">2.</span> Click the Copilot icon that appears</p>
                      <p className="flex items-start gap-2"><span className="font-bold text-indigo-500">3.</span> Choose 'Rewrite' and select your preferred tone</p>
                      <p className="flex items-start gap-2"><span className="font-bold text-indigo-500">4.</span> Pick from: Professional, Casual, Concise, or Imaginative</p>
                    </div>
                  </CollapsibleSection>

                  <CollapsibleSection title="Summarise Long Documents" icon={ListChecks} defaultOpen={false}>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-start gap-2"><span className="font-bold text-indigo-500">1.</span> Open a lengthy document</p>
                      <p className="flex items-start gap-2"><span className="font-bold text-indigo-500">2.</span> Click Copilot and ask: <em>"Summarise this document in 5 key points"</em></p>
                      <p className="flex items-start gap-2"><span className="font-bold text-indigo-500">3.</span> Follow up: <em>"What are the main recommendations?"</em></p>
                      <div className="mt-2 p-2 bg-indigo-50 rounded text-xs">
                        <strong>💡 Tip:</strong> Copilot can summarise documents up to 80,000 words!
                      </div>
                    </div>
                  </CollapsibleSection>
                </div>
              </CardContent>
            </Card>

            {/* Excel */}
            <Card className="border-2 border-teal-200 shadow-card overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-100 dark:bg-teal-900 rounded-lg">
                    <Table className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Copilot in Excel</CardTitle>
                    <CardDescription>Data analysis made easy</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                {/* Video */}
                <VideoEmbed videoId={videoTutorials.excel.videoId} title={videoTutorials.excel.title} />
                
                {/* Tips */}
                <div className="space-y-4 mt-4">
                  <CollapsibleSection title="Analyse Data with Natural Language" icon={Monitor} defaultOpen={true}>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-start gap-2"><span className="font-bold text-teal-500">1.</span> Select your data table in Excel</p>
                      <p className="flex items-start gap-2"><span className="font-bold text-teal-500">2.</span> Click <span className="bg-teal-100 px-1.5 rounded font-mono text-xs">Copilot</span> in the Home ribbon</p>
                      <p className="flex items-start gap-2"><span className="font-bold text-teal-500">3.</span> Ask: <em>"What are the top 5 products by revenue?"</em></p>
                      <p className="flex items-start gap-2"><span className="font-bold text-teal-500">4.</span> Copilot creates charts, insights, and highlights automatically</p>
                    </div>
                  </CollapsibleSection>

                  <CollapsibleSection title="Get Help with Formulas" icon={Calculator} defaultOpen={false}>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-start gap-2"><span className="font-bold text-teal-500">1.</span> Click in the cell where you need a formula</p>
                      <p className="flex items-start gap-2"><span className="font-bold text-teal-500">2.</span> Ask Copilot: <em>"Calculate the percentage change between columns B and C"</em></p>
                      <p className="flex items-start gap-2"><span className="font-bold text-teal-500">3.</span> Copilot suggests the formula (e.g., <code className="bg-gray-100 px-1 rounded">=(C2-B2)/B2</code>)</p>
                      <p className="flex items-start gap-2"><span className="font-bold text-teal-500">4.</span> Click to insert and drag to apply to other rows</p>
                      <div className="mt-2 p-2 bg-teal-50 rounded text-xs">
                        <strong>💡 Tip:</strong> Ask "Explain this formula" to understand how any complex formula works!
                      </div>
                    </div>
                  </CollapsibleSection>

                  <CollapsibleSection title="Create Instant Visualisations" icon={Monitor} defaultOpen={false}>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-start gap-2"><span className="font-bold text-teal-500">1.</span> Select your data range</p>
                      <p className="flex items-start gap-2"><span className="font-bold text-teal-500">2.</span> Ask: <em>"Create a chart showing monthly sales comparison"</em></p>
                      <p className="flex items-start gap-2"><span className="font-bold text-teal-500">3.</span> Choose from suggested chart types (bar, line, pie)</p>
                      <p className="flex items-start gap-2"><span className="font-bold text-teal-500">4.</span> Refine: <em>"Add data labels and change colours"</em></p>
                    </div>
                  </CollapsibleSection>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 6: Next Steps */}
        <section className="mb-12">
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
        <div className="text-center mb-8">
          <Button variant="ghost" onClick={() => navigate('/training')}>
            ← Back to Training Hub
          </Button>
        </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Module Tutorial */}
      <ModuleTutorial 
        moduleId={0}
        moduleName="Intro & Quick Wins"
      />
      
      {/* Module AI Expert */}
      <ModuleAIExpert 
        moduleId={0}
        moduleName="Intro & Quick Wins"
        moduleContext={moduleContext}
      />
    </div>
  );
}
