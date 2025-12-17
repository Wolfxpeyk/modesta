import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', authenticate, (req, res) => {
  res.json({ success: true, message: 'Create booking endpoint' });
});

router.get('/', authenticate, (req, res) => {
  res.json({ success: true, message: 'Get bookings endpoint' });
});

export default router;
