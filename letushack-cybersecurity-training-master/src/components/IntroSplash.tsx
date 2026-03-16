import React, { useState, useEffect } from 'react';

interface IntroSplashProps {
  onComplete: () => void;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({ onComplete }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const lines = [
    { text: 'initializing system...', delay: 400 },
    { text: 'loading modules...', delay: 600 },
    { text: 'authentication layer ready', delay: 800 },
    { text: 'LEARNHACK.COM', delay: 1000, isTitle: true },
    { text: 'access granted', delay: 800, isFinal: true },
  ];

  useEffect(() => {
    if (currentLine < lines.length) {
      const timer = setTimeout(() => {
        setCurrentLine(currentLine + 1);
      }, lines[currentLine].delay);
      return () => clearTimeout(timer);
    } else {
      const fadeTimer = setTimeout(() => {
        setFadeOut(true);
      }, 300);
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [currentLine]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-background flex items-center justify-center transition-opacity duration-700 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ pointerEvents: fadeOut ? 'none' : 'auto' }}
    >
      {/* Laptop/Terminal Frame */}
      <div className="relative w-full max-w-4xl mx-auto px-4">
        {/* Top Bar */}
        <div className="bg-surface-soft rounded-t-lg px-4 py-3 flex items-center gap-2 border border-steel-blue/20">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="flex-1 text-center">
            <span className="text-text-disabled text-sm font-mono">
              terminal://learnhack.com/init
            </span>
          </div>
        </div>

        {/* Terminal Screen */}
        <div className="bg-surface border-x border-b border-steel-blue/20 rounded-b-lg p-8 min-h-[400px] flex flex-col justify-center shadow-2xl">
          <div className="font-mono text-left space-y-1">
            {lines.slice(0, currentLine).map((line, index) => (
              <div
                key={index}
                className={`${
                  line.isTitle
                    ? 'text-5xl font-bold text-accent mt-12 mb-12 text-center tracking-wider font-heading'
                    : line.isFinal
                    ? 'text-lg text-accent mt-8 flex items-center gap-2'
                    : 'text-base text-text-secondary flex items-center gap-2'
                }`}
                style={{
                  textShadow: line.isTitle
                    ? '0 0 30px rgba(199, 162, 77, 0.6), 0 0 60px rgba(199, 162, 77, 0.3)'
                    : '0 0 10px rgba(176, 179, 184, 0.2)',
                }}
              >
                {!line.isTitle && <span className="text-accent">{'>'}</span>}
                <span>{line.text}</span>
                {index === currentLine - 1 && !line.isTitle && (
                  <span className="inline-block w-2 h-5 ml-1 bg-accent animate-pulse"></span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Shadow */}
        <div className="h-4 bg-gradient-to-b from-steel-blue/10 to-transparent rounded-b-lg blur-sm"></div>
      </div>
    </div>
  );
};
