
import React from 'react';
import { motion } from 'framer-motion';
import CheckIcon from './icons/CheckIcon';

const TerminalIllustration: React.FC = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="relative w-full max-w-[500px] lg:max-w-[600px] mx-auto group"
  >
    {/* Background Glow */}
    <div className="absolute -inset-10 bg-accent/5 rounded-full blur-[100px] group-hover:bg-accent/10 transition-colors duration-1000"></div>
    
    <svg viewBox="0 0 600 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 w-full h-auto drop-shadow-2xl">
      <defs>
        <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="panelGrad" x1="0" y1="0" x2="600" y2="500" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1F2229" />
          <stop offset="1" stopColor="#0E0F13" />
        </linearGradient>
      </defs>

      {/* Main Terminal Window */}
      <rect x="40" y="40" width="520" height="420" rx="8" fill="url(#panelGrad)" stroke="#3D3F46" strokeWidth="1" />
      
      {/* Window Header */}
      <path d="M40 48 C40 43.5817 43.5817 40 48 40 H552 C556.418 40 560 43.5817 560 48 V70 H40 V48Z" fill="#181A1F" stroke="#3D3F46" strokeWidth="1" />
      <circle cx="60" cy="55" r="4" fill="#3D3F46" />
      <circle cx="75" cy="55" r="4" fill="#3D3F46" />
      <circle cx="90" cy="55" r="4" fill="#3D3F46" />
      <text x="300" y="58" textAnchor="middle" fill="#7A7D85" fontSize="10" fontFamily="monospace" letterSpacing="1">LEARNHACK.COM_OS_V2.0</text>

      {/* Side Panel: Network Nodes */}
      <rect x="60" y="90" width="140" height="180" rx="4" fill="#0E0F13" stroke="#3D3F46" strokeWidth="0.5" />
      <text x="70" y="105" fill="#C7A24D" fontSize="9" fontFamily="monospace" fontWeight="bold">NETWORK_SCAN</text>
      <g stroke="#3D3F46" strokeWidth="0.5">
        <circle cx="130" cy="150" r="20" fill="none" />
        <circle cx="130" cy="150" r="10" fill="none" />
        <circle cx="130" cy="150" r="3" fill="#C7A24D" filter="url(#subtleGlow)" />
        <line x1="130" y1="130" x2="130" y2="170" />
        <line x1="110" y1="150" x2="150" y2="150" />
      </g>
      <text x="70" y="210" fill="#7A7D85" fontSize="8" fontFamily="monospace">192.168.1.1 [OK]</text>
      <text x="70" y="225" fill="#7A7D85" fontSize="8" fontFamily="monospace">192.168.1.45 [OK]</text>
      <text x="70" y="240" fill="#C7A24D" fontSize="8" fontFamily="monospace">192.168.1.102 [!]</text>

      {/* Main Panel: Code / Logs */}
      <rect x="220" y="90" width="320" height="240" rx="4" fill="#0E0F13" stroke="#3D3F46" strokeWidth="0.5" />
      <g fontSize="9" fontFamily="monospace">
        <text x="235" y="115" fill="#7A7D85">$ sudo apt-get update</text>
        <text x="235" y="135" fill="#B0B3B8">Hit:1 http://security.debian.org/ stable/updates</text>
        <text x="235" y="155" fill="#7A7D85">$ ./exploit_payload --target 192.168.1.102</text>
        <text x="235" y="175" fill="#C7A24D" className="animate-pulse">[*] Initializing memory corruption...</text>
        <text x="235" y="195" fill="#B0B3B8">[+] Buffer overflow successful.</text>
        <text x="235" y="215" fill="#B0B3B8">[+] Pivot to shell... [COMPLETE]</text>
        <text x="235" y="235" fill="#7A7D85">user@target:~$ _</text>
      </g>

      {/* Bottom Panel: Analytics */}
      <rect x="60" y="290" width="140" height="140" rx="4" fill="#0E0F13" stroke="#3D3F46" strokeWidth="0.5" />
      <text x="70" y="305" fill="#7A7D85" fontSize="9" fontFamily="monospace">SYSTEM_LOAD</text>
      <path d="M70 410 L90 380 L110 390 L130 350 L150 370 L170 340 L190 360" stroke="#C7A24D" strokeWidth="1" fill="none" opacity="0.8" />
      
      <rect x="220" y="350" width="320" height="80" rx="4" fill="#0E0F13" stroke="#3D3F46" strokeWidth="0.5" />
      <text x="235" y="370" fill="#7A7D85" fontSize="9" fontFamily="monospace">AUTH_LOGS</text>
      <text x="235" y="390" fill="#B0B3B8" fontSize="8" fontFamily="monospace">12:04:12 SSH login attempt from 10.0.0.4 - FAILED</text>
      <text x="235" y="405" fill="#B0B3B8" fontSize="8" fontFamily="monospace">12:04:15 SSH login attempt from 10.0.0.4 - FAILED</text>
      <text x="235" y="420" fill="#C7A24D" fontSize="8" fontFamily="monospace">12:05:01 SSH login SUCCESS for root</text>
      
      {/* Decorative Floating Hex Elements */}
      <g opacity="0.1" fill="none" stroke="#C7A24D" strokeWidth="0.5">
        <path d="M500 40 L530 20 L560 40 L560 70 L530 90 L500 70 Z" />
        <path d="M40 400 L70 380 L100 400 L100 430 L70 450 L40 430 Z" />
      </g>
    </svg>
  </motion.div>
);

