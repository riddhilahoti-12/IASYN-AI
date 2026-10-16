import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { authService, LoginCredentials } from '../services/authService';
import { setUnauthorizedHandler, getApiAuthToken } from '../services/apiClient';

interface AuthContextType {
  currentUser: UserProfile | null;
  activeRole: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  login: (credentials: LoginCredentials) => Promise<UserProfile>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [activeRole, setActiveRole] = useState<UserRole>('patient');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Initialize and check existing session
  useEffect(() => {
    let isMounted = true;

    // Set callback if any request encounters a 401 Unauthorized
    setUnauthorizedHandler(() => {
      if (isMounted) {
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
    });

    const initAuth = async () => {
      const existingToken = getApiAuthToken();
      if (existingToken) {
        try {
          const user = await authService.getCurrentUser();
          if (user && isMounted) {
            setCurrentUser(user);
            setActiveRole(user.role);
            setIsAuthenticated(true);
          }
        } catch {
          // Token invalid or expired
          if (isMounted) {
            setCurrentUser(null);
            setIsAuthenticated(false);
          }
        }
      }
      if (isMounted) {
        setIsInitialized(true);
      }
    };

    initAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (credentials: LoginCredentials): Promise<UserProfile> => {
    setIsLoading(true);
    try {
      const user = await authService.login(credentials);
      setCurrentUser(user);
      setActiveRole(user.role);
      setIsAuthenticated(true);
      return user;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setCurrentUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        activeRole,
        isAuthenticated,
        isLoading,
        isInitialized,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
