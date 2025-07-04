import React from 'react';
import { Icon } from './Icon';

interface InputViewProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isLoading: boolean;
  onSubmit: () => void;
  className?: string;
}

export const InputView: React.FC<InputViewProps> = ({ prompt, setPrompt, isLoading, onSubmit, className = '' }) => {
  const placeholderText = "A landing page for a futuristic SaaS company...";

  return (
    <aside className={`w-full md:w-2/5 lg:w-1/3 flex-shrink-0 flex flex-col p-4 sm:p-6 bg-transparent md:border-r md:border-secondary/50 ${className}`}>
      <h2 className="text-lg font-semibold text-text-main mb-4 uppercase tracking-wider">Prompt</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={placeholderText}
        className="flex-grow bg-secondary/50 border border-secondary rounded-md p-3 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand resize-none w-full"
        rows={15}
      />
      <button
        onClick={onSubmit}
        disabled={isLoading || !prompt}
        className="mt-4 w-full flex items-center justify-center bg-brand text-primary font-bold py-3 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-[0_0_20px_theme(colors.brand)] disabled:bg-secondary disabled:text-text-main/70 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none group"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          <div className="flex items-center">
            <Icon name="sparkles" className="w-5 h-5 mr-2" />
            <span>Execute</span>
          </div>
        )}
      </button>
    </aside>
  );
};