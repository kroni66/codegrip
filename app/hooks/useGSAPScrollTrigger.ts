'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register ScrollTrigger and ScrollTo plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
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

    // Create the animation timeline
    const tl = animation(element);

    // Set initial state - hide elements before animation
    gsap.set(element, {
      opacity: 0,
      y: options.start?.includes('top') ? 50 : 30
    });

    // Check if ScrollSmoother is available and get its scroller
    let scroller: string | HTMLElement | Window = window;

    // Try to get ScrollSmoother instance if available
    const smoother = (window as any).ScrollSmoother?.get();
    if (smoother) {
      scroller = smoother.scroller || smoother.content || window;
    }

    // Create ScrollTrigger with ScrollSmoother integration
    const trigger = ScrollTrigger.create({
      trigger: options.trigger || element,
      start: options.start || 'top 85%',
      end: options.end || 'bottom 15%',
      scrub: options.scrub !== undefined ? options.scrub : false,
      pin: options.pin || false,
      pinSpacing: options.pinSpacing !== undefined ? options.pinSpacing : true,
      anticipatePin: options.anticipatePin || 0,
      markers: options.markers || false,
      scroller: scroller, // Use ScrollSmoother's scroller if available
      onEnter: () => {
        // Play animation forward when entering
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out'
        });
        options.onEnter?.();
      },
      onLeave: () => {
        // Hide when leaving (scrolling down past the section)
        gsap.to(element, {
          opacity: 0,
          y: -30,
          duration: 0.5,
          ease: 'power2.out'
        });
        options.onLeave?.();
      },
      onEnterBack: () => {
        // Show when entering from below (scrolling back up)
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out'
        });
        options.onEnterBack?.();
      },
      onLeaveBack: () => {
        // Hide when leaving upward (scrolling up past the section)
        gsap.to(element, {
          opacity: 0,
          y: 30,
          duration: 0.5,
          ease: 'power2.out'
        });
        options.onLeaveBack?.();
      },
    });

    return () => {
      if (trigger) {
        trigger.kill();
      }
      if (tl && typeof tl.kill === 'function') {
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

// ScrollSmoother Hook
export const useScrollSmoother = (
  config: {
    wrapper?: string;
    content?: string;
    smooth?: number;
    normalizeScroll?: boolean;
    ignoreMobileResize?: boolean;
    effects?: boolean;
    preventDefault?: boolean;
    ease?: string;
    onUpdate?: (self: any) => void;
    onStop?: () => void;
    onStart?: () => void;
  } = {}
) => {
  const defaultConfig = {
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1,
    normalizeScroll: true,
    ignoreMobileResize: false,
    effects: false,
    preventDefault: true,
    ease: 'power4.out',
    ...config
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Try to import ScrollSmoother (premium plugin)
    const initScrollSmoother = async () => {
      try {
        // Dynamic import to handle potential module not found errors
        const { ScrollSmoother } = await import('gsap/ScrollSmoother');

        gsap.registerPlugin(ScrollSmoother);

        const smoother = ScrollSmoother.create(defaultConfig);

        return () => {
          if (smoother) {
            smoother.kill();
          }
        };
      } catch (error) {
        console.warn('ScrollSmoother is not available. Falling back to smooth scroll CSS.');

        // Fallback: Add smooth scrolling CSS
        const style = document.createElement('style');
        style.textContent = `
          html {
            scroll-behavior: smooth;
          }

          * {
            scroll-behavior: smooth;
          }

          /* Add momentum scrolling for mobile */
          @media (max-width: 768px) {
            html {
              -webkit-overflow-scrolling: touch;
            }
          }
        `;
        document.head.appendChild(style);

        return () => {
          if (document.head.contains(style)) {
            document.head.removeChild(style);
          }
        };
      }
    };

    const cleanup = initScrollSmoother();

    return () => {
      cleanup?.then(clean => clean?.());
    };
  }, [defaultConfig]);

  return defaultConfig;
};

// Alternative smooth scrolling hook for non-premium users
export const useSmoothScroll = (config: { duration?: number; ease?: string } = {}) => {
  const { duration = 1, ease = 'power2.out' } = config;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Enhanced smooth scrolling for elements with data-smooth-scroll
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement;

      if (link) {
        e.preventDefault();
        const targetId = link.getAttribute('href')?.slice(1);
        const targetElement = targetId ? document.getElementById(targetId) : null;

        if (targetElement) {
          // Use ScrollSmoother if available, otherwise use GSAP scrollTo
          const smoother = getScrollSmootherInstance();
          if (smoother) {
            // ScrollSmoother.scrollTo(target, duration, smooth, ease)
            smoother.scrollTo(targetElement, duration, true, ease);
          } else {
            gsap.to(window, {
              duration,
              scrollTo: {
                y: targetElement,
                offsetY: 80
              },
              ease
            });
          }
        }
      }
    };

    // Add smooth scrolling to all anchor links
    document.addEventListener('click', handleSmoothScroll);

    // Add CSS smooth scrolling as fallback
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }

      /* Enhanced momentum scrolling */
      body {
        -webkit-overflow-scrolling: touch;
      }

      /* Smooth scroll for programmatic scrolls */
      .smooth-scroll {
        scroll-behavior: smooth;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('click', handleSmoothScroll);
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, [duration, ease]);
};

// ScrollSmoother Configuration Component
export interface ScrollSmootherConfig {
  smooth?: number;
  normalizeScroll?: boolean;
  ignoreMobileResize?: boolean;
  effects?: boolean;
  preventDefault?: boolean;
  ease?: string;
  onUpdate?: (self: any) => void;
  onStop?: () => void;
  onStart?: () => void;
}

export const createScrollSmootherConfig = (
  customConfig: Partial<ScrollSmootherConfig> = {}
): ScrollSmootherConfig => {
  return {
    smooth: 1.5,
    normalizeScroll: true,
    ignoreMobileResize: false,
    effects: true,
    preventDefault: true,
    ease: 'power2.out',
    onUpdate: (self) => {
      // Default update handler - can be customized
      // console.log('ScrollSmoother progress:', self.progress);
    },
    ...customConfig
  };
};

// Utility function to check if ScrollSmoother is available
export const isScrollSmootherAvailable = (): boolean => {
  return typeof window !== 'undefined' && !!(window as any).ScrollSmoother;
};

// Utility function to get ScrollSmoother instance
export const getScrollSmootherInstance = () => {
  if (typeof window !== 'undefined') {
    return (window as any).ScrollSmoother?.get?.();
  }
  return null;
};

// Enhanced scroll to function that works with ScrollSmoother
export const smoothScrollTo = (
  target: string | HTMLElement | number,
  config: {
    duration?: number;
    ease?: string;
    offsetY?: number;
  } = {}
) => {
  const { duration = 1, ease = 'power2.out', offsetY = 0 } = config;

  const smoother = getScrollSmootherInstance();
  if (smoother) {
    // Use ScrollSmoother's scrollTo method: scrollTo(target, duration, smooth, ease)
    // Duration is in seconds, smooth is boolean, ease is string
    smoother.scrollTo(target, duration, true, ease);
  } else {
    // Fallback to GSAP scrollTo
    gsap.to(window, {
      duration,
      scrollTo: {
        y: target,
        offsetY
      },
      ease
    });
  }
};
