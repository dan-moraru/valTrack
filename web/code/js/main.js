let btn = document.querySelector('button');
let user;
let tag;
let ajxReq;
let player;

let version = 'v3';
let mode = 'matches';
let region = 'na';
let size = 2;
let puuid;

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