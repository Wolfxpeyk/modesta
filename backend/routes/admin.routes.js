import express from 'express';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
const router = express.Router();

router.get('/dashboard', authenticate, authorize('admin', 'super_admin'), (req, res) => {
  res.json({ success: true, message: 'Admin dashboard endpoint' });
});

export default router;
