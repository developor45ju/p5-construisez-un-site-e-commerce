import Cart from './Cart.js';
// Récupère l'ID du produit et affiche l'image, le nom, le prix, la description et le choix de couleurs, du produit en question, dynamiquement
export default class Product {
    
    constructor() {
        this.kanapData = [];
    }

    preventZeroQuantity(quantity) {
        const errorMessageId = 'item__content__settings__quantity__error';
        const errorMessage = document.getElementById(errorMessageId);

        if (errorMessage) errorMessage.remove();
        if (quantity <= 0 || quantity > 100) {
            const newErrorMessage = document.createElement('p');
            
            newErrorMessage.textContent = 'Veuillez choisir une quantité!';
            newErrorMessage.style.color = 'red';
            newErrorMessage.setAttribute('id', errorMessageId);
            document.getElementsByClassName('item__content__settings__quantity')[0]
            .appendChild(newErrorMessage);
            throw new Error('Le script ne continu pas');
        }
        /*
        document.getElementsByClassName('item__content__settings__quantity')[0].innerHTML = `
        <p id='item__content__settings__quantity__error'>
            Veuillez choisir une quantité!
        </p>`

        #item__content__settings__quantity__error {
            color: red
        }
        */
        
    }

    preventFirstIndexColour(colour) {
        const errorMessageId = 'item__content__settings__color__error';
        const errorMessage = document.getElementById(errorMessageId);
        
        if (errorMessage) errorMessage.remove();
        
        if (colour === 0) {
            document.getElementsByClassName('item__content__settings__color')[0].insertAdjacentHTML('beforeend', `
                <p id="item__content__settings__color__error" style="color: red;">
                    Veuillez choisir une couleur !
                </p>`);
            throw new Error('Le script ne continu pas');
        }
    }
    
    handleProduct() {
        const btnAddCart = document.getElementById('addToCart');

        btnAddCart.addEventListener('click', () => {
            
            //let image, title, price
            //[image, title, price] = [this.kanapData.imageUrl, this.kanapData.name, this.kanapData.price]
            
            const image = this.kanapData.imageUrl;
            const title = this.kanapData.name;
            const price = this.kanapData.price;
            const colour = document.getElementById('colors').selectedIndex;
            const quantity = Number(document.getElementById('quantity').value);

            this.preventFirstIndexColour(colour);
            this.preventZeroQuantity(quantity);

            const productToAddToCart = {
                image,
                title,
                price,      
                colour,
                quantity
            };
            
            const cart = new Cart();
            cart.addProduct(productToAddToCart);

        });
    }
        
    async displayKanap() {
        try {
            const product = new URLSearchParams(document.location.search);
            const productId = product.get("id");
            
            const response = await fetch(`http://localhost:3000/api/products/${productId}`);
            this.kanapData = await response.json();

            if (productId !== this.kanapData._id || productId === null) {
                document.getElementsByClassName('item')[0].innerHTML = `
                    <h1>
                        Page 404
                    </h1>
                `
                throw new Error('Cette page n\'existe pas');
            }
            
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