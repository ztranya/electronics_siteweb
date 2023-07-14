// Sarah Bedn - 20214949, Ranya Ouzaouit - 20251056
jQuery(function () {
  // ========================================================================
  //                            SHOPPING CART
  // ========================================================================

  let shoppingCartCountEl = $('.shopping-cart > .count');

  // Fill shopping cart count with the number of items in the cart from localstorage
  // Hide the shopping cart count if the cart is empty
  let cart = JSON.parse(localStorage?.getItem('cart')) || {};

  if (Object.keys(cart).length > 0) {
    const cartQuantity = Object.keys(cart).reduce((prev, cur) => {
      return Number(prev) + Number(cart[cur]);
    }, 0);

    shoppingCartCountEl.text(cartQuantity);
  } else {
    shoppingCartCountEl.text(0);
    shoppingCartCountEl.hide();
  }

  //
});
