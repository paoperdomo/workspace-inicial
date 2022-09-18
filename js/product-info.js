let catId = localStorage.getItem("catID");
let productId = localStorage.getItem("productId");
let divProductInfo = document.getElementById("product-info");
let commentsDiv = document.getElementById("product-comments");
let userName = localStorage.getItem("userEmail");
let addCommentBtn = document.getElementById("add-comment-btn");

console.log(`https://japceibal.github.io/emercado-api/products/${productId}.json`);
fetch(`https://japceibal.github.io/emercado-api/products/${productId}.json`)
    .then(response => response.json())
    .then(product => {
        let htmlAppend = ''; 
        htmlAppend += 
        `<div class="product-container">
            <div class="image-container">
                <img src="${product.images[0]}" alt="">
                <img src="${product.images[1]}" alt="">
                <img src="${product.images[2]}" alt="">
                <img src="${product.images[3]}" alt="">
            </div>
        <div class="details-container">
            <h2>${product.name} - ${product.currency}  ${product.cost}</h2>
            <p>${product.description}</p>
            <p>${product.soldCount} Vendidos"</p>
        </div>`
        divProductInfo.innerHTML = htmlAppend;
    });

    
console.log(`https://japceibal.github.io/emercado-api/products_comments/${productId}.json`);
fetch(`https://japceibal.github.io/emercado-api/products_comments/${productId}.json`)
    .then(response => response.json())
    .then(productComments => {
        for (let i=0; i < productComments.length; i++){
            console.log(productComments[i].score)
            let htmlAppend = ''; 
            htmlAppend += 
            `<div class="comment-container">
                <h3><b>${productComments[i].user}</b> - ${productComments[i].dateTime} - ${starRating(productComments[i].score)}</h3> 
                <h3>${productComments[i].description}</h3>
            </div>`;
            commentsDiv.innerHTML += htmlAppend;
        }       
    });

function starRating(stars){
    let htmlAppend = '';
    for (let i=0; i<stars; i++){
        htmlAppend += 
        `<span class="fa fa-star checked"></span>`
    } 
    for ( ;stars<5; stars++){
        htmlAppend += 
        `<span class="fa fa-star"></span>`
    }
    return htmlAppend;
}

addCommentBtn.addEventListener('click', () =>{
    event.preventDefault();
    let htmlAppend = ''; 
    let comment = document.getElementById('comment-box').value;
    var startSelect = document.getElementById("stars-selector");
    htmlAppend += 
    `<div class="comment-container">
        <h3>${userName} - ${(new Date()).toLocaleString()} - ${starRating(startSelect.value)}</h3> 
        <h3>${comment}</h3>
    </div>`;
    commentsDiv.innerHTML += htmlAppend;
    document.getElementById('comment-box').value = '';
})