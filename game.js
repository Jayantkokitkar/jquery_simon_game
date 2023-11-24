var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
function nextSequence(){
    userClickedPattern=[];
    $("#level-title").html("Level "+level);
    level++;
    var randomNumber=Math.floor(Math.random()*3) + 1;
    var randomChosenColor=buttonColors[randomNumber];
console.log(randomChosenColor);
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
    
    
}
$(".btn").click(function () { 
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    
    
});

function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();

}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

$(document).on('keypress',function(e) {
    
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
});

function checkAnswer(currentLevel){
 if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    if(gamePattern.length==userClickedPattern.length){
        
        setTimeout(function(){
            nextSequence();
         }, 1000);
    }
    
 }
 else{
    playSound("wrong2");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html("Game Over, Press Any Key to Restart");
    startOver();
}

}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;

}