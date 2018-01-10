import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    minlength: 11,
    maxlength: 11
  },
  role: {
    type: String,
    enum: ['super', 'admin', 'employee'],
    default: 'employee'
  }
});

export default mongoose.model('User', userSchema);