import React, { useState } from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import { RoadmapCard } from './components/RoadmapCard';
import { Theme, Checkpoint } from './types';
import { checkpoints } from './data/checkpoints';
import './styles/colors.css';
import './styles/animations.css';
import { SocialActions } from './components/SocialActions';
import { FlowingCurves } from './components/FlowingCurves';
import { useEffect, useRef, useCallback } from 'react';

// Initialize theme based on user preference
const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
      return 'dark';
    }
  }
  return 'light';
};

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const overviewHeightRef = useRef<{ [key: number]: number }>({});

  const updateContentHeight = useCallback((cardId: number) => {
    const card = document.getElementById(`card-${cardId}`);
    const overviewContent = card?.querySelector('[data-tab="overview"]');
    const container = card?.querySelector('[data-content-container]');
    
    if (overviewContent && container) {
      const height = overviewContent.scrollHeight;
      container.style.setProperty('--content-height', `${height}px`);
      overviewHeightRef.current[cardId] = height;
    }
  }, []);

  useEffect(() => {
    if (expandedId) {
      // Small delay to ensure content is rendered
      requestAnimationFrame(() => {
        updateContentHeight(expandedId);
      });
    }
  }, [expandedId, updateContentHeight]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300
                     bg-light-bg-primary dark:bg-dark-bg-primary
                     text-light-text-primary dark:text-dark-text-primary
                     pt-24 md:pt-12`}>
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <SocialActions />
      
      <main className="container mx-auto px-4 space-y-8 relative z-10">
        <FlowingCurves cardIds={checkpoints.map(c => c.id)} />
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-6xl font-bold mb-6
                       bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                       bg-clip-text text-transparent">
            Jarvis Series
          </h1>
          <h2 className="text-3xl font-semibold mb-4
                       bg-gradient-to-r from-indigo-400 to-purple-400
                       bg-clip-text text-transparent">
            FREE Development Roadmap
          </h2>
          <p className="text-xl mb-8 text-light-text-secondary dark:text-dark-text-secondary">
            Track the evolution of the Jarvis AI assistant through our development journey. 
            Each milestone represents a new capability demonstrated in our YouTube series.
          </p>
          <button className="px-8 py-3 rounded-full text-white font-semibold
                           bg-gradient-to-r from-indigo-500 to-purple-500
                           hover:from-indigo-600 hover:to-purple-600
                           transform hover:scale-105 transition-all
                           shadow-lg hover:shadow-xl">
            Subscribe for Updates
          </button>
        </div>
        
        <div className="max-w-6xl mx-auto space-y-16">
          {checkpoints.map((checkpoint, index) => (
            <RoadmapCard
              key={checkpoint.id}
              isExpanded={expandedId === checkpoint.id}
              onToggleExpand={(id) => setExpandedId(expandedId === id ? null : id)}
              checkpoint={checkpoint}
              index={index}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;