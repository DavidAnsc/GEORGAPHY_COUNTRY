
// MARK: AI PROMPTS
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

let lastScrollY = 0;
const scrollThreshold = 400; // Minimum scroll distance required to move past
const destinyPosition = 1450; // Destiny section position
const deadzoneStart = destinyPosition - 20; // Where the deadzone begins
let accumulatedScroll = 0;
let deadzoneReleased = false;
let ignoreDeadzone = false; // used when programmatic scroll (e.g., Explore More)


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

let lastScrollTop = 0;
let isHidden = false;
const container = document.querySelector('.container');
const logoBtn = document.getElementById('logo-btn');
const exploreMoreBtn = document.querySelector('.explore-more');

// Background toggle based on destiny section position
const destinySection = document.querySelector('.slider');

window.addEventListener('scroll', () => {
    // Toggle background based on destiny section position
    if (destinySection) {
        const destinyTop = destinySection.getBoundingClientRect().top;
        
        if (destinyTop > 0) {
            document.body.classList.add('above-destiny');
        } else {
            document.body.classList.remove('above-destiny');
        }
    }
});

// Scroll detection FOR NAVBAR HIDE/SHOW
window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Only trigger hide/show after scrolling past 800px
    if (currentScroll > 500) {
        if (currentScroll > lastScrollTop && !isHidden) {
            // Scrolling DOWN
            container.classList.remove('visible');
            container.classList.add('hidden');
            isHidden = true;
        } else if (currentScroll < lastScrollTop && isHidden) {
            // Scrolling UP
            container.classList.remove('hidden');
            container.classList.add('visible');
            isHidden = false;
        }
    } else {
        // Always visible when near top
        if (isHidden) {
            container.classList.remove('hidden');
            container.classList.add('visible');
            isHidden = false;
        }
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Logo button click handler
window.scrollTo({ top: 0, behavior: 'smooth' });
if (logoBtn) {
  logoBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}





// MARK: REAL HUMAN COMMANDS 😅
var industryButton = document.getElementById("industryButton");
var exploreTechButton = document.getElementById("button1");
var investButton = document.getElementById("button2");
var sustainabilityButton = document.getElementById("sustainabilityButton");

sustainabilityButton.onclick = function() {
  window.location.href = "title_pages/resources.html";
}
sustainabilityButton.onmouseover = function() {
  sustainabilityButton.style.backgroundColor = "rgb(23, 196, 58)";
}
sustainabilityButton.onmouseout = function() {
  sustainabilityButton.style.backgroundColor = "rgb(56, 168, 34)";
}


industryButton.onclick = function() {
  window.location.href = "title_pages/industries.html";
}
industryButton.onmouseover = function() {
  industryButton.style.backgroundColor = "rgb(41, 216, 207)";
}
industryButton.onmouseout = function() {
  industryButton.style.backgroundColor = "rgb(42, 186, 188)";
}


investButton.onclick = function() {
  window.location.href = "subpages/nothing.html";
}
investButton.onmouseover = function() {
  investButton.style.backgroundColor = "rgb(222, 231, 42)";
}
investButton.onmouseout = function() {
  investButton.style.backgroundColor = "rgb(140, 186, 0)";
}


exploreTechButton.onclick = function() {
  window.location.href = "title_pages/industries.html";
}
exploreTechButton.onmouseover = function() {
  exploreTechButton.style.backgroundColor = "rgb(224, 85, 255)";
}
exploreTechButton.onmouseout = function() {
  exploreTechButton.style.backgroundColor = "rgb(149, 61, 231)";
}

// Pointer character trail for top section of homepage
const trailChars = ['>', '_', '=', '<'];
const trailLayer = document.createElement('div');
trailLayer.className = 'pointer-trail-layer';
document.body.appendChild(trailLayer);

let lastTrailTime = 0;
const trailIntervalMs = 18;
const trailWidth = 24;
const minParticleDistance = 18;
const textGrid = 12;
const activeParticleAnchors = [];
let lastPointerX = null;
let lastPointerY = null;

function isInHomeTopSection(clientY) {
  if (!slider) return false;
  const sliderTop = slider.getBoundingClientRect().top;
  return clientY < sliderTop;
}

function removeExpiredAnchors(now) {
  for (let i = activeParticleAnchors.length - 1; i >= 0; i -= 1) {
    if (now - activeParticleAnchors[i].time > 360) {
      activeParticleAnchors.splice(i, 1);
    }
  }
}

function canPlaceParticle(x, y) {
  const minDistanceSq = minParticleDistance * minParticleDistance;
  return activeParticleAnchors.every((anchor) => {
    const dx = anchor.x - x;
    const dy = anchor.y - y;
    return (dx * dx) + (dy * dy) > minDistanceSq;
  });
}

function snapToTextGrid(value) {
  return Math.round(value / textGrid) * textGrid;
}

function spawnParticle(x, y, now, driftX = 0, driftY = 0) {
  const alignedX = snapToTextGrid(x);
  const alignedY = snapToTextGrid(y);

  if (!canPlaceParticle(alignedX, alignedY)) return;

  const particle = document.createElement('span');
  particle.className = 'trail-particle';
  particle.textContent = trailChars[Math.floor(Math.random() * trailChars.length)];
  particle.style.left = `${alignedX}px`;
  particle.style.top = `${alignedY}px`;
  particle.style.setProperty('--drift-x', `${driftX}px`);
  particle.style.setProperty('--drift-y', `${driftY}px`);
  trailLayer.appendChild(particle);

  activeParticleAnchors.push({ x: alignedX, y: alignedY, time: now });
  setTimeout(() => {
    particle.remove();
  }, 1250);
}

window.addEventListener('pointermove', (event) => {
  const now = performance.now();
  if (now - lastTrailTime < trailIntervalMs) return;
  if (!isInHomeTopSection(event.clientY)) return;

  removeExpiredAnchors(now);
  lastTrailTime = now;

  if (lastPointerX === null || lastPointerY === null) {
    lastPointerX = event.clientX;
    lastPointerY = event.clientY;
    spawnParticle(event.clientX, event.clientY, now);
    return;
  }

  const dx = event.clientX - lastPointerX;
  const dy = event.clientY - lastPointerY;
  const magnitude = Math.hypot(dx, dy) || 1;
  const travelX = dx / magnitude;
  const travelY = dy / magnitude;
  const normalX = -dy / magnitude;
  const normalY = dx / magnitude;

  const offsets = [-trailWidth / 2, 0, trailWidth / 2];
  offsets.forEach((offset) => {
    const spawnX = event.clientX + (normalX * offset);
    const spawnY = event.clientY + (normalY * offset);
    const driftX = -travelX * (14 + Math.abs(offset) * 0.2);
    const driftY = -travelY * (14 + Math.abs(offset) * 0.2);
    spawnParticle(spawnX, spawnY, now, driftX, driftY);
  });

  lastPointerX = event.clientX;
  lastPointerY = event.clientY;
});
