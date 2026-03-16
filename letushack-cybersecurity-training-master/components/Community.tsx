
import React from 'react';
import StarIcon from './icons/StarIcon';
import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  name: string;
  role: string;
  text: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, text }) => (
  <motion.div 
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className="bg-surface p-6 rounded-lg border border-text-disabled/20"
  >
    <div className="flex items-center mb-2">
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
      ))}
    </div>
    <p className="text-text-secondary italic">"{text}"</p>
    <div className="mt-4">
      <p className="font-semibold text-text-primary">{name}</p>
      <p className="text-sm text-text-disabled">{role}</p>
    </div>
  </motion.div>
);

const Community: React.FC = () => {
  const testimonials = [
    { name: 'Alex Johnson', role: 'Cybersecurity Student', text: 'learnhack.com made complex topics easy to understand. The hands-on labs are the best part!' },
    { name: 'Sarah Lee', role: 'Aspiring Pen Tester', text: 'I went from zero knowledge to landing my first internship. This platform is a game-changer.' },
    { name: 'Mike Chen', role: 'IT Professional', text: 'A great way to upskill and stay current. The content is practical and relevant.' },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          <AnimatedSection direction="left">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
              Join our growing community
            </h2>
            <p className="mt-4 text-text-secondary">
              Learn alongside thousands of other students, hobbyists, and professionals. Share knowledge, collaborate on challenges, and grow your network in the cybersecurity space.
            </p>
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.2} className="bg-surface p-8 rounded-lg text-center border border-text-disabled/20">
            <p className="font-heading text-6xl font-bold text-accent">100,000+</p>
            <p className="text-lg text-text-secondary mt-2">Learners Worldwide</p>
          </AnimatedSection>
        </div>
        <AnimatedSection className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" delay={0.3}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Community;
