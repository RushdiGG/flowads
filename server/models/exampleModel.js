var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var modelSchema = new Schema({
	test: String
});

var Model = mongoose.model("test", modelSchema);


module.exports = Model;