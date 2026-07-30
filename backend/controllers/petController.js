const Pet = require('../models/petModel');

// @desc    Fetch all pets
// @route   GET /api/pets
// @access  Public
const getPets = async (req, res) => {
    try {
        const pets = await Pet.find({}).sort({ createdAt: -1 });
        res.json(pets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching pets.' });
    }
};

// @desc    Create a pet
// @route   POST /api/pets
// @access  Private/Shelter
const createPet = async (req, res) => {
    try {
        const { name, type, breed, age, health, behavior } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }

        const pet = new Pet({
            name,
            type,
            breed,
            age,
            health,
            behavior,
            image: `/uploads/${req.file.filename}`,
            shelterId: req.user._id,
        });

        const createdPet = await pet.save();
        res.status(201).json(createdPet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while creating pet.' });
    }
};

// @desc    Update a pet
// @route   PUT /api/pets/:id
// @access  Private/Shelter
const updatePet = async (req, res) => {
    try {
        const { status } = req.body;
        const pet = await Pet.findById(req.params.id);

        if (pet) {
            // Ensure the person updating the pet is the one who listed it or an admin
            if (pet.shelterId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(401).json({ message: 'Not authorized' });
            }
            pet.status = status;
            const updatedPet = await pet.save();
            res.json(updatedPet);
        } else {
            res.status(404).json({ message: 'Pet not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while updating pet.' });
    }
};

// @desc    Delete a pet
// @route   DELETE /api/pets/:id
// @access  Private/Admin
const deletePet = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (pet) {
            await pet.deleteOne();
            res.json({ message: 'Pet removed' });
        } else {
            res.status(404).json({ message: 'Pet not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while deleting pet.' });
    }
};

module.exports = { getPets, createPet, updatePet, deletePet };