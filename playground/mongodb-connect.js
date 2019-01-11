// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

var obj = new ObjectId();
console.log(obj);

const url = 'mongodb://localhost:27017';

const dbName = 'TodoApp';

const client = new MongoClient(url, { useNewUrlParser: true });

client.connect((err, client) => {
  if(err) return console.log(err);

  console.log('Connected correctly to the server');

  const db = client.db(dbName);

  // db.collection('Todos').insertOne({
  //   text: 'Drink water',
  //   completed: true
  // }, (err, result) => {
  //   if(err) return console.log(err);
  //
  //   //console.log(result);
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });


  // db.collection('Users').insertOne({
  //   name: 'MSI',
  //   age: 25,
  //   location: 'India'
  // }, (err, result) => {
  //   if(err) return console.log(err);
  //
  //   console.log(result.insertedId.getTimestamp());
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  client.close();
});
