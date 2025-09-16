'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { EyeCatchingButton_v4 } from './EyeCatchingButton_v4';

export default function CompassMenu() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/95 backdrop-blur-sm border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <img
              src="/ikonka.png"
              alt="CodeGrip Logo"
              className="w-10 h-10 hover:scale-110 transition-transform duration-300"
            />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold tracking-wide text-white hover:text-purple-300 transition-colors duration-300">
                CODEGRIP
              </h1>
            </div>
          </div>

          {/* Navigation Links - Hidden on mobile, shown on desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('about')}
              onMouseEnter={() => setActiveItem('about')}
              onMouseLeave={() => setActiveItem(null)}
              className={`text-sm font-medium transition-colors duration-200 ${
                activeItem === 'about' ? 'text-purple-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              O nás
            </button>
            <button
              onClick={() => scrollToSection('products')}
              onMouseEnter={() => setActiveItem('products')}
              onMouseLeave={() => setActiveItem(null)}
              className={`text-sm font-medium transition-colors duration-200 ${
                activeItem === 'products' ? 'text-purple-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Služby
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              onMouseEnter={() => setActiveItem('projects')}
              onMouseLeave={() => setActiveItem(null)}
              className={`text-sm font-medium transition-colors duration-200 ${
                activeItem === 'projects' ? 'text-purple-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Projekty
            </button>
            <button
              onClick={() => scrollToSection('footer')}
              onMouseEnter={() => setActiveItem('contact')}
              onMouseLeave={() => setActiveItem(null)}
              className={`text-sm font-medium transition-colors duration-200 ${
                activeItem === 'contact' ? 'text-purple-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Kontakt
            </button>
          </nav>

          {/* Right Section - CTA and Social Icons */}
          <div className="flex items-center space-x-4">
            {/* Social Icons - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button size="icon" className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full hover:scale-110 transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.44.645-1.44 1.44s.645 1.44 1.44 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Button>
              <Button size="icon" className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white rounded-full hover:scale-110 transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Button>
            </div>

            {/* CTA Button */}
            <EyeCatchingButton_v4
              onClick={() => scrollToSection('footer')}
              className="text-black px-4 py-2 text-sm font-medium"
            >
              Kontaktujte nás
            </EyeCatchingButton_v4>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-gray-300 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
