const slider = document.querySelector('.slider');
const track = document.querySelector('.track');

const distance = track.scrollWidth - slider.clientWidth;

track.style.animation = `scroll-once 25s linear forwards`;
track.style.setProperty('--end', `-${distance}px`);