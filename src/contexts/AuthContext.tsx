import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem('streamhub_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in production, this would call your API
    const mockUser: User = {
      id: 'user123',
      username: 'johndoe',
      email,
      avatar: 'https://picsum.photos/id/10/100/100',
      bio: 'Content creator and tech enthusiast',
      followers: 15400,
      following: 324,
      accountType: 'creator',
      isPremium: true,
      verified: true,
      createdAt: new Date('2023-01-15'),
      suspended: false,
      walletBalance: 1250.50,
    };
    setUser(mockUser);
    localStorage.setItem('streamhub_user', JSON.stringify(mockUser));
  };

  const register = async (username: string, email: string, password: string) => {
    const newUser: User = {
      id: `user_${Date.now()}`,
      username,
      email,
      avatar: 'https://picsum.photos/id/11/100/100',
      bio: 'Welcome to StreamHub Pro!',
      followers: 0,
      following: 0,
      accountType: 'viewer',
      isPremium: false,
      verified: false,
      createdAt: new Date(),
      suspended: false,
      walletBalance: 0,
    };
    setUser(newUser);
    localStorage.setItem('streamhub_user', JSON.stringify(newUser));
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('streamhub_user');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('streamhub_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
