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
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-r from-neutral-900/95 to-neutral-950/95 backdrop-blur-xl border-t border-neutral-800/50 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Content */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">
              🍪 Používáme cookies
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Naše webové stránky používají soubory cookies pro lepší uživatelskou zkušenost,
              analytiku a personalizaci obsahu. Pokračováním v používání této stránky
              souhlasíte s našimi zásadami používání cookies.
            </p>
            <div className="mt-2 text-xs text-gray-400">
              Více informací najdete v našich{' '}
              <a href="#" className="text-purple-400 hover:text-purple-300 underline">
                Zásadách používání cookies
              </a>{' '}
              a{' '}
              <a href="#" className="text-purple-400 hover:text-purple-300 underline">
                Zásadách ochrany osobních údajů
              </a>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 items-start md:items-center">
            <button
              onClick={openSettings}
              className="text-sm text-purple-400 hover:text-purple-300 underline transition-colors"
            >
              Přizpůsobit nastavení
            </button>
            <Button
              onClick={handleReject}
              variant="outline"
              size="sm"
              className="bg-transparent border-neutral-600 text-gray-300 hover:bg-neutral-800 hover:text-white transition-colors"
            >
              Odmítnout
            </Button>
            <Button
              onClick={handleAccept}
              size="sm"
              className="bg-custom-color-2 hover:bg-custom-color-1 text-white shadow-lg hover:shadow-custom-color-2/25 transition-all duration-300"
            >
              Přijmout vše
            </Button>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 p-1 text-gray-400 hover:text-white transition-colors"
            aria-label="Zavřít banner"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress indicator */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 h-1 bg-neutral-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-custom-color-1 to-custom-color-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
          <span className="text-xs text-gray-500">Automaticky zavřeno za 30s</span>
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
