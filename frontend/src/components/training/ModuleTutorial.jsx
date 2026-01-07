import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  X, ChevronRight, ChevronLeft, Sparkles 
} from "lucide-react";

export const ModuleTutorial = ({ moduleId, moduleName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightedElement, setHighlightedElement] = useState(null);
  const [showReopenButton, setShowReopenButton] = useState(false);
  const storageKey = `module-${moduleId}-tutorial-shown`;
  const reopenButtonKey = `module-${moduleId}-tutorial-reopen-button`;

  const steps = [
    {
      title: "Welcome to Your Learning Journey! 🎓",
      description: "Let's take a quick 30-second tour of this module's features. We'll show you exactly where everything is!",
      target: null,
      position: "center"
    },
    {
      title: "📚 Module Content",
      description: "This is your main learning content. Click on collapsible sections (like these) to expand and explore topics in detail.",
      target: ".collapsible-section-demo",
      position: "bottom",
      highlight: "multiple"
    },
    {
      title: "💬 Your AI Learning Assistant",
      description: "See this tab on the right? Click it anytime to open the DGX AI Expert. Ask questions about anything you're learning!",
      target: ".ai-expert-button",
      position: "left",
      highlight: "single"
    },
    {
      title: "🏆 Test Your Knowledge",
      description: "As you scroll down through the module, you'll find a quiz at the bottom. Take it to check your understanding and track your progress!",
      target: null,
      position: "center"
    },
    {
      title: "You're All Set! 🚀",
      description: "That's it! Start learning at your own pace. Remember, the AI Expert is always here to help. Good luck!",
      target: null,
      position: "center"
    }
  ];

  useEffect(() => {
    // Check URL parameter for forcing tutorial
    const urlParams = new URLSearchParams(window.location.search);
    const forceTutorial = urlParams.get('tutorial') === 'true';
    
    const tutorialShown = localStorage.getItem(storageKey);
    const reopenButtonShown = localStorage.getItem(reopenButtonKey);
    
    if (!tutorialShown || forceTutorial) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (reopenButtonShown === 'true') {
      // Show the reopen button if tutorial was completed before
      setShowReopenButton(true);
    }
  }, [storageKey, reopenButtonKey]);

  useEffect(() => {
    if (isOpen && steps[currentStep].target) {
      // Try to find the element
      const element = document.querySelector(steps[currentStep].target);
      if (element) {
        setHighlightedElement(element);
        // Scroll element into view smoothly
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      } else {
        // Element not found - show modal centered instead of highlighting
        setHighlightedElement(null);
        console.warn(`Tutorial: Element not found for selector: ${steps[currentStep].target}, showing modal centered`);
      }
    } else {
      setHighlightedElement(null);
    }
  }, [currentStep, isOpen]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setHighlightedElement(null);
    setCurrentStep(0); // Reset to first step
    localStorage.setItem(storageKey, "true");
    localStorage.setItem(reopenButtonKey, "true");
    setShowReopenButton(true); // Show the reopen button
    
    // Scroll to top of page smoothly
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
    
    // Log instructions for testing
    console.log(`%c✨ Want to see the tutorial again?`, 'color: #FF8C1A; font-size: 14px; font-weight: bold');
    console.log(`%cClick the tutorial button on the left side or add ?tutorial=true to the URL`, 'color: #2B8FBD; font-size: 12px');
  };

  const handleSkip = () => {
    handleClose();
  };

  const handleReopen = () => {
    setIsOpen(true);
    setShowReopenButton(false);
  };

  if (!isOpen && !showReopenButton) return null;

  const step = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const isCenterPosition = step.position === "center" || !highlightedElement;

  // Get position for tooltip
  const getTooltipPosition = () => {
    if (!highlightedElement || isCenterPosition) {
      return {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxHeight: "90vh",
        overflowY: "auto"
      };
    }

    const rect = highlightedElement.getBoundingClientRect();
    const tooltipWidth = 400;
    const tooltipHeight = 250;
    const offset = 20;
    const padding = 20;

    let position = {};

    // Calculate viewport boundaries
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    switch (step.position) {
      case "bottom":
        if (rect.bottom + tooltipHeight + offset < viewportHeight) {
          // Room below
          position = {
            position: "fixed",
            top: `${Math.min(rect.bottom + offset, viewportHeight - tooltipHeight - padding)}px`,
            left: `${Math.max(padding, Math.min(rect.left + rect.width / 2 - tooltipWidth / 2, viewportWidth - tooltipWidth - padding))}px`,
          };
        } else {
          // Not enough room below, show above
          position = {
            position: "fixed",
            top: `${Math.max(padding, rect.top - tooltipHeight - offset)}px`,
            left: `${Math.max(padding, Math.min(rect.left + rect.width / 2 - tooltipWidth / 2, viewportWidth - tooltipWidth - padding))}px`,
          };
        }
        break;
      case "top":
        if (rect.top - tooltipHeight - offset > 0) {
          // Room above
          position = {
            position: "fixed",
            top: `${Math.max(padding, rect.top - tooltipHeight - offset)}px`,
            left: `${Math.max(padding, Math.min(rect.left + rect.width / 2 - tooltipWidth / 2, viewportWidth - tooltipWidth - padding))}px`,
          };
        } else {
          // Not enough room above, show below
          position = {
            position: "fixed",
            top: `${Math.min(rect.bottom + offset, viewportHeight - tooltipHeight - padding)}px`,
            left: `${Math.max(padding, Math.min(rect.left + rect.width / 2 - tooltipWidth / 2, viewportWidth - tooltipWidth - padding))}px`,
          };
        }
        break;
      case "left":
        if (rect.left - tooltipWidth - offset > 0) {
          // Room on left
          position = {
            position: "fixed",
            top: `${Math.max(padding, Math.min(rect.top + rect.height / 2 - tooltipHeight / 2, viewportHeight - tooltipHeight - padding))}px`,
            left: `${Math.max(padding, rect.left - tooltipWidth - offset)}px`,
          };
        } else {
          // Not enough room on left, show on right
          position = {
            position: "fixed",
            top: `${Math.max(padding, Math.min(rect.top + rect.height / 2 - tooltipHeight / 2, viewportHeight - tooltipHeight - padding))}px`,
            left: `${Math.min(rect.right + offset, viewportWidth - tooltipWidth - padding)}px`,
          };
        }
        break;
      case "right":
        if (rect.right + tooltipWidth + offset < viewportWidth) {
          // Room on right
          position = {
            position: "fixed",
            top: `${Math.max(padding, Math.min(rect.top + rect.height / 2 - tooltipHeight / 2, viewportHeight - tooltipHeight - padding))}px`,
            left: `${Math.min(rect.right + offset, viewportWidth - tooltipWidth - padding)}px`,
          };
        } else {
          // Not enough room on right, show on left
          position = {
            position: "fixed",
            top: `${Math.max(padding, Math.min(rect.top + rect.height / 2 - tooltipHeight / 2, viewportHeight - tooltipHeight - padding))}px`,
            left: `${Math.max(padding, rect.left - tooltipWidth - offset)}px`,
          };
        }
        break;
      default:
        position = {
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        };
    }

    return position;
  };

  // Get highlight position
  const getHighlightStyle = () => {
    if (!highlightedElement) return {};

    const rect = highlightedElement.getBoundingClientRect();
    const padding = 8;

    return {
      position: "fixed",
      top: `${rect.top - padding}px`,
      left: `${rect.left - padding}px`,
      width: `${rect.width + padding * 2}px`,
      height: `${rect.height + padding * 2}px`,
      border: "3px solid rgb(255, 140, 26)",
      borderRadius: "12px",
      boxShadow: "0 0 0 4px rgba(255, 140, 26, 0.2), 0 0 0 9999px rgba(0, 0, 0, 0.7)",
      pointerEvents: "none",
      zIndex: 99,
      animation: "pulse-border 2s ease-in-out infinite"
    };
  };

  return (
    <>
      <style>{`
        @keyframes pulse-border {
          0%, 100% {
            border-color: rgb(255, 140, 26);
            box-shadow: 0 0 0 4px rgba(255, 140, 26, 0.3), 0 0 0 9999px rgba(0, 0, 0, 0.5);
          }
          50% {
            border-color: rgb(255, 180, 80);
            box-shadow: 0 0 0 8px rgba(255, 140, 26, 0.4), 0 0 0 9999px rgba(0, 0, 0, 0.5);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      {/* Backdrop with spotlight effect - only when element is highlighted */}
      {highlightedElement && !isCenterPosition && (
        <div 
          style={getHighlightStyle()}
          className="animate-in fade-in duration-300"
        />
      )}

      {/* Dark overlay - lighter for better content visibility */}
      <div className="fixed inset-0 bg-black/40 z-[98]" onClick={(e) => {
        // Prevent clicks on backdrop from closing, but allow clicks on buttons
        e.stopPropagation();
      }} />

      {/* Tooltip Card */}
      <div
        style={{
          ...getTooltipPosition(),
          zIndex: 101,
          maxWidth: isCenterPosition ? "500px" : "400px",
          width: isCenterPosition ? "90%" : "400px"
        }}
        className="animate-in fade-in zoom-in-95 duration-300"
      >
        <Card className="shadow-2xl border-2 border-primary/20">
          <CardContent className="pt-6 pb-4 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <Badge variant="outline" className="text-xs">
                    Step {currentStep + 1} of {steps.length}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
              <button
                onClick={handleSkip}
                className="text-muted-foreground hover:text-foreground transition-colors ml-2 flex-shrink-0"
                aria-label="Skip tutorial"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress dots */}
            <div className="flex items-center justify-center space-x-2 py-2">
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentStep
                      ? "w-8 bg-accent"
                      : idx < currentStep
                      ? "w-2 bg-primary"
                      : "w-2 bg-muted"
                  }`}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={isFirstStep}
                className="flex-1"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              
              {!isLastStep && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSkip}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Skip
                </Button>
              )}

              <Button
                size="sm"
                onClick={handleNext}
                className="flex-1 bg-accent hover:bg-accent/90 text-white"
              >
                {isLastStep ? "Finish" : "Next"}
                {!isLastStep && <ChevronRight className="w-4 h-4 ml-1" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
