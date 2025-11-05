import express from 'express';
import {
  getIncomingRequests,
  getOutgoingRequests,
  createSwapRequest,
  acceptSwapRequest,
  rejectSwapRequest,
  cancelSwapRequest
} from '../controllers/swapController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All swap routes are protected

router.get('/incoming', getIncomingRequests);
router.get('/outgoing', getOutgoingRequests);
router.post('/', createSwapRequest);
router.put('/:id/accept', acceptSwapRequest);
router.put('/:id/reject', rejectSwapRequest);
router.delete('/:id', cancelSwapRequest);

export default router;
