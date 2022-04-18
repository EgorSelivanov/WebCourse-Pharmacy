class Shopping {
	handleClear() {
		$('.store').empty();
	}

	render() {
		const productsStore = localStorageUtil.getProducts();
		let htmlCatalog = '';
		let prices = localStorageUtil.getPrices();
		var sumCatalog = 0;

		prices.forEach((price) => {
			sumCatalog += price;
		})

		const html = `
			<div class="shopping-container">
				<div class="shopping__close" onclick="shoppingPage.handleClear();productsPage.render();">
				</div>
				<div class="sum-price">
					<h3 class="shopping-element__name">Сумма: </h3>
					<h4 class="shopping-element__price">${sumCatalog.toLocaleString()} &#8381</h4>
				</div>
			</div>
		`;

		$('.store').append(html);

		
		productsStore.forEach((id) => {
			$.get("/product/" + id, function({ _id, title, description, price, img }){
					var activeClass = ' product__btn__active';
					var activeText = 'Удалить из корзины';

					var htmlCatalogItem = 
							`<div class="bucket-item"> 
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
												<button class="btn product__btn${activeClass}" type="button" onclick="productsPage.handleSetLocationStorage(this, '${_id}', ${price});
												shoppingPage.render();">
												${activeText}</button>
											</div>
										</div>
									</footer>
								</div>
							</div>`;
					$('.shopping-container').append(htmlCatalogItem);
				})
		});
	}
}

const shoppingPage = new Shopping();


