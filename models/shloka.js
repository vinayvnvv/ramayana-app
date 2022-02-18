import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var shloka = new Schema({
  text: {
    type: String,
    required: true
  },
  shloka_number: {
      type: Number,
      required: true,
  },
  kanda: {
    type: Schema.ObjectId,
    ref: 'kanda'
  },
  sarga: {
    type: Schema.ObjectId,
    ref: 'sarga'
  }
}, {timestamps:true, collection: 'shloka'});

mongoose.models = {};

var Shloka = mongoose.model('shloka', shloka);

export default Shloka;