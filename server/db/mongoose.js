var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;
