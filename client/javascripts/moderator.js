var userListMy = [];

var main = function () {
	"use strict";

	var htmlImage = `
		<div class="header-image">
			<a href="/"><img src="https://i.ibb.co/zSm08SY/apteka.png" alt="Аптека" style="width: 200px;"></a>
		</div>`;

	$('.main__header .container').append(htmlImage);	

	$('.moder__buttons').append(`<a href="/">
		<button class="btn__moder__return" type='button'>Вернуться на главную</button>
		</a>`);
	$('.moder__buttons').append(`
		<button class="btn__moder__add" type='button' onclick='addPage.render();'>Добавить новый продукт</button>
		`);
}



var searchProduct = function() {
	$('.catalog').empty();
	
	let htmlCatalog = '';

	var title = document.getElementById("input-product").value;

	if (title.trim() === "") {
		return;
	}

	$.ajax({
		'url': '/search/title/' + title,
		'type': 'GET'
	}).done(function(productObjects) {

		if (productObjects.length === 0) {
			addPage.render();
			return;
		}
		productObjects.forEach(({ _id, title, description, price, prescription, availability,
								data_category, amount, img, release_form }) => {
			var htmlAvailability = '';
			for (var i = 0; i < availability.length; i++) {
				htmlAvailability += availability[i];
				if (i != availability.length - 1)
					htmlAvailability += '; ';
			}

			var htmlReleaseForm = '';
			for (var i = 0; i < release_form.length; i++) {
				htmlReleaseForm += release_form[i];
				if (i != release_form.length - 1)
					htmlReleaseForm += '; ';
			}

			htmlCatalog += `<div class="catalog-item"> 
						<div class="product">
							<img src=${img} alt="" class="product__img">
							<div class="product__content">
								<h3 class="product__title">${title}</h3>
								<p class="product__description">${description}</p>
								<p class="product__description">Выпуск: ${prescription}</p>
								<p class="product__description">Тег: ${data_category}</p>
								<p class="product__description">Количество: ${amount}</p>
								<p class="product__description">Наличие: ${htmlAvailability}</p>
								<p class="product__description">Формы выпуска: ${htmlReleaseForm}</p>
							</div>
							<footer class="product__footer">
								<div class="product__bottom">
									<div class="product__price">
										<span class="product__price-value">${price}</span>
										<span class="product__currency">&#8381;</span>
										<button class="btn product__btn" 
										type="button" onclick="editPage.render('${_id}')">
										Редактировать</button>
										<button class="btn product__btn" 
										type="button" onclick="deletePage.deleteData('${_id}')">
										Удалить</button>
									</div>
								</div>
							</footer>
						</div>
					</div>`;
		})

		$('.catalog').append(htmlCatalog);
	}).fail(function(jqXHR, textStatus, error) {
		console.log(error);
		console.log(jqXHR.status + " " + jqXHR.textStatus);
		alert("Ошибка!" + jqXHR.status + " " + jqXHR.textStatus);	
	});
}


$(document).ready(function() {
	$('.menu-btn').on('click', function() {
		$('.menu').toggleClass('menu_active');
	});
	
	$('.search-med-btn').on('click', function(e) {
		e.preventDefault();
		searchProduct();
	});
	main();
});