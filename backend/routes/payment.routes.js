import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create-payment-intent', authenticate, (req, res) => {
  res.json({ success: true, message: 'Payment intent endpoint' });
});

export default router;
