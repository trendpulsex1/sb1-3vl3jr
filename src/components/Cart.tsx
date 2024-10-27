import React from 'react';
import { ShoppingCart, X } from 'lucide-react';
import type { OrderItem } from '../types';

interface CartProps {
  items: OrderItem[];
  tableNumber: string;
  onRemoveItem: (id: string) => void;
  onSubmitOrder: () => void;
  customerName: string;
  phoneNumber: string;
  onCustomerNameChange: (name: string) => void;
  onPhoneNumberChange: (phone: string) => void;
}

export default function Cart({
  items,
  tableNumber,
  onRemoveItem,
  onSubmitOrder,
  customerName,
  phoneNumber,
  onCustomerNameChange,
  onPhoneNumberChange
}: CartProps) {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="w-5 h-5 text-emerald-600" />
          <span className="font-medium">Table {tableNumber}</span>
        </div>
        <span className="font-bold text-lg">${total.toFixed(2)}</span>
      </div>

      <div className="space-y-4 mb-4">
        <input
          type="text"
          placeholder="Your Name"
          value={customerName}
          onChange={(e) => onCustomerNameChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => onPhoneNumberChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
          pattern="[0-9]{10}"
        />
      </div>
      
      <div className="max-h-48 overflow-auto mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-2">
            <div>
              <span className="font-medium">{item.quantity}x</span>
              <span className="ml-2">{item.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>${(item.price * item.quantity).toFixed(2)}</span>
              <button
                onClick={() => onRemoveItem(item.id)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onSubmitOrder}
        disabled={!customerName || !phoneNumber || items.length === 0}
        className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Place Order
      </button>
    </div>
  );
}