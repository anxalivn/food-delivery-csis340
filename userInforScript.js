'user strict';

const api_users_url = 'https://sfxz3aprr7.execute-api.us-east-1.amazonaws.com/Finish1/getuserinformation';
async function getData() {
  const response = await fetch (api_users_url, {mode: 'cors'});
  const users = await response.json();
  console.log(users);
}


function validate(){
  $(document).ready(function () {
    $.getJSON(api_users_url, function (users) {
      var valid = false;
      var userinput = document.getElementById("username").value;
      var passinput = document.getElementById("password").value;
        $.each(users, function (key, value) {
          if ( userinput == value.userName && passinput == value.userPassword){
            valid = true;
            sessionStorage.setItem('username',value.userName)
            sessionStorage.setItem('point',value.userPoint)
            sessionStorage.setItem('userid',value.userID)

          }
        });
        if (valid == true){
          alert ("Login successfully");
          window.location = "menu.html";
          return false;
        }
        else{
          alert("Login unsuccessfully");
        }
    });
  });
};