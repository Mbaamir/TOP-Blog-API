let mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let Schema = mongoose.Schema;

let userSchema = new Schema({
  _userId: Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 30,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", function () {
  const hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
});

userSchema.methods.isValidPassword = async function (password) {
  const doesPasswordMatch = bcrypt.compareSync(password, this.password);
  return doesPasswordMatch;
};

module.exports = mongoose.model("user", userSchema);
