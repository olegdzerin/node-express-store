(function () {


  navbarDomElem.products_btn.addEventListener('click', eventHendlers.getProducts);
  navbarDomElem.products_w_t_btn.addEventListener('click', eventHendlers.getProducts);
  navbarDomElem.products_m_t_btn.addEventListener('click', eventHendlers.getProducts);
  navbarDomElem.products_w_j_btn.addEventListener('click', eventHendlers.getProducts);
  navbarDomElem.products_m_j_btn.addEventListener('click', eventHendlers.getProducts);
 

  //search
 navbarDomElem.btn_search.addEventListener('click', eventHendlers.searchProducts);
})();

 //body
 bodyDomElement.content_products.addEventListener('click', eventHendlers.getOneProduct);
