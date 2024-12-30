import React, { useState } from 'react';

export default function IframePractice() {
  const [activeFrame, setActiveFrame] = useState(1);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-medium mb-4">Iframe Practice</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <button
          onClick={() => setActiveFrame(1)}
          className={`p-2 rounded ${
            activeFrame === 1 ? 'bg-blue-500 text-white' : 'bg-gray-100'
          }`}
          data-testid="frame1-button"
        >
          Frame 1
        </button>
        <button
          onClick={() => setActiveFrame(2)}
          className={`p-2 rounded ${
            activeFrame === 2 ? 'bg-blue-500 text-white' : 'bg-gray-100'
          }`}
          data-testid="frame2-button"
        >
          Frame 2
        </button>
      </div>

      <div className="relative h-96 border rounded-lg overflow-hidden">
        {activeFrame === 1 && (
          <iframe
            src="https://example.com"
            className="w-full h-full"
            data-testid="frame1"
            title="Frame 1"
          />
        )}
        {activeFrame === 2 && (
          <iframe
            src="https://example.org"
            className="w-full h-full"
            data-testid="frame2"
            title="Frame 2"
          />
        )}
      </div>
    </div>
  );
}