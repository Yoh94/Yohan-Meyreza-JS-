if (document.readyState == "loading") {
  // if statement jika halaman sedang loading
  document.addEventListener("DOMContentLoaded", ready);
  // Maka jalankan perintah ini
} else {
  ready();
} // Fungsi memeriksa apakah dokumen nya sudah dimuat

function ready() {
  // Fungsi ready

  var removeCartItemButtons = document.getElementsByClassName("btn-danger"); // Memilih elemen dengan class btn-danger
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    // Loop untuk setiap removeCartItemButtons
    var button = removeCartItemButtons[i];
    // Membuat var button untuk setiap index removeCartItemButtons yang ada
    button.addEventListener("click", removeCartItem);
    // Menambahkan event handler klik kepada button dengan fungsi removeCartItem
  }
  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  // Membuat variable quantityInputs dengan element dari class cart-quantity-input
  for (var i = 0; i < quantityInputs.length; i++) {
    // Loop untuk setiap index dari array quantityInputs
    var input = quantityInputs[i];
    // Membuat variable input dan mengisi variable tersebut dengan setiap index dari quantityInputs
    input.addEventListener("change", quantityChanged);
    // Menambahkan event handler ubah kepada input dengan fungsi quantityChanged
  }
  var addToCartButtons = document.getElementsByClassName("shop-item-button");
  // Membuat variable addToCartButtons dan mengisi variable tersebut dengan element dari class shop-item-button
  for (var i = 0; i < addToCartButtons.length; i++) {
    // Loop untuk setiap addToCartButtons
    var button = addToCartButtons[i];
    // Membuat variable button dan mengisi variable tersebut dengan seluruh index dari addToCartButtons
    button.addEventListener("click", addToCartClicked);
    //Menambahkan event handler klik pada button dengan fungsi addToCartClicked
  }
  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);
}

function purchaseClicked() {
  // Fungsi tombol Beli sekarang
  alert("Terima kasih atas pembelian anda");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

function removeCartItem(event) {
  // Fungsi menghapus barang di keranjang
  var buttonClicked = event.target; // Mendapatkan element untuk variable buttonClicked
  buttonClicked.parentElement.parentElement.remove(); // Menghapus Parent Element dari Parent Element nya
  updateCartTotal(); // Fungsi updateCartTotal
}

function quantityChanged(event) {
  // Fungsi pengubah kuantitas
  var input = event.target;
  // Mendapatkan Element untuk variable input
  if (isNaN(input.value) || input.value <= 0) {
    // isNan = is Not a Number
    input.value = 1;
  } // Minimal Quantity = 1 (Tidak bisa kurang 1, ex: 0 atau -1)
  updateCartTotal(); // Memanggil fungsi updateCartTotal
}

function addToCartClicked(event) {
  // Fungsi klik pada addToCart
  var button = event.target;
  // Mendapatkan element untuk variable button
  var shopItem = button.parentElement.parentElement;
  // Membuat variable shopItem dan mengisi variable tersebut dengan element dari parent, parent (2 parent) Element tersebut
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  // Membuat variable title dan mengisi variable tersebut dengan element index pertama dari class shop-item-title
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  // Membuat variable price dan mengisi variable tersebut dengan element index pertama dari class shop-item-price
  var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  // Membuat variable imageSrc dan mengisi variable tersebut dengan element index pertama dari class shop-item-image
  addItemToCart(title, price, imageSrc);
  // Memanggil fungsi addItemToCart dengan object title, price & imageSrc
  updateCartTotal();
  // Memanggil fungsi updateCartTotal
}

function addItemToCart(title, price, imageSrc) {
  // Fungsi addItemToCart dengan object title, price & imageSrc
  var cartRow = document.createElement("div");
  // Membuat variable cartRow dan mengisi variable tersebut dengan fungsi createElement untuk membuat <div> pada .html
  cartRow.classList.add("cart-row");
  cartRow.innerText = title;
  var cartItems = document.getElementsByClassName("cart-items")[0];
  // Membuat variable cartItems dan mengisi variable tersebut dengan element index pertama dari class cart-items
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  // Membuat variable cartItemNames dan mengisi variable tersebut dengan element dari class cart-item-title
  for (var i = 0; i < cartItemNames.length; i++) {
    // Looping untuk setiap index dari cartItemNames
    if (cartItemNames[i].innerText == title) {
      // Jika innerText dari setiap index cartItemNames sama
      alert("Barang ini telah di tambahkan ke keranjang belanja");
      // Maka peringatan "Item ini telah di tambahkan ke keranjang belanja"
      return;
    }
  }
  var cartRowContents = `
  <div class="cart-item cart-column">
    <img
      class="cart-item-image"
      src="${imageSrc}"
      width="100"
      height="100"
    />
    <span class="cart-item-title">${title}</span>
  </div>
    <span class="cart-price cart-column">${price.toLocaleString()}</span>
  <div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1" />
    <button class="btn1 btn-danger" type="button">REMOVE</button>
  </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow); // fungsi append menambahkan cartRow (div) kebagian akhir cartItems
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

function updateCartTotal() {
  // Fungsi update total keranjang

  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  // Membuat variable cartItemContainer dan mengisi variable tersebut dengan memilih element index pertama dari cart-items

  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  // Membuat variable cartRows dan mengisi variable tersebut dengan memilih element cart-row

  var total = 0;
  // penambahan variable total dengan value 0 agar total selalu bermula dari 0

  for (var i = 0; i < cartRows.length; i++) {
    // Looping untuk setiap index dari cartRows

    var cartRow = cartRows[i];
    // Membuat variable cartRow untuk setiap index cartRows yang ada

    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    // Membuat variable priceElement dan mengisi variable tersebut dengan memilih element index pertama dari cart-price

    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    // Membuat variable quantityElement dan mengisi variable tersebut dengan memilih element index pertama dari cart-quantity-input

    var price = priceElement.innerText.replace("Rp.", "");
    // Membuat variable price dan mengisi variable tersebut dengan innerText dari priceElement dan menggantikan value "Rp." menjadi "(Kosong) // null"

    var quantity = quantityElement.value;
    // Membuat variable quantity dan mengisi variable tersebut dengan value dari quantityElement

    total = total + price * quantity;
    // Merubah total menjadi total yang memiliki value dari total ditambah price dikalikan quantity
  }
  total = Math.round(total * 100) / 100; // jika bilangan lebih dari 2 Titik Desimal (Agar output tidak lebih dari 2 titik desimal)
  document.getElementsByClassName("cart-total-price")[0].innerText =
    `Rp. ` + total.toLocaleString();

  // Memilih element innerText index pertama pada cart-total-price dan menggabungkan Mata uang dengan variable total
  // fungsi .toLocaleString() yakni untuk memisahkan bilangan digit lebih dari 3 angka dengan koma
}
