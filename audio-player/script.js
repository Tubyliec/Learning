import {PLAYLIST} from './playlist.js'

const PREVIOUS = document.querySelector('.previous');
const PLAY = document.querySelector('.playing');
const NEXT = document.querySelector('.next');

const SINGER = document.querySelector('.singer');
const SONG = document.querySelector('.song');
const AVATAR = document.querySelector('.avatar');
const BACKGROUND = document.querySelector('.wrapper');

const DURATION = document.querySelector('.duration');
const CURRENT = document.querySelector('.current');
const SEEK_BAR = document.querySelector('.seek_bar');

let  audio = new Audio();
let playing = false;
let index = 0;

audio.src = PLAYLIST[index].src;

function formatTime(time) {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    if (min < 10) {
        min = `0${min}`;
    }
    if (sec < 10) {
        sec = `0${sec}`
    }
    return `${min} : ${sec}`;
}

function loadSong() {
    SINGER.innerHTML = PLAYLIST[index].singer;
    SONG.innerHTML = PLAYLIST[index].song;
    AVATAR.style.backgroundImage = `url("${PLAYLIST[index].avatar}")`;
    BACKGROUND.style.backgroundImage = `url("${PLAYLIST[index].avatar}")`;

    audio.addEventListener('loadedmetadata', () => {
        DURATION.innerHTML = formatTime(audio.duration);
        SEEK_BAR.max = Math.floor(audio.duration);
    })
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

    setInterval(function () {
        SEEK_BAR.value = audio.currentTime;
        CURRENT.innerHTML = formatTime(audio.currentTime);
    }, 500)
}

function changeTrack() {
    audio.src = PLAYLIST[index].src;
    PLAY.classList.remove('played');
    playing = false;
    loadSong(index);
    playSong();
}

function playNext() {
    index++
    if (index >= PLAYLIST.length) {
        index = 0;
    }
    changeTrack()
}

function playPrevious() {
    index--
    if (index < 0 ) {
        index = PLAYLIST.length - 1;
    }
    changeTrack()
}

loadSong(index);

PLAY.addEventListener('click', playSong);
SEEK_BAR.addEventListener('change', function () {
    audio.currentTime = SEEK_BAR.value;
});
audio.addEventListener('ended', playNext);
NEXT.addEventListener('click', playNext);
PREVIOUS.addEventListener('click', playPrevious);



