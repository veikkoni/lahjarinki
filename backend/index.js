const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const config = require("./config");
const Wish = require("./wish");

mongoose.connect(config.mongoUrl, { 
  useNewUrlParser: true, useUnifiedTopology: true, }, () => {
    console.log("Mongoose connected");
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors( {origin: "http://localhost:3000" }));


app.post("/join", (req, res, next) => {

  console.log("Request to post login")
  console.log(req.body);

  const newWish = new Wish({
    name: req.body.name,
    wish: req.body.wish,
    unwish: req.body.unwish,
    participating: req.body.participating,
    circle: req.body.circle,
  });

  newWish.save();
  
  res.json({ status: 'ok' });

});


app.listen(config.port, () => {
  console.log("Server running");
});
