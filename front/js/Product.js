import Cart from './Cart.js';
// Récupère l'ID du produit et affiche l'image, le nom, le prix, la description et le choix de couleurs, du produit en question, dynamiquement
export default class Product {
    
    constructor() {
        this.kanapData = [];
    }

    displayErrorId(productId) {
        if (productId === null) alert('Cette ID n\'existe pas');
    }
    
    handleProduct() {
        const btnAddCart = document.getElementById('addToCart');
        const urlParams = new URLSearchParams(document.location.search);
        const productId = urlParams.get("id");
        this.displayErrorId(productId);

        btnAddCart.addEventListener('click', () => {
            
            const image = this.kanapData.imageUrl;
            const title = this.kanapData.name;
            const price = this.kanapData.price;
            const colour = document.getElementById('colors').selectedIndex;
            const quantity = document.getElementById('quantity').value;
            
            const productToAddToCart = {
                image,
                title,
                price,      
                colour,
                quantity
            };
            
            const cart = new Cart();
            cart.addProduct(productToAddToCart);

            // window.location.replace(`${window.location.origin}/html/cart.html`);
        });
    }
        
    async displayKanap() {
        try {
            const product = new URLSearchParams(document.location.search);
            const productId = product.get("id");

            this.displayErrorId();

            const response = await fetch(`http://localhost:3000/api/products/${productId}`);
            this.kanapData = await response.json();
            
            const imgEl = document.createElement('img');
            imgEl.src = this.kanapData.imageUrl;
            imgEl.alt = this.kanapData.altTxt;
            document.getElementsByClassName("item__img")[0]
                .appendChild(imgEl);
            document.getElementById('title').textContent = this.kanapData.name;
            document.getElementById('price').textContent = this.kanapData.price;
            document.getElementById('description').textContent = this.kanapData.description;

            let allOptionsColors = '';
            this.kanapData.colors.forEach(color => {
                allOptionsColors += `<option value="${color}">${color}</option>`;
            });

            document.getElementById('colors').insertAdjacentHTML('beforeend', allOptionsColors);
        } catch (error) {
            console.error(error);   
        }
    }

    getKanap() {
        return this.kanapData;
    }
}