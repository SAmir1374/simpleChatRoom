import { login, register } from '@/api/auth';
import { SelfStore } from '@/store/self';
import type SelfType from '@/types/SelfType';

export const authDispatcher = {
  async login(username: string, password: string) {
    try {
      const { user, token } = await login({ username, password });

      // ذخیره کاربر و توکن در store
      SelfStore.getState().setSelf(user as SelfType, token);

      // ذخیره توکن در کوکی (سرور هم باید set-cookie بزنه)
      document.cookie = `token=${token}; max-age=${5 * 60 * 60}; path=/; secure; samesite=lax`;

      return { success: true, user, token };
    } catch (error: any) {
      return { success: false, error: error.response?.data || error.message };
    }
  },

  async register(username: string, password: string) {
    try {
      await register({ username, password });
    } catch (error: any) {
      return { success: false, error: error.response?.data || error.message };
    }
  },

  logout() {
    SelfStore.getState().clearSelf();

    // پاک کردن کوکی
    document.cookie = 'token=; max-age=0; path=/;';

    return { success: true };
  },
};
