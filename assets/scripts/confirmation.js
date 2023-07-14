// Sarah Bedn - 20214949, Ranya Ouzaouit - 20251056
jQuery(async () => {
  // ========================================================================
  //                       CONFIRMATION NUMBER PAGE
  // ========================================================================
  var url = new URL(window.location);
  var fullName = url.searchParams.get('fullName');
  var confirmationNumber = url.searchParams.get('confirmationNumber');

  const isOrderValid =
    JSON.parse(window.localStorage?.getItem('orders')).some(
      (x) =>
        x.fullName === fullName && x.confirmationNumber === confirmationNumber
    ) || false;

  if (isOrderValid) {
    $('article > h1').text(`Votre commande est confirmée ${fullName}!`);
    $('article > p > strong').text(confirmationNumber);
  } else {
    $('article').empty();
    $('article').append('<h1>Numero de confirmation invalide</h1>');
  }
});
