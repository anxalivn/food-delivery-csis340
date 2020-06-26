const Url = 'https://sfxz3aprr7.execute-api.us-east-1.amazonaws.com/Finish1/changeuserinfor';
function signup() {
    var userinput = document.getElementById("username").value;
    var passinput = document.getElementById("password").value;
    var addressinput = document.getElementById("address").value;
    var cityinput = document.getElementById("city").value;
    var stateinput = document.getElementById("state").value;
    var zipinput = document.getElementById("zip").value;
    var newUserStatus = false;

    if (userinput !== null && userinput !== '' && passinput !== null && passinput !== '' && addressinput !== null && addressinput !== '' && cityinput !== null && cityinput !== '' && stateinput !== null && stateinput !== '' && zipinput !== null && zipinput !== '') {
        newUserStatus = true;
    }
    const data =
    {
        "newUserStatus": newUserStatus,
        "username": userinput,
        "userPassword": passinput,
        "userAddress": addressinput,
        "userCity": cityinput,
        "userState": stateinput,
        "userZipcode": zipinput
    }

    if (newUserStatus == true) {
        $.ajax({
            url: Url,
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            success: function () {
                alert("New accounnt has been created");
            },
            error: function () {
                alert("New accounnt has been created");
            }
        });

        document.getElementById('username').innerHTML = '';
        document.getElementById('password').innerHTML = '';
        document.getElementById('address').innerHTML = '';
        document.getElementById('city').innerHTML = '';
        document.getElementById('state').innerHTML = '';
        document.getElementById('zip').innerHTML = '';
    }
    else {
        alert("Can't create account. Please fill out completely everything");
    }

}