
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Loader2, GraduationCap } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    inviteCode: '',
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await api.post('/auth/register', form);
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Signup failed. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-violet-50 flex items-center justify-center px-4">
      {/* Background decorative blobs */}
      <div className="absolute top-[-10%] left-[-10%] h-96 w-96 rounded-full bg-brand-400/20 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] h-96 w-96 rounded-full bg-violet-400/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md rounded-2xl p-8 bg-white/70 backdrop-blur-xl border border-white/60 shadow-2xl shadow-gray-200/50"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>

          <h1 className="text-xl font-semibold text-gray-900">
            Create Admin Account
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            MamRaj Nexus Academy Dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name
            </label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

              <input
                required
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                placeholder="Shambhavi Mishra"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border-subtle bg-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

              <input
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                placeholder="admin@mamraj.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border-subtle bg-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

              <input
                type="password"
                required
                minLength={6}
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border-subtle bg-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
              />
            </div>
          </div>

          {/* Invite Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Invite Code
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

              <input
                required
                value={form.inviteCode}
                onChange={(e) =>
                  setForm({ ...form, inviteCode: e.target.value })
                }
                placeholder="Enter your invite code"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border-subtle bg-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
              />
            </div>

            <p className="text-xs text-gray-400 mt-1">
              Provided by the academy administrator.
            </p>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-status-rejected bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium py-2.5 rounded-lg shadow-lg shadow-brand-500/25 transition disabled:opacity-60"
          >
            {isSubmitting && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}

            {isSubmitting
              ? 'Creating account...'
              : 'Create Account'}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-brand-600 font-medium hover:text-brand-700"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
