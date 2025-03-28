import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import BrutalistButton from './BrutalistButton.tsx';
import { skillCategories } from '../data/skillCategories.ts';
import './SkillsCard.css';

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
      gsap.fromTo(
        cardRef.current,
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
  );
};

export default SkillsCard;