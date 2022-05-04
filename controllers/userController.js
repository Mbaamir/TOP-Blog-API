let userModel = require("../models/user");

exports.registerUser = function (req, res, next) {
  const createdUser = new userModel({
    username: req.body.username,
    password: req.body.password,
  }).save((err) => {
    if (err) {
      console.log(err, "error saving CreatedUser");
      res.sendStatus(400);
    } else {
      console.log("Created User");
      res.sendStatus(201);
    }
  });
};
