class Bucket {

	handleOpenShoppingPage() {
		shoppingPage.render();
	}

	render(count) {
		const html = `
			<div class="header-bucket">
				<div class="header-counter">
					Корзина<br>
					<img src="https://i.ibb.co/BZq7HTZ/bucket.png" onclick="bucketPage.handleOpenShoppingPage();" style="width: 50px;cursor: pointer;">
					${count}
				</div>
			</div>
		`;
		$('.bucket').empty();
		$('.bucket').append(html);
	}
}

const bucketPage = new Bucket();

const productsStore = localStorageUtil.getProducts();

bucketPage.render(productsStore.length);