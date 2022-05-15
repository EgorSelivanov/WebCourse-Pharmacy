var main = function () {
	"use strict";

	var htmlImage = `
			<div class="header-image">
				<a href="/"><img src="https://i.ibb.co/zSm08SY/apteka.png" alt="Аптека" style="width: 200px;"></a>
			</div>`;

	$('.main__header .container').append(htmlImage);

    $(".authorization-btn").on("click", function(e) {
		e.preventDefault();
		var username = $("#input__login").val();
		if (username !== null && username.trim() !== "") {
			$.ajax({
				'url': '/apothecary/' + username,
				'type': 'GET'
			}).done(function(response) {
				window.location.replace('/apothecary/' + username + '/');
			}).fail(function(jqXHR, textStatus, error) {
				alert("Ошибка авторизации! Пользователь с данным логином отсутствует в системе!");
				$("#input__login").val("");	
			});
		}
		else
			alert("Имя пользователя не задано!");
	});
    $('input').keydown(function(e) {
        if(e.keyCode === 13) {
            $(".authorization-btn").click();
        }
    });
};

$(document).ready(function() {
	$('.menu-btn').on('click', function() {
		$('.menu').toggleClass('menu_active');
	});
	main();
});