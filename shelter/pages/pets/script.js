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


/* Pagination */

async function getPets() {
    const result = await fetch('../../assets/pets.json');
    const pets = await result.json();
    return pets;
}

const SLIDER = document.querySelector('.slider');
const FIRST_PAGE = document.querySelector('.first_page');
const PREVIOUS_PAGE = document.querySelector('.previous_page');
const CURRENT_PAGE = document.querySelector('.current_page');
const NEXT_PAGE = document.querySelector('.next_page');
const LAST_PAGE = document.querySelector('.last_page');


async function Pagination() {
    const PETS_INFO =  await getPets();
    const PETS = petsData();
    const ALL_PETS = PETS.length;
    let currentPage = 1;
	let itemsCount = 8;

    function randomValues(count) {
        let values = [];
        for (let i = 0; i < count; i++) {
          let number = Math.floor(Math.random() * count);
          if(!values.includes(number)) {
            values[i] = number;
          } else {
            i--;
          }
        }
        return values;
      }

      function petsData() {
        let values = [];
        for (let i = 0; i < 6; i++) {
            values[i] = randomValues(PETS_INFO.length); 
        }

        values = values.flat();

        let petsArray = [];

        for(let i = 0; i < values.length; i++) {
            petsArray[i] = PETS_INFO[values[i]];
        }
        return petsArray;
    }

    function petsCards(PETS, itemsCount, currentPage) {

        CURRENT_PAGE.innerText = `${currentPage}`;
        SLIDER.innerHTML = '';
        currentPage--;

        const START = itemsCount * currentPage;
        const END = START + itemsCount;
        const SCROLL = PETS.slice(START, END);
        console.log(SCROLL)
        
        SCROLL.forEach(item => {
            let petCard = document.createElement('div');
            petCard.classList.add('card');
            petCard.innerHTML = `
                <img src="${item.img}" alt="pet_photo" class="pet_img">
                <div class="pet_name">${item.name}</div>
                <button class="button_learn">Learn more</button>
            `;

            SLIDER.appendChild(petCard);
            

            petCard.addEventListener('click', () => {
                document.querySelector('.popup').innerHTML = '';
                popUp(item.number);
            });
        });

        return SCROLL;
    }

    function activeButton() {
        if (currentPage === 1) {
            PREVIOUS_PAGE.classList.add('button_navigation_inactive');
            FIRST_PAGE.classList.add('button_navigation_inactive');
        } else {
            PREVIOUS_PAGE.classList.remove('button_navigation_inactive');
            FIRST_PAGE.classList.remove('button_navigation_inactive');
        }

        if (ALL_PETS === currentPage * itemsCount) {
            NEXT_PAGE.classList.add('button_navigation_inactive');
            LAST_PAGE.classList.add('button_navigation_inactive');
        } else {
            NEXT_PAGE.classList.remove('button_navigation_inactive');
            LAST_PAGE.classList.remove('button_navigation_inactive');
        }
    }

    petsCards(PETS, itemsCount, currentPage);
    activeButton()

    NEXT_PAGE.addEventListener('click', () => {
        currentPage += 1;
        petsCards(PETS, itemsCount, currentPage);
        activeButton()
    });

    PREVIOUS_PAGE.addEventListener('click', () => {
        currentPage -= 1;
        petsCards(PETS, itemsCount, currentPage);
        activeButton()
    });

    FIRST_PAGE.addEventListener('click', () => {
        currentPage = 1;
        petsCards(PETS, itemsCount, currentPage);
        activeButton()
    });

    LAST_PAGE.addEventListener('click', () => {
        currentPage = ALL_PETS / itemsCount;
        petsCards(PETS, itemsCount, currentPage);
        activeButton()
    });

    
}


Pagination ();



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


	



