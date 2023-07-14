// Sarah Bedn - 20214949, Ranya Ouzaouit - 20251056
jQuery(function () {
  // ========================================================================
  //                            ORDER FORM
  // ========================================================================

  var form = $('#orderForm');

  form.validate({
    rules: {
      ['first-name']: {
        required: true,
        minlength: 2,
      },
      ['last-name']: {
        required: true,
        minlength: 2,
      },
      email: {
        required: true,
        email: true,
      },
      phone: {
        required: true,
        phoneUS: true,
      },
      ['credit-card']: {
        required: true,
        creditcard: true,
      },
      ['credit-card-expiry']: {
        required: true,
        pattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      },
    },
    messages: {
      ['first-name']: {
        required: 'Ce champ est obligatoire',
        minlength: 'Veuillez fournir au moins 2 caracteres',
      },
      ['last-name']: {
        required: 'Ce champ est obligatoire',
        minlength: 'Veuillez fournir au moins 2 caracteres',
      },
      email: 'Ce champ est obligatoire',
      phone: {
        required: 'Ce champ est obligatoire',
        phoneUS: 'La numero de telephone est invalide',
      },
      ['credit-card']: {
        required: 'Ce champ est obligatoire',
        creditcard: 'La numero de votre carte de credit est invalide',
      },
      ['credit-card-expiry']: {
        required: 'Ce champ est obligatoire',
        pattern: "La date d'expiration de votre carte de credit est invalide",
      },
    },
  });

  $('#submitButton').click(function (e) {
    e.preventDefault();
    if (form.valid() == true) {
      // here you check if validation returned true or false
      console.log('@@@ valid');
      // save order to local storage
      const currentOrders =
        JSON.parse(window.localStorage?.getItem('orders')) || [];

      const fullName = $('#first-name').val() + ' ' + $('#last-name').val();
      const confirmationNumber = '0000' + currentOrders.length + 1;

      const orders = [
        ...currentOrders,
        {
          fullName,
          confirmationNumber,
        },
      ];

      window.localStorage.setItem(
        'orders',
        JSON.stringify([
          ...new Map(orders.map((v) => [v.fullName, v])).values(),
        ])
      );

      window.location.href =
        './confirmation.html?fullName=' +
        fullName +
        '&confirmationNumber=' +
        confirmationNumber;

      // $.ajax({
      //   type: 'GET',
      //   url: $(this).attr('action'),
      //   dataType: 'json',
      //   success: function (json) {
      //     window.location.href = './confirmation.html';
      //   },
      // });
    }
  });
});
