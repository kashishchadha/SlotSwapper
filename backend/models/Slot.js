import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please provide a slot title'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Please provide a date']
  },
  startTime: {
    type: String,
    required: [true, 'Please provide start time']
  },
  endTime: {
    type: String,
    required: [true, 'Please provide end time']
  },
  location: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['Meeting', 'Shift', 'Class', 'Event', 'Other'],
    default: 'Other'
  },
  status: {
    type: String,
    enum: ['BUSY', 'SWAPPABLE', 'SWAP_PENDING'],
    default: 'BUSY'
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for faster queries
slotSchema.index({ user: 1, date: 1 });
slotSchema.index({ status: 1 });

export default mongoose.model('Slot', slotSchema);
