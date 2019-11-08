var context, playerOne, controller, platforms, goal, loop;

context = document.getElementById('myCanvas').getContext('2d');

context.canvas.height = 1000;
context.canvas.width = 2000;

playerOne = { //Size of player and start position
    height: 25,
    width: 25,
    isOnGround: true,
    isJumping: false,
    positionX: /*(context.canvas.width - 25) / 2*/ 150,
    velocityX: 0,
    positionY: /*context.canvas.height - 25*/350,
    velocityY: 0,
};

platforms = [{ //new and improved platfrom structure
    height: 20,
    width: 200,
    positionX: 100,
    positionY: 900
}, {
    height: 20,
    width: 100,
    positionX: 350,
    positionY: 800
}, {
    height: 20,
    width: 200,
    positionX: 550,
    positionY: 750
}, {
    height: 20,
    width: 150,
    positionX: 800,
    positionY: 680
}, {
    height: 20,
    width: 80,
    positionX: 1000,
    positionY: 580
}, {
    height: 20,
    width: 50,
    positionX: 1200,
    positionY: 770
}, {
    height: 20,
    width: 200,
    positionX: 1300,
    positionY: 680
}, {
    height: 20,
    width: 100,
    positionX: 1550,
    positionY: 580
}, {
    height: 20,
    width: 120,
    positionX: 1680,
    positionY: 450
}, {
    height: 20,
    width: 50,
    positionX: 1890,
    positionY: 400
}, {
    height: 20,
    width: 25,
    positionX: 50,
    positionY: 500
}, {
    height: 20,
    width: 75,
    positionX: 140,
    positionY: 380
}, {
    height: 20,
    width: 75,
    positionX: 340,
    positionY: 500
}, {
    height: 20,
    width: 120,
    positionX: 500,
    positionY: 400
}, {
    height: 20,
    width: 150,
    positionX: 750,
    positionY: 350
}, {
    height: 20,
    width: 70,
    positionX: 900,
    positionY: 300,
}, {
    height: 20,
    width: 50,
    positionX: 750,
    positionY: 180
}, {
    height: 20,
    width: 100,
    positionX: 600,
    positionY: 150
}, {
    height: 20,
    width: 10,
    positionX: 500,
    positionY: 150
}, {
    height: 20,
    width: 10,
    positionX: 400,
    positionY: 150
}, {
    height: 20,
    width: 10,
    positionX: 300,
    positionY: 150
}, {
    height: 20,
    width: 30,
    positionX: 200,
    positionY: 100
}, {
    height: 20,
    width: 100,
    positionX: 600,
    positionY: 150
}, { //floor platform
    height: 20,
    width: context.canvas.width,
    positionX: (context.canvas.width - context.canvas.width) / 2,
    positionY: context.canvas.height -10, 
}];

goal = { //goal size and position
    height: 20,
    width: 50,
    positionX: 150,
    positionY: 70,
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
        }
    }
};

loop = function () {
    playerOne.velocityY *= 0.9; //friction
    playerOne.velocityX *= 0.9;

    if (controller.up && playerOne.isOnGround == true && playerOne.isJumping == false) { //set speed of which object will move in.
        playerOne.velocityY -= 30;
        playerOne.isOnGround = false;
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
    if (playerOne.velocityY <= -30) {
        playerOne.velocityY = -30;
    }
    if (playerOne.velocityY > 8) {
        playerOne.velocityY = 8;
    }

    playerOne.isOnGround = false; //allways assum that player is not on the ground

    if (playerOne.positionY > context.canvas.height - 25) { //collision with floor
        //playerOne.positionY = context.canvas.height - 25; //this causes the shaking but removing this makes it not possible to jump on the floor.
        playerOne.isOnGround = true;
        playerOne.isJumping = false;
    } else if (playerOne.positionY < 0) { //collision with roof
        playerOne.velocityY = 1;
    } else if (playerOne.positionX > context.canvas.width - 25) { //collision with right wall. player reapers on opposite side
        playerOne.positionX = 0;
    } else if (playerOne.positionX < 0) { //collision with left wall. player reapers on opposite side
        playerOne.positionX = context.canvas.width - 25;
    }


    for (let i = 0; i < platforms.length; i++) { //new and improved platfrom collision
        const platform = platforms[i];

        if (playerOne.positionX + playerOne.width > platform.positionX && playerOne.positionX < platform.positionX + platform.width) {
            
            // Topside
            if (playerOne.positionY + playerOne.height + 4 > platform.positionY && playerOne.positionY + playerOne.height < platform.positionY + platform.height) {
                playerOne.isOnGround = true;
                if (controller.up && playerOne.isOnGround == true && playerOne.isJumping == false) { //set speed of which object will move in.
                    playerOne.velocityY -= 30;
                    playerOne.isOnGround = false;
                }
            };

            // Underside
            if (playerOne.positionY - 1 < platform.positionY + platform.height && playerOne.positionY > platform.positionY) {
                playerOne.velocityY = 0;
                playerOne.isOnGround = false;
            };

        }
    }

    //Goal platfrom
    if (playerOne.positionX + playerOne.width > goal.positionX && playerOne.positionX < goal.positionX + goal.width && 
    playerOne.positionY > goal.positionY - playerOne.height && playerOne.positionY < goal.positionY + goal.height) {
        location.reload();
        playerOne.isOnGround = true;
    }

    //onground function
    if (!playerOne.isOnGround) { //gravity
        playerOne.velocityY += 1.5;
        playerOne.isJumping = true;
        console.log('Ground false');
    } else {
        playerOne.velocityY = 0;
        playerOne.isJumping = false;
        console.log('Ground true');
    }

    playerOne.positionX += playerOne.velocityX; //transfroms the speed to position.
    playerOne.positionY += playerOne.velocityY;

    context.fillStyle = 'black';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height); //x, y, w, h
    context.fillStyle = 'white';
    context.beginPath();
    //drawing the player
    context.fillRect(playerOne.positionX, playerOne.positionY, playerOne.width, playerOne.height);
    //drawing the platforms
    for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i];
    
        context.fillStyle="salmon";
        context.fillRect(platform.positionX, platform.positionY, platform.width, platform.height);
    };
    //drawing the goal
    context.fillStyle ='mediumspringgreen';
    context.fillRect(goal.positionX, goal.positionY, goal.width, goal.height);

    window.requestAnimationFrame(loop);
};
window.addEventListener('keydown', controller.keyListner);
window.addEventListener('keyup', controller.keyListner);

window.requestAnimationFrame(loop);