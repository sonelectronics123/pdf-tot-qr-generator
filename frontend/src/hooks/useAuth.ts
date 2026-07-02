import { useState } from 'react';
import type { GoogleAuthResponse } from '../types/auth';

const AUTH_STORAGE_KEY = 'qr_generator_auth';

export const useAuth = () => {
  const [auth, setAuthState] = useState<GoogleAuthResponse | null>(() => {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedAuth) {
      try {
        return JSON.parse(storedAuth);
      } catch (error) {
        console.error('Failed to parse auth data from localStorage', error);
        return null;
      }
    }
    return null;
  });

  const setAuth = (newAuth: GoogleAuthResponse | null) => {
    setAuthState(newAuth);
    if (newAuth) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newAuth));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  };

  return { auth, setAuth };
};
