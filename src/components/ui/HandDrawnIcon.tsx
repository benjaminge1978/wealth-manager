import { useEffect, useRef } from 'react';
import rough from 'roughjs';

interface HandDrawnIconProps {
  type: 'gift' | 'clock' | 'shield' | 'arrow-right' | 'menu' | 'x' | 'search' | 
        'phone' | 'mail' | 'map-pin' | 'calculator' | 'home' | 'trending-up' | 
        'credit-card' | 'award' | 'target' | 'check-circle' | 'message-square' | 
        'star' | 'bookmark' | 'calendar' | 'users' | 'pie-chart' | 'file-text' |
        'graduation-cap' | 'heart' | 'briefcase' | 'help-circle' | 'chevron-down' |
        'plus' | 'minus' | 'quote' | 'x-circle' | 'lightbulb' | 'repeat' | 'handshake' |
        'building' | 'globe' | 'alert-triangle';
  size?: number;
  className?: string;
  color?: string;
}

export function HandDrawnIcon({ type, size = 32, className = '', color = 'currentColor' }: HandDrawnIconProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const rc = rough.svg(svg);

    // Clear previous drawings
    svg.innerHTML = '';

    const strokeWidth = Math.max(1.5, size / 20);
    const roughness = 1.2;
    const bowing = 1;

    switch (type) {
      case 'gift':
        // Gift box with bow
        const boxSize = size * 0.6;
        const boxX = (size - boxSize) / 2;
        const boxY = size * 0.3;
        
        // Box base
        svg.appendChild(rc.rectangle(boxX, boxY, boxSize, boxSize * 0.7, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // Box lid
        svg.appendChild(rc.rectangle(boxX - 2, boxY - 4, boxSize + 4, boxSize * 0.2, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // Ribbon vertical
        svg.appendChild(rc.line(size / 2, boxY - 4, size / 2, boxY + boxSize * 0.7, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        
        // Ribbon horizontal
        svg.appendChild(rc.line(boxX - 2, boxY + boxSize * 0.35, boxX + boxSize + 2, boxY + boxSize * 0.35, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        
        // Bow
        svg.appendChild(rc.ellipse(size / 2 - 4, boxY - 8, 8, 6, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        svg.appendChild(rc.ellipse(size / 2 + 4, boxY - 8, 8, 6, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        break;

      case 'clock':
        const radius = size * 0.4;
        const centerX = size / 2;
        const centerY = size / 2;
        
        // Clock face
        svg.appendChild(rc.circle(centerX, centerY, radius * 2, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // Hour hand (pointing to 3)
        svg.appendChild(rc.line(centerX, centerY, centerX + radius * 0.5, centerY, {
          stroke: color,
          strokeWidth: strokeWidth * 1.5,
          roughness,
          bowing
        }));
        
        // Minute hand (pointing to 12)
        svg.appendChild(rc.line(centerX, centerY, centerX, centerY - radius * 0.7, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        
        // Center dot
        svg.appendChild(rc.circle(centerX, centerY, 3, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: color,
          fillStyle: 'solid'
        }));
        
        // 12 o'clock mark
        svg.appendChild(rc.line(centerX, centerY - radius, centerX, centerY - radius + 4, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        
        // 3 o'clock mark
        svg.appendChild(rc.line(centerX + radius, centerY, centerX + radius - 4, centerY, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        break;

      case 'shield':
        const shieldWidth = size * 0.6;
        const shieldHeight = size * 0.8;
        const shieldX = (size - shieldWidth) / 2;
        const shieldY = size * 0.1;
        
        // Shield outline (rounded top, pointed bottom)
        const shieldPath = `M ${shieldX} ${shieldY + shieldHeight * 0.3} 
                           Q ${shieldX} ${shieldY} ${shieldX + shieldWidth/2} ${shieldY}
                           Q ${shieldX + shieldWidth} ${shieldY} ${shieldX + shieldWidth} ${shieldY + shieldHeight * 0.3}
                           L ${shieldX + shieldWidth} ${shieldY + shieldHeight * 0.7}
                           L ${shieldX + shieldWidth/2} ${shieldY + shieldHeight}
                           L ${shieldX} ${shieldY + shieldHeight * 0.7}
                           Z`;
                           
        svg.appendChild(rc.path(shieldPath, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // Checkmark inside shield
        svg.appendChild(rc.path(`M ${shieldX + shieldWidth * 0.25} ${shieldY + shieldHeight * 0.4} 
                                L ${shieldX + shieldWidth * 0.45} ${shieldY + shieldHeight * 0.6}
                                L ${shieldX + shieldWidth * 0.75} ${shieldY + shieldHeight * 0.3}`, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        break;

      case 'arrow-right':
        // Arrow pointing right
        svg.appendChild(rc.line(size * 0.2, size / 2, size * 0.8, size / 2, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        
        // Arrow head
        svg.appendChild(rc.line(size * 0.8, size / 2, size * 0.65, size * 0.35, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        svg.appendChild(rc.line(size * 0.8, size / 2, size * 0.65, size * 0.65, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        break;

      case 'menu':
        // Three horizontal lines
        const lineWidth = size * 0.6;
        const startX = (size - lineWidth) / 2;
        
        svg.appendChild(rc.line(startX, size * 0.3, startX + lineWidth, size * 0.3, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        svg.appendChild(rc.line(startX, size * 0.5, startX + lineWidth, size * 0.5, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        svg.appendChild(rc.line(startX, size * 0.7, startX + lineWidth, size * 0.7, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        break;

      case 'x':
        // X cross
        const xMargin = size * 0.25;
        svg.appendChild(rc.line(xMargin, xMargin, size - xMargin, size - xMargin, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        svg.appendChild(rc.line(size - xMargin, xMargin, xMargin, size - xMargin, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        break;

      case 'search':
        // Magnifying glass
        const glassRadius = size * 0.25;
        const glassCenterX = size * 0.4;
        const glassCenterY = size * 0.4;
        
        svg.appendChild(rc.circle(glassCenterX, glassCenterY, glassRadius * 2, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // Handle
        svg.appendChild(rc.line(
          glassCenterX + glassRadius * 0.7, 
          glassCenterY + glassRadius * 0.7,
          size * 0.8, 
          size * 0.8,
          {
            stroke: color,
            strokeWidth: strokeWidth * 1.2,
            roughness,
            bowing
          }
        ));
        break;

      case 'phone':
        // Phone outline
        const phoneWidth = size * 0.4;
        const phoneHeight = size * 0.7;
        const phoneX = (size - phoneWidth) / 2;
        const phoneY = (size - phoneHeight) / 2;
        
        svg.appendChild(rc.rectangle(phoneX, phoneY, phoneWidth, phoneHeight, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing: bowing * 1.5,
          fill: 'none'
        }));
        
        // Screen
        svg.appendChild(rc.rectangle(
          phoneX + phoneWidth * 0.1, 
          phoneY + phoneHeight * 0.15, 
          phoneWidth * 0.8, 
          phoneHeight * 0.6, 
          {
            stroke: color,
            strokeWidth: strokeWidth * 0.8,
            roughness,
            bowing,
            fill: 'none'
          }
        ));
        break;

      case 'mail':
        // Envelope
        const envWidth = size * 0.7;
        const envHeight = size * 0.5;
        const envX = (size - envWidth) / 2;
        const envY = (size - envHeight) / 2;
        
        // Envelope body
        svg.appendChild(rc.rectangle(envX, envY, envWidth, envHeight, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // Envelope flap lines
        svg.appendChild(rc.line(envX, envY, envX + envWidth / 2, envY + envHeight / 2, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        svg.appendChild(rc.line(envX + envWidth, envY, envX + envWidth / 2, envY + envHeight / 2, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        break;

      case 'map-pin':
        // Location pin
        const pinWidth = size * 0.35;
        const pinHeight = size * 0.6;
        const pinX = (size - pinWidth) / 2;
        const pinY = size * 0.1;
        
        // Pin top (circle)
        svg.appendChild(rc.circle(pinX + pinWidth / 2, pinY + pinWidth / 2, pinWidth, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // Pin point
        svg.appendChild(rc.line(
          pinX + pinWidth / 2, 
          pinY + pinWidth,
          pinX + pinWidth / 2, 
          pinY + pinHeight,
          {
            stroke: color,
            strokeWidth,
            roughness,
            bowing
          }
        ));
        
        // Inner dot
        svg.appendChild(rc.circle(pinX + pinWidth / 2, pinY + pinWidth / 2, pinWidth * 0.4, {
          stroke: color,
          strokeWidth: strokeWidth * 0.8,
          roughness,
          bowing,
          fill: color,
          fillStyle: 'solid'
        }));
        break;

      case 'calculator':
        // Calculator body
        const calcWidth = size * 0.6;
        const calcHeight = size * 0.8;
        const calcX = (size - calcWidth) / 2;
        const calcY = size * 0.1;
        
        svg.appendChild(rc.rectangle(calcX, calcY, calcWidth, calcHeight, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // Display screen
        svg.appendChild(rc.rectangle(
          calcX + calcWidth * 0.1, 
          calcY + calcHeight * 0.1, 
          calcWidth * 0.8, 
          calcHeight * 0.25, 
          {
            stroke: color,
            strokeWidth: strokeWidth * 0.8,
            roughness,
            bowing,
            fill: 'none'
          }
        ));
        
        // Button grid (simple)
        const buttonSize = calcWidth * 0.15;
        svg.appendChild(rc.rectangle(
          calcX + calcWidth * 0.2, 
          calcY + calcHeight * 0.45, 
          buttonSize, 
          buttonSize, 
          {
            stroke: color,
            strokeWidth: strokeWidth * 0.6,
            roughness: roughness * 0.8,
            bowing,
            fill: 'none'
          }
        ));
        svg.appendChild(rc.rectangle(
          calcX + calcWidth * 0.65, 
          calcY + calcHeight * 0.45, 
          buttonSize, 
          buttonSize, 
          {
            stroke: color,
            strokeWidth: strokeWidth * 0.6,
            roughness: roughness * 0.8,
            bowing,
            fill: 'none'
          }
        ));
        break;

      case 'home':
        // House shape
        const houseWidth = size * 0.6;
        const houseHeight = size * 0.5;
        const houseX = (size - houseWidth) / 2;
        const houseY = size * 0.35;
        
        // House base
        svg.appendChild(rc.rectangle(houseX, houseY, houseWidth, houseHeight, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // Roof
        svg.appendChild(rc.line(houseX, houseY, houseX + houseWidth / 2, houseY - houseHeight * 0.4, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        svg.appendChild(rc.line(houseX + houseWidth, houseY, houseX + houseWidth / 2, houseY - houseHeight * 0.4, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        
        // Door
        svg.appendChild(rc.rectangle(
          houseX + houseWidth * 0.4, 
          houseY + houseHeight * 0.3, 
          houseWidth * 0.2, 
          houseHeight * 0.7, 
          {
            stroke: color,
            strokeWidth: strokeWidth * 0.8,
            roughness,
            bowing,
            fill: 'none'
          }
        ));
        break;

      case 'trending-up':
        // Simpler trending arrow
        const trendWidth = size * 0.6;
        const trendHeight = size * 0.4;
        const trendStartX = size * 0.2;
        const trendStartY = size * 0.7;
        const trendEndX = trendStartX + trendWidth;
        const trendEndY = trendStartY - trendHeight;
        
        // Main arrow line
        svg.appendChild(rc.line(trendStartX, trendStartY, trendEndX, trendEndY, {
          stroke: color,
          strokeWidth: strokeWidth * 1.5,
          roughness: roughness * 0.8,
          bowing
        }));
        
        // Arrow head
        svg.appendChild(rc.line(trendEndX, trendEndY, trendEndX - size * 0.15, trendEndY + size * 0.1, {
          stroke: color,
          strokeWidth: strokeWidth * 1.2,
          roughness: roughness * 0.8,
          bowing
        }));
        svg.appendChild(rc.line(trendEndX, trendEndY, trendEndX - size * 0.1, trendEndY + size * 0.15, {
          stroke: color,
          strokeWidth: strokeWidth * 1.2,
          roughness: roughness * 0.8,
          bowing
        }));
        break;

      case 'credit-card':
        // Credit card
        const cardWidth = size * 0.8;
        const cardHeight = size * 0.5;
        const cardX = (size - cardWidth) / 2;
        const cardY = (size - cardHeight) / 2;
        
        svg.appendChild(rc.rectangle(cardX, cardY, cardWidth, cardHeight, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing: bowing * 1.2,
          fill: 'none'
        }));
        
        // Magnetic stripe
        svg.appendChild(rc.rectangle(cardX, cardY + cardHeight * 0.2, cardWidth, cardHeight * 0.15, {
          stroke: color,
          strokeWidth: strokeWidth * 0.8,
          roughness,
          bowing,
          fill: color,
          fillStyle: 'solid'
        }));
        
        // Chip
        svg.appendChild(rc.rectangle(cardX + cardWidth * 0.15, cardY + cardHeight * 0.45, cardWidth * 0.15, cardHeight * 0.2, {
          stroke: color,
          strokeWidth: strokeWidth * 0.8,
          roughness: roughness * 0.8,
          bowing,
          fill: 'none'
        }));
        break;

      case 'award':
        // Trophy/award
        const cupWidth = size * 0.4;
        const cupHeight = size * 0.3;
        const cupX = (size - cupWidth) / 2;
        const cupY = size * 0.2;
        
        // Cup bowl
        svg.appendChild(rc.path(`M ${cupX} ${cupY + cupHeight} Q ${cupX + cupWidth/2} ${cupY + cupHeight * 1.3} ${cupX + cupWidth} ${cupY + cupHeight}`, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // Cup top
        svg.appendChild(rc.line(cupX, cupY + cupHeight, cupX + cupWidth, cupY + cupHeight, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        
        // Base
        svg.appendChild(rc.rectangle(cupX + cupWidth * 0.3, cupY + cupHeight * 1.3, cupWidth * 0.4, cupHeight * 0.4, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // Star on top
        const starSize = size * 0.15;
        const starX = cupX + cupWidth / 2;
        const starY = cupY - starSize;
        svg.appendChild(rc.path(`M ${starX} ${starY} L ${starX + starSize*0.3} ${starY + starSize*0.7} L ${starX + starSize} ${starY + starSize*0.3} L ${starX + starSize*0.6} ${starY + starSize} L ${starX} ${starY + starSize*0.8} L ${starX - starSize*0.6} ${starY + starSize} L ${starX - starSize} ${starY + starSize*0.3} L ${starX - starSize*0.3} ${starY + starSize*0.7} Z`, {
          stroke: color,
          strokeWidth: strokeWidth * 0.8,
          roughness,
          bowing,
          fill: 'none'
        }));
        break;

      case 'target':
        // Bullseye target
        const targetRadius = size * 0.4;
        const targetCenterX = size / 2;
        const targetCenterY = size / 2;
        
        // Outer circle
        svg.appendChild(rc.circle(targetCenterX, targetCenterY, targetRadius * 2, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // Middle circle
        svg.appendChild(rc.circle(targetCenterX, targetCenterY, targetRadius * 1.3, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // Inner circle
        svg.appendChild(rc.circle(targetCenterX, targetCenterY, targetRadius * 0.6, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: color,
          fillStyle: 'solid'
        }));
        break;

      case 'check-circle':
        // Circle with checkmark (less rough)
        const checkRadius = size * 0.4;
        const checkCenterX = size / 2;
        const checkCenterY = size / 2;
        
        svg.appendChild(rc.circle(checkCenterX, checkCenterY, checkRadius * 2, {
          stroke: color,
          strokeWidth,
          roughness: 0.3,
          bowing: 0.2,
          fill: 'none'
        }));
        
        // Checkmark
        svg.appendChild(rc.path(`M ${checkCenterX - checkRadius * 0.4} ${checkCenterY} L ${checkCenterX - checkRadius * 0.1} ${checkCenterY + checkRadius * 0.3} L ${checkCenterX + checkRadius * 0.4} ${checkCenterY - checkRadius * 0.2}`, {
          stroke: color,
          strokeWidth: strokeWidth * 1.2,
          roughness: 0.3,
          bowing: 0.2
        }));
        break;

      case 'message-square':
        // Speech bubble
        const bubbleWidth = size * 0.7;
        const bubbleHeight = size * 0.5;
        const bubbleX = (size - bubbleWidth) / 2;
        const bubbleY = size * 0.15;
        
        svg.appendChild(rc.rectangle(bubbleX, bubbleY, bubbleWidth, bubbleHeight, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing: bowing * 1.2,
          fill: 'none'
        }));
        
        // Tail
        svg.appendChild(rc.path(`M ${bubbleX + bubbleWidth * 0.2} ${bubbleY + bubbleHeight} L ${bubbleX + bubbleWidth * 0.15} ${bubbleY + bubbleHeight + size * 0.15} L ${bubbleX + bubbleWidth * 0.35} ${bubbleY + bubbleHeight}`, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        break;

      case 'star':
        // 5-pointed star
        const starRadius = size * 0.35;
        const starCenterX = size / 2;
        const starCenterY = size / 2;
        
        svg.appendChild(rc.path(`M ${starCenterX} ${starCenterY - starRadius} L ${starCenterX + starRadius*0.3} ${starCenterY - starRadius*0.2} L ${starCenterX + starRadius} ${starCenterY - starRadius*0.2} L ${starCenterX + starRadius*0.5} ${starCenterY + starRadius*0.2} L ${starCenterX + starRadius*0.7} ${starCenterY + starRadius} L ${starCenterX} ${starCenterY + starRadius*0.6} L ${starCenterX - starRadius*0.7} ${starCenterY + starRadius} L ${starCenterX - starRadius*0.5} ${starCenterY + starRadius*0.2} L ${starCenterX - starRadius} ${starCenterY - starRadius*0.2} L ${starCenterX - starRadius*0.3} ${starCenterY - starRadius*0.2} Z`, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        break;

      case 'bookmark':
        // Bookmark ribbon
        const bookmarkWidth = size * 0.4;
        const bookmarkHeight = size * 0.7;
        const bookmarkX = (size - bookmarkWidth) / 2;
        const bookmarkY = size * 0.1;
        
        svg.appendChild(rc.rectangle(bookmarkX, bookmarkY, bookmarkWidth, bookmarkHeight, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // V-cut at bottom
        svg.appendChild(rc.line(bookmarkX, bookmarkY + bookmarkHeight, bookmarkX + bookmarkWidth / 2, bookmarkY + bookmarkHeight - bookmarkWidth * 0.3, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        svg.appendChild(rc.line(bookmarkX + bookmarkWidth, bookmarkY + bookmarkHeight, bookmarkX + bookmarkWidth / 2, bookmarkY + bookmarkHeight - bookmarkWidth * 0.3, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        break;

      case 'calendar':
        // Calendar
        const calWidth = size * 0.7;
        const calHeight = size * 0.8;
        const calX = (size - calWidth) / 2;
        const calY = size * 0.1;
        
        svg.appendChild(rc.rectangle(calX, calY, calWidth, calHeight, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // Header
        svg.appendChild(rc.rectangle(calX, calY, calWidth, calHeight * 0.25, {
          stroke: color,
          strokeWidth: strokeWidth * 0.8,
          roughness,
          bowing,
          fill: color,
          fillStyle: 'solid'
        }));
        
        // Rings
        svg.appendChild(rc.rectangle(calX + calWidth * 0.2, calY - size * 0.05, calWidth * 0.1, size * 0.1, {
          stroke: color,
          strokeWidth: strokeWidth * 0.8,
          roughness,
          bowing,
          fill: 'none'
        }));
        svg.appendChild(rc.rectangle(calX + calWidth * 0.7, calY - size * 0.05, calWidth * 0.1, size * 0.1, {
          stroke: color,
          strokeWidth: strokeWidth * 0.8,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // Grid lines
        svg.appendChild(rc.line(calX, calY + calHeight * 0.45, calX + calWidth, calY + calHeight * 0.45, {
          stroke: color,
          strokeWidth: strokeWidth * 0.6,
          roughness,
          bowing
        }));
        svg.appendChild(rc.line(calX, calY + calHeight * 0.65, calX + calWidth, calY + calHeight * 0.65, {
          stroke: color,
          strokeWidth: strokeWidth * 0.6,
          roughness,
          bowing
        }));
        break;

      case 'users':
        // Two people
        const personWidth = size * 0.25;
        const personHeight = size * 0.4;
        const person1X = size * 0.2;
        const person2X = size * 0.55;
        const personY = size * 0.3;
        
        // Person 1 head
        svg.appendChild(rc.circle(person1X + personWidth / 2, personY, personWidth * 0.6, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // Person 1 body
        svg.appendChild(rc.rectangle(person1X, personY + personWidth * 0.3, personWidth, personHeight, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // Person 2 head
        svg.appendChild(rc.circle(person2X + personWidth / 2, personY, personWidth * 0.6, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // Person 2 body
        svg.appendChild(rc.rectangle(person2X, personY + personWidth * 0.3, personWidth, personHeight, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        break;

      case 'pie-chart':
        // Simpler pie chart
        const pieR = size * 0.35;
        const pieCX = size / 2;
        const pieCY = size / 2;
        
        // Outer circle
        svg.appendChild(rc.circle(pieCX, pieCY, pieR * 2, {
          stroke: color,
          strokeWidth,
          roughness: roughness * 0.7,
          bowing,
          fill: 'none'
        }));
        
        // Three main segments only (cleaner look)
        // Vertical line
        svg.appendChild(rc.line(pieCX, pieCY, pieCX, pieCY - pieR, {
          stroke: color,
          strokeWidth: strokeWidth * 0.9,
          roughness: roughness * 0.7,
          bowing
        }));
        
        // Diagonal line
        svg.appendChild(rc.line(pieCX, pieCY, pieCX + pieR * 0.7, pieCY + pieR * 0.7, {
          stroke: color,
          strokeWidth: strokeWidth * 0.9,
          roughness: roughness * 0.7,
          bowing
        }));
        
        // Center dot
        svg.appendChild(rc.circle(pieCX, pieCY, 3, {
          stroke: color,
          strokeWidth: strokeWidth * 0.7,
          roughness: roughness * 0.5,
          bowing,
          fill: color,
          fillStyle: 'solid'
        }));
        break;

      case 'file-text':
        // Cleaner document
        const docW = size * 0.55;
        const docH = size * 0.75;
        const docX = (size - docW) / 2;
        const docY = size * 0.15;
        
        // Document with folded corner
        const foldSize = size * 0.12;
        const docPath = `M ${docX} ${docY} 
                        L ${docX + docW - foldSize} ${docY}
                        L ${docX + docW} ${docY + foldSize}
                        L ${docX + docW} ${docY + docH}
                        L ${docX} ${docY + docH}
                        Z`;
        
        svg.appendChild(rc.path(docPath, {
          stroke: color,
          strokeWidth,
          roughness: roughness * 0.8,
          bowing,
          fill: 'none'
        }));
        
        // Fold line
        svg.appendChild(rc.line(docX + docW - foldSize, docY, docX + docW - foldSize, docY + foldSize, {
          stroke: color,
          strokeWidth: strokeWidth * 0.8,
          roughness: roughness * 0.6,
          bowing
        }));
        svg.appendChild(rc.line(docX + docW - foldSize, docY + foldSize, docX + docW, docY + foldSize, {
          stroke: color,
          strokeWidth: strokeWidth * 0.8,
          roughness: roughness * 0.6,
          bowing
        }));
        
        // Text lines (fewer, cleaner)
        const textX = docX + docW * 0.15;
        const textW = docW * 0.7;
        const line1Y = docY + docH * 0.35;
        const line2Y = docY + docH * 0.55;
        
        svg.appendChild(rc.line(textX, line1Y, textX + textW, line1Y, {
          stroke: color,
          strokeWidth: strokeWidth * 0.7,
          roughness: roughness * 0.6,
          bowing
        }));
        svg.appendChild(rc.line(textX, line2Y, textX + textW * 0.8, line2Y, {
          stroke: color,
          strokeWidth: strokeWidth * 0.7,
          roughness: roughness * 0.6,
          bowing
        }));
        break;

      case 'graduation-cap':
        // Simpler graduation cap
        const hatWidth = size * 0.8;
        const hatHeight = size * 0.2;
        const hatX = (size - hatWidth) / 2;
        const hatY = size * 0.4;
        
        // Flat mortarboard top
        svg.appendChild(rc.rectangle(hatX, hatY, hatWidth, hatHeight, {
          stroke: color,
          strokeWidth,
          roughness: roughness * 0.7,
          bowing,
          fill: 'none'
        }));
        
        // Cap base (head part)
        const baseWidth = size * 0.5;
        const baseX = (size - baseWidth) / 2;
        svg.appendChild(rc.rectangle(baseX, hatY + hatHeight, baseWidth, size * 0.15, {
          stroke: color,
          strokeWidth,
          roughness: roughness * 0.7,
          bowing,
          fill: 'none'
        }));
        
        // Simple tassel
        svg.appendChild(rc.line(
          hatX + hatWidth, 
          hatY + hatHeight / 2, 
          hatX + hatWidth + size * 0.15, 
          hatY + hatHeight / 2 + size * 0.25, 
          {
            stroke: color,
            strokeWidth: strokeWidth * 1.2,
            roughness: roughness * 0.6,
            bowing
          }
        ));
        break;

      case 'heart':
        // Cleaner heart shape
        const heartW = size * 0.6;
        const heartH = size * 0.5;
        const heartCX = size / 2;
        const heartCY = size * 0.3;
        
        // Heart path using curves
        const heartPath = `M ${heartCX} ${heartCY + heartH * 0.8} 
                          C ${heartCX - heartW * 0.5} ${heartCY + heartH * 0.3} ${heartCX - heartW * 0.5} ${heartCY} ${heartCX - heartW * 0.25} ${heartCY}
                          C ${heartCX - heartW * 0.1} ${heartCY - heartH * 0.2} ${heartCX + heartW * 0.1} ${heartCY - heartH * 0.2} ${heartCX + heartW * 0.25} ${heartCY}
                          C ${heartCX + heartW * 0.5} ${heartCY} ${heartCX + heartW * 0.5} ${heartCY + heartH * 0.3} ${heartCX} ${heartCY + heartH * 0.8}`;
                          
        svg.appendChild(rc.path(heartPath, {
          stroke: color,
          strokeWidth,
          roughness: roughness * 0.8,
          bowing: bowing * 0.7,
          fill: 'none'
        }));
        break;

      case 'briefcase':
        // Briefcase
        const briefcaseWidth = size * 0.7;
        const briefcaseHeight = size * 0.5;
        const briefcaseX = (size - briefcaseWidth) / 2;
        const briefcaseY = size * 0.3;
        
        // Main case
        svg.appendChild(rc.rectangle(briefcaseX, briefcaseY, briefcaseWidth, briefcaseHeight, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // Handle
        const handleWidth = briefcaseWidth * 0.3;
        const handleHeight = size * 0.15;
        const handleX = briefcaseX + (briefcaseWidth - handleWidth) / 2;
        const handleY = briefcaseY - handleHeight * 0.5;
        
        svg.appendChild(rc.rectangle(handleX, handleY, handleWidth, handleHeight * 0.3, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // Handle top
        svg.appendChild(rc.line(handleX, handleY, handleX, handleY - handleHeight * 0.5, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        svg.appendChild(rc.line(handleX + handleWidth, handleY, handleX + handleWidth, handleY - handleHeight * 0.5, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        svg.appendChild(rc.line(handleX, handleY - handleHeight * 0.5, handleX + handleWidth, handleY - handleHeight * 0.5, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        
        // Lock/clasp
        svg.appendChild(rc.rectangle(
          briefcaseX + briefcaseWidth / 2 - size * 0.05, 
          briefcaseY + briefcaseHeight * 0.4, 
          size * 0.1, 
          size * 0.08, 
          {
            stroke: color,
            strokeWidth: strokeWidth * 0.8,
            roughness,
            bowing,
            fill: 'none'
          }
        ));
        break;

      case 'help-circle':
        // Question mark in circle
        svg.appendChild(rc.circle(size/2, size/2, size * 0.8, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // Question mark
        const qSize = size * 0.4;
        svg.appendChild(rc.path(
          `M ${size/2 - qSize/4} ${size/2 - qSize/4} Q ${size/2} ${size/2 - qSize/2} ${size/2 + qSize/4} ${size/2 - qSize/4} Q ${size/2 + qSize/3} ${size/2} ${size/2} ${size/2 + qSize/6}`,
          {
            stroke: color,
            strokeWidth,
            roughness,
            bowing,
            fill: 'none'
          }
        ));
        
        // Dot
        svg.appendChild(rc.circle(size/2, size/2 + qSize/2.5, strokeWidth * 2, {
          stroke: color,
          strokeWidth: strokeWidth,
          roughness,
          bowing,
          fill: color,
          fillStyle: 'solid'
        }));
        break;

      case 'chevron-down':
        // Down arrow chevron
        const chevronSize = size * 0.4;
        svg.appendChild(rc.path(
          `M ${size/2 - chevronSize} ${size/2 - chevronSize/2} L ${size/2} ${size/2 + chevronSize/2} L ${size/2 + chevronSize} ${size/2 - chevronSize/2}`,
          {
            stroke: color,
            strokeWidth,
            roughness,
            bowing,
            fill: 'none'
          }
        ));
        break;

      case 'plus':
        // Plus sign
        const plusSize = size * 0.6;
        svg.appendChild(rc.line(size/2 - plusSize/2, size/2, size/2 + plusSize/2, size/2, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        svg.appendChild(rc.line(size/2, size/2 - plusSize/2, size/2, size/2 + plusSize/2, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        break;

      case 'minus':
        // Minus sign
        const minusSize = size * 0.6;
        svg.appendChild(rc.line(size/2 - minusSize/2, size/2, size/2 + minusSize/2, size/2, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        break;

      case 'quote':
        // Quotation marks
        svg.appendChild(rc.path(
          `M ${size * 0.2} ${size * 0.3} Q ${size * 0.25} ${size * 0.2} ${size * 0.3} ${size * 0.3} Q ${size * 0.25} ${size * 0.4} ${size * 0.2} ${size * 0.5}`,
          {
            stroke: color,
            strokeWidth: strokeWidth * 1.5,
            roughness,
            bowing,
            fill: 'none'
          }
        ));
        svg.appendChild(rc.path(
          `M ${size * 0.6} ${size * 0.3} Q ${size * 0.65} ${size * 0.2} ${size * 0.7} ${size * 0.3} Q ${size * 0.65} ${size * 0.4} ${size * 0.6} ${size * 0.5}`,
          {
            stroke: color,
            strokeWidth: strokeWidth * 1.5,
            roughness,
            bowing,
            fill: 'none'
          }
        ));
        break;

      case 'x-circle':
        // X in circle
        svg.appendChild(rc.circle(size/2, size/2, size * 0.8, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        const xSize = size * 0.4;
        svg.appendChild(rc.line(size/2 - xSize/2, size/2 - xSize/2, size/2 + xSize/2, size/2 + xSize/2, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        svg.appendChild(rc.line(size/2 + xSize/2, size/2 - xSize/2, size/2 - xSize/2, size/2 + xSize/2, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        break;

      case 'lightbulb':
        // Light bulb
        const bulbRadius = size * 0.25;
        svg.appendChild(rc.circle(size/2, size/2 - size/8, bulbRadius, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // Base
        svg.appendChild(rc.rectangle(size/2 - size/8, size/2 + size/8, size/4, size/6, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // Lines coming from bulb
        svg.appendChild(rc.line(size/2 - size/3, size/2 - size/2.5, size/2 - size/4, size/2 - size/3.5, {
          stroke: color,
          strokeWidth: strokeWidth * 0.8,
          roughness,
          bowing
        }));
        svg.appendChild(rc.line(size/2 + size/3, size/2 - size/2.5, size/2 + size/4, size/2 - size/3.5, {
          stroke: color,
          strokeWidth: strokeWidth * 0.8,
          roughness,
          bowing
        }));
        break;

      case 'repeat':
        // Repeat/refresh arrows
        const repeatRadius = size * 0.3;
        svg.appendChild(rc.path(
          `M ${size/2 + repeatRadius} ${size/2} A ${repeatRadius} ${repeatRadius} 0 1 1 ${size/2 - repeatRadius} ${size/2}`,
          {
            stroke: color,
            strokeWidth,
            roughness,
            bowing,
            fill: 'none'
          }
        ));
        
        // Arrow head
        svg.appendChild(rc.path(
          `M ${size/2 + repeatRadius - size/8} ${size/2 - size/8} L ${size/2 + repeatRadius} ${size/2} L ${size/2 + repeatRadius - size/8} ${size/2 + size/8}`,
          {
            stroke: color,
            strokeWidth,
            roughness,
            bowing,
            fill: 'none'
          }
        ));
        break;

      case 'handshake':
        // Handshake - two hands meeting
        const handW = size * 0.3;
        const handH = size * 0.4;
        
        // Left hand (palm facing right)
        svg.appendChild(rc.rectangle(size * 0.1, size * 0.3, handW, handH * 0.6, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // Right hand (palm facing left)
        svg.appendChild(rc.rectangle(size * 0.6, size * 0.3, handW, handH * 0.6, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // Connection/grip line
        svg.appendChild(rc.line(size * 0.4, size * 0.5, size * 0.6, size * 0.5, {
          stroke: color,
          strokeWidth: strokeWidth * 1.2,
          roughness,
          bowing
        }));
        break;

      case 'building':
        // Building/office
        const buildingW = size * 0.6;
        const buildingH = size * 0.7;
        const buildingX = (size - buildingW) / 2;
        const buildingY = size * 0.2;
        
        // Main building structure
        svg.appendChild(rc.rectangle(buildingX, buildingY, buildingW, buildingH, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // Windows (3x4 grid)
        const windowSize = buildingW / 8;
        for (let row = 0; row < 4; row++) {
          for (let col = 0; col < 3; col++) {
            const windowX = buildingX + (col + 1) * buildingW / 4 - windowSize / 2;
            const windowY = buildingY + (row + 1) * buildingH / 5 - windowSize / 2;
            svg.appendChild(rc.rectangle(windowX, windowY, windowSize, windowSize, {
              stroke: color,
              strokeWidth: strokeWidth * 0.7,
              roughness: roughness * 0.6,
              bowing,
              fill: 'none'
            }));
          }
        }
        break;

      case 'globe':
        // Globe/world
        const globeR = size * 0.35;
        const globeCX = size / 2;
        const globeCY = size / 2;
        
        // Outer circle
        svg.appendChild(rc.circle(globeCX, globeCY, globeR * 2, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        
        // Vertical meridian
        svg.appendChild(rc.ellipse(globeCX, globeCY, globeR * 2, globeR * 1.2, {
          stroke: color,
          strokeWidth: strokeWidth * 0.8,
          roughness: roughness * 0.7,
          bowing,
          fill: 'none'
        }));
        
        // Horizontal equator
        svg.appendChild(rc.line(globeCX - globeR, globeCY, globeCX + globeR, globeCY, {
          stroke: color,
          strokeWidth: strokeWidth * 0.8,
          roughness: roughness * 0.7,
          bowing
        }));
        
        // Additional latitude lines
        svg.appendChild(rc.ellipse(globeCX, globeCY, globeR * 2, globeR * 0.6, {
          stroke: color,
          strokeWidth: strokeWidth * 0.6,
          roughness: roughness * 0.7,
          bowing,
          fill: 'none'
        }));
        break;

      case 'alert-triangle':
        // Warning triangle
        const triSize = size * 0.7;
        const triH = triSize * 0.866; // height of equilateral triangle
        const triY = (size - triH) / 2;
        
        // Triangle
        svg.appendChild(rc.path(
          `M ${size/2} ${triY} L ${size/2 - triSize/2} ${triY + triH} L ${size/2 + triSize/2} ${triY + triH} Z`,
          {
            stroke: color,
            strokeWidth,
            roughness,
            bowing,
            fill: 'none'
          }
        ));
        
        // Exclamation mark
        svg.appendChild(rc.line(size/2, triY + triH * 0.25, size/2, triY + triH * 0.65, {
          stroke: color,
          strokeWidth: strokeWidth * 1.5,
          roughness,
          bowing
        }));
        
        // Exclamation dot
        svg.appendChild(rc.circle(size/2, triY + triH * 0.8, strokeWidth * 1.5, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: color,
          fillStyle: 'solid'
        }));
        break;
    }
  }, [type, size, color]);

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      className={className}
      style={{ color }}
    />
  );
}