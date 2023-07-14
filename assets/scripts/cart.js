// Sarah Bedn - 20214949, Ranya Ouzaouit - 20251056

jQuery(async () => {
  // ========================================================================
  //                            CART
  // ========================================================================

  renderCart();
});

const fetchProductById = async (productId) => {
  // fetch products from data/products.json
  const products = await $.ajax({
    url: '../../data/products.json',
  });

  return products.find((p) => p.id == productId);
};

const renderCart = async () => {
  const cart = JSON.parse(window.localStorage?.getItem('cart')) || {};

  if (Object.keys(cart).length) {
    // SHOW CART ITEMS
    var totalCost = 0;

    // BUILD CARD DATA
    const cartData = await Object.keys(cart).reduce(async (prev, key) => {
      const product = await fetchProductById(key);
      totalCost = totalCost + product.price * cart[key];
      return [...(await prev), { ...(await product), quantity: cart[key] }];
    }, []);

    // RENDER CART ITEMS ALPHABETICALLY
    $('.shopping-cart-table > tbody').empty();
    cartData
      .sort((a, b) => a.name - b.name)
      .forEach((product) => {
        $('.shopping-cart-table > tbody').append(`<tr>
    <td>
      <button title="Supprimer" onclick={deleteItemFromCart(${
        product.id
      })}><i class="fa fa-times"></i></button>
    </td>
    <td><a href="./product.html">${product.name}</a></td>
    <td>${product.price}&thinsp;$</td>
    <td>
      <div class="row">
        <div class="col">
          <button title="Retirer" ${
            product.quantity === 1 ? 'disabled' : ''
          } onclick={decreaseQuantity(${product.id},${product.quantity})}>
            <i class="fa fa-minus"></i>
          </button>
        </div>
        <div class="col">${product.quantity}</div>
        <div class="col">
          <button title="Ajouter" onclick={increaseQuantity(${product.id},${
          product.quantity
        })}>
            <i class="fa fa-plus"></i>
          </button>
        </div>
      </div>
    </td>
    <td>${product.price * product.quantity}&thinsp;$</td>
  </tr>`);
      });
  } else {
    $('#cart-content').empty();
    $('#cart-content').append('<h1>Panier</h1>');
    $('#cart-content').append('<p>Aucun produit dans le panier</p>');
  }

  // SHOW CART TOTAL
  const cartQuantity = Object.keys(cart).reduce((prev, cur) => {
    return Number(prev) + Number(cart[cur]);
  }, 0);

  if (cartQuantity > 0) {
    $('.shopping-cart > .count').text(cartQuantity);
  } else {
    $('.shopping-cart > .count').hide();
  }
};

const deleteItemFromCart = (productId) => {
  const currentCart = JSON.parse(window.localStorage.getItem('cart'));

  if (confirm('Voulez-vous supprimer le produit du panier?')) {
    delete currentCart[productId];

    window.localStorage.setItem(
      'cart',
      JSON.stringify({
        ...currentCart,
      })
    );

    renderCart();
  }
};

const emptyCart = () => {
  localStorage.setItem('cart', JSON.stringify({}));
  renderCart();
};

const increaseQuantity = (productId, currentQuantity) => {
  const currentCart = JSON.parse(window.localStorage.getItem('cart'));

  currentCart[productId] = currentQuantity + 1;

  localStorage.setItem('cart', JSON.stringify({ ...currentCart }));

  renderCart();
};

const decreaseQuantity = (productId, currentQuantity) => {
  const currentCart = JSON.parse(window.localStorage.getItem('cart'));

  currentCart[productId] = currentQuantity - 1;

  localStorage.setItem('cart', JSON.stringify({ ...currentCart }));

  renderCart();
};
