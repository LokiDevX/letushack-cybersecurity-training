import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ShieldIcon from './icons/ShieldIcon';
import MenuIcon from './icons/MenuIcon';
import { User } from '../App';

interface NavbarProps {
  onLoginClick: () => void;
  onJoinClick: () => void;
  onLogoClick: () => void;
  onDashboardClick: () => void;
  onLearnClick: () => void;
  onPracticeClick: () => void;
  onLogoutClick: () => void;
  onCompleteClick?: () => void;
  onCompeteClick?: () => void;
  isAuthenticated: boolean;
  user: User | null;
  activeView: string;
}

const NavItem: React.FC<{ icon: React.ReactNode, label: string, onClick?: () => void, active?: boolean }> = ({ icon, label, onClick, active }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-1 group outline-none">
    <div className={`transition-colors duration-200 ${active ? 'text-accent' : 'text-text-secondary group-hover:text-text-primary'}`}>
      {icon}
    </div>
    <span className={`text-[11px] font-medium transition-colors duration-200 ${active ? 'text-accent' : 'text-text-secondary group-hover:text-text-primary'}`}>
      {label}
    </span>
  </button>
);

const Navbar: React.FC<NavbarProps> = ({ 
  onLoginClick, 
  onJoinClick, 
  onLogoClick, 
  onDashboardClick, 
  onLearnClick, 
  onPracticeClick,
  onLogoutClick,
  onCompleteClick,
  onCompeteClick,
  isAuthenticated,
  user,
  activeView
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-white/5' : 'bg-background'}`}
    >
      <nav className="container mx-auto px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button onClick={onLogoClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="relative">
                 <ShieldIcon className="h-9 w-9 text-text-primary" />
                 <div className="absolute -top-1 -right-1 text-[8px] font-mono leading-none text-accent">
                   10 10<br/>1110<br/>0101<br/>01 01
                 </div>
              </div>
              <div className="flex flex-col -space-y-1 text-left">
                <span className="font-heading text-xl font-bold text-text-primary leading-none">LetUs</span>
                <span className="font-heading text-xl font-bold text-text-primary leading-none">Hack</span>
              </div>
            </button>
            
            <div className="hidden xl:flex items-center gap-8">
              {isAuthenticated ? (
                <>
                  <NavItem onClick={onDashboardClick} active={activeView === 'dashboard'} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>} label="Dashboard" />
                  <NavItem onClick={onLearnClick} active={activeView === 'learn'} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>} label="Learn" />
                  <NavItem onClick={onPracticeClick} active={activeView === 'practice'} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} label="Practice" />
                  <NavItem onClick={onCompeteClick} active={activeView === 'compete'} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 011 1V4z" /></svg>} label="Compete" />
                </>
              ) : (
                <>
                  <NavItem icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>} label="Business" />
                  <NavItem icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>} label="Education" />
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {activeView === 'security-analyst' && (
              <button 
                onClick={onCompleteClick}
                className="flex px-4 py-2 bg-accent/20 border border-accent/40 rounded text-[10px] font-bold text-accent uppercase tracking-widest hover:bg-accent hover:text-background transition-all animate-pulse"
              >
                Complete Mission
              </button>
            )}

            <button className="p-2 text-text-secondary hover:text-text-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="hidden md:flex flex-col items-end">
                   <span className="text-xs font-bold text-text-primary leading-none uppercase tracking-tight">{user?.name}</span>
                   <span className="text-[10px] text-accent font-bold uppercase tracking-widest">{user?.rank}</span>
                </div>
                <button 
                  onClick={onLogoutClick}
                  className="px-5 py-2 text-sm font-semibold text-text-secondary border border-text-disabled/20 rounded hover:text-text-primary hover:border-text-disabled/40 transition-colors"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <button 
                  onClick={onLoginClick}
                  className="px-5 py-2 text-sm font-semibold text-text-primary border border-text-disabled/40 rounded hover:bg-white/5 transition-colors"
                >
                  Log In
                </button>
                <button 
                  onClick={onJoinClick}
                  className="px-5 py-2 text-sm font-bold bg-accent text-background rounded hover:bg-accent-darker transition-colors shadow-lg shadow-accent/10"
                >
                  Join for FREE
                </button>
              </div>
            )}
            
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="xl:hidden text-text-primary">
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="xl:hidden bg-surface absolute top-full left-0 w-full border-b border-white/5 shadow-2xl">
          <div className="grid grid-cols-2 gap-4 p-6">
            {isAuthenticated ? (
              <>
                <NavItem onClick={() => { onDashboardClick(); setIsMenuOpen(false); }} active={activeView === 'dashboard'} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>} label="Dashboard" />
                <NavItem onClick={() => { onLearnClick(); setIsMenuOpen(false); }} active={activeView === 'learn'} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>} label="Learn" />
                <NavItem onClick={() => { onPracticeClick(); setIsMenuOpen(false); }} active={activeView === 'practice'} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} label="Practice" />
                <NavItem onClick={() => { onCompeteClick?.(); setIsMenuOpen(false); }} active={activeView === 'compete'} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 011 1V4z" /></svg>} label="Compete" />
              </>
            ) : null}
          </div>
          <div className="flex flex-col gap-3 p-6 pt-0">
             {activeView === 'security-analyst' && (
               <button onClick={() => { onCompleteClick?.(); setIsMenuOpen(false); }} className="w-full text-center py-3 text-sm font-bold bg-accent text-background rounded mb-2">Complete Mission</button>
             )}
             {isAuthenticated ? (
               <button onClick={() => { onLogoutClick(); setIsMenuOpen(false); }} className="w-full text-center py-3 text-sm font-semibold text-text-primary border border-text-disabled/40 rounded">Log Out</button>
             ) : (
               <>
                 <button onClick={() => { onLoginClick(); setIsMenuOpen(false); }} className="w-full text-center py-3 text-sm font-semibold text-text-primary border border-text-disabled/40 rounded">Log In</button>
                 <button onClick={() => { onJoinClick(); setIsMenuOpen(false); }} className="w-full text-center py-3 text-sm font-bold bg-accent text-background rounded">Join for FREE</button>
               </>
             )}
          </div>
        </div>
      )}
    </motion.header>
  );
};

export default Navbar;
