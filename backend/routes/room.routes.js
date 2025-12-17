import express from 'express';
import { getRoomCategories, getRoomCategory, checkAvailability } from '../controllers/room.controller.js';

const router = express.Router();

router.get('/categories', getRoomCategories);
router.get('/categories/:slug', getRoomCategory);
router.post('/check-availability', checkAvailability);

export default router;
