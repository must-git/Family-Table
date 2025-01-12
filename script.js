//Afficher Cart et la Decacher
let iconCart = document.querySelector('.icon-cart');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');

iconCart.addEventListener('click', () => {
  body.classList.toggle('showCart')
})
//Arrow Expression of functions
closeCart.addEventListener('click', () => {
  body.classList.toggle('showCart')
})

//check out button
var checkOutButton = document.querySelector('.checkOut');
checkOutButton.addEventListener('click', function() {
  updateCartTotal();
});

//Add to cart buttons
var addToCartButtons = document.querySelectorAll('.btn');
addToCartButtons.forEach(function(button) {
  button.addEventListener('click', function(event) {

    event.preventDefault();//stop actions

    //until getting data of item
    var itemId = event.target.getAttribute('data-id');
    var itemName = event.target.getAttribute('data-name');
    var itemPrice = event.target.getAttribute('data-price');
    var itemImage = event.target.getAttribute('data-image');

    var item = {
      id: itemId,
      name: itemName,
      price: itemPrice,
      image: itemImage
    };
    //lets add it now
    addToCart(item);
  });
});

// add item to cart function
function addToCart(item) {
  var cartList = document.querySelector('.listCart');
  var existingCartItem = cartList.querySelector(`.cart-item[data-id="${item.id}"]`);

  if (existingCartItem) {
    // the item is already exist so lets add just his quantity
    var quantitySpan = existingCartItem.querySelector('.quantity span:nth-child(2)');
    quantitySpan.textContent = parseInt(quantitySpan.textContent) + 1;
    //parseInt transfert the string to a number(int)
  } else {
    // the item is not exist in Cart so lets add it
    var cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-id', item.id);
    cartItem.innerHTML = `
      <div class="image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="name">${item.name}</div>
      <div class="totalPrice">${item.price}</div>
      <div class="quantity">
        <span class="minus">-</span>
        <span>1</span>
        <span class="plus">+</span>
      </div>
    `;
    //Add events for plus and minus of an item
    cartItem.querySelector('.minus').addEventListener('click', function() {
      updateQuantity(cartItem, -1);
    });
    cartItem.querySelector('.plus').addEventListener('click', function() {
      updateQuantity(cartItem, 1);
    });

    cartList.appendChild(cartItem);
    //cartItem as the last child of an cartList.
  }
  nbr_items();
}

// Number of items in Cart Span 
function nbr_items() {
  var cartItems = document.querySelectorAll('.cart-item');
  var itemCount = cartItems.length;
  var quantitySpan = document.querySelector('.icon-cart .quantity');
  quantitySpan.textContent = itemCount;
}

//Total
function updateCartTotal() {
  var cartItems = document.querySelectorAll('.cart-item');
  var total = 0;

  cartItems.forEach(function(item) {
    var priceElement = item.querySelector('.totalPrice');
    var quantityElement = item.querySelector('.quantity span:nth-child(2)');
    var price = parseFloat(priceElement.textContent.replace('$', ''));
    //replace : $ by nothing to be a good format on float
    var quantity = parseInt(quantityElement.textContent);
    total += price * quantity;
  });

  var cartTotalElement = document.querySelector('.cart-total');
  cartTotalElement.textContent = 'Total: $' + total.toFixed(2);
}

//minus et plus buttons pour mettre à jour la quantité d'un article
function updateQuantity(cartItem, change) {
  var quantitySpan = cartItem.querySelector('.quantity span:nth-child(2)');
  var newQuantity = parseInt(quantitySpan.textContent) + change;
  if (newQuantity > 0) {
    quantitySpan.textContent = newQuantity;
  } else {
    cartItem.remove();
  }
  nbr_items();
}

//Reviews
let reviews = [];
let stars = document.querySelectorAll('.star');
let selectedRating = 0;
//Add Event of click to stars
stars.forEach(star => {
  star.addEventListener('click', function() {
    stars.forEach(s => s.classList.remove('selected'));
    this.classList.add('selected');
    selectedRating = this.getAttribute('data-value');
  });
});

document.getElementById('submitReview').addEventListener('click', function() {
  let name = document.getElementById('customerName').value;
  let review = document.getElementById('customerReview').value;

  if (name && review && selectedRating) {
    let newReview = {
      name: name,
      review: review,
      rating: parseInt(selectedRating)
    };
    reviews.push(newReview);
    displayReviews();
    calculateAverageRating();
    document.getElementById('customerName').value = '';
    document.getElementById('customerReview').value = '';
    stars.forEach(s => s.classList.remove('selected'));
  } else {
    alert('Enter All Sections please.');
  }
});

//display reviews function
function displayReviews() {
  let reviewsContainer = document.querySelector('.reviews-container');
  reviewsContainer.innerHTML = '';
  reviews.forEach(r => {
    let reviewDiv = document.createElement('div');
    reviewDiv.classList.add('review');
    reviewDiv.innerHTML = `<strong>${r.name}</strong>: ${r.review} (${r.rating} Stars)`;
    reviewsContainer.appendChild(reviewDiv);
  });
}

//average rating function
function calculateAverageRating() {
  let total = 0;
  reviews.forEach(r => total += r.rating);
  let average = total / reviews.length;
  document.getElementById('averageStars').textContent = average.toFixed(1);
}