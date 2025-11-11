import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Screen, Role, User, Notification } from '../types';

interface AppContextType {
  screen: Screen;
  setScreen: (screen: Screen) => void;
  role: Role | null;
  setRole: (role: Role | null) => void;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [screen, setScreen] = useState<Screen>(Screen.SPLASH);
  const [role, setRole] = useState<Role | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const login = (userData: User) => {
    setUser(userData);
    setRole(userData.role);
    setScreen(Screen.DASHBOARD);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setScreen(Screen.LAUNCH);
  };
  
  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const newNotification = { ...notification, id: Date.now() };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(note => note.id !== id));
  };

  const value = { screen, setScreen, role, setRole, user, login, logout, notifications, addNotification, removeNotification };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};