let carts =document.querySelectorAll('.add-cart');
let products =[
    {
        name: "Daawat Rice-1kg",
        tag: "daawat-rice",
        price: 110,
        inCart:0 
    }, 
    {
        name: "Fortune Besan-500g",
        tag: "besan",
        price: 60,
        inCart:0 
    },
    {
        name:"MDH Haldi Powder-100g",
        tag:"mdh-haldi",
        price: 45,
        inCart:0
    },
    {
        name:"Saffola Gold Oil",
        tag:"saffola-oil",
        price:200,
        inCart:0 
    }
];
for( let i=0; i<carts.length;i++){
    carts[i].addEventListener('click',() => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadcartNumbers()
{
    let productNumbers =localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
   
    let productNumbers = localStorage.getItem('cartNumbers');
   
    productNumbers = parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers + 1);
        document.querySelector('.cart span').textContent= productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent= 1;
    }
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if( cartItems != null) {
        if(cartItems[product.tag]== undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else{
        product.inCart = 1;
        cartItems ={
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    console.log("My cartCost is",cartCost);
    console.log(typeof cartCost);

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost",cartCost + product.price);
    } else {
        localStorage.setItem("totalCost",product.price);
    }
}
function displayCart(){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems= JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
    console.log(cartItems);
    if(cartItems && productContainer) {
        productContainer.innerHTML ='';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <div class ="product">
                <span>${item.name}</span>
            </div>
            <div class="price">Rs.${item.price}.00</div>
            <div class ="quantity">
                <span>${item.inCart}</span>
            </div>
            <div class ="total">
               Rs.${item.inCart * item.price}.00
            </div>
            `
    });
    productContainer.innerHTML += `
    <div class ="basketTotalContainer">
        <h4 class="basketTotalTitle">
            Basket Total
        </h4>
        <h4 class ="basketTotal">
            RS.${cartCost}.00
        </h4>
        `
    }
}

    

onLoadcartNumbers();
displayCart();