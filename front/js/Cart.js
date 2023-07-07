export default class Cart {
    constructor() {
        this.cart = []
    }

    // ajoute le produit au panier et au localstorage
    addProduct(product) {
        this.cart.push(product);
       

        // incrémenter dans le tableau this.cart, les différents articles ajouter au panier
            // ne pas permettre la modification de la quantité, dans la page Product.js
            // si autre couleur du produit, l'ajouter en tant que autre valeur du produit dans le tableau
            // si même couleur du produit, ne rien faire
        // ajouter au localstorage en unserialiser l'objet
        // récupérer la clé du tableau
            // si la clé est vide, afficher erreur dan la console
        // 
        // ajouter au panier (de la class)

        // penser aux cas spéciaux / aux diverses conditions



        localStorage.setItem('kanaps', JSON.stringify(this.cart));

    }

    gettingCart() {
        return this.cart;
    }
}