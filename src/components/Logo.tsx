import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '', onClick }) => {
  const getDimensions = () => {
    switch (size) {
      case 'sm':
        return { height: 26, width: 32 };
      case 'lg':
        return { height: 44, width: 54 };
      case 'md':
      default:
        return { height: 32, width: 40 };
    }
  };

  const dim = getDimensions();

  return (
    <div
      className={`logo-container ${className}`}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        lineHeight: 1
      }}
      role="banner"
      aria-label="Extroverts Logo E•"
    >
      <svg
        width={dim.width}
        height={dim.height}
        viewBox="0 0 44 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <text
          x="2"
          y="30"
          fill="#ffffff"
          fontSize="36"
          fontFamily="'Playfair Display', Georgia, 'Times New Roman', serif"
          fontWeight="900"
          letterSpacing="-1"
        >
          E
        </text>
        <circle cx="34" cy="9" r="4.2" fill="#ffffff" />
      </svg>
    </div>
  );
};
