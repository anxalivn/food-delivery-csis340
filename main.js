let carts = document.querySelectorAll('.add-cart');


for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(foods[i]);
        totalCost(foods[i]);
    });
}

function onLoadCartNumbers() {
    let foodNumbers = localStorage.getItem('cartNumbers');
    if (foodNumbers) {
        document.querySelector('.cart span').textContent = foodNumbers;
    }
}

function cartNumbers(food, action) {
    let foodNumbers = localStorage.getItem('cartNumbers');
    foodNumbers = parseInt(foodNumbers);

    let cartItems = localStorage.getItem('foodsInCart');
    cartItems = JSON.parse(cartItems);

    if (action) {
        localStorage.setItem("cartNumbers", foodNumbers - 1);
        document.querySelector('.cart span').textContent = foodNumbers - 1;
        console.log("action running");
    } else if (foodNumbers) {
        localStorage.setItem("cartNumbers", foodNumbers + 1);
        document.querySelector('.cart span').textContent = foodNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(food);
}

function setItems(food) {
    // let foodNumbers = localStorage.getItem('cartNumbers');
    // foodNumbers = parseInt(foodNumbers);
    let cartItems = localStorage.getItem('foodsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        let currentfood = food.foodImage;

        if (cartItems[currentfood] == undefined) {
            cartItems = {
                ...cartItems,
                [currentfood]: food
            }
        }
        cartItems[currentfood].inCart += 1;

    } else {
        food.inCart = 1;
        cartItems = {
            [food.foodImage]: food
        };
    }

    localStorage.setItem('foodsInCart', JSON.stringify(cartItems));
}

function totalCost(food, action) {
    let cart = localStorage.getItem("totalCost");

    if (action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - food.foodPrice);
    } else if (cart != null) {

        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + food.foodPrice);

    } else {
        localStorage.setItem("totalCost", food.foodPrice);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('foodsInCart');
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let foodContainer = document.querySelector('.foods');

    if (cartItems && foodContainer) {
        foodContainer.innerHTML = '';
        Object.values(cartItems).map((key,  value) => {
            foodContainer.innerHTML +=
                `<div class="food"><ion-icon foodName="close-circle"></ion-icon><img src= "Images/ ' + value.foodImage.toString() + ' ">
                <span class="sm-hide">${value.foodName}</span>
            </div>
            <div class="foodPrice sm-hide">$${value.foodPrice},00</div>
            <div class="quantity">
                <ion-icon class="decrease " foodName="arrow-dropleft-circle"></ion-icon>
                    <span>${value.inCart}</span>
                <ion-icon class="increase" foodName="arrow-dropright-circle"></ion-icon>   
            </div>
            <div class="total">$${value.inCart * value.foodPrice},00</div>`;
        });

        foodContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total</h4>
                <h4 class="basketTotal">$${cart},00</h4>
            </div>`

        deleteButtons();
        manageQuantity();
    }
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentfood = '';
    let cartItems = localStorage.getItem('foodsInCart');
    cartItems = JSON.parse(cartItems);

    for (let i = 0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentfood = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g, '').trim();
            console.log(currentfood);

            if (cartItems[currentfood].inCart > 1) {
                cartItems[currentfood].inCart -= 1;
                cartNumbers(cartItems[currentfood], "decrease");
                totalCost(cartItems[currentfood], "decrease");
                localStorage.setItem('foodsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentfood = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g, '').trim();
            console.log(currentfood);

            cartItems[currentfood].inCart += 1;
            cartNumbers(cartItems[currentfood]);
            totalCost(cartItems[currentfood]);
            localStorage.setItem('foodsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.food ion-icon');
    let foodNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('foodsInCart');
    cartItems = JSON.parse(cartItems);
    let foodName;
    console.log(cartItems);

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            foodName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g, '').trim();

            localStorage.setItem('cartNumbers', foodNumbers - cartItems[foodName].inCart);
            localStorage.setItem('totalCost', cartCost - (cartItems[foodName].foodPrice * cartItems[foodName].inCart));

            delete cartItems[foodName];
            localStorage.setItem('foodsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}

onLoadCartNumbers();
displayCart();

for(let i=0; i< carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(foods[i]);
        totalCost(foods[i]);
    });
}

function onLoadCartNumbers() {
    let foodNumbers = localStorage.getItem('cartNumbers');
    if( foodNumbers ) {
        document.querySelector('.cart span').textContent = foodNumbers;
    }
}

function cartNumbers(food, action) {
    let foodNumbers = localStorage.getItem('cartNumbers');
    foodNumbers = parseInt(foodNumbers);

    let cartItems = localStorage.getItem('foodsInCart');
    cartItems = JSON.parse(cartItems);

    if( action ) {
        localStorage.setItem("cartNumbers", foodNumbers - 1);
        document.querySelector('.cart span').textContent = foodNumbers - 1;
        console.log("action running");
    } else if( foodNumbers ) {
        localStorage.setItem("cartNumbers", foodNumbers + 1);
        document.querySelector('.cart span').textContent = foodNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(food);
}

function setItems(food) {
    // let foodNumbers = localStorage.getItem('cartNumbers');
    // foodNumbers = parseInt(foodNumbers);
    let cartItems = localStorage.getItem('foodsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        let currentfood = food.foodImage; 
    
        if( cartItems[currentfood] == undefined ) {
            cartItems = {
                ...cartItems,
                [currentfood]: food
            }
        } 
        cartItems[currentfood].inCart += 1;

    } else {
        food.inCart = 1;
        cartItems = { 
            [food.foodImage]: food
        };
    }

    localStorage.setItem('foodsInCart', JSON.stringify(cartItems));
}

function totalCost( food, action ) {
    let cart = localStorage.getItem("totalCost");

    if( action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - food.foodPrice);
    } else if(cart != null) {
        
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + food.foodPrice);
    
    } else {
        localStorage.setItem("totalCost", food.foodPrice);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('foodsInCart');
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let foodContainer = document.querySelector('.foods');
    
    if( cartItems && foodContainer ) {
        foodContainer.innerHTML = '';
        Object.values(cartItems).map( (key,  value) => {
            foodContainer.innerHTML += 
            `<div class="food"><ion-icon foodName="close-circle"></ion-icon><img src= "Images/ ' + value.foodImage.toString() + ' ">
                <span class="sm-hide">${value.foodName}</span>
            </div>
            <div class="foodPrice sm-hide">$${value.foodPrice},00</div>
            <div class="quantity">
                <ion-icon class="decrease " foodName="arrow-dropleft-circle"></ion-icon>
                    <span>${value.inCart}</span>
                <ion-icon class="increase" foodName="arrow-dropright-circle"></ion-icon>   
            </div>
            <div class="total">$${value.inCart * value.foodPrice},00</div>`;
        });

        foodContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total</h4>
                <h4 class="basketTotal">$${cart},00</h4>
            </div>`

        deleteButtons();
        manageQuantity();
    }
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentfood = '';
    let cartItems = localStorage.getItem('foodsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentfood = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentfood);

            if( cartItems[currentfood].inCart > 1 ) {
                cartItems[currentfood].inCart -= 1;
                cartNumbers(cartItems[currentfood], "decrease");
                totalCost(cartItems[currentfood], "decrease");
                localStorage.setItem('foodsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentfood = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentfood);

            cartItems[currentfood].inCart += 1;
            cartNumbers(cartItems[currentfood]);
            totalCost(cartItems[currentfood]);
            localStorage.setItem('foodsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.food ion-icon');
    let foodNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('foodsInCart');
    cartItems = JSON.parse(cartItems);
    let foodName;
    console.log(cartItems);

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            foodName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
            localStorage.setItem('cartNumbers', foodNumbers - cartItems[foodName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[foodName].foodPrice * cartItems[foodName].inCart));

            delete cartItems[foodName];
            localStorage.setItem('foodsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}

onLoadCartNumbers();
displayCart();
