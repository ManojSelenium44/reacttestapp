import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Table2, ListChecks } from 'lucide-react';
import ChatBotButton from './ChatBot/ChatBotButton';
import DynamicTable from './HomePage/DynamicTable';
import FormElements from './HomePage/FormElements';
import IframePractice from './HomePage/IframePractice';
import DragAndDrop from './HomePage/DragAndDrop';
import ComplexControls from './HomePage/ComplexControls';
import ErrorBoundary from './HomePage/ErrorBoundary';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">
                Selenium UI Automation Practice
              </h1>
              <p className="mt-2 text-gray-600">
                A comprehensive playground for testing complex UI scenarios
              </p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Login to AI Tools
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          <FeatureCard
            icon={<Layout className="h-6 w-6" />}
            title="Complex Layouts"
            description="Practice with nested frames, iframes, and dynamic layouts"
          />
          <FeatureCard
            icon={<Table2 className="h-6 w-6" />}
            title="Dynamic Tables"
            description="Interactive tables with sorting, filtering, and pagination"
          />
          <FeatureCard
            icon={<ListChecks className="h-6 w-6" />}
            title="Form Validation"
            description="Comprehensive form elements with real-time validation"
          />
        </div>

        {/* Practice Sections */}
        <div className="space-y-8">
        <section>
  <h2 className="text-2xl font-bold mb-4">Complex Controls</h2>
  <ErrorBoundary>
    <ComplexControls />
  </ErrorBoundary>
</section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Form Practice</h2>
            <FormElements />
          </section>

          <section>
  <h2 className="text-2xl font-bold mb-4">Dynamic Table Practice</h2>
  <ErrorBoundary>
    <DynamicTable />
  </ErrorBoundary>
</section>


          <section>
            <h2 className="text-2xl font-bold mb-4">Iframe Handling</h2>
            <IframePractice />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Drag and Drop Practice</h2>
            <DragAndDrop />
          </section>
        </div>
      </main>

      {/* Chatbot */}
      <ChatBotButton />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 text-blue-500">{icon}</div>
          <div className="ml-5">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}