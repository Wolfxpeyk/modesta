import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Gallery endpoint' });
});

export default router;
