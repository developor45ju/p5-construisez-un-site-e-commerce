export default class Cart {
    constructor() {
        const currentItem = localStorage.getItem('cart');
    
        this.cart = currentItem === null ? [] : JSON.parse(currentItem);

    }

    // ajoute le produit au panier et au localstorage
    addProduct(product) {
        
        const sameProductInCart = this.cart.find(item => item._id === product._id && item.colors === product.colors);

        if (sameProductInCart) {
            sameProductInCart.quantity += Number(product.quantity);
        } else {
            this.cart.push(product);
        }

        console.log('cart actuel => ',this.cart);
        
        
        // incrémenter dans le tableau this.cart, les différents articles ajouter au panier
            // ne pas permettre la modification de la quantité, dans la page Product.js
            // si autre couleur du produit, l'ajouter en tant que autre valeur du produit dans le tableau
            // si même couleur du produit, ne rien faire
            // ajouter au localstorage en unserialiser l'objet
            // récupérer la clé du tableau
            // si la clé est vide, afficher erreur dan la console
        // ajouter au panier (de la class)
        
        // penser aux cas spéciaux / aux diverses conditions
        // this.cart = [{color: '', quantity: 4}]
        localStorage.setItem('cart', JSON.stringify(this.cart));
        // window.location.replace(`${window.location.origin}/html/cart.html`);

    }

    gettingCart() {
        return this.cart;
    }
}