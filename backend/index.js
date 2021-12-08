const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const config = require("./config");
const Wish = require("./schemas/wish");
const Result = require("./schemas/result")

mongoose.connect(config.mongoUrl, { 
  useNewUrlParser: true, useUnifiedTopology: true, }, () => {
    console.log("Mongoose connected");
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


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

app.get("/results/:id", (req, res, next) => {

  console.log("Request to get results")
  Result.findOne({identifier: req.params.id}, function(err, obj) {    
    if (err) {
      res.json({ status: 'error' })
    } else {
      console.log(obj.name)
      res.json({ 
       status: 'ok',
       result: {
         name: obj.name,
         target: obj.target,
         wish: obj.wish,
         unwish: obj.unwish
       }
      });
    }            
});
});


app.get("/addResult/:identifier/:name/:target", (req, res, next) => {

  console.log("debv")
  console.log(req.params.name)
  console.log(req.params.target)

  Wish.findOne({name: req.params.target}, function(err, obj) {    
    if (err) {
      res.json({ status: 'error' })
    } else {
      const newResult = new Result({
        identifier: req.params.identifier,
        name: req.params.name,
        target: obj.name,
        wish: obj.wish,
        unwish: obj.unwish,
      });
      newResult.save();
      res.json({ status: 'ok' });
    }            
})

  
});



app.listen(config.port, () => {
  console.log("Server running");
});
