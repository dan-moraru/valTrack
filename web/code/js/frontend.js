let btn = document.querySelector('button');

let user;
let tag;
let players = [];
let content = [];

btn.addEventListener('click', (event) => {
    event.preventDefault();
    user = document.getElementById('user').value;
    tag = document.getElementById('tag').value;
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
            let puuid = data.player[0].data.puuid;
            let lvl = data.player[0].data.account_level;

            let contentData = data.player[2];
            if (content.length > 0){
                content.pop();
            }
            content.push(contentData);
            console.log(content);
            let valTitles = content[0].playerTitles;

            let bannerSrc = data.player[0].data.card.large;
            let allPlayers = data.player[1].data[0].data[0].players.all_players;
            generateBanner(bannerSrc, allPlayers, puuid);

            let titleId = getTitleId(allPlayers, puuid);
            let title = getTitleName(titleId, valTitles);

            let currentRankSRC = data.player[1].data[1].data.current_data.images.large;
            let elo = data.player[1].data[1].data.current_data.elo;
            let allMatches = data.player[1].data[0].data;
            generateStats(allMatches, currentRankSRC, lvl, elo, title, puuid);

            players.push(data);
            console.log(players);
        })
        .catch((err) => {
            console.log(err);
        })
}

function getTitleId(allPlayers, puuid){
    let titleId = '';
    for (let obj of allPlayers){
        if (puuid === obj.puuid){
            titleId = obj.player_title;
        }
    }
    return titleId;
}

function getTitleName(titleId, valTitles){
    for (let title of valTitles){
        if (titleId === title.id.toLowerCase()){
            let titleName = title.name.replace(' Title', '');
            return titleName;
        }
    }
    return `Not Found`;
}

function generateStats(allMatches, currentRankSRC, lvl, elo, title, puuid){
    let totalShots = 0;
    let totalHeadshots = 0;
    let totalDeaths = 0;
    let totalKills = 0;
    let totalAssists = 0;
    for (let matches of allMatches){
        let allPlayers = matches.players.all_players;
        for (let player of allPlayers){
            if (puuid === player.puuid){
                totalShots += player.stats.bodyshots + player.stats.headshots + player.stats.legshots;
                totalHeadshots += player.stats.headshots;
                totalDeaths += player.stats.deaths;
                totalKills += player.stats.kills;
                totalAssists += player.stats.assists;
            }
        }
    }
    console.log(`Past 10 games = Total shots: ${totalShots}, total Headshots: ${totalHeadshots}, total Deaths: ${totalDeaths}, total Kills: ${totalKills}`);
    let kda = ((totalKills + totalAssists)/totalDeaths).toFixed(2);
    let headShotsAccur = ((totalHeadshots/totalShots)*100).toFixed(0);
    console.log(`Past 10 games = KDA: ${kda}, Headshot Accuracy: ${headShotsAccur}%`);

    let rankParent = document.querySelector('#rank_section');
    if (rankParent.firstChild){
        let rankImg = document.querySelector('#rank_img');
        rankParent.removeChild(rankImg);
    }
    let rankImg = document.createElement('img');
    rankImg.src = currentRankSRC;
    rankImg.id = "rank_img";
    rankParent.appendChild(rankImg);

    let list = document.querySelector('#stats_list');
    let child = list.lastElementChild;
    while (child) {
        list.removeChild(child);
        child = list.lastElementChild;
    }
    let playerTitle = document.createElement('li');
    playerTitle.textContent = `player title: ${title}`;
    let accLvl = document.createElement('li');
    accLvl.textContent = `account level: ${lvl}`;
    let eloNum = document.createElement('li');
    eloNum.textContent = `elo: ${elo}`;
    let kdaLi = document.createElement('li');
    kdaLi.textContent = `kda: ${kda}`;
    let headShotsAccurli = document.createElement('li');
    headShotsAccurli.textContent = `headShotsAccur: ${headShotsAccur}%`;
    let otherLi = document.createElement('li');
    otherLi.textContent = `Total shots: ${totalShots}, total Headshots: ${totalHeadshots}, total Deaths: ${totalDeaths}, total Kills: ${totalKills}`;
    list.appendChild(kdaLi);
    list.appendChild(headShotsAccurli);
    list.appendChild(otherLi);
    list.appendChild(accLvl);
    list.appendChild(eloNum);
    list.appendChild(playerTitle);
}

function generateBanner(src, allPlayers, puuid){
    let parent = document.querySelector('#card_section');
    if (parent.firstChild){
        let card = document.querySelector('#card_img');
        let player = document.querySelector('#agent_img');
        parent.removeChild(card);
        parent.removeChild(player);
    }
    let banner = document.createElement('img');
    banner.id = "card_img";
    banner.src = src;
    parent.appendChild(banner);
    for (let obj of allPlayers){
        if (puuid === obj.puuid){
            let agentSrc = obj.assets.agent.full;
            let agent = document.createElement('img');
            agent.id = "agent_img";
            agent.src = agentSrc;
            parent.appendChild(agent);
        }
    }
}