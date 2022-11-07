const axios = require('axios');

function requestAccount(user, tag){
    axios.get(`https://api.henrikdev.xyz/valorant/v1/account/${user}/${tag}`)
    .then(result => {
        console.log(result.data); //Or just result for all data
        player = data;
    })
    .catch(error => {
        console.log(error);
    });
}



/*
const https = require('https');

https.get('https://api.henrikdev.xyz/valorant/v1/account/radish/NA11', (response) => {
    let data = '';
    response.on('data', (chunk) => {
        data += chunk;
    });

    response.on('end', () => {
        console.log(data);
    })
})
.on('error', (error) => {
    console.log(error);
});
*/