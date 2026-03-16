import React, { useState, useEffect, useRef } from 'react';

interface LabEnvironmentProps {
  onEndLab: () => void;
  onComplete?: () => void;
  labTitle?: string;
}

const LabEnvironment: React.FC<LabEnvironmentProps> = ({ 
  onEndLab,
  onComplete,
  labTitle = "Security Analyst Lab — Log Investigation"
}) => {
  const [timeRemaining, setTimeRemaining] = useState(3572); // 59:32 in seconds
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [terminalLines, setTerminalLines] = useState<Array<{ type: 'output' | 'command', text: string }>>([
    { type: 'output', text: '> System initialized' },
    { type: 'output', text: '> Connecting to lab environment...' },
    { type: 'output', text: '> Environment ready' },
    { type: 'output', text: '> Type "help" for available commands' }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock command responses
  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    const responses: Record<string, string[]> = {
      'help': [
        'Available commands:',
        '  ls          - List directory contents',
        '  cat [file]  - Display file contents',
        '  grep        - Search text patterns',
        '  pwd         - Print working directory',
        '  whoami      - Display current user',
        '  clear       - Clear terminal screen',
        '  help        - Show this help message'
      ],
      'ls': [
        'auth.log  secure.log  syslog  access.log'
      ],
      'pwd': [
        '/var/log'
      ],
      'whoami': [
        'root'
      ],
      'cat auth.log': [
        'Jan 15 10:23:41 server sshd[12345]: Failed password for root from 192.168.1.100 port 22 ssh2',
        'Jan 15 10:23:43 server sshd[12346]: Failed password for root from 192.168.1.100 port 22 ssh2',
        'Jan 15 10:23:45 server sshd[12347]: Failed password for root from 192.168.1.100 port 22 ssh2',
        'Jan 15 10:23:47 server sshd[12348]: Accepted password for admin from 192.168.1.50 port 22 ssh2'
      ],
      'grep failed auth.log': [
        'Jan 15 10:23:41 server sshd[12345]: Failed password for root from 192.168.1.100 port 22 ssh2',
        'Jan 15 10:23:43 server sshd[12346]: Failed password for root from 192.168.1.100 port 22 ssh2',
        'Jan 15 10:23:45 server sshd[12347]: Failed password for root from 192.168.1.100 port 22 ssh2'
      ],
      'clear': []
    };

    if (trimmedCmd === 'clear') {
      setTerminalLines([]);
      return;
    }

    const response = responses[trimmedCmd] || [`bash: ${cmd}: command not found`];
    
    setTerminalLines(prev => [
      ...prev,
      { type: 'command', text: cmd },
      ...response.map(line => ({ type: 'output' as const, text: line }))
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (currentInput.trim()) {
        setCommandHistory(prev => [...prev, currentInput]);
        setHistoryIndex(-1);
        executeCommand(currentInput);
        setCurrentInput('');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    }
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLines]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTask = (index: number) => {
    setCompletedTasks(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleSubmitSolution = () => {
    if (onComplete) {
      onComplete();
    }
  };

  const tasks = [
    { 
      step: '1', 
      title: 'Examine the authentication logs',
      description: 'Review /var/log/auth.log for suspicious login attempts'
    },
    { 
      step: '2', 
      title: 'Identify failed login patterns',
      description: 'Use grep to filter failed authentication events'
    },
    { 
      step: '3', 
      title: 'Extract source IP addresses',
      description: 'Parse logs to identify attack origin'
    },
    { 
      step: '4', 
      title: 'Check firewall rules',
      description: 'Verify current iptables configuration'
    },
    { 
      step: '5', 
      title: 'Document findings',
      description: 'Summarize incident details and recommended actions'
    }
  ];

  const progress = (completedTasks.length / tasks.length) * 100;

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-surface border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-text-primary font-bold text-sm">{labTitle}</span>
          </div>
          <span className="text-text-disabled text-xs">•</span>
          <span className="text-accent text-xs font-mono font-bold">
            DEMO ENVIRONMENT
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className={`font-mono font-bold text-sm ${timeRemaining < 600 ? 'text-red-500' : 'text-text-primary'}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>

          <button
            onClick={onEndLab}
            className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded text-xs font-bold uppercase tracking-widest hover:bg-red-500/20 transition-colors"
          >
            End Lab
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Instructions */}
        <div className="w-[400px] bg-surface-soft border-r border-white/10 flex flex-col overflow-hidden">
          {/* Lab Objective */}
          <div className="p-6 border-b border-white/5">
            <div className="inline-block px-2 py-1 bg-accent/10 border border-accent/20 rounded text-accent text-[9px] font-bold uppercase tracking-widest mb-3">
              Objective
            </div>
            <h3 className="text-text-primary font-bold text-base mb-2">
              Investigate Brute Force Attack
            </h3>
            <p className="text-text-secondary text-xs leading-relaxed">
              A monitoring alert has detected suspicious authentication activity on a Linux server. 
              Analyze system logs to identify the attack vector, source, and recommend mitigation steps.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="px-6 py-4 border-b border-white/5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold text-text-disabled uppercase tracking-widest">
                Progress
              </span>
              <span className="text-xs font-mono font-bold text-accent">
                {completedTasks.length}/{tasks.length}
              </span>
            </div>
            <div className="w-full bg-background/50 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-300 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Task List */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div 
                  key={index}
                  className={`border rounded-lg p-4 transition-all cursor-pointer ${
                    completedTasks.includes(index)
                      ? 'bg-accent/5 border-accent/30'
                      : 'bg-surface border-white/5 hover:border-white/10'
                  }`}
                  onClick={() => toggleTask(index)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                      completedTasks.includes(index)
                        ? 'bg-accent border-accent'
                        : 'border-text-disabled/30'
                    }`}>
                      {completedTasks.includes(index) && (
                        <svg className="w-3 h-3 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-mono font-bold text-accent">
                          STEP {task.step}
                        </span>
                      </div>
                      <h4 className={`text-sm font-bold mb-1 ${
                        completedTasks.includes(index) ? 'text-accent' : 'text-text-primary'
                      }`}>
                        {task.title}
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {task.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action */}
          <div className="p-6 border-t border-white/5">
            <button 
              onClick={handleSubmitSolution}
              className="w-full py-3 bg-accent text-background font-bold text-xs uppercase tracking-widest rounded hover:bg-accent-darker transition-colors"
            >
              Submit Solution
            </button>
          </div>
        </div>

        {/* Right Panel - Interactive Terminal */}
        <div className="flex-1 bg-background flex flex-col">
          {/* Terminal Header */}
          <div className="bg-surface border-b border-white/10 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="text-text-disabled text-xs font-mono">
                root@security-lab:~
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-text-disabled uppercase tracking-widest font-bold">
                Interactive Terminal
              </span>
            </div>
          </div>

          {/* Terminal Content */}
          <div 
            className="flex-1 p-6 overflow-y-auto font-mono text-sm"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="space-y-1">
              {terminalLines.map((line, index) => (
                <div 
                  key={index} 
                  className={line.type === 'command' ? 'text-text-primary' : 'text-text-secondary'}
                >
                  {line.type === 'command' && (
                    <span className="text-accent">root@security-lab:~$ </span>
                  )}
                  {line.text}
                </div>
              ))}
              
              <div className="flex items-center gap-2 text-text-primary">
                <span className="text-accent">root@security-lab:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none caret-accent"
                  autoFocus
                  spellCheck={false}
                />
              </div>
              <div ref={terminalEndRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabEnvironment;
