import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import BrutalistButton from './BrutalistButton.tsx';
import { faProjectDiagram, faDollarSign, faTools, faHistory } from '@fortawesome/free-solid-svg-icons';
import HeroCard from './HeroCard.tsx';
import PricingCard from './PricingCard.tsx';
import SkillsCard from './SkillsCard.tsx';
import AboutCard from './AboutCard.tsx';
import HeroPic from '../assets/images/DCPhoto-stylized.png';

const HeroSection: React.FC = () => {
  // Changed null to 'home' to treat profile as a card type
  const [activeView, setActiveView] = useState<'home' | 'projects' | 'pricing' | 'skills' | 'about'>('home');
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<HTMLDivElement[]>([]);
  
  // Store button refs
  const addToButtonRefs = (el: HTMLDivElement | null) => {
    if (el && !buttonRefs.current.includes(el)) {
      buttonRefs.current.push(el);
    }
  };

  // Initial entrance animation with staggered elements
  useEffect(() => {
    // Initial state - hide everything
    gsap.set([headerRef.current, buttonsContainerRef.current, cardContainerRef.current], { 
      opacity: 0, 
      y: 20 
    });
    
    // Set initial state for buttons
    buttonRefs.current.forEach(button => {
      gsap.set(button, { opacity: 0, y: 20 });
    });
    
    // Create an animation timeline
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Animate header
    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    });
    
    // Animate profile (as card)
    tl.to(cardContainerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "back.out(1.5)"
    }, "-=0.3");
    
    // Animate buttons container
    tl.to(buttonsContainerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.2");
    
    // Staggered animation for individual buttons
    tl.to(buttonRefs.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.2)"
    }, "-=0.1");
    
    return () => {
      tl.kill();
    };
  }, []);

  // Unified animation for all view changes
  const handleViewChange = (newView: 'projects' | 'pricing' | 'skills' | 'about') => {
    if (activeView === newView) return; // Skip if same view is clicked
    
    // Always use the same animation pattern regardless of current view
    if (cardContainerRef.current) {
      gsap.to(cardContainerRef.current, { 
        x: -50,
        opacity: 0, 
        duration: 0.3, 
        ease: 'power1.out',
        onComplete: () => {
          setActiveView(newView);
          
          gsap.fromTo(cardContainerRef.current, 
            { x: 50, opacity: 0 }, 
            { x: 0, opacity: 1, duration: 0.3, ease: 'power1.out' }
          );
        }
      });
    }
  };

  // Function to return to home/profile
  const returnToHome = () => {
    if (activeView === 'home') return;
    
    if (cardContainerRef.current) {
      gsap.to(cardContainerRef.current, { 
        x: -50,
        opacity: 0, 
        duration: 0.3, 
        ease: 'power1.out',
        onComplete: () => {
          setActiveView('home');
          
          gsap.fromTo(cardContainerRef.current, 
            { x: 50, opacity: 0 }, 
            { x: 0, opacity: 1, duration: 0.3, ease: 'power1.out' }
          );
        }
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center">
        {/* Left Column: Header and Buttons */}
        <div className="flex-1">
          <header ref={headerRef} className="mb-8">
            <h1 className="mb-4">Welcome to My Portfolio</h1>
            <p className="text-lg mb-8">
              Explore my projects, skills, and more with a minimalistic approach.
            </p>
          </header>
          <div ref={buttonsContainerRef} className="flex flex-wrap gap-8">
            <div ref={addToButtonRefs}>
              <BrutalistButton
                label="See My"
                subLabel="Projects"
                icon={faProjectDiagram}
                btnColor="hsla(12, 83%, 62%, 1)"  // Burnt Sienna
                iconColor="#fff"
                onClick={() => handleViewChange('projects')}
              />
            </div>
            <div ref={addToButtonRefs}>
              <BrutalistButton
                label="Check My"
                subLabel="Pricing"
                icon={faDollarSign}
                btnColor="hsla(16, 85%, 68%, 1)"  // Coral
                iconColor="#fff"
                onClick={() => handleViewChange('pricing')}
              />
            </div>
            <div ref={addToButtonRefs}>
              <BrutalistButton
                label="What Are"
                subLabel="My Skills?"
                icon={faTools}
                btnColor="hsla(274, 53%, 37%, 1)"  // Rebecca Purple
                iconColor="#fff"
                onClick={() => handleViewChange('skills')}
              />
            </div>
            <div ref={addToButtonRefs}>
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
        </div>
        
        {/* Right Column: Cards (including profile as a card) */}
        <div className="flex-1 flex justify-end mt-8 md:mt-0">
          <div ref={cardContainerRef} className="card-container">
            {activeView === 'home' && (
              <div className="profile-pic-container">
                <img 
                  src={HeroPic} 
                  alt="Profile" 
                  className="profile-pic"
                />
              </div>
            )}
            {activeView === 'projects' && <HeroCard />}
            {activeView === 'pricing' && <PricingCard />}
            {activeView === 'skills' && <SkillsCard />}
            {activeView === 'about' && <AboutCard />}
          </div>
        </div>
      </div>

      {/* Styles for profile picture and cards */}
      <style jsx>{`
        .card-container {
          position: relative;
          z-index: 5;
          width: 100%;
        }
        
        .profile-pic-container {
          position: relative;
          padding: 10px;
          max-width: 800px;
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        
        .profile-pic {
          width: 100%;
          height: auto;
          border: 3px solid var(--jet, #222);
          transform: translateZ(0);
          position: relative;
          z-index: 2;
          box-shadow: 
            0 1px 1px rgba(0,0,0,0.15), 
            0 2px 2px rgba(0,0,0,0.15), 
            0 4px 4px rgba(0,0,0,0.15), 
            0 8px 8px rgba(0,0,0,0.15);
        }
        
        .profile-pic-container::before {
          content: '';
          position: absolute;
          top: 40px;
          left: 40px;
          width: calc(100% - 40px);
          height: calc(100% - 40px);
          background-color: var(--persian-green, hsla(175, 75%, 36%, 1));
          border: 3px solid var(--jet, #222);
          z-index: 1;
          transform: translateZ(-20px);
        }
        
        .profile-pic-container::after {
          content: '';
          position: absolute;
          top: 60px;
          left: 60px;
          width: calc(100% - 80px);
          height: calc(100% - 80px);
          background-color: var(--coral, hsla(16, 85%, 68%, 1));
          border: 3px solid var(--jet, #222);
          z-index: 0;
          transform: translateZ(-40px);
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .profile-pic-container {
            max-width: 600px;
            margin: 0 auto;
          }
          
          .profile-pic-container::before {
            top: 30px;
            left: 30px;
          }
          
          .profile-pic-container::after {
            top: 50px;
            left: 50px;
          }
        }
        
        @media (max-width: 480px) {
          .profile-pic-container {
            max-width: 500px;
          }
          
          .profile-pic-container::before {
            top: 20px;
            left: 20px;
          }
          
          .profile-pic-container::after {
            top: 36px;
            left: 36px;
          }
        }
        
        /* Landscape orientation adjustments */
        @media (orientation: landscape) and (max-height: 600px) {
          .profile-pic-container {
            max-width: 440px;
          }
          
          .profile-pic-container::before {
            top: 16px;
            left: 16px;
          }
          
          .profile-pic-container::after {
            top: 28px;
            left: 28px;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;