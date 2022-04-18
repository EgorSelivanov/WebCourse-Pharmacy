var mongoose = require("mongoose"),
	CategorySchema;

CategorySchema = mongoose.Schema({
    category_name: String,
    category_link: String,
    id: String
});

var Category = mongoose.model("Category", CategorySchema);

module.exports = Category;