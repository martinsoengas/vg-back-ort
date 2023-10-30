import { RequestHandler } from 'express';

import developersModel from '../developers.model.js';

export const updateOneByID: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id || false;
    const { name, ...updateData } = req.body;

    if (!name) return res.status(400).send('Name cannot be empty');

    if (!id) return res.status(400).send('Send data required');

    await developersModel.findOneAndUpdate(
      { _id: id },
      { name: name, ...updateData }
    );

    return res.status(200).send('Developer updated');
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return res.status(500).send({ message: err.message });
    } else {
      return res.status(500).send({ message: 'An unknown error occurred' });
    }
  }
};
