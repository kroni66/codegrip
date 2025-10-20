'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CardWithLines, CardBody, serviceCards } from './ServiceCard';

interface ScrollInPlaceCardsProps {
  className?: string;
}

export const ScrollInPlaceCards: React.FC<ScrollInPlaceCardsProps> = ({
  className = ''
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Header animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: false, margin: '-100px' }}
        className="text-center mb-20"
      >
        <div id="services-heading">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-center tracking-wide text-white leading-tight">
            Naše služby
          </h2>
        </div>
        <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
          Profesionální designové služby pro vaši značku a digitální přítomnost
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {serviceCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.8,
                delay: index * 0.15,
                ease: 'easeOut'
              }
            }}
            viewport={{ once: false, margin: '-100px' }}
            whileHover={{
              y: -8,
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <CardWithLines index={index} className="h-full">
              <CardBody cardContent={card} className="h-full flex flex-col" />
            </CardWithLines>
          </motion.div>
        ))}
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-pink-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default ScrollInPlaceCards;
