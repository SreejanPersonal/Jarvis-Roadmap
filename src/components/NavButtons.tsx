
import React, { useState, useEffect } from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import { Heart, Coffee, Github, Star, HeartOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  tooltip: string;
  hoverColor?: string;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, tooltip, hoverColor = "text-surface-accent", onClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const handleClick = () => {
    onClick();
  };
  
  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="neomorphic-premium overflow-hidden flex items-center justify-center gap-2 hover:scale-110 transition-all duration-300"
        aria-label={label}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className={`transition-all duration-300 ${hoverColor}`}>
          {icon}
        </div>
      </button>
      
      {showTooltip && (
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="neomorphic-sm py-1 px-3 text-xs whitespace-nowrap">
            {tooltip}
          </div>
        </div>
      )}
    </div>
  );
};

const NavButtons: React.FC = () => {
  const [liked, setLiked] = useState(false);
  const [starsCount, setStarsCount] = useState<string>("5.2k");
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);
  const [isCoffeeAnimating, setIsCoffeeAnimating] = useState(false);
  const [isGithubAnimating, setIsGithubAnimating] = useState(false);
  
  useEffect(() => {
    // Check local storage for heart state
    const hasLiked = localStorage.getItem('jarvis-liked') === 'true';
    setLiked(hasLiked);
    
    // Start the heart pulse animation if liked
    if (hasLiked) {
      const pulseInterval = setInterval(() => {
        setIsHeartAnimating(true);
        setTimeout(() => setIsHeartAnimating(false), 1200);
      }, 5000); // Gentle heartbeat every 5 seconds
      
      return () => clearInterval(pulseInterval);
    }
  }, []);
  
  const handleHeartClick = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    setIsHeartAnimating(true);
    setTimeout(() => setIsHeartAnimating(false), 1200);
    
    localStorage.setItem('jarvis-liked', String(newLikedState));
    
    if (newLikedState) {
      toast({
        title: "Thank you for your support!",
        description: "Your support means a lot to us.",
      });
    }
  };
  
  const handleCoffeeClick = () => {
    setIsCoffeeAnimating(true);
    setTimeout(() => setIsCoffeeAnimating(false), 1500);
    
    window.open('https://buymeacoffee.com/devsdocode', '_blank');
    toast({
      title: "Buy Me A Coffee",
      description: "Thanks for considering supporting this project!",
    });
  };
  
  const handleGithubClick = () => {
    setIsGithubAnimating(true);
    setTimeout(() => setIsGithubAnimating(false), 800);
    
    window.open('https://github.com/SreejanPersonal/Jarvis-Roadmap', '_blank');
    toast({
      title: "GitHub Repository",
      description: "Don't forget to star the repository!",
    });
  };
  
  return (
    <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
      <div className="relative">
        <button
          onClick={handleHeartClick}
          className={`neomorphic-premium overflow-visible flex items-center justify-center gap-2 hover:scale-110 transition-all duration-300 ${liked ? 'animate-pulse-slow' : ''}`}
          aria-label="Support"
        >
          <div className="heart-button-container">
            {liked ? (
              <Heart 
                size={20} 
                className={`transition-all duration-300 text-destructive ${isHeartAnimating ? 'heart-pump-animation' : ''}`}
                style={{ fill: 'hsl(var(--destructive))' }}
              />
            ) : (
              <HeartOff
                size={20}
                className={`transition-all duration-300 text-destructive ${isHeartAnimating ? 'heart-break-animation' : ''}`}
              />
            )}
          </div>
        </button>
        
        {/* Heart animation overlay that appears around the button */}
        <style dangerouslySetInnerHTML={{
          __html: `
          .heart-button-container {
            position: relative;
            z-index: 1;
          }
          
          .heart-pump-animation {
            animation: heartPump 1.2s ease-in-out;
            transform-origin: center;
          }
          
          .heart-break-animation {
            animation: heartBreak 1.2s ease-in-out;
          }
          
          @keyframes heartPump {
            0% { transform: scale(1); }
            15% { transform: scale(1.5); }
            30% { transform: scale(1.2); }
            45% { transform: scale(1.6); }
            60% { transform: scale(1.4); }
            75% { transform: scale(1.8); }
            100% { transform: scale(1); }
          }
          
          @keyframes heartBreak {
            0% { transform: scale(1) rotate(0); }
            20% { transform: scale(1.2) rotate(-5deg); }
            40% { transform: scale(0.9) rotate(5deg); }
            60% { transform: scale(1.1) rotate(-3deg); }
            80% { transform: scale(0.95) rotate(3deg); }
            100% { transform: scale(1) rotate(0); }
          }
          `
        }} />
      </div>
      
      <div className="relative">
        <button
          onClick={handleCoffeeClick}
          className="neomorphic-premium overflow-visible flex items-center justify-center gap-2 hover:scale-110 transition-all duration-300"
          aria-label="Buy me a coffee"
        >
          <div className={`coffee-container ${isCoffeeAnimating ? 'coffee-tilt' : ''}`}>
            <Coffee size={20} className="text-yellow-500 transition-transform coffee-icon" />
            <div className="coffee-steam-large"></div>
            <div className="coffee-steam-large coffee-steam-2"></div>
            <div className="coffee-steam-large coffee-steam-3"></div>
          </div>
        </button>
      </div>
      
      <div className="relative">
        <button
          onClick={handleGithubClick}
          className={`neomorphic-premium overflow-hidden flex items-center justify-center gap-2 hover:scale-110 transition-all duration-300 px-3 py-2 ${isGithubAnimating ? 'github-pulse' : ''}`}
          aria-label="GitHub repository"
        >
          <div className="flex items-center gap-2">
            <Github size={20} className={`transition-transform ${isGithubAnimating ? 'animate-spin-slow' : 'hover:rotate-12'}`} />
            <span className="text-xs font-medium">GitHub</span>
            <div className="flex items-center gap-0.5">
              <Star size={14} className="text-yellow-400 animate-pulse-slow" />
              <span className="text-xs">{starsCount}</span>
            </div>
          </div>
        </button>
      </div>
      
      <ThemeSwitcher />
    </div>
  );
};

export default NavButtons;
