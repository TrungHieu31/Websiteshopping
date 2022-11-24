function disableScroll() { document.body.style.overflow="hidden";  }
function enableScroll(){
    document.body.style.overflow="initial";
    popup.style.display = "none";
}
const popup = document.querySelector('.popup');
const close = document.querySelector('.close');
window.onload = function(){
    disableScroll();
    setTimeout(function(){
        popup.style.display = "block";
    }, 500)
}
close.addEventListener('click', enableScroll);
const data= [
    {
        id : 0,
        img : 'images/iphone14promax.jpg',
        name : 'Iphone 14 Pro Max',
        price : 1549,
        save : 49,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id : 1,
        img : 'images/iphone14.jpg',
        name : 'Iphone 14',
        price : 1000,
        save : 50,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id : 2,
        img : 'images/iphone14plus.jpg',
        name : 'Iphone 14 Plus',
        price : 1400,
        save : 30,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id : 3,
        img : 'images/iphone14pro.png',
        name : 'Iphone 14 Pro',
        price : 1800,
        save : 40,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id : 4,
        img : 'images/redminote8.jpg',
        name : 'Redmi Note 8',
        price : 200,
        save : 15,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id : 5,
        img : 'images/redminote9.jpg',
        name : 'Redmi Note 9',
        price : 220,
        save : 25,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id : 6,
        img : 'images/redmi8.jpg',
        name : 'Redmi 8A Dual',
        price : 160,
        save : 20,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id : 7,
        img : 'images/redmi9.jpg',
        name : 'Redmi 9',
        price : 100,
        save : 10,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
];

let cartList=[]; //array to store cart lists

var i;
var detail =document.getElementsByClassName('card-item');
var detailsImg = document.getElementById('details-img')
var detailTitle = document.getElementById('detail-title')
var detailPrice = document.getElementById('detail-price')
var youSave = document.getElementById('you-save');
var detailsPage = document.getElementById('details-page');
var back = document.getElementById('buy')
back.addEventListener('click',refreshPage)
var addToCarts = document.querySelectorAll('#add-to-cart')
var cart = document.getElementById('cart');

// click event to display cart page
cart.addEventListener('click',displayCart)

var carts = document.getElementById('carts');

//click events to add items to cart from details page
carts.addEventListener('click',()=>addToCart(getId))

var home = document.getElementById('logo');

//click event to hide cart page and return to home page
home.addEventListener('click',hideCart);

//events on dynamically created element to remove items from list
document.addEventListener('click',function (e){
    if(e.target.id=='remove'){
        var itemId = e.target.parentNode.id
        removeFromCart(itemId)
    }
})


//click event to display details page
for(i=0;i<data.length;i++){
    detail[i].addEventListener('click',handleDetail)
    detail[i].addEventListener('click',disableScroll)
}

var getId;

//click events to add items to cart from home page cart icon
addToCarts.forEach(val=>val.addEventListener('click',()=>addToCart(val.parentNode.id)));

// details function
function handleDetail(e){
    detailsPage.style.display = 'block'
    getId= this.parentNode.id;
    detailsImg.src= data[getId].img;
    detailTitle.innerHTML=   data[getId].name;
    detailPrice.innerHTML= 'Giá : $ ' +data[getId].price;
    youSave.innerHTML= 'Tiết kiệm : ($ ' + data[getId].save + ')';
}

// add item to the cart
function addToCart(id) {
    if(!data[id].itemInCart){
        cartList= [...cartList,data[id]];
        addItem()
        
        alert('Đã thêm vào giỏ hàng')

    }
    else{
        alert('Sản phẩm này đã có trong giỏ hàng của bạn')
    }
    data[id].itemInCart= true
}

//back to main page
function refreshPage(){
    detailsPage.style.display = 'none'
    enableScroll();
}

// hide your cart page
function hideCart(){
    document.getElementById('main').style.display= "block";
    document.getElementById('cart-container').style.display= "none";
}

//display your cart page
function displayCart(){
    document.getElementById('main').style.display= "none";
    document.getElementById('details-page').style.display= "none";
    document.getElementById('cart-container').style.display= "block";
    if(cartList.length==0){
        document.getElementById('cart-with-items').style.display= "none";
        document.getElementById('empty-cart').style.display= "block";
    }
    else{
        document.getElementById('empty-cart').style.display= "none";
        document.getElementById('cart-with-items').style.display= "block";
        
    }
}

var totalAmount;
var totalItems;
var totalSaving;

//add item to the cart
function addItem(){
    totalAmount=0;
    totalItems = 0;
    totalSaving=0
    var clrNode=document.getElementById('item-body');
        clrNode.innerHTML= '';
        console.log(clrNode.childNodes)
        cartList.map((cart)=>
        {
            var cartCont = document.getElementById('item-body');
            totalAmount = totalAmount + cart.price;
            totalSaving = totalSaving + cart.save;
            totalItems = totalItems + 1;

            var tempCart = document.createElement('div')
            tempCart.setAttribute('class','cart-list');
            tempCart.setAttribute('id',cart.id);

            var listImg = document.createElement('img');
            listImg.setAttribute('id','list-img');
            listImg.src = cart.img
            tempCart.appendChild(listImg)

            var listName = document.createElement('h3');
            listName.setAttribute('class','list-name');
            listName.innerHTML = cart.name;
            tempCart.appendChild(listName)

            var listPay = document.createElement('h3');
            listPay.setAttribute('class','pay');
            listPay.innerHTML = cart.price;
            tempCart.appendChild(listPay);

            var listQuantity = document.createElement('h3');
            listQuantity.setAttribute('class','quantity');
            listQuantity.innerHTML = '1';
            tempCart.appendChild(listQuantity);

            var listTrash = document.createElement('i');
            listTrash.setAttribute('class','fa fa-trash ');
            listTrash.setAttribute('id','remove');
            tempCart.appendChild(listTrash);

            cartCont.appendChild(tempCart)
            
        })
        document.getElementById('total-amount').innerHTML = 'Tổng thanh toán : $' + totalAmount;
        document.getElementById('total-items').innerHTML = 'Tổng số sản phẩm : ' + totalItems;
        document.getElementById('you-saved').innerHTML = 'Đã tiết kiệm : $' + totalSaving;
        document.getElementById('total').style.display= "block";
}

//remove item from the cart
function removeFromCart(itemId){
    data[itemId].itemInCart = false
    cartList = cartList.filter((list)=>list.id!=itemId);
    addItem()
    if(cartList.length==0){
        document.getElementById('cart-with-items').style.display= "none";
        document.getElementById('empty-cart').style.display= "block";
    }
}

