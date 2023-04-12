const options = ["scissors", "paper", "rock", "spock", "lizard"];
const bgColor =   {
        "scissors":"hsl(39, 89%, 49%):hsl(40, 84%, 53%)",
        "paper":"hsl(230, 89%, 62%):hsl(230, 89%, 65%)", 
        "rock":"hsl(349, 71%, 52%):hsl(349, 70%, 56%)", 
        "spock":"hsl(189, 59%, 53%):hsl(189, 58%, 57%)", 
        "lizard":"hsl(261, 73%, 60%):hsl(261, 72%, 63%)"
}


const ruleP1Wins = [
    {
        "p1":"scissors",
        "p2":"paper",
    },
    {
        "p1":"paper",
        "p2":"rock",
    },
    {
        "p1":"rock",
        "p2":"lizard",
    },
    {
        "p1":"lizard",
        "p2":"spock",
    },
    {
        "p1":"spock",
        "p2":"scissors",
    },
    {
        "p1":"scissors",
        "p2":"lizard",
    },
    {
        "p1":"lizard",
        "p2":"paper",
    },
    {
        "p1":"paper",
        "p2":"spock",
    },
    {
        "p1":"spock",
        "p2":"rock",
    },
    {
        "p1":"rock",
        "p2":"scissors",
    }
];

var loading = "";
var dr = "";
var loadingOuter = document.getElementsByClassName("loading-outer")[0];
var loading1 = document.createElement("div");
var loading2 = document.createElement("div");
var loading3 = document.createElement("div");

loading1.innerHTML = ".";
loading2.innerHTML = ".";
loading3.innerHTML = ".";

loading1.setAttribute("class", "loading");
loading1.setAttribute("id", "loading1");

loading2.setAttribute("class", "loading");
loading2.setAttribute("id", "loading2");

loading3.setAttribute("class", "loading");
loading3.setAttribute("id", "loading3");

loadingOuter.appendChild(loading1);
loadingOuter.appendChild(loading2);
loadingOuter.appendChild(loading3);

var loadingTimeOut1 = "";
var loadingTimeOut2 = "";
var loadingTimeOut3 = "";

function openRules(){
    var rules = document.querySelector("#rules-content");
    rules.style.visibility = 'visible';
}

function closeRules(){
    var rules = document.querySelector("#rules-content");
    rules.style.visibility = 'hidden';
}

function userInput(id, background){
    // navigate to picked page    
    let colorDefault = "hsl(229, 25%, 31%)";
    loading1.style.color = colorDefault;
    loading2.style.color = colorDefault;
    loading3.style.color = colorDefault;

    let bg = background.split(":")
    var computerInput = Math.floor(Math.random() * 5);
    computerInput = options[computerInput];
    if(computerInput === id){
        msg = "DRAW MATCH";
    }
    else{
        msg = "YOU LOSE"
    }
    ruleP1Wins.forEach(input => {
        userwins = input.p1 === id ? (input.p2 === computerInput? 1 : 0): 0;
        if(userwins){
            msg = "YOU WIN"
        }
    });
    this.updateYouPicked(id, bg, computerInput)
    document.getElementsByClassName("game-result")[0].innerHTML = msg;
    document.getElementsByClassName("play-ground")[0].style.visibility = "hidden";
}

function updateYouPicked(id, bg, computerInput){   
    let outer = document.getElementById('you-picked-outer');
    let picked = document.getElementById(id).getAttribute("src");
    document.getElementById("you-picked").setAttribute("src", picked);
    outer.style.backgroundImage = "radial-gradient("+bg[0]+", "+bg[1]+")";
    document.getElementsByClassName("piked")[0].style.visibility = "visible";
    document.getElementsByClassName("game-buttons-inner-house-picked")[0].style.backgroundColor = "hsl(237, 49%, 15%)";
    loading = setInterval(loadingInterals, 200);
    setTimeout(updateHousePicked,2000, computerInput)
}

function updateHousePicked(id){
    document.querySelector("#house-picked-outer").style.boxShadow = "inset 0px -10px 0px 0px rgba(0, 0, 0, 0.311)";
    document.querySelector(".game-buttons-inner-house-picked").style.boxShadow = "inset 0px 10px 0px 0px rgb(221, 226, 230)";
    document.getElementsByClassName("game-buttons-inner-house-picked")[0].style.backgroundColor = "white";
    let outer = document.getElementById('house-picked-outer');
    let picked = document.getElementById(id).getAttribute("src");
    let housePicTab = document.getElementsByClassName("game-buttons-inner-house-picked")[0];
    let HousePic = document.createElement("img");
    HousePic.setAttribute("alt", "house-picked");
    HousePic.setAttribute("id", "house-picked");
    HousePic.setAttribute("class", "game-image");
    document.getElementsByClassName("game-buttons-inner-house-picked")[0].innerHTML = "";
    housePicTab.appendChild(HousePic);
    document.getElementById("house-picked").setAttribute("src", picked);
    document.getElementById("house-picked").visibility = "visible";
    let bg = bgColor[id];
    bg = bg.split(":");
    outer.style.backgroundImage = "radial-gradient("+bg[0]+", "+bg[1]+")";
    clearInterval(loading);
    setTimeout(declareResult, 1000);
}

function declareResult(){
    msg = document.getElementsByClassName("game-result")[0].innerHTML;
    var score = parseFloat(document.getElementsByClassName("score-point")[0].innerHTML);
    if(msg == "YOU WIN"){
        score += 1;
        document.getElementById("you-picked-outer").style.boxShadow = "inset 0px -10px 0px 0px rgba(0, 0, 0, 0.311), 0 0 0 80px #ffffff11, 0 0 0 160px #ffffff0c, 0 0 0 240px #ffffff04";
    }
    else if(msg == "YOU LOSE"){
        score -= 1;
        document.getElementById("house-picked-outer").style.boxShadow = "inset 0px -10px 0px 0px rgba(0, 0, 0, 0.311), 0 0 0 80px #ffffff11, 0 0 0 160px #ffffff0c, 0 0 0 240px #ffffff04";
    }
    document.getElementsByClassName("score-point")[0].innerHTML = score;
    document.getElementsByClassName("result-group")[0].style.display = "grid";

}

function playAgain(){
    document.getElementsByClassName("piked")[0].style.visibility = "hidden";
    document.getElementsByClassName("play-ground")[0].style.visibility = "visible";
    document.getElementById("house-picked").visibility = "hidden";
    document.getElementById('house-picked-outer').style.backgroundImage = "none";
    document.getElementById("house-picked").setAttribute("src", "#");
    document.getElementsByClassName("result-group")[0].style.display = "none";
    document.querySelector("#house-picked-outer").style.boxShadow = "none";
    document.querySelector(".game-buttons-inner-house-picked").style.boxShadow = "none";
    document.getElementsByClassName("game-buttons-inner-house-picked")[0].innerHTML = "";
    document.getElementsByClassName("game-buttons-inner-house-picked")[0].appendChild(loadingOuter);
    document.getElementById("you-picked-outer").style.boxShadow = "inset 0px -10px 0px 0px rgba(0, 0, 0, 0.311)";
}

// loader functions
function loadingInterals() {
    let color = "hsl(217, 16%, 45%)";
    loadingTimeOut1 = setTimeout(loadingMotion, 500, loading1, color);
    loadingTimeOut2 = setTimeout(loadingMotion, 1000, loading2, color);
    loadingTimeOut3 = setTimeout(loadingMotion, 1500, loading3,color);
}

function loadingMotion(loading, color) {
    loading.style.color = color;
}
