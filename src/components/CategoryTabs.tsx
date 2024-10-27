import React from 'react';
import { Utensils, Coffee, IceCream } from 'lucide-react';
import type { Category } from '../types';

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils':
        return <Utensils className="w-5 h-5" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5" />;
      case 'IceCream':
        return <IceCream className="w-5 h-5" />;
      default:
        return <Utensils className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex justify-center space-x-4">
      {categories.map(({ id, name, icon }) => (
        <button
          key={id}
          onClick={() => onCategoryChange(id)}
          className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all
            ${activeCategory === id 
              ? 'bg-emerald-600 text-white shadow-lg transform scale-105' 
              : 'bg-white text-gray-600 hover:bg-gray-50 hover:scale-102'
            }`}
        >
          {getIcon(icon)}
          <span className="font-medium">{name}</span>
        </button>
      ))}
    </div>
  );
}