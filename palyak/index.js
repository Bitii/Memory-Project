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
