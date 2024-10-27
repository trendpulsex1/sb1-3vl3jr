import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { Table } from '../types';

interface TableManagementProps {
  tables: Table[];
  onAddTable: (table: Omit<Table, 'id'>) => void;
  onUpdateTable: (id: string, updates: Partial<Table>) => void;
  onDeleteTable: (id: string) => void;
}

export default function TableManagement({
  tables,
  onAddTable,
  onUpdateTable,
  onDeleteTable,
}: TableManagementProps) {
  const { t } = useLanguage();
  const [isAddingTable, setIsAddingTable] = useState(false);
  const [editingTable, setEditingTable] = useState<Table | null>(null);
  const [newTable, setNewTable] = useState({
    number: '',
    capacity: 4,
    status: 'available' as const,
    isOccupied: false,
  });

  const handleAddTable = () => {
    if (!newTable.number) return;
    onAddTable(newTable);
    setNewTable({
      number: '',
      capacity: 4,
      status: 'available',
      isOccupied: false,
    });
    setIsAddingTable(false);
  };

  const handleUpdateTable = () => {
    if (!editingTable) return;
    onUpdateTable(editingTable.id, editingTable);
    setEditingTable(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{t('tables')}</h2>
        <button
          onClick={() => setIsAddingTable(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          <Plus className="w-5 h-5" />
          <span>{t('addTable')}</span>
        </button>
      </div>

      <div className="grid gap-4">
        {tables.map((table) => (
          <div
            key={table.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div>
              <h3 className="font-medium">{t('table')} {table.number}</h3>
              <p className="text-sm text-gray-500">
                {t('capacity')}: {table.capacity} | {t(table.status)}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingTable(table)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDeleteTable(table.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Table Modal */}
      {isAddingTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{t('addTable')}</h3>
              <button
                onClick={() => setIsAddingTable(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('tableNumber')}
                </label>
                <input
                  type="text"
                  value={newTable.number}
                  onChange={(e) => setNewTable({ ...newTable, number: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('capacity')}
                </label>
                <input
                  type="number"
                  value={newTable.capacity}
                  onChange={(e) => setNewTable({ ...newTable, capacity: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <button
                onClick={handleAddTable}
                className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                {t('addTable')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Table Modal */}
      {editingTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{t('editTable')}</h3>
              <button
                onClick={() => setEditingTable(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('tableNumber')}
                </label>
                <input
                  type="text"
                  value={editingTable.number}
                  onChange={(e) => setEditingTable({ ...editingTable, number: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('capacity')}
                </label>
                <input
                  type="number"
                  value={editingTable.capacity}
                  onChange={(e) =>
                    setEditingTable({ ...editingTable, capacity: parseInt(e.target.value) })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('status')}
                </label>
                <select
                  value={editingTable.status}
                  onChange={(e) =>
                    setEditingTable({
                      ...editingTable,
                      status: e.target.value as Table['status'],
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="available">{t('available')}</option>
                  <option value="occupied">{t('occupied')}</option>
                  <option value="reserved">{t('reserved')}</option>
                </select>
              </div>
              <button
                onClick={handleUpdateTable}
                className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                {t('saveChanges')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}