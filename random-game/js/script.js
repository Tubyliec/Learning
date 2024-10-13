const CANVAS = document.querySelector('.board');
const CONTEXT = CANVAS.getContext("2d");
const GAME_SCORE_CURRENT = document.querySelector('.current_score_value');
const GAME_INFO_BUTTON = document.querySelector('#game_info_button');
const TOP_SCORES_BUTTON = document.querySelector('#top_scores_button');

const FOOD_IMAGE = new Image();
FOOD_IMAGE.src = "assets/images/food.png";
const BODY_IMAGE = new Image();
BODY_IMAGE.src = "assets/images/circle.png";

const POPUP_LOSE_WINDOW = document.createElement('div');
const POPUP_WIN_WINDOW = document.createElement('div');
const POPUP_WRAPPER = document.createElement('div');
const RATING_WINDOW = document.createElement('div');
const INFO_WINDOW = document.createElement('div');

const SOUNDS = {
	eat: 'assets/sound/eat.mp3',
	choose: 'assets/sound/choose.mp3',
	knock: 'assets/sound/knock.mp3',
	fail: 'assets/sound/fail.mp3',
	victory: 'assets/sound/victory.mp3',
}

let cell = 32;
let score = 0;
let direction;

let player = {
	name: null,
	score: null
  };

let playerName;
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




function randomNumber() {
    return Math.floor((Math.random() * 16)) * cell;
}

function drawCaterpillar() {
    for(let i = 0; i < caterpillar.length; i++) {
		CONTEXT.drawImage(BODY_IMAGE, caterpillar[i].x, caterpillar[i].y);
}
}

function playAudio(source) {
	let  audio = new Audio();
		audio.src = source;
		audio.play();
}

function moveCaterpillar() {

    if(caterpillarX == food.x && caterpillarY == food.y) {
		score++;
		GAME_SCORE_CURRENT.textContent = score;
		playAudio(SOUNDS.eat);
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
			POPUP_LOSE_WINDOW.classList.add('popup_window_active');
			POPUP_WRAPPER.classList.add('popup_wrapper_active');
			playAudio(SOUNDS.knock);
			playAudio(SOUNDS.fail);
		}
	};

    caterpillar.unshift(newHead);

	if (score == 200) {
		clearInterval(rendering);
		POPUP_WIN_WINDOW.classList.add('popup_window_active');
		POPUP_WRAPPER.classList.add('popup_wrapper_active');
		playAudio(SOUNDS.victory);
	}

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

function createLosePopup() {
	POPUP_LOSE_WINDOW.classList.add('popup_window');
	POPUP_WRAPPER.classList.add('popup_wrapper');
    POPUP_LOSE_WINDOW.innerHTML = `
	<h1>game over</h1>
	<p>Send your result in table of scores.</p>
	<form class="input_form">
		<div>
			<label for="name_field">Enter your name: </label>
			<input id="name_field" type="text" name="text" />
		</div>
		<div>
			<button id="submit" type="submit">Send</button>
		</div>
	</form>
	`;

	document.querySelector('.wrapper').appendChild(POPUP_LOSE_WINDOW);
	document.querySelector('.wrapper').appendChild(POPUP_WRAPPER);

	document.querySelector('.input_form').addEventListener('submit', (e) => {
		playerName = document.querySelector('#name_field').value;

		player.name = playerName;
		if (player.name == '') {
			player.name = 'Unknown';
		}
		player.score = score;

		ratingList = JSON.parse(window.localStorage.getItem('ratingList'));
    	if (!ratingList) {
			ratingList = [];
		  }
		if (ratingList.length > 1) {
			ratingList.sort(function(a, b) {
			return b.score - a.score;
			});
  		}
		if (ratingList.length == 10) {
			ratingList = ratingList.slice(0, 9);
  		}

		ratingList.push(player);
		window.localStorage.setItem('ratingList', JSON.stringify(ratingList));
	  });
}

function createWinPopup() {
	POPUP_WIN_WINDOW.classList.add('popup_window');
	POPUP_WRAPPER.classList.add('popup_wrapper');
    POPUP_WIN_WINDOW.innerHTML = `
	<h1>You win!</h1>
	<p>Send your result in table of scores.</p>
	<form class="input_form">
		<div>
			<label for="name_field">Enter your name: </label>
			<input id="name_field" type="text" name="text" />
		</div>
		<div>
			<button id="submit" type="submit">Send</button>
		</div>
	</form>
	`;

	document.querySelector('.wrapper').appendChild(POPUP_WIN_WINDOW);
	document.querySelector('.wrapper').appendChild(POPUP_WRAPPER);

	document.querySelector('.input_form').addEventListener('submit', (e) => {
		playerName = document.querySelector('#name_field').value;

		player.name = playerName;
		if (player.name == '') {
			player.name = 'Unknown';
		}
		player.score = score;

		ratingList = JSON.parse(window.localStorage.getItem('ratingList'));
    	if (!ratingList) {
			ratingList = [];
		  }
		if (ratingList.length > 1) {
			ratingList.sort(function(a, b) {
			return b.score - a.score;
			});
  		}
		if (ratingList.length == 10) {
			ratingList = ratingList.slice(0, 9);
  		}

		ratingList.push(player);
		window.localStorage.setItem('ratingList', JSON.stringify(ratingList));
	  });
}

