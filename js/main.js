/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, active, player,winner=false,target=10;

score = [0,0];
active = 0;
player = 1;


const roll_dice = document.querySelector(".btn-roll");
const hold = document.querySelector(".btn-hold");
const new_btn = document.querySelector(".btn-new");
const img = document.querySelector('.dice');
var content, activeplayer = document.querySelector('#player-'+player);
const input = document.getElementById('inp');
activeplayer.style.color = 'green';

input.addEventListener('mouseout', function(){
  target = input.value;
  console.log(target);
})
//next player

function nextplayer(){
  if(!winner)
  { 
    activeplayer.style.color = 'black';
    active = 0;
    
    img.style.display='none';
    //remove 
    document.querySelector('.content-'+player).classList.remove('turn');
    //add to next player
    player = 3-player;
    document.querySelector('.content-'+player).classList.add('turn');
    //add
    content.querySelector('.cur').textContent = active;

    activeplayer = document.querySelector('#player-'+player);
    activeplayer.style.color = 'green';
  }
}

//Roll-dice
function rolldice(e){
  if(!winner){
    var a = Math.floor(Math.random()*6)+1;
    //display image
    img.src = "img/dice-"+a+".png";
    img.style.display = 'block';
    content = document.querySelector('.content-'+player);
    
    if(a!=1){
      active+=a;
    }
    else{
      nextplayer();
    }
    content.querySelector('.cur').textContent = active;
  }
}
//hold
function updatescore(e){
  if(!winner){
    var ans = 'score-'+ player;
    score[player-1] += active;
    document.getElementById(ans).textContent = score[player-1];
    
    if(score[player-1]>=target){
      activeplayer.innerHTML="<h1>WINNER</h1>";
      activeplayer.style.color = 'red'; 
      winner=true;
    }
    nextplayer();
  }
}
//New Game
function newgame(){
  img.style.display='none';
  activeplayer.innerHTML="<h1>PLAYER "+player+"</h1>";
  activeplayer.style.color = 'black';

  document.querySelector('.content-'+player).classList.remove('turn');

  const array = document.querySelectorAll('.new');
  array.forEach(item => item.textContent = '0');
  active=0;
  score = [0, 0];
  winner = false;
  player = 1;
  document.querySelector('.content-'+player).classList.add('turn');
  activeplayer = document.querySelector('#player-'+player);
  activeplayer.style.color = 'green';
}

roll_dice.addEventListener('click', rolldice);
hold.addEventListener('click', updatescore);
new_btn.addEventListener('click',newgame);