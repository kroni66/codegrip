'use client';
import { motion } from 'framer-motion';
import { Dots_v1 } from './Dots_v1';

interface PreloaderProps {
  isLoading: boolean;
  onLoadingComplete: () => void;
}

export const Preloader = ({ isLoading, onLoadingComplete }: PreloaderProps) => {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950"
    >
      <div className="text-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <img
            src="/ikonka.png"
            alt="CodeGrip Logo"
            className="w-24 h-24 mx-auto object-contain"
          />
        </motion.div>

        {/* Loading Dots */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white"
        >
          <Dots_v1 />
        </motion.div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-gray-400 mt-4 text-sm"
        >
          Načítání...
        </motion.p>
      </div>
    </motion.div>
  );
};
