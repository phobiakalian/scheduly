import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (nim: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (nim: string, password: string) => {
        if (nim && password.length >= 4) {
          set({
            isAuthenticated: true,
            user: { nim, nama: 'Mahasiswa Ambisius', jurusan: 'Teknik Informatika' },
          });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    { name: 'auth-storage', storage: AsyncStorage }
  )
);