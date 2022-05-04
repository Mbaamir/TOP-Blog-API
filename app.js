const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require('passport');

require("dotenv").config();
require("./config/database").connect();
require("./config/passport")(passport);
require("./auth/auth");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");



console.log("Start");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "public")));


app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts",postsRouter);


let PORT = process.env.PORT || 3000;

app.listen(PORT || 3000, () => {
  console.log("Listening on Port " + PORT);
});

module.exports = app;
