import React from 'react';
import { Plus, Minus } from 'lucide-react';
import type { MenuItem } from '../types';

interface MenuCardProps {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export default function MenuCard({ item, quantity, onAdd, onRemove }: MenuCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
          <span className="text-lg font-bold text-emerald-600">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onRemove}
              disabled={quantity === 0}
              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              <Minus className="w-5 h-5 text-gray-600" />
            </button>
            <span className="font-medium text-gray-800 w-8 text-center">{quantity}</span>
            <button
              onClick={onAdd}
              className="p-1 rounded-full bg-emerald-100 hover:bg-emerald-200"
            >
              <Plus className="w-5 h-5 text-emerald-600" />
            </button>
          </div>
          {!item.available && (
            <span className="text-red-500 text-sm font-medium">Out of stock</span>
          )}
        </div>
      </div>
    </div>
  );
}