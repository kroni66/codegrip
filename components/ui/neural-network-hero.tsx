'use client'

import { Sparkles } from './sparkles'

interface HeroProps {
  title: string
  description: string
  badgeText?: string
  badgeLabel?: string
  ctaButtons?: Array<{ text: string; href: string; primary?: boolean }>
  microDetails?: string[]
}

export default function Hero({
  title,
  description,
  badgeText,
  badgeLabel,
  ctaButtons = [],
  microDetails = []
}: HeroProps) {
  return (
    <div className="relative flex items-center justify-center min-h-screen px-6 overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-800/50 to-neutral-900">
      {/* Background glow and arc, matching reference */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(80%_80%,white,transparent_95%)]">
        {/* Purple glow rising from bottom center */}
        <div className="absolute inset-0 before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,var(--gradient-color),transparent_70%)] before:opacity-100" />
        {/* Additional purple bloom */}
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[140%] h-[70%] bg-[radial-gradient(closest-side,rgba(131,80,232,0.6),transparent_60%)] blur-3xl" />
        {/* Big arc ellipse */}
        <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] w-[200%] rounded-[100%] border-t border-white/15 bg-neutral-300/70 dark:bg-neutral-800/70" />
        {/* Soft vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(140%_90%_at_50%_0%,transparent,rgba(0,0,0,0.2))]" />
      </div>

      {/* Sparkles Background */}
      <Sparkles
        density={1200}
        size={0.5}
        minSize={0.2}
        className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(80%_80%,white,transparent_90%)] mix-blend-screen"
        color="rgba(131,80,232,1)"
      />

      <div className="text-center max-w-4xl mx-auto relative z-10">
        {/* Badge */}
        {badgeText && (
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium text-white">
              {badgeText}
              {badgeLabel && (
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {badgeLabel}
                </span>
              )}
            </span>
          </div>
        )}

        {/* Main Title */}
        <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-extralight leading-[0.9] tracking-tight text-white mb-6">
          {title}
        </h1>

        {/* Description */}
        <p className="hero-description text-xl md:text-2xl lg:text-3xl font-light leading-relaxed tracking-tight text-white/80 mb-12 max-w-3xl mx-auto">
          {description}
        </p>

        {/* CTA Buttons */}
        {ctaButtons.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            {ctaButtons.map((button, index) => (
              <a
                key={index}
                href={button.href}
                className={`group px-8 py-4 text-lg font-light tracking-wide rounded-full border-2 transition-all duration-500 transform hover:scale-105 inline-flex items-center justify-center ${
                  button.primary
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-purple-500 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/25'
                    : 'text-white border-white hover:bg-white/5 hover:border-white/60'
                }`}
              >
                <span className="relative z-10">{button.text}</span>
              </a>
            ))}
          </div>
        )}

        {/* Micro Details */}
        {microDetails.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-light text-white/60">
            {microDetails.map((detail, index) => (
              <span key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                {detail}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
