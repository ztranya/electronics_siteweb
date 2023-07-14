// Sarah Bedn - 20214949, Ranya Ouzaouit - 20251056
jQuery(async () => {
  // ========================================================================
  //                            PRODUCTS
  // ========================================================================
  var url = new URL(window.location);
  var productId = url.searchParams.get('id');
  const product = await fetchProductById(productId);

  if (product) {
    console.log('in ');

    $('#product-name').text(product.name);
    $('#product-image').attr('src', `./assets/img/${product.image}`);
    $('#product-desc').text(product.description);
    $('#product-price').text(`${product.price}$`);

    $('#product-features').empty();

    product.features.forEach((f) => {
      $('#product-features').append(`
            <li>${f}</li>
        `);
    });
  } else {
    $('#product-section').empty();
    $('#product-section').append('<h1>Page non trouvée!</h1>');
  }

  $('#add-to-cart-form').on('submit', function (event) {
    event.preventDefault();

    const currentElementQuantity =
      JSON.parse(window.localStorage.getItem('cart'))?.[product.id] || 0;

    window.localStorage.setItem(
      'cart',
      JSON.stringify({
        ...JSON.parse(window.localStorage.getItem('cart')),
        [product.id]:
          Number(currentElementQuantity) + Number($('#product-quantity').val()),
      })
    );

    const updatedCart = JSON.parse(window.localStorage.getItem('cart'));

    const cartQuantity = Object.keys(updatedCart).reduce((prev, cur) => {
      return Number(prev) + Number(updatedCart[cur]);
    }, 0);

    console.log('here here hre');

    if (cartQuantity > 0) {
      $('.shopping-cart > .count').show();
      $('.shopping-cart > .count').text(cartQuantity);
    } else {
      $('.shopping-cart > .count').hide();
    }

    $('#dialog').show();

    setTimeout(() => {
      $('#dialog').hide();
    }, 5000);
  });
});

const fetchProductById = async (productId) => {
  // fetch products from data/products.json
  const products = await $.ajax({
    url: '../../data/products.json',
  });

  return products.find((p) => p.id == productId);
};
