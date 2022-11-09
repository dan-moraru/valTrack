let btn = document.querySelector('button');
console.log(btn);

let user; //= 'radish';
let tag; //= 'NA11';
//let player;

btn.addEventListener('click', (event) => {
    event.preventDefault();
    user = document.getElementById('user').value;
    tag = document.getElementById('tag').value;
    console.log('user: ' + user + ' - tag: ' + tag);
    let body = {
        user: `${user}`,
        tag: `${tag}`
    }
    sendData("/", body);
    
    
    /*
    setTimeout(function() {
        console.log(player.data.puuid);
        requestMatches(player.data.puuid);
    }, 2000);*/
    
});


function sendData(url, body){
    fetch(url, {
        method : 'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body : JSON.stringify(body)
    })
        .then((res) => {
            console.log(res);
            return res;
        })
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        })
}

