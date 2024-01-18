var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var modelSchema = new Schema({
	name: String,
	email: String,
	password: String,
	created: String
});

var Model = mongoose.model("users", modelSchema);


module.exports = Model;