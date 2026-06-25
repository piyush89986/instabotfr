import api from '../lib/axios';

export const fetchContacts = async (page: number = 1, limit: number = 20, status?: string) => {
  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(status && { status })
  }).toString();

  const { data } = await api.get(`/crm/contacts?${query}`);
  return data.data;
};

export const updateContact = async (id: string, updateData: any) => {
  const { data } = await api.put(`/crm/contacts/${id}`, updateData);
  return data.data.contact;
};
