var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var modelSchema = new Schema({
  title: String,
  canvas: Object,
  created: String,
  width: Number,
  height: Number,
  dynamicObjects: Array,
});

var Model = mongoose.model("templates", modelSchema);

module.exports = Model;
