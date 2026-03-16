import React, { useState } from 'react';
import LabEnvironment from './LabEnvironment';
import CompletionPage from './CompletionPage';

const LearnTab: React.FC<{ label: string, active: boolean, onClick: () => void }> = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${
      active ? 'text-accent border-accent' : 'text-text-disabled border-transparent hover:text-text-primary'
    }`}
  >
    {label}
  </button>
);

const RoadmapStep: React.FC<{ 
  number: string, 
  title: string, 
  description: string, 
  tooltip: string,
  isLast?: boolean 
}> = ({ number, title, description, tooltip, isLast }) => (
  <div className="flex gap-8 group relative">
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center text-accent text-xs font-bold font-mono group-hover:bg-accent/10 transition-colors cursor-help">
          {number}
        </div>
        {/* Tooltip */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-surface-soft border border-accent/20 rounded text-[10px] text-text-primary font-bold uppercase tracking-wider text-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all pointer-events-none z-50 shadow-xl shadow-black/50">
          {tooltip}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-surface-soft"></div>
        </div>
      </div>
      {!isLast && <div className="w-px flex-grow bg-accent/20 my-2"></div>}
    </div>
    <div className="pb-12 pt-1">
      <h3 className="text-text-primary font-bold text-lg mb-2 tracking-tight group-hover:text-accent transition-colors">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed max-w-lg">{description}</p>
    </div>
  </div>
);

const RoleTrack: React.FC<{ 
  title: string, 
  description: string, 
  paths: string[], 
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced',
  onClick?: (title: string) => void
}> = ({ title, description, paths, difficulty, onClick }) => {
  const diffColor = {
    'Beginner': 'text-green-500 bg-green-500/10 border-green-500/20',
    'Intermediate': 'text-accent bg-accent/10 border-accent/20',
    'Advanced': 'text-red-500 bg-red-500/10 border-red-500/20'
  }[difficulty];

  return (
    <div 
      className="bg-surface border border-white/5 rounded-lg p-8 flex flex-col h-full hover:border-accent/30 transition-all duration-300 cursor-pointer group"
      onClick={() => onClick?.(title)}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-heading text-xl font-bold text-text-primary group-hover:text-accent transition-colors">{title}</h3>
        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border ${diffColor}`}>
          {difficulty}
        </span>
      </div>
      <p className="text-text-secondary text-sm mb-6 leading-relaxed flex-grow">{description}</p>
      
      <div className="space-y-3 mb-8">
        <div className="text-[10px] font-bold text-text-disabled uppercase tracking-widest">Core Learning Paths</div>
        {paths.map((path, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-text-primary">
            <svg className="w-3 h-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
            </svg>
            {path}
          </div>
        ))}
      </div>

      <button className="w-full py-3 bg-surface-soft border border-text-disabled/20 rounded text-[10px] font-bold uppercase tracking-widest group-hover:bg-accent group-hover:text-background transition-all">
        Explore Track
      </button>
    </div>
  );
};

