let rangeFilterCountMinElem = document.getElementById("rangeFilterCountMin");
let rangeFilterCountMaxElem = document.getElementById("rangeFilterCountMax");
let filterBtn = document.getElementById('rangeFilterCount');
let ascendentBtn = document.getElementById('precio-ascendente');
let descendentBtn = document.getElementById('precio-descendente');
let relevanceBtn = document.getElementById('relevancia');
let clearBtn = document.getElementById('clearRangeFilter');
let searchBar = document.getElementById('buscar');
let divListadoDeAutos = document.getElementById("list-products");
let catId = localStorage.getItem("catID");

let productsOriginal = [];
let products = [];

function showProducts() {
    let htmlAppend = '';
    for (let product of products){
        htmlAppend += 
        `<div class="product-container">
            <div class="image-container">
                <img src="${product.image}" alt="">
            </div>
        <div class="details-container">
            <h3>${product.name} - ${product.currency}  ${product.cost}</h3>
            <p>${product.description}</p>
        </div>
            <div class="sold-count">
            <p>${product.soldCount} Vendidos"</p>
        </div>
        </div>`
    }
    divListadoDeAutos.innerHTML = htmlAppend;
}

console.log(`https://japceibal.github.io/emercado-api/cats_products/${catId}.json`);
fetch(`https://japceibal.github.io/emercado-api/cats_products/${catId}.json`)
    .then(response => response.json())
    .then(data => {
        let categoryName = document.getElementById("categoryName");
        categoryName.innerText = data.catName;
        productsOriginal = data.products;
        products = data.products;
        showProducts();
    });

function filterProducts() {

    let rangeFilterCountMin = document.getElementById("rangeFilterCountMin").value;
    let rangeFilterCountMax = document.getElementById("rangeFilterCountMax").value;

    let min = rangeFilterCountMin;
    let max = rangeFilterCountMax;

    if (min == ''){
        min = -Infinity;
    };
    if (max == ''){
        max = Infinity;
    };

    products = productsOriginal.filter(product => product.cost >= min && product.cost <= max);
    showProducts();
};


filterBtn.addEventListener('click', filterProducts);
ascendentBtn.addEventListener('click', () =>{
    products.sort((a,b) => {
        return a.cost - b.cost;
    });
    showProducts()
});
descendentBtn.addEventListener('click', () =>{
    products.sort((a,b) => {
        return b.cost - a.cost;
    });
    showProducts()
});
relevanceBtn.addEventListener('click', () =>{
    products.sort((a,b) => {
        return b.soldCount - a.soldCount;
    });
    showProducts()
});
clearBtn.addEventListener('click', () => {
    rangeFilterCountMinElem.value = '';
    rangeFilterCountMaxElem.value = '';
    filterProducts();
});

//buscador
searchBar.addEventListener('input', ()=>{
    let criteria = searchBar.value;
    products = productsOriginal.filter(product => product.name.toLowerCase().includes(criteria.toLowerCase()));
    showProducts();
});

