// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const mongoose = require('mongoose');



export default function handler(req, res) {
  main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}

main();
  res.status(200).json({ name: 'John Doe' })
}
