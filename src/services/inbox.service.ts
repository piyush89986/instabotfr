import api from '../lib/axios';

export const fetchConversations = async (status: string = 'OPEN') => {
  const { data } = await api.get(`/inbox/conversations?status=${status}`);
  return data.data.conversations;
};

export const fetchMessages = async (conversationId: string) => {
  const { data } = await api.get(`/inbox/conversations/${conversationId}/messages`);
  return data.data.messages;
};

export const toggleHumanTakeover = async (conversationId: string, humanTakeover: boolean) => {
  const { data } = await api.put(`/inbox/conversations/${conversationId}/takeover`, { humanTakeover });
  return data.data.conversation;
};
