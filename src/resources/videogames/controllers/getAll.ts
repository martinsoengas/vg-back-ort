import { RequestHandler } from 'express';
import { FilterQuery } from 'mongoose';

import videogamesModel from '../videogames.model.js';
import Videogame from '../../../types/videogame.js';

export const getAll: RequestHandler = async (req, res) => {
  try {
    const limit = req.query.limit ? +req.query.limit : 20;
    let page = req.query.page ? +req.query.page : 1;

    if (page < 1) page = 1;

    const title = req.query.name || false;
    const developerID = req.query.developer || false;

    let parameters = { $and: [] as FilterQuery<Videogame[]> };
    if (title) parameters.$and.push({ name: { $regex: title, $options: 'i' } });
    if (developerID) parameters.$and.push({ developer: developerID });

    const count = await videogamesModel.countDocuments(
      parameters.$and.length > 0 ? parameters : {}
    );
    const videogames: Array<Videogame> = await videogamesModel
      .find(parameters.$and.length > 0 ? parameters : {})
      .skip(limit * page - limit)
      .populate('developer')
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
      results: videogames,
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
