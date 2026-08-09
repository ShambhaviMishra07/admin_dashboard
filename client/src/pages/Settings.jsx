
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Lock,
  Palette,
  Loader2,
  Check,
  KeyRound,
  Eye,
  EyeOff,
  RefreshCw,
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  updateProfile,
  changePassword,
  getInviteCode,
  updateInviteCode,
} from '../services/authService';


// Reusable settings card
const SectionCard = ({ icon: Icon, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-gray-900 rounded-xl border border-border-subtle dark:border-white/10 p-5"
  >
    <div className="flex items-center gap-2.5 mb-4">
      <span className="h-8 w-8 rounded-lg bg-brand-50 dark:bg-brand-500/15 flex items-center justify-center">
        <Icon className="h-4 w-4 text-brand-600 dark:text-brand-400" />
      </span>

      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
    </div>

    {children}
  </motion.div>
);


const Settings = () => {
  const { admin, setAdminOverride } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  // Profile
  const [name, setName] = useState(admin?.name || '');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  // Password
  const [passwords, setPasswords] = useState({
    current: '',
    next: '',
    confirm: '',
  });

  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Invite code
  const [inviteCode, setInviteCode] = useState('');
  const [inviteCodeInput, setInviteCodeInput] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [inviteSaving, setInviteSaving] = useState(false);
  const [inviteMsg, setInviteMsg] = useState('');


  // Fetch invite code only for super-admin
  useEffect(() => {
    if (admin?.role === 'super-admin') {
      getInviteCode()
        .then((data) => {
          setInviteCode(data.inviteCode);
          setInviteCodeInput(data.inviteCode);
        })
        .catch((err) => {
          console.error('Failed to fetch invite code:', err);
        });
    }
  }, [admin]);


  // Generate random invite code
  const generateRandomCode = () => {
    const code =
      Math.random().toString(36).slice(2, 10) +
      '-' +
      Math.random().toString(36).slice(2, 6);

    setInviteCodeInput(code);
  };


  // Save invite code
  const handleInviteSave = async (e) => {
    e.preventDefault();

    setInviteSaving(true);
    setInviteMsg('');

    try {
      const data = await updateInviteCode(inviteCodeInput);

      setInviteCode(data.inviteCode);
      setInviteCodeInput(data.inviteCode);
      setInviteMsg('Invite code updated successfully');

      setTimeout(() => setInviteMsg(''), 2500);
    } catch (err) {
      setInviteMsg(
        err.response?.data?.message || 'Failed to update invite code'
      );
    } finally {
      setInviteSaving(false);
    }
  };


  // Save profile
  const handleProfileSave = async (e) => {
    e.preventDefault();

    setProfileSaving(true);
    setProfileSaved(false);

    try {
      const updated = await updateProfile(name);

      localStorage.setItem(
        'admin',
        JSON.stringify({
          ...admin,
          ...updated,
        })
      );

      // Update AuthContext if available
      if (setAdminOverride) {
        setAdminOverride({
          ...admin,
          ...updated,
        });
      }

      setProfileSaved(true);

      setTimeout(() => setProfileSaved(false), 2000);
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setProfileSaving(false);
    }
  };


  // Change password
  const handlePasswordSave = async (e) => {
    e.preventDefault();

    setPasswordError('');
    setPasswordSuccess('');

    if (passwords.next !== passwords.confirm) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwords.next.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    setPasswordSaving(true);

    try {
      await changePassword(
        passwords.current,
        passwords.next
      );

      setPasswordSuccess('Password updated successfully');

      setPasswords({
        current: '',
        next: '',
        confirm: '',
      });
    } catch (err) {
      setPasswordError(
        err.response?.data?.message ||
        'Failed to update password'
      );
    } finally {
      setPasswordSaving(false);
    }
  };


  const inputClass =
    'w-full px-3 py-2 rounded-lg border border-border-subtle dark:border-white/10 bg-surface-muted dark:bg-white/5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white dark:focus:bg-gray-800 transition';


  return (
    <div className="space-y-5">

      {/* Profile */}
      <SectionCard icon={User} title="Profile">
        <form onSubmit={handleProfileSave} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              required
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Email
            </label>

            <input
              value={admin?.email || ''}
              disabled
              className={`${inputClass} opacity-60 cursor-not-allowed`}
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Role
            </label>

            <div className="px-3 py-2 rounded-lg bg-surface-muted dark:bg-white/5 text-sm text-gray-700 dark:text-gray-300 capitalize">
              {admin?.role?.replace('-', ' ')}
            </div>
          </div>


          <button
            type="submit"
            disabled={profileSaving}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium disabled:opacity-60 transition-colors"
          >
            {profileSaving && (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            )}

            {profileSaved && (
              <Check className="h-3.5 w-3.5" />
            )}

            {profileSaving
              ? 'Saving...'
              : profileSaved
                ? 'Saved'
                : 'Save Changes'}
          </button>

        </form>
      </SectionCard>


      {/* Password */}
      <SectionCard icon={Lock} title="Change Password">

        <form onSubmit={handlePasswordSave} className="space-y-3">

          <input
            type="password"
            placeholder="Current password"
            value={passwords.current}
            onChange={(e) =>
              setPasswords({
                ...passwords,
                current: e.target.value,
              })
            }
            className={inputClass}
            required
          />


          <input
            type="password"
            placeholder="New password"
            value={passwords.next}
            onChange={(e) =>
              setPasswords({
                ...passwords,
                next: e.target.value,
              })
            }
            className={inputClass}
            required
          />


          <input
            type="password"
            placeholder="Confirm new password"
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords({
                ...passwords,
                confirm: e.target.value,
              })
            }
            className={inputClass}
            required
          />


          {passwordError && (
            <p className="text-sm text-status-rejected bg-red-50 dark:bg-red-500/10 rounded-lg px-3 py-2">
              {passwordError}
            </p>
          )}


          {passwordSuccess && (
            <p className="text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg px-3 py-2">
              {passwordSuccess}
            </p>
          )}


          <button
            type="submit"
            disabled={passwordSaving}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium disabled:opacity-60 transition-colors"
          >
            {passwordSaving && (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            )}

            {passwordSaving
              ? 'Updating...'
              : 'Update Password'}
          </button>

        </form>

      </SectionCard>


      {/* Appearance */}
      <SectionCard icon={Palette} title="Appearance">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Dark Mode</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">Switch between light and dark theme</p>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className={`relative shrink-0 inline-flex items-center w-11 h-6 rounded-full transition-colors duration-200 ${
              isDark ? 'bg-brand-500' : 'bg-gray-200'
            }`}
          >
            <span
              className={`absolute left-0.5 h-5 w-5 bg-white rounded-full shadow transition-transform duration-200 ${
                isDark ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </SectionCard>

      {/* Admin Invite Code - Super Admin Only */}
      {admin?.role === 'super-admin' && (
        <SectionCard
          icon={KeyRound}
          title="Admin Invite Code"
        >

        


          <form
            onSubmit={handleInviteSave}
            className="space-y-3"
          >

            <div className="relative">

              <input
                type={showCode ? 'text' : 'password'}
                value={inviteCodeInput}
                onChange={(e) =>
                  setInviteCodeInput(e.target.value)
                }
                className={inputClass}
                required
              />


              <button
                type="button"
                onClick={() => setShowCode(!showCode)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showCode ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>

            </div>


            {inviteMsg && (
              <p className="text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg px-3 py-2">
                {inviteMsg}
              </p>
            )}


            <div className="flex gap-2">

              <button
                type="submit"
                disabled={inviteSaving}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium disabled:opacity-60 transition-colors"
              >
                {inviteSaving
                  ? 'Saving...'
                  : 'Save Code'}
              </button>


              <button
                type="button"
                onClick={generateRandomCode}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border-subtle dark:border-white/10 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-surface-muted dark:hover:bg-white/10 transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Generate Random
              </button>

            </div>

          </form>

        </SectionCard>
      )}

    </div>
  );
};

export default Settings;

