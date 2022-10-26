let btn = document.querySelector('button');
let user;
let tag;
let url;
let ajxReq;
let player;

btn.addEventListener('click', (event) => {
    event.preventDefault();
    user = document.getElementById('user').value;
    tag = document.getElementById('tag').value;
    console.log('user: ' + user + ' - tag: ' + tag);
    url = `https://api.henrikdev.xyz/valorant/v1/account/${user}/${tag}`
    console.log(url);
    player = requestAccount(url);
});

function requestAccount(url){
    ajxReq = $.ajax(url, {
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

