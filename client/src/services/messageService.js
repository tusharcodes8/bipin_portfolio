import api from './api';

export const sendMessage = (data) => api.post('/messages', data).then((res) => res.data);
export const getMessages = () => api.get('/messages').then((res) => res.data);
export const markMessageRead = (id) =>
  api.put(`/messages/${id}/read`).then((res) => res.data);
export const deleteMessage = (id) => api.delete(`/messages/${id}`).then((res) => res.data);
