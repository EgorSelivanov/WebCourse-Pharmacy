var Product = require("../models/product.js"),
	ProductsController = {},
	Category = require("../models/category.js");

ProductsController.index = function(req, res) {
	var category_link = req.params.category_link || null,
		respondWithProducts;
	
	respondWithProducts = function(query) {
		Product.find(query, function(err, Products){
			if (err !== null) {
				res.json(500, err);
			} else {
				res.status(200).json(Products);
			}
		});
	};
	
	if (category_link !== null) {
		Category.find({"category_link": category_link}, function(err, result){
			if (err !== null) {
				res.json(500, err);
			} else if (result.length === 0) {
				res.status(404).json({"result_length" : 0});
			} else {
				respondWithProducts({"owner_category": result[0]._id});
			}
		});
	} else {
		respondWithProducts({});
	}
};

ProductsController.create = function (req, res) {
	var category_name = req.params.category_name || null,
		newProduct = new Product({
			"title": req.body.title,
		    "description": req.body.description,
		    "price": req.body.price,
		    "prescription": req.body.prescription,
		    "availability": req.body.availability,
		    "release_form": req.body.release_form,
		    "amount": req.body.amount,
		    "data_category": req.body.data_category,
		    "img": req.body.img
		});
	Category.find({"category_name": category_name}, function (err, result) {
		if (err) {
			res.send(500);
		} else {
			if (result.length === 0) {
				newProduct.owner_category = null;
			} else {
				newProduct.owner_category = result[0]._id;
			}
			newProduct.save(function (err, result) {
				if (err !== null) {
					res.json(500, err);
				} else {
					res.status(200).json(result);
				}
			});
		}
	});
};

ProductsController.show = function (req, res) {
	// это ID, который мы отправляем через URL
	var id = req.params.id;
	// находим элемент списка задач с соответствующим ID 
	Product.find({"_id":id}, function (err, Product) {
		if (err !== null) {
			// возвращаем внутреннюю серверную ошибку 
			console.log("ERROR" + err);
			res.status(500).json(err);
		} else {
			if (Product.length > 0) {
				// возвращаем успех!
				res.status(200).json(Product[0]);
			} else {
				// мы не нашли элемент списка задач с этим ID! 
				res.send(404);
			}
		}
	});
};

ProductsController.showByCategory = function (req, res) {
	// это data_category, который мы отправляем через URL
	var data_category = req.params.data_category;
	// находим элемент списка задач с соответствующим ID 
	Product.find({"data_category":data_category}, function (err, product) {
		if (err !== null) {
			// возвращаем внутреннюю серверную ошибку 
			console.log("ERROR" + err);
			res.status(500).json(err);
		} else {
			if (Product.length > 0) {
				// возвращаем успех!
				res.status(200).json(product);
			} else {
				// мы не нашли элемент списка задач с этим ID! 
				res.send(404);
			}
		}
	});
};

ProductsController.destroy = function (req, res) {
	var id = req.params.id;
	Product.deleteOne({"_id": id}, function (err, Product) {
		if (err !== null) {
			res.status(500).json(err);
		} else {
			if (Product.n === 1 && Product.ok === 1 && Product.deletedCount === 1) {
				res.status(200).json(Product);
			} else {
				res.status(404).json({"status": 404});
			}
		}
	});
};

ProductsController.update = function (req, res) {
	var id = req.params.id;
	var newDescription = {$set: {
			title: req.body.title,
		    description: req.body.description,
		    price: req.body.price,
		    prescription: req.body.prescription,
		    availability: req.body.availability,
		    release_form: req.body.release_form,
		    amount: req.body.amount,
		    data_category: req.body.data_category,
		    img: req.body.img }};
	Product.updateOne({"_id": id}, newDescription, function (err, Product) {
		if (err !== null) {
			res.status(500).json(err);
		} else {
			if (Product.n === 1 && Product.nModified === 1 && Product.ok === 1) {
				res.status(200).json(Product);
			} else {
				res.status(404).json({"status": 404});
			}
		}
	});
};

module.exports = ProductsController;