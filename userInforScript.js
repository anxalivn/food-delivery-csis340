'user strict';

const api_users_url = 'https://sfxz3aprr7.execute-api.us-east-1.amazonaws.com/Finish1/getuserinformation';
async function getData() {
  const response = await fetch (api_users_url, {mode: 'cors'});
  const users = await response.json();
  console.log(users);
}

getData();