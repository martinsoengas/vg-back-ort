import { Document } from 'mongoose';

interface Developer extends Document {
  name: string;
  description?: string;
  country?: string;
  foundationDate?: Date;
}

export default Developer;
