/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var key = 0 ;
var mainScore = [0,0];
var randNum1 = 0;
var randNum2 = 0;
var currentScore = 0;
var checkCons61 = [0,0];
var checkCons62 = [0,0];
var winScore = 50; 
var playingGame = "true";

function change(){
    playingGame = "true";
    document.querySelector('.player-'+0+'-panel').classList.toggle('active');
    document.querySelector('.player-'+1+'-panel').classList.toggle('active');
    document.querySelector('#dice-1').style.display="none";
    document.querySelector('#dice-2').style.display="none";
    currentScore = 0;
    document.querySelector('#current-'+key).textContent=0;
    key = key == 0 ? key = 1 : key = 0 ;
}

function displayDice(){
    playingGame = "true";
    document.querySelector('#dice-1').style.display="block";
    document.querySelector('#dice-1').src = 'dice-'+randNum1+'.png';
    document.querySelector('#dice-2').style.display="block";
    document.querySelector('#dice-2').src = 'dice-'+randNum2+'.png';
}

function rollFunc (){
    if (playingGame == "true"){
        randNum1 = Math.floor(Math.random() * 6) + 1;
        randNum2 = Math.floor(Math.random() * 6) + 1;
    //    randNum = 6;
        if (randNum1 == 1 || randNum2 == 1){
            change();
        }else{
            if (randNum1 == 6){
                checkCons61.splice(1,1,6);
                checkCons61.reverse();
                if (checkCons61[0]==checkCons61[1]){
                    change();
                    checkCons61 = [0,0];
                    displayDice();
                    return;
                }
            }
            if (randNum2 == 6){
                checkCons62.splice(1,1,6);
                checkCons62.reverse();
                if (checkCons62[0]==checkCons62[1]){
                    change();
                    checkCons62 = [0,0];
                    displayDice();
                    return;
                }
            }
            displayDice();
            currentScore = currentScore + randNum1+randNum2;
            document.querySelector('#current-'+key).textContent=currentScore;   
        }
    }
}

function holdFunc(){
    if(playingGame == "true"){
        mainScore[key] = mainScore[key]+currentScore;
        document.querySelector('#score-'+key).textContent=mainScore[key];
        if (mainScore[key]>= winScore){
            document.querySelector('#name-'+key).textContent="Winner!";
            document.querySelector('#dice-1').style.display="none";
            document.querySelector('#dice-2').style.display="none";
            document.querySelector('.player-'+key+'-panel').classList.add('winner');
            playingGame = "false";
        }else{
            change();
        }
    }
}

function newFunc(){
    playingGame = "true";
    mainScore = [0,0];
    currentScore = 0;
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function setScore(){
//    winScore = document.getElementById('inputScore').value;
    winScore = document.querySelector('input[name="pwd"]').value;
}

document.querySelector('.btn-roll').addEventListener('click',rollFunc);

document.querySelector('.btn-hold').addEventListener('click',holdFunc);

document.querySelector('.btn-new').addEventListener('click',newFunc);

document.querySelector('.btnScore').addEventListener('click',setScore);