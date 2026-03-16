
import React from 'react';
import AnimatedSection from './AnimatedSection';

const PrincipleIcon: React.FC<{ type: 'guided' | 'fidelity' | 'depth' | 'feedback' }> = ({ type }) => {
  const baseClass = "w-6 h-6 text-accent opacity-80 group-hover:opacity-100 transition-opacity";
  switch (type) {
    case 'guided':
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className={baseClass}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A2 2 0 013 15.487V6.512a2 2 0 011.553-1.954l5.447-1.362a2 2 0 011.002 0l5.447 1.362A2 2 0 0118 6.512v8.975a2 2 0 01-1.553 1.954L11 20V12m0-8V1" />
        </svg>
      );
    case 'fidelity':
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className={baseClass}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      );
    case 'depth':
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className={baseClass}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
      );
    case 'feedback':
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className={baseClass}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      );
  }
};

const PrincipleCard: React.FC<{ type: 'guided' | 'fidelity' | 'depth' | 'feedback', title: string, desc: string }> = ({ type, title, desc }) => (
  <div className="group p-6 bg-surface-soft border border-text-disabled/10 rounded hover:border-accent/30 transition-all duration-300 h-full">
    <div className="mb-4">
      <PrincipleIcon type={type} />
    </div>
    <h4 className="text-text-primary font-bold mb-2 tracking-tight text-base">{title}</h4>
    <p className="text-sm text-text-secondary leading-relaxed font-normal">{desc}</p>
  </div>
);

const ValueProposition: React.FC = () => {
  return (
    <section className="bg-background py-24 border-t border-text-disabled/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Side: Philosophy */}
          <AnimatedSection className="lg:w-5/12" direction="left">
            <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded text-accent text-[10px] font-bold uppercase tracking-widest mb-6">
              Our Approach
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary leading-tight">
              Honest training for serious technical skill building.
            </h2>
            <div className="w-12 h-1 bg-accent/40 mt-6 mb-8 rounded-full"></div>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              Most platforms focus on volume. We focus on outcome. We've optimized every lab at learnhack.com to ensure you're actually learning the mechanics of cybersecurity, not just following a script.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              Our training is designed to be challenging but fair, prioritizing technical accuracy over gamified distraction.
            </p>
          </AnimatedSection>

          {/* Right Side: Principle Cards */}
          <AnimatedSection className="lg:w-7/12 grid sm:grid-cols-2 gap-4" direction="right" delay={0.2}>
            <PrincipleCard 
              type="guided" 
              title="Guided, Gamified Learning" 
              desc="Structured challenges and progressive tasks turn complex security concepts into clear, achievable milestones—keeping learners engaged while building real skills."
            />
            <PrincipleCard 
              type="fidelity" 
              title="High-Fidelity Environments" 
              desc="Train in environments that closely resemble real production systems, not simplified abstractions or toy simulations."
            />
            <PrincipleCard 
              type="depth" 
              title="Depth Over Breadth" 
              desc="Each module goes deep into protocols, vulnerabilities, and attack surfaces to strengthen fundamental understanding—not shallow exposure."
            />
            <PrincipleCard 
              type="feedback" 
              title="Intelligent Feedback Loops" 
              desc="Contextual hints, validation, and post-task explanations ensure you understand why something worked or failed, not just how to finish it."
            />
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
