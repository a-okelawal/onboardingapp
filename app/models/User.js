import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
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
  department: {
    type: String,
    required: true
  },
  dOE: {
    type: Date,
    default: new Date
  },
  role: {
    type: String,
    enum: ['super', 'admin', 'employee'],
    default: 'employee'
  }
});

export default mongoose.model('User', userSchema);