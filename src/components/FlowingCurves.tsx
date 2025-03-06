import React, { useEffect, useRef } from 'react';

interface Props {
  cardIds: number[];
}

export function FlowingCurves({ cardIds }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const updatePaths = () => {
      const svg = svgRef.current;
      if (!svg) return;

      // Get card positions
      const cards = cardIds.map(id => {
        const element = document.getElementById(`roadmap-card-${id}`);
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        const svgRect = svg.getBoundingClientRect();
        return {
          left: rect.left - svgRect.left,
          right: rect.right - svgRect.left,
          top: rect.top - svgRect.top,
          bottom: rect.bottom - svgRect.top,
          width: rect.width,
          height: rect.height,
          center: {
            x: rect.left - svgRect.left + rect.width / 2,
            y: rect.top - svgRect.top + rect.height / 2
          }
        };
      }).filter(Boolean);

      if (cards.length < 2) return;

      // Update SVG viewBox
      const minX = Math.min(...cards.map(card => card!.left));
      const maxX = Math.max(...cards.map(card => card!.right));
      const minY = Math.min(...cards.map(card => card!.top));
      const maxY = Math.max(...cards.map(card => card!.bottom));
      
      svg.setAttribute('viewBox', `${minX - 20} ${minY - 20} ${maxX - minX + 40} ${maxY - minY + 40}`);
      svg.style.width = `${maxX - minX + 40}px`;
      svg.style.height = `${maxY - minY + 40}px`;

      // Generate paths
      const paths = document.querySelectorAll('.flowing-path');
      paths.forEach(path => path.remove());

      // Calculate global curve tension based on layout
      const avgGap = cards.reduce((sum, card, i) => {
        if (i === 0) return 0;
        return sum + (card!.left - cards[i-1]!.right);
      }, 0) / (cards.length - 1);
      
      const tension = Math.min(0.5, Math.max(0.2, avgGap / 300));

      for (let i = 0; i < cards.length - 1; i++) {
        const start = cards[i]!;
        const end = cards[i + 1]!;
        
        // Enhanced control points for more elegant curves
        const dx = end.left - start.right;
        const dy = end.center.y - start.center.y;
        const cp1x = start.right + dx * tension;
        const cp2x = end.left - dx * tension;
        const cp1y = start.center.y + dy * 0.1;
        const cp2y = end.center.y - dy * 0.1;

        // Create path
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('class', 'flowing-path');
        path.setAttribute('d', `
          M ${start.right} ${start.center.y}
          C ${cp1x} ${cp1y},
            ${cp2x} ${cp2y},
            ${end.left} ${end.center.y}
        `);
        
        // Add gradient and animation
        path.setAttribute('stroke', 'url(#flowingGradient)');
        path.setAttribute('stroke-width', '3');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-dasharray', '20,20');
        path.style.animation = 'flowingDash 20s linear infinite';
        
        svg.appendChild(path);
      }
    };

    // Initial update
    updatePaths();

    // Update on resize
    window.addEventListener('resize', updatePaths);
    return () => window.removeEventListener('resize', updatePaths);
  }, [cardIds]);

  return (
    <svg
      ref={svgRef}
      className="fixed pointer-events-none z-0 overflow-visible w-full h-full inset-0"
    >
      <defs>
        <linearGradient id="flowingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'rgb(99, 102, 241)', stopOpacity: 0.3 }}>
            <animate
              attributeName="stop-opacity"
              values="0.4;0.7;0.4"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="50%" style={{ stopColor: 'rgb(168, 85, 247)', stopOpacity: 0.6 }}>
            <animate
              attributeName="stop-opacity"
              values="0.6;0.9;0.6"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" style={{ stopColor: 'rgb(236, 72, 153)', stopOpacity: 0.3 }}>
            <animate
              attributeName="stop-opacity"
              values="0.4;0.7;0.4"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
    </svg>
  );
}