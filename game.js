var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("level" + "" + level);
    newSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickPattern.push(userChosenColor);
  playSounds(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickPattern.length - 1);
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
    if (userClickPattern.length === gamePattern.length) {
      setTimeout(function() {
        newSequence();
      }, 1000);
    }
  } else {
    playSounds("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 150);

}

function newSequence() {
  userClickPattern = [];
  level++;
  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(150).fadeOut(150).fadeIn(150);
  playSounds(randomChosenColor);
}

function playSounds(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
