'use client';

import { useState } from 'react';

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
      <div className="flex items-center px-6 py-4">
        
        {/* Left Side - Social Icons and Use for free */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white text-black px-3 py-1.5 rounded-full text-sm font-medium">
            <span>Použít zdarma</span>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
          
          {/* Social Icons */}
          <div className="flex items-center space-x-3">
            <button className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </button>
            
            <button className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </button>
            
            <button className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Center - Navigation with Logo - Absolutely centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-8">
          <button
            onClick={() => scrollToSection('projects')}
            onMouseEnter={() => setActiveItem('projects')}
            onMouseLeave={() => setActiveItem(null)}
            className={`text-sm font-medium transition-colors ${
              activeItem === 'projects' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Projekty
          </button>
          
          {/* Central Logo */}
          <div className="relative">
            <img 
              src="/ikonka.png" 
              alt="Logo" 
              className="w-16 h-16 object-contain cursor-pointer hover:scale-110 transition-transform"
            />
            
            {/* About link below logo */}
            <button
              onClick={() => scrollToSection('about')}
              onMouseEnter={() => setActiveItem('about')}
              onMouseLeave={() => setActiveItem(null)}
              className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-sm font-medium transition-colors ${
                activeItem === 'about' ? 'text-orange-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              O mně
            </button>
          </div>
          
          <button
            onClick={() => scrollToSection('products')}
            onMouseEnter={() => setActiveItem('products')}
            onMouseLeave={() => setActiveItem(null)}
            className={`text-sm font-medium transition-colors ${
              activeItem === 'products' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Služby
          </button>
        </div>

        {/* Right Side - Theme Toggle */}
        <div className="flex items-center ml-auto">
          <button className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
