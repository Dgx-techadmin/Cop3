import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const UseCaseCard = ({ title, description, examples, icon: Icon, color = "bg-blue-100", iconColor = "text-blue-600" }) => {
  return (
    <Card className="shadow-card hover:shadow-elegant transition-all h-full flex flex-col">
      <CardHeader>
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-3`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="space-y-3 flex-1">
          {examples.map((example, idx) => (
            <div key={idx} className="bg-muted/30 rounded-lg p-3">
              <p className="text-xs font-semibold text-foreground mb-1">{example.title}</p>
              <p className="text-xs text-muted-foreground italic">"{example.prompt}"</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};