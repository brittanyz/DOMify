// webpack --watch lib/demo.js lib/bundle.js
const $d = require('./main.js');

let num = 3;

$d( () => {
  $d('.add-num').on('click', () => {
    $d('ul').append(`<li>${++num}</li>`);
  });

  $d('.Blue').on('click', () => {
    $d('ul').removeClass('green');
    $d('ul').removeClass('yellow');
    $d('ul').removeClass('red');
    $d('ul').addClass('blue');
  });
  $d('.Red').on('click', () => {
    $d('ul').removeClass('green');
    $d('ul').removeClass('yellow');
    $d('ul').removeClass('blue');
    $d('ul').addClass('red');
  });
  $d('.Yellow').on('click', () => {
    $d('ul').removeClass('green');
    $d('ul').removeClass('blue');
    $d('ul').removeClass('red');
    $d('ul').addClass('yellow');
  });
  $d('.Green').on('click', () => {
    $d('ul').removeClass('blue');
    $d('ul').removeClass('yellow');
    $d('ul').removeClass('red');
    $d('ul').addClass('green');
  });
  $d('.cat-gif').on('click', () => {
    getCat();
  });
  // $d('.remove-cat').on('click', () => {
  //   $('.cat').remove("<img />");
  // });
// on the onclick invoke the getCat method
});

const getCat = () => {
  const options = {
    method: 'GET',
    url: "https://api.giphy.com/v1/gifs/search?q=cats&api_key=ed3a2e7c62d44826a9514acf79372ed8&limit=25",
    success(data){ showCat(data); },
    error(data){ console.log('booo'); }
  };
  $d.ajax(options);
};

const showCat = (data) => {
  const idx = parseInt(Math.random() * (25));
  $d('.cat').append(`<li id="cats"><img src='${data.data[idx].images.fixed_height_small.url}'/></li>`);
};
