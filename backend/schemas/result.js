const mongoose = require("mongoose");
const Wish = require("./wish");
const result = new mongoose.Schema(
  {
    identifier: String,
    name: String,
    target: String,
    wish: String,
    unwish: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", result);
