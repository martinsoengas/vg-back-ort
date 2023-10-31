import mongoose from '../../config/db.js';

import Videogame from '../../types/videogame.js';

const videogameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  releaseDate: Date,
  genre: String,
  developer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'developer',
    required: true,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model<Videogame>('videogame', videogameSchema);
