const axios = require('axios');

let btn = document.querySelector('button');
console.log(btn);

let user; //= 'radish';
let tag; //= 'NA11';
let player;

btn.addEventListener('click', (event) => {
    event.preventDefault();
    user = document.getElementById('user').value;
    tag = document.getElementById('tag').value;
    console.log('user: ' + user + ' - tag: ' + tag);
     
    requestAccount(user, tag);
    console.log(player);
    
    /*
    setTimeout(function() {
        console.log(player.data.puuid);
        requestMatches(player.data.puuid);
    }, 2000);*/
    
});

function requestAccount(user, tag){
    //console.log(user, tag);
    axios.get(`https://api.henrikdev.xyz/valorant/v1/account/${user}/${tag}`)
    .then(result => {
        console.log(result.data); //Or just result for all data
        //player = data;
    })
    .catch(error => {
        console.log(error);
    });
}