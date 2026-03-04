// Sample usage 
// <PhivolcsLogo variant="with-text" size="h-24" className="mb-6" /> with text
// <PhivolcsLogo variant="without-text" size="h-24" className="mb-6" />  without text

import React from 'react';
import phivolcsLogoIcon from '../../../public/PhivolcsLogo.png';
import phivolcsLogoWithText from '../../../public/PhivolcsLogoWithText.png';

interface PhivolcsLogoProps {
  variant?: 'with-text' | 'without-text';
  size?: string; 
  className?: string;
}

const PhivolcsLogo: React.FC<PhivolcsLogoProps> = ({
  variant = 'with-text',
  size = 'h-24', 
  className = '',
}) => {
  
  const imageSrc = variant === 'with-text' 
    ? phivolcsLogoWithText 
    : phivolcsLogoIcon;

  const altText = variant === 'with-text'
    ? 'PHIVOLCS Logo with Text'
    : 'PHIVOLCS Logo without Text';

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={imageSrc.src}
        alt={altText}
        className={`${size} w-auto object-contain`}
      />
    </div>
  );
};

export default PhivolcsLogo;