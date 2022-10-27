let btn = document.querySelector('button');
let user;
let tag;
let ajxReq;
let player;

btn.addEventListener('click', (event) => {
    event.preventDefault();
    user = document.getElementById('user').value;
    tag = document.getElementById('tag').value;
    console.log('user: ' + user + ' - tag: ' + tag);
     
    player = requestAccount();
    console.log(player);

    /*requestMatches(player.puuid);

    getEverything(player);*/
});

function requestAccount(){
    ajxReq = $.ajax(`https://api.henrikdev.xyz/valorant/v1/account/${user}/${tag}`, {
        contentType : 'application/json',
        dataType : 'json',
        timeout : 5000,
        
        success: function (data, status){// success callback function
            console.log('worked');
            console.log(data);
            console.log(status);
            return data;
        },

        error: function (textStatus, errorMessage){
            console.log('error');
            console.log(textStatus);
            console.log(errorMessage);
        }
    });
}

let version = 'v3';
let mode = 'matches';
let region = 'na';
let size = 2;
/*
function requestMatches(puuid){
    ajxReq = $.ajax(`https://api.henrikdev.xyz/valorant/${version}/by-puuid/${mode}/${region}/${puuid}?size=${size}`, {
        contentType : 'application/json',
        dataType : 'json',
        timeout : 5000,
        
        success: function (data, status){// success callback function
            console.log('worked');
            console.log(data);
            console.log(status);
            return data;
        },

        error: function (textStatus, errorMessage){
            console.log('error');
            console.log(textStatus);
            console.log(errorMessage);
        }
    });
}
*/

/*
function getEverything(player){
    ajxReq = $.ajax(`https://api.henrikdev.xyz/valorant/v1/account/${user}/${tag}`, {
        contentType : 'application/json',
        dataType : 'json',
        timeout : 5000,
        
        success: function (data, status){// success callback function
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

    ajxReq = $.ajax(`https://api.henrikdev.xyz/valorant/${version}/by-puuid/${mode}/${region}/${player.puuid}?size=${size}`, {
        contentType : 'application/json',
        dataType : 'json',
        timeout : 5000,
        
        success: function (data, status){// success callback function
            console.log('worked');
            console.log(data);
            console.log(status);
            //return data;
        },

        error: function (textStatus, errorMessage){
            console.log('error');
            console.log(textStatus);
            console.log(errorMessage);
        }
    });
}*/