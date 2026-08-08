
import { useState } from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';

import { updateApplicationStatus } from '../../services/applicationService';
import StatusBadge from '../applications/StatusBadge';

const STATUS_OPTIONS = [
  'Pending',
  'Under Review',
  'Shortlisted',
  'Interview Scheduled',
  'Selected',
  'Rejected',
];

const StatusDropdown = ({
  applicationId,
  status,
  onUpdated,
}) => {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSelect = async (newStatus) => {
    if (newStatus === status) {
      setOpen(false);
      return;
    }

    setSaving(true);

    try {
      const updated = await updateApplicationStatus(
        applicationId,
        newStatus
      );

      onUpdated(updated.status);
    } catch (error) {
      console.error(
        'Failed to update application status:',
        error
      );
    } finally {
      setSaving(false);
      setOpen(false);
    }
  };

  return (
    <div className="relative inline-block">
      {/* Current status */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        disabled={saving}
        className="flex items-center gap-2 px-1 py-1 rounded-lg hover:bg-surface-muted dark:hover:bg-white/5 transition-colors"
      >
        {saving ? (
          <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
        ) : (
          <StatusBadge status={status} />
        )}

        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <>
          {/* Click outside */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />

          <div className="absolute left-0 top-full mt-1 z-20 w-52 bg-white dark:bg-gray-900 border border-border-subtle dark:border-white/10 rounded-lg shadow-lg overflow-hidden">
            {STATUS_OPTIONS.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => handleSelect(s)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-surface-muted dark:hover:bg-white/5 transition-colors ${
                  s === status
                    ? 'font-medium text-brand-700 dark:text-brand-400'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StatusDropdown;

