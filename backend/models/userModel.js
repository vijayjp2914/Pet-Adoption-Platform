
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      match: [/^[A-Za-z ]+$/, "Name should contain only alphabets"] 
    },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    address: { type: String, required: true },

    phone: { 
      type: String, 
      required: true,
      match: [/^[6-9]\d{9}$/, "Phone number must be a valid 10-digit Indian mobile number"]
    },

    role: { 
      type: String, 
      required: true, 
      enum: ['adopter', 'shelter', 'admin'] 
    },

    subrole: { 
      type: String, 
      enum: ['shelter', 'pet_giver'] 
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
