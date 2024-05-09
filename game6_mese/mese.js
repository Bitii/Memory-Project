const cards = document.querySelectorAll(".card");
const resetButton = document.querySelector("#resetButton");
const timerDisplay = document.querySelector("#timer");
const audio = document.querySelector("#audio");
const pause = document.querySelector("#pauseButton");
const play = document.querySelector("#playButton");
const congrats = document.querySelector("#congrats");
const congratsMsg = document.querySelector("#congratsMsg");
const congratsAudio = document.querySelector("#congratsAudio");

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
  timerDisplay.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

function stopTimer() {
  clearInterval(timerInterval);
}

function flipCard({ target: clickedCard }) {
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
      audio.pause();
      congratsAudio.play();
      congrats.style.display = "block";
      congratsMsg.innerHTML = `A játékot ${timerDisplay.textContent} másodperc alatt sikerült teljesítened!<br>Újraindításhoz nyomd meg a Reset gombot!`;
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
  let links = [
    //1
"https://lh3.googleusercontent.com/pw/AP1GczO-sOHJusfblVn92prkOSufLxRzGAp4fH8pACc2NRj5pMc2HKx9ZiBNaoZCx1yLCv4iAXOZ7mzxaawbTPVIrPgD9EudPlKbhImDtHEHt-DbnVboq--WLVXA-zQxzfQ8yaf8yDcm7TzLt1SW__5Lxoc4=w400-h623-s-no-gm?authuser=0",
//2
"https://lh3.googleusercontent.com/pw/AP1GczN4Jq4Ik5IQypdAPn_jqrfMr_Y-Q6JEIMoR80htuKFgHno6nFFT_zSZVHjU7JUnp-s64QoGzP5IX9Xd3ga0i1IpI2SrNPvC9l_yve6KcgngiYGH32ax03jKn_lps9N_GjR1RDsSgyt_IUaSEBasUAB6=w430-h580-s-no-gm?authuser=0",
//3
"https://lh3.googleusercontent.com/pw/AP1GczMoOHH6P8eamZodChjSI3_ZHAMuNUL8ypNeF2xplH94_xhfVt1L4iD5jyQ3TMaz_6tJBbm394hL3iUnYuvvWefXEycH4nB2YWRtMVQtK8Q0z8b01J2VsJ4VB7hbuUt3yIOSFbnaDosSnDGlndTDoWV5=w554-h451-s-no-gm?authuser=0",
//4
"https://lh3.googleusercontent.com/pw/AP1GczMd0GaCiZ9b97Dsoi9HiUEnGETgJzaLOJttb5X8wkC9tOnIkXT-oF51tneTSXLL8tqfQK-nnMggBrFffJrH8r8xpPBIoskQbwRpYWRr4BuRHsovDc0hyoQUGzbaTwBSKEUT56BXTwhow43mbZL1sJrr=w433-h577-s-no-gm?authuser=0",
//5
"https://lh3.googleusercontent.com/pw/AP1GczPqlCifF8eJdVQr1pW7Xu6ZAMF8f8K3GAKsLLd00dImI5AnHBoXFyL4HhASQgq3FlRFqH6QRwv0LNxX7UwGWM4ljYg16tAC-XGBrhrYvMozpz_bHQTlhiVIZiCJef1hQEPZRONBGC2mwhEG2mntBdbc=w404-h618-s-no-gm?authuser=0",
//6
"https://lh3.googleusercontent.com/pw/AP1GczO0ERugw4o0O7Cq-a1QoyNH0fx0k6Jjcv_wH2W1jUZTxHzVxv5ZNV49PGtP8QkhwApiJIsy8TQLvD-QDx1k-zSt9AL7oaNZWhztc4h4w8S2zc9GCCA87H6lrAN1GBL6NP3icfuT2zgPSi4DQYBGRyTH=w390-h639-s-no-gm?authuser=0",
//7
"https://lh3.googleusercontent.com/pw/AP1GczP59lx9EfbKADXgSwQ_N5LVlT-Khbcw2GU5oo6XekdFFaJ3eRNGGBscgWXR_4_Kqsi-wgbiHF92olveX48LFkwDdUEKd0ujOZ8HF_4a3vm7vBtKIaSp6HQVMZS9Zibw8PBpxQVDzac29YCDBnYG4HeT=w500-h500-s-no-gm?authuser=0",
//8
"https://lh3.googleusercontent.com/pw/AP1GczNGjkbtuLc-vP19fRsAq1IvqzI3R5z34mbwl4L5AYVp5tK7WTTPk4sYaDM197sJw6NPTxTyW1kqbrrs7TVCla7xgzLNbuI0gn7BQamo3MjZm13Fm46RZSnhjJfsQPSQDzjI8kNcziXY8ZvbkENeWMgU=w400-h537-s-no-gm?authuser=0",
//1
"https://lh3.googleusercontent.com/pw/AP1GczO-sOHJusfblVn92prkOSufLxRzGAp4fH8pACc2NRj5pMc2HKx9ZiBNaoZCx1yLCv4iAXOZ7mzxaawbTPVIrPgD9EudPlKbhImDtHEHt-DbnVboq--WLVXA-zQxzfQ8yaf8yDcm7TzLt1SW__5Lxoc4=w400-h623-s-no-gm?authuser=0",
//2
"https://lh3.googleusercontent.com/pw/AP1GczN4Jq4Ik5IQypdAPn_jqrfMr_Y-Q6JEIMoR80htuKFgHno6nFFT_zSZVHjU7JUnp-s64QoGzP5IX9Xd3ga0i1IpI2SrNPvC9l_yve6KcgngiYGH32ax03jKn_lps9N_GjR1RDsSgyt_IUaSEBasUAB6=w430-h580-s-no-gm?authuser=0",
//3
"https://lh3.googleusercontent.com/pw/AP1GczMoOHH6P8eamZodChjSI3_ZHAMuNUL8ypNeF2xplH94_xhfVt1L4iD5jyQ3TMaz_6tJBbm394hL3iUnYuvvWefXEycH4nB2YWRtMVQtK8Q0z8b01J2VsJ4VB7hbuUt3yIOSFbnaDosSnDGlndTDoWV5=w554-h451-s-no-gm?authuser=0",
//4
"https://lh3.googleusercontent.com/pw/AP1GczMd0GaCiZ9b97Dsoi9HiUEnGETgJzaLOJttb5X8wkC9tOnIkXT-oF51tneTSXLL8tqfQK-nnMggBrFffJrH8r8xpPBIoskQbwRpYWRr4BuRHsovDc0hyoQUGzbaTwBSKEUT56BXTwhow43mbZL1sJrr=w433-h577-s-no-gm?authuser=0",
//5
"https://lh3.googleusercontent.com/pw/AP1GczPqlCifF8eJdVQr1pW7Xu6ZAMF8f8K3GAKsLLd00dImI5AnHBoXFyL4HhASQgq3FlRFqH6QRwv0LNxX7UwGWM4ljYg16tAC-XGBrhrYvMozpz_bHQTlhiVIZiCJef1hQEPZRONBGC2mwhEG2mntBdbc=w404-h618-s-no-gm?authuser=0",
//6
"https://lh3.googleusercontent.com/pw/AP1GczO0ERugw4o0O7Cq-a1QoyNH0fx0k6Jjcv_wH2W1jUZTxHzVxv5ZNV49PGtP8QkhwApiJIsy8TQLvD-QDx1k-zSt9AL7oaNZWhztc4h4w8S2zc9GCCA87H6lrAN1GBL6NP3icfuT2zgPSi4DQYBGRyTH=w390-h639-s-no-gm?authuser=0",
//7
"https://lh3.googleusercontent.com/pw/AP1GczP59lx9EfbKADXgSwQ_N5LVlT-Khbcw2GU5oo6XekdFFaJ3eRNGGBscgWXR_4_Kqsi-wgbiHF92olveX48LFkwDdUEKd0ujOZ8HF_4a3vm7vBtKIaSp6HQVMZS9Zibw8PBpxQVDzac29YCDBnYG4HeT=w500-h500-s-no-gm?authuser=0",
//8
"https://lh3.googleusercontent.com/pw/AP1GczNGjkbtuLc-vP19fRsAq1IvqzI3R5z34mbwl4L5AYVp5tK7WTTPk4sYaDM197sJw6NPTxTyW1kqbrrs7TVCla7xgzLNbuI0gn7BQamo3MjZm13Fm46RZSnhjJfsQPSQDzjI8kNcziXY8ZvbkENeWMgU=w400-h537-s-no-gm?authuser=0",
  ];
  links.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    imgTag.src = links[i];

    card.addEventListener("click", flipCard);
  });
}

function resetGame() {
  clearInterval(timerInterval);
  shuffleCard();
  timerDisplay.textContent = "00:00";
}

resetButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", function () {
  congrats.style.display = "none";
});

document.addEventListener("DOMContentLoaded", shuffleCard);

//play gomb alapértelmezett körvonal hozzáadása -> zene automatikus lejátszása miatt
window.onload = function () {
  play.classList.add("outlined");
};

// zene lejátszása és megállítása
play.addEventListener("click", function () {
  audio.play();
});

pause.addEventListener("click", function () {
  audio.pause();
});

// play gomb megnyomásakor megjelenik a körvonal, pause gombról eltűnik
audio.onplay = function () {
  play.classList.add("outlined");
  pause.classList.remove("outlined");
};

// pause gomb megnyomásakor megjelenik a körvonal, play gombról eltűnik
audio.onpause = function () {
  play.classList.remove("outlined");
  pause.classList.add("outlined");
};
