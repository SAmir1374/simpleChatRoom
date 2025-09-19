import userApi from '@/api/user';
import { UserStore } from '@/store/users';

export default async function userDispatcher() {
  const { setUser } = UserStore.getState();
  const user = await userApi();
  setUser(user);
}
