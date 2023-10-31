import { Document } from 'mongoose';

interface Rating extends Document {
  gameId: string;
  user: string;
  score: number;
  comment?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default Rating;
