class AddPage {
	render() {

		if (confirm("Данный продукт отсутствует в базе данных, хотите открыть форму для добавления?")) {

			$.getJSON("/category.json", function (categoryObjects) {
				// вызов функции main с аргументом в виде объекта categoryObjects
				$('.catalog').append(`<div class='list_category'></div>`);
				addPage.buildCategories(categoryObjects);
			});

			$('.container').css({ 'text-align': 'center' });
			var htmlCatalog = `
				<div class="bucket__content">
				<form>
					<h2 class="descr">Название: </h2>
					<input name="data" id="edit__title" class="edit__parameter" value="" required>
					<h2 class="descr">Описание: </h2>
					<input name="data" id="edit__descr" class="edit__parameter" value="" required>
					<h2 class="descr">Цена: </h2>
					<input id="edit__price" class="edit__parameter" value="" required>
					<h2 class="descr">Выпуск: </h2>
					<input id="edit__prescription" class="edit__parameter" value="" required>
					<h2 class="descr">Наличие(вводить через ; с пробелом): </h2>
					<input id="edit__availability" class="edit__parameter" value="">
					<h2 class="descr">Тег (health,goods_of_day,beauty,for_children,none): </h2>
					<input id="edit__data_category" class="edit__parameter" value="" required>
					<h2 class="descr">Количество: </h2>
					<input id="edit__amount" class="edit__parameter" value="" min="0" max="1000" required>
					<h2 class="descr">Формы выпуска(вводить через ; с пробелом): </h2>
					<input id="edit__release_form" class="edit__parameter" value="" required>
					<h2 class="descr">Картинка: </h2>
					<input id="edit__img" class="edit__parameter" value="" required>
					<h2 class="descr">Категория: </h2>
					<input id="edit__category_name" class="edit__parameter" value="" required>

					<button class="btn edit__btn" 
					type="button" onclick="addPage.addData()">Добавить</button>
				</form>
				</div>`;
			$('.catalog').append(htmlCatalog);
		}
		
		
	}

	addData() {
		var title = $("#edit__title").val(),
			description = $("#edit__descr").val(),
			price = $("#edit__price").val(),
			prescription = $("#edit__prescription").val(),
			availability = $("#edit__availability").val().split('; '),
			data_category = $("#edit__data_category").val(),
			amount = $("#edit__amount").val(),
			release_form = $("#edit__release_form").val().split('; '),
			img = $("#edit__img").val(),
			category_name = $('#edit__category_name').val();

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
			'url': '/product/' + category_name,
			'type': 'POST',
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
			alert("Данные успешно добавлены!");
		}).fail(function(jqXHR, textStatus, error) {
			alert("Ошибка добавления! Проверьте введенные данные!");
		});

		$('.catalog').empty();
		document.getElementById("input-product").value = ""; 
	}

	buildCategories(categoryObjects) {
		$('.list_category').empty();
		$('.list_category').append('<h4>Список категорий:</h4>');
		var $listCategory = $("<ul>");
		for (var i = 0; i < categoryObjects.length; i++) {
			var $categoryListItem = $("<li>");
			$categoryListItem.text(categoryObjects[i].category_name);
			$listCategory.append($categoryListItem);
		}
		$('.list_category').append($listCategory);
	}
}

const addPage = new AddPage();


