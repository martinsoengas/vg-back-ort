import { Document, Types } from 'mongoose';

interface Videogame extends Document {
  title: string;
  description?: string;
  releaseDate?: Date;
  genre?: string;
  developer: Types.ObjectId;
  averageRating: number;
  ratingCount: number;
}

export default Videogame;
