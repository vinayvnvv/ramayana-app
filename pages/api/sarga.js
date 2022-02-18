import connectDB from '../../middleware/mongodb';
import Sarga from '../../models/sarga';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const {name, kanda} = req.body;
    var sarga = new Sarga({
        name: name,
        kanda,
      });
      var k = await sarga.save();
      return res.status(200).send(k);
  } else if(req.method === 'GET') {
    console.log(req)
    const {kanda: kandaFilter} = req.query;
    const filter = {};
    if(kandaFilter) {
      filter['kanda'] = kandaFilter;
    };
    console.log(kandaFilter)
    Sarga.find(filter).populate('kanda').exec((err, doc) =>{
        if(err){
           console.log(err)
        } else{
            return res.status(200).send(doc);
        }
     });
  } else {
    res.status(422).send('err');
  }
};

export default connectDB(handler);