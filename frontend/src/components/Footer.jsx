import { useState } from "react";
import { Sparkles, Mail, Globe, Download, Shield, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Footer = () => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  const handleAdminDownload = async () => {
    if (!adminPassword) {
      toast.error("Please enter the admin password");
      return;
    }
    
    try {
      // Open new tab with copyable spreadsheet view
      const viewUrl = `${API}/quiz-results/view?password=${encodeURIComponent(adminPassword)}`;
      window.open(viewUrl, '_blank');
      
      // Also download CSV file
      const response = await fetch(`${API}/quiz-results/download?password=${encodeURIComponent(adminPassword)}`);
      
      if (!response.ok) {
        if (response.status === 403) {
          toast.error("Invalid password");
          return;
        }
        throw new Error("Failed to download results");
      }
      
      // Check if response is JSON (error or no data message)
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        toast.info(data.message || "No quiz submissions found");
        return;
      }
      
      // Handle CSV download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Get filename from Content-Disposition header or use default
      const disposition = response.headers.get('Content-Disposition');
      let filename = `quiz_results_${new Date().toISOString().split('T')[0]}.csv`;
      if (disposition && disposition.includes('filename=')) {
        const matches = disposition.match(/filename="?(.+)"?/);
        if (matches && matches[1]) {
          filename = matches[1];
        }
      }
      
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success("Quiz results opened in new tab and downloaded!");
      setAdminPassword("");
      setShowAdminPanel(false);
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Error downloading results. Please try again.");
    }
  };

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/dynamics-gex-logo.png" 
                alt="Dynamics G-Ex Logo" 
                className="h-12 w-auto"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">AI Hub</p>
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
              <li><a href="/training" className="hover:text-primary transition-colors">Training Module</a></li>
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
        
        {/* Admin Access Section */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="max-w-md">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className="text-xs text-muted-foreground hover:text-foreground mb-2"
            >
              <Shield className="w-3 h-3 mr-2" />
              Admin: Download Quiz Results
            </Button>
            
            {showAdminPanel && (
              <div className="bg-muted/30 rounded-lg p-4 space-y-3 border border-border">
                <Label htmlFor="admin-password-footer" className="text-sm">Enter admin password</Label>
                <div className="flex gap-2">
                  <Input
                    id="admin-password-footer"
                    type="password"
                    placeholder="Admin password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAdminDownload()}
                    className="flex-1"
                  />
                  <Button onClick={handleAdminDownload} size="sm" className="bg-primary hover:bg-primary/90">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Opens spreadsheet view in new tab and downloads CSV file</p>
              </div>
            )}
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
