import React, { useEffect, useState } from 'react';
import { CheckCircle2, Clock, Timer, Check } from 'lucide-react';
import type { Order } from '../types';

interface OrderStatusProps {
  order: Order;
}

export default function OrderStatus({ order }: OrderStatusProps) {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (order.status === 'ready') {
      setShowNotification(true);
      // Send SMS notification here in a real application
      console.log(`SMS sent to ${order.phoneNumber}: Your order is ready for pickup!`);
    }
  }, [order.status, order.phoneNumber]);

  const steps = [
    { status: 'pending', label: 'Order Placed', icon: Clock },
    { status: 'confirmed', label: 'Confirmed', icon: Check },
    { status: 'preparing', label: 'Preparing', icon: Timer },
    { status: 'ready', label: 'Ready', icon: CheckCircle2 },
  ];

  const currentStepIndex = steps.findIndex(step => step.status === order.status);

  return (
    <div className="fixed inset-x-0 bottom-0 p-4 bg-white shadow-lg border-t">
      <div className="max-w-lg mx-auto">
        {showNotification && (
          <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg flex justify-between items-center">
            <span>Your order is ready for pickup!</span>
            <button
              onClick={() => setShowNotification(false)}
              className="text-green-800 hover:text-green-900"
            >
              ×
            </button>
          </div>
        )}

        <div className="relative">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${(currentStepIndex + 1) * 25}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500 transition-all duration-500"
            />
          </div>

          <div className="flex justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= currentStepIndex;
              return (
                <div
                  key={step.status}
                  className={`flex flex-col items-center ${
                    isActive ? 'text-emerald-600' : 'text-gray-400'
                  }`}
                >
                  <Icon className="w-6 h-6 mb-2" />
                  <span className="text-xs font-medium">{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}