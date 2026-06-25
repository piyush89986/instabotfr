import api from '../lib/axios';

export const fetchWorkflows = async () => {
  const { data } = await api.get('/automation/workflows');
  return data.data.workflows;
};

export const fetchWorkflow = async (id: string) => {
  const { data } = await api.get(`/automation/workflows/${id}`);
  return data.data.workflow;
};

export const saveWorkflow = async (id: string, workflowData: any) => {
  const { data } = await api.put(`/automation/workflows/${id}`, workflowData);
  return data.data.workflow;
};

export const createWorkflow = async (workflowData: any) => {
  const { data } = await api.post('/automation/workflows', workflowData);
  return data.data.workflow;
};
