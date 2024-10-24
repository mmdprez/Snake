//Board

var blockSize  =25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake 
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var snakeBody = [];

var velocityX = 0;
var velocityY= 0;

//food
var foodX = blockSize * 10;
var foodY = blockSize * 10;

//gameover
var gameOver = false;


window.onload=function(){
    board=document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); 
   
    placeFood();
    document.addEventListener("keyup", changeDirection);//keydown kan ook
    setInterval(update,300);

}

function update(){

    if (gameOver===true){
        return;
    }
    context.fillStyle="black";
    context.fillRect(0,0,board.width,board.height)

    context.fillStyle="red";
    context.fillRect(foodX,foodY,blockSize,blockSize)

    //als de snake het eten kan opeten, dan moet het food-element op een nieuwe positie komen
    if (snakeX == foodX && snakeY == foodY)
    {
        snakeBody.push([foodX,foodY]);
        placeFood();
    }

    for (let i = snakeBody.length-1; i> 0; i--)
    {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length){ //zorg dat de head steeds op 0
        snakeBody[0]=[snakeX, snakeY]
    }
  
    context.fillStyle="lime";
    snakeX+=velocityX * blockSize;
    snakeY+=velocityY * blockSize;
    context.fillRect(snakeX,snakeY,blockSize,blockSize)

    for (let i=0; i < snakeBody.length;i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }   

    //gameover? het spel eindigt als de slang tegen een rand botst
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize){
        gameOver=true;
        alert("GAME OVER")
    }
}

function placeFood(){
    foodX = Math.floor(Math.random()*cols)*blockSize;
    foodY = Math.floor(Math.random()*rows)*blockSize;

}

function changeDirection(e){
    if (e.code==="ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code==="ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code==="ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
    else if (e.code==="ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
}
