'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollAnimationOptions {
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  pinSpacing?: boolean;
  anticipatePin?: number;
  markers?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

export const useScrollTrigger = (
  animation: (element: HTMLElement) => gsap.core.Timeline | gsap.core.Tween,
  options: ScrollAnimationOptions = {}
) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Create the animation
    const tl = animation(element);

    // Create ScrollTrigger
    const trigger = ScrollTrigger.create({
      trigger: options.trigger || element,
      start: options.start || 'top 80%',
      end: options.end || 'bottom 20%',
      scrub: options.scrub !== undefined ? options.scrub : false,
      pin: options.pin || false,
      pinSpacing: options.pinSpacing !== undefined ? options.pinSpacing : true,
      anticipatePin: options.anticipatePin || 0,
      markers: options.markers || false,
      animation: tl,
      onEnter: options.onEnter,
      onLeave: options.onLeave,
      onEnterBack: options.onEnterBack,
      onLeaveBack: options.onLeaveBack,
    });

    return () => {
      if (trigger) {
        trigger.kill();
      }
      if (tl) {
        tl.kill();
      }
    };
  }, [animation, options]);

  return elementRef;
};

// Predefined animation functions
export const fadeInUp = (element: HTMLElement, delay: number = 0) => {
  return gsap.fromTo(element,
    {
      opacity: 0,
      y: 50
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      delay,
      ease: 'power2.out'
    }
  );
};

export const fadeInLeft = (element: HTMLElement, delay: number = 0) => {
  return gsap.fromTo(element,
    {
      opacity: 0,
      x: -50
    },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      delay,
      ease: 'power2.out'
    }
  );
};

export const fadeInRight = (element: HTMLElement, delay: number = 0) => {
  return gsap.fromTo(element,
    {
      opacity: 0,
      x: 50
    },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      delay,
      ease: 'power2.out'
    }
  );
};

export const scaleIn = (element: HTMLElement, delay: number = 0) => {
  return gsap.fromTo(element,
    {
      opacity: 0,
      scale: 0.8
    },
    {
      opacity: 1,
      scale: 1,
      duration: 1,
      delay,
      ease: 'back.out(1.7)'
    }
  );
};

export const staggerChildren = (element: HTMLElement, childSelector: string = '*', delay: number = 0) => {
  const children = element.querySelectorAll(childSelector);
  return gsap.fromTo(children,
    {
      opacity: 0,
      y: 30
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      delay,
      ease: 'power2.out'
    }
  );
};

export const parallax = (element: HTMLElement, speed: number = 0.5) => {
  return gsap.fromTo(element,
    {
      y: 0
    },
    {
      y: -100 * speed,
      ease: 'none'
    }
  );
};

export const cardReveal = (element: HTMLElement, delay: number = 0) => {
  return gsap.fromTo(element,
    {
      opacity: 0,
      scale: 0.8,
      y: 100,
      rotationX: -15
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      rotationX: 0,
      duration: 1.2,
      delay,
      ease: 'back.out(1.7)'
    }
  );
};

export const cardSlideIn = (element: HTMLElement, direction: 'left' | 'right' | 'up' | 'down' = 'up', delay: number = 0) => {
  const directions = {
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
    up: { x: 0, y: 100 },
    down: { x: 0, y: -100 }
  };

  return gsap.fromTo(element,
    {
      opacity: 0,
      x: directions[direction].x,
      y: directions[direction].y,
      scale: 0.9
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration: 1,
      delay,
      ease: 'power2.out'
    }
  );
};

export const cardBounce = (element: HTMLElement, delay: number = 0) => {
  return gsap.fromTo(element,
    {
      opacity: 0,
      scale: 0.3,
      y: 50
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.5,
      delay,
      ease: 'elastic.out(1, 0.3)'
    }
  );
};

export const cardFlip = (element: HTMLElement, delay: number = 0) => {
  return gsap.fromTo(element,
    {
      opacity: 0,
      rotationY: -90,
      scale: 0.8
    },
    {
      opacity: 1,
      rotationY: 0,
      scale: 1,
      duration: 1.2,
      delay,
      ease: 'power2.out'
    }
  );
};
