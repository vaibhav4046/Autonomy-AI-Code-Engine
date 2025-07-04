
import React from 'react';

interface PanelContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PanelContainer: React.FC<PanelContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-[#0A0A0A] border border-gray-800 rounded-lg flex flex-col overflow-hidden ${className}`}>
      {children}
    </div>
  );
};
