import React from 'react';
import HeroSection from './HeroSection';
import ValueProposition from './ValueProposition';
import LearningPaths from './LearningPaths';
import ProductPreview from './ProductPreview';
import Community from './Community';
import TrustedBy from './TrustedBy';
import FinalCTA from './FinalCTA';

interface LandingPageProps {
  onJoinClick: () => void;
  onDashboardClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onJoinClick, onDashboardClick }) => {
  return (
    <>
      <HeroSection onJoinClick={onJoinClick} />
      <ValueProposition />
      <LearningPaths />
      <ProductPreview />
      <Community />
      <TrustedBy />
      <FinalCTA onJoinClick={onJoinClick} />
    </>
  );
};

export default LandingPage;
