var context, playerOne, controller, platforms, goal, loop;

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

platforms = { //platforms size and position
    height: [20,],
    width: [200, 150, 100],
    positionX: [(context.canvas.width - 200) / 2, 100, 300],
    positionY: [400, 300, 200],
};

goal = { //goal size and position
    height: [20,],
    width: [50],
    positionX: [150],
    positionY: [70],
};

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

    //platfrom collision
    //The x position of the player is greater than the x position of the platform.
    //The x position of the player is less than the x position of the platform plus its width.
    //The y position of the player is greater than the y position of the platform.
    //The y position of the player is less than the y position of the platform plus its height.
    if (playerOne.positionX + playerOne.width > platforms.positionX[0]  && playerOne.positionX < platforms.positionX[0] + platforms.width[0] && //first platform
    playerOne.positionY > platforms.positionY[0] - playerOne.height && playerOne.positionY < platforms.positionY[0] + platforms.height[0]) {
        playerOne.velocityY = 0;
        playerOne.jumping = false;
    }
    else if (playerOne.positionX + playerOne.width > platforms.positionX[1] && playerOne.positionX < platforms.positionX[1] + platforms.width[1] && //secound platfrom
    playerOne.positionY > platforms.positionY[1] - playerOne.height && playerOne.positionY < platforms.positionY[1] + platforms.height[0]) {
        playerOne.velocityY = 0;
        playerOne.jumping = false;
    }
    else if (playerOne.positionX + playerOne.width > platforms.positionX[2] && playerOne.positionX < platforms.positionX[2] + platforms.width[2] && //theird platform
    playerOne.positionY > platforms.positionY[2] - playerOne.height && playerOne.positionY < platforms.positionY[2] + platforms.height[0]) {
        playerOne.velocityY = 0;
        playerOne.jumping = false;
    }
    if (controller.up && playerOne.jumping == false) { //set speed of which object will move in.
        playerOne.velocityY -= 40;
        playerOne.jumping = true;
    }

    //Goal platfrom
    if (playerOne.positionX + playerOne.width > goal.positionX[0] && playerOne.positionX < goal.positionX[0] + goal.width[0] && //first platform
    playerOne.positionY > goal.positionY[0] - playerOne.height && playerOne.positionY < goal.positionY[0] + goal.height[0]) {
        playerOne.velocityY = 0;
        playerOne.jumping = false;
        location.reload();
    }

    playerOne.positionX += playerOne.velocityX; //transfroms the speed to position.
    playerOne.positionY += playerOne.velocityY;

    context.fillStyle = 'black';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height); //x, y, w, h
    context.fillStyle = 'white';
    context.beginPath();
    context.fillRect(playerOne.positionX, playerOne.positionY, playerOne.width, playerOne.height);
    context.fillStyle ='salmon';
    context.fillRect(platforms.positionX[0], platforms.positionY[0], platforms.width[0], platforms.height[0]);
    context.fillStyle ='salmon';
    context.fillRect(platforms.positionX[1], platforms.positionY[1], platforms.width[1], platforms.height[0]);
    context.fillStyle ='salmon';
    context.fillRect(platforms.positionX[2], platforms.positionY[2], platforms.width[2], platforms.height[0]);
    context.fillStyle ='mediumspringgreen';
    context.fillRect(goal.positionX[0], goal.positionY[0], goal.width[0], goal.height[0]);

    window.requestAnimationFrame(loop);
}
window.addEventListener('keydown', controller.keyListner);
window.addEventListener('keyup', controller.keyListner);

window.requestAnimationFrame(loop);