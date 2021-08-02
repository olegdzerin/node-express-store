import {SuperRenderProduct, RenderProduct, SubRenderProduct} from './server_class.js';
var url = (function () {
  return {
    urlProducts: 'http://localhost:3000/products',
    urlProducts_W_J: 'http://localhost:3000/products/women/jacket',
    urlProducts_W_T: 'http://localhost:3000/products/women/trousers',
    urlProducts_M_J: 'http://localhost:3000/products/men/jacket',
    urlProducts_M_T: 'http://localhost:3000/products/men/trousers',
    urlSearch: 'http://localhost:3000/products/search',
    urlProduct: 'http://localhost:3000/products/'
  }
})()

var navbarDomElem = (function () {
  const products_general = document.querySelector('.dropdown');
  const products_btn = document.querySelector('.products');
  const products_w_t_btn = document.querySelector('.products-women-trousers');
  const products_m_t_btn = document.querySelector('.products-men-trousers');
  const products_w_j_btn = document.querySelector('.products-women-jacket');
  const products_m_j_btn = document.querySelector('.products-men-jacket');
  const btn_search = document.querySelector('#btn-search');


  return {
    products_btn,
    products_m_j_btn,
    products_w_j_btn,
    products_w_t_btn,
    products_m_t_btn,
    btn_search,
    products_general

  }
})();

var bodyDomElement = (function () {
  return {
    content_products: document.querySelector('#content-products'),
  }
})()





var template = (function () {
  return {
    productTemplate: `
        <div class="col-3 ">
        <button class="btn" > 
        <div class="card" style="width: 18rem;">
          <img src="<%= product.photo %>" class="card-img-top" alt="<%= product.photoUrl %>">
          <div class="card-body">
             <div class="d-none"><%= product.id_product%></div>          
            <h5 class="card-title">
              <%= product.category %> id_product:<%= product.id_product%>
            </h5>          
            <p class="card-text">
              <%= product.description %>
            </p>
          </div>
        </div>
        </button>
      </div>
        `,
    beforProductTemplate: `
        <div class="row">
        <div class="col-8">
          <h3>this is some one</h3>
        </div>
      </div>
        `
  }
})();

const eventHendlers = (function () {
  return {
    getProducts(e) {
      if (e.target.getAttribute('class') === 'dropdown-item products') new SuperRenderProduct(url.urlProducts).fetchFn();
      if (e.target.getAttribute('class') === 'dropdown-item products-women-trousers') new SuperRenderProduct(url.urlProducts_W_T).fetchFn();
      if (e.target.getAttribute('class') === 'dropdown-item products-women-jacket') new SuperRenderProduct(url.urlProducts_W_J).fetchFn();
      if (e.target.getAttribute('class') === 'dropdown-item products-men-trousers') new SuperRenderProduct(url.urlProducts_M_T).fetchFn();
      if (e.target.getAttribute('class') === 'dropdown-item products-men-jacket') new SuperRenderProduct(url.urlProducts_M_J).fetchFn();
    },
    searchProducts(e) {
      const inputCategory = e.target.parentElement.getElementsByTagName('input')[0].value;
      const subRenderProduct = new SubRenderProduct(url.urlSearch, inputCategory);
      subRenderProduct.fetchFn();
    },
    getOneProduct(e) {
      if (e.target.getAttribute('src')) {
        let inner = ''
        inner = ejs.render(template.beforProductTemplate, {

        });

        document.getElementById('befor-content-products').innerHTML = inner
        let id_product = e.target.nextElementSibling.childNodes[1].firstChild.textContent;
        new SuperRenderProduct(`${url.urlProducts}/${id_product}`).fetchFn();
      }
    }
  };
})();

export {
  url,
  navbarDomElem,
  bodyDomElement,
  template,
  eventHendlers
};
