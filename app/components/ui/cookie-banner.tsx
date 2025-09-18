'use client';

import { useState, useEffect } from 'react';
import { Button } from './button';
import { X, Settings } from 'lucide-react';
import { CookieSettings, CookiePreferences } from './cookie-settings';

interface CookieBannerProps {
  onAccept: () => void;
  onReject: () => void;
  onCustomSettings?: (preferences: CookiePreferences) => void;
}

export function CookieBanner({ onAccept, onReject, onCustomSettings }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Default cookie preferences
  const defaultPreferences: CookiePreferences = {
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  };

  useEffect(() => {
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookie-consent');
    if (!cookieChoice) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    const allPreferences: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-preferences', JSON.stringify(allPreferences));
    setIsVisible(false);
    onAccept();
  };

  const handleReject = () => {
    const minimalPreferences: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    localStorage.setItem('cookie-consent', 'rejected');
    localStorage.setItem('cookie-preferences', JSON.stringify(minimalPreferences));
    setIsVisible(false);
    onReject();
  };

  const handleCustomSettings = (preferences: CookiePreferences) => {
    localStorage.setItem('cookie-consent', 'custom');
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
    setIsVisible(false);
    if (onCustomSettings) {
      onCustomSettings(preferences);
    } else {
      onAccept();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const openSettings = () => {
    setShowSettings(true);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      {/* Liquid glass background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-2xl rounded-t-3xl shadow-2xl border-t border-white/20"></div>
      
      {/* Animated liquid border */}
      <div className="absolute inset-0 rounded-t-3xl">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30 rounded-t-3xl blur-sm animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-transparent to-cyan-400/20 rounded-t-3xl"></div>
      </div>
      
      {/* Liquid droplet effects */}
      <div className="absolute top-2 left-1/4 w-2 h-2 bg-white/30 rounded-full blur-sm animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-3 right-1/3 w-1.5 h-1.5 bg-purple-400/40 rounded-full blur-sm animate-bounce" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1 right-1/4 w-1 h-1 bg-cyan-400/30 rounded-full blur-sm animate-bounce" style={{ animationDelay: '2s' }}></div>
      
      {/* Main content */}
      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6">
          {/* Content */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-sm">
              🍪 Používáme cookies
            </h3>
            <p className="text-gray-200 text-sm leading-relaxed drop-shadow-sm">
              Naše webové stránky používají soubory cookies pro lepší uživatelskou zkušenost,
              analytiku a personalizaci obsahu. Pokračováním v používání této stránky
              souhlasíte s našimi zásadami používání cookies.
            </p>
            <div className="mt-2 text-xs text-gray-300 drop-shadow-sm">
              Více informací najdete v našich{' '}
              <a href="#" className="text-purple-300 hover:text-purple-200 underline transition-colors">
                Zásadách používání cookies
              </a>{' '}
              a{' '}
              <a href="#" className="text-purple-300 hover:text-purple-200 underline transition-colors">
                Zásadách ochrany osobních údajů
              </a>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 items-start md:items-center">
            <button
              onClick={openSettings}
              className="text-sm text-purple-300 hover:text-purple-200 underline transition-colors drop-shadow-sm"
            >
              Přizpůsobit nastavení
            </button>
            <Button
              onClick={handleReject}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/30 text-gray-200 hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm drop-shadow-sm"
            >
              Odmítnout
            </Button>
            <Button
              onClick={handleAccept}
              size="sm"
              className="bg-gradient-to-r from-purple-500/80 to-blue-600/80 hover:from-purple-600/90 hover:to-blue-700/90 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300 backdrop-blur-sm border border-white/20 drop-shadow-sm"
            >
              Přijmout vše
            </Button>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 p-2 text-gray-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-sm drop-shadow-sm"
            aria-label="Zavřít banner"
          >
            <X size={16} />
          </button>
        </div>

        {/* Liquid progress indicator */}
        <div className="mt-4 flex items-center gap-2 px-6 pb-2">
          <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div className="h-full bg-gradient-to-r from-purple-400/60 via-blue-400/60 to-cyan-400/60 rounded-full animate-pulse shadow-inner" style={{ width: '60%' }}></div>
          </div>
          <span className="text-xs text-gray-300 drop-shadow-sm">Automaticky zavřeno za 30s</span>
        </div>
      </div>

      {/* Cookie Settings Modal */}
      <CookieSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSave={handleCustomSettings}
        currentPreferences={defaultPreferences}
      />
    </div>
  );
}

// Hook to manage cookie consent
export function useCookieConsent() {
  const [consent, setConsent] = useState<'accepted' | 'rejected' | 'custom' | null>(null);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    const storedConsent = localStorage.getItem('cookie-consent') as 'accepted' | 'rejected' | 'custom' | null;
    const storedPreferences = localStorage.getItem('cookie-preferences');

    setConsent(storedConsent);

    if (storedPreferences) {
      try {
        const parsedPreferences = JSON.parse(storedPreferences);
        setPreferences(parsedPreferences);
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
      }
    }
  }, []);

  const acceptCookies = () => {
    const allPreferences: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-preferences', JSON.stringify(allPreferences));
    setConsent('accepted');
    setPreferences(allPreferences);
  };

  const rejectCookies = () => {
    const minimalPreferences: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    localStorage.setItem('cookie-consent', 'rejected');
    localStorage.setItem('cookie-preferences', JSON.stringify(minimalPreferences));
    setConsent('rejected');
    setPreferences(minimalPreferences);
  };

  const updatePreferences = (newPreferences: CookiePreferences) => {
    localStorage.setItem('cookie-consent', 'custom');
    localStorage.setItem('cookie-preferences', JSON.stringify(newPreferences));
    setConsent('custom');
    setPreferences(newPreferences);
  };

  return {
    consent,
    preferences,
    acceptCookies,
    rejectCookies,
    updatePreferences,
    hasConsent: consent === 'accepted' || (consent === 'custom' && preferences.analytics)
  };
}
