import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  name: string;
  role: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  justLoggedOut: boolean;
  hasHydrated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  clearLogoutFlag: () => void;
}

const MOCK_USER = {
  email: 'admin@spybee.com',
  password: 'admin123',
  name: 'Marco',
  role: 'Administrador'
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      justLoggedOut: false,
      hasHydrated: false,

      login: (email, password) => {
        if (email === MOCK_USER.email && password === MOCK_USER.password) {
          set({
            user: { name: MOCK_USER.name, role: MOCK_USER.role },
            isAuthenticated: true,
            justLoggedOut: false
          });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, justLoggedOut: true });
      },

      clearLogoutFlag: () => {
        set({ justLoggedOut: false });
      }
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => () => {
        useAuthStore.setState({ hasHydrated: true });
      }
    }
  )
);