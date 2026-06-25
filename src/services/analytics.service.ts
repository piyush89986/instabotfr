import api from '../lib/axios';

export const fetchDashboardStats = async () => {
  const { data } = await api.get('/analytics/dashboard');
  return data.data;
};
