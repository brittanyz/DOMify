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
