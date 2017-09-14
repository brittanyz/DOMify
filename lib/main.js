const DomNodeCollection = require("./dom_node_collection");

let callbacksArray = [];

document.addEventListener("DOMContentLoaded", () => {
    callbacksArray.forEach( (cb) => {
      cb();
  });
});

function $d (arg) {
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

module.exports = $d;
