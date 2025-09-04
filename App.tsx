import React, { useState, useEffect } from 'react';
import { Check, X, ArrowRight, Users, Calendar, Clock, Target, TrendingUp, Zap, AlertTriangle, CheckCircle2, XCircle, Sparkles, Rocket, BarChart3, Globe, ChevronDown } from 'lucide-react';
import ericJanssenPhoto from './Eric Janssen personal photo.jpg';
import salesChaosImage from './photos/sales chaos picture.jpg';
import scrambleToScaleImage from './photos/scramble to scale.jpg';
import liveLearningImage from './photos/live learning.jpg';
import aspirationGoalsImage from './photos/aspiration and goals module.jpg';
import salesStrategyImage from './photos/sales strategy module 2.jpg';
import salesPlanImage from './photos/sales plan module 3.jpg';
import actionModuleImage from './photos/action module 4.jpg';
import experimentationImage from './photos/experimentation module.jpg';
import laptopImage from './photos/laptop.jpg';
import startupSurvivalGuideImage from './photos/startup survival guide.jpg';
import notFailingButFlailingImage from './photos/not failing but flailing.jpg';
import treadmillImage from './photos/treadmill.jpg';

function App() {
  const [checkedProblems, setCheckedProblems] = useState<boolean[]>([false, false, false, false, false]);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [shouldPulse, setShouldPulse] = useState(false);

  // Countdown timer logic - Applications close September 29th, 2024 at 11:59 PM EST
  useEffect(() => {
    const targetDate = new Date('2025-09-29T23:59:59-04:00'); // Applications close September 29th, 2025
    
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Pulse animation for CTA button every 20 seconds
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setShouldPulse(true);
      setTimeout(() => setShouldPulse(false), 2000); // Pulse for 2 seconds
    }, 20000); // Every 20 seconds

    return () => clearInterval(pulseInterval);
  }, []);

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleProblemCheck = (index: number) => {
    const newChecked = [...checkedProblems];
    newChecked[index] = !newChecked[index];
    setCheckedProblems(newChecked);
  };

  const checkedCount = checkedProblems.filter(Boolean).length;

  const getSeverityMessage = () => {
    if (checkedCount === 0) {
      return null; // Don't show anything when no boxes are checked
    } else if (checkedCount <= 2) {
      return { 
        text: "You're on the right track! A few optimizations will unlock your next level of growth.",
        color: "text-green-700", 
        icon: <CheckCircle2 className="h-5 w-5" />,
        bg: "bg-gradient-to-r from-green-50 to-emerald-50"
      };
    } else if (checkedCount <= 3) {
      return { 
        text: "Solid foundations with clear opportunities to systematize for better growth.", 
        color: "text-orange-700", 
        icon: <AlertTriangle className="h-5 w-5" />,
        bg: "bg-gradient-to-r from-orange-50 to-red-50"
      };
    } else {
      return { 
        text: "Major growth potential available through systematic sales optimization.", 
        color: "text-red-700", 
        icon: <AlertTriangle className="h-5 w-5" />,
        bg: "bg-gradient-to-r from-red-50 to-pink-50"
      };
    }
  };

  const severity = getSeverityMessage();

  // October 2024 cohort schedule
  const cohortSchedule = [
    { date: 'Sep 30', day: 'Monday', module: 'Onboarding Session', time: '12:00-13:00', week: 'Pre-Program', type: 'onboarding' },
    { date: 'Oct 7', day: 'Monday', module: 'Module 1: Aspiration & Goals', time: '12:00-14:00', week: 'Week 1', type: 'live' },
    { date: 'Oct 9', day: 'Wednesday', module: 'Office Hours', time: '13:00-14:00', week: 'Week 1', type: 'office' },
    { date: 'Oct 14', day: 'Monday', module: 'Module 2: Sales Strategy', time: '12:00-14:00', week: 'Week 2', type: 'live' },
    { date: 'Oct 16', day: 'Wednesday', module: 'Office Hours', time: '13:00-14:00', week: 'Week 2', type: 'office' },
    { date: 'Oct 21', day: 'Monday', module: 'Module 3: Sales Plan', time: '12:00-14:00', week: 'Week 3', type: 'live' },
    { date: 'Oct 23', day: 'Wednesday', module: 'Office Hours', time: '13:00-14:00', week: 'Week 3', type: 'office' },
    { date: 'Oct 28', day: 'Monday', module: 'Module 4: Action', time: '12:00-14:00', week: 'Week 4', type: 'live' },
    { date: 'Oct 30', day: 'Wednesday', module: 'Office Hours', time: '13:00-14:00', week: 'Week 4', type: 'office' },
    { date: 'Nov 4', day: 'Monday', module: 'Module 5: Experimentation', time: '12:00-14:00', week: 'Week 5', type: 'live' },
    { date: 'Nov 6', day: 'Wednesday', module: 'Final Office Hours', time: '13:00-14:00', week: 'Week 5', type: 'office' },
    { date: 'Nov 11', day: 'Monday', module: 'Offboarding Session', time: '12:00-13:00', week: 'Post-Program', type: 'offboarding' },
  ];

  const isVisible = (sectionId: string) => visibleSections.has(sectionId);

  const openApplicationModal = () => {
    setShowApplicationModal(true);
  };

  const closeApplicationModal = () => {
    setShowApplicationModal(false);
  };

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Application Process Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 pt-20">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-gray-100">
            <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-t-3xl px-6 py-4">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-700/90 rounded-t-3xl"></div>
              <div className="relative flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Join The Cohort</h3>
                  <p className="text-blue-100 text-base mb-0">Your path to systematic sales growth starts here</p>
                </div>
                <button 
                  onClick={closeApplicationModal}
                  className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Process Steps */}
              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: "📝",
                    title: "Submit Your Application",
                    content: "Quick 2-minute application. Tell us about you and your business so we can understand your current situation."
                  },
                  {
                    icon: "⚡",
                    title: "Reviewed Within 24 Hours", 
                    content: "Our team personally reviews every application. If you're a good fit, we'll send you a calendar link. If not, we'll recommend other resources."
                  },
                  {
                    icon: "💬",
                    title: "Exploration Call",
                    content: (
                      <div>
                        <p className="mb-4 text-gray-600">A focused 30-minute conversation where we'll:</p>
                        <ul className="space-y-2 mb-4">
                          <li className="flex items-center text-gray-700">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                            Answer your questions about the program
                          </li>
                          <li className="flex items-center text-gray-700">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                            Map out your potential action plan
                          </li>
                          <li className="flex items-center text-gray-700">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                            Ensure mutual fit for the cohort
                          </li>
                        </ul>
                        <p className="text-gray-600">If we're aligned, we'll secure your spot with a deposit.</p>
                      </div>
                    )
                  },
                  {
                    icon: "🚀",
                    title: "Join the Cohort",
                    content: "Welcome to the program! You'll receive your official invitation, calendar holds for all sessions, and onboarding materials. The October 2025 cohort begins October 6th."
                  }
                ].map((step, index) => (
                  <div key={index} className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                    <button
                      onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-100/50 transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center text-base mr-5 shadow-lg">
                          {step.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h4>
                          <div className="text-xs text-gray-500">Step {index + 1} of 4</div>
                        </div>
                      </div>
                      <div className={`transform transition-transform duration-300 ${expandedStep === index ? 'rotate-180' : ''}`}>
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    {expandedStep === index && (
                      <div className="px-6 pb-6 border-t border-gray-200/50">
                        <div className="ml-14 pt-4 text-gray-700 leading-relaxed">
                          {typeof step.content === 'string' ? <p>{step.content}</p> : step.content}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Modern CTA */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-100">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Ready to Transform Your Sales?</h4>
                  <p className="text-gray-600">Join 25 ambitious founders in the October 2025 cohort</p>
                </div>
                <a 
                  href="https://forms.gle/AZWhLrTiBKuMev4J6"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-2xl text-base font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 inline-flex items-center justify-center group"
                >
                  Start Your Application Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <p className="text-center text-xs text-gray-500 mt-2">
                  Applications close September 29th • Limited spots available
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">The Founder Sales Sprint</h1>
          </div>
          <div>
            <button 
              onClick={openApplicationModal}
              className={`inline-flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all duration-300 ${
                shouldPulse ? 'animate-pulse' : ''
              }`}
              style={{
                animation: shouldPulse ? 'pulse-cta 0.8s ease-in-out 3' : undefined
              }}
            >
              Join the Cohort
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-20">
        {/* Subtle animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-10 right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15" 
            style={{ 
              animation: 'float 8s ease-in-out infinite',
              animationDelay: '0s'
            }}
          ></div>
          <div 
            className="absolute bottom-32 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-28" 
            style={{ 
              animation: 'floatReverse 10s ease-in-out infinite',
              animationDelay: '2s'
            }}
          ></div>
          <div 
            className="absolute top-32 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-27" 
            style={{ 
              animation: 'floatSlow 12s ease-in-out infinite',
              animationDelay: '4s'
            }}
          ></div>
          <div 
            className="absolute top-1/2 right-1/4 w-40 h-40 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-26" 
            style={{ 
              animation: 'floatGentle 7s ease-in-out infinite',
              animationDelay: '1s'
            }}
          ></div>
          <div 
            className="absolute top-20 left-1/4 w-56 h-56 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" 
            style={{ 
              animation: 'floatWide 15s ease-in-out infinite',
              animationDelay: '8s'
            }}
          ></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="pt-2 pb-16 sm:pt-4 sm:pb-20">
            <div 
              className={`relative z-10 text-center max-w-4xl mx-auto transition-all duration-1000 ${
                isVisible('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              data-animate
              id="hero"
            >
              <div className="inline-flex items-center bg-blue-50 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-blue-200">
                <Sparkles className="h-4 w-4 mr-2" />
                Transform Your Sales in 5 Weeks
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
                The Founder
                <span className="text-blue-600"> Sales Sprint</span>
              </h1>
              <p className="text-lg text-gray-500 italic mb-8">with Eric Janssen</p>
              <p className="text-xl sm:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                A 5-week guided intensive to help founders grow their business by creating an intentional sales strategy and repeatable sales process
              </p>
              
              {/* Enhanced Countdown Timer */}
              <div className="mb-12">
                <div className="text-gray-800 text-base mb-4">Applications close in:</div>
                <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto mb-3">
                  {[
                    { value: timeLeft.days, label: 'Days' },
                    { value: timeLeft.hours, label: 'Hours' },
                    { value: timeLeft.minutes, label: 'Minutes' },
                    { value: timeLeft.seconds, label: 'Seconds' }
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <div className="text-2xl font-bold text-gray-900">{item.value.toString().padStart(2, '0')}</div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 font-medium">{item.label}</div>
                    </div>
                  ))}
                </div>
                <div className="text-gray-600 text-sm">Cohort starts October 6th • Limited to 25 founders</div>
              </div>

              <button 
                onClick={openApplicationModal}
                className={`inline-flex items-center bg-blue-600 text-white px-10 py-5 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer ${
                  shouldPulse ? 'animate-pulse' : ''
                }`}
                style={{
                  animation: shouldPulse ? 'pulse-cta 0.8s ease-in-out 3' : undefined
                }}
              >
                Join the Cohort
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Sales Letter */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div 
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              isVisible('video') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            data-animate
            id="video"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              See How The Founder Sales Sprint Works
            </h2>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe 
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/WtIMMAiDbsY?si=J8rycja6hRZKbfpO" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              />
            </div>
            </div>
          </div>
      </section>

      {/* Marketing Copy Section - Minimalist */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center space-y-16">
            {/* Main narrative flow */}
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl sm:text-4xl font-normal text-gray-700 leading-tight">
                For founders, sales isn't optional.
                <br />
                <span className="text-gray-800 font-bold">It's survival.</span>
              </h2>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>You know this. You're living it.</p>
                <p>90% of your time is spent selling—to customers, investors, employees, yourself.</p>
              </div>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>You're winging it.</p>
                <p>Every pitch is improvised. Every deal is a mystery.</p>
                <p>Some months you're brilliant. Others you're questioning everything.</p>
              </div>
              
              <p className="text-xl text-gray-700 font-normal italic pt-4">
                Not failing, but flailing.
              </p>
            </div>
            
            {/* Image */}
            <div className="flex justify-center">
              <img 
                src={notFailingButFlailingImage}
                alt="Not failing, but flailing" 
                className="max-w-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reality section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 italic mb-8">REALITY:</h2>
              <p className="text-3xl sm:text-4xl text-gray-900 leading-relaxed">
                Revenue growth is the <span className="underline decoration-4 decoration-blue-600">outcome</span> of proper 
                customer selection, and selling systems, 
                not only sales efforts.*
              </p>
            </div>
            <div className="mt-12">
              <p className="text-lg text-gray-600">
                *#truth...we've (literally) seen this hundreds of times
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sales Problem Assessment */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div 
            className={`bg-gray-50 rounded-2xl p-12 border border-gray-200 max-w-4xl mx-auto transition-all duration-1000 delay-400 ${
              isVisible('assessment') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            data-animate
            id="assessment"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">The Top 5 Signs You Have a Sales Problem</h3>
            <div className="space-y-6 mb-8">
              {[
                'Growth plateau despite having product-market fit',
                'Over reliance on the founder for all sales activities',
                '"Lumpy" pipeline (some great months, some not so great)',
                'No documented, repeatable sales processes',
                'Unsure what actions to take to grow sales'
              ].map((item, index) => (
                <div key={index} className="flex items-start group cursor-pointer hover:bg-gray-50 p-4 rounded-xl transition-all" onClick={() => handleProblemCheck(index)}>
                  <div className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 mr-4 mt-0.5 transition-all ${
                    checkedProblems[index] 
                      ? 'bg-red-500 border-red-500' 
                      : 'border-gray-300 hover:border-red-500'
                  }`}>
                    {checkedProblems[index] && <Check className="h-4 w-4 text-white m-0.5" />}
                  </div>
                  <span className={`text-lg transition-colors ${
                    checkedProblems[index] ? 'text-red-600 font-medium' : 'text-gray-700 group-hover:text-gray-900'
                  }`}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Enhanced Severity Assessment - Only show when boxes are checked */}
            {severity && (
              <div className={`p-8 rounded-xl border-2 transition-all duration-500 transform ${
                checkedCount > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } ${severity.bg} ${
                checkedCount <= 2 ? 'border-green-300' :
                checkedCount <= 3 ? 'border-orange-300' :
                'border-red-300'
              }`}>
                <div className="flex items-center justify-center">
                  {severity.icon && <span className={`mr-3 ${severity.color}`}>{severity.icon}</span>}
                  <span className={`text-lg font-semibold ${severity.color}`}>
                    {severity.text}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Solution Overview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div 
            className={`text-center mb-20 transition-all duration-1000 delay-200 ${
              isVisible('solution') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            data-animate
            id="solution"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
              Over 5 weeks, we help you go from <span className="text-blue-600">Scramble to System</span>
            </h2>
            <div className="my-12">
              <img 
                src={scrambleToScaleImage}
                alt="Scramble to Scale" 
                className="mx-auto rounded-xl max-w-2xl w-full"
              />
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
              "If you can't describe what you are doing as a process, you don't know what you're doing." - W. Edwards Deming
            </p>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div 
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible('program') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            data-animate
            id="program"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              The <span className="text-blue-600">Founder Sales Sprint</span>
            </h2>
            <div className="mb-12">
              <img 
                src={laptopImage}
                alt="The Founder Sales Sprint" 
                className="mx-auto rounded-xl max-w-2xl w-full"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-gray-600 text-lg">
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">5 weeks</span>
              <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-medium">25 founder cohort</span>
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">Live virtual sessions</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
            {[
              'Learn the Founder Selling System through live virtual sessions',
              'Weekly office hours with GTM experts for feedback and Q&A',
              'Implementation sprints to apply what you learn immediately',
              'Taught by award-winning faculty',
              'Supported by a curated community of growth-minded founders'
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`flex items-start transition-all duration-700 ${
                  isVisible('program') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          {/* Enhanced Modules */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">What We'll Cover: The 5-Module System</h3>
            
            {[
              {
                number: '01',
                title: 'Aspiration & Goals',
                subtitle: 'Know where you (really) are and where you\'re going.',
                description: 'We\'ll begin with a diagnostic of your current sales system and a deep dive into your financial and personal goals. From there, we\'ll use our proprietary tool to highlight the specific gaps between where you are and where you want to go — so you can start making data-driven decisions.',
                deliverable: 'A clear revenue goal, visibility into your current sales performance, and a diagnostic snapshot showing what needs to change to close the gap.',
                color: 'bg-blue-600',
                image: aspirationGoalsImage
              },
              {
                number: '02',
                title: 'Sales Strategy',
                subtitle: 'Get clarity on who your best customers really are.',
                description: 'Using our proprietary GROW framework, you\'ll analyze real customer data and team insights to identify your ideal customer profile. You\'ll validate who\'s worth serving, who\'s not, and set the foundation for messaging that resonates.',
                deliverable: 'A validated Ideal Customer Playbook outlining your key segments, how to serve or phase them out, and insights to power the next phase.',
                color: 'bg-indigo-600',
                image: salesStrategyImage
              },
              {
                number: '03',
                title: 'The Message Stack',
                subtitle: 'Build messaging that resonates.',
                description: 'In this module, you\'ll use our proprietary Message Stack™ framework to craft clear, compelling messaging rooted in real customer pain. You\'ll map your product\'s table stakes and signature moves, then connect them to emotional and functional benefits that matter to your ideal customer.',
                deliverable: 'A usable core message you can deploy across your site, sales deck, and outreach. Built from real insight, not guesswork.',
                color: 'bg-blue-600',
                image: salesPlanImage
              },
              {
                number: '04',
                title: 'Action',
                subtitle: 'Master the moments that make or break deals.',
                description: 'Using our proprietary Moments Map™, you\'ll identify the critical conversations, turning points, and customer commitments that move deals forward. This module sets the foundation for designing your repeatable sales process.',
                deliverable: 'A sales process outline and annotated map of your critical sales moments, with best practices to guide future implementation.',
                color: 'bg-indigo-600',
                image: actionModuleImage
              },
              {
                number: '05',
                title: 'Experimentation',
                subtitle: 'Audit, refine, and prepare to scale what works.',
                description: 'In this final module, you\'ll shift from planning to execution. With your full sales process mapped, you\'ll identify high-leverage actions, draft your growth hypotheses, and begin testing your system in the real world. This is where your playbook gets sharpened and your sales process starts to scale.',
                deliverable: 'A documented test plan, updated sales materials based on signal, and a draft sales playbook grounded in what\'s working (and what\'s not).',
                color: 'bg-blue-600',
                image: experimentationImage
              }
            ].map((module, index) => (
              <div 
                key={index} 
                className={`bg-gray-50 rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-700 ${
                  isVisible('program') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${800 + index * 200}ms` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 ${module.color} text-white rounded-xl flex items-center justify-center text-xl font-bold`}>
                      {module.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    {module.image && (
                      <div className="mb-6">
                        <img 
                          src={module.image} 
                          alt={`${module.title} module`}
                          className="w-full max-w-md mx-auto rounded-lg"
                        />
                      </div>
                    )}
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">{module.title}</h4>
                    <p className="text-lg font-semibold mb-4 text-blue-600">{module.subtitle}</p>
                    <p className="text-gray-600 mb-6 leading-relaxed">{module.description}</p>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-sm font-semibold mb-2 text-blue-600">DELIVERABLES:</p>
                      <p className="text-sm text-gray-700">{module.deliverable}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Enhanced Bonus Module */}
            <div 
              className={`bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-3xl p-8 shadow-2xl transition-all duration-1000 ${
                isVisible('program') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: '1800ms' }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-white/20 text-white rounded-xl flex items-center justify-center text-sm font-bold">
                    BONUS
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold mb-2">Implementation</h4>
                  <p className="text-lg text-white/90 font-semibold mb-4">Turn your playbook into a sales machine.</p>
                  <p className="text-white/80 mb-6 leading-relaxed">You've built the blueprint, now it's time to bring it to life. In this optional phase, our trusted implementation partners can help you operationalize your playbook and automate your sales process. From CRM setup to email sequences, lead scoring, and pipeline automation, we'll connect you with experts who can configure everything to your exact specifications.</p>
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-sm font-semibold text-white/90 mb-2">DELIVERABLES:</p>
                    <p className="text-sm text-white/80">Implementation-ready sales playbook + referral to vetted automation partners.</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 mt-4">
                    <p className="text-sm text-white/80 italic">Automate the predictable elements of your process, so you can focus on high-impact selling.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes After Sprint */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div 
            className={`text-center mb-20 transition-all duration-1000 delay-200 ${
              isVisible('outcomes') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            data-animate
            id="outcomes"
          >
            <div className="max-w-3xl mx-auto mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                After completing The Founder Sales Sprint, you'll be confidently:
              </h3>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              { icon: Target, title: 'Earning the attention of your ideal buyers', color: 'bg-blue-600' },
              { icon: Users, title: 'Conducting sales meetings intentionally', color: 'bg-indigo-600' },
              { icon: TrendingUp, title: 'Presenting solutions that align with priorities', color: 'bg-blue-600' },
              { icon: Check, title: 'Gaining commitment and maintaining momentum', color: 'bg-indigo-600' },
              { icon: BarChart3, title: 'Consistent, predictable revenue growth', color: 'bg-blue-600' }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`flex items-center p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 ${
                  isVisible('outcomes') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <div className={`flex-shrink-0 w-16 h-16 ${item.color} rounded-xl flex items-center justify-center mr-6`}>
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 text-left">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Summary Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div 
            className={`max-w-6xl mx-auto transition-all duration-1000 ${
              isVisible('summary') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            data-animate
            id="summary"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Title and Description */}
              <div className="lg:col-span-1">
                <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
                  The Founder Sales Sprint
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  The only founder-focused sales school that provides a clear, structured path to predictable revenue growth.
                </p>
              </div>

              {/* Middle Column - After the sprint you'll be */}
              <div className="lg:col-span-1">
                <h3 className="text-xl font-bold text-gray-900 mb-6">After the sprint you'll be:</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700">Earning the attention of your ideal buyers</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700">Conducting sales meetings intentionally</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700">Presenting solutions that align with your customers priorities</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700">Gaining commitment and maintaining momentum on deals</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700">Producing consistent, predictable revenue growth</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Pricing */}
              <div className="lg:col-span-1">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Pricing:</h3>
                <div className="space-y-4">
                  <div className="text-4xl font-bold text-gray-900">$7,500</div>
                  <p className="text-gray-700">If you don't get 10x the value that you pay, we'll refund your tuition.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Time Commitment - October Calendar */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div 
            className={`max-w-6xl mx-auto transition-all duration-1000 ${
              isVisible('schedule') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            data-animate
            id="schedule"
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">October 2025 Cohort Schedule</h2>
            
            {/* Detailed Schedule */}
            <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden mb-12">
              <div className="bg-blue-600 px-6 py-4">
                <h4 className="font-semibold text-white">Complete Session Schedule</h4>
              </div>
              
              {/* Mobile Layout - Card Style */}
              <div className="block md:hidden divide-y divide-gray-200">
                {cohortSchedule.map((session, index) => {
                  const getBorderColor = () => {
                    if (session.type === 'onboarding') return 'border-green-600';
                    if (session.type === 'offboarding') return 'border-purple-600';
                    if (session.type === 'live') return 'border-blue-600';
                    return 'border-indigo-600';
                  };

                  return (
                    <div 
                      key={index} 
                      className={`p-4 hover:bg-white transition-all duration-300 border-l-4 ${getBorderColor()} ${
                        isVisible('schedule') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                      }`}
                      style={{ transitionDelay: `${400 + index * 100}ms` }}
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-bold text-gray-900 text-lg">{session.date}</div>
                            <div className="text-sm text-gray-500">{session.day}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-blue-600">{session.week}</div>
                            <div className="text-sm text-gray-600">{session.time}</div>
                          </div>
                        </div>
                        <div className="pt-2">
                          <div className="font-semibold text-gray-900 text-base leading-tight">{session.module}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop Layout - Table Style */}
              <div className="hidden md:block divide-y divide-gray-200">
                {cohortSchedule.map((session, index) => {
                  const getBorderColor = () => {
                    if (session.type === 'onboarding') return 'border-green-600';
                    if (session.type === 'offboarding') return 'border-purple-600';
                    if (session.type === 'live') return 'border-blue-600';
                    return 'border-indigo-600';
                  };

                  return (
                    <div 
                      key={index} 
                      className={`p-6 flex items-center justify-between hover:bg-white transition-all duration-300 border-l-4 ${getBorderColor()} ${
                        isVisible('schedule') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                      }`}
                      style={{ transitionDelay: `${400 + index * 100}ms` }}
                    >
                      <div className="flex items-center space-x-6">
                        <div className="text-center min-w-[80px]">
                          <div className="font-bold text-gray-900">{session.date}</div>
                          <div className="text-sm text-gray-500">{session.day}</div>
                        </div>
                        <div className="text-center min-w-[120px]">
                          <div className="text-sm font-medium text-blue-600">{session.week}</div>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{session.module}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{session.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="text-center mt-4">
                <p className="text-gray-600 italic text-sm">All times are EST. This is an intensive, hands-on program requiring active participation.</p>
              </div>
            </div>

            {/* Weekly Time Commitment Breakdown */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Weekly Time Commitment Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
                  <Calendar className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                  <div className="font-semibold text-gray-900">Live Sessions</div>
                  <div className="text-gray-600">Mondays 12:00-14:00</div>
                  <div className="text-sm text-blue-600 mt-1 font-medium">2 hours</div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
                  <Clock className="h-10 w-10 text-indigo-600 mx-auto mb-3" />
                  <div className="font-semibold text-gray-900">Office Hours</div>
                  <div className="text-gray-600">Wednesdays 13:00-14:00</div>
                  <div className="text-sm text-indigo-600 mt-1 font-medium">1 hour</div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
                  <Target className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                  <div className="font-semibold text-gray-900">Implementation</div>
                  <div className="text-gray-600">Between sessions</div>
                  <div className="text-sm text-blue-600 mt-1 font-medium">3-5 hours</div>
                </div>
              </div>
              <div className="text-center bg-blue-600 text-white rounded-xl p-6">
                <div className="text-3xl font-bold mb-1">6-8 hours</div>
                <div className="text-white/90">Total Weekly Commitment</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Who This Is For */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Enhanced Who it's for */}
            <div 
              className={`relative transition-all duration-1000 delay-200 ${
                isVisible('qualification') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              data-animate
              id="qualification"
            >
              <div className="bg-white rounded-2xl border border-gray-200 h-full shadow-sm">
                <div className="bg-green-50 rounded-t-2xl px-6 py-4 border-b border-green-200">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mr-3" />
                    <h3 className="text-lg font-bold text-green-700">Who Did We Build This Program For?</h3>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  {[
                    {
                      title: 'Founders with proven product-market fit',
                      description: 'You\'ve achieved at least $100k in revenue and know customers want what you\'re selling'
                    },
                    {
                      title: 'Leaders ready to systematize beyond founder-led sales',
                      description: 'You\'re tired of every deal requiring your personal involvement and want to build scalable processes'
                    },
                    {
                      title: 'Growth-focused entrepreneurs hitting a plateau',
                      description: 'Your current sales approach got you here, but you need a structured system to reach your next revenue milestone'
                    },
                    {
                      title: 'Founders committed to implementation',
                      description: 'You\'re willing to dedicate 6-10 hours per week to building and applying what you learn, not just consuming theory'
                    },
                    {
                      title: 'Business owners planning to scale or exit',
                      description: 'You want to create a sales engine that runs without you, whether for delegation, investment, or eventual sale'
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <div className="font-bold text-gray-900 text-base mb-1">{item.title}</div>
                        <div className="text-gray-600 text-sm leading-relaxed">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Who it's not for */}
            <div 
              className={`relative transition-all duration-1000 delay-400 ${
                isVisible('qualification') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              <div className="bg-white rounded-2xl border border-gray-200 h-full shadow-sm">
                <div className="bg-red-50 rounded-t-2xl px-6 py-4 border-b border-red-200">
                  <div className="flex items-center">
                    <XCircle className="h-6 w-6 text-red-600 mr-3" />
                    <h3 className="text-lg font-bold text-red-700">Who is This NOT For?</h3>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  {[
                    {
                      title: 'Pre-PMF founders still searching for market fit',
                      description: 'If you\'re still validating your product or have less than $50k in revenue, focus on finding PMF first'
                    },
                    {
                      title: 'Enterprise sales teams or large sales organizations',
                      description: 'This methodology is built for founder-scale businesses, not complex enterprise sales structures'
                    },
                    {
                      title: 'Founders who can\'t commit to implementation',
                      description: 'If you\'re too busy firefighting to dedicate time to doing the work, wait until you have bandwidth'
                    },
                    {
                      title: 'Leaders looking for a quick fix or magic bullet',
                      description: 'This program requires 6-10 hours per week of real work; if you want overnight results without effort, look elsewhere'
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <X className="h-4 w-4 text-red-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <div className="font-bold text-gray-900 text-base mb-1">{item.title}</div>
                        <div className="text-gray-600 text-sm leading-relaxed">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Instructor */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div 
            className={`max-w-4xl mx-auto transition-all duration-1000 ${
              isVisible('instructor') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            data-animate
            id="instructor"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet the Teacher</h2>
            </div>

              <div className="flex flex-col lg:flex-row">
                {/* Photo Section */}
                <div className="lg:w-1/3 p-8 flex items-center justify-center">
                  <img 
                    src={ericJanssenPhoto} 
                    alt="Eric Janssen" 
                    className="w-80 h-96 rounded-xl object-cover shadow-lg"
                  />
                </div>
                
                {/* Content Section */}
                <div className="lg:w-2/3 p-8">
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">Eric Janssen</h3>
                    <p className="text-xl text-blue-600 font-semibold mb-6">Founder, The Founder Sales Sprint</p>
                    
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>After spending years as a <strong className="text-gray-900">founder, early employee, and Chief Revenue Officer</strong>, I realized a glaring gap: <em className="text-blue-600 font-medium">no one teaches founders how to sell</em>, despite sales being mission-critical.</p>
                      
                      <p>Frustrated by the lack of real, practical sales education—<span className="text-red-600 font-medium">only fluff, theory, or unicorn stories</span>—I built my own sales systems and tested them in real ventures.</p>
                      
                      <p>When I shared these systems with other founders, <strong className="text-green-600">the demand for help exploded</strong>.</p>
                      
                      <p className="text-lg font-semibold text-gray-900 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                        Now I'm on a mission to give founders the tools to sell with confidence and scale beyond themselves.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-8 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <Rocket className="h-5 w-5 mr-2" />
                    Current:
                  </h4>
                  <ul className="space-y-2 text-blue-700">
                    <li>Lecturer at Ivey Business School</li>
                    <li>Limited Partner, Stage 2 Capital</li>
                    <li>Podcast Host, Morrissette Institute</li>
                  </ul>
                </div>
                <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
                  <h4 className="font-semibold text-indigo-900 mb-3 flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    Previous:
                  </h4>
                  <ul className="space-y-2 text-indigo-700">
                    <li>CRO, Intellitix</li>
                    <li>Co-Founder, JM Security Canada</li>
                    <li>Founder, BizInc Incubator</li>
                  </ul>
                </div>
              </div>
              </div>
            </div>
            </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to know about The Founder Sales Sprint</p>
          </div>
          
          <div className="space-y-4">
            <FAQItem 
              question="Do I need prior sales experience?"
              answer="No. Most founders in the program are technical with little to no professional sales experience."
            />
            
            <FAQItem 
              question="How is this different from other sales training?"
              answer="This isn't a generic sales course. It's built from frameworks tested with 1,000+ students and real founder-led companies. We don't just teach theory — we give you a playbook and help you implement it in your business. We will be building together throughout this program rather than just give you a plan to implement on your own."
            />
            
            <FAQItem 
              question="What's the time commitment?"
              answer="One live session per week (90 minutes), plus optional office hours. You'll also spend ~2–3 hours applying the material directly to your business."
            />
            
            <FAQItem 
              question="What outcomes should I expect?"
              answer="By the end of the Sprint, you'll have a clear ICP, sharpened value proposition, structured sales process, and a sales math model showing exactly what's required to hit your revenue goals."
            />
            
            <FAQItem 
              question="Can my co-founder or sales lead join?"
              answer="Yes. The program is founder-led, but upon request we allow an additional teammate to join so you can implement together."
            />
            
            <FAQItem 
              question="How are classes structured?"
              answer="While remote, these aren't pre-recorded videos you watch alone in your basement on 2x speed. They are live, highly interactive classes with a cohort of other founders looking to master their sales skills just like you. Each session includes real-time Q&A, group exercises, and personalized coaching to help you build your custom sales playbook."
            />
            
            <FAQItem 
              question="What if I have questions about the content?"
              answer={
                <div className="space-y-4">
                  <p>Since this is a live class, you'll get answers to your questions immediately and in real-time. You can also attend office hours after the course to receive 1:1 guidance and coaching from your instructor, Eric Janssen. Or, bounce your ideas off of others in your cohort in our community.</p>
                  <p>In short, no question will go unanswered.</p>
                </div>
              }
            />
            
            <FAQItem 
              question="Do you offer discounts or scholarships?"
              answer={
                <p>
                  If you're still early and the cost feels like a stretch, we offer scholarships as a path to join the Founder Sales Sprint at a price that works for where you are at right now. To apply for financial support, please{' '}
                  <a href="https://forms.gle/6JayMnA2gYJi9Uv67" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">
                    apply here
                  </a>.
                </p>
              }
            />
            
            <FAQItem 
              question="How do I know if this is a good fit?"
              answer="This program is designed for founders who know a thing or two about sales (and have had some exposure to sales) but are ready to really level up their game. If you're struggling to scale your sales process, convert leads consistently, or build a repeatable sales system, this sprint will give you the frameworks and playbook you need."
            />
          </div>
        </div>
      </section>

      {/* Text Sections Moved to Bottom */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-8 sm:px-12 lg:px-16 text-center">
          <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-12 leading-tight">
            Most startups fail, not because they can't build, but because they never figure out how to sell.
          </h2>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-8 sm:px-12 lg:px-16 text-center">
          <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-8 leading-tight">
            It's time to fix your founder sales chaos.
          </h2>
        </div>
        {/* Downward Arrow */}
        <div className="flex justify-center mt-12">
          <div className="animate-bounce">
            <svg
              className="w-8 h-8 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Enhanced Final CTA */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <div 
            className={`transition-all duration-1000 ${
              isVisible('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            data-animate
            id="cta"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">Join The Founder Sales Sprint</h2>
            <p className="text-xl text-gray-300 mb-2 italic">
              This exclusive cohort is limited to 25 ambitious founders.
            </p>
            <p className="text-2xl text-gray-300 font-semibold mb-12">
              Class starts October 6th.
            </p>
            
            <div className="mb-8">
              <p className="text-xl text-gray-300 mb-2">Ready to get started?</p>
              <p className="text-lg text-gray-400">
                <a 
                  href="https://forms.gle/AZWhLrTiBKuMev4J6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center bg-blue-600 text-white px-10 py-5 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                    shouldPulse ? 'animate-pulse' : ''
                  }`}
                  style={{
                    animation: shouldPulse ? 'pulse-cta 0.8s ease-in-out 3' : undefined
                  }}
                >
                  Submit your application
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// FAQ Component
function FAQItem({ question, answer }: { question: string; answer: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200/60 overflow-hidden backdrop-blur-sm">
      <button
        className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-900 transition-colors pr-4">{question}</h3>
        <ChevronDown 
          className={`w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-all duration-300 flex-shrink-0 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-8 pb-6 border-t border-gray-100">
          <div className="pt-4 text-gray-700 leading-relaxed">
            {typeof answer === 'string' ? <p>{answer}</p> : answer}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;