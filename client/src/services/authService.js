import api from './api';

export const updateProfile = (name) =>
  api.put('/auth/profile', { name }).then((res) => res.data);

export const changePassword = (currentPassword, newPassword) =>
  api.put('/auth/password', { currentPassword, newPassword }).then((res) => res.data);

export const getInviteCode = () => api.get('/auth/invite-code').then((res) => res.data);

export const updateInviteCode = (inviteCode) =>
  api.put('/auth/invite-code', { inviteCode }).then((res) => res.data);