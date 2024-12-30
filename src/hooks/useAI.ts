import { useState } from 'react';
import { AIFactory } from '../services/ai.factory';

export function useAI(openAIKey: string, geminiKey: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  const generateContent = async (prompt: string, type: 'email' | 'testcase' | 'bugreport') => {
    if (!prompt.trim()) {
      setError('Please enter content to generate');
      return;
    }

    if (!openAIKey && !geminiKey) {
      setError('Please provide at least one API key (OpenAI or Gemini)');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const service = AIFactory.createService(openAIKey, geminiKey);
      const content = await service.generateContent(prompt, type);
      setResult(content);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      let userMessage = 'An error occurred while generating content. ';
      
      if (errorMessage.includes('INVALID_API_KEY')) {
        userMessage = 'Invalid API key. Please check your API keys and try again.';
      } else if (errorMessage.includes('RATE_LIMIT_EXCEEDED')) {
        userMessage = 'Rate limit exceeded. Please try again in a few moments.';
      }
      
      setError(userMessage);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearResult = () => setResult('');

  return {
    loading,
    error,
    result,
    generateContent,
    clearResult
  };
}