import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Users, Grid, Coffee, DollarSign, UserPlus, Layers, Utensils, IceCream, Pizza, Sandwich } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';
import TableManagement from './TableManagement';
import type { MenuItem, Category, Order, Table } from '../types';

interface AdminPanelProps {
  menuItems: MenuItem[];
  categories: Category[];
  orders: Order[];
  tables: Table[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onAddMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  onUpdateMenuItem: (id: string, item: Partial<MenuItem>) => void;
  onDeleteMenuItem: (id: string) => void;
  onAddCategory: (category: Omit<Category, 'id'>) => void;
  onDeleteCategory: (id: string) => void;
  onAddTable: (table: Omit<Table, 'id'>) => void;
  onUpdateTable: (id: string, updates: Partial<Table>) => void;
  onDeleteTable: (id: string) => void;
}

export default function AdminPanel({
  menuItems,
  categories,
  orders,
  tables,
  onUpdateOrderStatus,
  onAddMenuItem,
  onUpdateMenuItem,
  onDeleteMenuItem,
  onAddCategory,
  onDeleteCategory,
  onAddTable,
  onUpdateTable,
  onDeleteTable,
}: AdminPanelProps) {
  const { admins, addAdmin, removeAdmin, logout } = useAdmin();
  const { t, formatPrice } = useLanguage();
  const [activeTab, setActiveTab] = useState<'menu' | 'categories' | 'admins' | 'orders' | 'tables' | 'finance'>('orders');
  const [newItemForm, setNewItemForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    available: true,
  });
  const [newAdmin, setNewAdmin] = useState({ username: '', password: '' });
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    icon: 'Utensils',
  });

  const handleAddNewItem = () => {
    if (!newItemForm.name || !newItemForm.price || !newItemForm.category) return;
    
    onAddMenuItem({
      name: newItemForm.name,
      description: newItemForm.description,
      price: parseFloat(newItemForm.price),
      image: newItemForm.image,
      category: newItemForm.category,
      available: newItemForm.available,
    });

    setNewItemForm({
      name: '',
      description: '',
      price: '',
      image: '',
      category: '',
      available: true,
    });
  };

  const handleAddNewAdmin = () => {
    if (!newAdmin.username || !newAdmin.password) return;
    addAdmin(newAdmin.username, newAdmin.password);
    setNewAdmin({ username: '', password: '' });
  };

  const handleAddNewCategory = () => {
    if (!newCategory.name || !newCategory.icon) return;
    onAddCategory(newCategory);
    setNewCategory({ name: '', icon: 'Utensils' });
  };

  // Calculate total revenue for today
  const today = new Date().toDateString();
  const todayOrders = orders.filter(order => new Date(order.timestamp).toDateString() === today);
  const totalRevenue = todayOrders.reduce((sum, order) => sum + order.totalAmount, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">{t('adminPanel')}</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          {t('logout')}
        </button>
      </div>

      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
        <TabButton
          active={activeTab === 'orders'}
          onClick={() => setActiveTab('orders')}
          icon={<Grid className="w-5 h-5" />}
          label={t('orders')}
        />
        <TabButton
          active={activeTab === 'menu'}
          onClick={() => setActiveTab('menu')}
          icon={<Coffee className="w-5 h-5" />}
          label={t('menuItems')}
        />
        <TabButton
          active={activeTab === 'categories'}
          onClick={() => setActiveTab('categories')}
          icon={<Layers className="w-5 h-5" />}
          label={t('categories')}
        />
        <TabButton
          active={activeTab === 'tables'}
          onClick={() => setActiveTab('tables')}
          icon={<Users className="w-5 h-5" />}
          label={t('tables')}
        />
        <TabButton
          active={activeTab === 'admins'}
          onClick={() => setActiveTab('admins')}
          icon={<UserPlus className="w-5 h-5" />}
          label={t('admins')}
        />
        <TabButton
          active={activeTab === 'finance'}
          onClick={() => setActiveTab('finance')}
          icon={<DollarSign className="w-5 h-5" />}
          label={t('finance')}
        />
      </div>

      {activeTab === 'categories' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">{t('addCategory')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={t('categoryName')}
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                className="px-4 py-2 border rounded-lg"
              />
              <select
                value={newCategory.icon}
                onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="Utensils">Utensils</option>
                <option value="Coffee">Coffee</option>
                <option value="IceCream">Ice Cream</option>
                <option value="Pizza">Pizza</option>
                <option value="Sandwich">Sandwich</option>
              </select>
              <button
                onClick={handleAddNewCategory}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                {t('addCategory')}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    {category.icon === 'Utensils' && <Utensils className="w-5 h-5" />}
                    {category.icon === 'Coffee' && <Coffee className="w-5 h-5" />}
                    {category.icon === 'IceCream' && <IceCream className="w-5 h-5" />}
                    {category.icon === 'Pizza' && <Pizza className="w-5 h-5" />}
                    {category.icon === 'Sandwich' && <Sandwich className="w-5 h-5" />}
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <button
                    onClick={() => onDeleteCategory(category.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'admins' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">{t('addAdmin')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={t('username')}
                value={newAdmin.username}
                onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
                className="px-4 py-2 border rounded-lg"
              />
              <input
                type="password"
                placeholder={t('password')}
                value={newAdmin.password}
                onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                className="px-4 py-2 border rounded-lg"
              />
              <button
                onClick={handleAddNewAdmin}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                {t('addAdmin')}
              </button>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">{t('adminList')}</h3>
            <div className="space-y-4">
              {admins.map((admin) => (
                <div key={admin.id} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{admin.username}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(admin.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {admin.id !== '1' && (
                    <button
                      onClick={() => removeAdmin(admin.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">{t('todaysOrders')}</h2>
          <div className="space-y-4">
            {todayOrders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-medium">Table {order.tableNumber}</span>
                    <span className="text-gray-500 text-sm ml-2">
                      {new Date(order.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <select
                    value={order.status}
                    onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                    className="px-3 py-1 border rounded-lg"
                  >
                    <option value="pending">{t('pending')}</option>
                    <option value="preparing">{t('preparing')}</option>
                    <option value="ready">{t('ready')}</option>
                    <option value="delivered">{t('delivered')}</option>
                  </select>
                </div>
                <div className="space-y-1">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t flex justify-between">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold">{formatPrice(order.totalAmount)}</span>
                </div>
              </div>
            ))}
            {todayOrders.length === 0 && (
              <p className="text-center text-gray-500 py-4">{t('noOrders')}</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'menu' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">{t('addItem')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={t('itemName')}
                value={newItemForm.name}
                onChange={(e) => setNewItemForm({ ...newItemForm, name: e.target.value })}
                className="px-4 py-2 border rounded-lg"
              />
              <input
                type="number"
                placeholder={t('price')}
                value={newItemForm.price}
                onChange={(e) => setNewItemForm({ ...newItemForm, price: e.target.value })}
                className="px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder={t('description')}
                value={newItemForm.description}
                onChange={(e) => setNewItemForm({ ...newItemForm, description: e.target.value })}
                className="px-4 py-2 border rounded-lg"
              />
              <select
                value={newItemForm.category}
                onChange={(e) => setNewItemForm({ ...newItemForm, category: e.target.value })}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="">{t('category')}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Image URL"
                value={newItemForm.image}
                onChange={(e) => setNewItemForm({ ...newItemForm, image: e.target.value })}
                className="px-4 py-2 border rounded-lg"
              />
              <button
                onClick={handleAddNewItem}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                {t('addItem')}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">{formatPrice(item.price)}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDeleteMenuItem(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'tables' && (
        <TableManagement
          tables={tables}
          onAddTable={onAddTable}
          onUpdateTable={onUpdateTable}
          onDeleteTable={onDeleteTable}
        />
      )}

      {activeTab === 'finance' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">{t('finance')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-emerald-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-emerald-800 mb-2">Today's Revenue</h3>
              <p className="text-3xl font-bold text-emerald-600">{formatPrice(totalRevenue)}</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-2">Orders Today</h3>
              <p className="text-3xl font-bold text-blue-600">{todayOrders.length}</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-purple-800 mb-2">Average Order Value</h3>
              <p className="text-3xl font-bold text-purple-600">
                {todayOrders.length > 0
                  ? formatPrice(totalRevenue / todayOrders.length)
                  : formatPrice(0)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap ${
        active
          ? 'bg-emerald-100 text-emerald-700'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}