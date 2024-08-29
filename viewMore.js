document.addEventListener("DOMContentLoaded", ()=>{
    let productDetails = document.getElementById("productDetails");
    let products = JSON.parse(localStorage.getItem("products"));
    
    let selectedProductId = localStorage.getItem("selectedProductId");
    
    if(products && selectedProductId)
    {
        let selectedProduct = products.find(
            (product)=>product.id == selectedProductId
        );
        if(selectedProduct)
        {
            console.log(selectedProduct);
            productDetails.innerHTML=`
            <main>
            <div id="tophalf">
            <div id="pimg">
            <img src="${selectedProduct.images[0]}"/>
            </div>
            <div id="pdetail">
            <h2 id="title">${selectedProduct.title}</h2>
            <p id="brand"><strong>Brand:</strong>${selectedProduct.brand}</p>
            <p id="category"><strong>Category:</strong>${selectedProduct.category}</p>
            <p id="descrip"><strong>Description:</strong>${selectedProduct.description}</p>
            <p id="price"><strong>Price:</strong>$${selectedProduct.price}</p>
            <div id="butn">
            <button id="addToCart">Add to Cart</button>
            <button id="backToHome">Back to Home</button>
            </div>
            </div>
            </div>
            <div id="review">
            <h1>Customer reviews</h1>
            <hr>
            ${selectedProduct.reviews.map(
                (review)=>`
                    <div id="ratings">${"❤️".repeat(review.rating)}${"🖤".repeat(5-review.rating)}</div>
                    <p id="comment">${review.comment}</p>
                    <p id="nam">By <strong>${review.reviewerName}</strong> on ${new Date(
                        review.date
                    )}</p>
                    <hr>
                
                `
            
                
            )}
            </div>
            </main>
            
            
            
            `
            document.getElementById("addToCart").addEventListener("click",()=>{
                addToCart(selectedProduct);
            })
        }else{
            productDetails.innerHTML="<p>Product not found </p>"
        }
    }else{
        productDetails.innerHTML="<p>No product selected </p>"
    }
})

function addToCart(product)
{
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert("product added to cart!")
}