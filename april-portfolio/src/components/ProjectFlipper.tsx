import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';

interface Project {
  title: string;
  content: string;
  buttonText: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    title: "Project One",
    content: "This is my first project. It’s innovative and bold.",
    buttonText: "Visit Project",
    image: "https://via.placeholder.com/1000x400?text=Project+One",
    link: "#"
  },
  {
    title: "Project Two",
    content: "This project showcases cutting‑edge design and development.",
    buttonText: "Visit Project",
    image: "https://via.placeholder.com/1000x400?text=Project+Two",
    link: "#"
  },
  {
    title: "Project Three",
    content: "A groundbreaking project that redefines possibilities.",
    buttonText: "Visit Project",
    image: "https://via.placeholder.com/1000x400?text=Project+Three",
    link: "#"
  },
  {
    title: "Project Four",
    content: "This project is a culmination of creativity and technical skill.",
    buttonText: "Visit Project",
    image: "https://web.dev/images/social-wide.jpg",
    link: "#"
  }
];

const ProjectFlipper: React.FC = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleFlip = () => {
    if (!cardRef.current) return;
    
    gsap.to(cardRef.current, {
      duration: 0.4,
      rotationY: 90,
      ease: 'power2.inOut',
      onComplete: () => {
        setCurrentProject((prev) => (prev + 1) % projects.length);
        gsap.to(cardRef.current, {
          duration: 0.4,
          rotationY: 0,
          ease: 'power2.inOut'
        });
      }
    });
  };

  const { title, content, buttonText, image, link } = projects[currentProject];

  return (
    <div className="cursor-pointer" onClick={handleFlip}>
      <div ref={cardRef} className="card w-[1000px] h-[800px]">
        <img src={image} alt={title} className="w-full h-[400px] object-cover" />
        <div className="p-6">
          <h2 className="head text-3xl font-bold mb-4">{title}</h2>
          <p className="content text-lg mb-6">{content}</p>
          <a href={link}>
            <button className="button px-6 py-3">{buttonText}</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectFlipper;
