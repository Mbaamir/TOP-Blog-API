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

userSchema.pre("save", async function (next) {
  const user = this;
  const hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
});

userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const doesPasswordMatch = await bcrypt.compare(password, user.password);
  return doesPasswordMatch;
};

module.exports = mongoose.model("user", userSchema);
