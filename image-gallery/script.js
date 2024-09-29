const IMAGE_CONTAINER = document.querySelector('.image_container');
const SEARCH_FORM = document.querySelector('.search_form');
const CLEAR_BTN = document.querySelector('.clear_btn');

let keySearch = 'Belarus'

async function getData(keySearch) {
    const SOURCES = await fetch(`https://api.unsplash.com/search/photos?query=${keySearch}&client_id=0pYB4GnnEdwEkAPskVjVRs1MUSJ7-9WoSkoh2bz03K8&per_page=${12}`);
    const DATA = await SOURCES.json();
    IMAGE_CONTAINER.innerHTML = "";
    showData(DATA)
  }

function showData(DATA) {
    for (let i = 0; i < DATA.results.length; i++) {
        let image = document.createElement('img');
        image.classList.add('gallery_image');
        image.src = `${DATA.results[i].urls.regular}`;
        image.alt = `${DATA.results[i].alt_description}`;
        IMAGE_CONTAINER.append(image);
    }
}

SEARCH_FORM.addEventListener("submit", (e) => {
    e.preventDefault();
    const DATA = new FormData(SEARCH_FORM);
    const REQUEST = DATA.get("text");
    let keySearch = REQUEST;
    getData(keySearch);
  });

  CLEAR_BTN.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector('.search').value = "";
  });

getData(keySearch);