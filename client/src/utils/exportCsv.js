export const exportApplicationsToCSV = (applications, filename = 'applications.csv') => {
  if (!applications || applications.length === 0) return;

  const headers = [
    'Application ID',
    'Name',
    'Email',
    'Phone',
    'College',
    'Course',
    'Internship Role',
    'Skills',
    'Date Applied',
    'Status',
  ];

  const rows = applications.map((app) => [
    app.applicationId,
    app.name,
    app.email,
    app.phone,
    app.college,
    app.course,
    app.internshipRole,
    (app.skills || []).join('; '),
    new Date(app.dateApplied).toLocaleDateString('en-IN'),
    app.status,
  ]);

  // Escape values that contain commas, quotes, or newlines
  const escapeCell = (cell) => {
    const str = String(cell ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const csvContent = [headers, ...rows]
    .map((row) => row.map(escapeCell).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};