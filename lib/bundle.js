/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DomNodeCollection = __webpack_require__(1);

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
    url: "http://api.giphy.com/v1/gifs/search?q=cats&api_key=ed3a2e7c62d44826a9514acf79372ed8&limit=25",
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DomNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html(string) {
    if (string === undefined) {
      return this.nodes[0].innerHTML;
    } else {
      this.nodes.forEach ( (node) => {
        node.innerHTML = string;
      });
    }
    return this.nodes;
  }

  empty(){
    this.nodes.forEach ( (node) => {
      node.innerHTML = '';
    });
    return this.nodes;
  }

  append(arg){
    if (this.nodes.length === 0) return;
    if (typeof arg === 'object' && !(arg instanceof DomNodeCollection)) {
      arg = $d(arg);
    } else if (typeof arg === 'string') {
      this.nodes.forEach( (el) => el.innerHTML += arg);
    } else {
      this.nodes.forEach ( (el) => {
        el.innerHTML = el.innerHTML + arg.outerHTML;
      });
    }
    return this.nodes;
  }


  attr(key, value) {
    if (value === undefined) {
      return this.nodes[0].getAttribute(key);
    } else {
      this.nodes.forEach ( (node) => {
        node.setAttribute(key, value);
      });
    }
    return this.nodes;
  }


  addClass(className) {
    this.nodes.forEach(node => node.classList.add(className));
  }

  removeClass(className) {
    this.nodes.forEach(node => node.classList.remove(className));
  }

  remove(arg) {
    if (arg === undefined) {
      this.nodes.forEach ( (node) => {
        node.remove();
      });
    } else {
      this.nodes.forEach ( (node) => {
        if (node.getAttribute("class") === arg) {
          node.remove();
        }
      });
    }
  }

  find(selector) {
    const selectorArray = window.$d(selector);
    let returnArray = [];
    selectorArray.nodes.forEach ( (el) => {
      if (this.children().nodes.includes(el)) {
        returnArray.push(el);
      }
    });
    return new DomNodeCollection(returnArray);
  }

  children() {
    let allChildren = [];
    this.nodes.forEach( (el) => {
      const children = el.children;
      for(let i = 0; i< children.length; i++) {
        allChildren.push(children[i]);
      }
    });
    return new DomNodeCollection(allChildren);
  }

  parents() {
    let allParents = [];
    this.nodes.forEach( (el) => {
      allParents.push(el.parentNode);
    });
    return new DomNodeCollection(allParents);
  }

  on(type, callback) {
    this.callback = callback;
    this.nodes.forEach( (el) => {
      el.addEventListener(type, callback);
      el.setAttribute('listener', true);
    });
  }

  off(type) {
    const callback = this.callback;
    this.nodes.forEach( (el) => {
      if (el.getAttribute('listener')) {
      el.removeEventListener(type, callback );
      el.setAttribute('listener', false);
    }
    });
  }

}

module.exports = DomNodeCollection;


/***/ })
/******/ ]);