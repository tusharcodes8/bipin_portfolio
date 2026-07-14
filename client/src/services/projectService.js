import api from './api';

export const getProjects = () => api.get('/projects').then((res) => res.data);
export const getProject = (id) => api.get(`/projects/${id}`).then((res) => res.data);
export const createProject = (data) => api.post('/projects', data).then((res) => res.data);
export const updateProject = (id, data) =>
  api.put(`/projects/${id}`, data).then((res) => res.data);
export const deleteProject = (id) => api.delete(`/projects/${id}`).then((res) => res.data);
