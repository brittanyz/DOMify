const DomNodeCollection = require("./dom_node_collection");

let callbacksArray = [];

document.addEventListener("DOMContentLoaded", () => {
    callbacksArray.forEach( (cb) => {
      cb();
  });
});

const $d = function(arg) {
  // debugger
  if (typeof arg === 'function') {
  callbacksArray.push(arg);
    if(document.readyState === 'complete') {
      arg();
    }
  } else if (arg instanceof HTMLElement) {
    const nodes = Array.from(document.getElementByTagName(arg));
    return new DomNodeCollection(nodes);
  } else {
    let list  = document.querySelectorAll(arg);
    list = Array.from(list);
    return new DomNodeCollection(list);
  }
};

$d.extend = function(...args) {
  const obj = Object.assign(...args);
  return obj;
};

$d.ajax = function(options) {
  const defaults = {
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {},
    dataType: JSON
  };
  options = $d.extend(defaults, options);
  const xhr = new XMLHttpRequest();

  xhr.open(options.method, options.url, true);

  xhr.onload = (e) => {
    if (xhr.status > 199 && xhr.status < 300) {
      options.success(JSON.parse(xhr.response));
    } else {
      options.error(JSON.parse(xhr.response));
    }
  };
  xhr.send(JSON.stringify(options.data));
};

window.$d = $d;

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
  // debugger
  const idx = parseInt(Math.random() * (25));
  $d('.cat').append(`<img src='${data.data[idx].images.fixed_height_small.url}'/>`);
};
