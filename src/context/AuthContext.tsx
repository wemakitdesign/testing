
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, UserRole } from '../types/auth';

// Mock users for demonstration
const MOCK_USERS = [
  {
    id: '1',
    name: 'John Client',
    email: 'client@wemakit.com',
    role: 'client' as UserRole,
    avatar: 'https://ui-avatars.com/api/?name=John+Client&background=0D8ABC&color=fff',
  },
  {
    id: '2',
    name: 'Jane Designer',
    email: 'designer@wemakit.com',
    role: 'designer' as UserRole,
    avatar: 'https://ui-avatars.com/api/?name=Jane+Designer&background=8B56F6&color=fff',
  },
  {
    id: '3',
    name: 'Alex Admin',
    email: 'admin@wemakit.com',
    role: 'admin' as UserRole,
    avatar: 'https://ui-avatars.com/api/?name=Alex+Admin&background=111111&color=fff',
  },
];

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for saved auth in localStorage
    const savedUser = localStorage.getItem('wemakit_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('wemakit_user');
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // This is a mock implementation - in a real app, you would call your auth API
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(user => user.email === email);
    
    if (foundUser && password === 'password') { // In a real app, you'd verify the password properly
      setAuthState({
        user: foundUser,
        isAuthenticated: true,
        isLoading: false,
      });
      localStorage.setItem('wemakit_user', JSON.stringify(foundUser));
      return true;
    }
    
    setAuthState(prev => ({ ...prev, isLoading: false }));
    return false;
  };

  const logout = () => {
    localStorage.removeItem('wemakit_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
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
