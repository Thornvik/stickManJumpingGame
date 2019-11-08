var context, playerOne, controller, platforms, goal, loop;

context = document.getElementById('myCanvas').getContext('2d');

context.canvas.height = 500;
context.canvas.width = 800;

playerOne = { //Size of player and start position
    height: 25,
    width: 25,
    isOnGround: true,
    positionX: (context.canvas.width - 25) / 2,
    velocityX: 0,
    positionY: context.canvas.height - 25,
    velocityY: 0,
};

platforms = [{ //new and improved platfrom structure
    height: 20,
    width: 200,
    positionX: 100,
    positionY: 400
}, {
    height: 20,
    width: 200,
    positionX: 500,
    positionY: 400
}, {
    height: 20,
    width: 200,
    positionX: 200,
    positionY: 200
}, {
    height: 20,
    width: 200,
    positionX: 400,
    positionY: 200
}];

goal = { //goal size and position
    height: [20],
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
    playerOne.velocityY *= 0.9; //friction
    playerOne.velocityX *= 0.9;

    if (controller.up && playerOne.isOnGround == true) { //set speed of which object will move in.
        playerOne.velocityY -= 40;
        playerOne.isOnGround = false;
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

    if (playerOne.velocityX < -4) { //max velocity
        playerOne.velocityX = -4;
    }
    if (playerOne.velocityX > 4) {
        playerOne.velocityX = 4;
    }

    playerOne.isOnGround = false;

    if (playerOne.positionY > context.canvas.height - 25) { //collision with floor
        // playerOne.velocityY = 0;
        playerOne.positionY = context.canvas.height - 25;
        playerOne.isOnGround = true;
    } else if (playerOne.positionY < 0) { //collision with roof
        playerOne.velocityY = 1;
    } else if (playerOne.positionX > context.canvas.width - 25) { //collision with right wall
        //playerOne.velocityX = -1;
        playerOne.positionX = 0;
    } else if (playerOne.positionX < 0) { //collision with left wall
        //playerOne.velocityX = +1;
        playerOne.positionX = context.canvas.width - 25;
    }


    for (let i = 0; i < platforms.length; i++) { //new and improved platfrom collision
        const platform = platforms[i];

        if (playerOne.positionX + playerOne.width > platform.positionX && playerOne.positionX < platform.positionX + platform.width) {
            
            // Topside
            if (playerOne.positionY + playerOne.height + 1 > platform.positionY && playerOne.positionY + playerOne.height < platform.positionY + platform.height) {
                console.log('topside');
                playerOne.isOnGround = true;
            };

            // Underside
            if (playerOne.positionY - 1 < platform.positionY + platform.height && playerOne.positionY > platform.positionY) {
                console.log('bottomside');
                playerOne.velocityY = 0;
            };
        }
    }

    //Goal platfrom
    if (playerOne.positionX + playerOne.width > goal.positionX[0] && playerOne.positionX < goal.positionX[0] + goal.width[0] && //first platform
    playerOne.positionY > goal.positionY[0] - playerOne.height && playerOne.positionY < goal.positionY[0] + goal.height[0]) {
        playerOne.velocityY = 0;

        location.reload();
        playerOne.isOnGround = true;
    }

    if (!playerOne.isOnGround) { //gravity
        playerOne.velocityY += 1.5;
    } else {
        playerOne.velocityY = 0;
    }

    playerOne.positionX += playerOne.velocityX; //transfroms the speed to position.
    playerOne.positionY += playerOne.velocityY;

    context.fillStyle = 'black';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height); //x, y, w, h
    context.fillStyle = 'white';
    context.beginPath();
    context.fillRect(playerOne.positionX, playerOne.positionY, playerOne.width, playerOne.height);
    for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i];
    
        context.fillStyle="salmon";
        context.fillRect(platform.positionX, platform.positionY, platform.width, platform.height);
    };
    context.fillStyle ='mediumspringgreen';
    context.fillRect(goal.positionX[0], goal.positionY[0], goal.width[0], goal.height[0]);

    window.requestAnimationFrame(loop);
};
window.addEventListener('keydown', controller.keyListner);
window.addEventListener('keyup', controller.keyListner);

window.requestAnimationFrame(loop);