import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();
  
  const scrollToHelper = () => {
    document.getElementById('ai-helper')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/30">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="w-4 h-4" />
            <span>Welcome to the Dynamics G-Ex AI Hub</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
            Making Life Easier
            <br />
            <span className="gradient-text">with AI</span>
          </h1>
          
          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            Empowering every team member across Sales, Marketing, Operations, and Leadership to learn and apply AI tools – preferably Microsoft Copilot – to solve real challenges.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-450">
            <Button
              size="lg"
              className="gradient-primary text-white shadow-elegant hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              onClick={scrollToHelper}
            >
              Get AI Suggestions
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 hover:border-primary hover:text-primary transition-colors"
              onClick={() => navigate('/tutorials')}
            >
              Explore Tutorials
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-600">
            {[
              { label: "ONE TEAM", icon: "🤝" },
              { label: "GLOBAL EDGE", icon: "🌏" },
              { label: "STOCKSMART", icon: "📦" },
              { label: "Innovation", icon: "💡" },
            ].map((pillar, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-3xl">{pillar.icon}</div>
                <p className="text-sm font-semibold text-foreground">{pillar.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