const LearnPage: React.FC<{ onBackToHome: () => void, onTrackClick?: (title: string) => void }> = ({ onBackToHome, onTrackClick }) => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [showLab, setShowLab] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const tabs = ['Overview', 'Learning Paths', 'Modules', 'Guided Walkthroughs', 'Practice Environments'];

  const handleLabComplete = () => {
    setShowLab(false);
    setShowCompletion(true);
  };

  const handleCompletionContinue = () => {
    setShowCompletion(false);
  };

  const handleCompletionDashboard = () => {
    setShowCompletion(false);
    onBackToHome();
  };

  if (showCompletion) {
    return (
      <CompletionPage 
        onContinue={handleCompletionContinue}
        onDashboard={handleCompletionDashboard}
        labTitle="Foundation Lab"
        pathName="Security Analyst Path"
        pathProgress={25}
      />
    );
  }

  if (showLab) {
    return <LabEnvironment onEndLab={() => setShowLab(false)} onComplete={handleLabComplete} />;
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="pt-20 pb-16 border-b border-white/5 bg-[radial-gradient(circle_at_50%_0%,#C7A24D05_0%,transparent_50%)]">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">
            Learn <span className="text-accent">Cybersecurity</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            Build practical cybersecurity skills through structured paths and high-fidelity practice environments. 
            No hype—just professional engineering training for the next generation of operators.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-surface border-b border-white/5 sticky top-[72px] z-40 backdrop-blur-md bg-surface/80">
        <div className="container mx-auto px-6 overflow-x-auto flex justify-center no-scrollbar">
          {tabs.map(tab => (
            <LearnTab 
              key={tab} 
              label={tab} 
              active={activeTab === tab} 
              onClick={() => setActiveTab(tab)} 
            />
          ))}
        </div>
      </section>

      {/* Core Content */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Roadmap */}
          <div className="lg:col-span-5">
            <div className="sticky top-40">
              <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded text-accent text-[10px] font-bold uppercase tracking-widest mb-6">
                The Journey
              </div>
              <h2 className="font-heading text-3xl font-bold text-text-primary mb-4 tracking-tight">Cybersecurity Learning Roadmap</h2>
              <p className="text-text-secondary mb-12 max-w-md">
                Our roadmap provides a clear, verifiable progression from systems fundamentals to specialized career tracks.
              </p>

              <div className="ml-2">
                <RoadmapStep 
                  number="01" 
                  title="Computing & Networking Basics" 
                  tooltip="Hardware architecture & stack traversal"
                  description="Master the architecture of modern computing, operating systems, and the TCP/IP suite. This is the bedrock of all security knowledge."
                />
                <RoadmapStep 
                  number="02" 
                  title="Security Fundamentals" 
                  tooltip="Threat modeling & risk frameworks"
                  description="Understand the core principles of the CIA triad, threat modeling, and defensive mechanisms that protect modern enterprises."
                />
                <RoadmapStep 
                  number="03" 
                  title="Applied Security Practice" 
                  tooltip="Simulation in live environments"
                  description="Engage in structured labs where you analyze packets, identify misconfigurations, and defend simulated small-office networks."
                />
                <RoadmapStep 
                  number="04" 
                  title="Career-Oriented Skill Tracks" 
                  tooltip="Professional role-based specialization"
                  isLast
                  description="Focus your expertise into specialized roles like Defensive Analysis or Offensive Operations, preparing you for real-world impact."
                />
              </div>
            </div>
          </div>

          {/* Role Tracks */}
          <div className="lg:col-span-7 space-y-8">
             <div className="grid md:grid-cols-2 gap-6">
               <RoleTrack 
                 title="Security Analyst"
                 difficulty="Beginner"
                 description="Monitor, detect, and respond to security incidents. Learn log analysis, SIEM operations, and incident handling."
                 paths={['SOC Foundations', 'Endpoint Security', 'Network Analysis']}
                 onClick={onTrackClick}
               />
               <RoleTrack 
                 title="Penetration Tester"
                 difficulty="Intermediate"
                 description="Perform authorized testing on systems to find vulnerabilities. Master exploitation, pivoting, and reporting."
                 paths={['Web Hacking', 'Internal Networks', 'Active Directory']}
                 onClick={onTrackClick}
               />
               <RoleTrack 
                 title="Security Engineer"
                 difficulty="Advanced"
                 description="Build and maintain robust security infrastructure. Focus on cloud security, automation, and hardened architecture."
                 paths={['Cloud Hardening', 'SecOps Automation', 'Kubernetes Security']}
                 onClick={onTrackClick}
               />
               <div className="bg-surface/40 border border-dashed border-white/10 rounded-lg p-8 flex flex-col items-center justify-center text-center group">
                 <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-4 group-hover:border-accent/40 transition-colors">
                   <svg className="w-6 h-6 text-text-disabled group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                   </svg>
                 </div>
                 <h3 className="font-bold text-text-disabled mb-2">More Tracks Coming</h3>
                 <p className="text-[10px] text-text-disabled uppercase tracking-widest">Developing Specialized Content</p>
               </div>
             </div>

             <div className="mt-12 bg-surface border border-white/5 rounded-lg p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="max-w-md">
                    <h3 className="text-xl font-bold text-text-primary mb-2">Ready to start your first lab?</h3>
                    <p className="text-sm text-text-secondary">Deploy your own private Kali or Windows instance in under 30 seconds, directly in the browser.</p>
                  </div>
                  <button 
                    onClick={() => setShowLab(true)}
                    className="px-8 py-4 bg-accent text-background font-bold rounded text-xs uppercase tracking-widest shadow-lg shadow-accent/20 whitespace-nowrap hover:bg-accent-darker transition-colors"
                  >
                    Launch Foundation Lab
                  </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
