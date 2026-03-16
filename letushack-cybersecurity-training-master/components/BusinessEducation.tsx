
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface InfoCardProps {
  title: string;
  description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description }) => (
    <div className="bg-surface-soft p-10 rounded-lg border border-text-disabled/10 flex flex-col items-start h-full group transition-all hover:border-accent/20">
        <div className="w-full h-40 bg-background/50 rounded-md mb-8 flex items-center justify-center border border-text-disabled/5 overflow-hidden">
            <div className="w-12 h-12 rounded-full border-2 border-accent/20 group-hover:border-accent/40 transition-colors flex items-center justify-center">
               <div className="w-2 h-2 rounded-full bg-accent"></div>
            </div>
        </div>
        <h3 className="font-heading text-2xl font-bold text-text-primary">{title}</h3>
        <p className="mt-3 text-text-secondary flex-grow leading-relaxed">{description}</p>
        <button className="mt-8 text-accent font-bold text-sm uppercase tracking-widest hover:text-accent-darker flex items-center gap-2 group/btn">
            Learn More
            <span className="transition-transform group-hover/btn:translate-x-1">→</span>
        </button>
    </div>
);


const BusinessEducation: React.FC = () => {
    return (
        <section className="py-24 bg-surface">
            <div className="container mx-auto px-6">
                <AnimatedSection className="grid md:grid-cols-2 gap-8">
                    <InfoCard 
                        title="learnhack.com for Business" 
                        description="Empower your security teams with private learning environments, custom tracks, and advanced administrative analytics."
                    />
                    <InfoCard 
                        title="learnhack.com for Education" 
                        description="Deploy a world-class cybersecurity lab for your institution. Seamlessly integrated hands-on learning for your curriculum."
                    />
                </AnimatedSection>
            </div>
        </section>
    );
};

export default BusinessEducation;
