import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import JoinPage from './components/JoinPage';
import Dashboard from './components/Dashboard';
import LearnPage from './components/LearnPage';
import PracticePage from './components/PracticePage';
import SecurityAnalystPage from './components/SecurityAnalystPage';
import CompletionPage from './components/CompletionPage';
import CompetePage from './components/CompetePage';
import Footer from './components/Footer';

export interface User {
  name: string;
  email: string;
  rank: string;
  xp: number;
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'join' | 'dashboard' | 'learn' | 'practice' | 'security-analyst' | 'completion' | 'compete'>('landing');
  const [user, setUser] = useState<User | null>(null);

  const navigateToLogin = () => setCurrentView('login');
  const navigateToJoin = () => setCurrentView('join');
  const navigateToHome = () => setCurrentView('landing');
  
  const navigateToDashboard = () => {
    if (!user) return navigateToLogin();
    setCurrentView('dashboard');
  };
  
  const navigateToLearn = () => {
    if (!user) return navigateToLogin();
    setCurrentView('learn');
  };

  const navigateToPractice = () => {
    if (!user) return navigateToLogin();
    setCurrentView('practice');
  };

  const navigateToSecurityAnalyst = () => {
    if (!user) return navigateToLogin();
    setCurrentView('security-analyst');
  };

  const navigateToCompletion = () => {
    if (!user) return navigateToLogin();
    setCurrentView('completion');
  };

  const navigateToCompete = () => {
    if (!user) return navigateToLogin();
    setCurrentView('compete');
  };

  const handleLoginSuccess = (email: string) => {
    setUser({
      name: email.split('@')[0],
      email: email,
      rank: '#4,102',
      xp: 8450
    });
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
  };

  // Scroll to top when view changes with smooth behavior
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  useEffect(() => {
    const protectedViews = ['dashboard', 'learn', 'practice', 'security-analyst', 'completion', 'compete'];
    if (protectedViews.includes(currentView) && !user) {
      setCurrentView('login');
    }
  }, [currentView, user]);

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar 
        onLoginClick={navigateToLogin} 
        onJoinClick={navigateToJoin} 
        onLogoClick={navigateToHome} 
        onDashboardClick={navigateToDashboard}
        onLearnClick={navigateToLearn}
        onPracticeClick={navigateToPractice}
        onLogoutClick={handleLogout}
        onCompleteClick={navigateToCompletion}
        onCompeteClick={navigateToCompete}
        isAuthenticated={!!user}
        user={user}
        activeView={currentView}
      />
      <AnimatePresence mode="wait">
        <motion.main 
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-grow flex flex-col"
        >
          {currentView === 'landing' && <LandingPage onJoinClick={navigateToJoin} onDashboardClick={navigateToDashboard} />}
          {currentView === 'login' && <LoginPage onBackToHome={navigateToHome} onJoinClick={navigateToJoin} onLoginSuccess={handleLoginSuccess} />}
          {currentView === 'join' && <JoinPage onBackToHome={navigateToHome} onLoginClick={navigateToLogin} onJoinSuccess={handleLoginSuccess} />}
          {currentView === 'dashboard' && <Dashboard onBackToHome={navigateToHome} user={user} />}
          {currentView === 'learn' && <LearnPage onBackToHome={navigateToHome} onTrackClick={(title) => {
            if (title === 'Security Analyst') navigateToSecurityAnalyst();
          }} />}
          {currentView === 'practice' && <PracticePage />}
          {currentView === 'security-analyst' && <SecurityAnalystPage onBackToLearn={navigateToLearn} onMissionComplete={navigateToCompletion} />}
          {currentView === 'completion' && <CompletionPage onContinue={navigateToLearn} onDashboard={navigateToDashboard} />}
          {currentView === 'compete' && <CompetePage />}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default App;
