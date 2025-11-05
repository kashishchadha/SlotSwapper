import Slot from '../models/Slot.js';

// @desc    Get all slots for logged in user
// @route   GET /api/slots
// @access  Private
export const getMySlots = async (req, res) => {
  try {
    const slots = await Slot.find({ user: req.user.id }).sort({ date: 1, startTime: 1 });

    res.status(200).json({
      success: true,
      count: slots.length,
      slots
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all swappable slots (marketplace)
// @route   GET /api/slots/marketplace
// @access  Private
export const getMarketplaceSlots = async (req, res) => {
  try {
    const { category, date, search } = req.query;

    let query = { 
      status: 'SWAPPABLE',
      user: { $ne: req.user.id } // Exclude own slots
    };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      query.date = { $gte: startOfDay, $lte: endOfDay };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const slots = await Slot.find(query)
      .populate('user', 'fullName email avatar')
      .sort({ date: 1, startTime: 1 });

    res.status(200).json({
      success: true,
      count: slots.length,
      slots
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single slot
// @route   GET /api/slots/:id
// @access  Private
export const getSlot = async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id).populate('user', 'fullName email avatar');

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: 'Slot not found'
      });
    }

    res.status(200).json({
      success: true,
      slot
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new slot
// @route   POST /api/slots
// @access  Private
export const createSlot = async (req, res) => {
  try {
    req.body.user = req.user.id;

    const slot = await Slot.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Slot created successfully',
      slot
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update slot
// @route   PUT /api/slots/:id
// @access  Private
export const updateSlot = async (req, res) => {
  try {
    let slot = await Slot.findById(req.params.id);

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: 'Slot not found'
      });
    }

    // Make sure user owns the slot
    if (slot.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this slot'
      });
    }

    slot = await Slot.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Slot updated successfully',
      slot
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete slot
// @route   DELETE /api/slots/:id
// @access  Private
export const deleteSlot = async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id);

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: 'Slot not found'
      });
    }

    // Make sure user owns the slot
    if (slot.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this slot'
      });
    }

    await slot.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Slot deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
