let btn = document.querySelector('button');
console.log(btn);

let user;
let tag;
let players = [];

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
});

/**
 * Requests data
 * @param {String} url 
 * @param {Object} body 
 */
function sendData(url, body){
    fetch(url, {
        method : 'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body : JSON.stringify(body)
    })
        .then((res) => {
            console.log(res);
            return res.json();
        })
        .then((data) => {
            console.log("dataaaa", data);
            let bannerSrc = data.player[0].data.card.large;
            generateBanner(bannerSrc);
            players.push(data);
            console.log(players);
        })
        .catch((err) => {
            console.log(err);
        })
}

function generateBanner(src){
    let body = document.querySelector('body');
    let banner = document.createElement('img');
    banner.src = src;
    body.appendChild(banner);
}