import { JwtPayload } from 'jsonwebtoken';
import User from './user.js';

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MDB_URL: string;
      PORT: string;
    }
  }

  namespace Express {
    interface Request {
      user: User;
      verify: JwtPayload | tokenDecoded | string;
    }
  }
}
