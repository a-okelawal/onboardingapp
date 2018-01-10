import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['super', 'admin', 'employee']
  }
});

export default mongoose.model('User', userSchema);