import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import './BrutalistButton.css';

interface BrutalistButtonProps {
  label: string;
  subLabel?: string;
  icon: IconDefinition;
  btnColor?: string;
  iconColor?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  link?: string;
  className?: string;
}

const BrutalistButton: React.FC<BrutalistButtonProps> = ({
  label,
  subLabel,
  icon,
  btnColor,
  iconColor,
  onClick,
  link = "#",
  className = ""
}) => {
  const btnStyle = btnColor ? { backgroundColor: btnColor } : {};
  const isIconOnly = !label && !subLabel;
  const buttonClasses = `brutalist-button ${isIconOnly ? 'icon-only' : ''} ${className}`;

  // Render as an anchor if there's a valid external link.
  if (link && link !== "#") {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
        style={btnStyle}
        onClick={onClick}
      >
        <div className="btn-icon">
          <FontAwesomeIcon 
            icon={icon} 
            style={iconColor ? { color: iconColor } : {}} 
          />
        </div>
        {!isIconOnly && (
          <div className="button-text">
            <span>{label}</span>
            {subLabel && <span>{subLabel}</span>}
          </div>
        )}
      </a>
    );
  }

  // Otherwise render as a button that just triggers onClick.
  return (
    <button
      className={buttonClasses}
      style={btnStyle}
      onClick={onClick}
    >
      <div className="btn-icon">
        <FontAwesomeIcon 
          icon={icon} 
          style={iconColor ? { color: iconColor } : {}} 
        />
      </div>
      {!isIconOnly && (
        <div className="button-text">
          <span>{label}</span>
          {subLabel && <span>{subLabel}</span>}
        </div>
      )}
    </button>
  );
};

export default BrutalistButton;