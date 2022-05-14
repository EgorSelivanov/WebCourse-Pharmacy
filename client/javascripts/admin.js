var userListMy = [];

var main = function (UsersObjects) {
	"use strict";

	loadUserList();

	var htmlImage = `
		<div class="header-image">
			<a href="/"><img src="https://i.ibb.co/zSm08SY/apteka.png" alt="Аптека" style="width: 200px;"></a>
		</div>`;

	$('.main__header .container').append(htmlImage);

	var $input = $("<input>").addClass("input-name"),
		$butRegister = $("<button>").text("Создать аккаунт").addClass("authorization-btn"),
		$butEdit = $("<button>").text("Изменить имя пользователя").addClass("authorization-btn"),
		$aReturn = $("<a href='/index.html'>"),
		$butReturn = $("<button>").text("Вернуться на главную").addClass("authorization-btn"),
		$butDestroy = $("<button>").text("Удалить пользователя").addClass("authorization-btn");

	$aReturn.append($butReturn);

	$butRegister.on("click", function() {
		var username = $input.val();
		if (username !== null && username.trim() !== "") {
			var newUser = {"username": username};
			$.post("/apothecary", newUser, function(result) {
				console.log(result);
			}).done(function(response) {
				console.log(response);
				alert('Аккаунт создан!');
				loadUserList();
			}).fail(function(jqXHR, textStatus, error) {
				console.log(error);
				if (jqXHR.status === 501) {
					alert("Такой пользователь уже существует!");
				} else {					
					alert("Ошибка!" + jqXHR.status + " " + jqXHR.textStatus);	
				}
			});
		}
		else
			alert("Неудачное имя пользователя!");
	});

	$butEdit.on("click", function() {
		if ($input.val() !== null && $input.val().trim() !== "") {
			var username = $input.val();

			if (userListMy.indexOf(username) === -1) {
				alert('Имя пользователя отстутствует!');
				return;
			}

			var newUsername = prompt("Введите новое имя пользователя", $input.val());
			if (newUsername !== null && newUsername.trim() !== "") {
				$.ajax({
					'url': '/apothecary/' + username,
					'type': 'PUT',
					'data': { 'username': newUsername }
				}).done(function(responde) {
					console.log(responde);
					$input.val(newUsername);
					alert('Имя пользователя успешно изменено');
					userListMy.splice(userListMy.indexOf(username), 1);
					loadUserList();
				}).fail(function(jqXHR, textStatus, error) {
					console.log(error);
					alert("Ошибка!" + jqXHR.status + " " + jqXHR.textStatus);	
				});
			}
		}
		else
			alert("Неудачное имя пользователя!");
	});

	$butDestroy.on("click", function() {
		if ($input.val() !== null && $input.val().trim() !== "") {
			var username = $input.val();

			if (userListMy.indexOf(username) === -1) {
				alert('Имя пользователя отстутствует!');
				return;
			}

			if (confirm("Вы уверены, что хотете удалить пользователя " + username + "?")) {
				$.ajax({
					'url': '/apothecary/' + username,
					'type': 'DELETE',
				}).done(function(response) {
					console.log(response);
					$input.val("");
					alert('Пользователь успешно удален');
					userListMy.splice(userListMy.indexOf(username), 1);
					loadUserList();
				}).fail(function(jqXHR, textStatus, error) {
					console.log(error);
					alert("Ошибка!" + jqXHR.status + " " + jqXHR.textStatus);	
				});
			}
		}
		else
			alert("Неудачное имя пользователя!");
	});

	$butReturn.on("click", function() {
		window.location.replace('/');
	});

	$("main .authorization").append($input);
	$("main .authorization").append('<br>');
	$("main .authorization").append($butDestroy);
	$("main .authorization").append($butEdit);
	$("main .authorization").append('<br>');
	$("main .authorization").append($butRegister);
	$("main .authorization").append($butReturn);
}

var loadUserList = function() {
	let htmlCatalog = '';

	$('.list_of_users').empty();
	$('.list_of_users').append(`<p>Список пользователей:</p>`);

	$.get('/apothecary.json', function(userObjects){
		var $userList = $("<ul>");
		userObjects.forEach(({ _id, username }) => {
			htmlCatalog += `<li class="userlist__item">
								${username}
							</li>`;
			userListMy.push(username);
		})
		$userList.append(htmlCatalog);
		$('.list_of_users').append($userList);
	})
}

$(document).ready(function() {
	$.getJSON("apothecary.json", function (UsersObjects) {
		main(UsersObjects);
	});
});