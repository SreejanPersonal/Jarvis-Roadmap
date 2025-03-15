
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCheck, Clock, AlertCircle, ChevronRight } from 'lucide-react';
import { RoadmapItem } from '@/lib/roadmap-data';

interface MobileRoadmapViewProps {
  items: RoadmapItem[];
  selectedItemId: number | null;
  onItemClick: (id: number) => void;
}

const MobileRoadmapView: React.FC<MobileRoadmapViewProps> = ({
  items,
  selectedItemId,
  onItemClick
}) => {
  // Sort items to display completed first, then latest, then upcoming
  const sortedItems = [...items].sort((a, b) => {
    if (a.completed && !b.completed) return -1;
    if (!a.completed && b.completed) return 1;
    if (a.isLatest && !b.isLatest) return -1;
    if (!a.isLatest && b.isLatest) return 1;
    return a.id - b.id;
  });

  return (
    <div className="py-4">
      {/* Progress summary */}
      <div className="neomorphic mb-6 p-4 rounded-xl">
        <h3 className="text-lg font-semibold mb-3">Development Progress</h3>
        <div className="relative h-2 bg-surface-shadow rounded-full mb-3 overflow-hidden">
          <div 
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-[hsl(var(--checkpoint-completed))] to-[hsl(var(--checkpoint-current))]"
            style={{ 
              width: `${(items.filter(item => item.completed).length / items.length) * 100}%`
            }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{items.filter(item => item.completed).length} completed</span>
          <span>{items.length - items.filter(item => item.completed).length} upcoming</span>
        </div>
      </div>
      
      {/* Mobile cards grid */}
      <div className="space-y-4">
        {sortedItems.map((item) => {
          const isSelected = selectedItemId === item.id;
          
          let statusIcon;
          let statusColor;
          
          if (item.completed) {
            statusIcon = <CheckCheck size={16} className="checkpoint-completed" />;
            statusColor = "checkpoint-completed";
          } else if (item.isLatest) {
            statusIcon = <Clock size={16} className="checkpoint-current" />;
            statusColor = "checkpoint-current";
          } else {
            statusIcon = <AlertCircle size={16} className="checkpoint-upcoming" />;
            statusColor = "checkpoint-upcoming";
          }
          
          return (
            <div 
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={cn(
                "neomorphic p-4 rounded-xl relative transition-all duration-300 active:scale-95 cursor-pointer",
                isSelected ? "shadow-glow" : ""
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "flex items-center justify-center rounded-full w-8 h-8 flex-shrink-0 bg-[hsla(var(--surface-shadow),0.2)]",
                  `text-[hsl(var(--${statusColor}))]`
                )}>
                  {item.id}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                    <ChevronRight size={16} className="flex-shrink-0 text-muted-foreground" />
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>{item.datePublished}</span>
                    </div>
                    <div className={cn(
                      "flex items-center text-xs px-2 py-0.5 rounded-full",
                      `text-[hsl(var(--${statusColor}))]`,
                      `bg-[hsla(var(--${statusColor}),0.1)]`
                    )}>
                      {statusIcon}
                      <span className="ml-1">
                        {item.completed ? "Completed" : item.isLatest ? "In Progress" : "Upcoming"}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground line-clamp-2">{item.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobileRoadmapView;
