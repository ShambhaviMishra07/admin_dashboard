
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

import { getApplications } from '../services/applicationService';
import StatusBadge from '../components/applications/StatusBadge';
import FilterBar from '../components/applications/FilterBar';
import { Download } from 'lucide-react';
import { exportApplicationsToCSV } from '../utils/exportCsv';
import { getAllApplicationsForExport } from '../services/applicationService';



const Applications = () => {
  const [data, setData] = useState({
    applications: [],
    total: 0,
    totalPages: 1,
  });

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const [exporting, setExporting] = useState(false);

  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    role: 'All',
    sortBy: 'dateApplied',
    order: 'desc',
  });

  const [roles, setRoles] = useState([]);

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const result = await getApplications({
        page,
        limit: 10,
        search: filters.search || undefined,
        status: filters.status,
        role: filters.role,
        sortBy: filters.sortBy,
        order: filters.order,
      });

      setData(result);

      // Build role list once from a broader unfiltered fetch
      if (roles.length === 0) {
        const allRoles = await getApplications({
          limit: 100,
        });

        const uniqueRoles = [
          ...new Set(
            allRoles.applications.map(
              (a) => a.internshipRole
            )
          ),
        ];

        setRoles(uniqueRoles);
      }
    } finally {
      setLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters]);


  const handleExport = async () => {
  setExporting(true);

  try {
    const allFiltered = await getAllApplicationsForExport({
      search: filters.search || undefined,
      status: filters.status,
      role: filters.role,
      sortBy: filters.sortBy,
      order: filters.order,
    });

    exportApplicationsToCSV(
      allFiltered,
      `mamraj-applications-${Date.now()}.csv`
    );
  } finally {
    setExporting(false);
  }
};

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchData();
    }, 350);

    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-border-subtle dark:border-white/10 overflow-hidden">
      
      {/* Header */}
     <div className="px-5 py-4 border-b border-border-subtle dark:border-white/10 flex items-center justify-between">
  <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
    All Applications{' '}
    <span className="text-gray-400 dark:text-gray-500 font-normal">
      ({data.total})
    </span>
  </h2>

  <button
    onClick={handleExport}
    disabled={exporting || data.total === 0}
    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-subtle dark:border-white/10 text-sm text-gray-600 dark:text-gray-300 hover:bg-surface-muted dark:hover:bg-white/10 disabled:opacity-50 transition-colors"
  >
    <Download className="h-3.5 w-3.5" />
    {exporting ? 'Exporting...' : 'Export CSV'}
  </button>
</div>

      {/* Filters */}
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        roles={roles}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-subtle dark:border-white/10 text-left text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide">
              <th className="px-5 py-3 font-medium">
                ID
              </th>

              <th className="px-5 py-3 font-medium">
                Name
              </th>

              <th className="px-5 py-3 font-medium">
                Role
              </th>

              <th className="px-5 py-3 font-medium">
                College
              </th>

              <th className="px-5 py-3 font-medium">
                Applied
              </th>

              <th className="px-5 py-3 font-medium">
                Status
              </th>

              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr
                  key={i}
                  className="border-b border-border-subtle dark:border-white/10"
                >
                  <td
                    colSpan={7}
                    className="px-5 py-4"
                  >
                    <div className="h-4 bg-surface-muted dark:bg-white/5 rounded animate-pulse" />
                  </td>
                </tr>
              ))
            ) : data.applications.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-10 text-center text-gray-400 dark:text-gray-500"
                >
                  No applications match your filters.
                </td>
              </tr>
            ) : (
              data.applications.map((app) => (
                <tr
                  key={app._id}
                  onClick={() =>
                    navigate(
                      `/dashboard/applications/${app._id}`
                    )
                  }
                  className="border-b border-border-subtle dark:border-white/10 hover:bg-surface-muted dark:hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400 font-mono text-xs">
                    {app.applicationId}
                  </td>

                  <td className="px-5 py-3 font-medium text-gray-900 dark:text-gray-100">
                    {app.name}
                  </td>

                  <td className="px-5 py-3 text-gray-600 dark:text-gray-400">
                    {app.internshipRole}
                  </td>

                  <td className="px-5 py-3 text-gray-600 dark:text-gray-400">
                    {app.college}
                  </td>

                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400">
                    {new Date(
                      app.dateApplied
                    ).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>

                  <td className="px-5 py-3">
                    <StatusBadge status={app.status} />
                  </td>

                  <td className="px-5 py-3 text-right">
                    <ExternalLink className="h-4 w-4 text-gray-300 dark:text-gray-600" />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-5 py-3 border-t border-border-subtle dark:border-white/10 flex items-center justify-between text-sm">
        <p className="text-gray-500 dark:text-gray-400">
          Page {data.page} of {data.totalPages || 1}
        </p>

        <div className="flex items-center gap-1">
          {/* Previous */}
          <button
            onClick={() =>
              setPage((p) => Math.max(1, p - 1))
            }
            disabled={page === 1}
            className="h-8 w-8 flex items-center justify-center rounded-lg border border-border-subtle dark:border-white/10 text-gray-500 dark:text-gray-400 disabled:opacity-40 hover:bg-surface-muted dark:hover:bg-white/5 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Next */}
          <button
            onClick={() =>
              setPage((p) =>
                Math.min(data.totalPages, p + 1)
              )
            }
            disabled={
              page === data.totalPages ||
              data.totalPages === 0
            }
            className="h-8 w-8 flex items-center justify-center rounded-lg border border-border-subtle dark:border-white/10 text-gray-500 dark:text-gray-400 disabled:opacity-40 hover:bg-surface-muted dark:hover:bg-white/5 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Applications;

