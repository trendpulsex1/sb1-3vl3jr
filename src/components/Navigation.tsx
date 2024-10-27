import React from 'react';
import { ChefHat } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

interface NavigationProps {
  view: 'customer' | 'admin';
  onChangeView: (view: 'customer' | 'admin') => void;
}

export default function Navigation({ view, onChangeView }: NavigationProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <ChefHat className="w-8 h-8 text-emerald-600" />
            <h1 className="text-2xl font-bold text-gray-800">Restaurant Name</h1>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <button
              onClick={() => onChangeView('customer')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === 'customer'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t('customerView')}
            </button>
            <button
              onClick={() => onChangeView('admin')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === 'admin'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t('admin')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}