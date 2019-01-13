const {ObjectId} = require('mongodb');

const mongoose = require('../server/db/mongoose');
const Todo = require('../server/models/todo');

var id = '5c3b417f2c17aa3468c76891';

// Todo.find({
//   _id: id
// }).then((todos) => console.log(todos));
//
//
// Todo.findOne({
//   _id: id
// }).then((todo) => console.log(todo));


// if(!ObjectId.isValid(id)) {
//   console.log('Invalid ID');
// }


Todo.findById(id).then((todo) => {
  if (!todo) return console.log('No item with this ID');
  console.log('By ID', todo);
}).catch((e) => console.log(e));
