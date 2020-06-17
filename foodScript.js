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
            foodData += '<td><br> <div class="img-container"> ><img src="Images/'+value.foodImage + ' "alt="" border=3 height=100 width=100 />+ <button class="bag-btn" data-id="1"> <i class="fa fa-shopping-cart"></i>Add to bag</button></div></td>';
            foodData += '</tr>';
        });
        $('#foodMenu').append(foodData);
    });
});
function sortResults(prop, asc) {
    foods.sort(function(a, b) {
        if (asc) {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
    renderResults();
}


