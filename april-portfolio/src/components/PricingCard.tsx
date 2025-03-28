import React, { useState, useRef, useEffect } from 'react';
import BrutalistButton from './BrutalistButton.tsx';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { gsap } from 'gsap';
import { pricingPackages } from '../data/pricing.ts';

// Map package indexes to CSS classes for border color.
const classMapping = ['starter', 'professional', 'business', 'ecommerce'];

const PricingCard: React.FC = () => {
  const [currentPackage, setCurrentPackage] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // Animate the pricing card in on mount and whenever currentPackage changes.
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    }
  }, [currentPackage]);

  const nextPackage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setCurrentPackage((prev) => (prev + 1) % pricingPackages.length);
        }
      });
    }
  };

  const prevPackage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setCurrentPackage((prev) => (prev - 1 + pricingPackages.length) % pricingPackages.length);
        }
      });
    }
  };

  const current = pricingPackages[currentPackage];
  // Apply a CSS class based on the current package index.
  const currentClass = classMapping[currentPackage % classMapping.length] || '';

  return (
    <>
      <style>{`
        .pricing-card {
          font-family: var(--font-base);
          width: 90%;
          max-width: 600px;
          min-height: 500px;
          background: var(--rebecca-purple, hsla(274, 53%, 37%, 1));
          border: 3px solid var(--jet);
          box-shadow: 12px 12px 0 var(--jet);
          overflow: hidden;
          position: relative;
          color: var(--neutral-white);
          padding: 20px;
          margin: 0 auto; /* Center horizontally */
        }
        .pricing-title {
          font-size: 1.75rem;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .package-price {
          font-size: 1.25rem;
          margin-bottom: 10px;
        }
        .package-features {
          list-style: none;
          padding-left: 0;
          margin-bottom: 10px;
        }
        .package-features li::before {
          content: "✅ ";
        }
        .add-ons {
          margin-top: 10px;
          font-style: italic;
        }
        /* Border colors matching the button colors */
        .starter {
          border-color: hsla(12, 83%, 62%, 1);
        }
        .professional {
          border-color: hsla(16, 85%, 68%, 1);
        }
        .business {
          border-color: hsla(274, 53%, 37%, 1);
        }
        .ecommerce {
          border-color: hsla(200, 80%, 40%, 1);
        }
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .pricing-card {
            padding: 10px;
            text-align: center;
          }
          .pricing-title {
            font-size: 1.5rem;
          }
          .nav-controls {
            justify-content: center;
          }
        }
        /* Extra Small Devices (320px to 374px) */
        @media only screen and (min-width: 320px) and (max-width: 374px) {
          .pricing-card {
            padding: 8px;
            min-height: 420px;
            text-align: center;
          }
          .pricing-title {
            font-size: 1.25rem;
          }
          .package-price {
            font-size: 1rem;
          }
          .package-features li {
            font-size: 0.85rem;
          }
          .add-ons {
            font-size: 0.8rem;
          }
          .nav-controls {
            gap: 8px;
            margin-top: 15px;
            justify-content: center;
          }
        }
        /* Small to Medium-Small Devices (375px to 500px) */
        @media only screen and (min-width: 375px) and (max-width: 500px) {
          .pricing-card {
            padding: 10px;
            min-height: 450px;
            text-align: center;
          }
          .pricing-title {
            font-size: 1.4rem;
          }
          .package-price {
            font-size: 1.1rem;
          }
          .package-features li {
            font-size: 0.9rem;
          }
          .add-ons {
            font-size: 0.85rem;
          }
          .nav-controls {
            gap: 8px;
            margin-top: 18px;
            justify-content: center;
          }
        }
      `}</style>
      <div ref={cardRef} className={`pricing-card ${currentClass}`}>
        <div className="pricing-title">{current.title}</div>
        <div className="package-price">{current.priceRange}</div>
        {current.description && <p>{current.description}</p>}
        <ul className="package-features">
          {current.features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
        <div className="add-ons">
          🔹 Add‑ons available: {current.addOns.join(", ")}
        </div>
        <div
          className="nav-controls"
          style={{ display: 'flex', gap: '10px', marginTop: '20px' }}
        >
          <BrutalistButton
            label="Prev"
            icon={faArrowLeft}
            btnColor="hsla(12, 83%, 62%, 1)"
            iconColor="#fff"
            onClick={prevPackage}
          />
          <BrutalistButton
            label="Next"
            icon={faArrowRight}
            btnColor="hsla(175, 75%, 36%, 1)"
            iconColor="#fff"
            onClick={nextPackage}
          />
        </div>
      </div>
    </>
  );
};

export default PricingCard;