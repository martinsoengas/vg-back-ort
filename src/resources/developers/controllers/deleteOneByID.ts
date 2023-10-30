import { RequestHandler } from 'express';

import developersModel from '../developers.model.js';

export const deleteOneByID: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).send('Send data required');

    await developersModel.findOneAndRemove({ _id: id });

    return res.status(200).send('Developer deleted');
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return res.status(500).send({ message: err.message });
    } else {
      return res.status(500).send({ message: 'An unknown error occurred' });
    }
  }
};
