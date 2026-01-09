import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, BookOpen, Target, Users, Package, HeadphonesIcon, CheckCircle, XCircle, Trophy, ArrowRight, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const quizQuestions = [
  {
    id: 1,
    question: "Which AI tool is the primary authorised tool for CRM insights at Dynamics G-Ex?",
    options: [
      "ChatGPT",
      "Microsoft Copilot",
      "Google Bard",
      "Claude AI"
    ],
    correctAnswer: 1,
    explanation: "Microsoft Copilot is our primary AI tool, integrated with Microsoft 365 apps including CRM systems."
  },
  {
    id: 2,
    question: "What is AI NOT capable of?",
    options: [
      "Analyzing large datasets",
      "Replacing human judgment and decision-making",
      "Drafting emails and documents",
      "Generating insights from data"
    ],
    correctAnswer: 1,
    explanation: "AI is a powerful tool to augment human capabilities, but it cannot replace human judgment, emotional intelligence, and strategic decision-making."
  },
  {
    id: 3,
    question: "Which Dynamics G-Ex strategic pillar is most directly supported by AI adoption?",
    options: [
      "STOCKSMART",
      "ONE TEAM",
      "Innovation Focus",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "AI supports all our strategic pillars: Innovation Focus (leading with AI), ONE TEAM (shared knowledge), STOCKSMART (predictive analytics), and GLOBAL EDGE (efficiency)."
  },
  {
    id: 4,
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
    id: 5,
    question: "How can Customer Service use Microsoft Copilot most effectively?",
    options: [
      "To make all decisions automatically",
      "To draft response templates and analyse ticket trends",
      "To replace customer service staff",
      "To store customer passwords"
    ],
    correctAnswer: 1,
    explanation: "Copilot helps draft empathetic responses, analyse common issues, and speed up support – but humans remain essential for customer relationships."
  }
];

export default function TrainingModule() {
  const navigate = useNavigate();
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    
    // Scroll to quiz section
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

  const handleSubmit = () => {
    // Check if all questions are answered
    if (Object.keys(selectedAnswers).length < quizQuestions.length) {
      toast.error("Please answer all questions before submitting!");
      return;
    }

    // Calculate score
    let correctCount = 0;
    quizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setShowResults(true);
    toast.success(`Quiz completed! You scored ${correctCount}/${quizQuestions.length}`);
    
    // Scroll to results
    setTimeout(() => {
      document.getElementById('quiz-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const getScoreFeedback = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) return { emoji: "🏆", message: "Perfect! You're an AI champion!", color: "text-green-600" };
    if (percentage >= 80) return { emoji: "🎉", message: "Excellent work! You've got a solid grasp on AI at G-Ex.", color: "text-green-600" };
    if (percentage >= 60) return { emoji: "👍", message: "Good job! Review the areas you missed and you'll be set.", color: "text-blue-600" };
    return { emoji: "📚", message: "Keep learning! Review the content and try again.", color: "text-orange-600" };
  };

  const progress = quizStarted && !showResults ? ((currentQuestion + 1) / quizQuestions.length) * 100 : 0;

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

        {/* Core Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* What AI Is */}
            <Card className="shadow-card border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <span>What AI Is (and Isn't)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-600 flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>AI IS:</span>
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• A tool to augment human capabilities</li>
                      <li>• Great at pattern recognition and data analysis</li>
                      <li>• Helpful for drafting, summarizing, and brainstorming</li>
                      <li>• Time-saving for repetitive tasks</li>
                      <li>• Always learning and improving</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-red-600 flex items-center space-x-2">
                      <XCircle className="w-5 h-5" />
                      <span>AI ISN'T:</span>
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• A replacement for human judgment</li>
                      <li>• Always 100% accurate (fact-check outputs!)</li>
                      <li>• Capable of understanding context like humans</li>
                      <li>• A substitute for emotional intelligence</li>
                      <li>• Magic – it needs good prompts to work well</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Why AI Matters */}
            <Card className="shadow-card border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-6 h-6 text-primary" />
                  <span>Why AI Matters for Dynamics G-Ex</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  AI is a core part of our <strong className="text-foreground">Innovation Focus</strong> USP. By embracing AI, we:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">🚀 Drive GLOBAL EDGE</h4>
                    <p className="text-sm text-muted-foreground">Serve customers faster and smarter across all regions with AI-powered insights and automation.</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">🤝 Strengthen ONE TEAM</h4>
                    <p className="text-sm text-muted-foreground">Share knowledge and best practices instantly, collaborate better, and work as a unified force.</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">📦 Optimise STOCKSMART</h4>
                    <p className="text-sm text-muted-foreground">Predict demand, reduce waste, and make data-driven inventory decisions with AI analytics.</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">💡 Lead with Innovation</h4>
                    <p className="text-sm text-muted-foreground">Stay ahead of competitors by adopting cutting-edge tools that make us more efficient and creative.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Authorised Tools */}
            <Card className="shadow-card border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span>Authorised AI Tools</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-primary/5 rounded-lg border-2 border-primary/20">
                    <Badge className="bg-primary text-white">PRIMARY</Badge>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">Microsoft Copilot</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Integrated with Word, Excel, PowerPoint, Outlook, Teams, and more. Your go-to for work tasks.
                      </p>
                      <p className="text-xs text-muted-foreground italic">
                        ✅ Approved for all business use cases | ✅ Enterprise-grade security | ✅ Data stays within Microsoft 365
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg border border-border">
                    <Badge variant="outline">SECONDARY</Badge>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">ChatGPT (Free/Plus)</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Useful for general brainstorming and non-confidential tasks.
                      </p>
                      <p className="text-xs text-orange-600 italic">
                        ⚠️ Never input confidential data, customer info, or proprietary information
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Departmental Use Cases */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-heading font-bold text-foreground">AI in Action Across Departments</h2>
              <p className="text-muted-foreground">See how your team can leverage Microsoft Copilot</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="shadow-card hover:shadow-elegant transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Sales & Marketing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Use Copilot to analyse CRM data, draft personalised emails, and generate campaign ideas in minutes.
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p><strong>Example:</strong> "Draft a follow-up email for prospect interested in Sample Bags, highlighting ROI."</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-3">
                    <Package className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Inventory Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Copilot in Excel predicts stock needs, identifies trends, and suggests reorder points based on historical data.
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p><strong>Example:</strong> "Analyse last 6 months sales. Predict Q1 demand for Core Trays by region."</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center mb-3">
                    <HeadphonesIcon className="w-6 h-6 text-pink-600" />
                  </div>
                  <CardTitle className="text-lg">Customer Service</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Draft empathetic responses, generate FAQs from common inquiries, and analyse ticket sentiment trends.
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p><strong>Example:</strong> "Create empathetic response for delayed shipment with solution options."</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-card border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-6 h-6 text-primary" />
                  <span>Your AI Learning Resources</span>
                </CardTitle>
                <CardDescription>Everything you need to get started with AI at Dynamics G-Ex</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="justify-start h-auto py-4 border-2 hover:border-primary hover:bg-primary/5"
                    onClick={() => navigate('/')}
                  >
                    <div className="text-left">
                      <div className="font-semibold flex items-center space-x-2 mb-1">
                        <Sparkles className="w-4 h-4" />
                        <span>G-Ex AI Hub Homepage</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Interactive AI helper and department tips</p>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start h-auto py-4 border-2 hover:border-primary hover:bg-primary/5"
                    onClick={() => navigate('/tutorials')}
                  >
                    <div className="text-left">
                      <div className="font-semibold flex items-center space-x-2 mb-1">
                        <BookOpen className="w-4 h-4" />
                        <span>Microsoft Copilot Tutorials</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Step-by-step video guides</p>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start h-auto py-4 border-2 hover:border-primary hover:bg-primary/5"
                    onClick={() => window.open('https://learn.microsoft.com/en-us/copilot/microsoft-365/', '_blank')}
                  >
                    <div className="text-left">
                      <div className="font-semibold flex items-center space-x-2 mb-1">
                        <Target className="w-4 h-4" />
                        <span>Microsoft Copilot Documentation</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Official Microsoft resources</p>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </Button>

                  <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border-2 border-orange-200 dark:border-orange-800">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-orange-900 dark:text-orange-100 mb-1">Governance Quick Guide</p>
                        <p className="text-xs text-orange-700 dark:text-orange-200">
                          ⚠️ Never share confidential data, customer info, or personal details with AI tools. Always fact-check outputs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quiz Section */}
        <section id="quiz-section" className="py-12 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-elegant border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-6 h-6 text-accent" />
                  <span>Knowledge Check Quiz</span>
                </CardTitle>
                <CardDescription>Test your understanding – 5 questions to see if you're ready!</CardDescription>
              </CardHeader>
              <CardContent>
                {!quizStarted ? (
                  <div className="text-center space-y-6 py-8">
                    <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Ready to test your knowledge?</h3>
                      <p className="text-sm text-muted-foreground">5 multiple-choice questions about AI and Dynamics G-Ex strategy</p>
                    </div>
                    <Button
                      size="lg"
                      className="bg-accent hover:bg-accent-light text-white"
                      onClick={handleStartQuiz}
                    >
                      Start Quiz
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                ) : !showResults ? (
                  <div className="space-y-6">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                        <span>{Math.round(progress)}% Complete</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    {/* Current Question */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">
                        {quizQuestions[currentQuestion].question}
                      </h3>
                      <div className="space-y-3">
                        {quizQuestions[currentQuestion].options.map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleAnswerSelect(quizQuestions[currentQuestion].id, idx)}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                              selectedAnswers[quizQuestions[currentQuestion].id] === idx
                                ? 'border-primary bg-primary/10 font-semibold'
                                : 'border-border hover:border-primary/50 hover:bg-muted/50'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                selectedAnswers[quizQuestions[currentQuestion].id] === idx
                                  ? 'border-primary bg-primary'
                                  : 'border-muted-foreground'
                              }`}>
                                {selectedAnswers[quizQuestions[currentQuestion].id] === idx && (
                                  <CheckCircle className="w-4 h-4 text-white" />
                                )}
                              </div>
                              <span className="text-sm">{option}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-4">
                      <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                      >
                        Previous
                      </Button>
                      {currentQuestion < quizQuestions.length - 1 ? (
                        <Button
                          onClick={handleNext}
                          disabled={selectedAnswers[quizQuestions[currentQuestion].id] === undefined}
                        >
                          Next
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          onClick={handleSubmit}
                          className="bg-accent hover:bg-accent-light text-white"
                        >
                          Submit Quiz
                          <Trophy className="ml-2 w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div id="quiz-results" className="space-y-6">
                    {/* Results Header */}
                    <div className="text-center space-y-4 py-6">
                      <div className="text-6xl">{getScoreFeedback().emoji}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">Quiz Complete!</h3>
                        <p className={`text-lg font-semibold ${getScoreFeedback().color}`}>
                          You scored {score} out of {quizQuestions.length}
                        </p>
                        <p className="text-muted-foreground mt-2">{getScoreFeedback().message}</p>
                      </div>
                    </div>

                    {/* Answer Review */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">Review Your Answers:</h4>
                      {quizQuestions.map((q, idx) => {
                        const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
                        return (
                          <Card key={q.id} className={`border-2 ${
                            isCorrect ? 'border-green-500 bg-green-50 dark:bg-green-950' : 'border-red-500 bg-red-50 dark:bg-red-950'
                          }`}>
                            <CardContent className="pt-4">
                              <div className="flex items-start space-x-3">
                                {isCorrect ? (
                                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                                ) : (
                                  <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                                )}
                                <div className="flex-1 space-y-2">
                                  <p className="text-sm font-semibold text-foreground">Question {idx + 1}: {q.question}</p>
                                  <p className="text-sm text-muted-foreground">
                                    <strong>Your answer:</strong> {q.options[selectedAnswers[q.id]]}
                                  </p>
                                  {!isCorrect && (
                                    <p className="text-sm text-muted-foreground">
                                      <strong>Correct answer:</strong> {q.options[q.correctAnswer]}
                                    </p>
                                  )}
                                  <p className="text-xs text-muted-foreground italic">{q.explanation}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>

                    {/* Retake Button */}
                    <div className="flex justify-center pt-4">
                      <Button
                        variant="outline"
                        onClick={handleStartQuiz}
                      >
                        Retake Quiz
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Next Steps */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-elegant bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
              <CardContent className="pt-8 space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-heading font-bold text-foreground">What's Next?</h2>
                  <p className="text-muted-foreground">Continue your AI journey with these next steps</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-card rounded-lg p-6 space-y-3 border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">Module 2: Coming Soon</h3>
                    <p className="text-sm text-muted-foreground">Governance & Responsible AI Use</p>
                    <Badge variant="secondary">In Development</Badge>
                  </div>

                  <div className="bg-card rounded-lg p-6 space-y-3 border border-border">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-semibold text-foreground">Bookmark the AI Hub</h3>
                    <p className="text-sm text-muted-foreground">Access prompts, tutorials, and get AI suggestions anytime</p>
                    <Button
                      size="sm"
                      className="bg-accent hover:bg-accent-light text-white"
                      onClick={() => navigate('/')}
                    >
                      Visit AI Hub
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground">
                    Questions? Reach out to your team lead or visit the AI Hub for support.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
