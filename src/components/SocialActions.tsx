import React, { useState, useEffect } from 'react';
import { Github, Heart, Coffee } from 'lucide-react';

const PULSE_INTERVAL = 4000; // Pulse every 4 seconds when not liked

export function SocialActions() {
  const [isLiked, setIsLiked] = useState(false);
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const liked = localStorage.getItem('jarvis-liked') === 'true';
    setIsLiked(liked);

    // Start pulse animation for non-liked state
    if (!liked) {
      const interval = setInterval(() => {
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 1000);
      }, PULSE_INTERVAL);
      return () => clearInterval(interval);
    }
  }, []);

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setIsLikeAnimating(true);
    localStorage.setItem('jarvis-liked', String(newLikedState));
    
    // Reset animation state
    setTimeout(() => setIsLikeAnimating(false), 1000);
  };

  return (
    <div className="fixed top-6 left-0 right-0 px-4 md:px-0 md:right-24 md:left-auto
                    flex items-center justify-end gap-2 md:gap-4 z-50">
      <a
        href="https://github.com/yourusername/jarvis-roadmap"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 px-3 md:px-4 py-2 rounded-full
                 bg-light-bg-secondary/80 dark:bg-dark-bg-secondary/80
                 backdrop-blur-md border border-light-border dark:border-dark-border
                 transition-all duration-300 hover:scale-105
                 text-sm md:text-base"
      >
        <Github className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
        <span className="font-medium hidden xs:inline">Star</span>
        <span className="px-2 py-0.5 text-xs font-semibold rounded-full
                      bg-light-bg-tertiary dark:bg-dark-bg-tertiary">
          2.1k
        </span>
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20
                      bg-gradient-to-r from-indigo-500 to-purple-500 blur-xl transition-opacity" />
      </a>

      <a
        href="https://buymeacoffee.com/yourusername"
        target="_blank"
        rel="noopener noreferrer" 
        className="group p-2 md:p-3 rounded-full
                 bg-light-bg-secondary/80 dark:bg-dark-bg-secondary/80
                 backdrop-blur-md border border-light-border dark:border-dark-border
                 transition-all duration-300 hover:scale-110
                 text-yellow-600 dark:text-yellow-500"
      >
        <Coffee className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20
                      bg-gradient-to-r from-yellow-400 to-orange-500 blur-xl transition-opacity" />
      </a>

      <button
        onClick={handleLike}
        className={`group p-2 md:p-3 rounded-full
                  relative overflow-hidden
                  bg-light-bg-secondary/80 dark:bg-dark-bg-secondary/80
                  backdrop-blur-md border border-light-border dark:border-dark-border
                  transition-all duration-300 hover:scale-110
                  ${isLiked ? 'text-red-500' : 'text-gray-400 dark:text-gray-600'}
                  relative`}
      >
        {!isLiked && (
          <div className={`absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-500/20
                        transition-opacity duration-500 animate-pulse-subtle
                        ${isPulsing ? 'opacity-100' : 'opacity-0'}`} />
        )}
        <Heart
          className={`w-5 h-5 transition-all duration-300
                    ${isLikeAnimating ? 'scale-125' : isPulsing ? 'scale-110' : ''}
                    hover:scale-110
                    ${isLiked ? 'fill-current' : ''}`}
        />
        <div className={`absolute inset-0 rounded-full opacity-0
                      bg-gradient-to-r from-red-400 to-pink-500 blur-xl
                      transition-opacity duration-300
                      ${isLiked ? 'group-hover:opacity-30' : 'group-hover:opacity-20'}`} />
      </button>
    </div>
  );
}