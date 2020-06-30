'user strict';
const Url = 'https://sfxz3aprr7.execute-api.us-east-1.amazonaws.com/Finish1/changeuserinfor';
itemInCart = JSON.parse(sessionStorage.getItem("cartItems"));

$(document).ready(function () {
    displayCart();
},


    function checkOut() {
        let cusName = document.getElementById("cusName").value;
        let cusAddr = document.getElementById("cusAddr").value;
        let cusCity = document.getElementById("cusCity").value;
        let cusState = document.getElementById("cusState").value;
        let cusZipcode = document.getElementById("cusZipcode").value;
        let cusNote = document.getElementById("deliveryNote").value;
        let paymentMethod = '';
        if (document.getElementById('paymentOption').checked) {
            paymentMethod = "Cash";
        }
        else {
            paymentMethod = "Card";
        }

    })

function displayCart() {
    var total = 0;
    itemInCart.forEach(function (arrayItem) {
        console.log(arrayItem.foodName);
        total += parseFloat(arrayItem.foodPrice);
        var theDiv = document.getElementById("cartContent");
        var content = '';
        content += ' <div class="foods">';
        content += '<h4 class="food-title">' + arrayItem.foodName + '</h4>';
        content += '<h4 class="foodPrice sm-hide">' + arrayItem.foodPrice + '</h4>';
        content += '</div>';
        theDiv.innerHTML += content;
    });
    var theDiv = document.getElementById("cartContent");
    theDiv.innerHTML += '<button onclick="clearOrder();"> <h3>Clear Entire Order</h3> </button>';
    var theDiv1 = document.getElementById("totalPrice");
    theDiv1.innerHTML += '<h2> Total: $' + total + '</h2>';
}

function clearOrder() {
    var jsons = new Array();
    sessionStorage.setItem("cartItems", JSON.stringify(jsons));
    var theDiv = document.getElementById("cartContent");
    var content = '';
    content += ' <div class="food-header">';
    content += '<h3 class="food-title">PRODUCT</h3>';
    content += '<h3 class="foodPrice sm-hide">PRICE</h3>';
    content += '</div>';
    theDiv.innerHTML = content;
    theDiv.innerHTML += '<button onclick="clearOrder();"> <h3>Clear Entire Order</h3> </button>';
}