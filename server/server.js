const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');
const _ = require('lodash');

var mongoose = require('./db/mongoose.js');
var User = require('./models/user.js');
var Todo = require('./models/todo.js');

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());


app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => res.send(doc), (e) => res.status(400).send(e));
});


app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => res.send(e));
});


app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectId.isValid(id)) {
    return res.sendStatus(404);
  }

  Todo.findById(id)
    .then((todo) => {
    if(!todo) return res.sendStatus(404);
    res.send({todo});
  })
  .catch((e) => res.sendStatus(500));
});


app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectId.isValid(id)) {
    return res.sendStatus(404);
  }

  Todo.findByIdAndDelete(id)
    .then((todo) => {
      if(!todo) return res.sendStatus(404);
      res.send({todo});
    })
    .catch((e) => res.sendStatus(500));
});


app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectId.isValid(id)) {
    return res.sendStatus(404);
  }

  var body = _.pick(req.body, ['text', 'completed']);

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo) return res.sendStatus(404);
    res.send({todo});
  }).catch((e) => res.sendStatus(500));
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
