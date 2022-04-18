var Category = require("../models/category.js"),
	Product = require("../models/product.js"),
	mongoose = require("mongoose");

var CategoryController = {};

CategoryController.index = function(req, res) {
	console.log('Вызвано действие: .index');
	Category.find(function (err, categories) {
		if (err !== null) {
		  res.json(500, err);
		} else {
			res.status(200).json(categories);
		}
	});
};

//Отобразить категории
CategoryController.show = function(req, res) {
	console.log('Вызвано действие: отобразить категории');
	Category.find({'category_link': req.params.category_link}, function(err, result) {
		if (err) {
			console.log(err);
		} else if (result.length !== 0) {
			console.log(result);
			res.sendfile('./client/listproducts.html');
		} else {
		  res.send(404);
		}
	});
};

//Создать новую категорию
CategoryController.create = function(req, res) {
	console.log('Вызвано действие: создать категорию');
	var category_name = req.body.category_name;
	Category.find({"category_name": category_name}, function (err, result) {
	    if (err) {
	        console.log(err);
	        res.send(500, err);
	    } else if (result.length !== 0) {
			res.status(501).send("Категория уже существует");
	        console.log(err);   
	    } else {
	        var newCategory = new Category({
	            "category_name": category_name
	        });
	        newCategory.save(function(err, result) {
	            console.log(err); 
	            if (err !== null) {
	                res.json(500, err); 
	            } else {
	                res.json(200, result);
	                console.log(result); 
	            }
	        });
	    }
	}); 
};

//Обновить существующую категорию
CategoryController.update = function(req, res) {
	console.log("Вызвано действие: обновить категории");
	var category_name = req.params.category_name;
	var newCategory_name = {$set: {category_name: req.body.category_name}};
	Category.updateOne({"category_name": category_name}, newCategory_name, function (err,category) {
		if (err !== null) {
			res.status(500).json(err);
		} else {
			if (category.n === 1 && category.nModified === 1 && category.ok === 1) {
				console.log('Изменен');
				res.status(200).json(category);
			} else {
				res.status(404);
			}
		}
	});
};

//Удалить существующую категорию
CategoryController.destroy = function(req, res) {
	console.log("Вызвано действие: удалить категорию");
	var category_name = req.params.category_name;
	Category.find({"category_name": category_name}, function (err, result) {
		if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
			Category.deleteOne({"category_name": category_name}, function (err, category) {
				if (err !== null) {
					res.status(500).json(err);
				} else {
					if (category.n === 1 && category.ok === 1 && category.deletedCount === 1) {
						res.status(200).json(category);
					} else {
						res.status(404).json({"status": 404});
					}
				}
			});
        	
        } else {
            res.status(404).send("Категория не существует");
            console.log(err);   
        }
	});
};

module.exports = CategoryController;