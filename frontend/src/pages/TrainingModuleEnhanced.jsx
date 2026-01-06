import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Sparkles, BookOpen, Target, Users, Package, HeadphonesIcon, CheckCircle, 
  XCircle, Trophy, ArrowRight, AlertCircle, ChevronDown, ChevronUp, 
  Download, Briefcase, Mail, MessageSquare, FileText, Clock, Calendar
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const quizQuestions = [
  {
    id: 1,
    question: "Which AI tool is the primary authorised tool at Dynamics G-Ex?",
    options: ["ChatGPT", "Microsoft Copilot", "Google Gemini", "Claude AI"],
    correctAnswer: 1,
    explanation: "Microsoft Copilot is our primary AI tool, fully integrated with Microsoft 365 and enterprise-grade security."
  },
  {
    id: 2,
    question: "What should you NEVER include in AI prompts?",
    options: [
      "General business questions",
      "Confidential customer data or personal information",
      "Requests for writing assistance",
      "Questions about processes"
    ],
    correctAnswer: 1,
    explanation: "Never input confidential, personal, or sensitive data into AI tools. Always follow our data governance policies."
  },
  {
    id: 3,
    question: "Which strategic pillar does AI adoption most directly support?",
    options: ["STOCKSMART", "ONE TEAM", "Innovation Focus", "All of the above"],
    correctAnswer: 3,
    explanation: "AI supports ALL our strategic pillars: Innovation Focus, ONE TEAM, STOCKSMART, and GLOBAL EDGE."
  },
  {
    id: 4,
    question: "How can you access Microsoft Copilot in Teams?",
    options: [
      "Download a separate app",
      "Click the Copilot icon in the Teams sidebar",
      "It's not available in Teams",
      "Only through admin access"
    ],
    correctAnswer: 1,
    explanation: "Copilot is integrated directly into Teams - just click the Copilot icon in the left sidebar."
  },
  {
    id: 5,
    question: "What is AI NOT capable of?",
    options: [
      "Analyzing large datasets",
      "Replacing human judgment and empathy",
      "Drafting documents",
      "Generating insights"
    ],
    correctAnswer: 1,
    explanation: "AI augments human capabilities but cannot replace human judgment, emotional intelligence, and strategic decision-making."
  },
  {
    id: 6,
    question: "When using ChatGPT Free, what is the most important data protection step?",
    options: [
      "Use a VPN",
      "Never input confidential or customer data",
      "Use incognito mode",
      "Clear your browser history"
    ],
    correctAnswer: 1,
    explanation: "The critical rule is: NEVER input confidential, customer, or proprietary data into free AI tools."
  },
  {
    id: 7,
    question: "How can Copilot help with email management?",
    options: [
      "Delete all emails automatically",
      "Draft responses, summarize threads, and adjust tone",
      "Send emails without review",
      "Only check spelling"
    ],
    correctAnswer: 1,
    explanation: "Copilot in Outlook can draft responses, summarize long email threads, adjust tone, and more - but you always review before sending."
  },
  {
    id: 8,
    question: "What can Copilot do during Teams meetings?",
    options: [
      "Join meetings for you",
      "Make decisions automatically",
      "Provide real-time summaries and action items",
      "Replace note-taking entirely"
    ],
    correctAnswer: 2,
    explanation: "Copilot provides real-time summaries, captures action items, and highlights key points - but you should still pay attention!"
  },
  {
    id: 9,
    question: "Which low-level task can Copilot automate in Excel?",
    options: [
      "Making strategic business decisions",
      "Formatting data, creating formulas, and generating charts",
      "Approving financial transactions",
      "Hiring employees"
    ],
    correctAnswer: 1,
    explanation: "Copilot excels at automating repetitive tasks like formatting, formula creation, data analysis, and visualization."
  },
  {
    id: 10,
    question: "Can you request professional ChatGPT access at Dynamics G-Ex?",
    options: [
      "No, it's not allowed",
      "Yes, but only for executives",
      "Yes, with justification according to AI Governance policy",
      "Yes, automatically for everyone"
    ],
    correctAnswer: 2,
    explanation: "Professional ChatGPT access can be requested if you have a valid business justification, following our AI Governance policy."
  }
];

