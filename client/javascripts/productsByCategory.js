class ProductsByCategory {
	constructor() {
		var catalogNav = document.querySelector('.catalog-nav');
		catalogNav.addEventListener('click', function(e) {
			var target = e.target;
			var item = myLib.closestItemByClass(target, 'catalog-nav__btn');

			if (item === null || item.classList.contains('is-active')) {
				return;
			}

			e.preventDefault();

			var previousBtnActive = catalogNav.querySelector('.catalog-nav__btn.is-active');

			previousBtnActive.classList.remove('is-active');
			item.classList.add('is-active');

			productsPage.render();
		});
	}

	handleSetLocationStorage(element, id, price) {
		const { pushProduct, products, prices } = localStorageUtil.putProducts(id, price);

		if (pushProduct) {
			element.className += ' product__btn__active';
			element.innerHTML = 'Удалить из корзины';
		} else {
			element.className -= ' product__btn__active';
			element.className += ' product__btn';
			element.innerHTML = 'Добавить в корзину';
		}

		bucketPage.render(products.length);
	}
	
	render() {
		$('.catalog').empty();
		const productsStore = localStorageUtil.getProducts();
		let htmlCatalog = '';

		var filterValue = $('.catalog-nav__btn.is-active').attr('data-filter');
	
		$.getJSON("product.json/" + filterValue, function(productObjects){
			productObjects.forEach(({ _id, title, description, price, img, amount }) => {
				let activeClass = '';
				let activeText = '';

				if (productsStore.indexOf(_id) === -1) {
					activeText = 'Добавить в корзину';
				} else {
					activeClass = ' product__btn__active';
					activeText = 'Удалить из корзины';
				}

				if (amount != 0)
				{
					htmlCatalog += `<div class="catalog-item"> 
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
												<button class="btn product__btn${activeClass}" 
												type="button" onclick="productsPage.handleSetLocationStorage(this, '${_id}', ${price})">
												${activeText}</button>
											</div>
										</div>
									</footer>
								</div>
							</div>`;
				}
				else
				{
					htmlCatalog += `<div class="catalog-item"> 
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
												<p>Товара нет в наличии</p>
											</div>
										</div>
									</footer>
								</div>
							</div>`;
				}
			})

			$('.catalog').append(htmlCatalog);
		});
	}
}

const productsPage = new ProductsByCategory();
productsPage.render();