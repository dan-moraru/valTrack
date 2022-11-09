//const axios = require('axios');
//const BrowserWindow = require('electron');
const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
//const methodOverride = require('method-override');

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//app.use(methodOverride("_method"));

app.use(express.static('js'));

/*let mainWindow;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
});*/

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
})

app.get('/', (request, response) => {
    response.render('index');
});

app.post('/', (request, response) => {
    //console.log(request.body);
    let obj = request.body;
    let data = requestAccount(obj.user, obj.tag);
    console.log("did it work", data);
    response.send(JSON.stringify({"player" : data}));
    
    
    //console.log("player: ", player);
    //response.render('index', {});

});


function requestAccount(user, tag){
    //console.log(user, tag);
    let data =
    axios.get(`https://api.henrikdev.xyz/valorant/v1/account/${user}/${tag}`)
    .then(res => {
        //console.log(res.data); //Or just result for all data
        //console.log(res.data.data.puuid);

        data.then(res => {
            console.log("promise", res);
            return res;
        });

        return res.data.data;
        //return res.json();
        //response.send(result.data);
    })
    .catch(error => {
        console.log("error");

    });
    return data;
}

//let btn; //= document.querySelector('button');
//let user; //= 'radish';
//let tag; //= 'NA11';
let ajxReq;
//let player;

let version = 'v3';
let mode = 'matches';
let region = 'na';
let size = 2;
let puuid;

//requestAccount(user, tag);
/*
btn.addEventListener('click', (event) => {
    event.preventDefault();
    //user = document.getElementById('user').value;
    //tag = document.getElementById('tag').value;
    console.log('user: ' + user + ' - tag: ' + tag);
     
    requestAccount(user, tag);
    console.log(player);
    
    
    setTimeout(function() {
        console.log(player.data.puuid);
        requestMatches(player.data.puuid);
    }, 2000);
    

});*/

/*
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
/*
function requestAccount(){
    ajxReq = $.ajax(`https://api.henrikdev.xyz/valorant/v1/account/${user}/${tag}`, {
        contentType : 'application/json',
        dataType : 'json',
        timeout : 5000,
        
        success: function (data, status){
            console.log('worked');
            console.log(data);
            console.log(status);
            player = data;
        },

        error: function (textStatus, errorMessage){
            console.log('error');
            console.log(textStatus);
            console.log(errorMessage);
        }
    });
}

function requestMatches(puuid){
    ajxReq = $.ajax(`https://api.henrikdev.xyz/valorant/${version}/by-puuid/${mode}/${region}/${puuid}?size=${size}`, {
        contentType : 'application/json',
        dataType : 'json',
        timeout : 5000,
        
        success: function (data, status){
            console.log('worked');
            console.log(data);
            console.log(status);
        },

        error: function (textStatus, errorMessage){
            console.log('error');
            console.log(textStatus);
            console.log(errorMessage);
        }
    });
}

/*
function getCrosshair(id){
    ajxReq = $.ajax(`https://api.henrikdev.xyz/valorant/v1/crosshair/generate?id=${id}`, {
        contentType : 'application/json',
        dataType : 'json',
        timeout : 5000,
        
        success: function (data, status){
            console.log('worked');
            console.log(data);
            console.log(status);
        },

        error: function (textStatus, errorMessage){
            console.log('error');
            console.log(textStatus);
            console.log(errorMessage);
        }
    });
}
*/