const products = document.getElementById('products')
let productData = [];
let storedItem =  JSON.parse(localStorage.getItem("product"))
let count = document.getElementById('count')
// if(count && count !== 0){
// count.innerHTML = storedItem.length
// }

fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(res=>{
    productData = res.products;
    productData.forEach(product => {
        if(products){
        products.innerHTML +=  
        `<div class="card">
            <img src=${product.thumbnail}  alt="${product.title}" loading="lazy"/>
            <h5>${product.title}</h5>
            <p class="product-desc">${product.description}</p>
            <h4 class="product-desc">${product.price}</h4>
            <button class="add-product" onclick="addToBag(${product.id})">Add to bag</button>
        </div>`
        }
    });
});

// add to card
const addToBag = (itemId)=>{
    const items = productData.find(function(item){
       return item.id === itemId
    })
    if(items){
        if (!Array.isArray(storedItem)) {
            storedItem = [];
        }
        storedItem.push(items)
        localStorage.setItem("product", JSON.stringify(storedItem))
        count.innerHTML = storedItem.length;

        
    }else{
        console.log("Not same");
    }
}




// checkout
let checkout = document.getElementById('checkout');

if(storedItem){
storedItem.forEach((item) => {
    if(checkout){
    checkout.innerHTML += `
    <div class='card'>
        <img src=${item.thumbnail} alt="${item.title}" loading="lazy"/>
        <div class='card-content'>
            <h5>${item.title}</h5>
            <p>${item.description}</p>
            <h4>$${item.price}</h4>
              <div class="quantity-container">
                <button class="quantity-btn" id="updateQuantity" onclick="let quantity = document.getElementById('quantity-${item.id}'); quantity.innerHTML--">-</button>
                <span id="quantity-${item.id}" class="quantity">1</span>
                <button class="quantity-btn"  onclick="let quantity = document.getElementById('quantity-${item.id}'); quantity.innerHTML++">+</button>

            </div>
            <button class="buy-button">Buy it now</button>
        </div>
    </div>`;
    }
});
}