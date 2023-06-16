// Récupère les données de l'API et affiche dynamiquent sur la page d'accueil du site

fetch("http://localhost:3000/api/products")
    .then(reponse => reponse.json())
    .then(data => {
        let putCardsProducts = "";
        for (let i = 0;i < data.length;i++) {
            putCardsProducts += `<a href="./product.html?id=${data[i]._id}">
                                    <article>
                                        <img src="${data[i].imageUrl}" alt="${data[i].altTxt}">
                                        <h3 class="productName">${data[i].name}</h3>
                                        <p class="productDescription">${data[i].description}</p>
                                    </article>
                                </a>`
        }
        document.querySelector("#items").innerHTML = putCardsProducts;
    })
    .catch(err => console.log(err));