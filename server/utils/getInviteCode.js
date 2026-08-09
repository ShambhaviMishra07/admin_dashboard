import Settings from '../models/Settings.js';

// Fetches the current invite code, bootstrapping from .env on first run
export const getCurrentInviteCode = async () => {
  let settings = await Settings.findOne();

  if (!settings) {
    // First time ever — seed from .env so the very first admin can still register
    settings = await Settings.create({
      inviteCode: process.env.ADMIN_INVITE_CODE || 'change-me-please',
    });
  }

  return settings.inviteCode;
};