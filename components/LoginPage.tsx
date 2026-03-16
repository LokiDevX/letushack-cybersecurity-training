
import React, { useState, useEffect, useRef } from 'react';

export const TerminalBackground: React.FC = () => {
  const logLines = [
    "[SEC] Handshake established: TLS_AES_256_GCM_SHA384",
    "[LOG] Outbound packet filtered: DST=10.0.0.45",
    "[SYS] Entropy pool updated: 4096 bits",
    "[AUTH] RSA key exchange initiated...",
    "[INFO] Monitoring eth0 interface (10.0.4.102)",
    "[WARN] Unexpected peer disconnect: 192.168.1.1",
    "[SYS] Kernel check: Integrity verified",
    "[LOG] Session PID 4402 encrypted with vault_key",
    "[SEC] MFA validation pending for user_root",
    "[AUTH] Key derivation function: Argon2id v=19",
    "[SYS] System heartbeat: OK (124ms)",
    "[SEC] Rotating session tokens...",
    "[INFO] Uplink status: Stable (1.4 Gbps)",
    "[DB] Indexing encrypted tables...",
    "[MEM] Garbage collection triggered (0.04s)"
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.07] select-none">
      <div className="flex flex-col gap-10 py-20">
        {[...Array(14)].map((_, i) => (
          <div 
            key={i} 
            className="flex whitespace-nowrap font-mono text-[11px] md:text-sm tracking-[0.2em] text-accent uppercase"
            style={{ 
              animation: `drift ${20 + (i * 6)}s ease-in-out infinite alternate`,
              animationDelay: `-${i * 4}s`,
              marginLeft: i % 2 === 0 ? '-20%' : '-60%'
            }}
          >
            {[...Array(5)].map((_, j) => (
              <span key={j} className="mr-32">
                {logLines[(i + j) % logLines.length]}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const SecuritySensor: React.FC<{ followMouse: boolean; isObscured: boolean }> = ({ followMouse, isObscured }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!followMouse) {
      setOffset({ x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const dx = (e.clientX - centerX) / 15;
      const dy = (e.clientY - centerY) / 15;
      
      const limit = 6;
      setOffset({
        x: Math.max(-limit, Math.min(limit, dx)),
        y: Math.max(-limit, Math.min(limit, dy))
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [followMouse]);

  return (
    <div ref={containerRef} className="relative w-16 h-16 mx-auto mb-8 flex items-center justify-center">
      <div className="absolute inset-0 border border-accent/20 rounded-full"></div>
      <div className="absolute inset-2 border border-accent/40 rounded-full animate-pulse opacity-50"></div>
      
      <div 
        className={`relative w-8 h-8 bg-surface border border-accent/60 rounded-full transition-all duration-700 ease-out overflow-hidden flex items-center justify-center ${isObscured ? 'blur-sm scale-95 opacity-60' : ''}`}
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      >
        <div className="w-2 h-2 bg-accent rounded-full shadow-[0_0_8px_#C7A24D]"></div>
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent w-full h-full -translate-x-full animate-scan ${isObscured ? 'hidden' : ''}`}></div>
        <div className={`absolute inset-0 bg-surface transition-transform duration-500 origin-top ${isObscured ? 'scale-y-100' : 'scale-y-0'}`}></div>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-2 bg-accent/40"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-2 bg-accent/40"></div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-px bg-accent/40"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-px bg-accent/40"></div>
    </div>
  );
};

const AbstractVisual: React.FC = () => (
  <div className="hidden lg:flex w-1/2 bg-background relative items-center justify-center overflow-hidden border-r border-white/5">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,#C7A24D05_0%,transparent_50%)]"></div>
    
    <svg viewBox="0 0 400 400" className="w-64 h-64 opacity-20">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C7A24D" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#C7A24D" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g stroke="#C7A24D" strokeWidth="0.5" fill="none">
        <circle cx="200" cy="200" r="100" strokeDasharray="10 10" />
        <circle cx="200" cy="200" r="150" strokeDasharray="5 15" className="animate-spin-slow" />
        <path d="M200 50 V350 M50 200 H350" strokeOpacity="0.3" />
        <rect x="150" y="150" width="100" height="100" rx="4" fill="url(#grad1)" />
        <g className="animate-pulse">
            <circle cx="200" cy="200" r="2" fill="#C7A24D" />
            <circle cx="200" cy="200" r="10" strokeOpacity="0.5" />
        </g>
      </g>
    </svg>

    <div className="absolute bottom-12 left-12 text-left">
        <div className="text-[10px] font-mono text-text-disabled tracking-widest uppercase mb-1">Status: Operational</div>
        <div className="text-[10px] font-mono text-text-disabled tracking-widest uppercase">Encryption: AES-256-GCM</div>
    </div>
  </div>
);

const LoginPage: React.FC<{ onBackToHome: () => void, onJoinClick?: () => void, onLoginSuccess: (email: string) => void }> = ({ onBackToHome, onJoinClick, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) onLoginSuccess(email);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Enhanced Terminal Animated Background */}
      <TerminalBackground />

      <div className="w-full max-w-4xl flex bg-surface rounded-lg shadow-2xl border border-white/5 overflow-hidden min-h-[550px] relative z-10">
        {/* Left Side: Visual */}
        <AbstractVisual />

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <SecuritySensor followMouse={emailFocused} isObscured={passwordFocused} />
          
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-text-primary tracking-tight">Access Control</h2>
            <p className="text-sm text-text-secondary mt-2">Enter your credentials to access the terminal</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-disabled uppercase tracking-widest">Email Identity</label>
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@learnhack.com"
                className="w-full px-4 py-3 bg-background border border-text-disabled/20 rounded-md focus:border-accent focus:outline-none text-text-primary transition-all text-sm"
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-text-disabled uppercase tracking-widest">Security Passkey</label>
                <a href="#" className="text-[10px] font-bold text-accent/60 hover:text-accent uppercase tracking-widest transition-colors">Forgot?</a>
              </div>
              <input 
                required
                type="password" 
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-background border border-text-disabled/20 rounded-md focus:border-accent focus:outline-none text-text-primary transition-all text-sm"
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
            </div>

            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
               <div className={`w-4 h-4 border rounded flex items-center justify-center transition-all ${rememberMe ? 'bg-accent border-accent' : 'bg-background border-text-disabled/20'}`}>
                 {rememberMe && <svg className="w-3 h-3 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>}
               </div>
               <span className="text-xs text-text-secondary select-none">Remember this session</span>
            </div>

            <button type="submit" className="w-full py-4 bg-accent text-background font-bold rounded-md hover:bg-accent-darker transition-all shadow-xl shadow-accent/10 text-sm tracking-widest uppercase">
              Authenticate
            </button>
          </form>

          <div className="mt-8 text-center">
             <span className="text-xs text-text-disabled">New operative? </span>
             <button onClick={onJoinClick} className="text-xs font-bold text-text-primary hover:text-accent transition-colors">Apply for access</button>
          </div>

          <button 
            onClick={onBackToHome}
            className="mt-6 text-[10px] text-text-disabled hover:text-text-primary transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Return to Landing
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        @keyframes drift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(8%, 4%); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
