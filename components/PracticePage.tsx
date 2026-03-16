import React, { useState } from 'react';
import LabEnvironment from './LabEnvironment';
import CompletionPage from './CompletionPage';

interface Category {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Lab {
  id: string;
  title: string;
  focus: string;
  time: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const CATEGORIES: Category[] = [
  {
    id: 'logs',
    title: 'Log Analysis',
    description: 'Master log ingestion, parsing, and correlation across multi-source security telemetry.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    id: 'network',
    title: 'Network Traffic Inspection',
    description: 'Protocol-level analysis for identifying command and control (C2) and data exfiltration.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    )
  },
  {
    id: 'web',
    title: 'Web Vulnerability Identification',
    description: 'Practical discovery of injection flaws, broken access control, and logic vulnerabilities.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  },
  {
    id: 'auth',
    title: 'Authentication & Access Control',
    description: 'Analysis of session management, JWT implementation, and credential security.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    )
  },
  {
    id: 'incident',
    title: 'Incident Investigation',
    description: 'Post-exploitation forensics and timeline reconstruction within compromised hosts.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )
  }
];

const LABS_MOCK: Record<string, Lab[]> = {
  logs: [
    { id: 'log-1', title: 'HTTP Log Ingestion', focus: 'Syslog parsing', time: '15 Mins', difficulty: 'Beginner' },
    { id: 'log-2', title: 'Threat Hunting with SIEM', focus: 'KQL Queries', time: '40 Mins', difficulty: 'Intermediate' },
    { id: 'log-3', title: 'Log Source Manipulation', focus: 'Detection Evasion', time: '30 Mins', difficulty: 'Advanced' }
  ],
  network: [
    { id: 'net-1', title: 'TCP Handshake Analysis', focus: 'Packet Structure', time: '10 Mins', difficulty: 'Beginner' },
    { id: 'net-2', title: 'Detecting Reverse Shells', focus: 'Traffic Patterns', time: '25 Mins', difficulty: 'Intermediate' }
  ],
  web: [
    { id: 'web-1', title: 'SQL Injection Basics', focus: 'Boolean Injection', time: '20 Mins', difficulty: 'Beginner' },
    { id: 'web-2', title: 'IDOR in Private APIs', focus: 'Parameter Fuzzing', time: '30 Mins', difficulty: 'Intermediate' }
  ],
  auth: [
    { id: 'auth-1', title: 'Weak Hashing Analysis', focus: 'Credential Cracking', time: '15 Mins', difficulty: 'Beginner' },
    { id: 'auth-2', title: 'MFA Bypass Logic', focus: 'Session Hijacking', time: '45 Mins', difficulty: 'Advanced' }
  ],
  incident: [
    { id: 'inc-1', title: 'Memory Forensics 101', focus: 'Volatility usage', time: '50 Mins', difficulty: 'Intermediate' }
  ]
};

const PracticePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLaunching, setIsLaunching] = useState<string | null>(null);
  const [activeLab, setActiveLab] = useState<Lab | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);

  const handleLaunch = (lab: Lab) => {
    setIsLaunching(lab.id);
    // Simulate provisioning delay
    setTimeout(() => {
      setIsLaunching(null);
      setActiveLab(lab);
    }, 2000);
  };

  const handleEndLab = () => {
    setActiveLab(null);
  };

  const handleLabComplete = () => {
    setShowCompletion(true);
  };

  const handleCompletionContinue = () => {
    setShowCompletion(false);
    setActiveLab(null);
    // Could automatically select next lab here
  };

  const handleCompletionDashboard = () => {
    setShowCompletion(false);
    setActiveLab(null);
    setSelectedCategory(null);
  };

  const currentCategoryObj = CATEGORIES.find(c => c.id === selectedCategory);
  const currentLabs = selectedCategory ? LABS_MOCK[selectedCategory] || [] : [];

  // Show completion page if lab is completed
  if (showCompletion && activeLab) {
    return (
      <CompletionPage 
        onContinue={handleCompletionContinue}
        onDashboard={handleCompletionDashboard}
        labTitle={activeLab.title}
        pathName={currentCategoryObj?.title + " Path" || "Practice Path"}
        pathProgress={35}
      />
    );
  }

