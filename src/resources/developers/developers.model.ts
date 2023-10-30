import mongoose from '../../config/db.js';

import Developer from '../../types/developer.js';

const developerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  country: String,
  foundationDate: Date,
});

export default mongoose.model<Developer>('developer', developerSchema);
