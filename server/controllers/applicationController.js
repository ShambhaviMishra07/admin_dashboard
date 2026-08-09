import Application from '../models/Application.js';

// Helper to auto-generate a human-readable application ID
const generateApplicationId = async () => {
  const year = new Date().getFullYear();
  const count = await Application.countDocuments({
    applicationId: { $regex: `^APP-${year}-` },
  });
  const next = String(count + 1).padStart(4, '0');
  return `APP-${year}-${next}`;
};

// @desc    Create a new application (e.g. from a public application form, or seeding)
// @route   POST /api/applications
export const createApplication = async (req, res) => {
  try {
    const applicationId = await generateApplicationId();
    const application = await Application.create({
      ...req.body,
      applicationId,
    });
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all applications — supports search, filter, sort, pagination
// @route   GET /api/applications
// Query params: search, status, role, sortBy, order, page, limit
export const getApplications = async (req, res) => {
  try {
    const {
      search,
      status,
      role,
      sortBy = 'dateApplied',
      order = 'desc',
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // Search by name or email (case-insensitive partial match)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by status
    if (status && status !== 'All') {
      query.status = status;
    }

    // Filter by internship role
    if (role && role !== 'All') {
      query.internshipRole = role;
    }

    const sortOrder = order === 'asc' ? 1 : -1;
    const sortOptions = { [sortBy]: sortOrder };

    const skip = (Number(page) - 1) * Number(limit);

    const [applications, total] = await Promise.all([
      Application.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(Number(limit)),
      Application.countDocuments(query),
    ]);

    res.json({
      applications,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get dashboard overview counts
// @route   GET /api/applications/stats
export const getApplicationStats = async (req, res) => {
  try {
    const statuses = [
      'Pending',
      'Under Review',
      'Shortlisted',
      'Interview Scheduled',
      'Selected',
      'Rejected',
    ];

    const counts = await Application.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const statsMap = statuses.reduce((acc, s) => ({ ...acc, [s]: 0 }), {});
    counts.forEach((c) => {
      statsMap[c._id] = c.count;
    });

    const total = await Application.countDocuments();

    res.json({ total, ...statsMap });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get a single application by ID
// @route   GET /api/applications/:id
export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update an application (general fields)
// @route   PUT /api/applications/:id
export const updateApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update application status only
// @route   PATCH /api/applications/:id/status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = [
      'Pending',
      'Under Review',
      'Shortlisted',
      'Interview Scheduled',
      'Selected',
      'Rejected',
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete an application
// @route   DELETE /api/applications/:id
export const deleteApplication = async (req, res) => {
   if (req.admin.role !== 'super-admin') {
    return res.status(403).json({
      message: 'Only super-admins can delete applications',
    });
  }
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json({ message: 'Application deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- Admin Notes: Add, Edit, Save ---

// @desc    Add a new note to an application
// @route   POST /api/applications/:id/notes
export const addNote = async (req, res) => {
  try {
    const { text } = req.body;

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.notes.push({
      text,
      addedBy: req.admin?._id,
    });

    await application.save();
    res.status(201).json(application.notes[application.notes.length - 1]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Edit/save an existing note
// @route   PUT /api/applications/:id/notes/:noteId
export const updateNote = async (req, res) => {
  try {
    const { text } = req.body;

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const note = application.notes.id(req.params.noteId);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.text = text;
    note.updatedAt = new Date();

    await application.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete a note
// @route   DELETE /api/applications/:id/notes/:noteId
export const deleteNote = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.notes = application.notes.filter(
      (n) => n._id.toString() !== req.params.noteId
    );

    await application.save();
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// @desc    Get applications received per day (last 14 days) for analytics chart
// @route   GET /api/applications/analytics
export const getApplicationAnalytics = async (req, res) => {
  try {
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 13);
    fourteenDaysAgo.setHours(0, 0, 0, 0);

    const results = await Application.aggregate([
      { $match: { dateApplied: { $gte: fourteenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$dateApplied' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Fill in missing days with 0 so the chart has a continuous 14-day axis
    const dateMap = results.reduce((acc, r) => ({ ...acc, [r._id]: r.count }), {});
    const timeline = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date(fourteenDaysAgo);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().split('T')[0];
      timeline.push({
        date: d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
        applications: dateMap[key] || 0,
      });
    }

    res.json(timeline);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};