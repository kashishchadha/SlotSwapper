import express from 'express';
import {
  getMySlots,
  getMarketplaceSlots,
  getSlot,
  createSlot,
  updateSlot,
  deleteSlot
} from '../controllers/slotController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All slot routes are protected

router.route('/')
  .get(getMySlots)
  .post(createSlot);

router.get('/marketplace', getMarketplaceSlots);

router.route('/:id')
  .get(getSlot)
  .put(updateSlot)
  .delete(deleteSlot);

export default router;
