const track = document.getElementById("image-track");

// A csúszka elmozdítása a görgetés irányának megfelelően
function handleScroll(event) {
    const scrollAmount = event.deltaY || -event.detail; // Az egér görgetés mértéke különböző böngészőkben
    const currentPercentage = parseFloat(track.dataset.percentage) || 0;
    const maxDelta = window.innerWidth / 2;
    const maxPercentageChange = (scrollAmount / maxDelta) * -100;
    const nextPercentageUnconstrained = currentPercentage + maxPercentageChange;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
    track.dataset.percentage = nextPercentage;
  
    track.style.transition = "transform 0.5s ease"; // Animáció sebességének beállítása (0.5s)
    track.style.transform = `translate(${nextPercentage}%, -50%)`;
  
    for(const image of track.getElementsByClassName("image")) {
        image.style.transition = "object-position 0.5s ease"; // Animáció sebességének beállítása (0.5s)
        image.style.objectPosition = `${100 + nextPercentage}% center`;
    }
}

// Görgetés esemény figyelése
window.addEventListener('wheel', handleScroll);

const createButton = () => {
  const button = document.createElement("button");
  button.textContent = "Játék indítása";
  button.classList.add("btn");
  document.body.appendChild(button);
  return button;
}

const removeButton = (button) => {
  if (button && button.parentNode) {
    button.parentNode.removeChild(button);
  }
}

const toggleButtonPosition = (button) => {
  button.style.position = "fixed";
  button.style.left = "50%";
  button.style.top = "50%";
  button.style.transform = "translate(-50%, -50%)";
}

const toggleFullScreen = (e) => {
  const {
    top,
    left,
    width,
    height
  } = e.target.getBoundingClientRect();

  let fullScreen = e.currentTarget.cloneNode(true);
  fullScreen.style.setProperty("--inset", `${top}px auto auto ${left}px`);
  fullScreen.style.width = `${width}px`;
  fullScreen.style.height = `${height}px`;
  fullScreen.style.objectPosition = 'center';
  fullScreen.classList.add("full-screen");
  fullScreen.addEventListener("click", shrink);
  container.appendChild(fullScreen);

  const button = createButton();
  toggleButtonPosition(button);
}

const shrink = (e) => {
  const el = e.target;
  el.addEventListener("animationend", (e) => e.target.remove());
  el.style.animation = 'none';
  el.offsetHeight;
  el.style.animation = '';
  el.classList.add("shrink-down");
  
  const button = document.querySelector(".btn");
  if (button) {
    removeButton(button); // A gomb eltávolítása
  }
}

const boxes = document.querySelectorAll(".image");
const container = document.body;

boxes.forEach(box => {
  box.addEventListener("click", toggleFullScreen);
});

const images = document.querySelectorAll('.image');
