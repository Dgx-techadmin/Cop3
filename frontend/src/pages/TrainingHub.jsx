import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, Shield, Briefcase, Rocket, 
  Users, CheckCircle, ArrowRight, Trophy 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8001';

export default function TrainingHub() {
  const navigate = useNavigate();
  const [moduleStats, setModuleStats] = useState({});

  useEffect(() => {
    fetchModuleStats();
  }, []);

  const fetchModuleStats = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/module-stats`);
      setModuleStats(response.data);
    } catch (error) {
      console.error('Error fetching module stats:', error);
    }
  };

  const modules = [
    {
      id: 1,
      title: "Intro to AI & Dynamics G-Ex Strategy",
      description: "Foundation module covering what AI is, how it aligns with our strategic pillars, and practical applications.",
      icon: BookOpen,
      color: "bg-blue-100",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
      objectives: [
        "Understand what AI is (and isn't)",
        "Learn how AI supports ONE TEAM, GLOBAL EDGE, STOCKSMART, Innovation Focus",
        "Explore department-specific use cases",
        "Get started with Microsoft Copilot"
      ],
      duration: "25 min",
      status: "available"
    },
    {
      id: 2,
      title: "Governance & Responsible AI Use",
      description: "Learn the dos and don'ts of AI usage, data protection requirements, and how to use AI responsibly.",
      icon: Shield,
      color: "bg-green-100",
      iconColor: "text-green-600",
      borderColor: "border-green-200",
      objectives: [
        "Master the DOs and DON'Ts from our AI policy",
        "Understand confidentiality and data protection",
        "Learn verification and fact-checking requirements",
        "Apply responsible AI in your department"
      ],
      duration: "20 min",
      status: "available"
    },
    {
      id: 3,
      title: "Practical AI Applications",
      description: "Hands-on training with real-world scenarios, advanced prompting techniques, and workflow integration.",
      icon: Briefcase,
      color: "bg-purple-100",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
      objectives: [
        "Master advanced prompting techniques",
        "Integrate AI into daily workflows",
        "Solve real-world business challenges",
        "Build custom AI solutions"
      ],
      duration: "30 min",
      status: "available"
    },
    {
      id: 4,
      title: "Advanced Tips for AI Champions",
      description: "Become an AI trailblazer - master troubleshooting, drive adoption, and earn your AI Champion certificate.",
      icon: Trophy,
      color: "bg-amber-100",
      iconColor: "text-amber-600",
      borderColor: "border-amber-200",
      objectives: [
        "Troubleshoot common AI issues",
        "Drive adoption through storytelling",
        "Master advanced Copilot features",
        "Earn your AI Champion certificate"
      ],
      duration: "35 min",
      status: "available"
    }
  ];

  const getModuleStats = (moduleId) => {
    const stats = moduleStats[moduleId] || { completions: 0, avgScore: 0 };
    return stats;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 bg-gradient-to-b from-background to-secondary/20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <Badge className="text-sm px-4 py-2 bg-accent text-white">
                <Rocket className="w-4 h-4 mr-2" />
                AI Training Hub
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground">
                Master AI at <span className="text-primary">Dynamics G-Ex</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Complete our comprehensive AI training program and become an AI-powered professional. 
                Each module builds on the last, taking you from basics to certification.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <div className="flex items-center space-x-2 px-4 py-2 bg-background rounded-lg shadow-sm">
                  <Users className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <div className="text-2xl font-bold text-foreground">
                      {Object.values(moduleStats).reduce((sum, stat) => sum + (stat.completions || 0), 0)}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Completions</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-background rounded-lg shadow-sm">
                  <Trophy className="w-5 h-5 text-accent" />
                  <div className="text-left">
                    <div className="text-2xl font-bold text-foreground">
                      {Object.values(moduleStats).length > 0 
                        ? Math.round(Object.values(moduleStats).reduce((sum, stat) => sum + (stat.avgScore || 0), 0) / Object.values(moduleStats).length)
                        : 0}%
                    </div>
                    <div className="text-xs text-muted-foreground">Avg Quiz Score</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modules Grid */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {modules.map((module) => {
                const stats = getModuleStats(module.id);
                const Icon = module.icon;
                const isAvailable = module.status === "available";

                return (
                  <Card 
                    key={module.id}
                    className={`shadow-card hover:shadow-lg transition-all duration-300 border-2 ${
                      isAvailable ? 'hover:border-primary/30 cursor-pointer' : 'opacity-75'
                    } ${module.borderColor}`}
                    onClick={() => isAvailable && navigate(`/training/module-${module.id}`)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className={`p-3 rounded-lg ${module.color}`}>
                          <Icon className={`w-6 h-6 ${module.iconColor}`} />
                        </div>
                        <Badge variant={isAvailable ? "default" : "secondary"} className="text-xs">
                          {isAvailable ? "Available" : "Coming Soon"}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl mt-4 flex items-center space-x-2">
                        <span>Module {module.id}</span>
                        <span className="text-muted-foreground text-sm font-normal">• {module.duration}</span>
                      </CardTitle>
                      <CardTitle className="text-lg font-semibold">{module.title}</CardTitle>
                      <CardDescription className="text-sm mt-2">{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Learning Objectives */}
                      <div>
                        <h4 className="text-sm font-semibold mb-3 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                          Learning Objectives
                        </h4>
                        <ul className="space-y-2">
                          {module.objectives.map((objective, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start">
                              <span className="text-primary mr-2">•</span>
                              <span>{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Stats */}
                      {isAvailable && (
                        <div className="space-y-3 pt-4 border-t">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Completions</span>
                            <span className="font-semibold text-foreground">{stats.completions || 0} people</span>
                          </div>
                          <div>
                            <div className="flex justify-between items-center text-sm mb-2">
                              <span className="text-muted-foreground">Average Quiz Score</span>
                              <span className="font-semibold text-foreground">{stats.avgScore || 0}%</span>
                            </div>
                            <Progress value={stats.avgScore || 0} className="h-2" />
                          </div>
                        </div>
                      )}

                      {/* CTA Button */}
                      <Button 
                        className="w-full mt-4"
                        disabled={!isAvailable}
                        onClick={(e) => {
                          e.stopPropagation();
                          isAvailable && navigate(`/training/module-${module.id}`);
                        }}
                      >
                        {isAvailable ? (
                          <>
                            Start Module <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        ) : (
                          "Coming Soon"
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl font-heading font-bold text-foreground">
              Ready to Start Your AI Journey?
            </h2>
            <p className="text-muted-foreground">
              Begin with Module 1 to build a strong foundation, then progress through each module to become an AI expert.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/training/module-1')}
              className="bg-accent hover:bg-accent/90"
            >
              Start Module 1 <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
