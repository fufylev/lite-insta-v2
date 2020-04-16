const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
  },
  avatar: {
    type: Schema.Types.Mixed,
    required: false,
  },
  name: {
    type: Schema.Types.Mixed,
    required: false,
  },
  username: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  cell: {
    type: String,
    required: false,
  },
  registered: {
    type: String,
    required: false,
  },
  following: {
    type: Array,
    required: false,
  },
  followers: {
    type: Array,
    required: false,
  },
  pictures: [{ type: Schema.ObjectId, ref: 'User' }],
});

userSchema.pre('save', async function(next) {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(12);
    // Generate a password hash (salt + hash)
    // Re-assign hashed version over original, plain text password
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Create a model
const User = mongoose.model('User', userSchema);

module.exports = User;