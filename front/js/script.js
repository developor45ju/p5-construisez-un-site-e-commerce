// Récupère les données de l'API et affiche dynamiquent sur la page d'accueil du site

class Kanaps {
    constructor() {
        this.response = fetch('http://localhost:3000/api/products');
        this.putCardsProducts = "";
    }

    async displayKanaps() {
        try {
            const RESPONSE = await this.response;   
            const KANAPS = await RESPONSE.json();
            KANAPS.forEach(kanap => {
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
            error = 'L\'API n\'a pas pu être récupéré';
            console.error(error);
        }
    }

    getKanaps() {
        return this.displayKanaps();
    }
}

const ALL_KANAPS = new Kanaps();
ALL_KANAPS.getKanaps();