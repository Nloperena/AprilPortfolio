import React, { useState, useEffect, useRef } from 'react';
import BrutalistButton from './BrutalistButton.tsx';
import { faArrowLeft, faArrowRight, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import client from '../data/contentful.ts';
import { gsap } from 'gsap';

/**
 * Project interface
 */
interface Project {
  title: string;
  content: string;
  buttonText: string;
  image: string;
  link: string;
}

const DESCRIPTION_THRESHOLD = 300; // characters before "Read More" is shown

// Helper to extract a URL from a Rich Text field (if needed).
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
            buttonText: 'Visit Project',
            image: imageUrl,
            link: extractLinkURL(fields.link)
          } as Project;
        });
        setProjects(fetchedProjects);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Contentful fetch error:', error);
        setIsLoading(false);
      });
  }, []);

  const getDisplayedDescription = (text: string) => {
    if (text.length > DESCRIPTION_THRESHOLD && !expanded) {
      return text.slice(0, DESCRIPTION_THRESHOLD) + '...';
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
      {/* Combined CSS for HeroCard */}
      <style>{`
        /* Base styles for Hero Card */
        .hero-card {
          font-family: var(--font-base);
          width: 100%;
          max-width: 600px;
          background: var(--persian-green, hsla(175, 75%, 36%, 1));
          border: 3px solid var(--jet);
          box-shadow: 12px 12px 0 var(--jet);
          color: var(--neutral-white);
          padding: clamp(1rem, 4vw, 2rem);
          overflow: hidden;
          position: relative;
          transition: all 0.3s ease;
          margin: 0 auto; /* center horizontally */
        }

        .project-image {
          width: 100%;
          height: 0; /* reset height to use padding-top for aspect ratio */
          padding-top: 56.25%; /* 16:9 aspect ratio */
          position: relative;
          margin-bottom: clamp(0.75rem, 2vw, 1.5rem);
          border: 2px solid var(--jet);
          overflow: hidden;
        }
        .project-image img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .visit-project-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
        }

        .project-title {
          font-size: clamp(1rem, 2.5vw, 1.75rem);
          font-weight: bold;
          margin-bottom: clamp(0.5rem, 1.5vw, 1rem);
          line-height: 1.2;
        }

        .project-description {
          font-size: clamp(0.75rem, 1.5vw, 1rem);
          margin-bottom: clamp(0.75rem, 2vw, 1.5rem);
          line-height: 1.5;
        }

        .nav-controls {
          display: flex;
          justify-content: center;
          gap: clamp(0.4rem, 1.5vw, 1rem);
          margin-top: clamp(0.75rem, 2vw, 1.5rem);
        }

        /* "Read More" link styles */
        .read-more {
          color: var(--neutral-white);
          cursor: pointer;
          text-decoration: underline;
          font-size: 0.9rem;
          margin-top: 4px;
          display: inline-block;
        }

        /* Extra Small Devices (phones, 320px and up) */
        @media only screen and (min-width: 320px) and (max-width: 374px) {
          .hero-card {
            padding: 0.75rem;
            box-shadow: 5px 5px 0 var(--jet);
            margin-top: 1rem;
          }

          .project-image {
            margin-bottom: 0.5rem;
          }

          .project-title {
            font-size: 0.95rem;
            margin-bottom: 0.4rem;
          }

          .project-description {
            font-size: 0.75rem;
            margin-bottom: 0.6rem;
            line-height: 1.4;
          }
        }

        /* Small Devices (375px and up) */
        @media only screen and (min-width: 375px) and (max-width: 424px) {
          .hero-card {
            padding: 0.9rem;
            box-shadow: 6px 6px 0 var(--jet);
          }
          .project-title {
            font-size: 1.05rem;
            margin-bottom: 0.45rem;
          }
          .project-description {
            font-size: 0.8rem;
            margin-bottom: 0.7rem;
          }
        }

        /* Medium Devices (425px and up) */
        @media only screen and (min-width: 425px) and (max-width: 767px) {
          .hero-card {
            padding: 1.1rem;
            box-shadow: 8px 8px 0 var(--jet);
          }
          .project-title {
            font-size: 1.15rem;
            margin-bottom: 0.5rem;
          }
          .project-description {
            font-size: 0.85rem;
            margin-bottom: 0.8rem;
          }
        }

        /* Tablets (768px and up) */
        @media only screen and (min-width: 768px) and (max-width: 1023px) {
          .hero-card {
            max-width: 600px;
            padding: 1.5rem;
          }
          .project-title {
            font-size: 1.4rem;
          }
          .project-description {
            font-size: 0.9rem;
          }
        }

        /* Laptops/Desktops (1024px and up) */
        @media only screen and (min-width: 1024px) and (max-width: 1439px) {
          .hero-card {
            max-width: 550px;
            padding: 1.75rem;
          }
          .project-title {
            font-size: 1.5rem;
          }
          .project-description {
            font-size: 0.95rem;
          }
        }

        /* Large Desktops (1440px and up) */
        @media only screen and (min-width: 1440px) {
          .hero-card {
            max-width: 600px;
            padding: 2rem;
          }
          .project-title {
            font-size: 1.75rem;
          }
          .project-description {
            font-size: 1rem;
          }
        }

        /* Extra Large Screens (1920px and up) */
        @media only screen and (min-width: 1920px) {
          .hero-card {
            max-width: 700px;
            padding: 2.25rem;
            box-shadow: 15px 15px 0 var(--jet);
          }
        }

        /* Image-only option for very small screens (less than 319px) */
        @media only screen and (max-width: 319px) {
          .hero-card {
            padding: 0.5rem;
            box-shadow: 4px 4px 0 var(--jet);
          }
          /* Hide text; show only image on super-tiny screens */
          .project-title,
          .project-description,
          .nav-controls {
            display: none;
          }
          .project-image {
            margin-bottom: 0;
          }
        }

        /* Dark Mode Support */
        @media (prefers-color-scheme: dark) {
          .hero-card {
            border-color: var(--jet);
          }
        }
      `}</style>

      <div ref={cardRef} className="hero-card">
        {/* 16:9 image container */}
        <div className="project-image">
          <img src={image} alt={title} />
        </div>

        {/* "Visit Project" Button in top-right corner */}
        <div className="visit-project-btn">
          <BrutalistButton
            label={buttonText}
            icon={faExternalLinkAlt}
            btnColor="hsla(175, 75%, 36%, 1)"
            iconColor="#fff"
            link={link}
          />
        </div>

        {/* Title and Description */}
        <h2 className="project-title">{title}</h2>
        <p className="project-description">
          {getDisplayedDescription(content)}
        </p>
        {/* Only show "Read More" if content is truncated */}
        {content.length > DESCRIPTION_THRESHOLD && !expanded && (
          <span className="read-more" onClick={() => setExpanded(true)}>
            Read More
          </span>
        )}

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
    </>
  );
};

export default HeroCard;
