import mongoose from 'mongoose';

// Admin Notes subdocument — supports add/edit/save with author + timestamp
const noteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const applicationSchema = new mongoose.Schema(
  {
    applicationId: {
      type: String,
      required: true,
      unique: true,
      // e.g. APP-2026-0001, generated in the controller before save
    },

    // Personal details
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },

    // Academics
    college: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      type: String,
      required: true,
      trim: true,
    },

    // Application specifics
    internshipRole: {
      type: String,
      required: true,
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    resumeUrl: {
      type: String,
      required: true,
    },
    portfolioUrl: {
      type: String,
      trim: true,
    },
    coverLetter: {
      type: String,
      trim: true,
    },

    dateApplied: {
      type: Date,
      default: Date.now,
    },

    // Status Management — full pipeline from the PDF
    status: {
      type: String,
      enum: [
        'Pending',
        'Under Review',
        'Shortlisted',
        'Interview Scheduled',
        'Selected',
        'Rejected',
      ],
      default: 'Pending',
    },

    // Admin Notes — add/edit/save, multiple notes per application
    notes: {
      type: [noteSchema],
      default: [],
    },
  },
  { timestamps: true }
);

// Helpful indexes for search/filter/sort (Phase 3)
applicationSchema.index({ name: 'text', email: 'text' });
applicationSchema.index({ status: 1 });
applicationSchema.index({ internshipRole: 1 });
applicationSchema.index({ dateApplied: -1 });

const Application = mongoose.model('Application', applicationSchema);

export default Application;