  // Show lab environment if active
  if (activeLab) {
    return (
      <LabEnvironment 
        onEndLab={handleEndLab}
        onComplete={handleLabComplete}
        labTitle={`${activeLab.title} — ${activeLab.focus}`}
      />
    );
  }

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="font-heading text-4xl font-bold text-text-primary mb-3">Practice Environment</h1>
              <p className="text-text-secondary text-lg">Refine individual skills through focused, on-demand labs.</p>
            </div>
            {selectedCategory && (
              <button 
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-2 text-[10px] font-bold text-text-disabled uppercase tracking-widest hover:text-accent transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to Categories
              </button>
            )}
          </div>
          <div className="h-px bg-white/5 w-full mt-10"></div>
        </div>

        {/* Categories View */}
        {!selectedCategory && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((category) => (
              <div 
                key={category.id} 
                className="bg-surface border border-white/5 p-8 rounded-lg group hover:border-accent/30 transition-all duration-300 flex flex-col h-full"
              >
                <div className="text-accent mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
                  {category.icon}
                </div>
                <h3 className="font-heading text-xl font-bold text-text-primary mb-3">{category.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed flex-grow mb-8">{category.description}</p>
                <button 
                  onClick={() => setSelectedCategory(category.id)}
                  className="w-full py-3 bg-surface-soft border border-text-disabled/20 rounded text-[10px] font-bold text-text-primary uppercase tracking-widest hover:bg-accent hover:text-background transition-all"
                >
                  View Labs
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Labs View */}
        {selectedCategory && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-10">
              <div className="text-accent">
                {currentCategoryObj?.icon}
              </div>
              <h2 className="font-heading text-2xl font-bold text-text-primary">
                {currentCategoryObj?.title} Labs
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {currentLabs.map((lab) => (
                <div 
                  key={lab.id} 
                  className="bg-surface border border-white/5 p-6 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/5 transition-colors"
                >
                  <div className="flex-grow w-full md:w-auto">
                    <h4 className="font-bold text-text-primary mb-1">{lab.title}</h4>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                       <div className="flex items-center gap-1.5">
                         <span className="text-[9px] font-bold text-text-disabled uppercase tracking-widest">Skill Focus:</span>
                         <span className="text-[10px] text-text-secondary">{lab.focus}</span>
                       </div>
                       <div className="flex items-center gap-1.5">
                         <span className="text-[9px] font-bold text-text-disabled uppercase tracking-widest">Time:</span>
                         <span className="text-[10px] text-text-secondary">{lab.time}</span>
                       </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest border ${
                      lab.difficulty === 'Beginner' ? 'text-green-500 border-green-500/20 bg-green-500/5' :
                      lab.difficulty === 'Intermediate' ? 'text-accent border-accent/20 bg-accent/5' :
                      'text-red-500 border-red-500/20 bg-red-500/5'
                    }`}>
                      {lab.difficulty}
                    </span>
                    <button 
                      onClick={() => handleLaunch(lab)}
                      disabled={isLaunching !== null}
                      className={`px-6 py-3 font-bold rounded text-[10px] uppercase tracking-widest transition-all min-w-[160px] ${
                        isLaunching === lab.id 
                        ? 'bg-text-disabled/20 text-text-disabled cursor-wait' 
                        : 'bg-accent text-background hover:bg-accent-darker shadow-lg shadow-accent/10 active:scale-95'
                      }`}
                    >
                      {isLaunching === lab.id ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-2 h-2 border border-current border-t-transparent rounded-full animate-spin"></div>
                          Provisioning...
                        </div>
                      ) : 'Launch Practice Lab'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {currentLabs.length === 0 && (
              <div className="py-20 text-center border border-dashed border-white/10 rounded-lg">
                <p className="text-text-disabled uppercase tracking-widest font-bold text-sm">No specialized labs for this category yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Sandbox Notice */}
        <div className="mt-20 p-8 border border-white/5 bg-surface-soft/30 rounded-lg flex flex-col md:flex-row items-center gap-8">
           <div className="p-4 bg-background rounded-full border border-white/5">
              <svg className="w-6 h-6 text-text-disabled" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
           </div>
           <div className="flex-grow">
             <h4 className="text-text-primary font-bold mb-1">Sandbox Environment Policy</h4>
             <p className="text-xs text-text-secondary leading-relaxed">Practice labs are strictly for skill reinforcement and do not affect structured course progress. All lab environments are isolated and destroyed automatically after 60 minutes of inactivity.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PracticePage;
