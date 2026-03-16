
import React from 'react';
import AnimatedSection from './AnimatedSection';

const Logo: React.FC<{ name: string }> = ({ name }) => (
  <div className="text-text-disabled font-heading text-xl filter grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
    {name}
  </div>
);

const TrustedBy: React.FC = () => {
  const logos = ['Tech University', 'Cyber Club', 'State College', 'Code Community', 'Security Guild'];
  
  return (
    <section className="py-20">
      <AnimatedSection className="container mx-auto px-6 text-center">
        <h3 className="text-lg font-semibold text-text-secondary tracking-widest uppercase">
          Trusted By
        </h3>
        <div className="mt-8 flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          {logos.map(logo => <Logo key={logo} name={logo} />)}
        </div>
      </AnimatedSection>
    </section>
  );
};

export default TrustedBy;
