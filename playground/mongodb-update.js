//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

const url = 'mongodb://localhost:27017';

const dbName = 'TodoApp';

const client = new MongoClient(url, { useNewUrlParser: true });

client.connect((err, client) => {
  if(err) return console.log(err);

  console.log('Connected correctly to the server');

  const db = client.db(dbName);

  // db.collection('Todos').findOneAndUpdate({
  //     _id: ObjectId('5c1a9062ad2ccf465d3bead6')
  //   }, {
  //     $set: {
  //       completed: true
  //     }
  //   }, {
  //     returnOriginal: false
  //   }).then((result) => {
  //     console.log(result);
  //   });

  db.collection('Users').findOneAndUpdate({
    _id: ObjectId('5c38979f3b93c5143bbefdac')
  }, {
    $set: {name: 'John'},
    $inc: {age: 1}
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  //client.close();
});
