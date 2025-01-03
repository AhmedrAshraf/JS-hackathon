const products = document.getElementById('products')
let productData = [];
let storedItem =  JSON.parse(localStorage.getItem("product"))
let count = document.getElementById('count')
if(count && count !== 0){
count.innerHTML = storedItem.length
}

fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(res=>{
    productData = res.products;
    productData.forEach(product => {
        if(products){
        products.innerHTML +=  
        `<div class="card">
            <img src=${product.thumbnail}  alt="${product.title}" loading="lazy"/>
            <h4>${product.title}</h4>
            <p class="product-desc">${product.description}</p>
            <h5 class="product-desc">${product.price}</h5>
            <button class="add-product" onclick="addToBag(${product.id})">SHOP NOW</button>
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

        const itemExists = storedItem.some(item => item.id === items.id);

        if (!itemExists) {
        storedItem.push(items)
        localStorage.setItem("product", JSON.stringify(storedItem))
        count.innerHTML = storedItem.length;
        }else{
            alert("Item already in cart.");
        }

    }else{
        console.log("Not same");
    }
}

// arrow slider
let arrowR = document.getElementById('right-arrow')
console.log("🚀 ~ arrowR:", arrowR)

const moveRight = () =>{
    alert('refd');
    // .style.transform = 'translateX(100px)';
}

arrowR.addEventListener('click', moveRight)

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