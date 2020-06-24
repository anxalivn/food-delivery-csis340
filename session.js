let username = sessionStorage.getItem("username");
let point = sessionStorage.getItem("point");

window.onload = function() {
    getPoint();
    function getPoint(){
        document.getElementById('userInfo').innerHTML = 'Hello ' + username;
        document.getElementById('userPoint').innerHTML = 'You point is: ' + point;
    };
}


function getChange(){

    let newPass = document.getElementById("psw1").value;
    let confirmPass = document.getElementById("psw2").value;
    let newAddr = document.getElementById("newAddress").value;
    let newCity = document.getElementById("newCity").value;
    let newState = document.getElementById("newState").value;
    let newZipcode = document.getElementById("newZipcode").value;
    
    if(newPass !== null && newPass !== '' && confirmPass !== null && confirmPass !== '') {
        console.log(newPass);
        console.log(confirmPass);
     }
     
     console.log(newAddr);
     console.log(newCity);
     console.log(newState);
     console.log(newZipcode);

}
