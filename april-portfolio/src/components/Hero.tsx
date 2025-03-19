import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import BrutalistButton from './BrutalistButton.tsx';
import { faProjectDiagram, faDollarSign, faTools, faHistory } from '@fortawesome/free-solid-svg-icons';
import HeroCard from './HeroCard.tsx';
import PricingCard from './PricingCard.tsx';
import SkillsCard from './SkillsCard.tsx';
import AboutCard from './AboutCard.tsx';

const HeroSection: React.FC = () => {
  const [activeView, setActiveView] = useState<'projects' | 'pricing' | 'skills' | 'about'>('projects');
  const cardContainerRef = useRef<HTMLDivElement>(null);

  // Animate the current card out, then switch view and animate in.
  const handleViewChange = (newView: 'projects' | 'pricing' | 'skills' | 'about') => {
    if (cardContainerRef.current) {
      gsap.to(cardContainerRef.current, { 
        opacity: 0, 
        duration: 0.3, 
        onComplete: () => {
          setActiveView(newView);
          gsap.fromTo(cardContainerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        }
      });
    } else {
      setActiveView(newView);
    }
  };

  return (
    <section className="min-h-screen flex items-center">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center">
        {/* Left Column: Header and Buttons */}
        <div className="flex-1">
          <header className="mb-8">
            <h1 className="mb-4">Welcome to My Portfolio</h1>
            <p className="text-lg mb-8">
              Explore my projects, skills, and more with a minimalistic approach.
            </p>
          </header>
          <div className="flex flex-wrap gap-8">
            <BrutalistButton
              label="See My"
              subLabel="Projects"
              icon={faProjectDiagram}
              btnColor="hsla(12, 83%, 62%, 1)"  // Burnt Sienna
              iconColor="#fff"
              onClick={() => handleViewChange('projects')}
            />
            <BrutalistButton
              label="Check My"
              subLabel="Pricing"
              icon={faDollarSign}
              btnColor="hsla(16, 85%, 68%, 1)"  // Coral
              iconColor="#fff"
              onClick={() => handleViewChange('pricing')}
            />
            <BrutalistButton
              label="What Are"
              subLabel="My Skills?"
              icon={faTools}
              btnColor="hsla(274, 53%, 37%, 1)"  // Rebecca Purple
              iconColor="#fff"
              onClick={() => handleViewChange('skills')}
            />
            <BrutalistButton
              label="Learn About"
              subLabel="My History"
              icon={faHistory}
              btnColor="hsla(175, 75%, 36%, 1)"  // Persian Green
              iconColor="#fff"
              onClick={() => handleViewChange('about')}
            />
          </div>
        </div>
        {/* Right Column: Conditional Card Rendering with Animation */}
        <div ref={cardContainerRef} className="flex-1 flex justify-end mt-8 md:mt-0">
          {activeView === 'projects' && <HeroCard />}
          {activeView === 'pricing' && <PricingCard />}
          {activeView === 'skills' && <SkillsCard />}
          {activeView === 'about' && <AboutCard />}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;