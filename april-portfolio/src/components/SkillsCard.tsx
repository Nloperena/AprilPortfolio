import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faLaptopCode, faPaintBrush, faCode } from '@fortawesome/free-solid-svg-icons';
import BrutalistButton from './BrutalistButton.tsx';

interface Skill {
  title: string;
  icon: any; // IconDefinition could be used if imported from FontAwesome types
  description: string;
}

const skills: Skill[] = [
  {
    title: "IT Skills",
    icon: faLaptopCode,
    description: "Expertise in systems administration, networking and security."
  },
  {
    title: "Design Skills",
    icon: faPaintBrush,
    description: "Creative UI/UX design, graphic creation, and visual problem solving."
  },
  {
    title: "Development Skills",
    icon: faCode,
    description: "Modern web and software development using cutting-edge technologies."
  }
];

const SkillsCard: React.FC = () => {
  const [currentSkill, setCurrentSkill] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5 });
    }
  }, [currentSkill]);

  const nextSkill = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cardRef.current) {
      gsap.to(cardRef.current, { opacity: 0, x: 50, duration: 0.3, onComplete: () => {
        setCurrentSkill((prev) => (prev + 1) % skills.length);
        gsap.fromTo(cardRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.3 });
      }});
    } else {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }
  };

  const prevSkill = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cardRef.current) {
      gsap.to(cardRef.current, { opacity: 0, x: -50, duration: 0.3, onComplete: () => {
        setCurrentSkill((prev) => (prev - 1 + skills.length) % skills.length);
        gsap.fromTo(cardRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.3 });
      }});
    } else {
      setCurrentSkill((prev) => (prev - 1 + skills.length) % skills.length);
    }
  };

  const { title, icon, description } = skills[currentSkill];

  return (
    <>
      <style>{`
        .skills-card {
          font-family: var(--font-base);
          width: 90%;
          max-width: 600px;
          margin: 2rem auto;
          padding: 2rem;
          background: var(--coral);
          border: 3px solid var(--jet);
          box-shadow: 12px 12px 0 var(--jet);
          color: var(--neutral-white);
          text-align: center;
          position: relative;
        }
        .skill-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }
        .skill-title {
          font-size: 1.75rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        .skill-description {
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }
        .nav-controls {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 1rem;
        }
      `}</style>
      <div ref={cardRef} className="skills-card">
        <div className="skill-icon">
          <FontAwesomeIcon icon={icon} />
        </div>
        <h2 className="skill-title">{title}</h2>
        <p className="skill-description">{description}</p>
        <div className="nav-controls">
          <BrutalistButton
            label="Prev"
            icon={faArrowLeft}
            btnColor="hsla(274, 53%, 37%, 1)"
            iconColor="#fff"
            onClick={prevSkill}
          />
          <BrutalistButton
            label="Next"
            icon={faArrowRight}
            btnColor="hsla(12, 83%, 62%, 1)"
            iconColor="#fff"
            onClick={nextSkill}
          />
        </div>
      </div>
    </>
  );
};

export default SkillsCard;