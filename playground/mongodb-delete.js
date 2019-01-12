//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

const url = 'mongodb://localhost:27017';

const dbName = 'TodoApp';

const client = new MongoClient(url, { useNewUrlParser: true });

client.connect((err, client) => {
  if(err) return console.log(err);

  console.log('Connected correctly to the server');

  const db = client.db(dbName);

  // db.collection('Users').deleteMany({name: 'MS'}).then((result) => {
  //   console.log(result.deletedCount);
  // });

  db.collection('Users').deleteOne({_id: ObjectId('5c38940d97f9b812f6ccb090')}).then((result) => {
    console.log(result.deletedCount);
  });

  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  //client.close();
});
