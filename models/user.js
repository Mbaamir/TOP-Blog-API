let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let userSchema = new Schema({
  _userId: Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 30,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    type: String,
    required: true,
    minLength: 8,
    maxLength: 50,
    trim: true,
  },
});


module.exports = mongoose.model('user',userSchema);