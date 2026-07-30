const mongoose = require('mongoose');

const petSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true, enum: ['dog', 'cat', 'bird'] },
    breed: { type: String, required: true },
    age: { type: String, required: true },
    health: { type: String, required: true },
    behavior: { type: String, required: true },
    image: { type: String, required: true },
    status: { type: String, required: true, enum: ['available', 'adopted'], default: 'available' },
    shelterId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;