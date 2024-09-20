const PLAYLIST = [
    {
        src: 'assets/audio/Highway To Hell.mp3',
        singer: 'ACDC',
        song: 'Highway To Hell',
        avatar: 'assets/images/acdc.jpg',
    },
    {
        src: 'assets/audio/Carry On Wayward Son.mp3',
        singer: 'Kansas',
        song: 'Carry On Wayward Son',
        avatar: 'assets/images/kansas.jpg',
    },
    {
        src: 'assets/audio/American Idiot.mp3',
        singer: 'Green Day',
        song: 'American Idiot',
        avatar: 'assets/images/green day.jpg',
    },
    {
        src: 'assets/audio/St. Anger.mp3',
        singer: 'Metallica',
        song: 'St. Anger',
        avatar: 'assets/images/metallica.jpg',
    },
    {
        src: 'assets/audio/Gone Away.mp3',
        singer: 'The Offspring',
        song: 'Gone Away',
        avatar: 'assets/images/offspring.jpg',
    }
]

const PREVIOUS = document.querySelector('.previous');
const PLAY = document.querySelector('.playing');
const NEXT = document.querySelector('.next');

const SINGER = document.querySelector('.singer');
const SONG = document.querySelector('.song');
const AVATAR = document.querySelector('.avatar');
const BACKGROUND = document.querySelector('.wrapper');

const DURATION = document.querySelector('.duration');
const CURRENT = document.querySelector('.current');
const SEEK_BAR = document.querySelector('.seek-bar');

let  audio = new Audio();
let playing = false;
let index = 0;

audio.src = PLAYLIST[index].src;

function loadSong() {
    SINGER.innerHTML = PLAYLIST[index].singer;
    SONG.innerHTML = PLAYLIST[index].song;
    AVATAR.style.backgroundImage = `url("${PLAYLIST[index].avatar}")`;
    BACKGROUND.style.backgroundImage = `url("${PLAYLIST[index].avatar}")`;
}

function playSong() {
    PLAY.classList.toggle('played');
    if (playing === false) {
        audio.play();
        playing = true;
        loadSong(index);
    } else {
        audio.pause();
        playing = false;
    }
}

PLAY.addEventListener('click', playSong);
 
loadSong(index);

