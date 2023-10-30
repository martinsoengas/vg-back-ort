import { RequestHandler } from 'express';

import developersModel from '../developers.model.js';
import Developer from '../../../types/developer.js';

export const createOne: RequestHandler = async (req, res) => {
  try {
    const { name, description, country, foundationDate } = req.body;

    const exists: Developer | null = await developersModel
      .findOne({
        name: name,
      })
      .lean();

    if (exists) return res.status(400).send('Developer already exists');

    let developer = {
      name,
      description,
      country,
      foundationDate,
    } as Developer;

    const newDeveloper: Developer = new developersModel(developer);

    await newDeveloper.save();

    return res.status(200).send('Developer added successfully');
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return res.status(500).send({ message: err.message });
    } else {
      return res.status(500).send({ message: 'An unknown error occurred' });
    }
  }
};
