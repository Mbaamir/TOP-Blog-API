var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require('passport');

require("dotenv").config();
require("./config/database").connect();
require("./config/passport")(passport);
require("./auth/auth");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");


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

let PORT = process.env.PORT || 3000;

app.listen(PORT || 3000, () => {
  console.log("Listening on Port " + PORT);
});

module.exports = app;
