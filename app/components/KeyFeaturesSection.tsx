"use client";

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import StackingCards, { StackingCardItem } from '@/components/fancy/blocks/stacking-cards';
import { TextScramble } from "@/components/ui/text-scramble";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerChildren,
  parallax,
  cardReveal,
  cardSlideIn,
  useScrollTrigger
} from '@/app/hooks/useGSAPScrollTrigger';

const keyFeatures = [
  {
    title: "Moderní webové aplikace",
    description: "Vytváříme responzivní webové aplikace s využitím nejnovějších technologií jako React, Next.js a TypeScript pro maximální výkon a uživatelskou zkušenost.",
    icon: "🚀",
    gradient: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-400/30"
  },
  {
    title: "E-commerce řešení",
    description: "Kompletní e-shopy s moderním designem, bezpečným platebním systémem a optimalizací pro konverze. Integrace s populárními platformami jako WooCommerce.",
    icon: "🛒",
    gradient: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-400/30"
  },
  {
    title: "UI/UX Design",
    description: "Profesionální designové služby zaměřené na uživatelskou zkušenost. Vytváříme intuitivní rozhraní, která přinášejí výsledky a zvyšují spokojenost uživatelů.",
    icon: "🎨",
    gradient: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-400/30"
  },
  {
    title: "Mobilní aplikace",
    description: "Nativní i hybridní mobilní aplikace pro iOS a Android. Používáme React Native a Flutter pro rychlý vývoj a konzistentní uživatelskou zkušenost napříč platformami.",
    icon: "📱",
    gradient: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-400/30"
  },
  {
    title: "Cloud infrastruktura",
    description: "Škálovatelná cloudová řešení s vysokou dostupností. Nasazení na moderní infrastruktuře s automatickým škálováním a monitoringem výkonu.",
    icon: "☁️",
    gradient: "from-indigo-500/20 to-violet-500/20",
    borderColor: "border-indigo-400/30"
  }
];

export function KeyFeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgLeftRef = useRef<HTMLDivElement>(null);
  const bgRightRef = useRef<HTMLDivElement>(null);

  // Individual card refs
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Register GSAP plugins
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  // Header animation
  useScrollTrigger(
    (element) => fadeInUp(element),
    {
      trigger: headerRef.current || undefined,
      start: 'top 85%',
      end: 'bottom 20%',
      markers: false
    }
  );

  // Description animation
  useScrollTrigger(
    (element) => fadeInUp(element, 0.3),
    {
      trigger: descriptionRef.current || undefined,
      start: 'top 85%',
      end: 'bottom 20%',
      markers: false
    }
  );

  // Background parallax effects
  useScrollTrigger(
    (element) => parallax(element, 0.3),
    {
      trigger: bgLeftRef.current || undefined,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      markers: false
    }
  );

  useScrollTrigger(
    (element) => parallax(element, 0.5),
    {
      trigger: bgRightRef.current || undefined,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      markers: false
    }
  );

  // Card animations with staggered effects
  useEffect(() => {
    const cards = cardRefs.current.filter(card => card !== null);

    cards.forEach((card, index) => {
      if (!card) return;

      const animationType = index % 4; // Cycle through different animation types
      let animation;

      switch (animationType) {
        case 0:
          animation = () => cardSlideIn(card, 'left', index * 0.1);
          break;
        case 1:
          animation = () => cardSlideIn(card, 'right', index * 0.1);
          break;
        case 2:
          animation = () => cardReveal(card, index * 0.1);
          break;
        case 3:
          animation = () => cardSlideIn(card, 'up', index * 0.1);
          break;
        default:
          animation = () => fadeInUp(card, index * 0.1);
      }

      // Create scroll trigger for each card
      const tl = animation();
      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        end: 'bottom 20%',
        animation: tl,
        markers: false,
        onEnter: () => {
          gsap.set(card, { opacity: 0 });
          tl.restart();
        },
        onLeaveBack: () => {
          gsap.set(card, { opacity: 0 });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // CTA animation
  useScrollTrigger(
    (element) => gsap.fromTo(element,
      {
        opacity: 0,
        scale: 0.8,
        y: 50
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'back.out(1.7)'
      }
    ),
    {
      trigger: ctaRef.current || undefined,
      start: 'top 85%',
      end: 'bottom 20%',
      markers: false
    }
  );

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center py-24 px-6 bg-gradient-to-br from-neutral-950 via-neutral-900/30 to-neutral-950 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div
          ref={bgLeftRef}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"
        ></div>
        <div
          ref={bgRightRef}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-full blur-3xl"
        ></div>
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <TextScramble
            as="h2"
            className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-center tracking-wide text-white leading-tight"
            duration={1.4}
            speed={0.025}
          >
            Klíčové funkce
          </TextScramble>
          <p
            ref={descriptionRef}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Objevte naše hlavní služby a technologie, které pohání moderní digitální řešení
          </p>
        </div>

        {/* Stacking Cards Container */}
        <div ref={cardsContainerRef} className="relative">
          <StackingCards
            totalCards={keyFeatures.length}
            scaleMultiplier={0.04}
            className="space-y-6"
            scrollOptons={{
              target: containerRef,
              offset: ["start center", "end center"]
            }}
          >
            {keyFeatures.map((feature, index) => (
              <StackingCardItem
                key={index}
                index={index}
                className="h-[500px]"
              >
                <motion.div
                  ref={(el) => {
                    if (cardRefs.current) {
                      cardRefs.current[index] = el;
                    }
                  }}
                  className={`relative bg-gradient-to-br ${feature.gradient} backdrop-blur-xl border ${feature.borderColor} rounded-3xl p-8 md:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 group h-full`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Decorative background elements */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Icon and Title */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="text-5xl md:text-6xl group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4 group-hover:text-blue-200 transition-colors duration-300">
                          {feature.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-lg leading-relaxed flex-grow group-hover:text-gray-200 transition-colors duration-300">
                      {feature.description}
                    </p>

                    {/* Bottom accent */}
                    <div className="mt-8 pt-6 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400 font-medium">
                          Funkce #{index + 1}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </StackingCardItem>
            ))}
          </StackingCards>
        </div>

        {/* Call to Action */}
        <div ref={ctaRef} className="text-center mt-16">
          <p className="text-gray-400 mb-8 text-lg">
            Každá funkce je navržena tak, aby přinesla maximální hodnotu vašemu projektu
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 text-lg font-light tracking-wide rounded-full border-2 text-white border-white hover:bg-white/5 hover:border-white/60 hover:text-white transition-all duration-500 transform hover:scale-105 bg-transparent"
          >
            <span className="relative z-10">Prozkoumat služby</span>
          </a>
        </div>
      </div>
    </section>
  );
}
