import express from 'express';
import {
  createApplication,
  getApplications,
  getApplicationStats,
  getApplicationAnalytics,
  getApplicationById,
  updateApplication,
  updateApplicationStatus,
  deleteApplication,
  addNote,
  updateNote,
  deleteNote,
} from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Stats must come before /:id to avoid route collision
router.get('/stats', protect, getApplicationStats);
router.get('/analytics', protect, getApplicationAnalytics);

router.route('/')
  .get(protect, getApplications)
  .post(createApplication); // left public — this is how a "student" would apply

router.route('/:id')
  .get(protect, getApplicationById)
  .put(protect, updateApplication)
  .delete(protect, deleteApplication);

router.patch('/:id/status', protect, updateApplicationStatus);

router.post('/:id/notes', protect, addNote);
router.put('/:id/notes/:noteId', protect, updateNote);
router.delete('/:id/notes/:noteId', protect, deleteNote);

export default router;