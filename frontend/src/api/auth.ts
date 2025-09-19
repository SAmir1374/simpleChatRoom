import axios from 'axios';

type ResponsType = {
  user: {
    id: number;
    username: string;
  };
  token: string;
};

type RequestType = {
  username: string;
  password: string;
};

export async function login({ username, password }: RequestType): Promise<ResponsType> {
  const response = await axios.post('http://localhost:3030/api/auth/login', { username, password });
  return response.data;
}

export async function register({ username, password }: RequestType) {
  const response = await axios.post('http://localhost:3030/api/auth/register', {
    username,
    password,
  });
  return response.data;
}
