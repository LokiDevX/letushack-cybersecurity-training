import React from 'react';

const CompetePage: React.FC = () => {
  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Compete & Challenges
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Test your skills against real-world scenarios and compete with the community.
          </p>
        </div>

        {/* Coming Soon */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-surface border border-white/5 rounded-lg p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-accent/20 flex items-center justify-center">
              <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 011 1V4z" />
              </svg>
            </div>
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-3">
              Competition Platform Coming Soon
            </h2>
            <p className="text-text-secondary mb-8 leading-relaxed">
              We're building a comprehensive CTF and challenge platform where you can test your skills,
              compete with peers, and climb the global leaderboard.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-left">
              <div className="bg-background/50 p-4 rounded border border-white/5">
                <h3 className="text-accent font-bold text-sm mb-2 uppercase tracking-widest">CTF Events</h3>
                <p className="text-xs text-text-secondary">Weekly capture-the-flag competitions</p>
              </div>
              <div className="bg-background/50 p-4 rounded border border-white/5">
                <h3 className="text-accent font-bold text-sm mb-2 uppercase tracking-widest">Leaderboards</h3>
                <p className="text-xs text-text-secondary">Global and category-based rankings</p>
              </div>
              <div className="bg-background/50 p-4 rounded border border-white/5">
                <h3 className="text-accent font-bold text-sm mb-2 uppercase tracking-widest">Achievements</h3>
                <p className="text-xs text-text-secondary">Badges and certifications</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetePage;
