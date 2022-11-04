const mongoose = require("mongoose");
const wish = new mongoose.Schema(
  {
    username: String,
    password: String,
    name: String,
    wish: String,
    unwish: String,
    participating: Boolean,
    circle: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wish", wish);
