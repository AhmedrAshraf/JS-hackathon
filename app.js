const products = document.getElementById('products')
fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(res=>{
    res.products.forEach(product => {
        console.log("product", product); 
        products.innerHTML +=  
        `<div class="card">
            <img src=${product.thumbnail}  alt="${product.title}" loading="lazy"/>
            <h5>${product.title}</h5>
            <p class="product-desc">${product.description}</p>
            <h4 class="product-desc">${product.price}</h4>
            <button class="add-product">Add to bag</button>
        </div>`
    });
});