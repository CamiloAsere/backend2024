// models/strategyModel.js
import mongoose from 'mongoose';

const strategySchema = new mongoose.Schema({
  name: String,
  value: String
});
Strategy.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  }
});

const Strategy = mongoose.model('Strategy', strategySchema);

export default Strategy;