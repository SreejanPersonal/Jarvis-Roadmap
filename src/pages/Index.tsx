
import React, { useState, useEffect, useRef, createRef } from 'react';
import NavButtons from '@/components/NavButtons';
import TimelineNode, { TimelineNodeData } from '@/components/TimelineNode';
import RoadmapCard from '@/components/RoadmapCard';
import CardDetail from '@/components/CardDetail';
import { roadmapData } from '@/lib/roadmap-data';
import { ExternalLink, X, Menu, ArrowLeft } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import MobileRoadmapView from '@/components/MobileRoadmapView';
import FloatingButtons from '@/components/FloatingButtons';

const Index = () => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [animateDetail, setAnimateDetail] = useState(false);
  const [showMobileMessage, setShowMobileMessage] = useState(false);
  const [showMobileDetail, setShowMobileDetail] = useState(false);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const detailContainerRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  
  const cardRefs = useRef(roadmapData.map(() => createRef<HTMLDivElement>()));
  
  useEffect(() => {
    const latestItem = roadmapData.find(item => item.isLatest);
    if (latestItem) {
      setSelectedItemId(latestItem.id);
      setAnimateDetail(true);
    } else if (roadmapData.length > 0) {
      setSelectedItemId(roadmapData[0].id);
      setAnimateDetail(true);
    }
    
    const checkMobile = () => {
      if (window.innerWidth < 768 && !localStorage.getItem('mobile-popup-shown')) {
        setShowMobileMessage(true);
        localStorage.setItem('mobile-popup-shown', 'true');
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    document.documentElement.classList.add('super-smooth-scroll');
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      document.documentElement.classList.remove('super-smooth-scroll');
    };
  }, []);
  
  useEffect(() => {
    const syncScroll = () => {
      if (timelineContainerRef.current && cardsContainerRef.current) {
        timelineContainerRef.current.scrollTop = cardsContainerRef.current.scrollTop;
      }
    };
    
    let rafId: number | null = null;
    let lastScrollTop = 0;
    
    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      document.documentElement.classList.add('scrolling');
      
      const currentScrollTop = cardsContainerRef.current?.scrollTop || 0;
      
      if (Math.abs(currentScrollTop - lastScrollTop) > 0.5) {
        lastScrollTop = currentScrollTop;
        
        rafId = requestAnimationFrame(() => {
          rafId = requestAnimationFrame(() => {
            syncScroll();
            rafId = null;
          });
        });
      }
    };
    
    const style = document.createElement('style');
    style.innerHTML = `
      .scrolling .timeline-container > * {
        transition: none !important;
      }
      .timeline-container > * {
        will-change: transform, top;
        transform: translateZ(0);
      }
      .timeline-container {
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: none;
        scroll-behavior: auto !important;
      }
      .main-scroll-section {
        scroll-behavior: auto !important;
      }
    `;
    document.head.appendChild(style);
    
    cardsContainerRef.current?.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    
    const observer = new MutationObserver(syncScroll);
    if (cardsContainerRef.current) {
      observer.observe(cardsContainerRef.current, { 
        attributes: true, 
        childList: true, 
        subtree: true 
      });
    }
    
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.head.removeChild(style);
      cardsContainerRef.current?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      window.removeEventListener('resize', syncScroll);
    };
  }, []);
  
  const selectedItem = selectedItemId 
    ? roadmapData.find(item => item.id === selectedItemId) 
    : null;
  
  const handleItemClick = (id: number) => {
    if (id === selectedItemId) return;
    
    setAnimateDetail(false);
    setTimeout(() => {
      setSelectedItemId(id);
      setAnimateDetail(true);
      
      // For mobile, show the detail view when an item is clicked
      if (window.innerWidth < 768) {
        setShowMobileDetail(true);
      }
    }, 300);
  };
  
  const handleYoutubeClick = () => {
    window.open('https://youtube.com/example', '_blank');
  };
  
  const dismissMobileMessage = () => {
    setShowMobileMessage(false);
  };
  
  const closeMobileDetail = () => {
    setShowMobileDetail(false);
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground pt-6 pb-16 px-4 md:px-8">
      {showMobileMessage && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm">
            <div className="neomorphic p-5 rounded-2xl relative overflow-hidden mobile-popup">
              <div className="absolute inset-0 bg-gradient-to-br from-[hsla(var(--surface-accent),0.15)] to-transparent z-0"></div>
              <div className="relative z-10">
                <button 
                  onClick={dismissMobileMessage}
                  className="absolute top-2 right-2 p-1 rounded-full bg-surface-foreground/10 hover:bg-surface-foreground/20 transition-all"
                >
                  <X size={18} />
                </button>
                
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-[hsl(var(--surface-accent))] to-blue-500 bg-clip-text text-transparent">
                    Mobile Experience
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    This website is optimized for desktop viewing. The mobile version has been simplified for better experience on smaller screens.
                  </p>
                </div>
                
                <div className="flex justify-center mb-3">
                  <div className="device-animation">
                    <div className="device-screen"></div>
                  </div>
                </div>
                
                <button
                  onClick={dismissMobileMessage}
                  className="w-full py-3 neomorphic-btn flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300 text-sm font-medium"
                >
                  Continue to Website
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[hsl(var(--surface-accent))] to-blue-500 bg-clip-text text-transparent">
              J.A.R.V.I.S. Series
            </h1>
            <p className="text-2xl font-semibold mb-1">FREE Development Roadmap</p>
            <p className="text-muted-foreground max-w-xl mb-4">
              Track the evolution of the Jarvis AI assistant through our development journey. 
              Each milestone represents a new capability demonstrated in our YouTube series.
            </p>
            
            <button
              onClick={handleYoutubeClick}
              className="premium-button flex items-center justify-center gap-2 bg-gradient-to-br from-red-600 to-red-800 text-white transition-all duration-300 py-3 px-6 text-sm font-medium shadow-xl hover:shadow-2xl transform hover:-translate-y-1 rounded-xl border border-white/10"
            >
              <span className="premium-btn-text">Subscribe to YouTube</span>
              <ExternalLink size={14} className="ml-1" />
            </button>
          </div>
          
          <NavButtons />
        </header>
        
        {/* Desktop View */}
        <div className="hidden md:block">
          <main ref={mainContentRef} className="flex flex-col md:flex-row gap-10 mt-8">
            <div className="w-full md:w-[20%] relative">
              <div 
                ref={timelineContainerRef}
                className="timeline-container sticky top-10 h-[80vh] overflow-y-auto scrollbar-hide justify-center"
              >
                <div className="relative h-full flex justify-center"> 
                  {roadmapData.map((item, index) => (
                    <TimelineNode
                      key={item.id}
                      node={{
                        id: item.id,
                        title: item.title,
                        datePublished: item.datePublished,
                        completed: item.completed,
                        isLatest: item.isLatest
                      }}
                      isSelected={selectedItemId === item.id}
                      onClick={() => handleItemClick(item.id)}
                      index={index}
                      cardRef={cardRefs.current[index]}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div 
              ref={cardsContainerRef}
              className="w-full md:w-[40%] py-4 overflow-y-auto scrollbar-hide main-scroll-section"
            >
              <div className="space-y-6">
                {roadmapData.map((item, index) => (
                  <RoadmapCard
                    key={item.id}
                    ref={cardRefs.current[index]}
                    item={item}
                    isSelected={selectedItemId === item.id}
                    onClick={() => handleItemClick(item.id)}
                  />
                ))}
              </div>
            </div>
            
            <div className="w-full md:w-[40%] relative scroll-container py-4 my-10">
              <div className="sticky top-[80px]">
                <CardDetail 
                  item={selectedItem} 
                  isVisible={animateDetail} 
                />
              </div>
            </div>
          </main>
        </div>
        
        {/* Mobile View */}
        <div className="md:hidden">
          {!showMobileDetail ? (
            <MobileRoadmapView 
              items={roadmapData} 
              onItemClick={handleItemClick} 
              selectedItemId={selectedItemId}
            />
          ) : (
            <div className="mobile-detail-view">
              <button 
                onClick={closeMobileDetail}
                className="neomorphic-btn mb-4 py-2 px-4 flex items-center gap-2"
              >
                <ArrowLeft size={18} />
                <span>Back to list</span>
              </button>
              
              <CardDetail 
                item={selectedItem} 
                isVisible={true} 
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Add the FloatingButtons component */}
      <FloatingButtons />
    </div>
  );
};

const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export default Index;
