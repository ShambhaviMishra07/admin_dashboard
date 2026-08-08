import { Search, X } from 'lucide-react';

const STATUS_OPTIONS = [
  'All',
  'Pending',
  'Under Review',
  'Shortlisted',
  'Interview Scheduled',
  'Selected',
  'Rejected',
];

const FilterBar = ({ filters, setFilters, roles }) => {
  const hasActiveFilters =
    filters.search || filters.status !== 'All' || filters.role !== 'All';

  const resetFilters = () => {
    setFilters({ search: '', status: 'All', role: 'All', sortBy: 'dateApplied', order: 'desc' });
  };

  
return (
  <div className="flex flex-wrap items-center gap-2">
    {/* Search */}
    <div className="relative flex-1 min-w-[220px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

      <input
        type="text"
        placeholder="Search by name or email..."
        value={filters.search}
        onChange={(e) =>
          setFilters({ ...filters, search: e.target.value })
        }
        className="w-full pl-9 pr-3 py-2 rounded-lg border border-border-subtle dark:border-white/10 bg-surface-muted dark:bg-white/5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white dark:focus:bg-gray-800 transition"
      />
    </div>

    {/* Status filter */}
    <select
      value={filters.status}
      onChange={(e) =>
        setFilters({ ...filters, status: e.target.value })
      }
      className="px-3 py-2 rounded-lg border border-border-subtle dark:border-white/10 bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s} value={s}>
          {s === 'All' ? 'All Statuses' : s}
        </option>
      ))}
    </select>

   ```jsx
{/* Role filter */}
<select
  value={filters.role}
  onChange={(e) =>
    setFilters({
      ...filters,
      role: e.target.value,
    })
  }
  className="px-3 py-2 rounded-lg border border-border-subtle dark:border-white/10 bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
>
  <option value="All">All Roles</option>

  {roles.map((r) => (
    <option key={r} value={r}>
      {r}
    </option>
  ))}
</select>

{/* Sort */}
<select
  value={`${filters.sortBy}-${filters.order}`}
  onChange={(e) => {
    const [sortBy, order] = e.target.value.split('-');

    setFilters({
      ...filters,
      sortBy,
      order,
    });
  }}
  className="px-3 py-2 rounded-lg border border-border-subtle dark:border-white/10 bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
>
  <option value="dateApplied-desc">Newest First</option>
  <option value="dateApplied-asc">Oldest First</option>
  <option value="name-asc">Name A–Z</option>
  <option value="name-desc">Name Z–A</option>
</select>

{/* Reset */}
{hasActiveFilters && (
  <button
    onClick={resetFilters}
    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:text-status-rejected hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
  >
    <X className="h-3.5 w-3.5" />
    Reset
  </button>
)}
```

  </div>
);



};

export default FilterBar;