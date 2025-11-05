import SwapRequest from '../models/SwapRequest.js';
import Slot from '../models/Slot.js';

// @desc    Get all swap requests for logged in user (incoming)
// @route   GET /api/swaps/incoming
// @access  Private
export const getIncomingRequests = async (req, res) => {
  try {
    const requests = await SwapRequest.find({ 
      receiver: req.user.id,
      status: 'pending'
    })
      .populate('requester', 'fullName email avatar')
      .populate('requesterSlot')
      .populate('receiverSlot')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      requests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all swap requests sent by logged in user (outgoing)
// @route   GET /api/swaps/outgoing
// @access  Private
export const getOutgoingRequests = async (req, res) => {
  try {
    const requests = await SwapRequest.find({ 
      requester: req.user.id
    })
      .populate('receiver', 'fullName email avatar')
      .populate('requesterSlot')
      .populate('receiverSlot')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      requests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create swap request
// @route   POST /api/swaps
// @access  Private
export const createSwapRequest = async (req, res) => {
  try {
    const { requesterSlotId, receiverSlotId, message } = req.body;

    // Validate slots exist
    const requesterSlot = await Slot.findById(requesterSlotId);
    const receiverSlot = await Slot.findById(receiverSlotId);

    if (!requesterSlot || !receiverSlot) {
      return res.status(404).json({
        success: false,
        message: 'One or both slots not found'
      });
    }

    // Check if requester owns the requesterSlot
    if (requesterSlot.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'You can only swap your own slots'
      });
    }

    // Both slots must be swappable (can't request against busy/locked slots)
    if (receiverSlot.status !== 'SWAPPABLE') {
      return res.status(400).json({
        success: false,
        message: 'The target slot is not available for swapping'
      });
    }

    if (requesterSlot.status !== 'SWAPPABLE') {
      return res.status(400).json({
        success: false,
        message: 'Your offered slot is not available to offer for swap'
      });
    }

    // Ensure no other pending request already involves either slot
    const conflict = await SwapRequest.findOne({
      status: 'pending',
      $or: [
        { requesterSlot: requesterSlotId },
        { receiverSlot: requesterSlotId },
        { requesterSlot: receiverSlotId },
        { receiverSlot: receiverSlotId }
      ]
    });

    if (conflict) {
      return res.status(400).json({
        success: false,
        message: 'One of the slots is already involved in a pending request'
      });
    }

    // Create swap request
    // Create swap request and store original slot statuses so we can restore later
    const swapRequest = await SwapRequest.create({
      requester: req.user.id,
      receiver: receiverSlot.user,
      requesterSlot: requesterSlotId,
      receiverSlot: receiverSlotId,
      requesterSlotStatus: requesterSlot.status,
      receiverSlotStatus: receiverSlot.status,
      message
    });

    // Mark both slots as pending/locked so others cannot request them
    requesterSlot.status = 'SWAP_PENDING';
    receiverSlot.status = 'SWAP_PENDING';
    await requesterSlot.save();
    await receiverSlot.save();

    const populatedRequest = await SwapRequest.findById(swapRequest._id)
      .populate('requester', 'fullName email avatar')
      .populate('receiver', 'fullName email avatar')
      .populate('requesterSlot')
      .populate('receiverSlot');

    res.status(201).json({
      success: true,
      message: 'Swap request created successfully',
      request: populatedRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Accept swap request
// @route   PUT /api/swaps/:id/accept
// @access  Private
export const acceptSwapRequest = async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id)
      .populate('requesterSlot')
      .populate('receiverSlot');

    if (!swapRequest) {
      return res.status(404).json({
        success: false,
        message: 'Swap request not found'
      });
    }

    // Make sure user is the receiver
    if (swapRequest.receiver.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to accept this request'
      });
    }

    if (swapRequest.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'This request has already been processed'
      });
    }

    // Swap the slot owners
    const requesterSlot = await Slot.findById(swapRequest.requesterSlot._id);
    const receiverSlot = await Slot.findById(swapRequest.receiverSlot._id);

    // Basic safety checks: ensure slots are still pending and not modified
    if (requesterSlot.status !== 'SWAP_PENDING' || receiverSlot.status !== 'SWAP_PENDING') {
      return res.status(400).json({
        success: false,
        message: 'One of the slots is no longer available to complete the swap'
      });
    }

    const tempUser = requesterSlot.user;
    requesterSlot.user = receiverSlot.user;
    receiverSlot.user = tempUser;

    // After successful swap, mark slots as BUSY
    requesterSlot.status = 'BUSY';
    receiverSlot.status = 'BUSY';

    await requesterSlot.save();
    await receiverSlot.save();

    // Cancel any other pending requests which referenced either of these slots
    const otherPending = await SwapRequest.find({
      _id: { $ne: swapRequest._id },
      status: 'pending',
      $or: [
        { requesterSlot: requesterSlot._id },
        { receiverSlot: requesterSlot._id },
        { requesterSlot: receiverSlot._id },
        { receiverSlot: receiverSlot._id }
      ]
    });

    for (const r of otherPending) {
      // try to restore involved slots to their recorded original statuses
      try {
        if (r.requesterSlot) {
          const s = await Slot.findById(r.requesterSlot);
          if (s) {
            s.status = r.requesterSlotStatus || s.status || 'SWAPPABLE';
            await s.save();
          }
        }
        if (r.receiverSlot) {
          const s2 = await Slot.findById(r.receiverSlot);
          if (s2) {
            s2.status = r.receiverSlotStatus || s2.status || 'SWAPPABLE';
            await s2.save();
          }
        }
      } catch (err) {
        // ignore per-slot restore errors and continue cancelling
      }

      r.status = 'cancelled';
      await r.save();
    }

    // Update swap request status
    swapRequest.status = 'accepted';
    swapRequest.respondedAt = Date.now();
    await swapRequest.save();

    res.status(200).json({
      success: true,
      message: 'Swap request accepted successfully',
      request: swapRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Reject swap request
// @route   PUT /api/swaps/:id/reject
// @access  Private
export const rejectSwapRequest = async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id)
      .populate('requesterSlot')
      .populate('receiverSlot');

    if (!swapRequest) {
      return res.status(404).json({
        success: false,
        message: 'Swap request not found'
      });
    }

    // Make sure user is the receiver
    if (swapRequest.receiver.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to reject this request'
      });
    }

    if (swapRequest.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'This request has already been processed'
      });
    }

    // Update requester slot status back to swappable
    // Restore both slots to their original recorded statuses (or SWAPPABLE fallback)
    if (swapRequest.requesterSlot) {
      const rs = await Slot.findById(swapRequest.requesterSlot._id || swapRequest.requesterSlot);
      if (rs) {
        rs.status = swapRequest.requesterSlotStatus || 'SWAPPABLE';
        await rs.save();
      }
    }

    if (swapRequest.receiverSlot) {
      const rcv = await Slot.findById(swapRequest.receiverSlot._id || swapRequest.receiverSlot);
      if (rcv) {
        rcv.status = swapRequest.receiverSlotStatus || 'SWAPPABLE';
        await rcv.save();
      }
    }

    // Update swap request status
    swapRequest.status = 'rejected';
    swapRequest.respondedAt = Date.now();
    await swapRequest.save();

    res.status(200).json({
      success: true,
      message: 'Swap request rejected',
      request: swapRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Cancel swap request
// @route   DELETE /api/swaps/:id
// @access  Private
export const cancelSwapRequest = async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id)
      .populate('requesterSlot')
      .populate('receiverSlot');

    if (!swapRequest) {
      return res.status(404).json({
        success: false,
        message: 'Swap request not found'
      });
    }

    // Make sure user is the requester
    if (swapRequest.requester.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to cancel this request'
      });
    }

    if (swapRequest.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Can only cancel pending requests'
      });
    }

    // Restore both slots to original statuses recorded on the request
    if (swapRequest.requesterSlot) {
      const rs = await Slot.findById(swapRequest.requesterSlot._id || swapRequest.requesterSlot);
      if (rs) {
        rs.status = swapRequest.requesterSlotStatus || 'SWAPPABLE';
        await rs.save();
      }
    }

    if (swapRequest.receiverSlot) {
      const rcv = await Slot.findById(swapRequest.receiverSlot._id || swapRequest.receiverSlot);
      if (rcv) {
        rcv.status = swapRequest.receiverSlotStatus || 'SWAPPABLE';
        await rcv.save();
      }
    }

    // Update swap request status
    swapRequest.status = 'cancelled';
    await swapRequest.save();

    res.status(200).json({
      success: true,
      message: 'Swap request cancelled',
      request: swapRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
