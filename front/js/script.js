// Récupère les données de l'API et affiche dynamiquent sur la page d'accueil du site

async function displayKanaps() {
    try {
        const response = await fetch("http://localhost:3000/api/products")
        const kanaps = await response.json();
        let putCardsProducts = "";
        kanaps.foreach(kanap => {
            putCardsProducts += `<a href="./product.html?id=${kanap._id}">
                                    <article>
                                        <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
                                        <h3 class="productName">${kanap.name}</h3>
                                        <p class="productDescription">${kanap.description}</p>
                                    </article>
                                </a>`
        })
        document.getElementById("items").innerHTML = putCardsProducts;
    } catch(error) {
        console.error(error)
    }
}
displayKanaps();