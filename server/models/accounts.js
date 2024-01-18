var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var modelSchema = new Schema({
  name: String,
  fb_id: String,
});

var Model = mongoose.model("accounts", modelSchema);

module.exports = Model;
