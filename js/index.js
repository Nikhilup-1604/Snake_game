//GAME CONSTANTS
let inputDir = {x:0, y:0};
const foodSound = new Audio('../assests/food.mp3');
const musicSound= new Audio('../assests/music.mp3');
const gameOverSound= new Audio('../assests/gameover.mp3');
const moveSound= new Audio('../assests/move.mp3');

let score=0;
let speed=7;
let lastPaintTime = 0;
let snakeArr=[
     {x:13 , y:15}
]
food = {x:6 , y:7};


 //GAME FUNCTIONS

 function main(ctime){
     window.requestAnimationFrame(main);
    //  console.log(ctime)
     if((ctime - lastPaintTime)/1000 < 1/speed){
         return;
     } 
     lastPaintTime = ctime;

     gameEngine();
}

function isCollide(sarr){
    // There are two conditions when snake is collide
        
        for (let index = 1; index < snakeArr.length; index++) {
            //1.If it collides with itself.
            if(sarr[index].x === sarr[0].x && sarr[index].y === sarr[0].y){
                return true;
            }   
        }
        //2.If it collides to the wall.
        if(sarr[0].x >= 18 || sarr[0].x <= 0 || sarr[0].y >= 18 || sarr[0].y <= 0){
            return true;
        } 
         

}

function gameEngine(){
    //Part 1: Updating the snake array

    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();

        inputDir = {x:0 , y:0};
        alert("GAME OVER!! Press any key to play again");
        snakeArr = [{x:13 , y:15}];
        musicSound.play();
        score= 0;
    }

    //if you have eaten the food, increment the score and regenerate the food

    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;

        //code for high score
        if(score > highScoreVal){
            highScoreVal = score;
            localStorage.setItem("highScore",JSON.stringify(highScoreVal));
            highScoreBox.innerHTML = "HighScore:" + highScoreVal;

        }
        scoreBox.innerHTML = "Score: " + score;
        //add new body to snake

        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y});

        //add new food
        let a = 2;
        let b = 16; 
        food = {x: Math.round(a + (b - a) * Math.random())
           , y: Math.round(a + (b - a) * Math.random())
        } //generates random number between a an b ( 2 to 16)

    }


    //Moving the snake

    for (let i = snakeArr.length - 2; i >=0; i--) {
        
        snakeArr[i+1] = {...snakeArr[i]}; 
        // snakeArr[0]  wale lo kahan le jana hain bs isme dikkat  hain 
    }

        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;
        




    //PART 2: Display the snake array and food.
           //1.Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');   
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

         //2.Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}



 //Main Logic Goes Here

 let highScore = localStorage.getItem("highScore");
if(highScore === null){
    highScoreVal = 0;
    localStorage.setItem('highScore' ,JSON.stringify(highScoreVal));
}

else{
    highScoreVal = JSON.parse(highScore);
    highScoreBox.innerHTML = "High Score: " + highScore ;
}

 window.requestAnimationFrame(main);

 window.addEventListener('keydown',e=>{
    inputDir = {x:0 , y:1} // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x= 1;
            inputDir.y= 0;
            break;
        default:
            break;
    }
 })




