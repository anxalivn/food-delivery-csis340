
var foods;
//Update Cart;
var jsons = new Array();

$(document).ready(function () {
    $.getJSON('https://sfxz3aprr7.execute-api.us-east-1.amazonaws.com/Finish1/getmenuinformation', function (foods) {
        var foodData = '';
        var x = 0;
        $.each(foods, function (key, value) {

            foodData += '<tr>';
            foodData += '<td>' + value.foodName + '</td>';
            foodData += '<td>' + value.foodDescription + '</td>';
            foodData += '<td>' + value.foodPrice + '</td>';
            foodData += '<td> <div class="img-container"> <img src="Images/' + value.foodImage + ' "alt="" border=3 height=100 width=100 class="img" /> <a id="id_1" value=' + x + ' class="fa fa-shopping-cart" href = "#"   ></a> </div></td>';
            foodData += '</tr>';
            x++;
        });
        $('#foodMenu').append(foodData);

        let carts = document.querySelectorAll('.fa');


        console.log(foods);
        for (let i = 0; i < carts.length; i++) {
            carts[i].addEventListener('click', () => {
                console.log(i);
                console.log(foods[i]);
                addFood(foods[i]);
            });
        }
        
    })
})


function addFood(food){
    jsons.push(food);
    console.log(jsons)
    sessionStorage.setItem("cartItems",JSON.stringify(jsons));
    console.log(sessionStorage.getItem("cartItems"))
    alert(food.foodName + " is added into your cart");
}


