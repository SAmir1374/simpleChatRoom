import { create } from 'zustand';
import type SelfType from '@/types/SelfType';
import { persist, createJSONStorage } from 'zustand/middleware';

type SelfStoreType = {
  self: SelfType | null;
  token: string | null;
  setSelf: (self: SelfType, token: string) => void;
  clearSelf: () => void;
};

export const SelfStore = create<SelfStoreType>()(
  persist(
    (set) => ({
      self: null,
      token: null,
      setSelf: (self: SelfType, token: string) => set({ self, token }),
      clearSelf: () => set({ self: null, token: null }),
    }),
    {
      name: 'self',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
