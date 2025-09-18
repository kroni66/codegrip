'use client';
import { type JSX, useCallback, useEffect, useRef, useState } from 'react';
import { motion, MotionProps } from 'framer-motion';

type TextScrambleProps = {
  children: string;
  duration?: number;
  speed?: number;
  characterSet?: string;
  as?: React.ElementType;
  className?: string;
  trigger?: boolean;
  onScrambleComplete?: () => void;
} & MotionProps;

const defaultChars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = defaultChars,
  className,
  as: Component = 'p',
  trigger = true,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  const MotionComponent = motion.create(
    Component as keyof JSX.IntrinsicElements
  );
  const [displayText, setDisplayText] = useState('');
  const isAnimatingRef = useRef(false);
  const startedRef = useRef(false);
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const text = children;

  const scramble = useCallback(() => {
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    console.log('TextScramble: Scramble function called, starting animation for:', text);

    const steps = duration / speed;
    let step = 0;

    const interval = setInterval(() => {
      let scrambled = '';
      const progress = step / steps;

      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          scrambled += ' ';
          continue;
        }

        if (progress * text.length > i) {
          scrambled += text[i];
        } else {
          scrambled +=
            characterSet[Math.floor(Math.random() * characterSet.length)];
        }
      }

      setDisplayText(scrambled);
      step++;

      if (step > steps) {
        clearInterval(interval);
        setDisplayText(text);
        isAnimatingRef.current = false;
        console.log('TextScramble: Animation completed for text:', text);
        onScrambleComplete?.();
      }
    }, speed * 1000);
  }, [text, duration, speed, characterSet, onScrambleComplete]);

  // Start animation when the element becomes visible in viewport
  useEffect(() => {
    if (!trigger) return; // armed but only fires on visibility

    const el = rootRef.current;
    if (!el) return;

    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Fire exactly once per instance
              if (!startedRef.current) {
                startedRef.current = true;
                scramble();
              }
            }
          });
        },
        { root: null, rootMargin: '0px', threshold: 0 }
      );

      observer.observe(el);
      return () => observer.disconnect();
    } else {
      // Fallback: start after mount
      const t = setTimeout(() => {
        if (!startedRef.current) {
          startedRef.current = true;
          scramble();
        }
      }, 100);
      return () => clearTimeout(t);
    }
  }, [trigger, scramble]);

  return (
    <span ref={rootRef} style={{ display: 'inline-block' }}>
      <MotionComponent className={className} {...props}>
        {displayText || text}
      </MotionComponent>
    </span>
  );
}
