import React, { useState } from 'react';
import BrutalistButton from './BrutalistButton.tsx';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Resume from '../assets/documents/NicholasNicoLoperena-Resume.pdf';
import AboutImg1 from '../assets/images/graduationphoto.jpg';

const AboutCard: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  // Define the full text and truncated text (first two sentences)
  const fullText = "Hi, I'm Nico, a dedicated professional passionate about blending creativity with technology. My journey started with a deep curiosity for digital innovation, leading me to craft immersive experiences and cutting-edge projects. I graduated from UCF's Coding Bootcamp in 2019 and have since been working as a freelance web developer. I specialize in front-end development, but I'm also proficient in back-end technologies.";
  const truncatedText = "Hi, I'm Nico, a dedicated professional passionate about blending creativity with technology.";

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <>
      <style jsx>{`
        .about-card {
          font-family: var(--font-base);
          width: 90%;
          max-width: 1200px;
          background: var(--persian-green);
          border: 3px solid var(--jet);
          box-shadow: 12px 12px 0 var(--jet);
          overflow: hidden;
          position: relative;
          color: var(--neutral-white);
          box-sizing: border-box;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          /* Only enforce aspect ratio when not expanded */
          ${!expanded ? "aspect-ratio: 4 / 5;" : ""}
          transition: aspect-ratio 0.3s ease;
        }
        
        /* Image container with 16:9 ratio */
        .about-card-img-container {
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
        }
        
        /* Image covers its container with cropping controlled via object-position */
        .about-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 80%;
          display: block;
        }
        
        /* Content container fills remaining space */
        .about-content {
          padding: 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        .about-title {
          font-size: 1.75rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        
        .about-text {
          font-size: 1rem;
          line-height: 1.5;
          margin-bottom: 10px;
          flex-grow: 1;
        }
        
        .read-more {
          font-size: 0.9rem;
          color: var(--neutral-white);
          text-decoration: underline;
          cursor: pointer;
          margin-top: 0.5rem;
        }
        
        .about-buttons-row {
          display: flex;
          gap: 16px; /* Increased gap for more spacing */
          margin-top: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        
        /* Remove flex stretching so buttons maintain natural width */
        .about-buttons-row > * {
          flex: initial;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .about-card {
            padding: 1rem;
            ${!expanded ? "aspect-ratio: 4 / 5;" : ""}
          }
          .about-content {
            padding: 1rem;
          }
          .about-title {
            font-size: 1.5rem;
          }
          .about-text {
            font-size: 0.9rem;
          }
          .about-buttons-row {
            gap: 12px;
            margin-top: 0.5rem;
            justify-content: center;
          }
        }
        
        @media only screen and (max-width: 480px) {
          .about-card {
            padding: 0.75rem;
            ${!expanded ? "aspect-ratio: 4 / 5;" : ""}
          }
          .about-title {
            font-size: 1.3rem;
          }
          .about-text {
            font-size: 0.8rem;
          }
          .about-buttons-row {
            gap: 8px;
            margin-top: 0.5rem;
            justify-content: center;
          }
          .about-buttons-row > * {
            flex: initial;
          }
          /* Ensure the image container remains visibly large on mobile */
          .about-card-img-container {
            min-height: 150px;
          }
        }
      `}</style>

      <div className="about-card">
        {/* Image section wrapped in container with 16:9 aspect ratio */}
        <div className="about-card-img-container">
          <img
            src={AboutImg1}
            alt="About me"
            className="about-card-img"
          />
        </div>
        {/* Content container */}
        <div className="about-content">
          <div>
            <h2 className="about-title">About Me</h2>
            <p className="about-text">
              {expanded ? fullText : truncatedText}
            </p>
            <div className="read-more" onClick={toggleExpanded}>
              {expanded ? "Read Less" : "Read More"}
            </div>
          </div>
          <div className="about-buttons-row">
            <BrutalistButton
              label="Resume"
              icon={faFileAlt}
              btnColor="hsla(12,83%,62%,1)"
              iconColor="#fff"
              link={Resume}
            />
            <BrutalistButton
              label="GitHub"
              icon={faGithub}
              btnColor="hsla(16,85%,68%,1)"
              iconColor="#fff"
              link="https://github.com/Nloperena"
            />
            <BrutalistButton
              label="LinkedIn"
              icon={faLinkedin}
              btnColor="hsla(274,53%,37%,1)"
              iconColor="#fff"
              link="https://www.linkedin.com/in/nicholas-loperena-022813185/"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutCard;