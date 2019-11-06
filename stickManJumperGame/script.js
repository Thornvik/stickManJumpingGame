var context, playerOne, controller, platformOne, platformTwo, platformThree, loop;

context = document.getElementById('myCanvas').getContext('2d');

context.canvas.height = 500;
context.canvas.width = 800;

playerOne = { //Size of player and start position
    height: 25,
    width: 25,
    jumping: false,
    positionX: (context.canvas.width - 25) / 2,
    velocityX: 0,
    positionY: context.canvas.height - 25,
    velocityY: 0,
};

platformOne = {
    height: 20,
    width: 200,
    positionX: 100,
    positionY: 400,
};

platformTwo = {
    height: 20,
    width: 200,
    positionX: 300,
    positionY: 300,
};

platformThree = {
    height: 20,
    width: 200,
    positionX: 500,
    positionY: 200,
}

controller = {  //Controlles for the player
    left: false,
    right: false,
    up: false,
    down: false,
    keyListner: function (event) {
        var keyState = (event.type == 'keydown') ? true : false; //cheacks if it is keydown or not
        switch (event.keyCode) {
            case 39:
                controller.right = keyState;
                break;
            case 37:
                controller.left = keyState;
                break;
            case 38:
                controller.up = keyState;
                break;
            case 40:
                controller.down = keyState;
                break;
        }
    }
};

loop = function () {
    if (controller.up && playerOne.jumping == false) { //set speed of which object will move in.
        playerOne.velocityY -= 40;
        playerOne.jumping = true;
    }
    else if (controller.down) { //not use right now
        // playerOne.velocityY += 1;
    }
    else if (controller.right) {
        playerOne.velocityX += 1;
    }
    else if (controller.left) {
        playerOne.velocityX -= 1;
    };

    if (controller.up == false || controller.down == false || controller.right == false || controller.left == false) { //friction, that comes in to effect when you release the key
        playerOne.velocityY *= 0.9;
        playerOne.velocityX *= 0.9;
    };
    playerOne.velocityY += 1.5;

    if (playerOne.positionY > context.canvas.height - 25) { //collision with floor
        playerOne.velocityY = 0;
        playerOne.positionY = context.canvas.height - 25;
        playerOne.jumping = false;
    } else if (playerOne.positionY < 0) { //collision with roof
        playerOne.velocityY = 1;
    } else if (playerOne.positionX > context.canvas.width - 25) { //collision with right wall
        //playerOne.velocityX = -1;
        playerOne.positionX = 0;
    } else if (playerOne.positionX < 0) { //collision with left wall
        //playerOne.velocityX = +1;
        playerOne.positionX = context.canvas.width - 25;
    }

    //The x position of the player is greater than the x position of the platform.
    //The x position of the player is less than the x position of the platform plus its width.
    //The y position of the player is greater than the y position of the platform.
    //The y position of the player is less than the y position of the platform plus its height.
    if (playerOne.positionX > platformOne.positionX && playerOne.positionX < platformOne.positionX + platformOne.width &&
    playerOne.positionY > platformOne.positionY - playerOne.height && playerOne.positionY < platformOne.positionY + platformOne.height) {
        playerOne.velocityY = 0;
        playerOne.jumping = false;
    } else if (playerOne.positionX > platformTwo.positionX && playerOne.positionX < platformTwo.positionX + platformTwo.width &&
    playerOne.positionY > platformTwo.positionY - playerOne.height && playerOne.positionY < platformTwo.positionY + platformTwo.height) {
        playerOne.velocityY = 0;
        playerOne.jumping = false;
    } else if (playerOne.positionX > platformThree.positionX && playerOne.positionX < platformThree.positionX + platformThree.width &&
    playerOne.positionY > platformThree.positionY - playerOne.height && playerOne.positionY < platformThree.positionY + platformThree.height) {
        playerOne.velocityY = 0;
        playerOne.jumping = false;
    }
        

    playerOne.positionX += playerOne.velocityX; //transfroms the speed to position.
    playerOne.positionY += playerOne.velocityY;

    context.fillStyle = 'black';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height); //x, y, w, h
    context.fillStyle = 'white';
    context.beginPath();
    context.fillRect(playerOne.positionX, playerOne.positionY, playerOne.width, playerOne.height);
    context.fillStyle ='salmon';
    context.fillRect(platformOne.positionX, platformOne.positionY, platformOne.width, platformOne.height);
    context.fillStyle ='blue';
    context.fillRect(platformTwo.positionX, platformTwo.positionY, platformTwo.width, platformTwo.height)
    context.fillStyle ='red';
    context.fillRect(platformThree.positionX, platformThree.positionY, platformThree.width, platformThree.height)
    
    window.requestAnimationFrame(loop);
}
window.addEventListener('keydown', controller.keyListner);
window.addEventListener('keyup', controller.keyListner);

window.requestAnimationFrame(loop);