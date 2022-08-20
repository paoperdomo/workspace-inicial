document.addEventListener("DOMContentLoaded", function (){

    fetch("https://japceibal.github.io/emercado-api/cats_products/101.json")
    .then( response => response.json())
    .then(data =>{

        let divListadoDeAutos = document.getElementById("listado-autos");
        for (let i=0; i < data.products.length; i++){

            let productImage = document.createElement("img");
            productImage.setAttribute("src", data.products[i].image);

            let detailsProduct = document.createElement("h3");
            detailsProduct.innerText = data.products[i].name + " - " + data.products[i].currency + " " + data.products[i].cost;
            
            let productDescription = document.createElement("p");
            productDescription.innerText = data.products[i].description;   

            let soldCounterAutos = document.createElement("p");
            soldCounterAutos.innerText = data.products[i].soldCount + " Vendidos";

            let imageContainer = document.createElement("div");
            imageContainer.classList.add("image-container");

            let detailsContainer = document.createElement("div");
            detailsContainer.classList.add("details-container");

            let soldContainer = document.createElement("div");
            soldContainer.classList.add("sold-count");

            imageContainer.appendChild(productImage);

            detailsContainer.appendChild(detailsProduct);
            detailsContainer.appendChild(productDescription);

            soldContainer.appendChild(soldCounterAutos);

            let productContainer = document.createElement("div");
            productContainer.classList.add("product-container");
            productContainer.appendChild(imageContainer);
            productContainer.appendChild(detailsContainer);
            productContainer.appendChild(soldContainer);
           
            divListadoDeAutos.appendChild(productContainer);
        };  

    });

});