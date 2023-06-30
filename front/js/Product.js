// Récupère l'ID du produit et affiche l'image, le nom, le prix, la description et le choix de couleurs, du produit en question, dynamiquement
export class Product {
    
    constructor() {
        this.imgEl = document.createElement('img');
        this.kanapData = [];
    }

    async displayKanap() {
        try {
            const product = new URLSearchParams(document.location.search);
            const productId = product.get("id");
            const response = await fetch(`http://localhost:3000/api/products/${productId}`);
            this.kanapData = await response.json();

            this.imgEl.src = this.kanapData.imageUrl;
            this.imgEl.alt = this.kanapData.altTxt;
            document.getElementsByClassName("item__img")[0]
                .appendChild(this.imgEl);
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


