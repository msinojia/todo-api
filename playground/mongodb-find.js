//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

const url = 'mongodb://localhost:27017';

const dbName = 'TodoApp';

const client = new MongoClient(url, { useNewUrlParser: true });

client.connect((err, client) => {
  if(err) return console.log(err);

  console.log('Connected correctly to the server');

  const db = client.db(dbName);

  db.collection('Todos').find({
    _id: new ObjectId('5c1a9062ad2ccf465d3bead6')
  }).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Error: ', err);
  });

  //client.close();
});
