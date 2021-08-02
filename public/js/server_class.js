

import {template, url, navbarDomElem, bodyDomElement} from './server.js';

export class SuperRenderProduct {
    constructor(url) {
      this.url = url;
    }
    fetchFn() {
      let inner = ``;
      let products = [];
      fetch(this.url, {
          method: 'GET'
        })
        .then(res => res.json())
        .then(result => {
          products = result;
          products.forEach(product => {
            inner += ejs.render(template.productTemplate, {
              product: product
            });
          });
          document.getElementById('content-products').innerHTML = inner
        })
        .catch(error => console.log("err:::" + error))
    }
  }

  export class RenderProduct extends SuperRenderProduct {
    constructor(url, inputCategory) {
      super(url);
      this.url = url
    };
  };
  
  export class SubRenderProduct extends RenderProduct {
  
    constructor(url, inputCategory) {
      super(url, inputCategory);
      this.url = url;
      this.inputCategory = inputCategory
    };
    fetchFn() {
      let inner = ``;
      let products = [];
      fetch(this.url, {
          method: 'POST',
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            inputCategory: this.inputCategory
          })
        })
        .then((res) => {
            return res.json()
          },
          err => console.log('firs_err' + err)
        )
        .then(result => {
          // console.log(result);
          products = result;
          products.forEach(product => {
            inner += ejs.render(template.productTemplate, {
              product: product
            });
          });
          document.getElementById('content-products').innerHTML = inner
        })
        .catch(error => console.log("err:::" + error))
    }
  };