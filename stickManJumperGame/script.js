var context, playerOne, controller, platforms, loop;

context = document.getElementById('myCanvas').getContext('2d');

context.canvas.height = 500;
context.canvas.width = 800;

playerOne = { //Size of player and start position
    height: 25,
    width: 25,
    jumping: true,
    positionX: (context.canvas.width - 25) / 2,
    xVelocity: 0,
    positionY: context.canvas.height - 25,
    yVelocity: 0,
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
    if (controller.up) { //set speed of which object will move in.
        playerOne.yVelocity -= 1;
    }
    else if (controller.down) {
        playerOne.yVelocity += 1;
    }
    else if (controller.right) {
        playerOne.xVelocity += 1;
    }
    else if (controller.left) {
        playerOne.xVelocity -= 1;
    };

    if (controller.up == false || controller.down == false || controller.right == false || controller.left == false) { //friction, that comes in to effect when you release the key
        playerOne.yVelocity *= 0.9;
        playerOne.xVelocity *= 0.9;
    };

    if (playerOne.positionY > context.canvas.height - 25) { //collision with floor
        playerOne.yVelocity = 0;
        playerOne.positionY = context.canvas.height - 25;
    } else if (playerOne.positionY < 0) { //collision with roof
        playerOne.yVelocity = 1;
    } else if (playerOne.positionX > context.canvas.width - 25) { //collision with right wall
        //playerOne.xVelocity = -1;
        playerOne.positionX = 0;
    } else if (playerOne.positionX < 0) { //collision with left wall
        //playerOne.xVelocity = +1;
        playerOne.positionX = context.canvas.width - 25;
    }

    playerOne.positionX += playerOne.xVelocity; //transfroms the speed to position.
    playerOne.positionY += playerOne.yVelocity;

    context.fillStyle = 'black';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height); //x, y, w, h
    context.fillStyle = 'white';
    context.beginPath();
    context.fillRect(playerOne.positionX, playerOne.positionY, playerOne.width, playerOne.height);

    window.requestAnimationFrame(loop);
}
window.addEventListener('keydown', controller.keyListner);
window.addEventListener('keyup', controller.keyListner);

window.requestAnimationFrame(loop);