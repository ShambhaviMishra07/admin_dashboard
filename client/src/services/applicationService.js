import api from './api';

export const getStats = () => api.get('/applications/stats').then((res) => res.data);

export const getApplications = (params) =>
  api.get('/applications', { params }).then((res) => res.data);

export const getApplicationById = (id) =>
  api.get(`/applications/${id}`).then((res) => res.data);

export const updateApplicationStatus = (id, status) =>
  api.patch(`/applications/${id}/status`, { status }).then((res) => res.data);

export const addNote = (id, text) =>
  api.post(`/applications/${id}/notes`, { text }).then((res) => res.data);

export const updateNote = (id, noteId, text) =>
  api.put(`/applications/${id}/notes/${noteId}`, { text }).then((res) => res.data);

export const deleteNote = (id, noteId) =>
  api.delete(`/applications/${id}/notes/${noteId}`).then((res) => res.data);

export const getAnalytics = () => api.get('/applications/analytics').then((res) => res.data);

export const deleteApplication = (id) =>
  api.delete(`/applications/${id}`).then((res) => res.data);


export const getAllApplicationsForExport = (filters = {}) =>
  api
    .get('/applications', { params: { ...filters, limit: 1000, page: 1 } })
    .then((res) => res.data.applications);