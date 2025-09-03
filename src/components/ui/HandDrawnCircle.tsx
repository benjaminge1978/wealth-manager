import { useEffect, useRef } from 'react';
import rough from 'roughjs';

interface HandDrawnCircleProps {
  size: number;
  color: string;
  opacity?: number;
  className?: string;
}

export function HandDrawnCircle({ size, color, opacity = 0.2, className = '' }: HandDrawnCircleProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const rc = rough.svg(svg);

    // Clear previous drawings
    svg.innerHTML = '';

    const strokeWidth = Math.max(1, size / 32);
    const roughness = 0.8;
    const bowing = 0.5;

    // Create a rough circle with fill
    svg.appendChild(rc.circle(size / 2, size / 2, size * 0.85, {
      stroke: color,
      strokeWidth,
      roughness,
      bowing,
      fill: color,
      fillStyle: 'solid',
      fillOpacity: opacity
    }));
  }, [size, color, opacity]);

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      className={className}
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}
    />
  );
}