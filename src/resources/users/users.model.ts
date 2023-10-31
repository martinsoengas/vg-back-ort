// Config imports
import mongoose from '../../config/db.js';

// Interface Imports
import User from '../../types/user.js';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    accessToken: { desc: 'Access Token', trim: true, type: String },
    settings: {
      confirmationToken: { type: String },
      confirmed: { type: Boolean, default: false },
      dateConfirmed: { type: Date },
      resetPasswordToken: { type: String },
      resetPasswordExpires: { type: Date },
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

export default mongoose.model<User>('user', userSchema);
