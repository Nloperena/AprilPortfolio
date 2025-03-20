import React, { useState, useEffect, useRef } from 'react';
import BrutalistButton from './BrutalistButton.tsx';
import { faArrowLeft, faArrowRight, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import client from '../data/contentful.ts';
import { gsap } from 'gsap';


// Define your project interface.
interface Project {
  title: string;
  content: string;
  buttonText: string;
  image: string;
  link: string;
}

const DESCRIPTION_THRESHOLD = 300; // Number of characters before "Read More" is needed.

// Helper to extract a URL from a Rich Text field.
const extractLinkURL = (richText: any): string => {
  if (!richText) return '#';
  try {
    return richText.content[0].content[0].value;
  } catch (error) {
    return '#';
  }
};

const HeroCard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    client.getEntries({ content_type: 'portfolioProjects' })
      .then((response) => {
        const fetchedProjects = response.items.map((item) => {
          const fields = item.fields;
          const imageUrl = fields.projectHeader?.fields?.file?.url
            ? 'https:' + fields.projectHeader.fields.file.url
            : 'https://via.placeholder.com/1200x500?text=No+Image';

          return {
            title: fields.header || 'Untitled Project',
            content: fields.description || '',
            buttonText: "Visit Project",
            image: imageUrl,
            link: extractLinkURL(fields.link)
          } as Project;
        });
        setProjects(fetchedProjects);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Contentful fetch error:", error);
        setIsLoading(false);
      });
  }, []);

  const getDisplayedDescription = (text: string) => {
    if (text.length > DESCRIPTION_THRESHOLD && !expanded) {
      return text.slice(0, DESCRIPTION_THRESHOLD) + "...";
    }
    return text;
  };

  const nextProject = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded(false);
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setCurrentProject(prev => (prev + 1) % projects.length);
          gsap.fromTo(cardRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        }
      });
    } else {
      setCurrentProject(prev => (prev + 1) % projects.length);
    }
  };

  const prevProject = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded(false);
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setCurrentProject(prev => (prev - 1 + projects.length) % projects.length);
          gsap.fromTo(cardRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        }
      });
    } else {
      setCurrentProject(prev => (prev - 1 + projects.length) % projects.length);
    }
  };

  if (isLoading) {
    return <div>Loading projects…</div>;
  }
  if (projects.length === 0) {
    return <div>No projects found.</div>;
  }

  const { title, content, buttonText, image, link } = projects[currentProject];

  return (
    <>
      <style>{`
        .hero-card {
          font-family: var(--font-base);
          width: 90%;
          max-width: 1200px;
          min-height: 600px;
          margin: 0 auto;
          background: var(--coral);
          border: 3px solid var(--jet);
          box-shadow: 12px 12px 0 var(--jet);
          overflow: hidden;
          position: relative;
          color: var(--neutral-white);
        }
        @media (max-width: 768px) {
          .hero-card {
            min-height: 500px;
          }
        }
        .visit-project-btn {
          position: absolute;
          top: 20px;
          right: 20px;
        }
        .nav-controls {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }
        .description-container {
          transition: font-size 0.3s ease;
          overflow: hidden;
          position: relative;
        }
        .read-more {
          color: var(--neutral-white);
          cursor: pointer;
          text-decoration: underline;
          font-size: 0.9rem;
          margin-top: 4px;
          display: inline-block;
        }
        /* New classes reflecting PricingCard font sizes */
        .hero-title {
          font-size: 1.75rem;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .hero-description {
          font-size: 1rem;
          margin-bottom: 10px;
        }
      `}</style>

      <div ref={cardRef} className="hero-card">
        <img src={image} alt={title} className="w-full h-[350px] object-cover" />

        {/* Visit Project Button: opens URL in a new tab */}
        <div className="visit-project-btn">
          <BrutalistButton
            label={buttonText}
            icon={faExternalLinkAlt}
            btnColor="hsla(175, 75%, 36%, 1)"
            iconColor="#fff"
            link={link}
          />
        </div>

        <div className="p-8">
          <h2 className="hero-title">{title}</h2>
          <div className="description-container">
            <p className="hero-description">{getDisplayedDescription(content)}</p>
            {content.length > DESCRIPTION_THRESHOLD && !expanded && (
              <span
                className="read-more"
                onClick={() => setExpanded(true)}
              >
                Read More
              </span>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="nav-controls">
            <BrutalistButton
              label="Prev"
              icon={faArrowLeft}
              btnColor="hsla(274, 53%, 37%, 1)"
              iconColor="#fff"
              onClick={prevProject}
            />
            <BrutalistButton
              label="Next"
              icon={faArrowRight}
              btnColor="hsla(12, 83%, 62%, 1)"
              iconColor="#fff"
              onClick={nextProject}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroCard;