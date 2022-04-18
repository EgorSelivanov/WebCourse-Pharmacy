var buildCategories = function (categoryObjects) {
	$('.header-nav .categories').empty();

	function SortArray(x, y){
	    return x.category_name.localeCompare(y.category_name);
	}
	var categories = categoryObjects.sort(SortArray);
	
	for (var i = 0; i < categories.length; i++) {
		var $categoryListItem = liaWithOpenOnClick(categoryObjects[i]);
		$('.header-nav .categories').append($categoryListItem);
	}

};

var liaWithOpenOnClick = function(category) {
	var $categoryListItem = $("<li>"),
		$categoryLink = $("<a>").attr("href", "/category/" + category.category_link);
	
	$categoryLink.text(category.category_name);

	$categoryLink.on("click", function () {
		$.ajax({
				'url': '/category/' + category.category_link,
				'type': 'GET'
			}).done(function(response) {
				window.location.replace('category/' + category.category_link + '/');
			}).fail(function(jqXHR, textStatus, error) {
				console.log(error);
				alert("Ошибка!" + jqXHR.status + " " + jqXHR.textStatus);	
			});
	});
	
	$categoryListItem.append($categoryLink);

	return $categoryListItem;
};

$(document).ready(function () {
	$.getJSON("/category.json", function (categoryObjects) {
		// вызов функции main с аргументом в виде объекта categoryObjects
		buildCategories(categoryObjects);
	});

	$('.menu-btn').on('click', function() {
		$('.menu').toggleClass('menu_active');
	});
});

