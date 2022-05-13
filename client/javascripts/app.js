var buildLink = function () {
	var htmlImage = `
		<div class="header-image">
			<a href="/"><img src="https://i.ibb.co/zSm08SY/apteka.png" alt="Аптека" style="width: 200px;"></a>
		</div>`;

	$('.main__header .container').append(htmlImage);
};

var buildCategories = function (categoryObjects) {
	$('.header-nav .categories').empty();
	
	for (var i = 0; i < categoryObjects.length; i++) {
		var $categoryListItem = liaWithOpenOnClick(categoryObjects[i]);
		$('.header-nav .categories').append($categoryListItem);
	}

};

var liaWithOpenOnClick = function(category) {
	var $categoryListItem = $("<li>"),
		$categoryLink = $("<a>").attr("href", "/category/" + category.category_link);
	
	$categoryLink.text(category.category_name);

	$categoryLink.on("click", function (e) {
		e.preventDefault();
		$.ajax({
				'url': '/category/' + category.category_link,
				'type': 'GET'
			}).done(function(response) {
				window.location.replace('/category/' + category.category_link + '/');
			}).fail(function(jqXHR, textStatus, error) {
				console.log(error);
				console.log(jqXHR.status + " " + jqXHR.textStatus);
				alert("Ошибка!" + jqXHR.status + " " + jqXHR.textStatus);	
			});
	});
	
	$categoryListItem.append($categoryLink);

	return $categoryListItem;
};

var searchProduct = function() {
	$('.catalog').empty();
	const productsStore = localStorageUtil.getProducts();
	let htmlCatalog = '';

	var title = document.getElementById("input-product").value;
	document.getElementById("input-product").value = "";

	$.get("/search/" + title, function(productObjects){
		productObjects.forEach(({ _id, title, description, price, img }) => {
			let activeClass = '';
			let activeText = '';

			if (productsStore.indexOf(_id) === -1) {
				activeText = 'Добавить в корзину';
			} else {
				activeClass = ' product__btn__active';
				activeText = 'Удалить из корзины';
			}

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
		})

		$('.catalog').append(htmlCatalog);
	})
}

$(document).ready(function () {
	buildLink();

	$.getJSON("/category.json", function (categoryObjects) {
		// вызов функции main с аргументом в виде объекта categoryObjects
		buildCategories(categoryObjects);
	});

	$('.menu-btn').on('click', function() {
		$('.menu').toggleClass('menu_active');
	});

	$('.search-med-btn').on('click', function(e) {
		e.preventDefault();
		searchProduct();
	});
});

