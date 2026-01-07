import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, X, Send, Sparkles, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = import.meta.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

export const ModuleAIExpert = ({ moduleId, moduleName, moduleContext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/module-assistant`, {
        message: userMessage,
        module_id: moduleId,
        module_name: moduleName,
        module_context: moduleContext,
        conversation_id: conversationId
      });

      // Add AI response to chat
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: response.data.response 
      }]);

      if (response.data.conversation_id && !conversationId) {
        setConversationId(response.data.conversation_id);
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast.error("Failed to get response. Please try again.");
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setConversationId(null);
    setInput("");
  };

  return (
    <>
      {/* Floating Button (Collapsed State) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="ai-expert-button fixed right-0 top-1/2 -translate-y-1/2 bg-primary text-white p-4 rounded-l-lg shadow-lg hover:bg-primary/90 transition-all z-50 group"
          aria-label="Open DGX AI Expert"
        >
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-xs transition-all duration-300 overflow-hidden">
              DGX AI Expert
            </span>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </button>
      )}

      {/* Sidebar Panel (Expanded State) */}
      {isOpen && (
        <div className="fixed right-0 top-0 h-screen w-full sm:w-96 bg-background border-l border-border shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">DGX AI Expert</h3>
                <Badge variant="secondary" className="text-xs">
                  {moduleName}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Welcome Message */}
          {messages.length === 0 && (
            <div className="p-6 space-y-4 border-b">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    Hi! I'm your AI expert for <strong>{moduleName}</strong>. 
                    I can help answer questions about the content you're learning.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    💡 Try asking: "What are the key DOs?" or "Explain data protection"
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-white"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground rounded-lg p-3 flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-background">
            {messages.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="w-full mb-3 text-xs"
              >
                Start New Conversation
              </Button>
            )}
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me a question about this module..."
                disabled={loading}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={loading || !input.trim()}
                size="icon"
                className="bg-accent hover:bg-accent/90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
