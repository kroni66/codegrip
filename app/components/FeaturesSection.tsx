"use client"

import Image from "next/image"
import React from "react"
import gsap from 'gsap'
import { useScrollTrigger, fadeInUp, staggerChildren } from '../hooks/useGSAPScrollTrigger'

export type FeatureItem = {
  title: string
  description: string
  imageUrl?: string
  lottieSrc?: string
}

export function FeaturesSection({ items }: { items: FeatureItem[] }) {
  return (
    <section
      ref={useScrollTrigger((element) => {
        const titleElement = element.querySelector('h2');
        const descriptionElement = element.querySelector('p');

        const titleAnimation = titleElement ? fadeInUp(titleElement, 0.3) : gsap.timeline();
        const descriptionAnimation = descriptionElement ? fadeInUp(descriptionElement, 0.5) : gsap.timeline();

        const featuresAnimation = staggerChildren(element, '.feature-item', 0.7);

        return gsap.timeline()
          .add(titleAnimation)
          .add(descriptionAnimation, '-=0.8')
          .add(featuresAnimation, '-=0.4');
      })}
      className="py-20 px-6 bg-gradient-to-b from-[#0b0218] via-[#12032a] to-[#1a0838]"
    >
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white">Klíčové funkce</h2>
          <p className="mt-3 text-base md:text-lg text-white/60">To nejdůležitější, co vašemu projektu přinese skutečnou hodnotu.</p>
        </header>

        <div className="space-y-16 md:space-y-24">
          {items.map((item, idx) => {
            const isEven = idx % 2 === 0
            return (
              <div key={idx} className="feature-item grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                {/* Text */}
                <div className={`${isEven ? "order-2 lg:order-1" : "order-2"} text-left`}>
                  <h3 className="text-2xl md:text-3xl text-white font-light mb-4">{item.title}</h3>
                  <p className="text-white/70 text-base md:text-lg leading-relaxed">{item.description}</p>
                </div>

                {/* Visual: Lottie or Image */}
                <div className={`${isEven ? "order-1 lg:order-2" : "order-1"} relative group`}>
                  <div className="relative h-[260px] md:h-[360px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-black/20 flex items-center justify-center">
                    {item.lottieSrc ? (
                      // eslint-disable-next-line react/no-unknown-property
                      <lottie-player
                        autoplay
                        loop
                        background="transparent"
                        speed="1"
                        // @ts-ignore - web component attribute
                        src={item.lottieSrc}
                        style={{ width: '100%', height: '100%' }}
                      ></lottie-player>
                    ) : item.imageUrl ? (
                      <>
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          sizes="(min-width: 1024px) 560px, 100vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          priority={idx === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                      </>
                    ) : null}
                  </div>
                  {/* Ambient glow */}
                  <div className="absolute -inset-6 -z-10 rounded-[28px] bg-purple-500/10 blur-3xl" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
