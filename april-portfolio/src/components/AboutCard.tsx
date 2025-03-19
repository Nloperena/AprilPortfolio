import React from 'react';
import BrutalistButton from './BrutalistButton.tsx';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Resume from '../assets/documents/NicholasNicoLoperena-Resume.pdf';
import AboutImg1 from '../assets/images/graduationphoto.jpg';
import UcfLogo from '../assets/images/ucfLogo.jpg';

const AboutCard: React.FC = () => {
  return (
    <>
      <style>{`
        .about-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          margin: 2rem auto;
          max-width: 800px;
        }
        .about-card {
          font-family: var(--font-base);
          width: 100%;
          max-width: 600px;
          padding: 2rem;
          background: var(--persian-green);
          border: 3px solid var(--jet);
          box-shadow: 12px 12px 0 var(--jet);
          color: var(--neutral-white);
          text-align: center;
        }
        .about-img {
          width: 100%;
          max-width: 300px;
          border: 3px solid var(--neutral-white);
          box-shadow: 6px 6px 0 var(--jet);
          margin: 0 auto 1.5rem;
          display: block;
          /* Soft rounded-rectangle shape for wide images */
          border-radius: 20px;
          filter: brightness(1.1);
          object-fit: cover;
        }
        .about-title {
          font-size: 1.75rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }
        .about-description {
          font-size: 1rem;
          margin-bottom: 2rem;
          line-height: 1.5;
        }
        .additional-info {
          font-size: 1rem;
          margin-bottom: 2rem;
          line-height: 1.5;
          text-align: left;
          padding: 0 1rem;
        }
        /* Education container is now a flex row */
        .about-education {
          margin: 1.5rem auto 2rem;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 1rem;
          /* Optionally align items to left */
          justify-content: flex-start;
          width: 100%;
        }
        .ucf-logo {
          width: 100%;
          max-width: 150px;
          object-fit: contain;
        }
        .education-text {
          font-size: 0.9rem;
          font-style: italic;
          line-height: 1.4;
          text-align: left;
        }
        .about-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
      `}</style>
      <div className="about-container">
        <div className="about-card">
          <img src={AboutImg1} alt="Graduation" className="about-img" />
          <h2 className="about-title">About Me</h2>
          <p className="about-description">
            Hi, I'm Nico, a dedicated professional with a passion for blending creativity with technology.
            I strive to build innovative digital experiences and deliver engaging projects. Let's connect and bring ideas to life!
          </p>
          {/* Additional text */}
          <p className="additional-info">
            Here is some extra detailed information about my background, experience, and interests.
            This section allows you to share more in-depth information styled to match the component.
          </p>
          <div className="about-education">
            <img src={UcfLogo} alt="UCF Logo" className="ucf-logo" />
            <p className="education-text">
              UCF Coding Boot Camp<br />
              Full-Stack Web Development Graduate (2019)<br />
              Credential ID: CREDLY-19824013
            </p>
          </div>
          <div className="about-buttons">
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