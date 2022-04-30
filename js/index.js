//GAME CONSTANTS
let direction = {x:0, y:0};
 const foodsound = new Audio('food.mp3');
 const musicSound= new Audio('music.mp3');
 const gameOverSound= new Audio('gameover.mp3');
 const moveSound= new Audio('move.mp3');

 let speed=0;
 let lastPaintTime = 0;
 let snakeArr=[
     {x:13 , y:15}
 ]

 //GAME FUNCTIONS

 function main(ctime){
     window.requestAnimationFrame(main);
     console.log(ctime);
     if((ctime - lastPaintTime)/1000 < 1/speed){
         return;
     } 
     lastPaintTime = ctime;

     gameEngine();
}

function gameEngine(){
    //Part 1: Updating the snake array

    //PART 2: Display the snake array and food.

    board.innerHTML = "";
    snakeArr.forEach((element,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = element.y;
        snakeElement.style.gridColumnStart = element.x;
        snakeElement.classList.add('food');
        board.appendChild(snakeElement);
    })
}



 //Main Logic Goes Here

 window.requestAnimationFrame(main);




