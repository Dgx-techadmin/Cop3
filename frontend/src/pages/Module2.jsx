import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, AlertTriangle, CheckCircle, XCircle, ArrowRight, 
  FileText, ExternalLink, Eye, Lock, UserCheck, BookOpen,
  Briefcase, Settings, Download
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CollapsibleSection } from "@/components/training/CollapsibleSection";
import { UseCaseCard } from "@/components/training/UseCaseCard";
import { QuizComponent } from "@/components/training/QuizComponent";
import { quizQuestionsModule2 } from "@/data/quizQuestionsModule2";

export default function Module2() {
  const navigate = useNavigate();

  const governanceDos = [
    {
      title: "Always fact-check AI outputs",
      description: "Verify information against reliable sources before using it. AI can hallucinate or provide outdated data.",
      tutorial: {
        text: "Learn how to fact-check AI content",
        link: "https://support.microsoft.com/en-us/topic/fact-check-copilot-responses-7fa7338c-8173-4d63-824e-c5c1c95c8364"
      }
    },
    {
      title: "Opt-out of data training",
      description: "Configure tools like ChatGPT to NOT use your inputs for model training. This protects sensitive information.",
      tutorial: {
        text: "Step-by-step: Turn off ChatGPT data training",
        link: "https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance"
      }
    },
    {
      title: "Use general, non-confidential data",
      description: "It's safe to ask about industry trends, general processes, or public knowledge.",
      tutorial: {
        text: "Best practices for data anonymization",
        link: "https://learn.microsoft.com/en-us/compliance/assurance/assurance-data-anonymization"
      }
    },
    {
      title: "Review and edit all AI outputs",
      description: "You are accountable for the final work. Always apply your expertise and judgment.",
      tutorial: {
        text: "How to review and edit Copilot content",
        link: "https://support.microsoft.com/en-us/office/review-and-edit-content-created-by-copilot-dd10b874-71e7-4f3c-8d8a-729fcf8442bc"
      }
    },
    {
      title: "Report accidental data exposure immediately",
      description: "If you accidentally input confidential data, delete the conversation and notify IT/Leadership right away.",
      tutorial: {
        text: "Data breach response checklist",
        link: "https://learn.microsoft.com/en-us/compliance/assurance/assurance-incident-response-overview"
      }
    },
    {
      title: "Complete mandatory training before use",
      description: "All Workforce members must complete annual AI awareness training before using authorised AI applications for business.",
      tutorial: {
        text: "You're doing it now!",
        link: null
      }
    },
    {
      title: "Use only authorised AI applications",
      description: "Stick to Microsoft Copilot and other approved tools. Unauthorised applications pose security risks.",
      tutorial: {
        text: "List of authorised AI tools at G-Ex",
        link: "/ai-governance-policy.pdf"
      }
    },
    {
      title: "Ensure data protection settings are configured",
      description: "Set up data protection options to prevent your prompts from being used to train AI models.",
      tutorial: {
        text: "Configure privacy settings in Copilot",
        link: "https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-privacy"
      }
    }
  ];

  const governanceDonts = [
    {
      title: "NEVER input customer personal information (PII)",
      description: "No names, emails, phone numbers, addresses, or any identifiable customer data. This includes de-identified or aggregated data that could be re-identified.",
      example: "❌ Bad: 'Analyze sales for John Smith at john@email.com' | ✅ Good: 'Analyze sales trends for mining sector customers'"
    },
    {
      title: "NEVER share proprietary business data",
      description: "No supplier pricing, financial data, strategic plans, or competitive intelligence.",
      example: "❌ Bad: 'Compare our supplier costs: Supplier X $45/unit vs Supplier Y $42/unit' | ✅ Good: 'General strategies for supplier cost optimization'"
    },
    {
      title: "NEVER blindly trust AI outputs",
      description: "AI can confidently provide wrong answers. Always verify critical information with authoritative sources.",
      example: "❌ Bad: Using AI-generated legal advice without lawyer review | ✅ Good: Use AI for drafting, then verify with subject matter expert"
    },
    {
      title: "NEVER use AI for final decision-making",
      description: "AI assists; humans decide. You remain accountable for all business decisions.",
      example: "❌ Bad: 'AI said to fire this employee, so I will' | ✅ Good: 'AI highlighted performance patterns, now I'll consult HR and review properly'"
    },
    {
      title: "NEVER upload confidential documents",
      description: "No contracts, customer lists, or sensitive spreadsheets to AI tools.",
      example: "❌ Bad: Upload full customer database to ChatGPT | ✅ Good: Create anonymized sample data for analysis"
    },
    {
      title: "NEVER use unauthorised AI applications",
      description: "Only use approved tools like Microsoft Copilot. Unauthorised apps pose security risks and may not have proper data protection.",
      example: "❌ Bad: Using random AI tools found online | ✅ Good: Stick to Microsoft Copilot and approved G-Ex tools"
    },
    {
      title: "NEVER input third-party proprietary data without permission",
      description: "Respect intellectual property rights and licensing conditions of third-party materials.",
      example: "❌ Bad: 'Summarize this competitor's confidential report I found' | ✅ Good: Use publicly available competitive intelligence"
    },
    {
      title: "NEVER use AI to impersonate, bully, or harass",
      description: "AI must be used ethically and professionally. No offensive, discriminatory, or inappropriate content.",
      example: "❌ Bad: Generate fake emails from colleagues | ✅ Good: Draft professional business communications under your own name"
    }
  ];

  const departmentExamples = [
    {
      title: "Marketing",
      icon: Briefcase,
      color: "bg-purple-100",
      iconColor: "text-purple-600",
      description: "Using Copilot for campaign ideas without exposing customer data",
      examples: [
        {
          title: "✅ GOOD: Brainstorm Campaign Themes",
          prompt: "Suggest 5 creative campaign themes for a B2B mining equipment company targeting safety-conscious operations managers.",
          note: "This uses general industry knowledge without exposing customer data."
        },
        {
          title: "❌ BAD: Analyzing Customer Data",
          prompt: "Analyze this customer list: [Customer names, contact info, purchase history]",
          note: "NEVER input customer PII or purchase data into AI tools."
        },
        {
          title: "✅ GOOD: Content Ideas",
          prompt: "Draft 3 LinkedIn post ideas highlighting the benefits of high-quality sample bags for mining labs.",
          note: "General product benefits without confidential pricing or customer info."
        }
      ]
    },
    {
      title: "Operations",
      icon: Settings,
      color: "bg-blue-100",
      iconColor: "text-blue-600",
      description: "Generating inventory reports responsibly without supplier details",
      examples: [
        {
          title: "✅ GOOD: Inventory Trend Analysis",
          prompt: "Analyze these anonymized inventory trends: Product A (1200 units), Product B (850 units), Product C (2100 units). Suggest reorder priorities.",
          note: "Using anonymized data without supplier names or pricing."
        },
        {
          title: "❌ BAD: Supplier Pricing Analysis",
          prompt: "Compare supplier pricing: Supplier X ($45/unit), Supplier Y ($42/unit) for Core Trays.",
          note: "NEVER share supplier pricing or contract details with AI."
        },
        {
          title: "✅ GOOD: Process Optimization",
          prompt: "Suggest ways to optimize warehouse receiving process for mining equipment suppliers.",
          note: "General process improvement without confidential operational data."
        }
      ]
    }
  ];

  const resources = [
    {
      title: "G-Ex AI Governance Policy",
      description: "Complete AI usage guidelines and policies",
      icon: FileText,
      link: "/ai-governance-policy.pdf",
      type: "internal"
    },
    {
      title: "Microsoft Copilot Compliance Guide",
      description: "How Microsoft protects your data",
      icon: Shield,
      link: "https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-privacy",
      type: "external"
    },
    {
      title: "Responsible AI in 3 Minutes",
      description: "Quick video guide to AI ethics",
      icon: ExternalLink,
      link: "https://www.microsoft.com/en-us/ai/responsible-ai",
      type: "external"
    },
    {
      title: "Data Protection Best Practices",
      description: "How to handle sensitive data",
      icon: Lock,
      link: "https://learn.microsoft.com/en-us/compliance/",
      type: "external"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 bg-gradient-to-b from-background to-secondary/20">
        {/* Module Banner */}
        <div 
          className="relative bg-green-600 overflow-hidden"
          style={{
            backgroundImage: `url('/dynamics-gex-logo.png')`,
            backgroundSize: '120px',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center',
            opacity: 0.95
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/95 via-green-600/90 to-green-600/95"></div>
          <div className="relative py-8 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <Shield className="w-6 h-6 text-white" />
                <span className="text-2xl sm:text-3xl font-heading font-bold text-white">
                  Module 2: Governance
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-green-50 via-background to-blue-50 dark:from-green-950 dark:via-background dark:to-blue-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground">
              <span className="text-green-600">Governance</span> & Responsible AI Use
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              AI is powerful, but with great power comes great responsibility. Learn how to use AI ethically, 
              securely, and in compliance with Dynamics G-Ex policies.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground pt-4">
              <Shield className="w-4 h-4" />
              <span>Estimated time: 20 minutes</span>
            </div>
          </div>
        </section>

        {/* Why Governance Matters */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-card border-2 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                  <span>Why AI Governance Matters at Dynamics G-Ex</span>
                </CardTitle>
                <CardDescription>
                  Our AI policy ensures informed and responsible use of AI while maximizing benefits and minimizing risks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-amber-50 dark:bg-amber-950 border-l-4 border-amber-500 p-4 rounded-r-lg">
                  <p className="text-sm text-foreground font-semibold mb-2">
                    Policy Scope: This applies to ALL Workforce members
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                    <li>• During work hours AND outside of work hours</li>
                    <li>• On personal OR company-owned devices</li>
                    <li>• At office, home, or remote locations</li>
                    <li>• When AI use serves business objectives</li>
                  </ul>
                </div>

                <p className="text-muted-foreground">
                  AI is transforming how we work, but it also introduces new risks. Our governance framework ensures we:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <Lock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Protect Data Privacy</h4>
                      <p className="text-xs text-muted-foreground">
                        No personal data, customer PII, or confidential information in AI prompts. Strict DLP monitoring in place.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Safeguard Intellectual Property</h4>
                      <p className="text-xs text-muted-foreground">
                        Protect proprietary business strategies, supplier pricing, and competitive intelligence from AI training.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <Eye className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Ensure Accuracy & Reliability</h4>
                      <p className="text-xs text-muted-foreground">
                        Mandatory fact-checking and verification of all AI outputs before use in business decisions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                    <UserCheck className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Maintain Human Accountability</h4>
                      <p className="text-xs text-muted-foreground">
                        You remain fully responsible for all AI-assisted work. AI augments, never replaces, human judgment.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                    <Shield className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Prevent Misuse</h4>
                      <p className="text-xs text-muted-foreground">
                        No impersonation, harassment, discrimination, or generation of offensive content.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                    <BookOpen className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Ensure Compliance</h4>
                      <p className="text-xs text-muted-foreground">
                        Mandatory annual training, clear record-keeping, and adherence to Cyber Security Policy.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-foreground mb-2 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2 text-primary" />
                    Key Policy Principles
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                    <li>• Use only <strong>authorised</strong> AI applications (Microsoft Copilot, approved tools)</li>
                    <li>• Complete mandatory training before using AI for business</li>
                    <li>• Apply critical thinking and verify all AI outputs</li>
                    <li>• Report any policy breaches immediately to your line manager and IT</li>
                    <li>• Manage costs responsibly - avoid unnecessary personal subscriptions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Core DOs and DON'Ts */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-heading font-bold text-foreground">
                Key DOs and DON'Ts
              </h2>
              <p className="text-muted-foreground">
                Follow these guidelines from our Generative AI Workplace Policy
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* DOs */}
              <Card className="shadow-card border-2 border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span>DO: Best Practices</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {governanceDos.map((item, idx) => (
                    <CollapsibleSection
                      key={idx}
                      title={item.title}
                      icon={CheckCircle}
                      defaultOpen={false}
                    >
                      <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg space-y-3">
                        <p className="text-sm text-muted-foreground">
                          ✓ {item.description}
                        </p>
                        {item.tutorial && (
                          <div className="pt-2 border-t border-green-200 dark:border-green-800">
                            {item.tutorial.link ? (
                              <a
                                href={item.tutorial.link}
                                target={item.tutorial.link.startsWith('http') ? '_blank' : '_self'}
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-xs font-semibold text-green-700 dark:text-green-400 hover:text-green-900 dark:hover:text-green-200 transition-colors"
                              >
                                <BookOpen className="w-3 h-3 mr-1" />
                                {item.tutorial.text}
                                {item.tutorial.link.startsWith('http') && (
                                  <ExternalLink className="w-3 h-3 ml-1" />
                                )}
                              </a>
                            ) : (
                              <span className="inline-flex items-center text-xs font-semibold text-green-700 dark:text-green-400">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {item.tutorial.text}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </CollapsibleSection>
                  ))}
                </CardContent>
              </Card>

              {/* DON'Ts */}
              <Card className="shadow-card border-2 border-red-200 dark:border-red-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-red-600">
                    <XCircle className="w-5 h-5" />
                    <span>DON'T: Critical Rules</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {governanceDonts.map((item, idx) => (
                    <CollapsibleSection
                      key={idx}
                      title={item.title}
                      icon={XCircle}
                      defaultOpen={false}
                    >
                      <p className="text-sm text-muted-foreground bg-red-50 dark:bg-red-950 p-3 rounded-lg">
                        ✗ {item.description}
                      </p>
                    </CollapsibleSection>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Verification Steps */}
        <section className="py-12 bg-secondary/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-6 h-6 text-primary" />
                  <span>Always Verify AI Outputs</span>
                </CardTitle>
                <CardDescription>
                  AI can be confidently wrong. Follow these verification steps:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Cross-Reference Facts</h4>
                      <p className="text-sm text-muted-foreground">
                        Verify statistics, dates, and claims against authoritative sources (company docs, official websites, industry reports).
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Apply Your Expertise</h4>
                      <p className="text-sm text-muted-foreground">
                        Does the AI's suggestion make sense for your specific context? You know your customers and processes best.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Consult Subject Matter Experts</h4>
                      <p className="text-sm text-muted-foreground">
                        For critical decisions, run AI outputs by colleagues or specialists in that area.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Test with Multiple Prompts</h4>
                      <p className="text-sm text-muted-foreground">
                        If something seems off, rephrase your question and see if you get consistent answers.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Department Use Cases */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-heading font-bold text-foreground">
                Responsible AI by Department
              </h2>
              <p className="text-muted-foreground">
                See how to use AI responsibly in your role
              </p>
            </div>

            <div className="space-y-6">
              {departmentExamples.map((dept, idx) => (
                <UseCaseCard
                  key={idx}
                  title={dept.title}
                  icon={dept.icon}
                  color={dept.color}
                  iconColor={dept.iconColor}
                  description={dept.description}
                  examples={dept.examples}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-12 bg-gradient-to-r from-primary/5 via-secondary/20 to-accent/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-heading font-bold text-foreground">
                Additional Resources
              </h2>
              <p className="text-muted-foreground">
                Dive deeper into AI governance and compliance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource, idx) => {
                const Icon = resource.icon;
                return (
                  <Card 
                    key={idx}
                    className="shadow-card hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/30"
                    onClick={() => window.open(resource.link, resource.type === 'external' ? '_blank' : '_self')}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Icon className="w-8 h-8 text-primary" />
                        {resource.type === 'external' && (
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        )}
                        {resource.type === 'internal' && (
                          <Download className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <QuizComponent 
              questions={quizQuestionsModule2} 
              moduleId={2}
              moduleName="Governance & Responsible AI Use"
            />
          </div>
        </section>

        {/* Next Steps */}
        <section className="py-12 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl font-heading font-bold text-foreground">
              🎉 Great Job on Completing Module 2!
            </h2>
            <p className="text-lg text-muted-foreground">
              You now understand how to use AI responsibly and in compliance with our policies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/training')}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Back to Training Hub
              </Button>
              <Button 
                size="lg"
                className="bg-accent hover:bg-accent/90"
                disabled
              >
                Module 3: Coming Soon <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <div className="pt-6 border-t mt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Download useful resources:
              </p>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => window.open('/ai-governance-policy.pdf', '_self')}
              >
                <Download className="w-4 h-4 mr-2" />
                AI Governance Checklist
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
