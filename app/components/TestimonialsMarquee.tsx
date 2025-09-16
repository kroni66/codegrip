'use client';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Spolupráce s CodeGrip byla skvělá zkušenost. Dodali nám moderní e-shop s intuitivním designem, který výrazně zvýšil naše prodeje. Profesionální přístup od začátku až do konce.",
    author: "David Novotný",
    role: "Majitel e-shopu"
  },
  {
    quote: "CodeGrip nám vytvořil komplexní webovou aplikaci pro správu našich projektů. Systém je stabilní, rychlý a splňuje všechny naše požadavky. Doporučuji každému, kdo hledá kvalitní řešení.",
    author: "Lucie Šimková",
    role: "Projektová manažerka"
  },
  {
    quote: "Jsem nadšená z mobilní aplikace, kterou nám CodeGrip vyvinul. Aplikace funguje perfektně na obou platformách a uživatelé si ji velmi chválí. Skvělá práce!",
    author: "Michal Král",
    role: "Technický ředitel"
  },
  {
    quote: "CodeGrip překonal naše očekávání. Z redesignu našich webových stránek jsme získali nejen moderní vzhled, ale také významné zlepšení konverzních poměrů. Spokojenost na všech frontách.",
    author: "Barbora Vojtěchová",
    role: "Marketingová ředitelka"
  },
  {
    quote: "Spolupráce s CodeGrip byla profesionální a efektivní. Dodali nám škálovatelný systém, který roste s naším byznysem. Technická podpora je také na vysoké úrovni.",
    author: "Ondřej Hájek",
    role: "CEO startupu"
  },
  {
    quote: "CodeGrip nám pomohl digitalizovat naše interní procesy. Nový systém výrazně zjednodušil práci našemu týmu a zvýšil efektivitu. Jsme velmi spokojeni s výsledkem.",
    author: "Veronika Benešová",
    role: "Vedoucí oddělení"
  },
  {
    quote: "Výborná kvalita kódu a dodržení termínů. CodeGrip nám vytvořil robustní platformu pro naše klienty, která funguje bez problémů již více než rok. Plná spokojenost.",
    author: "Petr Žižka",
    role: "IT manažer"
  },
  {
    quote: "Z CodeGrip jsme získali nejen technické řešení, ale také skvělého partnera pro další rozvoj. Jejich přístup k řešení problémů je kreativní a efektivní.",
    author: "Helena Machová",
    role: "Produktová manažerka"
  }
];

export const TestimonialsMarquee = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Marquee Container */}
      <div
        className="flex animate-marquee"
        style={{
          animation: 'marquee 30s linear infinite'
        }}
      >
        {/* First set of testimonials */}
        {testimonials.concat(testimonials).map((testimonial, index) => (
          <div
            key={`first-${index}`}
            className="flex-shrink-0 w-80 mx-4"
          >
            <Card className="bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full">
              <CardContent className="p-6">
                <blockquote className="text-gray-300 mb-4 leading-relaxed text-sm">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mr-3 flex items-center justify-center text-white text-sm font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-white text-sm">{testimonial.author}</div>
                    <div className="text-xs text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Gradient overlays for smooth edges */}
      <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-neutral-950 to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-neutral-950 to-transparent z-10"></div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        .hover\:pause-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
