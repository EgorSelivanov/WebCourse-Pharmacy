class Shopping {
	handleClear() {
		$('.store').empty();
	}

	handleBuyProducts() {
		const productsStore = localStorageUtil.getProducts();
		productsStore.forEach((id) => {
			$.get("/product/" + id, function({ _id, title, description, price, prescription, availability, release_form, 
				amount, data_category, img }){
				$.ajax({
				    type: 'PUT',
				    url: `/product/${_id}`, // адрес запроса
				    data: { _id, title, description, price, prescription, availability, release_form, 
				'amount': amount - 1, data_category, img }, // данные запроса
				    dataType: 'json', // тип ожидаемых данных,
				    success: function(data) { console.log(data); }, // обработка ответа от сервера
				    error: function(jqXHR) { console.log('Ошибка выполнения'); },
				    complete: function() { console.log('Завершение выполнения'); }
				});
				productsPage.handleSetLocationStorage(this, _id, price);
				shoppingPage.handleClose();
			});
		});
		$('.store').empty();
	}

	handleClose() {
		var searcher = document.getElementById("input-product").value || null;
		if (searcher === null || searcher.trim() === "") {
			productsPage.render();
		}
		else {
			$('.search-med-btn').click();
		}
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
				<div class="shopping__close" onclick="shoppingPage.handleClear();shoppingPage.handleClose();">
				</div>
				<div class="sum-price">
					<h3 class="shopping-element__name">Сумма: </h3>
					<h4 class="shopping-element__price">${sumCatalog.toLocaleString()} &#8381</h4>
				</div>
			</div>
		`;

		$('.store').append(html);

		
		productsStore.forEach((id) => {
			$.get("/product/" + id, function({ _id, title, description, price, img, amount }){
					var activeClass = ' product__btn__active';
					var activeText = 'Удалить из корзины';

					var htmlCatalogItem;

					if (amount != 0) {
						htmlCatalogItem = 
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
					}
					else {
						htmlCatalogItem = 
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
													<p>Товара нет в наличии</p>
												</div>
											</div>
										</footer>
									</div>
								</div>`;
					}
					$('.shopping-container').append(htmlCatalogItem);
				})
		});

		var htmlBuyButton = 
		`<button class="btn buy__btn" type="button" onclick="shoppingPage.handleBuyProducts();">Купить</button>`
		$('.shopping-container').append(htmlBuyButton);
	}
}

const shoppingPage = new Shopping();


