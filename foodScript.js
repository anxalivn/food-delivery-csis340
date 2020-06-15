'user strict';

const api_foods_url = 'https://sfxz3aprr7.execute-api.us-east-1.amazonaws.com/Finish1/getmenuinformation';
async function getData() {
  const response = await fetch (api_foods_url, {mode: 'cors'});
  const foods = await response.json();
  console.log(foods);
}

getData();