import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import Navigation from './Navigation';
import CategoryTabs from './CategoryTabs';
import MenuCard from './MenuCard';
import Cart from './Cart';
import OrderStatus from './OrderStatus';
import AdminPanel from './AdminPanel';
import AdminLogin from './AdminLogin';
import TableSelection from './TableSelection';
import type { MenuItem, OrderItem, Order, Category, Table } from '../types';

// Default menu items
const defaultMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Classic Burger',
    description: 'Juicy beef patty with fresh vegetables',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&h=600',
    category: 'food',
    available: true
  },
  {
    id: '2',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with caesar dressing',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=800&h=600',
    category: 'food',
    available: true
  },
  {
    id: '3',
    name: 'Cappuccino',
    description: 'Rich espresso with steamed milk foam',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&h=600',
    category: 'drinks',
    available: true
  },
  {
    id: '4',
    name: 'Chocolate Cake',
    description: 'Decadent chocolate layer cake',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&h=600',
    category: 'desserts',
    available: true
  }
];

// Default categories
const defaultCategories: Category[] = [
  { id: 'food', name: 'Main Dishes', icon: 'Utensils' },
  { id: 'drinks', name: 'Drinks', icon: 'Coffee' },
  { id: 'desserts', name: 'Desserts', icon: 'IceCream' }
];

export default function AppContent() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAdmin();
  const [view, setView] = useState<'customer' | 'admin'>('customer');
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [activeCategory, setActiveCategory] = useState('food');
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(defaultMenuItems);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [orders, setOrders] = useState<Order[]>([]);
  const [tables, setTables] = useState<Table[]>([]);

  // Initialize tables if empty
  useEffect(() => {
    if (tables.length === 0) {
      setTables([
        { id: '1', number: '1', capacity: 4, status: 'available', isOccupied: false },
        { id: '2', number: '2', capacity: 6, status: 'available', isOccupied: false },
        { id: '3', number: '3', capacity: 2, status: 'available', isOccupied: false },
        { id: '4', number: '4', capacity: 8, status: 'available', isOccupied: false }
      ]);
    }
  }, []);

  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  const handleAddItem = (item: MenuItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveItem = (item: MenuItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing && existing.quantity > 1) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prev.filter(i => i.id !== item.id);
    });
  };

  const handleSubmitOrder = () => {
    if (!selectedTable) return;
    
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      tableNumber: selectedTable.number,
      customerName,
      phoneNumber,
      items: cartItems,
      status: 'pending',
      totalAmount: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      timestamp: new Date()
    };
    setOrders(prev => [...prev, newOrder]);
    setCurrentOrder(newOrder);
    setCartItems([]);
    setCustomerName('');
    setPhoneNumber('');
    handleUpdateTable(selectedTable.id, { status: 'occupied' });
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(order => {
        if (order.id === orderId) {
          if (status === 'delivered') {
            const table = tables.find(t => t.number === order.tableNumber);
            if (table) {
              handleUpdateTable(table.id, { status: 'available' });
            }
          }
          return { ...order, status };
        }
        return order;
      })
    );
    if (currentOrder?.id === orderId) {
      setCurrentOrder(prev => prev ? { ...prev, status } : null);
    }
  };

  const handleAddTable = (table: Omit<Table, 'id'>) => {
    const newTable: Table = {
      ...table,
      id: Math.random().toString(36).substr(2, 9)
    };
    setTables(prev => [...prev, newTable]);
  };

  const handleUpdateTable = (id: string, updates: Partial<Table>) => {
    setTables(prev =>
      prev.map(table =>
        table.id === id ? { ...table, ...updates } : table
      )
    );
  };

  const handleDeleteTable = (id: string) => {
    setTables(prev => prev.filter(table => table.id !== id));
  };

  const handleSelectTable = (tableId: string) => {
    const table = tables.find(t => t.id === tableId);
    if (table) {
      setSelectedTable(table);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        view={view}
        onChangeView={setView}
      />

      {view === 'customer' ? (
        !selectedTable ? (
          <TableSelection
            tables={tables}
            onSelectTable={handleSelectTable}
          />
        ) : (
          <div className="pb-32">
            <main className="max-w-5xl mx-auto px-4 py-8">
              <p className="mb-4 text-gray-600">{t('table')} {selectedTable.number}</p>
              <CategoryTabs
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {filteredItems.map(item => (
                  <MenuCard
                    key={item.id}
                    item={item}
                    quantity={cartItems.find(i => i.id === item.id)?.quantity || 0}
                    onAdd={() => handleAddItem(item)}
                    onRemove={() => handleRemoveItem(item)}
                  />
                ))}
              </div>
            </main>

            {cartItems.length > 0 && (
              <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.1)] p-4">
                <div className="max-w-lg mx-auto">
                  <Cart
                    items={cartItems}
                    tableNumber={selectedTable.number}
                    customerName={customerName}
                    phoneNumber={phoneNumber}
                    onCustomerNameChange={setCustomerName}
                    onPhoneNumberChange={setPhoneNumber}
                    onRemoveItem={(id) => setCartItems(prev => prev.filter(i => i.id !== id))}
                    onSubmitOrder={handleSubmitOrder}
                  />
                </div>
              </div>
            )}

            {currentOrder && (
              <OrderStatus order={currentOrder} />
            )}
          </div>
        )
      ) : (
        !isAuthenticated ? (
          <AdminLogin />
        ) : (
          <AdminPanel
            menuItems={menuItems}
            categories={categories}
            orders={orders}
            tables={tables}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onAddMenuItem={item => setMenuItems(prev => [...prev, { ...item, id: Math.random().toString(36).substr(2, 9) }])}
            onUpdateMenuItem={(id, updates) => setMenuItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item))}
            onDeleteMenuItem={id => setMenuItems(prev => prev.filter(item => item.id !== id))}
            onAddCategory={category => setCategories(prev => [...prev, { ...category, id: Math.random().toString(36).substr(2, 9) }])}
            onDeleteCategory={id => setCategories(prev => prev.filter(cat => cat.id !== id))}
            onAddTable={handleAddTable}
            onUpdateTable={handleUpdateTable}
            onDeleteTable={handleDeleteTable}
          />
        )
      )}
    </div>
  );
}