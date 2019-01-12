var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});


module.exports = mongoose.model('User', UserSchema);
