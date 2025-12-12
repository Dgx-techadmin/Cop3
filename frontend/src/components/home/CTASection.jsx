import { Button } from "@/components/ui/button";
import { GraduationCap, Lightbulb, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CTASection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 bg-gradient-to-br from-secondary/30 via-background to-secondary/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl shadow-elegant">
          {/* Gradient Background */}
          <div className="absolute inset-0 gradient-primary opacity-95"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32 blur-2xl"></div>
          
          <div className="relative px-8 py-16 text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
              Ready to Work Smarter?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Explore our tutorials and tips to master Microsoft Copilot and unlock your team's full potential.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                onClick={() => navigate('/tutorials')}
              >
                <GraduationCap className="mr-2 w-5 h-5" />
                View Tutorials
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 transition-colors"
                onClick={() => navigate('/tips')}
              >
                <Lightbulb className="mr-2 w-5 h-5" />
                Browse All Tips
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
