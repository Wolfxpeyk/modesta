import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
const router = express.Router();

router.get('/points', authenticate, (req, res) => {
  res.json({ success: true, message: 'Loyalty points endpoint' });
});

export default router;
