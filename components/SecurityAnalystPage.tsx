
import React, { useState } from 'react';

interface Task {
  id: number;
  title: string;
  type: 'concept' | 'lab' | 'scenario';
  completed: boolean;
}

const SecurityAnalystPage: React.FC<{ onBackToLearn: () => void, onMissionComplete?: () => void }> = ({ onBackToLearn, onMissionComplete }) => {
  const [activeTask, setActiveTask] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [verificationInput, setVerificationInput] = useState('');

  const tasks: Task[] = [
    { id: 1, title: 'Understanding the Analyst Mindset', type: 'concept', completed: completedTasks.includes(1) },
    { id: 2, title: 'Preparing the Environment', type: 'lab', completed: completedTasks.includes(2) },
    { id: 3, title: 'Investigating Suspicious Activity', type: 'scenario', completed: completedTasks.includes(3) },
    { id: 4, title: 'Log Analysis Basics', type: 'concept', completed: completedTasks.includes(4) },
    { id: 5, title: 'Incident Investigation', type: 'scenario', completed: completedTasks.includes(5) },
  ];

  const handleVerify = () => {
    if (verificationInput.toLowerCase().trim() === 'analyst') {
      setCompletedTasks(prev => [...new Set([...prev, activeTask])]);
      setVerificationInput('');
    }
  };

  const handleMarkComplete = (id: number) => {
    setCompletedTasks(prev => [...new Set([...prev, id])]);
  };

  const currentProgress = Math.round((completedTasks.length / tasks.length) * 100);
  const isMissionFinished = completedTasks.length === tasks.length;

  return (
    <div className="bg-background min-h-screen">
      {/* 1. Page Header */}
      <header className="pt-12 pb-8 border-b border-white/5">
        <div className="container mx-auto px-6">
          <button 
            onClick={onBackToLearn}
            className="flex items-center gap-2 text-text-disabled hover:text-accent text-[10px] font-bold uppercase tracking-widest transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Security Analyst Path
          </button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="max-w-2xl">
              <h1 className="font-heading text-3xl font-bold text-text-primary tracking-tight mb-2">
                Security Analyst — Foundations
              </h1>
              <p className="text-text-secondary text-sm leading-relaxed">
                Learn how security analysts identify threats, investigate incidents, and protect systems in real environments.
              </p>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <svg className="w-4 h-4 text-text-disabled mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-[10px] text-text-disabled font-bold uppercase">~20 Mins</span>
                </div>
                <div className="flex flex-col items-center">
                  <svg className="w-4 h-4 text-text-disabled mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  <span className="text-[10px] text-text-disabled font-bold uppercase">Beginner</span>
                </div>
                <div className="flex flex-col items-center">
                  <svg className="w-4 h-4 text-text-disabled mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  <span className="text-[10px] text-text-disabled font-bold uppercase">5 Tasks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Progress Indicator */}
      <div className="bg-surface/50 py-3 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-grow">
               <span className="text-[10px] font-bold text-text-disabled uppercase tracking-widest whitespace-nowrap">Course Progress: {currentProgress}%</span>
               <div className="flex-grow h-1 bg-white/5 rounded-full overflow-hidden">
                 <div className="bg-accent h-full transition-all duration-700" style={{ width: `${currentProgress}%` }}></div>
               </div>
            </div>
            {isMissionFinished && (
              <button 
                onClick={onMissionComplete}
                className="bg-accent text-background text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded animate-pulse"
              >
                Finalize Mission
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Task-Based Learning Layout */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Task 1 */}
            <div className={`p-8 bg-surface border rounded-lg transition-all duration-300 ${activeTask === 1 ? 'border-accent/40 shadow-xl shadow-accent/5' : 'border-white/5 opacity-80'}`} onClick={() => setActiveTask(1)}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold font-mono border ${completedTasks.includes(1) ? 'bg-accent border-accent text-background' : 'border-white/10 text-text-disabled'}`}>
                  {completedTasks.includes(1) ? '✓' : '1'}
                </div>
                <h2 className="text-xl font-bold text-text-primary tracking-tight">Task 1 — Understanding the Analyst Mindset</h2>
              </div>
              <div className="space-y-4 mb-8 text-text-secondary text-sm leading-relaxed">
                <p>Security analysis begins with understanding how attackers think and how systems fail. In this task, you’ll explore the role of a security analyst and their responsibilities.</p>
              </div>
              <div className="bg-background/50 border border-white/5 rounded p-6">
                <p className="text-sm text-text-secondary mb-4">What is the core title for a professional who monitors and responds to security incidents?</p>
                <div className="flex gap-2">
                  <input 
                    type="text" value={verificationInput} onChange={(e) => setVerificationInput(e.target.value)}
                    placeholder="Type your answer here..."
                    className="flex-grow bg-background border border-white/10 rounded px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
                  />
                  <button onClick={handleVerify} className="px-6 py-2 bg-accent text-background text-[10px] font-bold uppercase tracking-widest rounded">Verify Answer</button>
                </div>
              </div>
            </div>

            {/* Task 2 */}
            <div className={`p-8 bg-surface border rounded-lg transition-all duration-300 ${activeTask === 2 ? 'border-accent/40 shadow-xl shadow-accent/5' : 'border-white/5 opacity-80'}`} onClick={() => setActiveTask(2)}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold font-mono border ${completedTasks.includes(2) ? 'bg-accent border-accent text-background' : 'border-white/10 text-text-disabled'}`}>
                  {completedTasks.includes(2) ? '✓' : '2'}
                </div>
                <h2 className="text-xl font-bold text-text-primary tracking-tight">Task 2 — Preparing the Environment</h2>
              </div>
              <button 
                onClick={() => handleMarkComplete(2)}
                className="w-full py-4 bg-surface-soft border border-accent/20 text-accent font-bold rounded flex items-center justify-center gap-3 hover:bg-accent hover:text-background transition-all"
              >
                Launch Lab Environment
              </button>
            </div>

            {/* Task 3 */}
            <div className={`p-8 bg-surface border rounded-lg transition-all duration-300 ${activeTask === 3 ? 'border-accent/40 shadow-xl shadow-accent/5' : 'border-white/5 opacity-80'}`} onClick={() => setActiveTask(3)}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold font-mono border ${completedTasks.includes(3) ? 'bg-accent border-accent text-background' : 'border-white/10 text-text-disabled'}`}>
                  {completedTasks.includes(3) ? '✓' : '3'}
                </div>
                <h2 className="text-xl font-bold text-text-primary tracking-tight">Task 3 — Investigating Suspicious Activity</h2>
              </div>
              <div className="flex justify-end">
                <button onClick={() => handleMarkComplete(3)} className="px-6 py-2 border border-white/10 text-text-disabled hover:text-text-primary text-[10px] font-bold uppercase tracking-widest">Mark Task as Complete</button>
              </div>
            </div>

             {/* Task 4 */}
             <div className={`p-8 bg-surface border rounded-lg transition-all duration-300 ${activeTask === 4 ? 'border-accent/40 shadow-xl shadow-accent/5' : 'border-white/5 opacity-80'}`} onClick={() => setActiveTask(4)}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold font-mono border ${completedTasks.includes(4) ? 'bg-accent border-accent text-background' : 'border-white/10 text-text-disabled'}`}>
                  {completedTasks.includes(4) ? '✓' : '4'}
                </div>
                <h2 className="text-xl font-bold text-text-primary tracking-tight">Task 4 — Log Analysis Basics</h2>
              </div>
              <div className="flex justify-end">
                <button onClick={() => handleMarkComplete(4)} className="px-6 py-2 border border-white/10 text-text-disabled hover:text-text-primary text-[10px] font-bold uppercase tracking-widest">Mark Task as Complete</button>
              </div>
            </div>

             {/* Task 5 */}
             <div className={`p-8 bg-surface border rounded-lg transition-all duration-300 ${activeTask === 5 ? 'border-accent/40 shadow-xl shadow-accent/5' : 'border-white/5 opacity-80'}`} onClick={() => setActiveTask(5)}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold font-mono border ${completedTasks.includes(5) ? 'bg-accent border-accent text-background' : 'border-white/10 text-text-disabled'}`}>
                  {completedTasks.includes(5) ? '✓' : '5'}
                </div>
                <h2 className="text-xl font-bold text-text-primary tracking-tight">Task 5 — Incident Investigation</h2>
              </div>
              <div className="flex justify-end">
                <button onClick={() => handleMarkComplete(5)} className="px-6 py-2 border border-white/10 text-text-disabled hover:text-text-primary text-[10px] font-bold uppercase tracking-widest">Mark Task as Complete</button>
              </div>
            </div>

          </div>

          {/* Task Navigation Panel */}
          <div className="lg:col-span-4">
            <div className="sticky top-40 space-y-6">
              <div className="bg-surface border border-white/5 rounded-lg overflow-hidden">
                <div className="p-4 bg-surface-soft border-b border-white/5 text-[10px] font-bold text-text-primary uppercase tracking-widest">Course Navigator</div>
                <div className="divide-y divide-white/5">
                  {tasks.map((task) => (
                    <button 
                      key={task.id} onClick={() => setActiveTask(task.id)}
                      className={`w-full p-4 flex items-center gap-3 text-left transition-colors ${activeTask === task.id ? 'bg-white/5' : 'hover:bg-white/5'}`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${task.completed ? 'bg-accent border-accent' : 'border-white/10'}`}>
                        {task.completed && <svg className="w-3 h-3 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-xs font-bold transition-colors ${activeTask === task.id ? 'text-accent' : 'text-text-primary'}`}>Task {task.id}: {task.title}</span>
                        <span className="text-[9px] text-text-disabled uppercase tracking-widest">{task.type}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityAnalystPage;
