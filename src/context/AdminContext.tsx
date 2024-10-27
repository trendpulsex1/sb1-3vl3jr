import React, { createContext, useContext, useState } from 'react';
import type { Admin } from '../types';

interface AdminContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  admins: Admin[];
  addAdmin: (username: string, password: string) => void;
  removeAdmin: (id: string) => void;
}

const defaultAdmins: Admin[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin12345',
    createdAt: new Date(),
  },
];

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admins, setAdmins] = useState<Admin[]>(defaultAdmins);

  const login = (username: string, password: string) => {
    const admin = admins.find(
      (a) => a.username === username && a.password === password
    );
    if (admin) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const addAdmin = (username: string, password: string) => {
    const newAdmin: Admin = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      password,
      createdAt: new Date(),
    };
    setAdmins((prev) => [...prev, newAdmin]);
  };

  const removeAdmin = (id: string) => {
    setAdmins((prev) => prev.filter((admin) => admin.id !== id));
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        admins,
        addAdmin,
        removeAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}