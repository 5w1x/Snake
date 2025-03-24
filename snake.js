let game = {
    tickNumber: 0,
    timer: null,
    board: [
    "###############",
    "#             #",
    "#             #",
    "#             #",
    "#    ####     #",
    "#    ####     #",
    "#             #",
    "#             #",
    "#             #",
    "###############"
    ],
    tick: function() {
        window.clearTimeout(game.timer);
        game.tickNumber++;
        snake.move();
        graphics.drawGame();
        game.timer = window.setTimeout("game.tick()", 500);
    }
};

let snake = {
    parts: [
        { x: 4, y: 2 },
        { x: 3, y: 2 },
        { x: 2, y: 2 }
    ],
    facing: "E",
    nextLocation: function() {
        let snakeHead = snake.parts[0];
        let targetX = snakeHead.x;
        let targetY = snakeHead.y;
        targetY = snake.facing == "N" ? targetY-1 : targetY;
        targetY = snake.facing == "S" ? targetY+1 : targetY;
        targetX = snake.facing == "W" ? targetX-1 : targetX;
        targetX = snake.facing == "E" ? targetX+1 : targetX;
        return {x: targetX, y: targetY};
     },
    move: function() {
        let location = snake.nextLocation();
        snake.parts.unshift(location);
        snake.parts.pop();
    }
}

let graphics = {
    canvas: document.getElementById("canvas"),
    squareSize: 30,
    drawBoard: function(ctx) {
        let currentYoffset = 0;
        // let ctx = graphics.canvas.getContext("2d");
        // let currentYoffset = 0;
        // let squareSize = 30;
        game.board.forEach(function checkLine(line) {
            line = line.split("");
            let currentXoffset = 0;
            line.forEach(function checkCharacter(character) {
                if (character === "#") {
                    ctx.fillStyle = "black";
                    ctx.fillRect(currentXoffset, currentYoffset, graphics.squareSize, graphics.squareSize);
                }
                currentXoffset += graphics.squareSize;
            });
            currentYoffset += graphics.squareSize;
        })
    },

    drawSnake: function(ctx) {
        
        snake.parts.forEach(function drawPart(part) {
            let partXlocation = part.x * graphics.squareSize;
            let partYlocation = part.y * graphics.squareSize;
            ctx.fillStyle = "green";
            ctx.fillRect(partXlocation, partYlocation, graphics.squareSize, graphics.squareSize);
        });
    },

    drawGame: function() {
        let ctx = graphics.canvas.getContext("2d");
        ctx.clearRect(0, 0, graphics.canvas.width, graphics.canvas.height);
        graphics.drawBoard(ctx);
        graphics.drawSnake(ctx);
    }
};

graphics.drawGame();

let gameControl = {
    processInput: function (keyPressed){
        let key = keyPressed.key.toLowerCase();
        let targetDirection = snake.facing;
        if (key == "w") targetDirection = "N";
        if (key == "a") targetDirection = "W";
        if (key == "s") targetDirection = "S";
        if (key == "d") targetDirection = "E";
        snake.facing = targetDirection;
        game.tick();
    },

    startGame: function() {
        window.addEventListener("keypress", gameControl.processInput, false);
        game.tick();
    }
};
gameControl.startGame();
