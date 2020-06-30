let username = sessionStorage.getItem("username");
let point = sessionStorage.getItem("point");
let id = sessionStorage.getItem("userid");

const orderURl = "https://sfxz3aprr7.execute-api.us-east-1.amazonaws.com/Finish1/GetOrderHistory";

window.onload = function () {
    getPoint();
    $.getJSON(orderURl, function (orders) {
        var foodData = '';
        $.each(orders, function (key, value) {
            if (value.accountID == id) {
                var time = Unix_timestamp(value.orderID,value.timeDeliver);
                foodData += '<tr>';
                foodData += '<td>' + value.orderID + '</td>';
                foodData += '<td>' + value.foodList + '</td>';
                foodData += '<td>' + value.paymentMethod + '</td>';
                foodData += '<td>' + value.cusNote + '</td>';
                foodData += '<td>' + value.totalPrice + '</td>';
                foodData += '<td>' + time + '</td>';
                foodData += '</tr>';
            }
        });
        $('#orderFoods').append(foodData);
    })
}

function Unix_timestamp(t,timeDeliver) {
    var timeAdd =  new Date(t);
    timeAdd.setTime(timeAdd.getTime() + timeDeliver*60*1000);
    var date = 	Math.floor(new Date(timeAdd).getTime()/1000.0);
    var dt = new Date(date*1000); 
    var hr = dt.getHours();
    var m = "0" + dt.getMinutes();
    var s = "0" + dt.getSeconds();
    return hr + ':' + m.substr(-2) + ':' + s.substr(-2);
}

function getPoint() {
    document.getElementById('userInfo').innerHTML = 'Hello ' + username;
    document.getElementById('userPoint').innerHTML = 'You point is: ' + point;
};

function getChange() {
    const Url = 'https://sfxz3aprr7.execute-api.us-east-1.amazonaws.com/Finish1/changeuserinfor';

    let newPass = document.getElementById("psw1").value;
    let confirmPass = document.getElementById("psw2").value;
    let newAddr = document.getElementById("newAddress").value;
    let newCity = document.getElementById("newCity").value;
    let newState = document.getElementById("newState").value;
    let newZipcode = document.getElementById("newZipcode").value;
    let passStatus = false;
    let addressStatus = false;
    if (newPass !== null && newPass !== '' && confirmPass !== null && confirmPass !== '') {
        if (newPass == confirmPass) {
            passStatus = true;
        }
    }

    if (newAddr !== null && newAddr !== '' && newCity !== null && newCity !== '' && newState !== null && newState !== '' && newZipcode !== null && newZipcode !== '') {
        addressStatus = true;
    }

    const data =
    {
        "accountID": id,
        "changePassStatus": passStatus,
        "newPassword": confirmPass,
        "changeAddressStatus": addressStatus,
        "newAddress": newAddr,
        "newCity": newCity,
        "newState": newState,
        "newZipcode": newZipcode
    }

    if (passStatus == true || addressStatus == true) {
        $.ajax({
            url: Url,
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            success: function () {
                alert("New infomraitons have been updated");
            },
            error: function () {
                alert("New infomraitons have been updated");
            }
        });
    }
    else {
        alert("Can't update inormation. Please fill out completely your new address or make sure your new passowrd match with the cofirm password");
    }

}

