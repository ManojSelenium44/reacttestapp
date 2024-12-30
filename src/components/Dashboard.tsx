import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import EmailSection from './EmailSection';
import TestCaseSection from './TestCaseSection';
import BugReportSection from './BugReportSection';

export default function Dashboard() {
  const [openAIKey, setOpenAIKey] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  const [isKeySet, setIsKeySet] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSetApiKeys = () => {
    if (openAIKey.trim() || geminiKey.trim()) {
      setIsKeySet(true);
    }
  };

  if (!isKeySet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Enter API Keys</h1>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-700"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="openai" className="block text-sm font-medium text-gray-700 mb-1">
                OpenAI API Key (Optional)
              </label>
              <input
                id="openai"
                type="password"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="sk-..."
                value={openAIKey}
                onChange={(e) => setOpenAIKey(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="gemini" className="block text-sm font-medium text-gray-700 mb-1">
                Google Gemini API Key (Optional)
              </label>
              <input
                id="gemini"
                type="password"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="AI..."
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
              />
            </div>
            
            <button
              onClick={handleSetApiKeys}
              disabled={!openAIKey && !geminiKey}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
            >
              Start Using App
            </button>
            
            <p className="text-sm text-gray-500 text-center">
              Provide at least one API key (OpenAI or Gemini) to continue
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-800">AI Prompt Engineering Suite</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          Transform your content with AI-powered email formatting, test case generation, and bug reporting tools.
        </p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <EmailSection openAIKey={openAIKey} geminiKey={geminiKey} />
        <TestCaseSection openAIKey={openAIKey} geminiKey={geminiKey} />
        <BugReportSection openAIKey={openAIKey} geminiKey={geminiKey} />
      </main>

      <footer className="max-w-6xl mx-auto mt-8 text-center text-gray-500">
        <p>Powered by OpenAI GPT-3.5 & Google Gemini • Built with React and TailwindCSS</p>
      </footer>
    </div>
  );
}