'user strict';

const api_foods_url = 'https://sfxz3aprr7.execute-api.us-east-1.amazonaws.com/Finish1/getmenuinformation';
async function getData() {
    const response = await fetch(api_foods_url, { mode: 'cors' });
    const foods = await response.json();
    console.log(foods);
}

getData();

$(document).ready(function () {
    $.getJSON(api_foods_url, function (foods) {
        var foodData = '';
        $.each(foods, function (key, value) {
            
            foodData += '<tr>';
            foodData += '<td>' + value.foodName + '</td>';
            foodData += '<td>' + value.foodDescription + '</td>';
            foodData += '<td>' + value.foodPrice + '</td>';
            foodData += '<td> <div class="img-container"> <img src="Images/' + value.foodImage + ' "class="image" border=3 height=100 width=100 class="img" /> <a class="add-cart" href="#">Add Cart</a>  </div></td>';
            foodData += '</tr>';
        });
        $('#foodMenu').append(foodData);
    });
});
