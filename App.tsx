import React, { useState, useCallback } from 'react';
import { INITIAL_CODE } from './constants';
import { getAiResponseStream } from './services/geminiService';
import { Header } from './components/Header';
import { InputView } from './components/InputView';
import { OutputView } from './components/OutputView';

export default function App(): React.ReactNode {
  const [prompt, setPrompt] = useState<string>('');
  const [code, setCode] = useState<string>(INITIAL_CODE);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!prompt) return;

    setIsLoading(true);
    setError(null);
    setAiResponse('');
    setCode(''); 

    try {
      const stream = getAiResponseStream(prompt);
      let fullResponse = '';
      for await (const chunk of stream) {
        fullResponse += chunk;
        setAiResponse(prev => prev + chunk);
      }
      
      let extractedCode = fullResponse;
      const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
      const match = fullResponse.match(fenceRegex);
      if (match && match[2]) {
          extractedCode = match[2].trim();
      }
      setCode(extractedCode);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      console.error(errorMessage);
      setError(`Error: ${errorMessage}`);
      setAiResponse(`Failed to get response. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="text-text-main min-h-screen w-screen flex flex-col font-sans antialiased overflow-hidden relative bg-primary">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] [background-size:32px_32px]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,theme(colors.primary))]"></div>

      <div className="relative z-10 flex flex-col flex-1 h-full">
        <Header />
        <main className="flex flex-1 flex-col md:flex-row overflow-hidden">
          <InputView
              prompt={prompt}
              setPrompt={setPrompt}
              isLoading={isLoading}
              onSubmit={handleSubmit}
              className="fade-in"
          />
          <OutputView
              code={code}
              setCode={setCode}
              aiResponse={aiResponse}
              isLoading={isLoading}
              error={error}
              className="fade-in-delay"
          />
        </main>
      </div>
    </div>
  );
}