
import React, { useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Rocket, Construction } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const FloatingButtons = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);
  
  const handleProductPageClick = () => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 5000);
  };
  
  const handleClaudeClick = () => {
    window.open('https://sree.shop', '_blank');
    toast({
      title: "Opening Claude 3.7",
      description: "Redirecting to advanced AI services",
    });
  };

  return (
    <>
      <div className="fixed left-6 bottom-6 z-50 flex flex-col gap-4">
        <div className="animate-float-slow">
          <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger asChild>
              <Button 
                onClick={handleClaudeClick}
                className="premium-button bg-gradient-to-br from-indigo-500 to-purple-600 text-white w-52 py-6 group"
              >
                <Rocket className="mr-2 group-hover:animate-pulse" />
                <span className="premium-btn-text">Free Claude 3.7</span>
                <ExternalLink size={14} className="ml-1 opacity-70" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent 
              className="neomorphic shadow-premium p-5 w-72 animate-appear border-none"
              side="right"
              align="start"
              sideOffset={20}
              alignOffset={-30}
            >
              <div className="space-y-2">
                <h4 className="font-bold text-lg bg-gradient-to-r from-[hsl(var(--surface-accent))] to-purple-500 bg-clip-text text-transparent">
                  Unlimited AI Access
                </h4>
                <p className="text-sm text-muted-foreground">
                  Enjoy unlimited access to Claude 3.7 Sonnet, GPT-4o, o3-mini, Deepseek-r1 and more advanced AI models - 
                  completely free and OpenAI compatible.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        
        <div className="animate-float-slow" style={{ animationDelay: "0.5s" }}>
          <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger asChild>
              <Button 
                onClick={handleProductPageClick}
                className="premium-button bg-gradient-to-br from-amber-500 to-pink-500 text-white w-52 py-6 group"
              >
                <Construction className="mr-2 group-hover:animate-spin-slow" />
                <span className="premium-btn-text">Visit Product Page</span>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent 
              className="neomorphic shadow-premium p-5 w-72 animate-appear border-none"
              side="right"
              align="start"
              sideOffset={20}
              alignOffset={-30}
            >
              <div className="space-y-2">
                <h4 className="font-bold text-lg bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent">
                  Coming Soon
                </h4>
                <p className="text-sm text-muted-foreground">
                  Our product page is currently under development. Stay tuned for an immersive showcase of our premium offerings.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
      
      {showComingSoon && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setShowComingSoon(false)}
        >
          <div 
            className="neomorphic shadow-premium max-w-md w-full p-6 relative overflow-hidden animate-appear"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[hsla(var(--surface-accent),0.15)] to-transparent z-0"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent">
                Coming Soon
              </h3>
              
              <div className="mb-4 w-full h-1 bg-gradient-to-r from-amber-400 to-pink-500 rounded-full"></div>
              
              <p className="text-muted-foreground mb-4">
                We're crafting something extraordinary for you. Our product showcase is currently under development and will be launching soon.
              </p>
              
              <p className="text-surface-foreground mb-6">
                Your anticipation and support mean the world to us. We're working tirelessly to create an experience that exceeds your expectations. Stay with us on this journey!
              </p>
              
              <div className="device-animation mx-auto mb-6">
                <div className="device-screen"></div>
              </div>
              
              <Button 
                onClick={() => setShowComingSoon(false)}
                className="w-full neomorphic-btn shadow-premium py-3 hover:scale-105 transition-all duration-300"
              >
                I'll wait excitedly!
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingButtons;
