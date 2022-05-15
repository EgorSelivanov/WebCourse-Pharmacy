class EditPage {
	handleClear() {
		$('.edit__page').empty();
	}

	render(id) {
		let htmlEditor = '';

		const html = `
			<div class="shopping-container">
				<div class="shopping__close" onclick="editPage.handleClear();">
				</div>
			</div>
		`;

		$('.edit__page').append(html);
		
		$.get("/product/" + id, function({ _id, title, description, price, prescription, availability,
								data_category, amount, img, release_form }){

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

			var htmlCatalogItem = 
					`<div class="bucket-item"> 
						<div class="product">
							<img src=${img} alt="" class="product__img__edit">

							<div class="bucket__content">
							<form>
								<h2 class="descr">Название: </h2>
								<input name="data" id="edit__title" class="edit__parameter" value="${title}" required>
								<h2 class="descr">Описание: </h2>
								<input name="data" id="edit__descr" class="edit__parameter" value="${description}" required>
								<h2 class="descr">Цена: </h2>
								<input id="edit__price" class="edit__parameter" value="${price}" required>
								<h2 class="descr">Выпуск: </h2>
								<input id="edit__prescription" class="edit__parameter" value="${prescription}" required>
								<h2 class="descr">Наличие(вводить через ; с пробелом): </h2>
								<input id="edit__availability" class="edit__parameter" value="${htmlAvailability}">
								<h2 class="descr">Тег (health,goods_of_day,beauty,for_children,none): </h2>
								<input id="edit__data_category" class="edit__parameter" value="${data_category}" required>
								<h2 class="descr">Количество: </h2>
								<input id="edit__amount" class="edit__parameter" value="${amount}" min="0" max="1000">
								<h2 class="descr">Формы выпуска(вводить через ; с пробелом): </h2>
								<input id="edit__release_form" class="edit__parameter" value="${htmlReleaseForm}" required>
								<h2 class="descr">Картинка: </h2>
								<input id="edit__img" class="edit__parameter" value="${img}" required>

								<button class="btn edit__btn" 
								type="button" onclick="editPage.editData('${id}')">Редактировать</button>
							</form>
							</div>
						
						</div>
					</div>`;
			$('.shopping-container').append(htmlCatalogItem);
		});
	}

	editData(id) {
		var title = $("#edit__title").val(),
			description = $("#edit__descr").val(),
			price = $("#edit__price").val(),
			prescription = $("#edit__prescription").val(),
			availability = $("#edit__availability").val().split('; '),
			data_category = $("#edit__data_category").val(),
			amount = $("#edit__amount").val(),
			release_form = $("#edit__release_form").val().split('; '),
			img = $("#edit__img").val();

		if (title.trim() === "" || description.trim() === "" || price.trim() === "" || prescription.trim() === "" ||
			data_category.trim() === "" || amount.trim() === "" || img.trim() === ""){
			return;
		}

		if (isNaN(amount)){
			alert('Количество должно быть числом!');
			return;
		}

		if (isNaN(price)){
			alert('Цена должна быть числом!');
			return;
		}

		if (data_category != 'goods_of_day' && data_category != 'health' && data_category != 'for_children' && 
			data_category != 'beauty' && data_category != 'none') {
			alert('Некорректное значение тега!');
			return;
		}

		$.ajax({
			'url': '/product/' + id,
			'type': 'PUT',
			'data': { 'title': title,
					'description': description,
					'price': Number(price),
					'prescription': prescription,
					'availability': availability,
					'data_category': data_category,
					'amount': Number(amount),
					'release_form': release_form,
					'img': img }
		}).done(function(response) {
			alert("Данные успешно отредактированы!");
		}).fail(function(jqXHR, textStatus, error) {
			alert("Ошибка редактирования!");
		});

		editPage.handleClear();
		$('.catalog').empty();
		document.getElementById("input-product").value = ""; 
	}
}

const editPage = new EditPage();


