import { RequestHandler } from 'express';

import ratingsModel from '../ratings.model.js';
import videogamesModel from '../../videogames/videogames.model.js';
import Rating from '../../../types/rating.js';

export const addOne: RequestHandler = async (req, res) => {
  try {
    let game = await videogamesModel.findById(req.params.gameId);

    if (!game) return res.status(404).send('Game not found');

    let rating = {
      gameId: game._id,
      user: req.body.user,
      score: req.body.score,
      comment: req.body.comment,
    } as Rating;

    let newRating = new ratingsModel(rating);

    await newRating.save();

    game.ratingCount++;
    game.averageRating =
      (game.averageRating * (game.ratingCount - 1) + newRating.score) /
      game.ratingCount;

    await game.save();

    res.status(201).send('Rating added successfully');
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return res.status(500).send({ message: err.message });
    } else {
      return res.status(500).send({ message: 'An unknown error occurred' });
    }
  }
};
