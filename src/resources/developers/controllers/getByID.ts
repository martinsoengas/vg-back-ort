import { RequestHandler } from 'express';

import developersModel from '../developers.model.js';

export const getByID: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id || false;

    if (!id) return res.status(400).send('Send data required');

    const developer = await developersModel.findById(id).lean();

    if (!developer) {
      return res.status(404).send('Developer not found');
    }

    return res.status(200).send(developer);
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return res.status(500).send({ message: err.message });
    } else {
      return res.status(500).send({ message: 'An unknown error occurred' });
    }
  }
};
