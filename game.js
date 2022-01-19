
var gameLevel = 0;
var isGameOver = true;
var gameStarted = false;

var userClickedPattern = [];
var gamePattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {

  var randomNumber = Math.floor(Math.random()*4);

  var randomChosenColour = buttonColours[randomNumber];

  playSoundAndAnimate(randomChosenColour);

  $("h1").text("Level " + ++gameLevel);

  gamePattern.push(randomChosenColour);
}

function checkAnswer(userChosenColour) {

  if(userChosenColour !== gamePattern[userClickedPattern.length-1]) {
      playSoundAndAnimate("wrong");
      gameOver();
  }

  else{
    playSoundAndAnimate(userChosenColour);
  }

  if(userClickedPattern.length === gameLevel && isGameOver !== true){
    console.log("New Level");
    userClickedPattern = [];
    setTimeout(function() {nextSequence();},500);
  }
}

function playSoundAndAnimate(colour){

  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();

  if(colour !== "wrong")
  $("#" + colour).fadeOut(100).fadeIn(100);
}

function gameOver() {

  $("h1").text("Game Over. Press A key to start again.");

  gameLevel = 0;
  isGameOver = true;
  gameStarted = false;

  userClickedPattern = [];
  gamePattern = [];
}


// Starting the game

$(document).keypress(function () {
   if(gameStarted === false && isGameOver === true) {
     isGameOver = false;
     gameStarted = true;
     nextSequence();
   }
});

//

$(".btn").click(function (){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    checkAnswer(userChosenColour);

    console.log(userClickedPattern);
});
