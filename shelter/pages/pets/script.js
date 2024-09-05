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
    const PETS_COUNT = PETS_INFO.length;
    const PETS_COMPLETE_DATA = petsData();
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

    function petsCards(PETS_COMPLETE_DATA, itemsCount, currentPage) {

        CURRENT_PAGE.innerText = `${currentPage}`;
        SLIDER.innerHTML = '';
        currentPage--;

        const START = itemsCount * currentPage;
        const END = START + itemsCount;
        const SCROLL = PETS_INFO.slice(START, END);
        
        SCROLL.forEach(item => {
            let petCard = document.createElement('div');
            petCard.classList.add('card');
            petCard.innerHTML = `
                <img src="${item.img}" alt="pet_photo" class="pet_img">
                <div class="pet_name">${item.name}</div>
                <button class="button_learn">Learn more</button>
            `;

            petCard.addEventListener('click', () => {
                document.querySelector('.popup').innerHTML = '';
                openModal(item.id);
            });

            SLIDER.appendChild(petCard);
        });
        return SCROLL;
    }

    petsCards(PETS_COMPLETE_DATA, itemsCount, currentPage);

}


Pagination ();

	



