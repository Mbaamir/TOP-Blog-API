const mongoose = require("mongoose");
const postModel = require("../models/post");
const userModel = require("../models/user");

exports.createPost = function (req, res, next) {
  const username = req.body.username;
  userModel.findOne({ username }).then((foundUser) => {
    try {
      if (foundUser) {
        const createdPost = new postModel({
          user: foundUser,
          body: req.body.postBody,
        }).save((err) => {
          if (err) {
            console.log(err, "error Saving created post");
            res.status(400).json({ err });
          } else {
            console.log("Created post");
            res.sendStatus(201);
          }
        });
      } else {
        res.status(400).json({ message: "No such user exists" });
      }
    } catch (err) {
      console.log(err, "Error Creating Post");
      res.status(500).json({ err });
    }
  });
};
