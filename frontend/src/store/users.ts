import { create } from 'zustand';
import type UsersType from '@/types/UserType';
import { persist, createJSONStorage } from 'zustand/middleware';

type UserStoreType = {
  users: UsersType[];
  setUser: (users: UsersType[]) => void;
  clearUser: () => void;
};

export const UserStore = create<UserStoreType>()(
  persist(
    (set) => ({
      users: [],
      setUser: (users) => set({ users }),
      clearUser: () => set({ users: [] }),
    }),
    {
      name: 'users',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
