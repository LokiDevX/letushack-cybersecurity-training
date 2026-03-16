
import React from 'react';
import CheckIcon from './icons/CheckIcon';
import AnimatedSection from './AnimatedSection';

const ProductMockup: React.FC = () => (
  <div className="bg-surface rounded-lg p-4 md:p-6 border border-text-disabled/20 shadow-xl">
    <div className="flex justify-between items-center mb-4">
      <h4 className="font-semibold text-text-primary">Network Fundamentals</h4>
      <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded-full">In Progress</span>
    </div>
    <div className="w-full bg-background rounded-full h-2.5 mb-6">
      <div className="bg-accent h-2.5 rounded-full" style={{ width: '45%' }}></div>
    </div>
    <div className="space-y-3">
      <div className="flex items-center gap-3 p-3 bg-background rounded">
        <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
            <CheckIcon className="w-3 h-3 text-background"/>
        </div>
        <span className="text-sm text-text-primary">What is a network?</span>
      </div>
      <div className="flex items-center gap-3 p-3 bg-background rounded">
        <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
            <CheckIcon className="w-3 h-3 text-background"/>
        </div>
        <span className="text-sm text-text-primary">OSI Model Explained</span>
      </div>
      <div className="flex items-center gap-3 p-3 bg-surface border border-accent rounded ring-2 ring-accent/30">
        <div className="w-5 h-5 rounded-full border-2 border-accent animate-pulse"></div>
        <span className="text-sm text-accent">Practical: Packet Analysis</span>
      </div>
      <div className="flex items-center gap-3 p-3 bg-background rounded opacity-50">
        <div className="w-5 h-5 rounded-full border-2 border-text-disabled"></div>
        <span className="text-sm text-text-secondary">Subnetting Challenge</span>
      </div>
    </div>
  </div>
);

const ProductPreview: React.FC = () => {
  const features = [
    'Exercises in every lesson',
    'Beginner-friendly explanations',
    'Start instantly in your browser',
    'Practice in real-world networks',
  ];

  return (
    <section className="bg-surface py-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection className="relative" direction="left">
            <ProductMockup />
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.2}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
              Hands-on hacking for all skill levels
            </h2>
            <p className="mt-4 text-text-secondary">
              Our platform isn't just about reading. It's about doing. Launch virtual machines and labs directly in your browser and apply your knowledge immediately.
            </p>
            <ul className="mt-8 space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-text-primary">{feature}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ProductPreview;
