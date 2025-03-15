import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { cn } from '@/lib/utils';
import { CheckCheck, Clock, AlertCircle } from 'lucide-react';

export interface TimelineNodeData {
  id: number;
  title: string;
  datePublished: string;
  completed: boolean;
  isLatest: boolean;
}

interface TimelineNodeProps {
  node: TimelineNodeData;
  isSelected: boolean;
  onClick: () => void;
  index: number;
  cardRef: React.RefObject<HTMLDivElement>;
}

const TimelineNode: React.FC<TimelineNodeProps> = ({ node, isSelected, onClick, index, cardRef }) => {
  const [animate, setAnimate] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const [nodePosition, setNodePosition] = useState(0);
  const positionRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  
  useEffect(() => {
    const initialPositioning = () => {
      if (!cardRef.current || !nodeRef.current) return;
      
      const cardRect = cardRef.current.getBoundingClientRect();
      const timelineContainer = nodeRef.current.closest('.timeline-container');
      
      if (timelineContainer) {
        const containerRect = timelineContainer.getBoundingClientRect();
        const newPosition = cardRect.top - containerRect.top + cardRect.height / 2;
        
        if (nodeRef.current) {
          nodeRef.current.style.top = `${newPosition}px`;
          nodeRef.current.style.opacity = '1';
          positionRef.current = newPosition;
        }
      }
    };

    setTimeout(initialPositioning, 10);
    window.addEventListener('load', initialPositioning);
    return () => {
      window.removeEventListener('load', initialPositioning);
    };
  }, [cardRef]);
  
  useLayoutEffect(() => {
    const updatePosition = () => {
      if (!cardRef.current || !nodeRef.current) return;
      
      const cardRect = cardRef.current.getBoundingClientRect();
      const timelineContainer = nodeRef.current.closest('.timeline-container');
      
      if (timelineContainer) {
        const containerRect = timelineContainer.getBoundingClientRect();
        const newPosition = cardRect.top - containerRect.top + cardRect.height / 2;
        
        nodeRef.current.style.top = `${newPosition}px`;
        nodeRef.current.style.willChange = 'transform, top';
        nodeRef.current.style.transform = 'translateZ(0)';
        positionRef.current = newPosition;
      }
    };
    
    updatePosition();
    
    const handleScroll = () => {
      if (!cardRef.current || !nodeRef.current) return;
      
      const cardRect = cardRef.current.getBoundingClientRect();
      const timelineContainer = nodeRef.current.closest('.timeline-container');
      
      if (timelineContainer) {
        const containerRect = timelineContainer.getBoundingClientRect();
        const newPosition = cardRect.top - containerRect.top + cardRect.height / 2;
        
        nodeRef.current.style.top = `${newPosition}px`;
      };
    };
    
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    
    const timelineContainer = nodeRef.current?.closest('.timeline-container');
    if (timelineContainer) {
      timelineContainer.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', handleScroll, { capture: true });
      if (timelineContainer) {
        timelineContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [cardRef]);
  
  useEffect(() => {
    if (isSelected && nodeRef.current) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isSelected]);
  
  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 1000);
    onClick();
  };
  
  const getIconAndClass = () => {
    if (node.completed) {
      return { 
        icon: <CheckCheck size={18} className="checkpoint-completed" />,
        borderClass: "border-[hsl(var(--checkpoint-completed))]",
        bgClass: "bg-[hsla(var(--checkpoint-completed),0.15)]"
      };
    } else if (node.isLatest) {
      return { 
        icon: <Clock size={18} className="checkpoint-current" />,
        borderClass: "border-[hsl(var(--checkpoint-current))]",
        bgClass: "bg-[hsla(var(--checkpoint-current),0.15)]"
      };
    } else {
      return { 
        icon: <AlertCircle size={18} className="checkpoint-upcoming" />,
        borderClass: "border-[hsl(var(--checkpoint-upcoming))]",
        bgClass: "bg-[hsla(var(--checkpoint-upcoming),0.15)]"
      };
    }
  };
  
  const { icon, borderClass, bgClass } = getIconAndClass();
  
  return (
    <div 
      className="flex flex-col items-center absolute will-change-transform"
      style={{ 
        top: `${nodePosition}px`,
        transform: 'translateZ(0)',
        transition: 'none',
        opacity: '0'
      }}
      ref={nodeRef}
    >
      <div
        onClick={handleClick}
        className={cn(
          "relative w-14 h-14 flex items-center justify-center cursor-pointer transition-all duration-300 z-10",
          isSelected ? "scale-110" : "",
          animate ? "animate-timeline-pop" : ""
        )}
      >
        <div 
          className={cn(
            "neomorphic-timeline w-14 h-14 flex items-center justify-center rounded-full transition-all duration-300",
            bgClass,
            isSelected ? `border-2 ${borderClass} shadow-glow scale-110` : "",
            node.isLatest ? `border-2 ${borderClass}` : ""
          )}
        >
          {icon}
        </div>
        
        <div 
          className={cn(
            "absolute -bottom-14 transform transition-all duration-300 opacity-0 pointer-events-none",
            isSelected ? "opacity-100 translate-x-0" : "translate-x-4"
          )}
        >
          <div className="neomorphic-sm px-3 py-1 min-w-40 hover:scale-105 transition-transform">
            <p className="text-xs font-medium truncate">{node.title}</p>
            <p className="text-xs text-muted-foreground">{node.datePublished}</p>
          </div>
        </div>
      </div>
      
      <div className="w-1 h-24 bg-timeline rounded-full"></div>
    </div>
  );
};

export default TimelineNode;
