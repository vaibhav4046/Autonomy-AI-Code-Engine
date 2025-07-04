
import React from 'react';
import { AppMode } from '../types';
import { Icon } from './Icon';

interface ControlPanelProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
  isLoading: boolean;
  onSubmit: () => void;
}

const ModeButton: React.FC<{
  label: string;
  iconName: 'generate' | 'fix' | 'suggest' | 'api';
  currentMode: AppMode;
  targetMode: AppMode;
  onClick: (mode: AppMode) => void;
}> = ({ label, iconName, currentMode, targetMode, onClick }) => {
  const isActive = currentMode === targetMode;
  return (
    <button
      onClick={() => onClick(targetMode)}
      className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white ${
        isActive
          ? 'bg-white text-black'
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
      }`}
    >
      <Icon name={iconName} className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
};

export const ControlPanel: React.FC<ControlPanelProps> = ({ mode, setMode, prompt, setPrompt, isLoading, onSubmit }) => {
  return (
    <div className="p-4 flex flex-col h-full">
      <h2 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Mode</h2>
      <div className="flex space-x-2 mb-4">
        <ModeButton label="Generate" iconName="generate" currentMode={mode} targetMode={AppMode.GENERATE} onClick={setMode} />
        <ModeButton label="Fix" iconName="fix" currentMode={mode} targetMode={AppMode.FIX} onClick={setMode} />
        <ModeButton label="Suggest" iconName="suggest" currentMode={mode} targetMode={AppMode.SUGGEST} onClick={setMode} />
        <ModeButton label="API" iconName="api" currentMode={mode} targetMode={AppMode.API} onClick={setMode} />
      </div>

      <h2 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Prompt</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={
          mode === AppMode.GENERATE ? 'e.g., A modern login form with a password visibility toggle.' :
          mode === AppMode.FIX ? 'e.g., The button is not changing color on click.' :
          mode === AppMode.SUGGEST ? 'e.g., How can I make this component more accessible?' :
          'e.g., I need a charting library for financial data.'
        }
        className="flex-grow bg-gray-950 border border-gray-700 rounded-md p-3 text-sm text-gray-200 focus:ring-1 focus:ring-white focus:border-white resize-none"
      />

      <button
        onClick={onSubmit}
        disabled={isLoading || !prompt}
        className="mt-4 w-full flex items-center justify-center bg-white text-black font-bold py-3 px-4 rounded-md transition-all duration-200 ease-in-out hover:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed group"
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
    </div>
  );
};
