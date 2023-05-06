var runStart= 0;
function keyCheck(event) {
    if (event.which == 13) {
        document.getElementById("gameOver").style.visibility="hidden";
        if (runWorkerId == 0) {
            createBlockId = setInterval(createBlock, 100);
            moveBlockId = setInterval(moveBlocks, 100);
            runWorkerId = setInterval(run, 100);
            runStart = 1;
            runSound.play();
            backgroundWorkerId = setInterval(moveBackground, 100);
            scoreWorkerId = setInterval(updateScore,100);
        }

    }
    if (event.which == 32) {
        if(runStart==1){
            if (jumpWorkerId == 0) {
                clearInterval(runWorkerId);
                runSound.pause();
                jumpWorkerId = setInterval(jump, 100);
                jumpSound.play();
            }
        }
        

    } 

}

//Create Blocks
var blockMarginLeft = 600;
var blockId = 1;
var createBlockId = 0;
function createBlock() {
    var block = document.createElement("div"); //<di></div>
    block.className = "block";   //<div class="block"></div>

    block.id = "block" + blockId;
    blockId++;      //blockId = blockId + 1;

    var gap = Math.random() * (1000 - 400) + 400;
    blockMarginLeft = blockMarginLeft + gap;


    block.style.marginLeft = blockMarginLeft + "px";
    document.getElementById("background").appendChild(block);
}

//Move Blocks
var moveBlockId = 0;
function moveBlocks() {
    for (var i = 1; i <= blockId; i++) {
        var currentBlock = document.getElementById("block" + i);
        var currentMarginLeft = currentBlock.style.marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 20;
        currentBlock.style.marginLeft = newMarginLeft + "px";
        if(newMarginLeft<=136){     //136 - 36
            if(newMarginLeft>=36){
                if(boyMarginTop<=431){
                    if(boyMarginTop>=403){
                        clearInterval(runWorkerId);
                        runSound.pause();
                        clearInterval(jumpWorkerId);
                        jumpWorkerId = -1;
                        clearInterval(backgroundWorkerId);
                        clearInterval(scoreWorkerId);
                        clearInterval(moveBlockId);
                        clearInterval(createBlockId);

                        deadWorkerId = setInterval(dead,100);
                        deadSound.play();
                    }
                }
            }
        } 
            

    }

}
var runSound = new Audio("run.mp3");
runSound.loop = true;

//Run Function
var boy = document.getElementById("boy");
var runImageNumber = 1;
var runWorkerId = 0;
function run() {
    runImageNumber++;
    if (runImageNumber == 9) {
        runImageNumber = 1;
    }
    boy.src = "Run (" + runImageNumber + ").png";

}
var jumpSound = new Audio("jump.mp3");
//Jump function
var jumpImageNumber = 1;
var jumpWorkerId = 0;
var boyMarginTop = 431;
function jump() {
    jumpImageNumber++;
    if (jumpImageNumber <= 7) {
        boyMarginTop = boyMarginTop - 28;
        boy.style.marginTop = boyMarginTop + "px";
    }
    if (jumpImageNumber >= 8) {
        boyMarginTop = boyMarginTop + 28;
        boy.style.marginTop = boyMarginTop + "px";
    }

    if (jumpImageNumber == 13) {
        jumpImageNumber = 1;
        clearInterval(jumpWorkerId);
        jumpWorkerId = 0;

        runWorkerId = setInterval(run, 100);
        runSound.play();
    }
    boy.src = "Jump (" + jumpImageNumber + ").png";
}

//Background Move

var background = document.getElementById("background");
var backgroundX = 0;
var backgroundWorkerId = 0;
function moveBackground() {
    backgroundX = backgroundX - 20;
    background.style.backgroundPositionX = backgroundX + "px";
}

//Score Update
var score=document.getElementById("score");
var newScore = 0;
var scoreWorkerId = 0;
function updateScore(){
    newScore++;
    score.innerHTML = newScore;
}



var deadSound = new Audio("dead.mp3");
//Dead Function


var deadImageNumber = 1;
var deadWorkerId = 0;
function dead(){
    deadImageNumber++;
    if(deadImageNumber==11){
        deadImageNumber=10;

        boy.style.marginTop = "431px";
        document.getElementById("gameOver").style.visibility="visible";
        document.getElementById("endScore").innerHTML = newScore;
        
    }
    boy.src = "Dead ("+deadImageNumber+").png";

}

//Function Restart

function re(){
    location.reload()
}
