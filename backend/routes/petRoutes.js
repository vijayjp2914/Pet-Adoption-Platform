
const express = require('express');
const router = express.Router();
const { getPets, createPet, updatePet, deletePet } = require('../controllers/petController');
const { protect, shelter, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
  .get(getPets)
  .post(protect, shelter, upload.single('image'), createPet);

router.route('/:id')
  .put(protect, shelter, updatePet)
  .delete(protect, admin, deletePet);

module.exports = router;
    