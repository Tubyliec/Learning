/* Burger menu */

const burgerMenu = document.querySelector('#nav_main');
const burgerIcon = document.querySelector('.burger-menu');
const body = document.querySelector('body');
const navList = document.querySelector('.navigation_list');
const navBackground = document.querySelector('.navigation_background');

burgerIcon.addEventListener('click', function(e) {
    burgerMenu.classList.toggle('active');
    navBackground.classList.toggle('active');
    body.classList.toggle('no_scroll');
});

navBackground.addEventListener( 'click', (e) => { 
	if (e.target === navBackground) {
		burgerMenu.classList.remove('active');
        navBackground.classList.remove('active');
        body.classList.remove('no_scroll');
        burgerIcon.checked = false;
	}
})

navList.addEventListener('click', function(e) {
    if (e.target.classList.contains('navigation_link')){
        burgerMenu.classList.remove('active');
        navBackground.classList.remove('active');
        body.classList.remove('no_scroll');
        burgerIcon.checked = false;
    }
});

/* Slider */

async function getPets() {
    const result = await fetch('../../assets/pets.json');
    const pets = await result.json();
    return pets;
}

const PREVIOUS_BUTTON = document.querySelector('#left_arrow');
const NEXT_BUTTON = document.querySelector('#right_arrow');
const SLIDER = document.querySelector('#slider_body');

let countSlides

async function Slider () {
    const PETS_INFO =  await getPets();

    let previousArray = [];
	let currentArray = [];
	let nextArray = [];

    const LEFT_ITEM = document.querySelector('#left_item');
	const CENTER_ITEM = document.querySelector('#center_item');
	const RIGHT_ITEM = document.querySelector('#right_item');

    if (window.screen.availWidth >= 1230) {
        countSlides = 3;
    }
    if (window.screen.availWidth <= 1229 && window.screen.availWidth >= 715) {
        countSlides = 2;
    }
    if (window.screen.availWidth <= 714) {
        countSlides = 1;
    }

    function arrays () {
        for (let i = 0; i < countSlides; i++) {
            let randomItem = Math.floor(Math.random() * 8);
            if(!nextArray.includes(randomItem)) {
                nextArray[i] = randomItem;
            } else {
                i--;
            }
        }

        currentArray.push(...nextArray);
        nextArray = [];

        for (let i = 0; i < countSlides; i++) {
            let randomItem = Math.floor(Math.random() * 8);
            if(!nextArray.includes(randomItem) && !currentArray.includes(randomItem)) {
                nextArray[i] = randomItem;
            } else {
                i--;
            }
        }

        previousArray.push(...currentArray);
        currentArray = [];
        currentArray.push(...nextArray);
        nextArray = [];

        for (let i = 0; i < countSlides; i++) {
            let randomItem = Math.floor(Math.random() * 8);
            if(!nextArray.includes(randomItem) && !currentArray.includes(randomItem)) {
                nextArray[i] = randomItem;
            } else {
                i--;
            }
        }
    }

    function moveForward() {
        previousArray = [];
        previousArray.push(...currentArray);
        currentArray = [];
        currentArray.push(...nextArray);
        nextArray = [];
        for (let i = 0; i < countSlides; i++) {
            let randomItem = Math.floor(Math.random() * 8);
            if(!nextArray.includes(randomItem) && !currentArray.includes(randomItem)) {
                nextArray[i] = randomItem;
            } else {
                i--;
            }
        }
    }
    function moveBackward() {
            nextArray = [];
			nextArray.push(...currentArray);
			currentArray = [];
			currentArray.push(...previousArray);
        for (let i = 0; i < countSlides; i++) {
            let randomItem = Math.floor(Math.random() * 8);
            if(!previousArray.includes(randomItem) && !currentArray.includes(randomItem)) {
                previousArray[i] = randomItem;
            } else {
                i--;
            }
        }
    }

    function previous() {
        previousArray.forEach(item => {
            let newItem = document.createElement('div');
            newItem.classList.add('card');
            newItem.innerHTML = `
            <img src="${PETS_INFO[item].img}" alt="pet_photo" class="slider_img">
            <div class="pet_name">${PETS_INFO[item].name}</div>
            <button class="button_learn">Learn more</button>
        `;
            document.querySelector('#left_item').appendChild(newItem);
        });
    }

    function current() {
        currentArray.forEach(item => {
            let newItem = document.createElement('div');
            newItem.classList.add('card');
            newItem.innerHTML = `
            <img src="${PETS_INFO[item].img}" alt="pet_photo" class="slider_img">
            <div class="pet_name">${PETS_INFO[item].name}</div>
            <button class="button_learn">Learn more</button>
        `;
            document.querySelector('#center_item').appendChild(newItem);
        });
    }

    function next() {
        nextArray.forEach(item => {
            let newItem = document.createElement('div');
            newItem.classList.add('card');
            newItem.innerHTML = `
            <img src="${PETS_INFO[item].img}" alt="pet_photo" class="slider_img">
            <div class="pet_name">${PETS_INFO[item].name}</div>
            <button class="button_learn">Learn more</button>
        `;
            document.querySelector('#right_item').appendChild(newItem);
        });
    }

    PREVIOUS_BUTTON.addEventListener('click', () => {
        SLIDER.classList.add('move-left');
        moveBackward();
    });
   
    SLIDER.addEventListener('animationend', (animation) => {


        if(animation.animationName === 'move-left' || 'move-left-tablet' || 'move-left-mobile') {

            SLIDER.classList.remove('move-left');
            LEFT_ITEM.innerHTML = '';
            CENTER_ITEM.innerHTML = '';
            RIGHT_ITEM.innerHTML = '';
            previous();
            current();
            next();
            }
    });

    NEXT_BUTTON.addEventListener('click', () => {
        SLIDER.classList.add('move-right');
        moveForward();
    });


    SLIDER.addEventListener('animationend', (animation) => {


        if(animation.animationName === 'move-right' || 'move-right-tablet' || 'move-right-mobile') {

            SLIDER.classList.remove('move-right');
            LEFT_ITEM.innerHTML = '';
            CENTER_ITEM.innerHTML = '';
            RIGHT_ITEM.innerHTML = '';
            previous();
            current();
            next();
            }
    });

    window.addEventListener('resize', () => {
        if (window.screen.availWidth >= 1230) {
            countSlides = 3;
            LEFT_ITEM.innerHTML = '';
            CENTER_ITEM.innerHTML = '';
            RIGHT_ITEM.innerHTML = '';
        }

        if (window.screen.availWidth <= 1229 && window.screen.availWidth >= 715) {
            countSlides = 2;
            LEFT_ITEM.innerHTML = '';
            CENTER_ITEM.innerHTML = '';
            RIGHT_ITEM.innerHTML = '';
        }
        if (window.screen.availWidth <= 714) {
            countSlides = 1;
            LEFT_ITEM.innerHTML = '';
            CENTER_ITEM.innerHTML = '';
            RIGHT_ITEM.innerHTML = '';

        }
    });

    arrays();
	previous();
	current();
	next();
    console.log(countSlides)
}

Slider ();


window.addEventListener('resize', () => {
    if (window.screen.availWidth >= 1230) {
        Slider ();
    }
    if (window.screen.availWidth <= 1229 && window.screen.availWidth >= 715) {
        Slider ();
    }
    if (window.screen.availWidth <= 714) {
        Slider ();
    }
});
