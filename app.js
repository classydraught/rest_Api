const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const courseRoutes = require("./api/routes/courses");
const reviewRoutes = require("./api/routes/reviews");
const mongoose = require("mongoose");

//mongoose conncetion

mongoose.connect(
  "mongodb+srv://admin:0103@cluster0-hugzn.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.Promise = global.Promise;

//cors handling

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//logging the request

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/images", express.static("images"));

//routes for the app

app.use("/courses", courseRoutes);
app.use("/reviews", reviewRoutes);

//handling errors after reaching above two files

app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
});

module.exports = app;
