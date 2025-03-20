import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import BrutalistButton from './BrutalistButton.tsx';
import { skillCategories } from '../data/skillCategories.ts';

const SkillsCard: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [expandedSkill, setExpandedSkill] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const skillsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      // Reset expanded skill when changing categories
      setExpandedSkill(null);
      
      // Animate the card
      gsap.fromTo(cardRef.current, 
        { opacity: 0, x: -50 }, 
        { opacity: 1, x: 0, duration: 0.5 }
      );
    }
  }, [currentCategory]);

  const nextCategory = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cardRef.current) {
      gsap.to(cardRef.current, { 
        opacity: 0, 
        x: 50, 
        duration: 0.3, 
        onComplete: () => {
          setCurrentCategory((prev) => (prev + 1) % skillCategories.length);
        }
      });
    }
  };

  const prevCategory = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cardRef.current) {
      gsap.to(cardRef.current, { 
        opacity: 0, 
        x: -50, 
        duration: 0.3, 
        onComplete: () => {
          setCurrentCategory((prev) => (prev - 1 + skillCategories.length) % skillCategories.length);
        }
      });
    }
  };

  const toggleSkill = (index: number) => {
    setExpandedSkill(expandedSkill === index ? null : index);
    
    // Animate the skills container height when expanding/collapsing
    if (skillsContainerRef.current) {
      gsap.to(skillsContainerRef.current, {
        height: 'auto',
        duration: 0.3,
        ease: 'power1.out'
      });
    }
  };

  const currentCategoryData = skillCategories[currentCategory];

  return (
    <>
      <style>{`
        .skills-card {
          font-family: var(--font-base);
          width: 90%;
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
          background: var(--rebecca-purple, hsla(274, 53%, 37%, 1));
          border: 3px solid var(--jet);
          box-shadow: 12px 12px 0 var(--jet);
          color: var(--neutral-white);
          position: relative;
          overflow: hidden;
        }
        
        .category-header {
          margin-bottom: 1.5rem;
          text-align: center;
        }
        
        .category-icon {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
        
        .category-title {
          font-size: 1.75rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        
        .category-description {
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .skills-list {
          list-style: none;
          padding: 0;
          margin: 0;
          max-height: 350px;
          overflow-y: auto;
          margin-bottom: 1rem;
        }
        
        .skill-item {
          margin-bottom: 0.75rem;
          padding: 0.75rem;
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .skill-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .skill-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .skill-name {
          display: flex;
          align-items: center;
          font-weight: bold;
        }
        
        .skill-icon {
          margin-right: 0.5rem;
          font-size: 1.2rem;
        }
        
        .skill-content {
          height: 0;
          overflow: hidden;
          padding: 0;
          transition: all 0.3s ease;
        }
        
        .skill-content.expanded {
          height: auto;
          padding-top: 0.75rem;
          margin-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .skill-description {
          margin-bottom: 0.5rem;
        }
        
        .skill-link {
          display: inline-block;
          color: #fff;
          text-decoration: underline;
          font-size: 0.9rem;
        }
        
        .nav-controls {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 1rem;
        }
      `}</style>
      <div ref={cardRef} className="skills-card">
        <div className="category-header">
          <div className="category-icon">
            <FontAwesomeIcon icon={currentCategoryData.icon} />
          </div>
          <h2 className="category-title">{currentCategoryData.category}</h2>
          <p className="category-description">{currentCategoryData.description}</p>
        </div>
        
        <div ref={skillsContainerRef} className="skills-container">
          <ul className="skills-list">
            {currentCategoryData.skills.map((skill, index) => (
              <li 
                key={skill.name} 
                className="skill-item" 
                onClick={() => toggleSkill(index)}
              >
                <div className="skill-header">
                  <div className="skill-name">
                    <span className="skill-icon">
                      <FontAwesomeIcon icon={skill.icon} />
                    </span>
                    {skill.name}
                  </div>
                  <FontAwesomeIcon 
                    icon={expandedSkill === index ? faChevronUp : faChevronDown} 
                    size="sm"
                  />
                </div>
                
                <div className={`skill-content ${expandedSkill === index ? 'expanded' : ''}`}>
                  <p className="skill-description">
                    {skill.description}
                  </p>
                  <a 
                    href={skill.wikiPage} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="skill-link"
                  >
                    Learn more about {skill.wikiTitle}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="nav-controls">
          <BrutalistButton
            label="Prev"
            icon={faArrowLeft}
            btnColor="hsla(175, 75%, 36%, 1)" /* Persian Green */
            iconColor="#fff"
            onClick={prevCategory}
          />
          <BrutalistButton
            label="Next"
            icon={faArrowRight}
            btnColor="hsla(12, 83%, 62%, 1)" /* Burnt sienna */
            iconColor="#fff"
            onClick={nextCategory}
          />
        </div>
      </div>
    </>
  );
};

export default SkillsCard;