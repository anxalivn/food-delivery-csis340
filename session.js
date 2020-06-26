let username = sessionStorage.getItem("username");
let point = sessionStorage.getItem("point");
let id = sessionStorage.getItem("userid");


window.onload = function () {
    getPoint();
    function getPoint() {
        document.getElementById('userInfo').innerHTML = 'Hello ' + username;
        document.getElementById('userPoint').innerHTML = 'You point is: ' + point;
    };
}


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
