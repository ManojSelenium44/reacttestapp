import React, { useState } from 'react';
import { Bug } from 'lucide-react';
import { useAI } from '../hooks/useAI';

interface BugReportSectionProps {
  openAIKey: string;
  geminiKey: string;
}

export default function BugReportSection({ openAIKey, geminiKey }: BugReportSectionProps) {
  const [prompt, setPrompt] = useState('');
  const { loading, error, result, generateContent, clearResult } = useAI(openAIKey, geminiKey);

  const handleSubmit = () => {
    generateContent(prompt, 'bugreport');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <div className="flex items-center space-x-2">
        <Bug className="text-red-500" />
        <h2 className="text-xl font-semibold">Bug Report Generator</h2>
      </div>
      <textarea
        className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        placeholder="Describe the bug..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors disabled:bg-red-300"
      >
        {loading ? 'Generating...' : 'Generate Bug Report'}
      </button>
      {result && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Generated Bug Report:</h3>
          <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
            {result}
          </div>
          <button
            onClick={clearResult}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear Result
          </button>
        </div>
      )}
    </div>
  );
}