export default function TrainingModuleEnhanced() {
  const navigate = useNavigate();
  
  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [showUserForm, setShowUserForm] = useState(true);
  const [userName, setUserName] = useState("");
  const [userDepartment, setUserDepartment] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  
  // Admin download state
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  const handleStartQuiz = () => {
    if (!userName.trim() || !userDepartment) {
      toast.error("Please enter your name and select your department");
      return;
    }
    
    setQuizStarted(true);
    setShowUserForm(false);
    setStartTime(Date.now());
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    
    setTimeout(() => {
      document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answerIndex });
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(selectedAnswers).length < quizQuestions.length) {
      toast.error("Please answer all questions before submitting!");
      return;
    }

    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    
    let correctCount = 0;
    const answersDetail = {};
    
    quizQuestions.forEach((q) => {
      const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
      if (isCorrect) correctCount++;
      
      answersDetail[q.id] = {
        question: q.question,
        selected: q.options[selectedAnswers[q.id]],
        correct: isCorrect,
        correctAnswer: q.options[q.correctAnswer],
        explanation: q.explanation
      };
    });

    const feedback = getScoreFeedback(correctCount).message;
    
    setScore(correctCount);
    setShowResults(true);
    
    // Submit to backend
    try {
      await axios.post(`${API}/quiz-submit`, {
        name: userName,
        department: userDepartment,
        answers: answersDetail,
        score: correctCount,
        time_taken: timeTaken,
        feedback: feedback
      });
      
      toast.success(`Quiz completed! You scored ${correctCount}/${quizQuestions.length}`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
    
    setTimeout(() => {
      document.getElementById('quiz-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const getScoreFeedback = (scoreValue) => {
    const percentage = (scoreValue / quizQuestions.length) * 100;
    if (percentage === 100) return { emoji: "🏆", message: "Perfect score! You're an AI champion!", color: "text-green-600" };
    if (percentage >= 80) return { emoji: "🎉", message: "Excellent work! You've got a solid grasp on AI at G-Ex.", color: "text-green-600" };
    if (percentage >= 60) return { emoji: "👍", message: "Good job! Review the areas you missed and you'll be set.", color: "text-blue-600" };
    return { emoji: "📚", message: "Keep learning! Review the content and try again.", color: "text-orange-600" };
  };

  const handleAdminDownload = async () => {
    if (!adminPassword) {
      toast.error("Please enter the admin password");
      return;
    }
    
    try {
      const response = await axios.get(`${API}/quiz-results/download`, {
        params: { password: adminPassword },
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `quiz_results_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success("Quiz results downloaded successfully!");
      setAdminPassword("");
    } catch (error) {
      toast.error("Invalid password or error downloading results");
    }
  };

  const progress = quizStarted && !showUserForm && !showResults 
    ? ((currentQuestion + 1) / quizQuestions.length) * 100 
    : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 bg-gradient-to-b from-background to-secondary/20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-background via-background to-secondary/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <Badge className="text-sm px-4 py-2">
              <BookOpen className="w-4 h-4 mr-2" />
              Module 1: Foundation
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground">
              Intro to AI & <span className="text-primary">Dynamics G-Ex</span> Strategy
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Welcome! AI isn't magic pixie dust – it's a practical tool to make your work easier and help Dynamics G-Ex stay ahead. Let's explore how AI aligns with our FY26 strategy.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <Badge variant="outline" className="text-sm px-3 py-1">
                <Target className="w-3 h-3 mr-1" /> ONE TEAM
              </Badge>
              <Badge variant="outline" className="text-sm px-3 py-1">
                <Sparkles className="w-3 h-3 mr-1" /> GLOBAL EDGE
              </Badge>
              <Badge variant="outline" className="text-sm px-3 py-1">
                <Package className="w-3 h-3 mr-1" /> STOCKSMART
              </Badge>
              <Badge variant="outline" className="text-sm px-3 py-1">
                <Sparkles className="w-3 h-3 mr-1" /> Innovation Focus
              </Badge>
            </div>
          </div>
        </section>

        {/* Content continues in next part due to length... */}
        {/* I'll need to create this in multiple messages due to size */}
      </main>
      <Footer />
    </div>
  );
}
