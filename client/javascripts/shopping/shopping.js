class Shopping {
	handleClear() {
		$('.store').empty();
	}

	constructor() {
		this.classNameActive = ' product__btn__active';
		this.labelAdd = 'Добавить в корзину';
		this.labelRemove = 'Удалить из корзины';
	}

	render() {
		const productsStore = localStorageUtil.getProducts();
		let htmlCatalog = '';
		let sumCatalog = 0;


		CATALOG.forEach(({ id, title, description, price, data_category, img }) => {
			if (productsStore.indexOf(id) !== -1) {
				let activeClass = '';
				let activeText = '';

				if (productsStore.indexOf(id) === -1) {
					activeText = this.labelAdd;
				} else {
					activeClass = this.classNameActive;
					activeText = this.labelRemove;
				}

				htmlCatalog += 
					`<div class="bucket-item" data-category="${data_category}"> 
						<div class="product">
							<img src=${img} alt="" class="product__img">
							<div class="bucket__content">
								<h3 class="product__title">${title}</h3>
								<p class="product__description">${description}</p>
							</div>
							<footer class="product__footer">
								<div class="product__bottom">
									<div class="product__price">
										<span class="product__price-value">${price}</span>
										<span class="product__currency">&#8381;</span>
										<button class="btn product__btn${activeClass}" type="button" onclick="productsPage.handleSetLocationStorage(this, '${id}');
										shoppingPage.render();">
										${activeText}</button>
									</div>
								</div>
							</footer>
						</div>
					</div>`;
					sumCatalog += price;
			}
		});

		const html = `
			<div class="shopping-container">
				<div class="shopping__close" onclick="shoppingPage.handleClear();productsPage.render();">
				</div>
				${htmlCatalog}
				<div class="sum-price">
					<h3 class="shopping-element__name">Сумма: </h3>
					<h4 class="shopping-element__price">${sumCatalog.toLocaleString()} &#8381</h4>
				</div>
			</div>
		`;

		$('.store').append(html);
	}
}

const shoppingPage = new Shopping();

