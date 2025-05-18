
import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
type User = {
  id: string;
  name: string;
  email: string;
  orcidId: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
};

// Mock user data
const MOCK_USERS = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    orcidId: '0000-0001-2345-6789',
    password: 'password123',
    avatar: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    email: 'maria@example.com',
    orcidId: '0000-0002-3456-7890',
    password: 'password123',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
];

// Create context
const AuthContext = createContext<AuthContextType | null>(null);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('tea_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data');
        localStorage.removeItem('tea_user');
      }
    }
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    const foundUser = MOCK_USERS.find(u => 
      (u.email === email || u.orcidId === email) && u.password === password
    );
    
    if (!foundUser) {
      throw new Error('Invalid credentials');
    }
    
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('tea_user', JSON.stringify(userWithoutPassword));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('tea_user');
  };

  // Register function
  const register = async (userData: Omit<User, 'id'> & { password: string }) => {
    // In a real app, this would be an API call
    // For now, just simulate registration success
    const newUser = {
      ...userData,
      id: String(MOCK_USERS.length + 1),
    };
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('tea_user', JSON.stringify(userWithoutPassword));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
