import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Lightbulb, GraduationCap, Menu, X, PlayCircle } from "lucide-react";
import { useState } from "react";

export const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path) => location.pathname === path;
  
  const navLinks = [
    { path: "/", label: "Home", icon: Sparkles },
    { path: "/training", label: "Training", icon: GraduationCap, alwaysHighlighted: true },
    { path: "/tutorials", label: "Tutorials", icon: PlayCircle },
    { path: "/tips", label: "Tips & Use Cases", icon: Lightbulb },
  ];
  
  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-soft">
      <style>{`
        @keyframes subtlePulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.4); }
          50% { opacity: 0.9; box-shadow: 0 0 8px 2px rgba(249, 115, 22, 0.3); }
        }
        .training-highlight {
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%) !important;
          animation: subtlePulse 2s ease-in-out infinite;
        }
        .training-highlight:hover {
          background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%) !important;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="/dynamics-gex-logo.png" 
              alt="Dynamics G-Ex Logo" 
              className="h-12 w-auto transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <p className="text-xs text-muted-foreground font-medium">AI Hub</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(({ path, label, icon: Icon, alwaysHighlighted }) => (
              <Link key={path} to={path}>
                <Button
                  variant={isActive(path) || alwaysHighlighted ? "default" : "ghost"}
                  size="sm"
                  className={`flex items-center space-x-2 ${alwaysHighlighted ? 'training-highlight text-white' : ''}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Button>
              </Link>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map(({ path, label, icon: Icon, alwaysHighlighted }) => (
              <Link key={path} to={path} onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant={isActive(path) || alwaysHighlighted ? "default" : "ghost"}
                  size="sm"
                  className={`w-full justify-start flex items-center space-x-2 ${alwaysHighlighted ? 'training-highlight text-white' : ''}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
