
const Application = require('../models/applicationModel');
const Pet = require('../models/petModel');
const mongoose = require('mongoose');

// @desc    Create new application
// @route   POST /api/applications
// @access  Private
const createApplication = async (req, res) => {
  try {
    // --- FIX: Add critical role check for security and stability ---
    if (req.user.role !== 'adopter') {
      return res.status(401).json({ message: 'Not authorized. Only adopters can apply.' });
    }

    const { reason, petId } = req.body;

    // --- FIX: Robust Validation for user profile ---
    if (!req.user.address || !req.user.phone) {
      return res.status(400).json({ message: 'Your user profile is incomplete. Please update your address and phone number.' });
    }

    // --- FIX: Add specific check for valid ObjectId format ---
    if (!mongoose.Types.ObjectId.isValid(petId)) {
      return res.status(400).json({ message: 'Invalid Pet ID format.' });
    }

    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    if (pet.status === 'adopted') {
      return res.status(400).json({ message: 'This pet has already been adopted.' });
    }

    // Use the authenticated user's details from req.user
    const application = new Application({
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      address: req.user.address,
      reason,
      petId,
      adopterId: req.user._id,
      shelterId: pet.shelterId,
    });

    const createdApplication = await application.save();
    res.status(201).json(createdApplication);
  } catch (error) {
    console.error("Error in createApplication:", error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message).join(', ');
      return res.status(400).json({ message: `Application validation failed: ${messages}` });
    }
    res.status(500).json({ message: 'Server error while creating application.' });
  }
};

// @desc    Get applications for a user (admin, shelter, or adopter)
// @route   GET /api/applications
// @access  Private
const getApplications = async (req, res) => {
  try {
    let applications;
    if (req.user.role === 'admin') {
      applications = await Application.find({}).populate('petId', 'name').sort({ createdAt: -1 });
    } else if (req.user.role === 'shelter') {
      applications = await Application.find({ shelterId: req.user._id }).populate('petId', 'name').sort({ createdAt: -1 });
    } else {
      applications = await Application.find({ adopterId: req.user._id }).populate('petId', 'name').sort({ createdAt: -1 });
    }
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching applications.' });
  }
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private/Shelter or Admin
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'Approved' or 'Rejected'
    const application = await Application.findById(req.params.id);

    if (application) {
      if (application.shelterId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(401).json({ message: 'Not authorized' });
      }

      application.status = status;

      if (status === 'Approved') {
        // Mark pet as adopted
        await Pet.findByIdAndUpdate(application.petId, { status: 'adopted' });
        // Reject other pending applications for this pet
        await Application.updateMany(
          { petId: application.petId, status: 'Pending', _id: { $ne: application._id } },
          { status: 'Rejected' }
        );
      }

      const updatedApplication = await application.save();
      res.json(updatedApplication);
    } else {
      res.status(404).json({ message: 'Application not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating application.' });
  }
};

module.exports = { createApplication, getApplications, updateApplicationStatus };
