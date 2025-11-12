import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: string;
  email: string;
  nickname: string;
  image?: string;
};

type State = {
  user: User | null;
  isAuthenticated: boolean;
};

type Actions = {
  setUser: (user: User | null) => void;
  clearUser: () => void;
};

export const useUserStore = create<State & Actions>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),
      clearUser: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'user-storage',
    },
  ),
);
