import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var kanda = new Schema({
  name: {
    type: String,
    required: true
  },
}, {timestamps:true, collection: 'kanda' });

mongoose.models = {};

var Kanda = mongoose.model('kanda', kanda);

export default Kanda;