
import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Calendar, Clock, Tag, Sparkles, Star } from 'lucide-react';
import { RoadmapItem } from '@/lib/roadmap-data';

interface RoadmapCardProps {
  item: RoadmapItem;
  isSelected: boolean;
  onClick: () => void;
}

const RoadmapCard = forwardRef<HTMLDivElement, RoadmapCardProps>(({ item, isSelected, onClick }, ref) => {
  const [isPressed, setIsPressed] = useState(false);
  const [animateAppear, setAnimateAppear] = useState(false);
  const [animateSelect, setAnimateSelect] = useState(false);
  const [animateCardChange, setAnimateCardChange] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setAnimateAppear(true);
    const timer = setTimeout(() => setAnimateAppear(false), 500);
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (isSelected) {
      setAnimateSelect(true);
      setAnimateCardChange(true);
      const timer = setTimeout(() => setAnimateSelect(false), 1000);
      const timer2 = setTimeout(() => setAnimateCardChange(false), 500);
      return () => {
        clearTimeout(timer);
        clearTimeout(timer2);
      };
    }
  }, [isSelected]);
  
  const handleMouseDown = () => {
    setIsPressed(true);
  };
  
  const handleMouseUp = () => {
    setIsPressed(false);
  };
  
  const handleClick = () => {
    setAnimateCardChange(true);
    setTimeout(() => setAnimateCardChange(false), 500);
    onClick();
  };
  
  // Determine card design based on status
  const getCardDesign = () => {
    // Base classes that all cards share
    const baseClasses = "neomorphic p-6 transition-all duration-500 ease-out transform relative rounded-2xl";
    
    if (item.isLatest) {
      // Latest video card design - premium, eye-catching
      return cn(
        baseClasses,
        "bg-gradient-to-br from-[hsla(var(--checkpoint-current),0.15)] to-[hsla(var(--checkpoint-current),0.05)]",
        isSelected ? "border-2 border-[hsl(var(--checkpoint-current))]" : "border border-[hsla(var(--checkpoint-current),0.6)]",
        "shadow-premium",
        isSelected ? "card-selected-premium" : ""
      );
    } else if (item.completed) {
      // Completed video card design
      return cn(
        baseClasses,
        "bg-[hsla(var(--checkpoint-completed),0.08)]",
        isSelected ? "border-2 border-[hsl(var(--checkpoint-completed))]" : "border border-[hsla(var(--checkpoint-completed),0.6)]",
        "shadow-elevated",
        isSelected ? "card-selected-completed" : ""
      );
    } else {
      // Upcoming video card design
      return cn(
        baseClasses,
        "bg-[hsla(var(--checkpoint-upcoming),0.05)]",
        isSelected ? "border-2 border-[hsl(var(--checkpoint-upcoming))]" : "border border-[hsla(var(--checkpoint-upcoming),0.4)]",
        "shadow-elevated",
        isSelected ? "card-selected-upcoming" : ""
      );
    }
  };
  
  // Tag colors based on card status
  const getTagClass = () => {
    if (item.isLatest) {
      return "bg-[hsla(var(--checkpoint-current),0.15)] text-[hsl(var(--checkpoint-current))]";
    } else if (item.completed) {
      return "bg-[hsla(var(--checkpoint-completed),0.15)] text-[hsl(var(--checkpoint-completed))]";
    } else {
      return "bg-[hsla(var(--checkpoint-upcoming),0.15)] text-[hsl(var(--checkpoint-upcoming))]";
    }
  };
  
  return (
    <div 
      ref={(node) => {
        // Handle both the forwardRef and the local ref
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        if (cardRef) {
          cardRef.current = node;
        }
      }}
      className={cn(
        "w-full max-w-md mx-auto cursor-pointer overflow-hidden",
        isPressed ? "scale-98" : "hover:scale-[1.02] transition-transform duration-300",
        isSelected ? "z-10" : "z-0",
        "transition-all duration-500 ease-out",
        animateCardChange ? "animate-card-select" : "",
        isSelected ? "animate-float-slow" : ""
      )}
      style={isSelected ? { animationDuration: '2s' } : {}}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
    >
      <div className={getCardDesign()}>
        {/* Latest video tag - attached to the card itself */}
        {item.isLatest && (
          <div className="absolute top-3 right-3 z-10">
            <div className="neomorphic-premium py-1 px-3 text-xs checkpoint-current font-medium flex items-center gap-1 animate-float-steady">
              <Sparkles size={14} className="animate-sparkle" />
              <span>Latest Video</span>
              <Star size={12} className="text-yellow-500 ml-1" />
            </div>
          </div>
        )}
        
        <h3 className={cn(
          "text-xl font-semibold mb-2",
          item.isLatest ? "text-[hsl(var(--checkpoint-current))]" : ""
        )}>
          {item.title}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className={cn(
                "neomorphic-tag text-xs px-3 py-1 bg-opacity-80 inline-flex items-center gap-1 hover:scale-105 transition-transform",
                getTagClass()
              )}
            >
              <Tag size={12} className={item.isLatest ? "text-[hsl(var(--checkpoint-current))]" : 
                                       item.completed ? "text-[hsl(var(--checkpoint-completed))]" : 
                                       "text-[hsl(var(--checkpoint-upcoming))]"} />
              {tag}
            </span>
          ))}
          {item.tags.length > 3 && (
            <span className={cn(
              "neomorphic-tag text-xs px-3 py-1 bg-opacity-80 hover:scale-105 transition-transform",
              getTagClass()
            )}>
              +{item.tags.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar size={14} className={
              item.isLatest ? "text-[hsl(var(--checkpoint-current))]" : 
              item.completed ? "text-[hsl(var(--checkpoint-completed))]" : 
              "text-[hsl(var(--checkpoint-upcoming))]"
            } />
            <span>{item.datePublished}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Clock size={14} className={
              item.isLatest ? "text-[hsl(var(--checkpoint-current))]" : 
              item.completed ? "text-[hsl(var(--checkpoint-completed))]" : 
              "text-[hsl(var(--checkpoint-upcoming))]"
            } />
            <span>{item.duration}</span>
          </div>
        </div>
        
        {/* Visual indicator that this is clickable */}
        <div className="absolute bottom-3 right-3 w-6 h-6 rounded-full neomorphic-sm flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
          <span className="text-xs">+</span>
        </div>
      </div>
    </div>
  );
});

RoadmapCard.displayName = 'RoadmapCard';

export default RoadmapCard;
