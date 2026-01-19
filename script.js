const slider = document.querySelector('.slider');
const track = document.querySelector('.track');
const titleVideo = document.querySelector('.title-video');

const distance = track.scrollWidth - slider.clientWidth;

track.style.animation = `scroll-once 25s linear forwards`;
track.style.setProperty('--end', `-${distance}px`);

// Pause slider animation when not visible
if (slider && track) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      track.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
    });
  }, { threshold: 0.1 });

  observer.observe(slider);
}

// Scroll deadzone - require a deliberate scroll to pass the destiny section
let lastScrollY = 0;
const scrollThreshold = 400; // Minimum scroll distance required to move past
const destinyPosition = 1200; // Destiny section position
const deadzoneStart = destinyPosition - 80; // Where the deadzone begins
let accumulatedScroll = 0;
let deadzoneReleased = false;
let ignoreDeadzone = false; // used when programmatic scroll (e.g., Explore More)

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const scrollDelta = scrollPosition - lastScrollY;
  const scrollingDown = scrollDelta > 0;
  const overlayPosition = 500; // Position where overlay/Your Life's Destiny starts

  const inDeadzone = scrollPosition >= deadzoneStart && scrollPosition < destinyPosition;

  if (!ignoreDeadzone && scrollingDown && inDeadzone && !deadzoneReleased) {
    accumulatedScroll += Math.abs(scrollDelta);

    if (accumulatedScroll < scrollThreshold) {
      // Not enough intent yet; hold at the start of the deadzone
      window.scrollTo(0, deadzoneStart);
    } else {
      // User scrolled enough; release the lock until they scroll back above the start
      deadzoneReleased = true;
      accumulatedScroll = 0;
    }
  }

  if (!inDeadzone) {
    // Reset when outside deadzone so re-entering requires intent again
    deadzoneReleased = false;
    accumulatedScroll = 0;
  }

  // If we were ignoring deadzone (programmatic scroll), stop ignoring once above start
  if (ignoreDeadzone && scrollPosition <= deadzoneStart) {
    ignoreDeadzone = false;
  }

  lastScrollY = scrollPosition;

  // Hide video when scrolled down to overlay section
  if (scrollPosition > overlayPosition) {
    titleVideo.style.opacity = '0';
  } else {
    titleVideo.style.opacity = '1';
  }
});

// Scroll to top when Explore More button is clicked
const exploreButton = document.querySelector('.explore-more');
if (exploreButton) {
  exploreButton.addEventListener('click', () => {
    // allow smooth scroll to top without deadzone snap
    ignoreDeadzone = true;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}