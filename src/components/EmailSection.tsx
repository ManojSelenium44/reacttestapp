import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { useAI } from '../hooks/useAI';

interface EmailSectionProps {
  openAIKey: string;
  geminiKey: string;
}

export default function EmailSection({ openAIKey, geminiKey }: EmailSectionProps) {
  const [prompt, setPrompt] = useState('');
  const { loading, error, result, generateContent, clearResult } = useAI(openAIKey, geminiKey);

  const handleSubmit = () => {
    generateContent(prompt, 'email');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <div className="flex items-center space-x-2">
        <Mail className="text-blue-500" />
        <h2 className="text-xl font-semibold">Email Content Generator</h2>
      </div>
      <textarea
        className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Enter your email content..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
      >
        {loading ? 'Generating...' : 'Generate Professional Email'}
      </button>
      {result && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Generated Content:</h3>
          <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
            {result}
          </div>
          <button
            onClick={clearResult}
            className="mt-2 text-sm text-gray-500 hover:text-gray-700"
          >
            Clear Result
          </button>
        </div>
      )}
    </div>
  );
}