const CANVAS = document.querySelector('.board');
const CONTEXT = CANVAS.getContext("2d");

const FOOD_IMAGE = new Image();
FOOD_IMAGE.src = "assets/images/food.png";

let cell = 32;
let score = 0;
let direction;

let food = {
	x: randomNumber(),
	y: randomNumber(),
};

let caterpillar = [];

caterpillar[0] = {
	x: 8 * cell,
	y: 8 * cell,
    centerX: 1,
};

let caterpillarX = caterpillar[0].x;
let caterpillarY = caterpillar[0].y;
console.log(caterpillarX)


function randomNumber() {
    return Math.floor((Math.random() * 16)) * cell;
}

function drawCaterpillar() {
    for(let i = 0; i < caterpillar.length; i++) {
    CONTEXT.fillStyle = 'rgb(119,221,119)';
    CONTEXT.strokeStyle = 'black';
    CONTEXT.fillRect(caterpillar[i].x, caterpillar[i].y, cell, cell);
    CONTEXT.strokeRect(caterpillar[i].x, caterpillar[i].y, cell, cell);
}
}

function moveCaterpillar() {

    if(caterpillarX == food.x && caterpillarY == food.y) {
		score++;
		food = {
			x: randomNumber(),
			y: randomNumber(),
		};
	} else {
    caterpillar.pop();
    };

    if(direction == "left") caterpillarX -= cell;
	if(direction == "right") caterpillarX += cell;
	if(direction == "up") caterpillarY -= cell;
	if(direction == "down") caterpillarY += cell;

	let newHead = {
		x: caterpillarX,
		y: caterpillarY
	};

    caterpillar.unshift(newHead);
}



document.addEventListener("keydown", moveDirection);

function moveDirection(event) {
	if(event.keyCode == 37 && direction != "right")
		direction = "left";
	else if(event.keyCode == 38 && direction != "down")
		direction = "up";
	else if(event.keyCode == 39 && direction != "left")
		direction = "right";
	else if(event.keyCode == 40 && direction != "up")
		direction = "down";
}

function drawGame() {
    CONTEXT.fillStyle = 'black';
    CONTEXT.fillRect(0, 0, CANVAS.clientWidth, CANVAS.clientHeight);
    
    CONTEXT.drawImage(FOOD_IMAGE, food.x, food.y);

    drawCaterpillar();
    moveCaterpillar();

    if(caterpillarX < 0 || caterpillarX >= 512 || caterpillarY < 0 || caterpillarY >= 512) {
		clearInterval(rendering);
    }
}

let rendering = setInterval(drawGame, 200);