function createInfoPopup() {
	INFO_WINDOW.classList.add('popup_window');
	POPUP_WRAPPER.classList.add('popup_wrapper');
    INFO_WINDOW.innerHTML = `
	<article>
		<h3>Start and navigation</h3>
		<p>For start and navigation use Up, Down, Right and Left keys</p>
	</article>
	<article>
		<h3>Game goal</h3>
		<p>The goal of the game is to score 200 points</p>
	</article>
	`;
	const CLOSE_BUTTON = document.createElement('button');
	CLOSE_BUTTON.classList.add('close_button');
	CLOSE_BUTTON.innerHTML = 'Close'
	INFO_WINDOW.appendChild(CLOSE_BUTTON);

	document.querySelector('.wrapper').appendChild(INFO_WINDOW);
	document.querySelector('.wrapper').appendChild(POPUP_WRAPPER);

	CLOSE_BUTTON.addEventListener('click', (e) => {
		INFO_WINDOW.classList.remove('info_window_active')
		POPUP_WRAPPER.classList.remove('popup_wrapper_active');
		playAudio(SOUNDS.choose);
	  });
}

function createRatingTable() {
	ratingList = JSON.parse(window.localStorage.getItem('ratingList'));
	if (ratingList.length > 1) {
		ratingList.sort(function(a, b) {
		return b.score - a.score;
		});
	}

	RATING_WINDOW.classList.add('rating_window');

	const TITLE = document.createElement('h1');
	TITLE.innerHTML = 'Top scores'
	RATING_WINDOW.appendChild(TITLE);

	const RATING_TABLE = document.createElement('div');
	const HEAD = document.createElement('tr');
	RATING_TABLE.appendChild(HEAD);
	RATING_TABLE.classList.add('table');

	for (let i = 0; i < 2; i++) {
		const HEAD_CELL = document.createElement('th');
		HEAD_CELL.classList.add('cell');
		(i == 0) ? HEAD_CELL.innerHTML = 'Name' : HEAD_CELL.innerHTML = 'Score';
		HEAD.appendChild(HEAD_CELL);
	}

	for (let i = 0; i < 10; i++) {
		const TABLE_ROW = document.createElement('tr');
		RATING_TABLE.appendChild(TABLE_ROW);
		for (let j = 0; j < 2; j++) {
		  const TABLE_CELL = document.createElement('td');
		  if (ratingList[i] == undefined) {
			TABLE_CELL.innerHTML = `-`;
		  }
		  if (ratingList[i]) {
			if (j == 0) TABLE_CELL.innerHTML = `${ratingList[i].name}`;
			if (j == 1) TABLE_CELL.innerHTML = `${ratingList[i].score}`;
		    }
			TABLE_CELL.classList.add('cell');
		  	TABLE_ROW.appendChild(TABLE_CELL);
		}
	  }
	RATING_WINDOW.appendChild(RATING_TABLE);

	const CLOSE_BUTTON = document.createElement('button');
	CLOSE_BUTTON.classList.add('close_button');
	CLOSE_BUTTON.innerHTML = 'Close'
	RATING_WINDOW.appendChild(CLOSE_BUTTON);

	document.querySelector('.wrapper').appendChild(RATING_WINDOW);

	CLOSE_BUTTON.addEventListener('click', (e) => {
		RATING_WINDOW.classList.remove('rating_window_active')
		POPUP_WRAPPER.classList.remove('popup_wrapper_active');
		playAudio(SOUNDS.choose);
	  });
}

function drawGame() {
    CONTEXT.fillStyle = 'black';
    CONTEXT.fillRect(0, 0, CANVAS.clientWidth, CANVAS.clientHeight);
    
    CONTEXT.drawImage(FOOD_IMAGE, food.x, food.y);

    drawCaterpillar();
    moveCaterpillar();

    if(caterpillarX < 0 || caterpillarX >= 512 || caterpillarY < 0 || caterpillarY >= 512) {
		clearInterval(rendering);
		POPUP_LOSE_WINDOW.classList.add('popup_window_active');
		POPUP_WRAPPER.classList.add('popup_wrapper_active');
		playAudio(SOUNDS.knock);
		playAudio(SOUNDS.fail);
    }


	
}

createLosePopup();
createWinPopup();
createRatingTable();
createInfoPopup()

let rendering = setInterval(drawGame, 200);

TOP_SCORES_BUTTON.addEventListener('click', (e) => {
	RATING_WINDOW.classList.add('rating_window_active')
	POPUP_WRAPPER.classList.add('popup_wrapper_active');
	playAudio(SOUNDS.choose);
});

GAME_INFO_BUTTON.addEventListener('click', (e) => {
	INFO_WINDOW.classList.add('info_window_active')
	POPUP_WRAPPER.classList.add('popup_wrapper_active');
	playAudio(SOUNDS.choose);
});

//localStorage.clear();