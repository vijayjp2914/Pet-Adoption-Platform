
const express = require('express');
const router = express.Router();
const { createApplication, getApplications, updateApplicationStatus } = require('../controllers/applicationController');
const { protect, admin, shelter } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, createApplication)
    .get(protect, getApplications);

router.put('/:id/status', protect, shelter, updateApplicationStatus);

module.exports = router;
    