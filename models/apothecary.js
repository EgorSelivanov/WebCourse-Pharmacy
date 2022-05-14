var mongoose = require("mongoose");

// Это модель Mongoose для пользователей
var ApothecarySchema = mongoose.Schema({
	username: String,
	id: String,
	role: String
});

var Apothecary = mongoose.model("User", ApothecarySchema);
module.exports = Apothecary;