const HeroSection: React.FC<{ onJoinClick?: () => void }> = ({ onJoinClick }) => {
  return (
    <section className="relative pt-12 pb-24 lg:pt-16 lg:pb-28 overflow-hidden bg-background">
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#C7A24D05_0%,transparent_40%)]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center max-w-7xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-text-primary leading-[1.1] tracking-tight">
              Build Real <br className="hidden xl:block"/>
              <span className="text-accent">Cybersecurity</span> <br className="hidden xl:block"/>
              Skills with learnhack.com
            </h1>
            
            <p className="mt-8 text-lg md:text-xl text-text-secondary leading-relaxed max-w-xl mx-auto lg:mx-0">
              Hands-on cyber security training through real-world scenarios. Master offensive and defensive skills in a safe, high-trust professional environment.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto lg:mx-0">
              <input 
                type="email" 
                placeholder="Email address"
                className="flex-grow px-5 py-4 bg-surface border border-text-disabled/20 rounded-md focus:border-accent focus:outline-none text-text-primary transition-all text-sm placeholder:text-text-disabled"
              />
              <button 
                onClick={onJoinClick}
                className="px-8 py-4 bg-accent text-background font-bold rounded-md hover:bg-accent-darker transition-all shadow-xl shadow-accent/10 whitespace-nowrap active:scale-[0.98]"
              >
                Start Learning for Free
              </button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-x-10 gap-y-4">
               <div className="flex items-center gap-2.5">
                 <CheckIcon className="w-4 h-4 text-accent" />
                 <span className="text-xs font-bold uppercase tracking-wider text-text-disabled">Beginner friendly</span>
               </div>
               <div className="flex items-center gap-2.5">
                 <CheckIcon className="w-4 h-4 text-accent" />
                 <span className="text-xs font-bold uppercase tracking-wider text-text-disabled">Guides and challenges</span>
               </div>
               <div className="flex items-center gap-2.5">
                 <CheckIcon className="w-4 h-4 text-accent" />
                 <span className="text-xs font-bold uppercase tracking-wider text-text-disabled">Real-world labs</span>
               </div>
            </div>
          </motion.div>

          <div className="flex justify-center items-center order-1 lg:order-2">
            <TerminalIllustration />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
