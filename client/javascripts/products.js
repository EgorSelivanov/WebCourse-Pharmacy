class Products {
	constructor() {
		this.classNameActive = ' product__btn__active';
		this.labelAdd = 'Добавить в корзину';
		this.labelRemove = 'Удалить из корзины';
	}

	handleSetLocationStorage(element, id) {
		const { pushProduct, products } = localStorageUtil.putProducts(id);

		if (pushProduct) {
			element.className += this.classNameActive;
			element.innerHTML = this.labelRemove;
		} else {
			element.className -= this.classNameActive;
			element.className += ' product__btn';
			element.innerHTML = this.labelAdd;
		}

		bucketPage.render(products.length);
	}
	
	render() {
		const productsStore = localStorageUtil.getProducts();
		let htmlCatalog = '';

		CATALOG.forEach(({ id, title, description, price, data_category, img }) => {
			let activeClass = '';
			let activeText = '';

			if (productsStore.indexOf(id) === -1) {
				activeText = this.labelAdd;
			} else {
				activeClass = this.classNameActive;
				activeText = this.labelRemove;
			}

			htmlCatalog += `<div class="catalog-item" data-category="${data_category}"> 
						<div class="product">
							<img src=${img} alt="" class="product__img">
							<div class="product__content">
								<h3 class="product__title">${title}</h3>
								<p class="product__description">${description}</p>
							</div>
							<footer class="product__footer">
								<div class="product__bottom">
									<div class="product__price">
										<span class="product__price-value">${price}</span>
										<span class="product__currency">&#8381;</span>
										<button class="btn product__btn${activeClass}" type="button" onclick="productsPage.handleSetLocationStorage(this, '${id}')">
										${activeText}</button>
									</div>
								</div>
							</footer>
						</div>
					</div>`;
		})

		$('.catalog').append(htmlCatalog);

		return htmlCatalog;
	}
}

const productsPage = new Products();
const codeHtmlElement = productsPage.render();