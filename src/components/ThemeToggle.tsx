import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Theme } from '../types';

interface Props {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-6 right-4 md:right-6 p-2 rounded-full bg-opacity-20 backdrop-blur-sm
                 transition-all duration-300 ease-out hover:scale-110 hover:rotate-12
                 dark:bg-dark-bg-secondary bg-light-bg-secondary
                 dark:text-dark-text-primary text-light-text-primary
                 hover:bg-opacity-30 group"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <Sun className="absolute inset-0 transition-all duration-300 
                       dark:opacity-0 dark:rotate-90 dark:scale-50
                       opacity-100 rotate-0 scale-100" />
        <Moon className="absolute inset-0 transition-all duration-300
                        dark:opacity-100 dark:rotate-0 dark:scale-100
                        opacity-0 -rotate-90 scale-50" />
      </div>
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20
                      bg-gradient-to-r from-indigo-500 to-purple-500 blur-xl transition-opacity" />
    </button>
  );
}