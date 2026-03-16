import React, { useState, useEffect } from 'react';

interface CompletionPageProps {
  onContinue: () => void;
  onDashboard: () => void;
  labTitle?: string;
  pathName?: string;
  pathProgress?: number;
}

const CompletionPage: React.FC<CompletionPageProps> = ({ 
  onContinue, 
  onDashboard,
  labTitle = "Security Analyst Lab",
  pathName = "Security Analyst Path",
  pathProgress = 25
}) => {
  const [showBadges, setShowBadges] = useState(false);
  const [animateProgress, setAnimateProgress] = useState(0);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowBadges(true), 800);
    setTimeout(() => setShowStats(true), 1200);
    
    const progressTimer = setInterval(() => {
      setAnimateProgress(prev => {
        if (prev >= pathProgress) {
          clearInterval(progressTimer);
          return pathProgress;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(progressTimer);
  }, [pathProgress]);

  const skills = [
    { name: 'Log Analysis Fundamentals', icon: '📊', delay: 0 },
    { name: 'Alert Triage', icon: '🚨', delay: 200 },
    { name: 'Incident Investigation', icon: '🔍', delay: 400 }
  ];

  const stats = [
    { label: 'Tasks Completed', value: '5/5', icon: '✓' },
    { label: 'Accuracy', value: '94%', icon: '◆' },
    { label: 'Environment Interaction', value: 'Excellent', icon: '⚡' }
  ];

  const nextMissions = [
    { title: 'Continue Security Analyst Path', subtitle: 'Next: Network Traffic Analysis', primary: true },
    { title: 'Practice Log Analysis', subtitle: 'Reinforce skills in sandbox' },
    { title: 'Start Next Investigation Lab', subtitle: 'Advanced incident response' }
  ];

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#C7A24D10_0%,transparent_50%)]"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(199, 162, 77, .05) 25%, rgba(199, 162, 77, .05) 26%, transparent 27%, transparent 74%, rgba(199, 162, 77, .05) 75%, rgba(199, 162, 77, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(199, 162, 77, .05) 25%, rgba(199, 162, 77, .05) 26%, transparent 27%, transparent 74%, rgba(199, 162, 77, .05) 75%, rgba(199, 162, 77, .05) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="relative">
              {/* Central Badge */}
              <div className="w-32 h-32 mx-auto relative animate-pulse">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl"></div>
                <div className="relative w-full h-full border-4 border-accent rounded-full flex items-center justify-center bg-surface shadow-2xl shadow-accent/50 animate-spin" style={{ animationDuration: '8s' }}>
                  <svg className="w-16 h-16 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <h1 className="font-heading text-5xl md:text-6xl font-bold text-text-primary mb-4 tracking-tight">
            MISSION <span className="text-accent">COMPLETE</span>
          </h1>
          <p className="text-text-secondary text-xl mb-2">{labTitle} Successfully Finished</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-accent text-sm font-bold uppercase tracking-widest">Operator Status: Active</span>
          </div>
        </div>

        {/* Achievements & Skills Unlocked */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-surface/50 backdrop-blur-sm border border-white/10 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-accent text-xl">🎯</span>
              </div>
              <h2 className="font-heading text-2xl font-bold text-text-primary">New Skills Unlocked</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className={`bg-surface border border-accent/20 rounded-lg p-6 text-center transition-all duration-500 ${
                    showBadges ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${skill.delay}ms` }}
                >
                  <div className="text-4xl mb-3 animate-bounce" style={{ animationDuration: '2s' }}>{skill.icon}</div>
                  <h3 className="text-accent font-bold text-sm mb-2">{skill.name}</h3>
                  <div className="w-full h-1 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progression System */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-surface/50 to-surface-soft/50 backdrop-blur-sm border border-white/10 rounded-lg p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-heading text-xl font-bold text-text-primary">{pathName}</h2>
                <span className="text-accent font-mono font-bold text-2xl">{animateProgress}%</span>
              </div>
              <div className="w-full h-3 bg-background rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-accent to-accent-darker transition-all duration-1000 ease-out relative"
                  style={{ width: `${animateProgress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-background/50 rounded-lg p-4 border border-white/5">
                <div className="text-accent font-mono text-2xl font-bold mb-1">5</div>
                <div className="text-text-disabled text-xs uppercase tracking-widest">Labs Completed</div>
              </div>
              <div className="bg-background/50 rounded-lg p-4 border border-white/5">
                <div className="text-accent font-mono text-2xl font-bold mb-1">12</div>
                <div className="text-text-disabled text-xs uppercase tracking-widest">Skills Acquired</div>
              </div>
              <div className="bg-background/50 rounded-lg p-4 border border-white/5">
                <div className="text-accent font-mono text-2xl font-bold mb-1">4.2h</div>
                <div className="text-text-disabled text-xs uppercase tracking-widest">Time Invested</div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`bg-surface/50 backdrop-blur-sm border border-white/10 rounded-lg p-6 transition-all duration-500 ${
                  showStats ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-text-secondary text-sm">{stat.label}</span>
                  <span className="text-accent text-xl">{stat.icon}</span>
                </div>
                <div className="text-text-primary font-bold text-2xl">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Missions */}
        <div className="max-w-4xl mx-auto mb-8">
          <h2 className="font-heading text-2xl font-bold text-text-primary mb-6 text-center">
            Next Objectives
          </h2>

          <div className="space-y-3">
            {nextMissions.map((mission, index) => (
              <button
                key={index}
                onClick={index === 0 ? onContinue : undefined}
                className={`w-full text-left p-6 rounded-lg border transition-all hover:scale-[1.02] ${
                  mission.primary
                    ? 'bg-accent/10 border-accent/30 hover:bg-accent/20'
                    : 'bg-surface/50 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    mission.primary ? 'bg-accent text-background' : 'bg-white/5 text-accent'
                  }`}>
                    <span className="text-xl">▶</span>
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold mb-1 ${mission.primary ? 'text-accent' : 'text-text-primary'}`}>
                      {mission.title}
                    </h3>
                    <p className="text-text-secondary text-sm">{mission.subtitle}</p>
                  </div>
                  <svg className="w-6 h-6 text-text-disabled" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onContinue}
            className="px-8 py-4 bg-accent text-background font-bold rounded text-sm uppercase tracking-widest hover:bg-accent-darker transition-all shadow-lg shadow-accent/20"
          >
            Proceed to Next Mission
          </button>
          <button
            onClick={onDashboard}
            className="px-8 py-4 bg-surface border border-white/20 text-text-primary font-bold rounded text-sm uppercase tracking-widest hover:bg-white/5 transition-all"
          >
            Return to Dashboard
          </button>
        </div>

        {/* Optional: Share Progress */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <div className="bg-surface/30 backdrop-blur-sm border border-white/5 rounded-lg p-6">
            <h3 className="text-text-primary font-bold mb-3">Share Your Achievement</h3>
            <p className="text-text-secondary text-sm mb-4">You're ahead of 78% of learners at this milestone</p>
            <div className="flex justify-center gap-3">
              <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center">
                <span className="text-text-secondary">🔗</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center">
                <span className="text-text-secondary">📊</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletionPage;
