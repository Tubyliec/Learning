const CANVAS = document.querySelector('.board');
const CONTEXT = CANVAS.getContext("2d");
const GAME_SCORE_CURRENT = document.querySelector('.current_score_value');

const FOOD_IMAGE = new Image();
FOOD_IMAGE.src = "assets/images/food.png";
const BODY_IMAGE = new Image();
BODY_IMAGE.src = "assets/images/circle.png";

let popupWindow = document.createElement('div');

let cell = 32;
let score = 0;
let direction;

let player = {
	name: null,
	score: null
  };

let ratingList = [];

let food = {
	x: randomNumber(),
	y: randomNumber(),
};

let caterpillar = [];
let newHead;

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
		CONTEXT.drawImage(BODY_IMAGE, caterpillar[i].x, caterpillar[i].y);
}
}

function moveCaterpillar() {

    if(caterpillarX == food.x && caterpillarY == food.y) {
		score++;
		GAME_SCORE_CURRENT.textContent = score;
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

	newHead = {
		x: caterpillarX,
		y: caterpillarY
	};

	for(let i = 0; i < caterpillar.length; i++) {
		if(newHead.x == caterpillar[i].x && newHead.y == caterpillar[i].y) {
			clearInterval(rendering);
		}
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

function createPopup() {
	popupWindow.classList.add('popup_window');
    popupWindow.innerHTML = `
	`;
	document.querySelector('.wrapper').appendChild(popupWindow);
}

function drawGame() {
    CONTEXT.fillStyle = 'black';
    CONTEXT.fillRect(0, 0, CANVAS.clientWidth, CANVAS.clientHeight);
    
    CONTEXT.drawImage(FOOD_IMAGE, food.x, food.y);

    drawCaterpillar();
    moveCaterpillar();

    if(caterpillarX < 0 || caterpillarX >= 512 || caterpillarY < 0 || caterpillarY >= 512) {
		clearInterval(rendering);
		popupWindow.classList.add('popup_window_active');
    }
}


createPopup();
let rendering = setInterval(drawGame, 200);
