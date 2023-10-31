import { RequestHandler } from 'express';

import videogamesModel from '../videogames.model.js';
import Videogame from '../../../types/videogame.js';

export const createOne: RequestHandler = async (req, res) => {
  try {
    const { _id, title, description, releaseDate, genre, developer } = req.body;

    const exists: Videogame | null = await videogamesModel.findById(_id);

    if (exists) return res.status(400).send('Videogame already exists');

    let videogame = {
      title,
      description,
      releaseDate,
      genre,
      developer,
    } as Videogame;

    const newVideogame: Videogame = new videogamesModel(videogame);

    await newVideogame.save();

    return res.status(200).send('Videogame added successfully');
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return res.status(500).send({ message: err.message });
    } else {
      return res.status(500).send({ message: 'An unknown error occurred' });
    }
  }
};
