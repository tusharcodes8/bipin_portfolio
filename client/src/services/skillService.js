import api from './api';

export const getSkills = () => api.get('/skills').then((res) => res.data);
export const createSkill = (data) => api.post('/skills', data).then((res) => res.data);
export const updateSkill = (id, data) => api.put(`/skills/${id}`, data).then((res) => res.data);
export const deleteSkill = (id) => api.delete(`/skills/${id}`).then((res) => res.data);
