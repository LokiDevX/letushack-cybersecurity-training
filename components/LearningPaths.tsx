
import React from 'react';
import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';

interface PathCardProps {
  title: string;
  description: string;
  visual: React.ReactNode;
  tag: string;
}

const PathVisual: React.FC<{ type: 'foundation' | 'offensive' | 'architecture' }> = ({ type }) => {
  const baseLine = "stroke-accent/20";
  const accentLine = "stroke-accent/60";
  
  if (type === 'foundation') {
    return (
      <svg viewBox="0 0 400 200" fill="none" className="w-full h-full opacity-60">
        <path d="M50 150 L350 150" className={baseLine} strokeWidth="1" />
        <path d="M50 100 L350 100" className={baseLine} strokeWidth="1" />
        <path d="M50 50 L350 50" className={baseLine} strokeWidth="1" />
        <rect x="80" y="40" width="40" height="120" rx="2" fill="#1F2229" stroke="#C7A24D" strokeWidth="0.5" className="animate-pulse" />
        <rect x="180" y="70" width="40" height="90" rx="2" fill="#1F2229" stroke="#3D3F46" strokeWidth="0.5" />
        <rect x="280" y="90" width="40" height="70" rx="2" fill="#1F2229" stroke="#3D3F46" strokeWidth="0.5" />
        <circle cx="100" cy="50" r="2" fill="#C7A24D" />
        <circle cx="200" cy="100" r="2" fill="#7A7D85" />
        <circle cx="300" cy="150" r="2" fill="#7A7D85" />
      </svg>
    );
  }
  if (type === 'offensive') {
    return (
      <svg viewBox="0 0 400 200" fill="none" className="w-full h-full opacity-60">
        <circle cx="200" cy="100" r="60" className={baseLine} strokeWidth="0.5" strokeDasharray="4 4" />
        <circle cx="200" cy="100" r="40" className={baseLine} strokeWidth="0.5" />
        <circle cx="200" cy="100" r="5" fill="#C7A24D" className="animate-pulse" />
        <g className="animate-spin-slow" style={{ transformOrigin: '200px 100px' }}>
          <line x1="200" y1="40" x2="200" y2="70" className={accentLine} strokeWidth="1.5" />
          <path d="M140 100 L110 100" className={baseLine} strokeWidth="1" />
          <path d="M260 100 L290 100" className={baseLine} strokeWidth="1" />
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 200" fill="none" className="w-full h-full opacity-60">
      <g strokeWidth="0.5" className={baseLine}>
        <rect x="100" y="50" width="60" height="40" rx="2" />
        <rect x="240" y="50" width="60" height="40" rx="2" />
        <rect x="170" y="110" width="60" height="40" rx="2" stroke="#C7A24D" strokeWidth="1" />
        <path d="M130 90 V130 H170" />
        <path d="M270 90 V130 H230" />
      </g>
      <circle cx="130" cy="90" r="2" fill="#3D3F46" />
      <circle cx="270" cy="90" r="2" fill="#3D3F46" />
      <circle cx="170" cy="130" r="2" fill="#C7A24D" />
    </svg>
  );
};

const PathCard: React.FC<PathCardProps> = ({ title, description, visual, tag }) => (
  <motion.div 
    whileHover={{ y: -8, transition: { duration: 0.3 } }}
    className="flex flex-col bg-surface border border-text-disabled/10 rounded-md overflow-hidden transition-all duration-300 hover:border-accent/30 hover:shadow-2xl group"
  >
    <div className="h-40 bg-background/50 relative flex items-center justify-center border-b border-text-disabled/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#C7A24D05_0%,transparent_70%)]"></div>
      {visual}
      <div className="absolute top-4 left-4">
        <span className="px-2 py-1 bg-surface-soft border border-text-disabled/20 rounded text-[9px] font-bold uppercase tracking-widest text-text-disabled group-hover:text-accent group-hover:border-accent/30 transition-colors">
          {tag}
        </span>
      </div>
    </div>
    <div className="p-8 flex flex-col flex-grow">
      <h3 className="font-heading text-xl font-bold text-text-primary tracking-tight mb-3">
        {title}
      </h3>
      <p className="text-sm text-text-secondary leading-relaxed mb-8 flex-grow">
        {description}
      </p>
      <button className="w-full py-3 px-4 bg-surface-soft border border-text-disabled/20 rounded text-sm font-bold text-text-primary hover:bg-accent hover:text-background hover:border-accent transition-all duration-200">
        View Path Details
      </button>
    </div>
  </motion.div>
);

const LearningPaths: React.FC = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <AnimatedSection className="max-w-3xl mb-16">
          <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded text-accent text-[10px] font-bold uppercase tracking-widest mb-6">
            Curriculum
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-text-primary leading-tight">
            Structured paths for clear results.
          </h2>
          <p className="mt-6 text-text-secondary text-lg leading-relaxed max-w-xl">
            Precision-engineered learning tracks designed to take you from foundational understanding to professional mastery.
          </p>
        </AnimatedSection>

        <AnimatedSection className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" delay={0.2}>
          <PathCard 
            tag="Level 1"
            title="Security Foundation" 
            description="Master the core protocols, networking essentials, and defensive principles required for any security role."
            visual={<PathVisual type="foundation" />}
          />
          <PathCard 
            tag="Level 2"
            title="Offensive Operations" 
            description="A deep dive into advanced exploitation techniques, penetration testing, and red team methodologies."
            visual={<PathVisual type="offensive" />}
          />
          <PathCard 
            tag="Specialist"
            title="Security Architecture" 
            description="Learn to design, implement, and maintain high-security enterprise infrastructures and cloud systems."
            visual={<PathVisual type="architecture" />}
          />
        </AnimatedSection>

        <div className="mt-16 pt-8 border-t border-text-disabled/5 flex justify-center">
          <a href="#" className="flex items-center gap-2 text-text-disabled hover:text-accent font-bold text-xs uppercase tracking-widest transition-colors">
            Explore All Specialized Tracks
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default LearningPaths;
