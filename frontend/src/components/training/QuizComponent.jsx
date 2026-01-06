import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, ArrowRight, CheckCircle, XCircle, Download } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const QuizComponent = ({ questions }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [showUserForm, setShowUserForm] = useState(true);
  const [userName, setUserName] = useState("");
  const [userDepartment, setUserDepartment] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
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
      document.getElementById('quiz-questions')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answerIndex });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(selectedAnswers).length < questions.length) {
      toast.error("Please answer all questions before submitting!");
      return;
    }

    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    
    let correctCount = 0;
    const answersDetail = {};
    
    questions.forEach((q) => {
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
    
    try {
      await axios.post(`${API}/quiz-submit`, {
        name: userName,
        department: userDepartment,
        answers: answersDetail,
        score: correctCount,
        time_taken: timeTaken,
        feedback: feedback
      });
      
      toast.success(`Quiz completed! You scored ${correctCount}/${questions.length}`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
    
    setTimeout(() => {
      document.getElementById('quiz-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const getScoreFeedback = (scoreValue) => {
    const percentage = (scoreValue / questions.length) * 100;
    if (percentage === 100) return { emoji: "🏆", message: "Perfect score! You're an AI champion!", color: "text-green-600" };
    if (percentage >= 80) return { emoji: "🎉", message: "Excellent work! You've got a solid grasp on AI at G-Ex.", color: "text-green-600" };
    if (percentage >= 60) return { emoji: "👍", message: "Good job! Review the areas you missed and you'll be set.", color: "text-blue-600" };
    return { emoji: "📚", message: "Keep learning! Review the content and try again.", color: "text-orange-600" };
  };

  const progress = quizStarted && !showUserForm && !showResults 
    ? ((currentQuestion + 1) / questions.length) * 100 
    : 0;

  return (
    <div className="space-y-6">
      <Card className="shadow-elegant border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-accent" />
            <span>Knowledge Check Quiz</span>
          </CardTitle>
          <CardDescription>Test your understanding – {questions.length} questions to see if you're ready!</CardDescription>
        </CardHeader>
        <CardContent>
          {showUserForm ? (
            <div className="space-y-6 py-4">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Before we start...</h3>
                  <p className="text-sm text-muted-foreground">Please tell us about yourself</p>
                </div>
              </div>
              
              <div className="max-w-md mx-auto space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="quiz-name">Your Name</Label>
                  <Input
                    id="quiz-name"
                    placeholder="Enter your full name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quiz-department">Department</Label>
                  <Select value={userDepartment} onValueChange={setUserDepartment}>
                    <SelectTrigger>
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
                
                <Button
                  size="lg"
                  className="w-full bg-accent hover:bg-accent-light text-white"
                  onClick={handleStartQuiz}
                >
                  Start Quiz
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          ) : !showResults ? (
            <div id="quiz-questions" className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {questions[currentQuestion].question}
                </h3>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(questions[currentQuestion].id, idx)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedAnswers[questions[currentQuestion].id] === idx
                          ? 'border-primary bg-primary/10 font-semibold'
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswers[questions[currentQuestion].id] === idx
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground'
                        }`}>
                          {selectedAnswers[questions[currentQuestion].id] === idx && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className="text-sm">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                {currentQuestion < questions.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    disabled={selectedAnswers[questions[currentQuestion].id] === undefined}
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
              <div className="text-center space-y-4 py-6">
                <div className="text-6xl">{getScoreFeedback(score).emoji}</div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Quiz Complete, {userName}!</h3>
                  <p className={`text-lg font-semibold ${getScoreFeedback(score).color}`}>
                    You scored {score} out of {questions.length}
                  </p>
                  <p className="text-muted-foreground mt-2">{getScoreFeedback(score).message}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Review Your Answers:</h4>
                {questions.map((q, idx) => {
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

              <div className="flex justify-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowUserForm(true);
                    setQuizStarted(false);
                    setUserName("");
                    setUserDepartment("");
                  }}
                >
                  Retake Quiz
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Admin Panel */}
      <Card className="shadow-card border border-border">
        <CardContent className="pt-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdminPanel(!showAdminPanel)}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Admin Access
          </Button>
          
          {showAdminPanel && (
            <div className="mt-4 space-y-3 max-w-md">
              <Label htmlFor="admin-password" className="text-sm">Enter admin password to download results</Label>
              <div className="flex gap-2">
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="Admin password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                />
                <Button onClick={handleAdminDownload} size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download CSV
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};