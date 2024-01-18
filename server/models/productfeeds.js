var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var modelSchema = new Schema({
  title: String,
  products: Array,
  productfields: Array,
  link: String,
  created: String,
  adfeeds: Array,
});

var Model = mongoose.model("productfeeds", modelSchema);

module.exports = Model;
