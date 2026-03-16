
import React from 'react';
import { motion } from 'framer-motion';

const FinalCTA: React.FC<{ onJoinClick?: () => void }> = ({ onJoinClick }) => {
  return (
    <section className="bg-surface py-24 relative overflow-hidden border-t border-text-disabled/10">
        <div 
          className="absolute inset-0 bg-[radial-gradient(#C7A24D15_1px,transparent_1px)] [background-size:24px_24px] opacity-40"
          style={{ maskImage: 'radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)' }}
        ></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-6 text-center relative z-10"
        >
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-text-primary max-w-2xl mx-auto leading-tight">
                Master the craft of <span className="text-accent">Cybersecurity</span> today
            </h2>
            <p className="mt-6 text-text-secondary max-w-lg mx-auto">
                Join thousands of students and professionals who have chosen learnhack.com as their primary training grounds.
            </p>
            <button 
              onClick={onJoinClick}
              className="mt-10 bg-accent text-background font-bold px-10 py-4 rounded-md text-lg hover:bg-accent-darker transition-all duration-200 transform hover:scale-105 shadow-xl shadow-accent/20"
            >
                Start Your Journey
            </button>
        </motion.div>
    </section>
  );
};

export default FinalCTA;
