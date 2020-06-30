'user strict';
const Url = 'https://sfxz3aprr7.execute-api.us-east-1.amazonaws.com/Finish1/changeuserinfor';
itemInCart = JSON.parse(sessionStorage.getItem("cartItems"));
let id = sessionStorage.getItem("userid");
function checkOut() {
    var checkoutStatus = false;
    let cusName = document.getElementById("cusName").value;
    let cusAddr = document.getElementById("cusAddr").value;
    let cusCity = document.getElementById("cusCity").value;
    let cusState = document.getElementById("cusState").value;
    let cusZipcode = document.getElementById("cusZipcode").value;
    let cusNote = document.getElementById("deliveryNote").value;
    if (cusName !== null && cusName !== '' && cusAddr !== null && cusAddr !== '' && cusCity !== null && cusCity !== '' && cusState !== null && cusState !== '' && cusZipcode !== null && cusZipcode !== '') {
        const rbs = document.querySelectorAll('input[name="selectTime"]');
        let selectedValue;
        for (const rb of rbs) {
            if (rb.checked) {
                selectedValue = rb.value;
                break;
            }
        }

        var total = 0;
        var foodList = '';
        var ct = 0;
        itemInCart.forEach(function (arrayItem) {
            total += parseFloat(arrayItem.foodPrice);
            if (ct == 0) {
                foodList += arrayItem.foodName;
            }
            else {
                foodList += ", " + arrayItem.foodName;
            }
            ct++;
        });
        if (sessionStorage.getItem("point") > 300) {
            discount = 0.1;
        }
        else {
            discount = 0;
        }
        var totalPrice = total - (total * discount);
        totalPrice = Math.round(totalPrice * 100) / 100
        let paymentMethod = '';
        if (document.getElementById('paymentOption').checked) {
            paymentMethod = "Cash";
        }
        else {
            paymentMethod = "Card";
        }
        checkoutStatus = true;


        const data =
        {
            "checkoutStatus": checkoutStatus,
            "accountID": id,
            "cusName": cusName,
            "cusAddr": cusAddr,
            "cusCity": cusCity,
            "cusState": cusState,
            "cusZipcode": cusZipcode,
            "cusNote": cusNote,
            "timeDeliver": selectedValue,
            "totalPrice": totalPrice,
            "paymentMethod": paymentMethod,
            "foodList": foodList,
        }

        if (checkoutStatus == true) {
            $.ajax({
                url: Url,
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json; charset=utf-8',
                success: function () {
                    alert("New order have been updated");
                },
                error: function () {
                    alert("New order have been updated");
                }
            });
            clearOrder()
        }
        else {
            alert("Can't update inormation. Please fill out completely your new address or make sure your new passowrd match with the cofirm password");
        }
    }
    else {
        alert("Please fill out all of the information")
    }
};

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
};

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
    var discount
    if (sessionStorage.getItem("point") > 300) {
        discount = 0.1;
    }
    else {
        discount = 0;
    }
    var totalPrice = total - (total * discount);
    totalPrice = Math.round(totalPrice * 100) / 100
    theDiv1.innerHTML += '<h2> Discount: ' + discount * 100 + '%</h2>';
    theDiv1.innerHTML += '<h2> Total: $' + totalPrice + '</h2>';
}

$(document).ready(function () {
    displayCart();
})



