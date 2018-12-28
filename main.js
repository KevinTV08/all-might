// NAVIGATION

const $toggleButton = $('.toggle-button');
$toggleButton.on('click', e => {
  $('.mobile-nav').toggle('show');
});

const $shopBtn = $('.shop-btn');
$shopBtn.on('click', e => {
  $('.submenu').toggle('show');
});
