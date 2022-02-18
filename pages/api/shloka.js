import connectDB from '../../middleware/mongodb';
import Shloka from '../../models/shloka';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const {name, kanda, shloka_number, sarga, text} = req.body;
    var shloka = new Shloka({
        name: name,
        kanda,
        sarga,
        shloka_number,
        text,
      });
      var k = await shloka.save();
      return res.status(200).send(k);
  } else if(req.method === 'GET') {
    const {kanda: kandaFilter, sarga: sargaFilter} = req.query;
    const filter = {};
    if(kandaFilter) {
      filter['kanda'] = kandaFilter;
    }
    if(sargaFilter) {
      filter['sarga'] = sargaFilter;
    }
    Shloka.find(filter).populate('kanda').populate('sarga').exec((err, doc) =>{
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