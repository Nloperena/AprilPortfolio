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
}

const BrutalistButton: React.FC<BrutalistButtonProps> = ({
  label,
  subLabel,
  icon,
  btnColor,
  iconColor,
  onClick,
  link = "#"
}) => {
  const btnStyle = btnColor ? { backgroundColor: btnColor } : {};

  // Render as an anchor if there's a valid external link.
  if (link && link !== "#") {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="brutalist-button"
        style={btnStyle}
        onClick={onClick}
      >
        <div className="ms-logo">
          <FontAwesomeIcon icon={icon} size="2x" style={iconColor ? { color: iconColor } : {}} />
        </div>
        <div className="button-text">
          <span>{label}</span>
          {subLabel && <span>{subLabel}</span>}
        </div>
      </a>
    );
  }

  // Otherwise render as a button that just triggers onClick.
  return (
    <button
      className="brutalist-button"
      style={btnStyle}
      onClick={onClick}
    >
      <div className="ms-logo">
        <FontAwesomeIcon icon={icon} size="2x" style={iconColor ? { color: iconColor } : {}} />
      </div>
      <div className="button-text">
        <span>{label}</span>
        {subLabel && <span>{subLabel}</span>}
      </div>
    </button>
  );
};

export default BrutalistButton;