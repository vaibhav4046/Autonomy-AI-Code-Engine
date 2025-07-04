import React, { useState, useEffect } from 'react';
import { Icon } from './Icon';

interface OutputViewProps {
  code: string;
  setCode: (code: string) => void;
  aiResponse: string;
  isLoading: boolean;
  error: string | null;
  className?: string;
}

type OutputTab = 'PREVIEW' | 'CODE';

const TabButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
}> = ({ label, isActive, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 disabled:text-text-main/50 disabled:cursor-not-allowed ${
      isActive
        ? 'bg-brand text-primary font-semibold shadow-md shadow-brand/30'
        : 'text-text-main hover:bg-secondary/80'
    }`}
  >
    {label}
  </button>
);

export const OutputView: React.FC<OutputViewProps> = ({ code, setCode, aiResponse, isLoading, error, className = '' }) => {
  const getDefaultTab = (): OutputTab => {
      if (isLoading || error) {
          return 'CODE';
      }
      return 'PREVIEW';
  };

  const [activeTab, setActiveTab] = useState<OutputTab>(getDefaultTab());

  useEffect(() => {
      setActiveTab(getDefaultTab());
  }, [isLoading, error]);

  const renderContent = () => {
    if (error) {
         return (
            <div className="flex flex-col items-center justify-center h-full text-red-400 p-4 shake">
                <Icon name="error" className="w-12 h-12" />
                <p className="mt-4 text-sm text-center font-semibold">An Error Occurred</p>
                <p className="mt-2 text-xs bg-red-500/10 p-2 rounded-md">{error}</p>
            </div>
        );
    }
    
    switch (activeTab) {
      case 'PREVIEW':
        return (
          <iframe
            srcDoc={code}
            title="Live Preview"
            sandbox="allow-scripts allow-same-origin"
            className="w-full h-full bg-primary"
          />
        );
      case 'CODE':
        if (isLoading) {
          return (
             <div className="w-full h-full bg-secondary p-4 font-mono text-sm text-text-main overflow-y-auto">
              <pre className="whitespace-pre-wrap">{aiResponse}<span className="inline-block h-4 w-0.5 bg-brand ml-1 animate-pulse rounded-full"></span></pre>
            </div>
          );
        }
        return (
          <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              readOnly={isLoading}
              spellCheck="false"
              className="w-full h-full bg-secondary p-4 font-mono text-sm text-text-main resize-none focus:outline-none"
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className={`flex-grow flex flex-col min-h-0 ${className}`}>
       <div className="flex-shrink-0 p-2 border-b border-secondary/50 flex items-center justify-center bg-transparent z-10">
            <div className="flex items-center space-x-2">
                <TabButton label="Preview" isActive={activeTab === 'PREVIEW'} onClick={() => setActiveTab('PREVIEW')} disabled={isLoading || !!error} />
                <TabButton label="Code" isActive={activeTab === 'CODE'} onClick={() => setActiveTab('CODE')} />
            </div>
       </div>
       <main key={activeTab} className="flex-grow w-full h-full min-h-0 bg-transparent fade-in">
            {renderContent()}
       </main>
    </section>
  );
};