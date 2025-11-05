import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Restaurants endpoint' });
});

export default router;
