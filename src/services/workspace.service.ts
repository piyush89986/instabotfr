import api from '../lib/axios';

export const fetchWorkspace = async () => {
  const { data } = await api.get('/users/me');
  return data.data.workspace;
};

export const updateKnowledgeBase = async (aiKnowledgeBase: string) => {
  const { data } = await api.put('/users/workspace/knowledgebase', { aiKnowledgeBase });
  return data.data.workspace;
};
