import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { IntroSplash } from './src/components/IntroSplash';
import { supabase } from './src/lib/supabase';

const MainApp = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Current session:', session);
    };
    
    checkSession();
  }, []);

  if (showIntro) {
    return <IntroSplash onComplete={() => setShowIntro(false)} />;
  }

  return <App />;
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);
