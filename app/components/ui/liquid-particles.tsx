'use client';

import React, { useEffect, useRef, useState } from 'react';

interface LiquidParticlesProps {
  className?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export const LiquidParticles: React.FC<LiquidParticlesProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particleIdRef = useRef(0);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      setIsActive(true);

      // Create new particles on mouse move
      if (particlesRef.current.length < 30) {
        createParticle();
      }
    };

    const handleMouseLeave = () => {
      setIsActive(false);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Create particle
    const createParticle = () => {
      const particle: Particle = {
        id: particleIdRef.current++,
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 8 + 4,
        opacity: 0.8,
        life: 0,
        maxLife: 60 + Math.random() * 40
      };
      particlesRef.current.push(particle);
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

      // Update particles
      particlesRef.current = particlesRef.current.filter(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Apply gravity toward mouse
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
          particle.vx += (dx / distance) * 0.1;
          particle.vy += (dy / distance) * 0.1;
        }

        // Apply friction
        particle.vx *= 0.95;
        particle.vy *= 0.95;

        // Update life
        particle.life++;
        particle.opacity = Math.max(0, 0.8 - (particle.life / particle.maxLife));

        // Draw particle
        if (particle.opacity > 0) {
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size
          );

          gradient.addColorStop(0, `rgba(147, 51, 234, ${particle.opacity})`);
          gradient.addColorStop(0.5, `rgba(168, 85, 247, ${particle.opacity * 0.7})`);
          gradient.addColorStop(1, `rgba(196, 181, 253, ${particle.opacity * 0.3})`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();

          // Add glow effect
          ctx.shadowColor = '#9333ea';
          ctx.shadowBlur = particle.size * 2;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        return particle.life < particle.maxLife;
      });

      // Draw connections between nearby particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = Math.max(0, (100 - distance) / 100) * 0.3;
            ctx.strokeStyle = `rgba(147, 51, 234, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-10 ${className}`}
      style={{
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
      }}
    />
  );
};
