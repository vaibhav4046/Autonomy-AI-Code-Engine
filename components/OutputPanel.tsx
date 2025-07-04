
import React from 'react';
import { AppMode } from '../types';
import { Icon } from './Icon';

interface OutputPanelProps {
  mode: AppMode;
  code: string;
  aiResponse: string;
  isLoading: boolean;
  error: string | null;
}

const LoadingIndicator: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <Icon name="sparkles" className="w-12 h-12 text-gray-600 animate-pulse" />
        <p className="mt-4 text-sm">AI is thinking...</p>
    </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center justify-center h-full text-red-400 p-4">
        <Icon name="error" className="w-12 h-12" />
        <p className="mt-4 text-sm text-center font-semibold">An Error Occurred</p>
        <p className="mt-2 text-xs text-red-500 bg-red-900/50 p-2 rounded-md">{message}</p>
    </div>
);


export const OutputPanel: React.FC<OutputPanelProps> = ({ mode, code, aiResponse, isLoading, error }) => {
  const isPreviewMode = mode === AppMode.GENERATE || mode === AppMode.FIX;

  const renderContent = () => {
    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error && !isPreviewMode) {
        return <ErrorDisplay message={error} />;
    }

    if (isPreviewMode) {
      return (
        <iframe
          srcDoc={code}
          title="Live Preview"
          sandbox="allow-scripts allow-same-origin"
          className="w-full h-full bg-white"
        />
      );
    } else {
      return (
         <div className="p-4 overflow-y-auto prose prose-sm prose-invert max-w-none">
            <pre className="whitespace-pre-wrap bg-transparent p-0 m-0 font-sans text-gray-300">{aiResponse}</pre>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 p-3 bg-[#111111] border-b border-gray-800">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          {isPreviewMode ? 'Live Preview' : 'AI Output'}
        </h2>
      </div>
      <div className="flex-grow w-full h-full min-h-0">
          {renderContent()}
      </div>
    </div>
  );
};