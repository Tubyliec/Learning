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



