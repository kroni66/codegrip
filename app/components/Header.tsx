'use client';

import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-sm border-b border-neutral-800">
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-light tracking-wide text-gray-100">
            Lana
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-12">
            <button
              onClick={() => scrollToSection('projects')}
              className="text-white hover:text-gray-200 transition-colors font-light bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Projekty
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-gray-200 transition-colors font-light bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100"
            >
              O mně
            </button>
            <button
              onClick={() => scrollToSection('products')}
              className="text-white hover:text-gray-200 transition-colors font-light bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Služby
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden bg-white text-black px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 pt-6 border-t border-neutral-800">
            <div className="flex flex-col space-y-6">
              <button
                onClick={() => scrollToSection('projects')}
                className="text-left bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors font-light"
              >
                Projekty
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-left bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors font-light"
              >
                O mně
              </button>
              <button
                onClick={() => scrollToSection('products')}
                className="text-left bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors font-light"
              >
                Služby
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
