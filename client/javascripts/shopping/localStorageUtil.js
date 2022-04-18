class LocalStorageUtil {
	constructor() {
		this.keyName = 'products';
		this.keyPrice = 'price';
	}

	getProducts() {
		const productsLocalStorage = localStorage.getItem(this.keyName);
		if (productsLocalStorage !== null) {
			return JSON.parse(productsLocalStorage);
		}
		return [];
	}

	getPrices() {
		const productsLocalStorage = localStorage.getItem(this.keyPrice);
		if (productsLocalStorage !== null) {
			return JSON.parse(productsLocalStorage);
		}
		return [];
	}

	putProducts(id, price) {
		let products = this.getProducts();
		let prices = this.getPrices();
		let pushProduct = false;
		
		const index = products.indexOf(id);

		if (index === -1) {
			products.push(id);
			prices.push(price);
			pushProduct = true;
		} else {
			products.splice(index, 1);
			prices.splice(index, 1);
		}

		localStorage.setItem(this.keyName, JSON.stringify(products));
		localStorage.setItem(this.keyPrice, JSON.stringify(prices));

		return { pushProduct, products, prices }
	}
}

const localStorageUtil = new LocalStorageUtil();
