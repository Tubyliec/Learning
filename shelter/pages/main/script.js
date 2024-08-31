/* Burger menu */

const BURGER_MENU = document.querySelector('#nav_main');
const BURGER_ICON = document.querySelector('.burger-menu');
const BODY = document.querySelector('body');
const NAV_LIST = document.querySelector('.navigation_list');
const NAV_BACKGROUND = document.querySelector('.navigation_background');

BURGER_ICON.addEventListener('click', function(e) {
    BURGER_MENU.classList.toggle('active');
    NAV_BACKGROUND.classList.toggle('active');
    BODY.classList.toggle('no_scroll');
});

NAV_BACKGROUND.addEventListener( 'click', (e) => { 
	if (e.target === NAV_BACKGROUND) {
		BURGER_MENU.classList.remove('active');
        NAV_BACKGROUND.classList.remove('active');
        BODY.classList.remove('no_scroll');
        BURGER_ICON.checked = false;
	}
})

NAV_LIST.addEventListener('click', function(e) {
    if (e.target.classList.contains('navigation_link')){
        BURGER_MENU.classList.remove('active');
        NAV_BACKGROUND.classList.remove('active');
        BODY.classList.remove('no_scroll');
        BURGER_ICON.checked = false;
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

            newItem.addEventListener('click', () => {
                document.querySelector('.popup').innerHTML = '';
                popUp(item + 1);
            });
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

            newItem.addEventListener('click', () => {
                document.querySelector('.popup').innerHTML = '';
                popUp(item + 1);
            });
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

            newItem.addEventListener('click', () => {
                document.querySelector('.popup').innerHTML = '';
                popUp(item + 1);
            });
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


/* Popup */

const POPUP_WRAPPER = document.querySelector('.popup_wrapper');

    async function popUp(number) {
		const PETS_INFO = await getPets();
        
        BODY.classList.toggle('no_scroll');
		POPUP_WRAPPER.classList.toggle('popup_wrapper_active');

		let popupWindow = document.createElement('div');
		popupWindow.classList.add('popup_window');
		popupWindow.innerHTML = `
            <button class="popup_close"><img src="../../assets/icons/Vector.png" alt="close"></button>
            <div class="popup_content">
                <div class="img_wrapper">
                <img src="${PETS_INFO[number - 1].img}" alt="img_pet" class="popup_img">
                </div>
                <div class="popup_info">
                    <div class = popup_name>
                        <h3 class="popup_title">${PETS_INFO[number - 1].name}</h3>
                        <div class="popup_subtitle">${PETS_INFO[number - 1].type} - ${PETS_INFO[number - 1].breed}</div>
                    </div>
                    <div class="popup_description">${PETS_INFO[number - 1].description}</div>
                    <ul class="pets_list">
                        <li class="pets_item">
                            <span>Age:</span> ${PETS_INFO[number - 1].age}
                        </li>
                        <li class="pets_item">
                            <span>Inoculation:</span> ${PETS_INFO[number - 1].inoculations}
                        </li>
                        <li class="pets_item">
                            <span>Diseases:</span> ${PETS_INFO[number - 1].diseases}
                        </li>
                        <li class="pets_item">
                            <span>Parasites:</span> ${PETS_INFO[number - 1].parasites}
                        </li>
                    </ul>
                </div>
            </div>    
		`;
        
        document.querySelector('.popup').appendChild(popupWindow);
		
        POPUP_WRAPPER.addEventListener('click', (e) => {
            if (e.target === POPUP_WRAPPER) {
                POPUP_WRAPPER.classList.remove('popup_wrapper_active');
                BODY.classList.remove('no_scroll');
            }
        });

        POPUP_WRAPPER.addEventListener('click', (e) => {
            if (e.target === document.querySelector('.popup_close')) {
                POPUP_WRAPPER.classList.remove('popup_wrapper_active');
                BODY.classList.remove('no_scroll');
            }
        });

        POPUP_WRAPPER.addEventListener('click', (e) => {
            if (e.target === document.querySelector('.popup_window')) {
                POPUP_WRAPPER.classList.remove('popup_wrapper_active');
                BODY.classList.remove('no_scroll');
            }
        });

        POPUP_WRAPPER.addEventListener('click', (e) => {
            if (e.target === document.querySelector('.popup_close > *')) {
                POPUP_WRAPPER.classList.remove('popup_wrapper_active');
                BODY.classList.remove('no_scroll');
            }
        });

	}
