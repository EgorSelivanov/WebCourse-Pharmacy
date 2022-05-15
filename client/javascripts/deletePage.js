class DeletePage {
	deleteData(id) {
		if (confirm("Вы уверены, что хотете удалить данный продукт?")) {
			$.ajax({
				'url': '/product/' + id,
				'type': 'DELETE'
			}).done(function(response) {
				alert("Данные успешно удалены!");
			}).fail(function(jqXHR, textStatus, error) {
				alert("Ошибка удаления!");
			});

			$('.catalog').empty();
			document.getElementById("input-product").value = ""; 
		}
	}
}

const deletePage = new DeletePage();


