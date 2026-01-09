import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Zap, MessageSquare, Mail, FileText, Video, Shield, CheckCircle,
  ArrowRight, Sparkles, Monitor, Table, BookOpen, Users, ChevronRight,
  Play, Settings, Mic, PenLine, ListChecks, Calculator,
  MousePointer, Eye, AlertCircle, Lightbulb, ChevronDown, ChevronUp, Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CollapsibleSection } from "@/components/training/CollapsibleSection";
import { ModuleAIExpert } from "@/components/training/ModuleAIExpert";
import { ModuleTutorial } from "@/components/training/ModuleTutorial";

// Accordion Section Component - Only one section open at a time
const AccordionSection = ({ 
  title, 
  subtitle, 
  icon: Icon,
  iconImage, // Custom image URL for icon
  iconBg, 
  iconColor, 
  borderColor, 
  gradientFrom, 
  gradientTo,
  children, 
  isOpen,
  onToggle,
  sectionNumber
}) => {
  return (
    <Card className={`border-2 ${borderColor} shadow-card overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-lg' : ''}`}>
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger className="w-full">
          <div className={`flex items-center justify-between p-5 bg-gradient-to-r ${gradientFrom} ${gradientTo} cursor-pointer hover:opacity-95 transition-opacity`}>
            <div className="flex items-center gap-4">
              {sectionNumber && (
                <div className="w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center text-sm font-bold text-gray-700 dark:text-gray-300 shadow-sm">
                  {sectionNumber}
                </div>
              )}
              {iconImage ? (
                <div className={`p-2 ${iconBg} rounded-xl shadow-sm`}>
                  <img src={iconImage} alt={title} className="w-8 h-8 object-contain" />
                </div>
              ) : (
                <div className={`p-3 ${iconBg} rounded-xl shadow-sm`}>
                  <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
              )}
              <div className="text-left">
                <h3 className="text-xl font-bold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              </div>
            </div>
            <div className={`p-2 rounded-full ${isOpen ? 'bg-white/50' : 'bg-white/30'} transition-colors`}>
              {isOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-6 pb-8">
            {children}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default function ModuleIntro() {
  const navigate = useNavigate();
  
  // State for accordion - only one section open at a time
  const [openSection, setOpenSection] = useState(1); // Start with section 1 open
  
  // Toggle section - close others when opening one
  const handleToggle = (sectionNum) => {
    setOpenSection(openSection === sectionNum ? null : sectionNum);
  };

  // Custom icon images
  const sectionIcons = {
    teams: "https://customer-assets.emergentagent.com/job_ai-champions/artifacts/15jkgz2f_teams.png",
    outlook: "https://customer-assets.emergentagent.com/job_ai-champions/artifacts/buo5sey1_outlook.png",
    chatgpt: "https://customer-assets.emergentagent.com/job_ai-champions/artifacts/9bvlgjg3_ChatGPT.png",
    wordexcel: "https://customer-assets.emergentagent.com/job_ai-champions/artifacts/rn5r8sye_wordexcel.png"
  };

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
    teams: { videoId: "Z7DwJtTkNSE", title: "Copilot in Teams Tutorial" },
    outlook: { videoId: "Q2WsFayNjwo", title: "Copilot in Outlook Tutorial" },
    word: { videoId: "7VlpfA_A7Tg", title: "Copilot in Word Tutorial" },
    excel: { videoId: "Aucr_qrwEwE", title: "Copilot in Excel Tutorial" }
  };

  const VideoEmbed = ({ videoId, title }) => (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900 group cursor-pointer"
         onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')}>
      <img 
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
        onError={(e) => { e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; }}
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 bg-gradient-to-b from-background to-secondary/20">
        {/* Module Banner */}
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
        <section className="py-10 bg-gradient-to-br from-background via-background to-secondary/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground">
              Intro & <span className="text-orange-500">Quick Wins</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hit the ground running. Some stuff you can do without being AI-savvy.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Badge variant="outline" className="text-sm px-3 py-1 bg-orange-50 border-orange-200">
                <Zap className="w-3 h-3 mr-1 text-orange-500" /> No Quiz Required
              </Badge>
              <Badge variant="outline" className="text-sm px-3 py-1 bg-green-50 border-green-200">
                <CheckCircle className="w-3 h-3 mr-1 text-green-500" /> 10 Min Read
              </Badge>
              <Badge variant="outline" className="text-sm px-3 py-1 bg-blue-50 border-blue-200">
                <Sparkles className="w-3 h-3 mr-1 text-blue-500" /> Click sections to expand
              </Badge>
            </div>
          </div>
        </section>

        {/* Introduction & Disclaimer Section */}
        <section className="py-6">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50/50 to-amber-50/50 dark:from-orange-950/20 dark:to-amber-950/20 shadow-sm">
              <CardContent className="pt-6 pb-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg flex-shrink-0">
                      <Zap className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-foreground">About This Module</h3>
                      <p className="text-muted-foreground">
                        A <strong>quick-start guide</strong> with practical steps to begin using Copilot across <strong>Teams, Outlook, Word, and Excel</strong> — plus key security considerations when choosing between Copilot and ChatGPT.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 pt-2 border-t border-orange-200/50">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg flex-shrink-0">
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-foreground">Please Note</h4>
                      <p className="text-sm text-muted-foreground">
                        These quick tips <strong>do not replace formal training</strong>. The following modules provide comprehensive, essential guidance for effective AI use at Dynamics G-Ex.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Accordion Sections */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">

          {/* Section 1: Copilot in Teams */}
          <AccordionSection
            sectionNumber="1"
            title="How to Use Copilot in Teams"
            subtitle="Your AI assistant, right where you work"
            iconImage={sectionIcons.teams}
            iconBg="bg-purple-100 dark:bg-purple-900"
            iconColor="text-purple-600"
            borderColor="border-purple-200"
            gradientFrom="from-purple-50"
            gradientTo="to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30"
            isOpen={openSection === 1}
            onToggle={() => handleToggle(1)}
          >
            <div className="space-y-6">
              {/* Video + Info */}
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
                        <span><strong>New Teams:</strong> Look for the <span className="bg-purple-100 px-1.5 py-0.5 rounded text-purple-700 font-mono text-xs">✨ Copilot</span> icon in the <strong>top-right corner</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 font-bold">→</span>
                        <span><strong>In Meetings:</strong> Find Copilot in the <strong>meeting toolbar</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 font-bold">→</span>
                        <span><strong>In Chats:</strong> Click Copilot to get summaries or ask questions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Steps */}
              <div>
                <h4 className="font-semibold mb-4 text-lg">Step-by-Step: Access Copilot in Teams</h4>
                <div className="space-y-3">
                  <StepCard number="1" title="Open Microsoft Teams" description="Launch the Teams desktop app or open Teams in your web browser with your G-Ex account." tip="Use the desktop app for the best experience." />
                  <StepCard number="2" title="Locate the Copilot Icon" description="Look for the sparkle icon (✨) in the top-right corner of your Teams window." tip="Can't see it? Your admin may need to enable Copilot for your account." />
                  <StepCard number="3" title="Open the Copilot Panel" description="Click the Copilot icon to open a side panel where you can type questions or requests." />
                  <StepCard number="4" title="Start Chatting" description="Type your request in natural language. Try: 'Summarise my unread messages' or 'Help me draft a message to my team.'" tip="Be specific! Instead of 'Help me write an email', try 'Help me write a professional email to John about rescheduling our Friday meeting.'" />
                </div>
              </div>

              {/* Using in Meetings */}
              <CollapsibleSection title="Using Copilot During Meetings" icon={Video} defaultOpen={false}>
                <div className="space-y-3">
                  <StepCard number="1" title="Join Your Meeting" description="Join or start a Teams meeting as usual." />
                  <StepCard number="2" title="Enable Transcription" description="Click '...' → 'Record and transcribe' → 'Start transcription'. All participants will be notified." warning="Without transcription, Copilot can't 'hear' the meeting." />
                  <StepCard number="3" title="Open Copilot" description="Click the Copilot icon in the meeting toolbar." />
                  <StepCard number="4" title="Ask Questions" description="Try: 'What have I missed?' • 'Summarise the discussion' • 'What action items were mentioned?'" />
                </div>
              </CollapsibleSection>
            </div>
          </AccordionSection>

          {/* Section 2: Meeting Recording */}
          <AccordionSection
            sectionNumber="2"
            title="Meeting Recording & AI Recap"
            subtitle="Never miss important details from your meetings"
            iconImage={sectionIcons.teams}
            iconBg="bg-blue-100 dark:bg-blue-900"
            iconColor="text-blue-600"
            borderColor="border-blue-200"
            gradientFrom="from-blue-50"
            gradientTo="to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30"
            isOpen={openSection === 2}
            onToggle={() => handleToggle(2)}
          >
            <div className="space-y-6">
              {/* Feature Cards */}
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

              {/* Recording Steps */}
              <CollapsibleSection title="How to Record & Transcribe Meetings" icon={Mic} defaultOpen={true}>
                <div className="space-y-3">
                  <StepCard number="1" title="Start or Join Your Meeting" description="Open your scheduled meeting or start an instant meeting in Teams." />
                  <StepCard number="2" title="Click 'More Actions' (⋯)" description="In the meeting toolbar, find and click the three dots '...' menu." />
                  <StepCard number="3" title="Select 'Record and Transcribe'" description="Hover over 'Record and transcribe', then click 'Start recording'." tip="You can also start transcription without recording if you just want the text." />
                  <StepCard number="4" title="Confirm Recording Started" description="A red indicator appears and all participants are notified." warning="Always inform participants that the meeting is being recorded." />
                </div>
              </CollapsibleSection>

              {/* Recap Steps */}
              <CollapsibleSection title="Using the Intelligent Meeting Recap" icon={ListChecks} defaultOpen={false}>
                <div className="space-y-3">
                  <StepCard number="1" title="Wait for Processing" description="After the meeting, Teams needs a few minutes to process and generate the AI recap." />
                  <StepCard number="2" title="Open the Meeting Recap" description="Go to Teams Calendar, find the meeting, and select the 'Recap' tab." />
                  <StepCard number="3" title="Review AI Content" description="See: Summary of key topics, Chapters with timestamps, Action items, and Speaker notes." tip="Click on any chapter to jump directly to that part of the recording!" />
                  <StepCard number="4" title="Share with Your Team" description="Use the Share button to send the recap to colleagues who couldn't attend." />
                </div>
              </CollapsibleSection>
            </div>
          </AccordionSection>

          {/* Section 3: Copilot in Outlook */}
          <AccordionSection
            sectionNumber="3"
            title="Copilot in Outlook"
            subtitle="Master your inbox with AI assistance"
            iconImage={sectionIcons.outlook}
            iconBg="bg-amber-100 dark:bg-amber-900"
            iconColor="text-amber-600"
            borderColor="border-amber-200"
            gradientFrom="from-amber-50"
            gradientTo="to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30"
            isOpen={openSection === 3}
            onToggle={() => handleToggle(3)}
          >
            <div className="space-y-6">
              {/* Video + Summary */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Play className="w-4 h-4 text-amber-500" />
                    Watch: Copilot in Outlook Tutorial
                  </h4>
                  <VideoEmbed videoId={videoTutorials.outlook.videoId} title={videoTutorials.outlook.title} />
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200">
                  <h4 className="font-semibold mb-3">Three Ways Copilot Helps</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <PenLine className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      <div><p className="font-medium text-sm">Draft Emails</p><p className="text-xs text-muted-foreground">Generate professional emails from a description</p></div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Eye className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      <div><p className="font-medium text-sm">Summarise Threads</p><p className="text-xs text-muted-foreground">Key points from long conversations</p></div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      <div><p className="font-medium text-sm">Coach Your Tone</p><p className="text-xs text-muted-foreground">Feedback on clarity and sentiment</p></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Three Tips */}
              <CollapsibleSection title="① Drafting Emails with Copilot" icon={PenLine} defaultOpen={true}>
                <div className="space-y-3">
                  <StepCard number="1" title="Click 'New Email'" description="Start composing a new message in Outlook." />
                  <StepCard number="2" title="Find the Copilot Icon" description="Look for the sparkle icon (✨) in the email toolbar." />
                  <StepCard number="3" title="Select 'Draft with Copilot'" description="Click Copilot and choose 'Draft with Copilot'." />
                  <StepCard number="4" title="Describe What You Need" description="Be specific about recipient, purpose, and tone." tip="Example: 'Write a polite follow-up email to Sarah thanking her for yesterday's meeting and confirming our next steps.'" />
                  <StepCard number="5" title="Review and Refine" description="Accept, regenerate, adjust tone, or make it longer/shorter." />
                </div>
              </CollapsibleSection>

              <CollapsibleSection title="② Summarising Long Email Threads" icon={Eye} defaultOpen={false}>
                <div className="space-y-3">
                  <StepCard number="1" title="Open the Email Thread" description="Click on the conversation you want to catch up on." />
                  <StepCard number="2" title="Look for 'Summary by Copilot'" description="At the top of the thread, click the Copilot summary option." />
                  <StepCard number="3" title="Review the Summary" description="See key points, decisions made, action items, and important dates." tip="Use this to quickly understand context before responding!" />
                </div>
              </CollapsibleSection>

              <CollapsibleSection title="③ Coaching Your Email Tone" icon={MessageSquare} defaultOpen={false}>
                <div className="space-y-3">
                  <StepCard number="1" title="Draft Your Email" description="Write your email or use Copilot to generate a draft." />
                  <StepCard number="2" title="Select Your Text" description="Highlight the email text you want reviewed." />
                  <StepCard number="3" title="Click 'Coaching by Copilot'" description="Select the coaching option from Copilot." />
                  <StepCard number="4" title="Review Feedback" description="Get suggestions for tone, clarity, sentiment, and reader impact." tip="Great for sensitive emails - get a 'second opinion' before sending!" />
                </div>
              </CollapsibleSection>
            </div>
          </AccordionSection>

          {/* Section 4: Security */}
          <AccordionSection
            sectionNumber="4"
            title="Copilot vs ChatGPT: Security Matters"
            subtitle="Why Copilot in Teams is your secure AI choice"
            iconImage={sectionIcons.chatgpt}
            iconBg="bg-green-100 dark:bg-green-900"
            iconColor="text-green-600"
            borderColor="border-green-200"
            gradientFrom="from-green-50"
            gradientTo="to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30"
            isOpen={openSection === 4}
            onToggle={() => handleToggle(4)}
          >
            <div className="space-y-6">
              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-green-200">
                      <th className="text-left py-3 px-4 font-semibold">Feature</th>
                      <th className="text-center py-3 px-4 font-semibold text-green-600"><Shield className="w-4 h-4 inline mr-1" />Copilot</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-500">ChatGPT Free</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      "Data stays in G-Ex security boundary",
                      "Your prompts NOT used to train AI",
                      "Covered by Microsoft 365 compliance",
                      "Access to your emails, files & chats",
                      "Audit trail & data retention"
                    ].map((feature, idx) => (
                      <tr key={idx} className={`border-b ${idx % 2 === 1 ? 'bg-gray-50 dark:bg-gray-800/30' : ''}`}>
                        <td className="py-3 px-4">{feature}</td>
                        <td className="py-3 px-4 text-center"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="py-3 px-4 text-center text-red-500">✗</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Security Points */}
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: "Your Data Stays Protected", desc: "Conversations never leave the G-Ex security boundary." },
                  { title: "No Training on Your Data", desc: "Microsoft doesn't use your prompts to train AI models." },
                  { title: "Compliance & Audit Ready", desc: "Covered by Microsoft 365 compliance policies." },
                  { title: "Access to Company Context", desc: "Safely reference emails, documents, and chats." }
                ].map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div><h4 className="font-semibold text-sm">{point.title}</h4><p className="text-sm text-muted-foreground mt-1">{point.desc}</p></div>
                  </div>
                ))}
              </div>

              {/* How to Use */}
              <CollapsibleSection title="Use Copilot as Your ChatGPT Replacement" icon={Sparkles} defaultOpen={true}>
                <div className="space-y-3">
                  <StepCard number="1" title="Open Copilot in Teams" description="Click the Copilot icon in the top-right corner of Teams." />
                  <StepCard number="2" title="Chat Like ChatGPT" description="Ask anything: brainstorm ideas, explain concepts, draft content." tip="Try: 'Help me prepare talking points for tomorrow's client presentation.'" />
                  <StepCard number="3" title="Use for Sensitive Work" description="Discuss internal projects and business strategies knowing your data is protected." />
                </div>
              </CollapsibleSection>
            </div>
          </AccordionSection>

          {/* Section 5: Word & Excel */}
          <AccordionSection
            sectionNumber="5"
            title="Copilot in Word & Excel"
            subtitle="Create documents and analyse data faster"
            iconImage={sectionIcons.wordexcel}
            iconBg="bg-indigo-100 dark:bg-indigo-900"
            iconColor="text-indigo-600"
            borderColor="border-indigo-200"
            gradientFrom="from-indigo-50"
            gradientTo="to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30"
            isOpen={openSection === 5}
            onToggle={() => handleToggle(5)}
          >
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Word */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-6 h-6 text-indigo-600" />
                  <h4 className="text-lg font-semibold">Copilot in Word</h4>
                </div>
                <VideoEmbed videoId={videoTutorials.word.videoId} title={videoTutorials.word.title} />
                <CollapsibleSection title="Draft Documents from Scratch" icon={PenLine} defaultOpen={true}>
                  <div className="space-y-2 text-sm">
                    <p><strong className="text-indigo-500">1.</strong> Open a new Word document</p>
                    <p><strong className="text-indigo-500">2.</strong> Click <span className="bg-indigo-100 px-1.5 rounded font-mono text-xs">Copilot</span> in the Home ribbon</p>
                    <p><strong className="text-indigo-500">3.</strong> Describe what you need: <em>"Create a project proposal"</em></p>
                    <p><strong className="text-indigo-500">4.</strong> Review and personalise the generated draft</p>
                  </div>
                </CollapsibleSection>
                <CollapsibleSection title="Rewrite & Improve Text" icon={Settings} defaultOpen={false}>
                  <div className="space-y-2 text-sm">
                    <p><strong className="text-indigo-500">1.</strong> Select text to improve</p>
                    <p><strong className="text-indigo-500">2.</strong> Click the Copilot icon that appears</p>
                    <p><strong className="text-indigo-500">3.</strong> Choose 'Rewrite' and select tone</p>
                    <p><strong className="text-indigo-500">4.</strong> Pick: Professional, Casual, Concise, or Imaginative</p>
                  </div>
                </CollapsibleSection>
                <CollapsibleSection title="Summarise Long Documents" icon={ListChecks} defaultOpen={false}>
                  <div className="space-y-2 text-sm">
                    <p><strong className="text-indigo-500">1.</strong> Open a lengthy document</p>
                    <p><strong className="text-indigo-500">2.</strong> Ask: <em>"Summarise this in 5 key points"</em></p>
                    <p><strong className="text-indigo-500">3.</strong> Follow up: <em>"What are the main recommendations?"</em></p>
                    <div className="mt-2 p-2 bg-indigo-50 rounded text-xs"><strong>💡</strong> Copilot can summarise up to 80,000 words!</div>
                  </div>
                </CollapsibleSection>
              </div>

              {/* Excel */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Table className="w-6 h-6 text-teal-600" />
                  <h4 className="text-lg font-semibold">Copilot in Excel</h4>
                </div>
                <VideoEmbed videoId={videoTutorials.excel.videoId} title={videoTutorials.excel.title} />
                <CollapsibleSection title="Analyse Data with Natural Language" icon={Monitor} defaultOpen={true}>
                  <div className="space-y-2 text-sm">
                    <p><strong className="text-teal-500">1.</strong> Select your data table in Excel</p>
                    <p><strong className="text-teal-500">2.</strong> Click <span className="bg-teal-100 px-1.5 rounded font-mono text-xs">Copilot</span> in the Home ribbon</p>
                    <p><strong className="text-teal-500">3.</strong> Ask: <em>"What are the top 5 products by revenue?"</em></p>
                    <p><strong className="text-teal-500">4.</strong> Copilot creates charts and insights automatically</p>
                  </div>
                </CollapsibleSection>
                <CollapsibleSection title="Get Help with Formulas" icon={Calculator} defaultOpen={false}>
                  <div className="space-y-2 text-sm">
                    <p><strong className="text-teal-500">1.</strong> Click in the cell where you need a formula</p>
                    <p><strong className="text-teal-500">2.</strong> Ask: <em>"Calculate percentage change between B and C"</em></p>
                    <p><strong className="text-teal-500">3.</strong> Copilot suggests the formula (e.g., <code className="bg-gray-100 px-1 rounded">=(C2-B2)/B2</code>)</p>
                    <p><strong className="text-teal-500">4.</strong> Click to insert, drag to apply to other rows</p>
                    <div className="mt-2 p-2 bg-teal-50 rounded text-xs"><strong>💡</strong> Ask "Explain this formula" to understand complex formulas!</div>
                  </div>
                </CollapsibleSection>
                <CollapsibleSection title="Create Instant Visualisations" icon={Monitor} defaultOpen={false}>
                  <div className="space-y-2 text-sm">
                    <p><strong className="text-teal-500">1.</strong> Select your data range</p>
                    <p><strong className="text-teal-500">2.</strong> Ask: <em>"Create a chart showing monthly sales"</em></p>
                    <p><strong className="text-teal-500">3.</strong> Choose from bar, line, or pie charts</p>
                    <p><strong className="text-teal-500">4.</strong> Refine: <em>"Add data labels and change colours"</em></p>
                  </div>
                </CollapsibleSection>
              </div>
            </div>
          </AccordionSection>

          {/* Next Steps */}
          <Card className="border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <ArrowRight className="w-6 h-6 text-orange-600" />
                <h3 className="text-xl font-bold">Ready for More?</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Button variant="default" className="h-auto p-4 flex items-center justify-between bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white" onClick={() => navigate('/training/module-1')}>
                  <div className="flex items-center gap-3"><BookOpen className="w-5 h-5" /><div className="text-left"><p className="font-semibold">Start Training Module 1</p><p className="text-xs opacity-90">AI Fundamentals & Strategy</p></div></div>
                  <ChevronRight className="w-5 h-5" />
                </Button>
                <Button variant="outline" className="h-auto p-4 flex items-center justify-between border-2 border-orange-300 hover:bg-orange-100" onClick={() => navigate('/training/module-4')}>
                  <div className="flex items-center gap-3"><Users className="w-5 h-5 text-orange-600" /><div className="text-left"><p className="font-semibold">Share Success Stories</p><p className="text-xs text-muted-foreground">Inspire others with your wins</p></div></div>
                  <ChevronRight className="w-5 h-5 text-orange-600" />
                </Button>
              </div>
              <div className="mt-6 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg border border-orange-200 text-center">
                <Sparkles className="w-4 h-4 inline mr-1 text-orange-500" />
                <strong>Pro Tip:</strong> Try one Copilot feature today. The best way to learn AI is by doing!
              </div>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="text-center pt-4">
            <Button variant="ghost" onClick={() => navigate('/training')}>← Back to Training Hub</Button>
          </div>
        </div>
      </main>
      
      <Footer />
      <ModuleTutorial moduleId={0} moduleName="Intro & Quick Wins" />
      <ModuleAIExpert moduleId={0} moduleName="Intro & Quick Wins" moduleContext={moduleContext} />
    </div>
  );
}
