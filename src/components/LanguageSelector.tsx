import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const flags = {
  en: '🇺🇸',
  tr: '🇹🇷',
  de: '🇩🇪',
};

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex space-x-2">
      {Object.entries(flags).map(([lang, flag]) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang as 'en' | 'tr' | 'de')}
          className={`p-2 rounded-lg ${
            language === lang 
              ? 'bg-emerald-100 text-emerald-700' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <span className="text-xl">{flag}</span>
        </button>
      ))}
    </div>
  );
}