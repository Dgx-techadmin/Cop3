import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  X, BookOpen, MessageSquare, Trophy, Sparkles, ChevronRight 
} from "lucide-react";

export const ModuleTutorial = ({ moduleId, moduleName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const storageKey = `module-${moduleId}-tutorial-shown`;

  useEffect(() => {
    // Check if tutorial has been shown before
    const tutorialShown = localStorage.getItem(storageKey);
    if (!tutorialShown) {
      // Show tutorial after a brief delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [storageKey]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(storageKey, "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <Card className="max-w-2xl w-full shadow-2xl animate-in zoom-in-95 duration-300">
        <CardHeader className="bg-gradient-to-r from-primary to-accent text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            aria-label="Close tutorial"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <Badge variant="secondary" className="mb-2">Quick Start Guide</Badge>
              <CardTitle className="text-2xl">{moduleName}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Module Content */}
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">📚 Learn the Content</h3>
                <p className="text-sm text-muted-foreground">
                  Scroll through the module to explore topics. Click collapsible sections to expand details. Take your time to absorb the material.
                </p>
              </div>
            </div>

            {/* AI Helper */}
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">💬 Ask the DGX AI Expert</h3>
                <p className="text-sm text-muted-foreground">
                  Look for the floating tab on the right side → <strong>Click to open the AI assistant</strong> and ask questions about the module content anytime.
                </p>
              </div>
            </div>

            {/* Quiz */}
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <Trophy className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">🏆 Test Your Knowledge</h3>
                <p className="text-sm text-muted-foreground">
                  At the end of the module, take the quiz to check your understanding. Your results are saved for tracking progress.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground text-center mb-4">
              💡 <strong>Pro Tip:</strong> Use the AI Expert whenever you're stuck or want to dive deeper into a topic!
            </p>
            <Button 
              onClick={handleClose}
              className="w-full bg-accent hover:bg-accent/90 text-white"
              size="lg"
            >
              Got it, Let's Start Learning
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <button
              onClick={handleClose}
              className="w-full text-xs text-muted-foreground hover:text-foreground mt-2 transition-colors"
            >
              Don't show this again
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
