import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Megaphone, Settings, Users, Code, HeadphonesIcon, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const departments = [
  {
    id: "sales",
    name: "Sales",
    icon: Briefcase,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    description: "Boost productivity and close deals faster",
    features: [
      "Email drafting and personalization",
      "Call preparation scripts",
      "Signals enrichment and lead scoring",
      "Deal analysis and forecasting"
    ],
    promptExample: "Draft a personalized follow-up email for a prospect interested in our premium tier, highlighting ROI and next steps."
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: Megaphone,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    description: "Create compelling campaigns effortlessly",
    features: [
      "Social media content ideas",
      "Campaign brainstorming",
      "Voice of Customer analysis",
      "Content calendar planning"
    ],
    promptExample: "Generate 5 engaging LinkedIn post ideas about AI adoption in enterprise, with a professional yet conversational tone."
  },
  {
    id: "operations",
    name: "Operations",
    icon: Settings,
    color: "text-green-600",
    bgColor: "bg-green-50",
    description: "Streamline processes and documentation",
    features: [
      "SOP drafting and updates",
      "Meeting summaries",
      "SharePoint migration planning",
      "Process optimization"
    ],
    promptExample: "Create an SOP for onboarding new team members, including checklist items and timeline."
  },
  {
    id: "leadership",
    name: "Leadership",
    icon: Users,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    description: "Make strategic decisions with clarity",
    features: [
      "Executive summaries",
      "AI roadmap visualization",
      "Market trend analysis",
      "Performance report generation"
    ],
    promptExample: "Summarize Q4 performance data into an executive brief with key insights and recommendations."
  },
  {
    id: "it",
    name: "IT",
    icon: Code,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    description: "Enhance governance and integration",
    features: [
      "System integration planning",
      "Security policy drafting",
      "Technical documentation",
      "Troubleshooting guides"
    ],
    promptExample: "Create a troubleshooting guide for common Office 365 authentication issues."
  },
  {
    id: "customer-service",
    name: "Customer Service",
    icon: HeadphonesIcon,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    description: "Deliver exceptional support experiences",
    features: [
      "Response templates",
      "Escalation scripts",
      "FAQ generation",
      "Customer sentiment analysis"
    ],
    promptExample: "Draft a empathetic response to a customer frustrated with delayed delivery, offering solutions."
  }
];

export const QuickWinsSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            Quick Wins with AI – <span className="gradient-text">No PhD Required!</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover department-specific tips and ready-to-use prompts to supercharge your workflow.
          </p>
        </div>
        
        {/* Department Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <Card
                key={dept.id}
                className="shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] border-2 hover:border-primary/20 flex flex-col"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-lg ${dept.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${dept.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {dept.features.length} tips
                    </Badge>
                  </div>
                  <CardTitle className="font-heading text-xl">{dept.name}</CardTitle>
                  <CardDescription>{dept.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-2 mb-6 flex-1">
                    {dept.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="space-y-3 mt-auto">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground mb-1 font-semibold">Sample Prompt:</p>
                      <p className="text-xs text-foreground italic">"{dept.promptExample}"</p>
                    </div>
                    
                    <Button
                      variant="outline"
                      className="w-full group hover:border-primary hover:text-primary"
                      onClick={() => navigate(`/department/${dept.id}`)}
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
