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

app.use(express.static(path.join(__dirname, 'public')));

// send js file to client
app.get("/frontend.js", (req, res) => {
    res.sendFile(path.join(__dirname, 'js', '../frontend.js'));
});

app.get("/main.js", (req, res) => {
    res.sendFile(path.join(__dirname, 'js', '../main.js'));
});

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
})

app.get('/', (request, response) => {
    response.render('index');
});

let once = true;
app.post('/', async(request, response) => {
    let obj = request.body;
    let content = await requestContent(once);
    let player = await requestAccount(url, obj.user, obj.tag);
    let data = await getAllData(url, obj.user, obj.tag);
    let allData = [player, data, content];
    response.send(JSON.stringify({"player" : allData}));
});

//Extra variables needed for more precise data
let version = 'v3';
let mode = 'matches';
let region = 'na';

async function getAllData(url, user, tag){
    let data = await requestAccount(url, user, tag);
    let moreData = await requestMatches(url, version, mode, region, data.data.puuid);
    let mmr = await requestMMR(url, "v2", "mmr", region, data.data.puuid);
    let allData = { "data" : [moreData, mmr] }
    return allData;
}

async function apiFetch(url) {
    let res = await axios({
        url: url,
        method: 'get',
        timeout: 10000,
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

async function requestContent(once){
    return await apiFetch(url+`v1/content?locale=en-US`);
}

async function requestAccount(url, user, tag){
    return await apiFetch(url+`v1/account/${user}/${tag}`)
}

async function requestMatches(url, version, mode, region, puuid, size){
    return await apiFetch(url+`${version}/by-puuid/${mode}/${region}/${puuid}?size=${size}`);
}

async function requestMMR(url, version, mode, region, puuid){
    return await apiFetch(url+`${version}/by-puuid/${mode}/${region}/${puuid}`);
}
