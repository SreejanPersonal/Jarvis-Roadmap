
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Calendar, Clock, Tag, Youtube, FileCode, Download, Info, AlertTriangle, CheckCircle, BookOpen, Code, LockIcon, UnlockIcon } from 'lucide-react';
import { RoadmapItem } from '@/lib/roadmap-data';
import { toast } from '@/hooks/use-toast';

interface CardDetailProps {
  item: RoadmapItem | null;
  isVisible: boolean;
}

type TabType = 'overview' | 'technical' | 'source';

const CardDetail: React.FC<CardDetailProps> = ({
  item,
  isVisible
}) => {
  const [animateIn, setAnimateIn] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      // Small delay to trigger animation after component mounts
      const timer = setTimeout(() => setAnimateIn(true), 50);
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);
    }
  }, [isVisible, item]);

  useEffect(() => {
    // Reset to overview tab when item changes
    setActiveTab('overview');
  }, [item]);

  if (!item) return null;

  const handleWatchVideo = () => {
    if (item.videoUrl && item.completed) {
      window.open(item.videoUrl, '_blank');
    } else {
      toast({
        title: "Coming soon!",
        description: "This video is not available yet. Stay tuned!"
      });
    }
  };

  const handleDownloadCode = () => {
    if (!item.completed) {
      toast({
        title: "Not Available",
        description: "Source code will be available after the video is released.",
        variant: "destructive"
      });
      return;
    }

    if (item.sourceCodeUrl && item.completed) {
      window.open(item.sourceCodeUrl, '_blank');
    } else {
      toast({
        title: "Source code",
        description: "The download will begin shortly."
      });
    }
  };

  // Get YouTube thumbnail from video URL
  const getYouTubeThumbnail = (url: string | undefined): string => {
    if (!url) return '/upcoming_default.png';
    
    try {
      // Extract video ID from YouTube URL
      const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
      const videoId = videoIdMatch?.[1];
      
      if (videoId) {
        // Return high quality thumbnail URL
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      }
    } catch (error) {
      console.error("Error parsing YouTube URL:", error);
    }
    
    return '/upcoming_default.png';
  };

  const TabButton = ({
    type,
    label,
    icon
  }: {
    type: TabType;
    label: string;
    icon: React.ReactNode;
  }) => <button className={cn("relative overflow-hidden rounded-xl px-2 sm:px-4 py-2 sm:py-3 flex items-center gap-1.5 sm:gap-2 transition-all duration-300", activeTab === type ? "tab-button-active" : "neomorphic-sm hover:scale-105")} onClick={() => setActiveTab(type)}>
      {icon}
      <span className="font-medium text-xs sm:text-base whitespace-nowrap">{label}</span>
      {activeTab === type && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-surface-accent to-blue-500 animate-width-expand"></span>}
    </button>;

  return <div ref={detailRef} className={cn("w-full max-w-lg transition-all duration-500 ease-in-out transform", isVisible ? "opacity-100" : "opacity-0", animateIn ? "translate-x-0" : "translate-x-20")}>
      <div className="neomorphic p-6 rounded-2xl hover:shadow-glow-soft transition-all duration-500 my-[-40px] animate-float-slow transform-gpu">
        <div className="flex flex-col">
          <div>
            <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">{item.title}</h2>
            
            <div className="flex flex-wrap gap-3 mb-6 text-sm">
              <div className="neomorphic-tag px-3 py-1 flex items-center gap-1 hover:scale-105 transition-transform">
                <Calendar size={16} className="text-surface-accent" />
                <span>{item.datePublished}</span>
              </div>
              
              <div className="neomorphic-tag px-3 py-1 flex items-center gap-1 hover:scale-105 transition-transform">
                <Clock size={16} className="text-surface-accent" />
                <span>{item.duration}</span>
              </div>
              
              {item.completed && <div className="neomorphic-tag px-3 py-1 flex items-center gap-1 checkpoint-completed font-medium hover:scale-105 transition-transform">
                  <CheckCircle size={16} />
                  <span>Completed</span>
                </div>}
              
              {!item.completed && item.isLatest && <div className="neomorphic-tag px-3 py-1 flex items-center gap-1 checkpoint-current font-medium hover:scale-105 transition-transform">
                  <Clock size={16} />
                  <span>In Progress</span>
                </div>}
              
              {!item.completed && !item.isLatest && <div className="neomorphic-tag px-3 py-1 flex items-center gap-1 checkpoint-upcoming font-medium hover:scale-105 transition-transform">
                  <AlertTriangle size={16} />
                  <span>Upcoming</span>
                </div>}
            </div>
            
            {/* Tab buttons */}
            <div className="flex gap-2 sm:gap-3 mb-6 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
              <TabButton type="overview" label="Overview" icon={<Info size={16} className="text-surface-accent" />} />
              
              <TabButton type="technical" label="Tech" icon={<BookOpen size={16} className="text-surface-accent" />} />
              
              <TabButton type="source" label="Code" icon={<Code size={16} className="text-surface-accent" />} />
            </div>
          </div>
          
          {/* Overview Tab */}
          {activeTab === 'overview' && <div className="animate-fade-in">
              <div className="mb-6">
                <div className="neomorphic-sm aspect-video flex items-center justify-center mb-4 overflow-hidden rounded-xl">
                  {item.completed ? (
                    // For completed videos - clickable thumbnail from YouTube
                    <img 
                      src={getYouTubeThumbnail(item.videoUrl)} 
                      alt={item.title} 
                      onClick={handleWatchVideo}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300 cursor-pointer" 
                    />
                  ) : (
                    // For upcoming/in-progress videos - default image
                    <img 
                      src="/upcoming_default.png" 
                      alt={item.title} 
                      className="w-full h-full object-cover" 
                    />
                  )}
                </div>
                
                {item.completed && <button onClick={handleWatchVideo} className="neomorphic-btn w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-surface-accent to-blue-500 text-white hover:from-blue-500 hover:to-surface-accent hover:scale-105 transition-all duration-300">
                    <Youtube size={20} />
                    <span>Watch Video</span>
                  </button>}
                
                {!item.completed && <div className="neomorphic-sm-inset w-full flex items-center justify-center gap-2 py-3 text-muted-foreground">
                    <span>Coming soon</span>
                  </div>}
              </div>
              
              <div className="neomorphic-sm-inset p-4 mb-4 rounded-xl max-h-[220px] overflow-y-auto">
                <p className="text-foreground leading-relaxed">{item.content}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-2">Topics Covered:</h4>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => <span key={index} className={`neomorphic-tag text-xs px-3 py-1 flex items-center gap-1 hover:scale-105 transition-transform ${index % 3 === 0 ? 'bg-[hsla(var(--checkpoint-completed),0.05)]' : index % 3 === 1 ? 'bg-[hsla(var(--checkpoint-current),0.05)]' : 'bg-[hsla(var(--checkpoint-upcoming),0.05)]'}`}>
                      <Tag size={12} className={index % 3 === 0 ? 'checkpoint-completed' : index % 3 === 1 ? 'checkpoint-current' : 'checkpoint-upcoming'} />
                      {tag}
                    </span>)}
                </div>
              </div>
            </div>}
          
          {/* Technical Tab */}
          {activeTab === 'technical' && <div className="animate-fade-in">
              <div className="neomorphic-sm p-4 mb-4 rounded-xl bg-[hsla(var(--checkpoint-completed),0.05)]">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle size={18} className="checkpoint-completed" />
                  Requirements
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm pl-2">
                  {item.requirements?.map((req, index) => <li key={index} className="hover:translate-x-1 transition-transform">{req}</li>) || <li>No specific requirements for this module.</li>}
                </ul>
              </div>
              
              <div className="neomorphic-sm-inset p-4 mb-4 rounded-xl bg-gradient-to-br from-transparent to-[hsla(var(--surface-accent),0.05)]">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <BookOpen size={18} className="text-surface-accent" />
                  Technical Details
                </h3>
                <p className="text-foreground leading-relaxed">{item.technicalDetails || "Technical details will be provided in the video."}</p>
              </div>
              
              <div className="neomorphic-sm p-4 rounded-xl bg-[hsla(var(--checkpoint-current),0.05)]">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Code size={18} className="checkpoint-current" />
                  Key Concepts
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.keyConcepts?.map((concept, index) => <span key={index} className="neomorphic-tag text-xs px-3 py-1 hover:scale-105 hover:shadow-glow-soft transition-all duration-300">
                      {concept}
                    </span>) || <span className="text-muted-foreground">Key concepts will be covered in the video.</span>}
                </div>
              </div>
            </div>}
          
          {/* Source Code Tab */}
          {activeTab === 'source' && <div className="animate-fade-in">
              <div className="neomorphic-sm p-6 mb-4 rounded-xl bg-gradient-to-br from-transparent to-[hsla(var(--surface-highlight),0.1)]">
                <div className="flex items-start gap-3 mb-5">
                  {item.completed ? <UnlockIcon size={24} className="checkpoint-completed mt-1 flex-shrink-0 animate-pulse-slow" /> : <LockIcon size={24} className="checkpoint-upcoming mt-1 flex-shrink-0" />}
                  
                  <div>
                    <h3 className="font-bold text-lg mb-1">
                      {item.completed ? "Source Code Available" : "Source Code Locked"}
                    </h3>
                    <p className="text-sm">
                      It's highly recommended to watch the full video tutorial before accessing the source code. 
                      This ensures you'll understand the implementation details and context.
                    </p>
                  </div>
                </div>
                
                <p className="text-sm mb-6 bg-[hsla(var(--surface-highlight),0.1)] p-3 rounded-lg">
                  {item.completed ? "The source code is completely free to download and use for your own projects. Please attribute the author if you use it in your projects." : "Source code will be available once the video is released. Check back soon!"}
                </p>
                
                <div className="space-y-4 mt-6">
                  <button onClick={handleWatchVideo} className="neomorphic-btn w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-surface-accent to-blue-500 text-white hover:from-blue-500 hover:to-surface-accent hover:scale-105 transition-all duration-300">
                    <Youtube size={16} className="sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">Watch Video {!item.completed && "(Coming Soon)"}</span>
                  </button>
                  
                  {item.completed ? <button onClick={handleDownloadCode} className="neomorphic-btn w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[hsl(var(--checkpoint-completed))] to-[hsla(var(--checkpoint-completed),0.8)] text-white hover:scale-105 transition-all duration-300">
                      <Download size={16} className="sm:w-5 sm:h-5" />
                      <span className="text-sm sm:text-base">Download Source Code</span>
                    </button> : <button className="neomorphic-sm-inset w-full flex items-center justify-center gap-2 py-3 text-muted-foreground cursor-not-allowed" onClick={() => toast({
                title: "Not Available",
                description: "Source code will be available after the video is released.",
                variant: "destructive"
              })}>
                      <LockIcon size={16} className="sm:w-5 sm:h-5" />
                      <span className="text-sm sm:text-base">Source code available after release</span>
                    </button>}
                </div>
              </div>
            </div>}
        </div>
      </div>
    </div>;
};

export default CardDetail;
