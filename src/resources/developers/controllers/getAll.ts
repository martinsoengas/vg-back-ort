import { RequestHandler } from 'express';
import { FilterQuery } from 'mongoose';

import developersModel from '../developers.model.js';
import Developer from '../../../types/developer.js';

export const getAll: RequestHandler = async (req, res) => {
  try {
    const limit = req.query.limit ? +req.query.limit : 20;
    let page = req.query.page ? +req.query.page : 1;

    if (page < 1) page = 1;

    const name = req.query.name || false;

    let parameters = { $and: [] as FilterQuery<Developer[]> };

    if (name) parameters.$and.push({ name: { $regex: name, $options: 'i' } });

    const count = await developersModel.countDocuments(
      parameters.$and.length > 0 ? parameters : {}
    );
    const developers: Array<Developer> = await developersModel
      .find(parameters.$and.length > 0 ? parameters : {})
      .skip(limit * page - limit)
      .limit(limit)
      .lean();

    const from = (page - 1) * limit + 1;
    const to = limit * page > count ? count : limit * page;

    const results = {
      pagination: {
        total: count,
        perPage: limit,
        from: from,
        to: to,
        page: page,
      },
      results: developers,
    };
    return res.status(200).send(results);
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return res.status(500).send({ message: err.message });
    } else {
      return res.status(500).send({ message: 'An unknown error occurred' });
    }
  }
};
