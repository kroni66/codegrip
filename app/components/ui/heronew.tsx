'use client'

import NextImage from 'next/image'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Script from 'next/script'

type CTA = {
  text: string
  href: string
  primary?: boolean
}

export type HeroNewProps = {
  title: string
  description: string
  backgroundUrl?: string
  badgeText?: string
  badgeLabel?: string
  ctaButtons?: CTA[]
  microDetails?: string[]
  className?: string
  showBadge?: boolean
  rotatingPrefix?: string
  rotatingWords?: string[]
}

export default function HeroNew({
  title,
  description,
  backgroundUrl = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1920&q=80',
  badgeText = 'CodeGrip',
  badgeLabel = 'New',
  ctaButtons = [
    { text: 'Začít projekt', href: '#footer', primary: true },
    { text: 'Naše služby', href: '#services-heading' },
  ],
  microDetails = ['React & Next.js', 'Moderní design', 'Rychlý vývoj'],
  className,
  showBadge = true,
  rotatingPrefix,
  rotatingWords,
}: HeroNewProps) {
  const [wordIndex, setWordIndex] = useState(0)
  useEffect(() => {
    if (!rotatingWords || rotatingWords.length === 0) return
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % rotatingWords.length)
    }, 1800)
    return () => clearInterval(id)
  }, [rotatingWords])
  return (
    <>
      {/* UnicornStudio Script */}
      <Script
        id="unicorn-studio-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(){
              if(!window.UnicornStudio){
                window.UnicornStudio={isInitialized:!1};
                var i=document.createElement("script");
                i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js",
                i.onload=function(){
                  window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)
                },
                (document.head || document.body).appendChild(i)
              }
            }();
          `
        }}
      />
      
      <section className={`relative w-full overflow-hidden ${className ?? ''}`}>
        {/* UnicornStudio Gradient Background */}
        <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center overflow-hidden">
          <div 
            data-us-project="x4pTgiT0eJM26rH3qmo3" 
            style={{ 
              width: '100%', 
              height: '100%',
              minHeight: '100vh',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 0
            }}
          />
          {/* Subtle grey overlay */}
          <div className="absolute inset-0 bg-gray-900/15 pointer-events-none z-[1]" />
        </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-20 md:pt-28 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image card (glassmorphism + smaller logo) */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative w-[min(80vw,420px)] lg:w-[520px] aspect-[1/1] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-white/5/30 backdrop-blur-xl">
              {/* Soft ambient background gradient inside card */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
              <NextImage
                src={backgroundUrl}
                alt="Hero visual"
                fill
                priority
                sizes="(min-width: 1024px) 520px, 80vw"
                className="object-contain object-center p-10 md:p-12"
              />
              {/* Subtle inner border glow */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
              {/* Outer glow */}
              <div className="pointer-events-none absolute -inset-6 rounded-[28px] bg-purple-500/10 blur-3xl" />
            </div>
          </div>

          {/* Text content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            {/* Badge */}
            {showBadge && (
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-white/90 backdrop-blur-sm mb-6">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-purple-500/80 text-[10px]">{badgeLabel}</span>
                <span className="text-sm tracking-wide">{badgeText}</span>
              </div>
            )}

            {/* Title */}
            {rotatingWords && rotatingWords.length > 0 ? (
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight leading-[1.05] tracking-tight text-white mb-6">
                {rotatingPrefix ? (
                  <>
                    {rotatingPrefix} {" "}
                    <span className="relative inline-flex items-baseline min-w-[8ch] h-[1em] align-baseline">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={rotatingWords[wordIndex]}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                          className="text-white font-light"
                        >
                          {rotatingWords[wordIndex]}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </>
                ) : (
                  <>
                    <span className="relative inline-flex items-baseline min-w-[8ch] h-[1em] align-baseline">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={rotatingWords[wordIndex]}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                          className="text-white font-light"
                        >
                          {rotatingWords[wordIndex]}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </>
                )}
              </h1>
            ) : (
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight leading-[1.05] tracking-tight text-white mb-6">
                {title}
              </h1>
            )}

            {/* Description */}
            <p className="text-lg md:text-2xl text-white/80 leading-relaxed max-w-2xl lg:max-w-none mx-auto lg:mx-0 mb-10">
              {description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 md:gap-6 mb-12">
              {ctaButtons.map((btn, i) => (
                <a
                  key={`${btn.text}-${i}`}
                  href={btn.href}
                  className={`hero-cta group relative inline-flex items-center justify-center rounded-full border-2 px-8 py-4 text-lg font-light tracking-wide transition-all duration-500 hover:scale-[1.03] ${
                    btn.primary
                      ? 'bg-white/10 text-white border-white/30 backdrop-blur-sm hover:bg-white/20 hover:border-white/50'
                      : 'text-white/90 border-white/20 hover:bg-white/5 hover:border-white/40 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{btn.text}</span>
                  {btn.primary && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  )}
                </a>
              ))}
            </div>

            {/* Micro details */}
            <div className="flex flex-wrap items-center lg:items-center justify-center lg:justify-start gap-6 text-sm font-light tracking-wide text-white/70">
              {microDetails.map((detail, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  )
}
