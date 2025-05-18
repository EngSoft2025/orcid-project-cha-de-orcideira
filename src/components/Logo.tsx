
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', withText = true }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <Link to="/" className="flex items-center gap-2">
      <div className={`${sizeClasses[size]} relative`}>
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path 
            d="M12 2C7.58 2 4 5.58 4 10c0 4.42 5 10 8 10s8-5.58 8-10c0-4.42-3.58-8-8-8z" 
            className="fill-tea transition-colors" 
          />
          <path 
            d="M13 7c-2.76 0-5 2.24-5 5 0 .5.1 1 .23 1.43C9.53 14.58 11.56 15 12 15c1.88 0 3-1.5 3-1.5S16 11.5 16 9.5C16 8.12 14.88 7 13 7z" 
            className="fill-tea-dark transition-colors" 
          />
          <path 
            d="M12 5c.5 0 1-.5 1-1s-.5-1-1-1-1 .5-1 1 .5 1 1 1z" 
            className="fill-tea-light transition-colors" 
          />
        </svg>
      </div>
      {withText && (
        <span className="text-lg md:text-xl font-medium text-tea-dark">
          Chá de Orquideira
        </span>
      )}
    </Link>
  );
};

export default Logo;
