import api from '../lib/axios';

export interface CreatePostParams {
  instagramAccountId: string;
  postType: 'IMAGE' | 'CAROUSEL' | 'REEL' | 'STORY';
  mediaUrls: string[];
  caption?: string;
  scheduledTime?: string;
  publishNow?: boolean;
}

export const createPost = async (params: CreatePostParams) => {
  const { data } = await api.post('/publishing/create', params);
  return data.data.post;
};
