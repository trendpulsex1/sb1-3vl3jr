export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
}

export interface OrderItem extends MenuItem {
  quantity: number;
  specialInstructions?: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';

export interface Order {
  id: string;
  tableNumber: string;
  customerName: string;
  phoneNumber: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  timestamp: Date;
}

export interface Admin {
  id: string;
  username: string;
  password: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Table {
  id: string;
  number: string;
  isOccupied: boolean;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved';
}