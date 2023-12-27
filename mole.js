let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;

// TG

const Http = new XMLHttpRequest()
const url = `https://api.telegram.org/bot6480737039:AAFf475pQ3Pe2ESj1jZ1fqZxzrRIybUjKFg/sendMessage?chat_id=977619219&text=You scored ${score.toString()}`;
Http.open("GET", url);
Http.send();



window.onload = function() {
    setGame();
}

function setGame() {

    //set up the grid in html
    for (let i = 0; i < 9; i++) { //i goes from 0 to 8, stops at 9
        //<div id="0-8"></div>
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setMole, 700); // 1000 miliseconds = 1 second, every 1 second call setMole
    setInterval(setPlant, 1500); // 2000 miliseconds = 2 seconds, every 2 second call setPlant
}

function getRandomTile() {
    //math.random --> 0-1 --> (0-1) * 9 = (0-9) --> round down to (0-8) integers
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currMoleTile) {
        score += 10;
        currMoleTile.innerHTML = "";
        document.getElementById("score").innerText = score.toString(); //update score html
    }
    else if (this == currPlantTile) {
        let tg = window.Telegram.WebApp;
        let data = {score: score}
        tg.sendData(JSON.stringify(data))
        const url = `https://api.telegram.org/bot6480737039:AAFf475pQ3Pe2ESj1jZ1fqZxzrRIybUjKFg/sendMessage?chat_id=${tg.WebAppUser.id}&text=You scored ${score.toString()}`;
        Http.open("GET", url);
        Http.send();
        document.getElementById("score").innerText = "GAME OVER " +tg.initDataUnsafe.user.first_name +" :" + score.toString(); //update score html

        gameOver = true;
    }
}




