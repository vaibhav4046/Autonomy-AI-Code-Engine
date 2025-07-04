import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="flex-shrink-0 p-4 border-b border-secondary/50 flex items-center justify-between z-20 bg-primary/50 backdrop-blur-sm">
        <div className="flex items-center">
            <h1 className="text-xl font-semibold text-text-main tracking-wider">AUTONOMY</h1>
        </div>
    </header>
  );
};