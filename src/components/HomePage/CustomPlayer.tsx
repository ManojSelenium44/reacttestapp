import React, { useEffect, useRef } from 'react';

export default function CustomPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!customElements.get('custom-player')) {
      class CustomPlayer extends HTMLElement {
        constructor() {
          super();
          const shadow = this.attachShadow({ mode: 'open' });
          
          const style = document.createElement('style');
          style.textContent = `
            .custom-player {
              background: #f3f4f6;
              padding: 1rem;
              border-radius: 0.5rem;
              margin: 1rem 0;
            }
            .custom-player button {
              background: #4F46E5;
              color: white;
              padding: 0.5rem 1rem;
              border-radius: 0.25rem;
              border: none;
              cursor: pointer;
              margin-right: 0.5rem;
            }
            .custom-player button:hover {
              background: #4338CA;
            }
          `;

          const wrapper = document.createElement('div');
          wrapper.setAttribute('class', 'custom-player');
          
          const title = document.createElement('h3');
          title.textContent = 'Shadow DOM Player';
          title.style.marginBottom = '1rem';
          
          const playButton = document.createElement('button');
          playButton.textContent = 'Play';
          playButton.id = 'playButton';
          
          const stopButton = document.createElement('button');
          stopButton.textContent = 'Stop';
          stopButton.id = 'stopButton';
          
          wrapper.appendChild(title);
          wrapper.appendChild(playButton);
          wrapper.appendChild(stopButton);
          
          shadow.appendChild(style);
          shadow.appendChild(wrapper);
          
          // Add event listeners
          playButton.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('playerPlay'));
          });
          
          stopButton.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('playerStop'));
          });
        }
      }
      
      customElements.define('custom-player', CustomPlayer);
    }
  }, []);

  return (
    <div ref={containerRef}>
      <custom-player data-testid="shadow-dom-player"></custom-player>
    </div>
  );
}