// Récupère les données de l'API et affiche dynamiquent sur la page d'accueil du site
export class Kanaps {

    constructor() {
        this.allKanaps;
        this.putCardsProducts = "";
    }

    async displayKanaps() {
        try {
            const response = await fetch('http://localhost:3000/api/products');
            this.allKanaps = await response.json();
            this.allKanaps.forEach(kanap => {
                this.putCardsProducts += `<a href="./product.html?id=${kanap._id}">
                                            <article>
                                                <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
                                                <h3 class="productName">${kanap.name}</h3>
                                                <p class="productDescription">${kanap.description}</p>
                                            </article>
                                        </a>`
            })
            document.getElementById('items').innerHTML = this.putCardsProducts;
        } catch (error) {
            console.error("L'API n'a pas pu être récupéré", error);
        }
    }

    getKanaps() {
        return this.allKanaps
    }
}