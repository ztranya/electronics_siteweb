// Sarah Bedn - 20214949, Ranya Ouzaouit - 20251056
jQuery(async () => {
  // ========================================================================
  //                            PRODUCTS
  // ========================================================================

  // On doc load - render all products sorted by price ascending

  var currentCategoryOption = 'all';
  var currentSortingOption = 'price-asc';

  renderProductsList();

  const sortEventHandler = (elementId, sortBy) => {
    console.log('sort btn clicked ', elementId);
    $('#product-criteria > .selected').toggleClass('selected');
    $(elementId).toggleClass('selected');
    $('#products-list').empty();
    currentSortingOption = sortBy;
    renderProductsList(currentSortingOption, currentCategoryOption);
  };

  const categoryEventHandler = (elementId, category) => {
    $('#product-categories > .selected').toggleClass('selected');
    $(elementId).toggleClass('selected');
    $('#products-list').empty();
    currentCategoryOption = category;
    renderProductsList(currentSortingOption, currentCategoryOption);
  };

  // Sorting buttons click handlers
  $('#sort-by-price-asc').on('click', function () {
    sortEventHandler(`#sort-by-price-asc`, 'price-asc');
  });

  $('#sort-by-price-desc').on('click', function () {
    sortEventHandler('#sort-by-price-desc', 'price-desc');
  });

  $('#sort-by-name-asc').on('click', function () {
    sortEventHandler('#sort-by-name-asc', 'name-asc');
  });

  $('#sort-by-name-desc').on('click', function () {
    sortEventHandler('#sort-by-name-desc', 'name-desc');
  });

  // Category buttons click handlers
  $('#category-cameras').on('click', function () {
    categoryEventHandler('#category-cameras', 'cameras');
  });

  $('#category-consoles').on('click', function () {
    categoryEventHandler('#category-consoles', 'consoles');
  });

  $('#category-screens').on('click', function () {
    categoryEventHandler('#category-screens', 'screens');
  });

  $('#category-computers').on('click', function () {
    categoryEventHandler('#category-computers', 'computers');
  });

  $('#category-all').on('click', function () {
    categoryEventHandler('#category-all', 'all');
  });
});

const fetchProducts = async () => {
  // fetch products from data/products.json
  const products = await $.ajax({
    url: '../../data/products.json',
  });

  return products;
};

const handleProductsSorting = (sortBy, products) => {
  switch (sortBy) {
    case 'price-desc':
      // sort by price desccending
      return products.sort((a, b) => b.price - a.price);
    case 'name-asc':
      // sort by name ascending
      return products.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      // sort by name desccending
      return products.sort((a, b) => b.name.localeCompare(a.name));
    default:
      // sort by price ascending - default
      return products.sort((a, b) => a.price - b.price);
  }
};


const renderProductsList = async (sortBy = 'price-asc', category = 'all') => {
  const products = await fetchProducts();
  const sortedProducts = handleProductsSorting(sortBy, products);

  const filterCategory = (p) =>
    category === 'all' ? true : p.category === category;

  // attach the sorted products to the DOM with the right category
  sortedProducts.filter(filterCategory).forEach((p) => {
    console.log('p: ', p);
    $('#products-list').append(`
   <div class="product">
     <a href="./product.html?id=${p.id}" title="En savoir plus...">
       <h2>${p.name}</h2>
       <img alt="${p.name}" src="./assets/img/${p.image}">
       <p class="price"><small>Prix</small> ${p.price}&thinsp;$</p>
     </a>
   </div>
   `);
  });

  $('#products-count').text(
    sortedProducts.filter(filterCategory).length + ' produits'
  );
};
