// Package Imports
import mongoose, { ConnectOptions } from 'mongoose';

if (!process.env.MDB_URL) {
  throw new Error('MDB_URL environment variable is not defined!');
}

// Mongoose Connection
mongoose
  .connect(process.env.MDB_URL, { dbName: 'videogames' } as ConnectOptions)
  .then((_res) => console.log('💻 Mongoose Connected'))
  .catch((err) => console.log('🛑 Mongoose Failed: ' + err));

export default mongoose;
