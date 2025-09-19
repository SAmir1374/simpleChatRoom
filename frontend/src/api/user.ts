import type UserType from '@/types/UserType';
import { AXIOS } from '@/utils/AXIOS';

export default async function userApi(): Promise<UserType[]> {
  const response = await AXIOS.get('http://localhost:3030/api/user');
  return response.data;
}
