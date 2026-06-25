import api from '../lib/axios';

export const login = async (credentials: any) => {
  const { data } = await api.post('/auth/login', credentials);
  return data.data;
};

export const register = async (userData: any) => {
  const { data } = await api.post('/auth/register', userData);
  return data.data;
};

export const fetchUserProfile = async () => {
  const { data } = await api.get('/users/me');
  return data.data.user;
};
