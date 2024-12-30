import { useState } from 'react';
import { OpenAIService } from '../services/openai';

export function useOpenAI(apiKey: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  const generateContent = async (prompt: string, type: 'email' | 'testcase' | 'bugreport') => {
    if (!prompt.trim()) {
      setError('Please enter content to generate');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const service = new OpenAIService(apiKey);
      const content = await service.generateContent(prompt, type);
      setResult(content);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
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