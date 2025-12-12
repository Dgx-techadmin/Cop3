import { Sparkles, Mail, Globe } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-card">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-foreground">
                  Dynamics <span className="text-accent font-bold">G-Ex</span>
                </h3>
                <p className="text-xs text-muted-foreground">AI Hub</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Making life easier with AI. Empowering every team member to work smarter, not harder.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="/tips" className="hover:text-primary transition-colors">Tips & Use Cases</a></li>
              <li><a href="/tutorials" className="hover:text-primary transition-colors">Tutorials</a></li>
            </ul>
          </div>
          
          {/* Strategic Pillars */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Our Pillars</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>ONE TEAM</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>GLOBAL EDGE</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>STOCKSMART</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Innovation Focus</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Compliance Banner */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground text-center">
              <strong className="text-foreground">⚠️ Important:</strong> Remember – No confidential or personal data in AI prompts. Always fact-check outputs.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Dynamics G-Ex. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with 💡 for smarter teamwork
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
