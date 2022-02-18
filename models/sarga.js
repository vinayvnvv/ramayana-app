import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var sarga = new Schema({
  name: {
    type: String,
    required: true
  },
  kanda: {
    type: Schema.ObjectId,
    ref: 'kanda'
  }
}, {timestamps:true, collection: 'sarga'});

mongoose.models = {};

var Sarga = mongoose.model('sarga', sarga);

export default Sarga;