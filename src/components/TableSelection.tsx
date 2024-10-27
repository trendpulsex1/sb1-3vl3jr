import React from 'react';
import { Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { Table } from '../types';

interface TableSelectionProps {
  tables: Table[];
  onSelectTable: (tableId: string) => void;
}

export default function TableSelection({ tables, onSelectTable }: TableSelectionProps) {
  const { t } = useLanguage();

  const getStatusColor = (status: Table['status']) => {
    switch (status) {
      case 'available':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'occupied':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('selectTable')}</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Please select an available table to start your order
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tables.map((table) => (
            <button
              key={table.id}
              onClick={() => table.status === 'available' && onSelectTable(table.id)}
              disabled={table.status !== 'available'}
              className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                table.status === 'available'
                  ? 'bg-white shadow-md hover:shadow-lg hover:-translate-y-1'
                  : 'bg-gray-50 cursor-not-allowed opacity-75'
              } ${getStatusColor(table.status)}`}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className={`p-3 rounded-full ${getStatusColor(table.status)}`}>
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-lg font-semibold">{t('table')} {table.number}</span>
                <span className={`text-sm px-3 py-1 rounded-full ${getStatusColor(table.status)}`}>
                  {t(table.status)}
                </span>
                <span className="text-sm text-gray-600">
                  {t('capacity')}: {table.capacity}
                </span>
              </div>
              
              {table.status === 'available' && (
                <div className="absolute inset-0 flex items-center justify-center bg-emerald-500 bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 rounded-xl">
                  <span className="opacity-0 hover:opacity-100 text-emerald-700 font-medium">
                    Select Table
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}