
import React from 'react';

export const TeaLeafLogo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      className={className}
      width="40" 
      height="40" 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M20 5C18 10 7 12 7 22C7 30 13 35 20 35C27 35 33 30 33 22C33 12 22 10 20 5Z" 
        stroke="#4CAF50" 
        strokeWidth="2" 
        fill="#E8F5E9" 
      />
      <path 
        d="M20 5C20 15 25 20 25 28" 
        stroke="#4CAF50" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      <path 
        d="M20 25C18 25 15 23 15 18" 
        stroke="#4CAF50" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
    </svg>
  );
};
