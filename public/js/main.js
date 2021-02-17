import {
  domElements
} from './domElement.js';
import {
  Init
} from './initTemplate.js';

var displayCatalog = (e) => {
  
 if(e.target.getAttribute("id") === "add-men"){
  localStorage.setItem('gender', 'men');
  initDb('/products/men')
 }else{
  localStorage.setItem('gender', 'women');
  initDb('/products/women')
 }
}
var initDb = async (url) => {
  var countCar;
  var products;
  try {
    const res = await fetch(url)
    products = await res.json();
    console.log(products)

  } catch (err) {
    console.log(err)
    return err
  }

  var initAdd = () => {
  
    countCar = products.length;
    var init = new Init(products, countCar);
    domElements.show_catalog.innerHTML = init.resultTemplate();
    console.log(document.querySelectorAll(".select-product")[3]);
  }
  initAdd();
};
var initAfterSortingSubFn = (e, targetValue, localStorageValue, url) => {
  if ((e.target.value === targetValue) && (localStorage.getItem('gender') === localStorageValue)) {
    return initDb(url);
  };
};

var initAfterSorting = (e) => {
  initAfterSortingSubFn(e, '1',  'women', '/products/women/jacket');
  initAfterSortingSubFn(e, '1',  'men', '/products/men/jacket');
  initAfterSortingSubFn(e, '2',  'women', '/products/women/trousers');
  initAfterSortingSubFn(e, '2',  'men', '/products/men/trousers');
}
var selectProduct = (e) => {

  if (e.target.innerHTML === "Вибрати") {
    const itemIdEl = $(e.target).prev();
    const itemId = Number(itemIdEl[0].innerHTML)
   // console.log(typeof (itemId));
    localStorage.setItem('product_id', itemId);
  //  console.log('productId' + localStorage.getItem('product_id'));
    (async () => {
      try {
        const result = await fetch(`/products/${itemId}`);
        const data = await result.json();
        console.log(data);
        const count = data.length
        var init = new Init(data, count);
        //  console.log(init.data)
        domElements.show_catalog.innerHTML = init.resultTemplate();
        domElements.addToCart.innerHTML = "Добавити в кошик";
      } catch (err) {
        console.log(err);
      }
    })()
  };
};

var addToCart = async () => {
   const user_id = Number(localStorage.getItem('user_id'));
   const product_id = Number(localStorage.getItem('product_id'))
  try {
    const res = await fetch(`/cart/${user_id}`);
    const cart = await res.json()
    localStorage.setItem('cart_id', cart.id);
      //  console.log('cart::' + cart.id);
    try {
      const res = await fetch('/cart-products', {
        method: "POST",
        body: JSON.stringify({
          cart_id: cart.id,
          product_id: product_id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const result = await res.json();
     //  console.log(result);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
}

domElements.addMenImage.addEventListener("click", displayCatalog);
domElements.addWomenImage.addEventListener("click", displayCatalog);
domElements.sorting_product.addEventListener('click', initAfterSorting);
domElements.show_catalog.addEventListener('click', selectProduct);

domElements.addToCart.addEventListener('click', addToCart);
