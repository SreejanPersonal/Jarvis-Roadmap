
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, Stars } from 'lucide-react';

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Persist theme in localStorage
  useEffect(() => {
    if (theme) {
      localStorage.setItem('jarvis-theme', theme);
    }
  }, [theme]);
  
  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
    toggleTheme();
  };
  
  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="neomorphic-premium overflow-visible hover:scale-110 transition-all duration-300"
        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {theme === 'light' ? (
          <div className={`sun-animation-container ${isAnimating ? 'sun-click' : ''}`}>
            <Sun size={20} className="text-yellow-500 z-10 relative" />
            <div className="sun-rays"></div>
          </div>
        ) : (
          <div className={`moon-animation-container ${isAnimating ? 'moon-click' : ''}`}>
            <Moon size={20} className="text-blue-400 z-10 relative" />
            <Stars size={14} className="absolute -top-1 -right-1 text-blue-300 animate-twinkle" />
          </div>
        )}
      </button>
      
      {showTooltip && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[calc(100%+0.5rem)] z-50 animate-fade-in">
          <div className="neomorphic-sm py-1 px-3 text-xs whitespace-nowrap">
            {theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          </div>
        </div>
      )}

      {/* Add style for theme toggle animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .sun-animation-container,
          .moon-animation-container {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .sun-rays {
            position: absolute;
            width: 30px;
            height: 30px;
            background: transparent;
            border-radius: 50%;
            box-shadow: 0 0 20px 5px rgba(255, 200, 0, 0.5);
            z-index: 0;
            opacity: 0.7;
            transition: all 0.3s ease;
          }
          
          .sun-click {
            animation: sun-rotate 1s ease-in-out forwards;
          }
          
          .moon-click {
            animation: moon-rotate 1s ease-in-out forwards;
          }
          
          @keyframes sun-rotate {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.2); }
            100% { transform: rotate(360deg) scale(1); }
          }
          
          @keyframes moon-rotate {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(-180deg) scale(1.2); }
            100% { transform: rotate(-360deg) scale(1); }
          }
          
          .animate-twinkle {
            animation: twinkle 1.5s ease-in-out infinite;
          }
          
          @keyframes twinkle {
            0%, 100% { opacity: 0.4; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.1); }
          }
        `
      }} />
    </div>
  );
};

export default ThemeSwitcher;
