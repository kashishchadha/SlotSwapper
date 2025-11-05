import mongoose from 'mongoose';

const swapRequestSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  requesterSlot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot',
    required: true
  },
  receiverSlot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot',
    required: true
  },
  // store the slot statuses at the time of the request so we can restore them
  requesterSlotStatus: {
    type: String,
    trim: true
  },
  receiverSlotStatus: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'cancelled'],
    default: 'pending'
  },
  message: {
    type: String,
    trim: true
  },
  respondedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for faster queries
swapRequestSchema.index({ requester: 1, status: 1 });
swapRequestSchema.index({ receiver: 1, status: 1 });

export default mongoose.model('SwapRequest', swapRequestSchema);
