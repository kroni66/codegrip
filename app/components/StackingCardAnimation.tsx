'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StackingCardAnimationProps {
  children: React.ReactNode[];
  className?: string;
}

export const StackingCardAnimation: React.FC<StackingCardAnimationProps> = ({
  children,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current || !cardsRef.current.length) return;

    const container = containerRef.current;
    const cards = cardsRef.current;
    const numCards = cards.length;

    // Set initial stacking positions
    gsap.set(cards, {
      y: (index) => (numCards - 1 - index) * 25, // Stack from bottom to top
      rotateX: (index) => (numCards - 1 - index) * -3, // Slight rotation for depth
      zIndex: (index) => index + 1, // Lower z-index for cards at bottom
      scale: (index) => 1 - (numCards - 1 - index) * 0.03, // Smaller scale for cards at bottom
      opacity: (index) => index === numCards - 1 ? 1 : 0.9 - (numCards - 1 - index) * 0.1, // Fade bottom cards slightly
    });

    // Create a pinned ScrollTrigger that controls the entire animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=${numCards * 1000}`, // Enough scroll distance for all cards
        scrub: 1,
        pin: true,
        markers: false,
        anticipatePin: 1,
      }
    });

    timelineRef.current = tl;

    // Set up the stacking animation sequence
    // Each card will "pop" to the front as we scroll
    cards.forEach((card, index) => {
      tl.to(card, {
        zIndex: numCards + index,
        y: 0,
        rotateX: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
      }, index * 0.5);
    });

    // Keep all cards visible at the end
    tl.to({}, { duration: 0.5 }); // Add some padding at the end

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [children]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d'
      }}
    >
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) cardsRef.current[index] = el;
          }}
          className="absolute inset-0 w-full h-full transform-gpu"
          style={{
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden'
          }}
        >
          {child}
        </div>
      ))}

      {/* Add subtle shadow/glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 via-transparent to-transparent rounded-xl blur-xl" />
      </div>
    </div>
  );
};

export default StackingCardAnimation;
