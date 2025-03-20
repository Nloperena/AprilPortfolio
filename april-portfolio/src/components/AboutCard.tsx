import React from 'react';
import BrutalistButton from './BrutalistButton.tsx';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Resume from '../assets/documents/NicholasNicoLoperena-Resume.pdf';
import AboutImg1 from '../assets/images/graduationphoto.jpg';

const AboutCard: React.FC = () => {
    return (
        <>
            <style>{`
        .about-card {
          font-family: var(--font-base);
          width: 90%;
          max-width: 1200px;
          min-height: 600px;
          margin: 0 auto;
          background: var(--persian-green);
          border: 3px solid var(--jet);
          box-shadow: 12px 12px 0 var(--jet);
          overflow: hidden;
          position: relative;
          color: var(--neutral-white);
          box-sizing: border-box; /* Added to include border in the element's width */
        }
        @media (max-width: 768px) {
          .about-card {
            min-height: 500px;
          }
        }
        .about-buttons-row {
          display: flex;
          gap: 10px;
          margin-top: 20px;
          flex-wrap: wrap;
        }
        /* Force each button to take equal space */
        .about-buttons-row > * {
          flex: 1 1 0;
        }
        .about-title {
          font-size: 1.75rem;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .about-text {
          font-size: 1rem;
          line-height: 1.5;
          margin-bottom: 10px;
        }
      `}</style>

            <div className="about-card">
                {/* Add "block" to ensure the image doesn't have extra inline spacing */}
                <img
                    src={AboutImg1}
                    alt="About me"
                    className="about-card-img" /* Use this class instead of inline styles */
                />
                {/* Content container with the same padding as HeroCard */}
                <div className="p-8">
                    <h2 className="about-title">About Me</h2>
                    <p className="about-text">
                        Hi, I'm Nico, a dedicated professional passionate about blending creativity with technology.
                        My journey started with a deep curiosity for digital innovation, leading me to craft immersive experiences and cutting-edge projects.
                        I graduated from UCF's Coding Bootcamp in 2019 and have since been working as a freelance web developer.
                        I specialize in front-end development, but I'm also proficient in back-end technologies.
                    </p>
                   

                    {/* Buttons row similar to the nav-controls in HeroCard */}
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
