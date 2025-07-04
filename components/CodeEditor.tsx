
import React from 'react';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode }) => {
  return (
    <div className="flex flex-col h-full">
        <div className="flex-shrink-0 p-3 bg-[#111111] border-b border-gray-800">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Code Editor</h2>
        </div>
        <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
            className="w-full h-full bg-transparent p-4 font-mono text-sm text-gray-300 resize-none focus:outline-none"
        />
    </div>
  );
};
