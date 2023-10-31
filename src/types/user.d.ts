import { Document } from 'mongoose';

interface User extends Document {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  accessToken?: string;
  settings: {
    confirmationToken?: string;
    confirmed: boolean;
    dateConfirmed?: Date;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export default User;
