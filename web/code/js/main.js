//Packages required
const express = require('express');
const path = require('path');
const axios = require('axios');

//URL of api
let url = `https://api.henrikdev.xyz/valorant/`;

//Setting up the application
const app = express();
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static('js'));

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
})

app.get('/', (request, response) => {
    response.render('index');
});

app.post('/', async(request, response) => {
    let obj = request.body;
    let player = await requestAccount(url, obj.user, obj.tag);
    let data = await getAllData(url, obj.user, obj.tag);
    let allData = [player, data];
    response.send(JSON.stringify({"player" : allData}));
});

//Extra variables needed for more precise data
let version = 'v3';
let mode = 'matches';
let region = 'na';
let size = 2;

async function getAllData(url, user, tag){
    let data = await requestAccount(url, user, tag);
    let moreData = await requestMatches(url, version, mode, region, data.data.puuid, size);
    return moreData;
}

async function requestAccount(url, user, tag){
    let res = await axios({
        url: url+`v1/account/${user}/${tag}`,
        method: 'get',
        timeout: 8000,
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (res.status === 200){
        return res.data;
    }
    else{
        return res.status;
    }
}

async function requestMatches(url, version, mode, region, puuid, size){
    let res = await axios({
        url: url+`${version}/by-puuid/${mode}/${region}/${puuid}?size=${size}`,
        method: 'get',
        timeout: 8000,
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (res.status === 200){
        return res.data;
    }
    else{
        return res.status;
    }
}
