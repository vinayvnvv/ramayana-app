import connectDB from '../../middleware/mongodb';
import Kanda from '../../models/kanda';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const {name} = req.body;
    console.log(name)
    var kanda = new Kanda({
        name: name,
      });
    try {
      console.log(kanda);
      var k = await kanda.save();
      return res.status(200).send(k);
    } catch (err) {
      return res.status(400).send(err);
    }
  } else if(req.method === 'GET') {
    Kanda.find({}, (err, k) => {
        if(!err) {
            res.status(200).send(k);
        }
    })
  } else {
    res.status(422).send('err');
  }
};

export default connectDB(handler);