
const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    reason: { type: String, required: true },
    petId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Pet' },
    adopterId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    shelterId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    status: { type: String, required: true, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
    