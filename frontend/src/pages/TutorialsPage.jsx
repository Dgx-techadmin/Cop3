import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Play, FileText, Clock } from "lucide-react";

const tutorials = [
  {
    id: 1,
    title: "Copilot in Word - Document Drafting",
    description: "Learn how to draft, edit, and enhance documents with AI assistance. Perfect for reports, SOPs, and proposals.",
    duration: "8 min",
    level: "Beginner",
    videoUrl: "https://support.microsoft.com/en-us/office/welcome-to-copilot-in-word-2135e85f-a467-463b-b2f0-c51a46d625d1",
    topics: ["Document creation", "Content generation", "Editing & refinement", "Formatting tips"]
  },
  {
    id: 2,
    title: "Copilot in Excel - Data Analysis",
    description: "Master data analysis, formula suggestions, and insights generation. Turn spreadsheets into actionable intelligence.",
    duration: "10 min",
    level: "Intermediate",
    videoUrl: "https://support.microsoft.com/en-us/office/get-started-with-copilot-in-excel-d7110502-0334-4b4f-a175-a73abdfc118a",
    topics: ["Formula assistance", "Data insights", "Chart creation", "Trend analysis"]
  },
  {
    id: 3,
    title: "Copilot in Teams - Meeting Summaries",
    description: "Automate meeting notes and action items. Never miss important details from your calls and meetings.",
    duration: "6 min",
    level: "Beginner",
    videoUrl: "https://support.microsoft.com/en-us/office/get-started-with-copilot-in-microsoft-teams-meetings-0bf9dd3c-96f7-44e2-8bb8-790bedf066b1",
    topics: ["Meeting transcription", "Action items", "Key points", "Follow-ups"]
  },
  {
    id: 4,
    title: "Copilot in Outlook - Email Management",
    description: "Compose professional emails faster, manage your inbox efficiently, and never struggle with email etiquette again.",
    duration: "7 min",
    level: "Beginner",
    videoUrl: "https://support.microsoft.com/en-us/office/get-started-with-copilot-in-outlook-46b53b7f-cc21-41ce-871c-b3f8303f5303",
    topics: ["Email drafting", "Tone adjustment", "Summarization", "Quick replies"]
  },
  {
    id: 5,
    title: "Copilot in PowerPoint - Presentation Design",
    description: "Create stunning presentations from scratch or enhance existing decks with AI-powered design and content suggestions.",
    duration: "9 min",
    level: "Intermediate",
    videoUrl: "https://support.microsoft.com/en-us/office/welcome-to-copilot-in-powerpoint-57133c75-24c0-4519-8096-d0dadf25fb8d",
    topics: ["Slide generation", "Design ideas", "Content summarization", "Storytelling"]
  },
  {
    id: 6,
    title: "Advanced Prompting Techniques",
    description: "Master the art of prompt engineering to get better, more accurate results from Copilot across all applications.",
    duration: "12 min",
    level: "Advanced",
    videoUrl: "https://support.microsoft.com/en-us/topic/learn-about-copilot-prompts-f6c3b467-f07c-4db1-ae54-ffac96184dd5",
    topics: ["Prompt structure", "Context setting", "Iteration techniques", "Best practices"]
  }
];

const quickGuides = [
  {
    title: "Getting Started with Copilot",
    description: "A comprehensive guide to enable and configure Microsoft Copilot in your organization.",
    url: "https://support.microsoft.com/en-us/copilot",
    icon: "📘"
  },
  {
    title: "Copilot Prompt Gallery",
    description: "Explore Microsoft's official gallery of pre-built prompts for various scenarios and departments.",
    url: "https://learn.microsoft.com/en-us/copilot/microsoft-365/copilot-prompt-gallery",
    icon: "📚"
  },
  {
    title: "Best Practices & Tips",
    description: "Learn from experts about maximizing productivity with AI assistance.",
    url: "https://www.microsoft.com/en-us/microsoft-365/blog/copilot/",
    icon: "💡"
  },
  {
    title: "Security & Compliance",
    description: "Understand how Copilot handles your data and maintains enterprise security.",
    url: "https://learn.microsoft.com/en-us/copilot/security",
    icon: "🔒"
  }
];

export default function TutorialsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 bg-gradient-to-b from-background to-secondary/20">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-br from-background via-background to-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground">
              Master <span className="gradient-text">Microsoft Copilot</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Step-by-step tutorials and guides to unlock the full potential of AI in your daily workflow.
            </p>
          </div>
        </section>
        
        {/* Video Tutorials */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-heading font-bold text-foreground">Video Tutorials</h2>
              <p className="text-muted-foreground">Quick, practical guides from Microsoft</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials.map((tutorial) => (
                <Card key={tutorial.id} className="shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] border-2 hover:border-primary/20 flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Play className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={tutorial.level === "Beginner" ? "default" : tutorial.level === "Intermediate" ? "secondary" : "outline"}>
                          {tutorial.level}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="font-heading text-lg">{tutorial.title}</CardTitle>
                    <CardDescription className="text-sm">{tutorial.description}</CardDescription>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground pt-2">
                      <Clock className="w-3 h-3" />
                      <span>{tutorial.duration}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-foreground mb-2">What you'll learn:</h4>
                      <ul className="space-y-1.5">
                        {tutorial.topics.map((topic, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button
                      className="w-full mt-6 bg-accent hover:bg-accent-light text-white shadow-elegant hover:shadow-xl transition-all duration-300 group"
                      onClick={() => window.open(tutorial.videoUrl, '_blank')}
                    >
                      Watch Tutorial
                      <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Quick Guides */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-heading font-bold text-foreground">Quick Reference Guides</h2>
              <p className="text-muted-foreground">Essential reading materials and documentation</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {quickGuides.map((guide, idx) => (
                <Card key={idx} className="shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-[1.01] border-2 hover:border-primary/20">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{guide.icon}</div>
                      <div className="flex-1">
                        <CardTitle className="font-heading text-lg">{guide.title}</CardTitle>
                        <CardDescription className="text-sm mt-2">{guide.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="w-full group hover:border-primary hover:text-primary"
                      onClick={() => window.open(guide.url, '_blank')}
                    >
                      <FileText className="mr-2 w-4 h-4" />
                      Read Guide
                      <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Tips Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-elegant border-2 border-primary/20 bg-gradient-to-br from-card to-secondary/20">
              <CardContent className="pt-8">
                <div className="text-center space-y-4">
                  <div className="text-5xl mb-4">🎯</div>
                  <h3 className="text-2xl font-heading font-bold text-foreground">Pro Tips for Learning</h3>
                  <div className="space-y-3 text-left max-w-2xl mx-auto">
                    <div className="flex items-start space-x-3 text-muted-foreground">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                      <p className="text-sm"><strong className="text-foreground">Start small:</strong> Pick one tool that you use daily and master it first.</p>
                    </div>
                    <div className="flex items-start space-x-3 text-muted-foreground">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                      <p className="text-sm"><strong className="text-foreground">Practice regularly:</strong> Use Copilot for at least one task per day to build muscle memory.</p>
                    </div>
                    <div className="flex items-start space-x-3 text-muted-foreground">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                      <p className="text-sm"><strong className="text-foreground">Iterate on prompts:</strong> If the first result isn't perfect, refine your prompt and try again.</p>
                    </div>
                    <div className="flex items-start space-x-3 text-muted-foreground">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                      <p className="text-sm"><strong className="text-foreground">Share & learn:</strong> Discuss wins with your team – ONE TEAM grows together!</p>
                    </div>
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
