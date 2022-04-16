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

		var flag = false;

		CATALOG.forEach(({ id, title, description, price, data_category, img }) => {
			if (productsStore.indexOf(id) !== -1) {

				flag = true;
				let activeClass = '';
				let activeText = '';

				if (productsStore.indexOf(id) === -1) {
					activeText = this.labelAdd;
				} else {
					activeClass = this.classNameActive;
					activeText = this.labelRemove;
				}

				htmlCatalog += 
					`<div class="catalog-item" data-category="${data_category}"> 
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
					sumCatalog += price;
			}
		});

		if (!flag){
			return;
		}

		const html = `
			<div class="shopping-container">
				<div class="shopping__close" onclick="shoppingPage.handleClear();">
				</div>
				${htmlCatalog}
			</div>
		`;

		$('.store').append(html);
	}
}

const shoppingPage = new Shopping();

/*<tr>
					<td class="shopping-element__name">Сумма: </td>
					<td class="shopping-element__price">${sumCatalog.toLocaleString()}</td>
				</tr>*/