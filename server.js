var express = require("express"),
	http = require("http"),
	// импортируем библиотеку mongoose
	mongoose = require("mongoose"),
	app = express(),
	productController = require("./controllers/product_controller.js"),
	categoryController = require("./controllers/category_controller.js"),
	usersController = require("./controllers/users_controller.js");

app.use('/', express.static(__dirname + "/client"));

// командуем Express принять поступающие
// объекты JSON
app.use(express.urlencoded({ extended: true}));

// подключаемся к хранилищу данных Pharmacy в Mongo
mongoose.connect('mongodb://localhost/pharmacy',{
				useNewUrlParser: true,
				useCreateIndex: true,
				useUnifiedTopology: true
}).then(res => {
	console.log("DB connected");
}).catch(err => {
	console.log("ERROR" + err);
});

// начинаем слушать запросы
http.createServer(app).listen(3000);

app.get("/product.json", productController.index);
app.get("/product.json/:data_category", productController.showByCategory);
app.get("/product/:id", productController.show);
app.get("/search/:title", productController.showByName); 
app.post("/product", productController.create);
app.put("/product/:id", productController.update);
app.delete("/product/:id", productController.destroy);

app.get("/category.json", categoryController.index);
app.post("/category", categoryController.create);
app.get("/category/:category_link", categoryController.show);
app.put("/category/:category_link", categoryController.update);
app.delete("/category/:category_link", categoryController.destroy);

app.get("/category/:category_link/product.json", productController.index);
app.post("/category/:category_link/product", productController.create);
app.put("/category/:category_link/product/:id", productController.update);
app.delete("/category/:category_link/product/:id", productController.destroy);

app.get("/apothecary.json", usersController.index);
app.get("/apothecary/:username/apothecary.json", usersController.index);
app.post("/apothecary", usersController.create);
app.get("/apothecary/:username", usersController.show);
app.put("/apothecary/:username", usersController.update);
app.delete("/apothecary/:username", usersController.destroy);