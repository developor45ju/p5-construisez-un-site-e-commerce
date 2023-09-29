import Cart from './Cart.js';

const cartInstance = new Cart();
cartInstance.displayArticle();

const send = document.getElementById('order');
send.addEventListener('click', event => {
    event.preventDefault();
    console.log('coucou ? déclenché ?', event)
    cartInstance.checkFields();
});    

// cartInstance.checkFields.bind(cartInstance)