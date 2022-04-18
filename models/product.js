var mongoose = require("mongoose"),
	ProductSchema,
    ObjectId = mongoose.Schema.Types.ObjectId;

ProductSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    prescription: String,
    availability: [ String ],
    release_form: [ String ],
    amount: Number,
    data_category: String,
    img: String,
    owner_category: { type: ObjectId, ref: "Category" }
});

var Product = mongoose.model("Product", ProductSchema);

module.exports = Product;