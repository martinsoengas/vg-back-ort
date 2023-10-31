import mongoose from '../../config/db.js';

import Rating from '../../types/rating.js';

const ratingSchema = new mongoose.Schema(
  {
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'videogame',
      required: true,
    },
    user: {
      type: String, // Esto podría ser un ObjectId si decides implementar autenticación y tener usuarios registrados.
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: String,
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

export default mongoose.model<Rating>('rating', ratingSchema);
