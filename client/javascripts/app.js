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

$(document).ready(function () {
	buildLink();

	$.getJSON("/category.json", function (categoryObjects) {
		// вызов функции main с аргументом в виде объекта categoryObjects
		buildCategories(categoryObjects);
	});

	$('.menu-btn').on('click', function() {
		$('.menu').toggleClass('menu_active');
	});
});

