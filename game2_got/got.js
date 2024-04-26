const cards = document.querySelectorAll(".card");
const resetButton = document.querySelector("#resetButton");
const timerDisplay = document.querySelector("#timer");
const audio = document.querySelector("#audio");
const pause = document.querySelector("#pauseButton");
const play = document.querySelector("#playButton");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = true; 
let startTime, elapsedTime, timerInterval;

function startTimer() {
    if (!startTime) {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function updateTimer() {
    elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function stopTimer() {
    clearInterval(timerInterval);
}

function flipCard({target: clickedCard}) {
    if (!disableDeck && cardOne !== clickedCard) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            cardOne = clickedCard;
            startTimer(); 
            return;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matched++;
        if (matched == 8) {
            stopTimer();
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        disableDeck = false; 
    } else {
        setTimeout(() => {
            cardOne.classList.add("shake");
            cardTwo.classList.add("shake");
        }, 400);

        setTimeout(() => {
            cardOne.classList.remove("shake", "flip");
            cardTwo.classList.remove("shake", "flip");
            cardOne = cardTwo = "";
            disableDeck = false; 
        }, 1200);
    }
}

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    startTime = null; 
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `./game2_got/got_images/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}

function resetGame() {
    clearInterval(timerInterval);
    shuffleCard();
    timerDisplay.textContent = "00:00"; 
}

resetButton.addEventListener("click", resetGame);

document.addEventListener("DOMContentLoaded", shuffleCard);

//play gomb alapértelmezett körvonal hozzáadása -> zene automatikus lejátszása miatt
window.onload = function () {
    play.classList.add("outlined");
}

// zene lejátszása és megállítása
play.addEventListener("click", function () { 
    audio.play();
});

pause.addEventListener("click", function () { 
    audio.pause();
});

// Event listener for mute button
pause.addEventListener("click", function() {
    audio.muted = !audio.muted;
    pause.classList.toggle("outlined");
});

// Event handler for when audio starts playing
audio.onplay = function() {
    play.classList.add("outlined");
    pause.classList.remove("outlined");
};

// Event handler for when audio is paused
audio.onpause = function() {
    play.classList.remove("outlined");
    if (audio.muted) {
        pause.classList.add("outlined");
    }
};