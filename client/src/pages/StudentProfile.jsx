
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Mail,
  Phone,
  GraduationCap,
  FileText,
  Link as LinkIcon,
  Trash2,
} from 'lucide-react';

import { getApplicationById, deleteApplication } from '../services/applicationService';
import StatusDropdown from '../components/profile/StatusDropdown';
import NotesPanel from '../components/profile/NotesPanel';
import { useAuth } from '../context/AuthContext';

const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { admin } = useAuth();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const fetchApp = async () => {
      try {
        setLoading(true);

        const data = await getApplicationById(id);
        setApplication(data);
      } catch (error) {
        console.error('Failed to fetch application:', error);
        setApplication(null);
      } finally {
        setLoading(false);
      }
    };

    fetchApp();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);

    try {
      await deleteApplication(application._id);
      navigate('/dashboard/applications');
    } catch (err) {
      alert(
        err.response?.data?.message ||
          'Failed to delete application'
      );
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-gray-500">
        Loading application...
      </div>
    );
  }

  if (!application) {
    return (
      <div className="space-y-5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Applications
        </button>

        <div className="bg-white rounded-xl border border-border-subtle p-6">
          <p className="text-gray-600">
            Application not found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Applications
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: profile summary */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-border-subtle p-5 h-fit">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-brand-100 text-brand-700 font-semibold flex items-center justify-center text-lg">
              {application.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                {application.name}
              </p>

              <p className="text-xs text-gray-400 font-mono">
                {application.applicationId}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <StatusDropdown
              applicationId={application._id}
              status={application.status}
              onUpdated={(newStatus) =>
                setApplication((prev) => ({
                  ...prev,
                  status: newStatus,
                }))
              }
            />
          </div>

          {/* Delete Application - Super Admin Only */}
          {admin?.role === 'super-admin' && (
            <div className="mt-4 pt-4 border-t border-border-subtle dark:border-white/10">
              {!confirmDelete ? (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="flex items-center gap-2 text-sm text-status-rejected hover:bg-red-50 dark:hover:bg-red-500/10 px-3 py-2 rounded-lg transition-colors w-full"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Application
                </button>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    This action cannot be undone. Delete this application?
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={handleDelete}
                      disabled={deleting}
                      className="flex-1 px-3 py-2 rounded-lg bg-status-rejected text-white text-sm font-medium hover:bg-red-600 disabled:opacity-60 transition-colors"
                    >
                      {deleting
                        ? 'Deleting...'
                        : 'Confirm Delete'}
                    </button>

                    <button
                      onClick={() => setConfirmDelete(false)}
                      className="px-3 py-2 rounded-lg border border-border-subtle dark:border-white/10 text-sm text-gray-600 dark:text-gray-300 hover:bg-surface-muted dark:hover:bg-white/10 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2.5 text-gray-600">
              <Mail className="h-4 w-4 text-gray-400 shrink-0" />
              {application.email}
            </div>

            <div className="flex items-center gap-2.5 text-gray-600">
              <Phone className="h-4 w-4 text-gray-400 shrink-0" />
              {application.phone}
            </div>

            <div className="flex items-center gap-2.5 text-gray-600">
              <GraduationCap className="h-4 w-4 text-gray-400 shrink-0" />
              {application.course}, {application.college}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border-subtle flex flex-col gap-2">
            {application.resumeUrl && (
              <a
                href={application.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700"
              >
                <FileText className="h-4 w-4" />
                View Resume
              </a>
            )}

            {application.portfolioUrl && (
              <a
                href={application.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700"
              >
                <LinkIcon className="h-4 w-4" />
                View Portfolio
              </a>
            )}
          </div>
        </div>

        {/* Right: details + notes */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-xl border border-border-subtle p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Application Details
            </h3>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <p className="text-gray-400 text-xs mb-1">
                  Internship Role
                </p>

                <p className="text-gray-800 font-medium">
                  {application.internshipRole}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs mb-1">
                  Date Applied
                </p>

                <p className="text-gray-800 font-medium">
                  {application.dateApplied
                    ? new Date(
                        application.dateApplied
                      ).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                    : 'N/A'}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-400 text-xs mb-2">
                Skills
              </p>

              <div className="flex flex-wrap gap-1.5">
                {application.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {application.coverLetter && (
              <div>
                <p className="text-gray-400 text-xs mb-1.5">
                  Cover Letter
                </p>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {application.coverLetter}
                </p>
              </div>
            )}
          </div>

          <NotesPanel
            applicationId={application._id}
            notes={application.notes || []}
            onNotesChange={(notes) =>
              setApplication((prev) => ({
                ...prev,
                notes,
              }))
            }
          />
        </div>
      </div>
    </motion.div>
  );
};

export default StudentProfile;


