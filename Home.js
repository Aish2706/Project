let products=[];

function fetchData()
{
    fetch("https://dummyjson.com/products").then((val)=>{

        return val.json();
    }).then((res)=>{
        products=res.products;
        console.log(products);
        localStorage.setItem("products",JSON.stringify(products));
        fetchProd(products)

        
    })
}

function fetchProd(products)
{
    let product="";
    products.map((val)=>{
        product+= `
            <main>
                <div id="prodImages">
                    <img height="100%" width="auto" src="${val.images[0]}"/>
                </div>
                <div id="title">
                    <h3>${val.title}</h3>
                </div>
                <div id="pricebox">
                    <div id="price" >
                        <strong>Price:</Strong>$${val.price}
                    </div>
                    <div id="rating">
                        ${val.rating.toFixed(1)}<i id="star" class="fa-solid fa-star"></i>
                    </div>
                </div>
                <div id="viewMore">
                    <button onClick="viewMore(${val.id})" id="view">Viewmore</button>
                </div>
            </main>                                          
        `
     })
    document.getElementById("root").innerHTML=product;
}

function viewMore(productId)
{
    localStorage.setItem("selectedProductId",productId)
    window.location.href="./viewMore.html"

}

function searchItem(event){
    let searchTerm = event.target.value.toLowerCase();
    let filterProd = products.filter(
        (product)=>
            product.title.toLowerCase().includes(searchTerm)||
            product.category.toLowerCase().includes(searchTerm)
    )
    fetchProd(filterProd);
}
document.getElementById("searchProd").addEventListener("input",searchItem);

fetchData()
