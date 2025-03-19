import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';

const pagesContent = [
  "Page 1: Introduction",
  "Page 2: Projects",
  "Page 3: Skills",
  "Page 4: Contact"
];

const Booklet: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const pagesRef = useRef<Array<HTMLDivElement | null>>([]);

  const handlePageClick = (e: React.MouseEvent, index: number) => {
    if (index !== currentPage) return;
    
    const pageEl = e.currentTarget;
    const rect = pageEl.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const origin = clickX < rect.width / 2 ? "right" : "left";
    pageEl.style.transformOrigin = origin;
    
    gsap.to(pageEl, {
      duration: 0.8,
      rotationY: origin === "left" ? -180 : 180,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentPage(prev => prev + 1);
      }
    });
  };

  return (
    <div
      className="relative w-80 p-4 bg-white border border-gray-400 shadow-lg"
      style={{ aspectRatio: '16/9', perspective: '1200px' }}
    >
      {pagesContent.map((content, index) => {
        const isTurned = index < currentPage;
        const zIndex = pagesContent.length - index;
        return (
          <div
            key={index}
            ref={el => pagesRef.current[index] = el}
            className="absolute w-full h-full bg-white border border-gray-300 flex items-center justify-center"
            style={{
              transform: isTurned ? "rotateY(-180deg)" : "rotateY(0deg)",
              backfaceVisibility: "hidden",
              zIndex,
              cursor: "pointer"
            }}
            onClick={(e) => handlePageClick(e, index)}
          >
            <div className="p-4">{content}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Booklet;
