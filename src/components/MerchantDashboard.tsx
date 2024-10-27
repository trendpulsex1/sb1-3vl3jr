import React from 'react';
import { Clock, CheckCircle2, Timer, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { Order } from '../types';

interface MerchantDashboardProps {
  orders: Order[];
}

export default function MerchantDashboard({ orders }: MerchantDashboardProps) {
  const { t, formatPrice } = useLanguage();

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    preparing: 'bg-blue-100 text-blue-800',
    ready: 'bg-green-100 text-green-800',
    delivered: 'bg-gray-100 text-gray-800',
  };

  const statusIcons = {
    pending: Clock,
    preparing: Timer,
    ready: CheckCircle2,
    delivered: Check,
  };

  // Only show today's orders
  const todayOrders = orders.filter(order => {
    const orderDate = new Date(order.timestamp);
    const today = new Date();
    return orderDate.toDateString() === today.toDateString();
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('todaysOrders')}</h2>
      <div className="grid gap-6">
        {todayOrders.map((order) => {
          const StatusIcon = statusIcons[order.status];
          return (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">{t('table')} {order.tableNumber}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
                      <div className="flex items-center space-x-1">
                        <StatusIcon className="w-4 h-4" />
                        <span>{t(order.status)}</span>
                      </div>
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(order.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                <span className="text-lg font-bold text-emerald-600">
                  {formatPrice(order.totalAmount)}
                </span>
              </div>

              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-gray-700">
                    <span>{item.quantity}x {item.name}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        {todayOrders.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500">{t('noOrders')}</p>
          </div>
        )}
      </div>
    </div>
  );
}