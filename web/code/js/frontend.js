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
            console.log(data);
            //console.log(data[0].data.card.large);
            //generateBanner(data);
            players.push(data);
            console.log(players);
        })
        .catch((err) => {
            console.log(err);
        })
}

function generateBanner(data){
    let banner = data[0].data.card.large;
    console.log(banner);
}