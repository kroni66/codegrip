'use client';

import { useState } from 'react';
import { Button } from './button';
import { Settings, Cookie } from 'lucide-react';

interface CookieSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (preferences: CookiePreferences) => void;
  currentPreferences: CookiePreferences;
}

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export function CookieSettings({ isOpen, onClose, onSave, currentPreferences }: CookieSettingsProps) {
  const [preferences, setPreferences] = useState<CookiePreferences>(currentPreferences);

  const handleSave = () => {
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
    onSave(preferences);
    onClose();
  };

  const handleToggle = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Necessary cookies can't be disabled
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600/20 rounded-lg">
                <Settings className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                Nastavení cookies
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            {/* Necessary Cookies */}
            <div className="flex items-start gap-4 p-4 bg-neutral-800/50 rounded-lg">
              <div className="p-2 bg-red-600/20 rounded-lg mt-1">
                <Cookie className="w-4 h-4 text-red-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-white">Nutné cookies</h3>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Tyto cookies jsou nezbytné pro základní funkce webu a nelze je vypnout.
                </p>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-start gap-4 p-4 bg-neutral-800/50 rounded-lg">
              <div className="p-2 bg-blue-600/20 rounded-lg mt-1">
                <Cookie className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-white">Analytické cookies</h3>
                  <button
                    onClick={() => handleToggle('analytics')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.analytics ? 'bg-purple-600' : 'bg-neutral-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.analytics ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Pomáhají nám pochopit, jak návštěvníci používají naše stránky.
                </p>
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-start gap-4 p-4 bg-neutral-800/50 rounded-lg">
              <div className="p-2 bg-green-600/20 rounded-lg mt-1">
                <Cookie className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-white">Marketingové cookies</h3>
                  <button
                    onClick={() => handleToggle('marketing')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.marketing ? 'bg-purple-600' : 'bg-neutral-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.marketing ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Používají se k personalizaci reklam a marketingového obsahu.
                </p>
              </div>
            </div>

            {/* Functional Cookies */}
            <div className="flex items-start gap-4 p-4 bg-neutral-800/50 rounded-lg">
              <div className="p-2 bg-yellow-600/20 rounded-lg mt-1">
                <Cookie className="w-4 h-4 text-yellow-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-white">Funkční cookies</h3>
                  <button
                    onClick={() => handleToggle('functional')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.functional ? 'bg-purple-600' : 'bg-neutral-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.functional ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Umožňují pokročilé funkce a personalizaci.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 bg-transparent border-neutral-600 text-gray-300 hover:bg-neutral-800"
            >
              Zrušit
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
            >
              Uložit nastavení
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
