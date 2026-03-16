import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SecuritySensor } from './LoginPage';
import ShieldIcon from './icons/ShieldIcon';
import { supabase } from '../src/lib/supabase';

const LogDriftBackground: React.FC = () => {
  const logLines = [
    "[INF] Handshake established: TLS_AES_256_GCM_SHA384",
    "[SYS] Entropy pool synchronization: OK",
    "[SEC] Packet filtering active: DST=10.0.0.12",
    "[LOG] Session ID 4409 generated",
    "[AUTH] Argon2id hash verification: SUCCESS",
    "[SYS] Kernel check: Integrity verified",
    "[INF] Monitoring interface: eth0",
    "[SEC] MFA validation pending...",
    "[LOG] Uplink status: 1.2 Gbps stable",
    "[DB] Encrypted table indexing complete",
    "[SYS] Heartbeat signal: 114ms latency",
    "[SEC] Key rotation schedule: 24h cycle",
    "[INF] Node cluster: Operational",
    "[LOG] Memory allocation: 4GB reserved",
    "[SYS] File system: Read-only access"
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Background drifting lines with increased base visibility */}
      <div className="flex flex-col gap-14 py-10 opacity-15">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="flex whitespace-nowrap font-mono text-[10px] md:text-xs tracking-[0.25em] text-accent/80 uppercase"
            style={{ 
              animation: `driftHorizontal ${50 + (i * 12)}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
              animationDelay: `-${i * 7}s`,
              marginLeft: i % 2 === 0 ? '-10%' : '-30%'
            }}
          >
            {[...Array(6)].map((_, j) => (
              <span key={j} className="mr-64 inline-block">
                {logLines[(i + j) % logLines.length]}
              </span>
            ))}
          </div>
        ))}
      </div>
      
      {/* Deep vignette for UI focus and contrast enhancement */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_10%,#0E0F13_95%)]"></div>

      <style>{`
        @keyframes driftHorizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(20%); }
        }
      `}</style>
    </div>
  );
};

const ProgressIndicator: React.FC<{ step: number }> = ({ step }) => {
  const steps = ["Account", "Preferences", "Start"];
  return (
    <div className="flex items-center justify-between mb-12 px-2">
      {steps.map((label, i) => (
        <React.Fragment key={label}>
          <div className="flex flex-col items-center gap-2">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all duration-500 ${
                i + 1 <= step 
                  ? 'bg-accent border-accent text-background shadow-[0_0_15px_rgba(199,162,77,0.3)]' 
                  : 'border-text-disabled/20 text-text-disabled'
              }`}
            >
              {i + 1}
            </div>
            <span className={`text-[9px] font-bold uppercase tracking-widest ${i + 1 <= step ? 'text-accent' : 'text-text-disabled'}`}>
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="flex-grow h-px bg-text-disabled/10 mx-4 -mt-6">
              <div 
                className="h-full bg-accent transition-all duration-700" 
                style={{ width: i + 1 < step ? '100%' : '0%' }}
              ></div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const StrengthMeter: React.FC<{ strength: number }> = ({ strength }) => {
  const labels = ["Insufficient Entropy", "Weak Digest", "Standard Complexity", "Cryptographic Strength"];
  const colors = ["bg-red-500/50", "bg-orange-500/50", "bg-yellow-500/50", "bg-accent"];
  
  const currentLabel = labels[Math.min(strength, labels.length - 1)];
  const currentColor = colors[Math.min(strength, colors.length - 1)];

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1 h-1">
        {[0, 1, 2, 3].map((i) => (
          <div 
            key={i} 
            className={`flex-grow rounded-full transition-all duration-500 ${i <= strength ? currentColor : 'bg-text-disabled/10'}`}
          ></div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[9px] font-mono uppercase tracking-widest text-text-disabled">Security Assessment:</span>
        <span className={`text-[9px] font-bold uppercase tracking-widest transition-colors duration-500 ${strength === 3 ? 'text-accent' : 'text-text-secondary'}`}>
          {currentLabel}
        </span>
      </div>
    </div>
  );
};

const JoinPage: React.FC<{ onBackToHome: () => void; onLoginClick: () => void, onJoinSuccess: (email: string) => void }> = ({ onBackToHome, onLoginClick, onJoinSuccess }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passwordStrength = useMemo(() => {
    if (!password) return -1;
    let s = 0;
    if (password.length > 8) s++;
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  }, [password]);

  const isPasswordSecure = passwordStrength >= 2;
  const passwordsMatch = password && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordsMatch && isPasswordSecure && email && fullName) {
      setIsSubmitting(true);
      setError(null);
      
      try {
        // Sign up with email confirmation disabled (autoConfirm)
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              full_name: fullName
            }
          }
        });

        if (signUpError) throw signUpError;

        console.log('Signup response:', data);

        if (data.user) {
          // Wait a moment for auth to process
          await new Promise(resolve => setTimeout(resolve, 500));

          // Create profile with user data
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .insert({
              id: data.user.id,
              name: fullName,
              role: "student"
            })
            .select()
            .single();

          if (profileError) {
            console.error('Profile creation error:', profileError);
            throw profileError;
          }

          console.log('Profile created successfully:', profileData);

          // Check if user is confirmed
          if (data.session) {
            console.log('User confirmed with session, redirecting to dashboard');
            // Wait another moment before redirect to ensure everything is saved
            await new Promise(resolve => setTimeout(resolve, 500));
            onJoinSuccess(email);
          } else {
            setError('Please check your email to confirm your account before logging in.');
            setTimeout(() => {
              onLoginClick();
            }, 3000);
          }
        }
      } catch (err: any) {
        console.error('Signup error:', err);
        setError(err.message || 'Registration failed. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Subtle Log Drift Background - Increased Visibility */}
      <LogDriftBackground />

      <div className="w-full max-w-lg bg-surface rounded-lg shadow-2xl border border-white/5 p-10 md:p-14 relative z-10 backdrop-blur-md bg-surface/90">
        <ProgressIndicator step={step} />

        <div className="flex justify-center mb-8">
            <div className="relative">
                <SecuritySensor followMouse={emailFocused} isObscured={step > 1} />
                <div className={`absolute -bottom-2 -right-2 transition-all duration-500 transform ${passwordsMatch && isPasswordSecure ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
                    <div className="bg-accent rounded-full p-1 shadow-lg shadow-accent/20">
                        <ShieldIcon className="w-4 h-4 text-background" />
                    </div>
                </div>
            </div>
        </div>

        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl font-bold text-text-primary tracking-tight text-white">Onboarding Initiated</h2>
          <p className="text-xs text-text-secondary mt-2">Establish your operative credentials below</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-text-disabled uppercase tracking-widest">Full Name</label>
            <input 
              required
              type="text" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              className="w-full px-4 py-3 bg-background border border-text-disabled/20 rounded-md focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 text-text-primary transition-all text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-text-disabled uppercase tracking-widest">Operator Identity (Email)</label>
            <input 
              required
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="operative@learnhack.com"
              className="w-full px-4 py-3 bg-background border border-text-disabled/20 rounded-md focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 text-text-primary transition-all text-sm"
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-text-disabled uppercase tracking-widest">Passkey Creation</label>
            <div className="relative">
                <input 
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 10 characters"
                  className="w-full px-4 py-3 bg-background border border-text-disabled/20 rounded-md focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 text-text-primary transition-all text-sm pr-10"
                />
                <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-disabled hover:text-text-primary"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {showPassword ? <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> : <><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></>}
                    </svg>
                </button>
            </div>
            {password && <StrengthMeter strength={passwordStrength} />}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-text-disabled uppercase tracking-widest">Verify Passkey</label>
            <input 
              required
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat password"
              className={`w-full px-4 py-3 bg-background border rounded-md focus:outline-none focus:ring-1 text-text-primary transition-all text-sm ${
                confirmPassword ? (passwordsMatch ? 'border-accent focus:ring-accent/30' : 'border-red-500/50 focus:ring-red-500/10') : 'border-text-disabled/20 focus:border-accent focus:ring-accent/30'
              }`}
            />
            {confirmPassword && !passwordsMatch && (
                <span className="text-[9px] text-red-500/70 font-bold uppercase tracking-widest">Hash mismatch detected</span>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md">
              <p className="text-xs text-red-500">{error}</p>
            </div>
          )}

          <button 
            type="submit"
            disabled={!passwordsMatch || !isPasswordSecure || !fullName || isSubmitting}
            className={`w-full py-4 font-bold rounded-md transition-all shadow-xl text-sm tracking-widest uppercase mt-4 ${
                passwordsMatch && isPasswordSecure && fullName && !isSubmitting
                    ? 'bg-accent text-background hover:bg-accent-darker shadow-accent/10' 
                    : 'bg-text-disabled/10 text-text-disabled cursor-not-allowed shadow-none'
            }`}
          >
            {isSubmitting ? 'Deploying...' : 'Deploy Credentials'}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-white/5 text-center">
             <span className="text-xs text-text-disabled">Already have access? </span>
             <button onClick={onLoginClick} className="text-xs font-bold text-text-primary hover:text-accent transition-colors">Sign in to console</button>
        </div>

        <button 
          onClick={onBackToHome}
          className="mt-6 w-full text-[10px] text-text-disabled hover:text-text-primary transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Return to Portal
        </button>
      </div>
    </div>
  );
};

export default JoinPage;
