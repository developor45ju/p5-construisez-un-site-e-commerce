export default class Cart {
    constructor() {
        const currentItem = localStorage.getItem('cart');
    
        this.cart = currentItem === null ? [] : JSON.parse(currentItem);
    }

    addProduct(productToAdd) {
        
        const sameProductInCart = this.cart.find(kanapFromLS => kanapFromLS.id === productToAdd.id && kanapFromLS.colour === productToAdd.colour);

        if (sameProductInCart) {
            sameProductInCart.quantity += productToAdd.quantity;
        } else {
            this.cart.push(productToAdd);
        }

        localStorage.setItem('cart', JSON.stringify(this.cart));
    }
    



    async displayArticle() {
        try {
            const article = localStorage.getItem('cart');
            const articlesArray = JSON.parse(article);
            let articles = '';
            let nbTotalArticle = 0;
            let priceTotal = 0;
            const response = await fetch(`http://localhost:3000/api/products/`);
            const kanapAPI = await response.json();

            articlesArray.forEach(kanap => {
                let lname, price, altTxt, img;
                kanapAPI.forEach(kanap1=> {
                    if (kanap.id==kanap1._id) lname=kanap1.name
                })

                kanapAPI.forEach(kanap1=> {
                    if (kanap.id==kanap1._id) price=kanap1.price
                })

                kanapAPI.forEach(kanap1=> {
                    if (kanap.id==kanap1._id) altTxt=kanap1.altTxt
                })

                kanapAPI.forEach(kanap1=> {
                    if (kanap.id==kanap1._id) img=kanap1.imageUrl
                })

                articles += `<article class="cart__item" data-id="${kanap.id}" data-color="${kanap.colour}">
                                <div class="cart__item__img">
                                <img src="${img}" alt="${altTxt}">
                                </div>
                                <div class="cart__item__content">
                                <div class="cart__item__content__description">
                                    <h2>${lname}</h2>
                                    <p>${kanap.colour}</p>
                                    <p>${price} €</p>
                                </div>
                                <div class="cart__item__content__settings">
                                    <div class="cart__item__content__settings__quantity">
                                    <p>Qté : </p>
                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${kanap.quantity}">
                                    </div>
                                    <div class="cart__item__content__settings__delete">
                                    <p class="deleteItem">Supprimer</p>
                                    </div>
                                </div>
                                </div>
                            </article>`
                nbTotalArticle += kanap.quantity;
                priceTotal += price * kanap.quantity;
            });
            document.getElementById('cart__items').innerHTML = articles;
            document.getElementById('totalQuantity').textContent = nbTotalArticle;
            document.getElementById('totalPrice').textContent = priceTotal;
        } catch (e) {
            console.error(e);
        }
    }

    updateQuantity() {
        addEventListener('change', (e) => {
            const element = e.target;
            console.log(element);
        })
    }

    gettingCart() {
        return this.cart;
    }
}