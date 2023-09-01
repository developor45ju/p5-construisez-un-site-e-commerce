export default class Cart {
    constructor() {
        const currentItem = localStorage.getItem('cart');
        this.cart = currentItem === null ? [] : JSON.parse(currentItem);
        this.kanapAPI = []
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
            const articlesFromCart = JSON.parse(localStorage.getItem('cart'));
            let articles = '';
            let nbTotalArticle = 0;
            let priceTotal = 0;
            const response = await fetch(`http://localhost:3000/api/products/`);
            const kanapAPI = await response.json();
            this.kanapAPI = kanapAPI;

            articlesFromCart.forEach(kanap => {
                let name, price, altTxt, img;
                kanapAPI.forEach(kanapFomAPI => {
                    if (kanap.id === kanapFomAPI._id) {
                        name = kanapFomAPI.name
                        price = kanapFomAPI.price
                        altTxt = kanapFomAPI.altTxt
                        img = kanapFomAPI.imageUrl
                    }
                })

                articles += `<article class="cart__item" data-id="${kanap.id}" data-color="${kanap.colour}">
                                <div class="cart__item__img">
                                <img src="${img}" alt="${altTxt}">
                                </div>
                                <div class="cart__item__content">
                                <div class="cart__item__content__description">
                                    <h2>${name}</h2>
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

                
                nbTotalArticle += Number(kanap.quantity);
                priceTotal += Number(price) * Number(kanap.quantity);
            });

            document.getElementById('cart__items').innerHTML = articles;
            document.getElementById('totalQuantity').textContent = nbTotalArticle
            document.getElementById('totalPrice').textContent = priceTotal;
            
            // add listeners for quantity changed   
            const inputsQuantity = [...document.getElementsByClassName('itemQuantity')];
            inputsQuantity.forEach(DOMinput => DOMinput.addEventListener('change', event => this.updateQuantity(event)));
            const buttonDeleteArticle = [...document.getElementsByClassName('deleteItem')];
            buttonDeleteArticle.forEach(DOMbuttom => DOMbuttom.addEventListener('click', event => this.deleteArticle(event)));
        } catch (e) {
            console.error(e);
        }
    }
    
    updateQuantity(event) {
        try {   
            const kanapNewQuantity = Number(event.target.value);
            if (kanapNewQuantity < 1) this.deleteArticle(event);

            const kanapParentDomElement = event.target.closest('.cart__item');
            const sameKanapFromLocalstorage = this.cart.find(kanapFormLS => kanapFormLS.id === kanapParentDomElement.dataset.id && kanapFormLS.colour === kanapParentDomElement.dataset.color);
            
            sameKanapFromLocalstorage.quantity = kanapNewQuantity;
            localStorage.setItem('cart', JSON.stringify(this.cart));
            this.updateTotalQuantity();
            this.updateTotalPrice();
            
        } catch (error) {
            console.error(error);
        }
    }

    
    deleteArticle(event) {
        
        // Récupérer l'article au clique
        const kanapParent = event.target.closest('.cart__item');
        
        // const message = () => console.log('coucou')
        // kanapParent.addEventListener('click', message)
        
        try {
            // Supprimer l'élément du tableau original          
            const deleteElement = (element) => element.id === kanapParent.dataset.id && element.colour === kanapParent.dataset.color;
            // TODO commenter pourquoi cela ?
            if (deleteElement === -1) {
                console.error('Impossible !');
                return;
            }

            const indexToDelete = this.cart.findIndex(deleteElement);
            this.cart.splice(indexToDelete, 1);
            localStorage.setItem('cart', JSON.stringify(this.cart));
            // Supprimer l'article du DOM
            kanapParent.remove();

            this.updateTotalQuantity();
            this.updateTotalPrice();
        } catch (error) {
            console.log(error);
        }
    }
    

    updateTotalPrice() {
        let totalPrice = 0;
        try {
            this.cart.forEach(kanapFromLS => {
                console.log(this.kanapAPI);
                
                const price = this.kanapAPI.find(kanap => kanap._id === kanapFromLS.id);
                const productTotal = Number(kanapFromLS.quantity) * price.price;

                totalPrice += productTotal

            })

            document.getElementById('totalPrice').textContent = totalPrice;
        } catch (error) {
            console.error(error);
        }
    }

    updateTotalQuantity() {
        let totalQuantity = 0;
        this.cart.forEach(kanapFormLS => {
            totalQuantity += Number(kanapFormLS.quantity);
        });
        document.getElementById('totalQuantity').textContent = totalQuantity;
    }


    gettingCart() {
        return this.cart;
    }
}