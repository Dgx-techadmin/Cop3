import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const StepByStepGuide = ({ title, steps, icon: Icon }) => {
  return (
    <Card className="shadow-card border border-border">
      <CardContent className="pt-6 space-y-4">
        {Icon && (
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold text-foreground text-lg">{title}</h4>
          </div>
        )}
        <div className="space-y-3">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-semibold">
                {idx + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};