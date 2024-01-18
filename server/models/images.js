var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var modelSchema = new Schema({
  url: String,
  width: Number,
  height: Number,
  thumbnail: String,
});

var Model = mongoose.model("images", modelSchema);

module.exports = Model;
