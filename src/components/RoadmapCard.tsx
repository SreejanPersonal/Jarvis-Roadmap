import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown, ChevronUp, Clock, CheckCircle, FileCode2,
  Play, Code2, BookOpen, Layers, Cpu, Rocket, AlertTriangle
} from 'lucide-react';
import { Checkpoint, Status } from '../types';
import { FlowingCurves } from './FlowingCurves';

const statusIcons = {
  implemented: CheckCircle,
  'coming-soon': Rocket,  // Rocket for features about to launch
  planned: Clock,         // Clock represents future planned work
};

type Tab = 'overview' | 'technical' | 'code' | 'requirements';

interface Props {
  checkpoint: Checkpoint;
  index: number;
  isExpanded: boolean;
  onToggleExpand: (id: number) => void;
}

export function RoadmapCard({ checkpoint, index, isExpanded, onToggleExpand }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const Icon = statusIcons[checkpoint.status];
  const isEven = index % 2 === 0;
  const contentRef = useRef<HTMLDivElement>(null);
  const statusColors = {
    implemented: 'from-emerald-500 to-teal-500',
    'coming-soon': 'from-amber-500 to-orange-500',
    planned: 'from-indigo-500 to-purple-500'
  };

  // Add mouse move effect
  useEffect(() => {
    const cards = document.querySelectorAll('.implemented-card, .planned-card, .coming-soon-card');
    
    const handleMouseMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / card.offsetWidth) * 100;
      const y = ((e.clientY - rect.top) / card.offsetHeight) * 100;
      
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    };
    
    cards.forEach(card => {
      card.addEventListener('mousemove', handleMouseMove);
    });
    
    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', handleMouseMove);
      });
    };
  }, []);

  useEffect(() => {
    if (isExpanded) {
      // Check if technical or requirements tabs need scrollbar
      const checkOverflow = () => {
        const technicalTab = document.querySelector('[data-tab="technical"]');
        const requirementsTab = document.querySelector('[data-tab="requirements"]');
        
        if (technicalTab) {
          technicalTab.classList.toggle('overflow', 
            technicalTab.scrollHeight > technicalTab.clientHeight);
        }
        
        if (requirementsTab) {
          requirementsTab.classList.toggle('overflow',
            requirementsTab.scrollHeight > requirementsTab.clientHeight);
        }
      };
      
      // Check after animation completes
      setTimeout(checkOverflow, 300);
      
      // Check on window resize
      window.addEventListener('resize', checkOverflow);
      return () => window.removeEventListener('resize', checkOverflow);
    }
  }, [isExpanded]);

  return (
    <div
      className={`group relative w-full transition-all duration-300
                  ${isExpanded ? 'my-16' : 'my-6'}
                  max-w-[90%] mx-auto sm:max-w-md md:max-w-[550px] relative
                  md:mx-0 ${isEven ? 'md:ml-0' : 'md:ml-auto'}
                  transform-gpu
                  ${checkpoint.status === 'implemented' ? 'implemented-card' : 
                    checkpoint.status === 'coming-soon' ? 'coming-soon-card' : 
                    'planned-card'}`}
      id={`roadmap-card-${checkpoint.id}`}
    >
      {checkpoint.status === 'implemented' && !isExpanded && (
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 
                     blur-lg rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      {checkpoint.status === 'coming-soon' && !isExpanded && (
        <div className="absolute -inset-1 bg-gradient-to-r from-[#7B68EE20] via-[#9370DB20] to-[#7B68EE20] 
                     blur-lg rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      {checkpoint.status === 'planned' && !isExpanded && (
        <div className="absolute -inset-1 bg-gradient-to-r from-[#FF8C4220] via-[#FFA07A20] to-[#FF8C4220] 
                     blur-lg rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      <div
        className={`relative overflow-hidden rounded-2xl transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    bg-gradient-to-br from-light-bg-primary to-light-bg-secondary hover:to-light-accent-secondary/10
                    dark:from-dark-bg-primary/95 dark:via-dark-bg-secondary dark:to-dark-bg-primary/95
                    dark:hover:via-dark-accent-secondary/10
                    border border-light-border dark:border-dark-border
                    backdrop-blur-sm
                    transform-gpu will-change-transform origin-center
                    ${isExpanded 
                      ? 'p-6 shadow-2xl scale-105 z-50 min-h-[400px] rotate-0 translate-y-0'
                      : 'p-5 shadow-lg hover:scale-102 hover:-translate-y-2 hover:rotate-2 hover:shadow-xl'}`}
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          transition: isExpanded 
            ? 'all 1200ms cubic-bezier(0.23, 1, 0.32, 1)' 
            : 'all 800ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          willChange: 'transform, box-shadow'
        }}
      >
        {isExpanded && (
          <div className="absolute inset-0 dark:bg-gradient-to-br 
                         dark:from-dark-bg-primary/10 dark:via-dark-bg-secondary/20 dark:to-dark-bg-primary/10 
                         dark:opacity-90 rounded-2xl transition-opacity duration-[1200ms]" />
        )}
        <div className="absolute -top-1 -right-1 w-24 h-24">
          <div className={`absolute inset-0 bg-gradient-to-br ${statusColors[checkpoint.status]} 
                        opacity-10 dark:opacity-30 rounded-full blur-2xl
                        transition-opacity duration-500`} />
          <div className={`absolute top-4 right-4 w-8 h-8 rounded-full
                        bg-gradient-to-br ${statusColors[checkpoint.status]}
                        flex items-center justify-center
                        shadow-lg transform hover:scale-110 
                        transition-all duration-300 hover:shadow-xl
                        ${!isExpanded ? 'animate-float' : ''}`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 md:gap-4">
            <span className="relative text-xl font-bold bg-clip-text text-transparent 
                           bg-gradient-to-r ${statusColors[checkpoint.status]}
                           after:content-[''] after:absolute after:-inset-2
                           after:border-2 after:border-current after:border-opacity-20 after:rounded-lg
                           after:transform after:rotate-3">
              #{checkpoint.id}
            </span>
            <div>
              <h3 className="text-lg md:text-xl font-semibold dark:text-dark-text-primary mb-2">
                {checkpoint.title}
              </h3>
              {!isExpanded && (
                <div className="space-y-2">
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary line-clamp-2">
                    {checkpoint.description.split('.')[0]}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 rounded-full text-sm font-medium
                                   relative group/tag cursor-default
                                   before:absolute before:inset-0 before:rounded-full
                                   ring-1 ring-current ring-opacity-20
                                   before:bg-gradient-to-r before:from-current before:to-current
                                   before:opacity-5 dark:before:opacity-10
                                   before:opacity-100 hover:before:opacity-100 before:transition-opacity">
                      <span className={`relative z-10 bg-gradient-to-r ${statusColors[checkpoint.status]}
                                     bg-clip-text text-transparent font-semibold`}>
                      {checkpoint.difficulty.charAt(0).toUpperCase() + checkpoint.difficulty.slice(1)}
                      </span>
                    </span>
                    {checkpoint.requirements.slice(0, 2).map((req) => (
                      <span key={req.language}
                            className="px-3 py-1 rounded-full text-sm font-medium
                                     relative group/tag cursor-default
                                     before:absolute before:inset-0 before:rounded-full
                                     ring-1 ring-indigo-500/20 dark:ring-indigo-400/30
                                     before:bg-gradient-to-r before:from-indigo-500/5 before:to-purple-500/5
                                     dark:before:from-indigo-400/20 dark:before:to-purple-400/20
                                     before:opacity-100 hover:before:opacity-100 before:transition-opacity">
                        <span className="relative z-10 bg-gradient-to-r from-indigo-500 to-purple-500
                                       dark:from-indigo-400 dark:to-purple-400
                                       bg-clip-text text-transparent font-semibold">
                        {req.language.split(' ').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-6 relative animate-cardExpand" id={`card-${checkpoint.id}`}>
            <nav className="flex items-center justify-center gap-2 md:gap-4 mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 
                            dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 
                            rounded-full blur-xl" />
              {renderCircularTab('overview', BookOpen, 'Overview')}
              {renderCircularTab('technical', Cpu, 'Technical')}
              {renderCircularTab('code', Code2, 'Code')}
              {renderCircularTab('requirements', Layers, 'Requirements')}
            </nav>
            
            <div className="relative transition-all duration-300" data-content-container ref={contentRef}>
              <div className="transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.32,1)]">
                {activeTab === 'overview' && renderOverviewTab()}
                {activeTab === 'technical' && renderTechnicalTab()}
                {activeTab === 'code' && renderCodeTab()}
                {activeTab === 'requirements' && renderRequirementsTab()}
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => onToggleExpand(checkpoint.id)}
          className={`absolute p-3 rounded-full transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.32,1)] group/expand
                     ${isExpanded 
                       ? 'bottom-[calc(100%-3rem)] right-4 bg-white/90 dark:bg-black/90 backdrop-blur-sm shadow-lg'
                       : 'bottom-4 right-4 bg-light-bg-tertiary dark:bg-dark-bg-tertiary'
                     }
                     hover:bg-light-accent-primary hover:text-white
                      dark:hover:bg-dark-accent-primary dark:hover:text-white
                      transform-gpu`}
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 transition-transform group-hover/expand:scale-110" />
          ) : (
            <ChevronDown className="w-5 h-5 transition-transform group-hover/expand:scale-110
                                   animate-bounce-subtle" />
          )}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover/expand:opacity-20
                         bg-gradient-to-r from-indigo-500 to-purple-500 blur-md transition-opacity" />
        </button>
      </div>
    </div>
  );

  function renderCircularTab(tabId: Tab, TabIcon: any, label: string) {
    const isActive = activeTab === tabId;
    return (
      <button
        onClick={() => setActiveTab(tabId)} 
        className={`group relative flex flex-col items-center gap-2 transition-all duration-300
                   ${isActive ? 'scale-110' : 'hover:scale-105'}`}
      >
        <div className={`relative w-10 h-10 rounded-full flex items-center justify-center
                        transition-all duration-300 transform
                        ${isActive 
                          ? 'bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/25'
                          : 'bg-light-bg-tertiary dark:bg-dark-bg-tertiary/60 hover:shadow-md'}`}>
          <div className={`absolute inset-0 rounded-full transition-opacity duration-300
                          bg-gradient-to-br from-white/10 to-transparent
                          ${isActive ? 'opacity-20' : 'opacity-0 group-hover:opacity-10'}`} />
          <TabIcon className={`w-5 h-5 transition-all duration-300
                             ${isActive 
                               ? 'text-white transform scale-110' 
                               : 'text-light-text-secondary dark:text-dark-text-secondary'}`} />
          <div className={`absolute -inset-1 rounded-full bg-gradient-to-r 
                          from-indigo-500 via-purple-500 to-pink-500 opacity-0 blur-xl
                          transition-all duration-500 group-hover:opacity-20
                          ${isActive ? 'animate-pulse' : ''}`} />
        </div>
        <span className={`text-xs md:text-sm font-medium transition-all duration-300
                         ${isActive 
                           ? 'text-light-accent-primary dark:text-dark-accent-primary'
                           : 'text-light-text-secondary dark:text-dark-text-secondary'}`}>
          {label}
        </span>
      </button>
    );
  }

  function renderOverviewTab() {
    if (checkpoint.status !== 'implemented') {
      return (
        <div className="space-y-8 animate-tabFadeIn" data-tab="overview">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 
                         dark:from-indigo-500/10 dark:to-purple-500/10 rounded-xl" />
            <div className="relative p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10
                             dark:from-indigo-500/20 dark:to-purple-500/20
                             flex items-center justify-center">
                  {checkpoint.status === 'coming-soon' ? (
                    <Rocket className="w-6 h-6 text-indigo-500 animate-bounce-subtle" />
                  ) : (
                    <Clock className="w-6 h-6 text-indigo-500 animate-spin-slow" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-indigo-500 to-purple-500 
                              bg-clip-text text-transparent">
                    {checkpoint.status === 'coming-soon' ? 'Coming Soon!' : 'In Development'}
                  </h3>
                  <p className="text-base text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                    {checkpoint.description}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="h-2 bg-light-bg-tertiary dark:bg-dark-bg-tertiary rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full
                               animate-progress-infinite transition-all duration-300"
                               style={{
                                 width: checkpoint.status === 'coming-soon' ? '80%' : '40%'
                               }} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-light-bg-tertiary/50 dark:bg-dark-bg-tertiary/50
                               border border-light-border dark:border-dark-border group
                               hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary
                               transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      <span className="font-medium">Development Status</span>
                    </div>
                    <p className="mt-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      {checkpoint.status === 'coming-soon'
                        ? 'Final testing in progress'
                        : 'Initial planning phase'}
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-light-bg-tertiary/50 dark:bg-dark-bg-tertiary/50
                               border border-light-border dark:border-dark-border group
                               hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary
                               transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-indigo-500" />
                      <span className="font-medium">Estimated Release</span>
                    </div>
                    <p className="mt-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      {checkpoint.status === 'coming-soon'
                        ? 'Coming this month'
                        : 'To be announced'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-8 animate-tabFadeIn overflow-visible" data-tab="overview">
        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-light-bg-tertiary/50 to-light-bg-secondary/50
                      dark:from-dark-bg-tertiary/30 dark:to-dark-bg-secondary/30
                      border border-light-border dark:border-dark-border/50
                      group hover:shadow-lg transition-all duration-500
                      hover:transform hover:scale-[1.02] hover:-translate-y-1
                      hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5
                        dark:from-emerald-500/10 dark:to-teal-500/10
                        rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20
                           flex items-center justify-center transform
                           group-hover:rotate-12 group-hover:scale-110
                           transition-all duration-500 ease-out">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-emerald-500 to-teal-500
                          bg-clip-text text-transparent">
                Feature Overview
              </h3>
            </div>
            <p className="text-base md:text-lg leading-relaxed font-medium
                       text-light-text-secondary dark:text-dark-text-secondary">
              {checkpoint.description.split('. ').join('.\n\n')}
            </p>
          </div>
        </div>
        
        {checkpoint.videoUrl && (
          <div className="relative aspect-video rounded-xl overflow-hidden
                        group/video hover:shadow-xl transition-all duration-500
                        transform hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent
                          opacity-0 group-hover/video:opacity-100 transition-opacity">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20
                           opacity-0 group-hover/video:opacity-30 transition-opacity" />
            </div>
            <img
              src={`https://img.youtube.com/vi/${getYouTubeId(checkpoint.videoUrl)}/maxresdefault.jpg`}
              alt={`${checkpoint.title} tutorial thumbnail`}
              className="w-full h-full object-cover transition-transform duration-700
                       group-hover/video:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20
                           backdrop-blur-sm
                           flex items-center justify-center
                           transform group-hover/video:scale-110 transition-transform
                           border border-white/20 group-hover/video:border-emerald-500/30">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/30 to-teal-500/30
                             opacity-0 group-hover/video:opacity-100 transition-opacity blur-xl" />
                <Play className="w-10 h-10 text-white fill-white" />
              </div>
            </div>
            <div className="absolute bottom-4 right-4 px-4 py-2
                          bg-black/40 backdrop-blur-sm rounded-full
                          text-white text-sm font-medium
                          flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {checkpoint.videoDuration}
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderTechnicalTab() {
    if (!checkpoint.sections?.length) {
      return (
        <div className="animate-tabFadeIn px-1" data-tab="technical">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5
                         dark:from-indigo-500/10 dark:to-purple-500/10 p-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10
                           dark:from-indigo-500/20 dark:to-purple-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            
            <div className="relative flex items-start gap-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20
                             flex items-center justify-center flex-shrink-0">
                <Cpu className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
              </div>
              
              <div className="space-y-4">
                <h4 className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  Technical Specifications
                </h4>
                <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                  {checkpoint.status === 'coming-soon'
                    ? "We're finalizing the technical details for this feature. Stay tuned for the comprehensive implementation guide!"
                    : "Technical specifications will be revealed as we approach the development phase of this feature."}
                </p>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    {checkpoint.status === 'coming-soon' ? 'Coming soon' : 'In planning'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6 animate-tabFadeIn px-1 max-h-[70vh] overflow-y-auto custom-scrollbar-dynamic" data-tab="technical">
        {checkpoint.sections?.map((section, idx) => (
          <div key={idx}
               className="relative group bg-gradient-to-br from-light-bg-tertiary/50 to-light-bg-secondary/50
                        dark:from-dark-bg-tertiary/30 dark:to-dark-bg-secondary/30
                        backdrop-blur-sm rounded-xl p-6 space-y-4
                        border border-light-border dark:border-dark-border/50 hover:border-emerald-500/30
                        dark:hover:border-emerald-500/30 hover:shadow-lg
                        transition-all duration-500 hover:transform
                        hover:scale-[1.02] hover:-translate-y-1
                        hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/20
                        perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5
                          dark:from-emerald-500/10 dark:to-teal-500/10
                          rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <h4 className="text-xl font-semibold
                       text-light-text-primary dark:text-dark-text-primary
                       flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20
                           flex items-center justify-center transform
                           group-hover:rotate-12 group-hover:scale-110
                           transition-all duration-500 ease-out">
                <Cpu className="w-5 h-5 text-emerald-500" />
              </div>
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                {section.title}
              </span>
            </h4>
            <p className="relative text-light-text-secondary dark:text-dark-text-secondary
                       leading-relaxed pl-12">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    );
  }

  function renderCodeTab() {
    if (checkpoint.status !== 'implemented') {
      return (
        <div className="animate-tabFadeIn px-4 py-6" data-tab="code">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10
                         dark:from-yellow-500/20 dark:to-orange-500/20 flex-shrink-0
                         flex items-center justify-center">
              <Code2 className="w-6 h-6 text-yellow-600 dark:text-yellow-500" />
            </div>
            
            <div className="flex-1 space-y-4">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 
                          bg-clip-text text-transparent">
                {checkpoint.status === 'coming-soon' ? 'Coming Soon!' : 'In Development'}
              </h3>
              
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                {checkpoint.status === 'coming-soon'
                  ? "We're putting the finishing touches on this feature."
                  : "This feature is in our development pipeline."}
              </p>
              
              <div className="flex flex-col xs:flex-row gap-3">
                <button onClick={() => window.location.href = '#implemented'}
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                                 bg-light-bg-tertiary/50 dark:bg-dark-bg-tertiary/50
                                 border border-light-border dark:border-dark-border
                                 hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary
                                 transition-all duration-300 text-sm">
                  <Play className="w-4 h-4 text-indigo-500" />
                  <span>Browse Tutorials</span>
                </button>
                
                <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                                 bg-light-bg-tertiary/50 dark:bg-dark-bg-tertiary/50
                                 border border-light-border dark:border-dark-border
                                 hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary
                                 transition-all duration-300 text-sm">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <span>Get Notified</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="animate-tabFadeIn text-center px-1 max-h-[70vh] overflow-y-auto custom-scrollbar" data-tab="code">
        <div className="max-w-lg mx-auto space-y-8">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 
                        bg-clip-text text-transparent">
            Master the Implementation
          </h3>
          <div className="space-y-6">
            <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
              For the best learning experience, we <span className="font-semibold text-light-text-primary dark:text-dark-text-primary">strongly recommend</span> watching 
              the complete tutorial. You'll gain:
            </p>
            <ul className="space-y-3 text-left">
              <li className="flex items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary">
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                Step-by-step implementation guidance
              </li>
              <li className="flex items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                Critical technical concepts explained
              </li>
              <li className="flex items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary">
                <div className="w-2 h-2 rounded-full bg-pink-500" />
                Common pitfalls and their solutions
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center gap-4">
            <button onClick={() => window.open(checkpoint.videoUrl, '_blank')}
                    className="w-full max-w-md px-6 py-4 rounded-xl font-semibold text-lg
                             bg-gradient-to-r from-indigo-500 to-purple-500
                             text-white transform hover:scale-105
                             transition-all duration-300 relative group/button
                             shadow-lg hover:shadow-xl">
              <div className="absolute inset-0 rounded-xl bg-white/20
                           opacity-0 group-hover/button:opacity-100
                           transition-opacity" />
              Watch Complete Tutorial
            </button>
            
            <div className="relative">
              <div className="absolute -inset-4 opacity-10 bg-yellow-500/20 blur-lg rounded-lg" />
              <div className="relative p-4 rounded-lg border border-yellow-500/20
                            bg-yellow-500/5 backdrop-blur-sm">
                <div className="flex items-start gap-3 text-sm text-yellow-600 dark:text-yellow-400">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-left">
                    While source code is available after ads, it's not recommended to skip the tutorial.
                    Many users report difficulties without proper understanding.
                  </p>
                </div>
              </div>
            </div>
            
            <button onClick={() => window.open(`${checkpoint.videoUrl}/source`, '_blank')}
                    className="text-sm text-light-text-secondary dark:text-dark-text-secondary
                             hover:text-light-text-primary dark:hover:text-dark-text-primary
                             transition-colors underline underline-offset-4">
              Get source code (requires watching ads)
            </button>
          </div>
        </div>
      </div>
    );
  }

  function renderRequirementsTab() {
    return (
      <div className="animate-tabFadeIn px-1 py-4 max-h-[70vh] overflow-y-auto custom-scrollbar" data-tab="requirements">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="md:col-span-2 mb-2">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-emerald-500 to-teal-500
                        bg-clip-text text-transparent flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20
                           flex items-center justify-center">
                <Layers className="w-5 h-5 text-emerald-500" />
              </div>
              Technical Requirements
            </h3>
          </div>
          {checkpoint.requirements.map((req) => (
            <div
              key={req.language}
              className="relative group bg-gradient-to-br from-light-bg-tertiary/50 to-light-bg-secondary/50
                       dark:from-dark-bg-tertiary/30 dark:to-dark-bg-secondary/30
                       backdrop-blur-sm rounded-xl p-6
                       border border-light-border dark:border-dark-border/50 hover:border-emerald-500/30
                       dark:hover:border-emerald-500/30 hover:shadow-lg
                       transition-all duration-500 hover:transform
                       hover:scale-[1.02] hover:-translate-y-1
                       hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/20
                       perspective-1000"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5
                           dark:from-emerald-500/10 dark:to-teal-500/10 rounded-xl opacity-0
                           group-hover:opacity-100 transition-opacity" />
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20
                             flex items-center justify-center flex-shrink-0 transform
                             group-hover:rotate-12 group-hover:scale-110
                             transition-all duration-500 ease-out">
                  <FileCode2 className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="relative">
                  <h5 className="font-semibold text-lg mb-1 bg-gradient-to-r from-emerald-500 to-teal-500
                             bg-clip-text text-transparent">{req.language}</h5>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    Required proficiency level
                  </p>
                </div>
              </div>
              <div className="space-y-3 relative">
                <div className="h-2.5 bg-light-bg-tertiary dark:bg-dark-bg-tertiary
                             rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500
                             transition-all duration-1000 ease-out absolute
                             rounded-full group-hover:opacity-80"
                    style={{ width: `${(req.level / 3) * 100}%` }}>
                    <div className="absolute inset-0 bg-white/20 rounded-full" />
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-emerald-500">
                    Level {req.level}
                  </span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    Max Level 3
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  function getStatusColor(status: Status): string {
    switch (status) {
      case 'implemented':
        return 'text-[#22c55e]';
      case 'coming-soon':
        return 'text-[#f59e0b]';
      case 'planned':
        return 'text-[#6366f1]';
    }
  }
  
  function getYouTubeId(url: string): string {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? match[1] : '';
  }
}