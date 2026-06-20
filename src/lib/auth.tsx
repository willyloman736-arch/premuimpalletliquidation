'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { adminConfig } from '@/lib/config';

export interface LoginResult {
  success: boolean;
  error?: string;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<LoginResult>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = 'admin_token';
const EXPIRES_KEY = 'admin_expires';
const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24h

function isValidToken(token: string | null): boolean {
  if (typeof window === 'undefined') return false;
  const expires = window.localStorage.getItem(EXPIRES_KEY);
  return Boolean(token && expires && Date.now() < parseInt(expires, 10));
}

function generateToken(): string {
  return btoa(Date.now() + Math.random().toString(36));
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier le token au démarrage
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (token && isValidToken(token)) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<LoginResult> => {
    if (username === adminConfig.username && password === adminConfig.password) {
      const token = generateToken();
      window.localStorage.setItem(TOKEN_KEY, token);
      window.localStorage.setItem(EXPIRES_KEY, String(Date.now() + TOKEN_TTL_MS)); // 24h
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: 'Identifiants incorrects' };
  };

  const logout = () => {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(EXPIRES_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
