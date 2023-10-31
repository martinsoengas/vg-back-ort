import { RequestHandler } from 'express';
import JWT from 'jsonwebtoken';

import usersModel from '../resources/users/users.model.js';

export const validateToken: RequestHandler = (req, res, next) => {
  try {
    const token: string | undefined = req.headers.authorization;

    if (!token) return res.status(401).send('Unauthorized');

    JWT.verify(
      token.replace('Bearer ', ''),
      process.env.JWT_SECRET as string,
      (
        err: JWT.VerifyErrors | null,
        decode: string | JWT.JwtPayload | undefined
      ) => {
        if (err) return res.status(401).send('Unauthorized');
        if (decode) {
          req.verify = decode;
          next();
        }
      }
    );
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return res.status(500).send({ message: err.message });
    } else {
      return res.status(500).send({ message: 'An unknown error occurred' });
    }
  }
};

export const validateUser: RequestHandler = async (req, res, next) => {
  try {
    const user = req.verify;

    const id = user.sub;
    if (!id) return res.status(403).send('Unauthorized');

    const data = await usersModel.findById(id);
    if (!data) return res.status(403).send('Unauthorized');

    req.user = data;
    next();
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return res.status(500).send({ message: err.message });
    } else {
      return res.status(500).send({ message: 'An unknown error occurred' });
    }
  }
};
