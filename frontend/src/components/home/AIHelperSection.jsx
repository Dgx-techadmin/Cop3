import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Sparkles, CheckCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || import.meta.env.REACT_APP_BACKEND_URL || 'https://ai-learning-hub-168.preview.emergentagent.com';
const API = `${BACKEND_URL}/api`;

export const AIHelperSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    challenge: ""
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.department || !formData.challenge) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    setResponse(null);
    setChatMessages([]);
    
    try {
      console.log('Submitting to:', `${API}/ai-helper`);
      console.log('BACKEND_URL:', BACKEND_URL);
      const result = await axios.post(`${API}/ai-helper`, formData);
      setResponse(result.data);
      toast.success("AI suggestions generated!");
    } catch (error) {
      console.error("Error details:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      toast.error("Oops! Something went wrong. Give it another go.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    
    if (!chatInput.trim() || !response?.conversation_id) {
      return;
    }
    
    const userMessage = chatInput.trim();
    setChatInput("");
    setChatLoading(true);
    
    // Add user message to chat
    setChatMessages(prev => [...prev, { role: "user", content: userMessage }]);
    
    try {
      const result = await axios.post(`${API}/ai-chat`, {
        message: userMessage,
        conversation_id: response.conversation_id
      });
      
      // Add AI response to chat
      setChatMessages(prev => [...prev, { role: "assistant", content: result.data.response }]);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error sending message. Please try again.");
      // Remove the user message if failed
      setChatMessages(prev => prev.slice(0, -1));
    } finally {
      setChatLoading(false);
    }
  };
  
  return (
    <section id="ai-helper" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Interactive AI Helper</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            Got a challenge? <span className="gradient-text">Let AI give you a hand!</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us what you're working on, and we'll suggest how Microsoft Copilot can help.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="shadow-card border-2 hover:border-primary/20 transition-colors">
            <CardHeader>
              <CardTitle className="font-heading">Share Your Challenge</CardTitle>
              <CardDescription>
                AI isn't magic pixie dust – but it'll make your day easier!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Sarah from Sales"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="transition-all focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => setFormData({ ...formData, department: value })}
                  >
                    <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary">
                      <SelectValue placeholder="Select your department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="leadership">Leadership</SelectItem>
                      <SelectItem value="it">IT</SelectItem>
                      <SelectItem value="customer-service">Customer Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="challenge">Your Challenge or Objective</Label>
                  <Textarea
                    id="challenge"
                    placeholder="e.g., I need to analyze customer data to predict trends and improve outreach..."
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    rows={4}
                    className="transition-all focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent hover:bg-accent-light text-white shadow-elegant hover:shadow-xl transition-all duration-300 group"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                      AI is thinking...
                    </>
                  ) : (
                    <>
                      Get AI Suggestions
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Response */}
          <div className="space-y-4">
            {!response && !loading && (
              <Card className="shadow-card bg-muted/30">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4 py-12">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-foreground">Ready to help!</h3>
                    <p className="text-sm text-muted-foreground">
                      Fill in the form and get personalized AI suggestions tailored to your challenge.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {loading && (
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4 py-12">
                    <Loader2 className="w-12 h-12 mx-auto text-primary animate-spin" />
                    <h3 className="font-heading font-semibold text-foreground">Generating suggestions...</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI is analyzing your challenge and crafting personalized recommendations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {response && (
              <Card className="shadow-card border-2 border-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <CardHeader>
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="font-heading text-lg">AI Suggestions for {formData.name}</CardTitle>
                      <CardDescription className="capitalize">{formData.department} Department</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Approach */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center">1</span>
                      <span>Step-by-Step Approach</span>
                    </h4>
                    <div className="pl-8 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                      {response.approach}
                    </div>
                  </div>
                  
                  {/* Tool */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center">2</span>
                      <span>Recommended Tool</span>
                    </h4>
                    <div className="pl-8">
                      <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-sm font-medium">
                        <Sparkles className="w-4 h-4" />
                        <span>{response.tool}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Why */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center">3</span>
                      <span>Why This Helps</span>
                    </h4>
                    <div className="pl-8 text-sm text-muted-foreground leading-relaxed">
                      {response.why}
                    </div>
                  </div>
                  
                  {/* Strategic Alignment */}
                  {response.strategic_alignment && (
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <h4 className="font-semibold text-foreground text-sm">🎯 Strategic Alignment</h4>
                      <p className="text-sm text-muted-foreground">{response.strategic_alignment}</p>
                    </div>
                  )}
                  
                  {/* Interactive Chat Section */}
                  <div className="mt-8 pt-6 border-t border-border">
                    <h4 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
                      <span>💬</span>
                      <span>Continue the Conversation</span>
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Have follow-up questions? Ask me anything about using Microsoft Copilot for your challenge!
                    </p>
                    
                    {/* Chat Messages */}
                    {chatMessages.length > 0 && (
                      <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                        {chatMessages.map((msg, idx) => (
                          <div
                            key={idx}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[85%] rounded-lg p-3 ${
                                msg.role === 'user'
                                  ? 'bg-primary text-white'
                                  : 'bg-muted text-foreground'
                              }`}
                            >
                              <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Chat Input */}
                    <form onSubmit={handleChatSubmit} className="flex gap-2">
                      <Input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask a follow-up question..."
                        disabled={chatLoading}
                        className="flex-1 transition-all focus:ring-2 focus:ring-primary"
                      />
                      <Button
                        type="submit"
                        disabled={chatLoading || !chatInput.trim()}
                        className="bg-primary hover:bg-primary/90 text-white"
                      >
                        {chatLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <ArrowRight className="w-4 h-4" />
                        )}
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
