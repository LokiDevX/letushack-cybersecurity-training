
import React from 'react';
import ShieldIcon from './icons/ShieldIcon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-text-disabled/20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <ShieldIcon className="h-6 w-6 text-text-secondary" />
            <span className="font-heading text-xl font-bold text-text-secondary">learnhack.com</span>
          </div>
          <p className="text-sm text-text-disabled">
            © {new Date().getFullYear()} learnhack.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
