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
"https://lh3.googleusercontent.com/pw/AP1GczNSPgeEd-qpW3a9OtDdhfedIcdDnb06c6iSiH34kPn4MeIiNAhvrayLDlER28yJNWraE1CvKz4nFRxGP9DC-18hhMIf2QApRb1-puUR3LYuPH14TOc8bzrX7JzTJmWJebvCsWbkmQa3lhM6SWdmcw_e=w423-h590-s-no-gm?authuser=0",
//2
"https://lh3.googleusercontent.com/pw/AP1GczMiOz51K6gks1aLTW3D9TbBqWK6m_Z2aXxJgRoF6Hqny77W7_-aTmyVEZw-Wq7gDbbJVe4tr9DD0KNCqRTRKucl7XRuVg9ldUMViNYGjcxYiUcN4rKFayeIADPSX4PD9hyLnGzubZZjSwAxmlJBEz8F=w476-h525-s-no-gm?authuser=0",
//3
"https://lh3.googleusercontent.com/pw/AP1GczO3k5L9Et5nWbBJoo1F-pD6HNNebnhEz86zLSzWN6kIXKOaE80wYI_fZuZEXaQJ-DKN7XzNOtTZH3AFRB9ON0V1UVWr5ocHbi0deiuHHITRgFKW3Q7O2gwTJLMOSLKkrDjHL9AUGzIKojHvmzW3xvNc=w421-h593-s-no-gm?authuser=0",
//4
"https://lh3.googleusercontent.com/pw/AP1GczOIZ0SvR5IpR1VA4wrqGRsXS-JpAyeEOa47OMVCUULGx1Uz9swiHub2LIsjBVc-qPWrkApB6gwxBXaERPArCsRxEZuNMMiWutuyg7H2HVXe8jofdk7DHPquuBFtwC7BlTjerwYgOMIeIl1QKlqKeZ6o=w415-h602-s-no-gm?authuser=0",
//5
"https://lh3.googleusercontent.com/pw/AP1GczNFI1fccw-UPRHFHQNXFezEhFEBoVJNIIGysE828kejN5L7gcj_nWVpgCppKBvTr0azLJR5gC7L95HCKe-IBKl0VRlLJy9dE8G9m68d3-lxT5AyhOR1tkSIKfsfKrLrPDiJL1sT8uIj75Fmz6a_QS1w=w500-h500-s-no-gm?authuser=0",
//6
"https://lh3.googleusercontent.com/pw/AP1GczMRiFM3mShevS1Di2aWZqadsNDWNhZXm7vv35fEwfpmlAx8vvq1xOUVVCPqxWOGgINoqZMRLGqwSch8MWavXT9pVnjLuWkiBOQJtzSyGlT_C94tXGhyW52rQmIZZr1jB7e9cxHFh6ICveuzj3QqOPH5=w439-h568-s-no-gm?authuser=0",
//7
"https://lh3.googleusercontent.com/pw/AP1GczMDG-qROgoCVj4hNIohzcV626EWXPTbijdpaLDUW3RWZZGW0_iODVlzgs1PC88K-ShNrplKDH-wozT8bpVTk0qeqCeDelv2NApx0eVMC8m47WJPdzrP3hG2jFjHZBVNYs-Sz2bjvb52vIIAkCtlutce=w433-h577-s-no-gm?authuser=0",
//8
"https://lh3.googleusercontent.com/pw/AP1GczMYr6rhcVz9JPzprd58rFS4HVVK3T_-4QnFcSXSxXakSKYuh9XkNIvRqlPS2k5TD2dOZ1Nmvt9EY_xOb86Ao0_HJBAUTSqCugJwLfqVl0lCWoFf480mAymKww_WSiGI2YghSu1BkEQvv1NGvD_Hw_ET=w433-h577-s-no-gm?authuser=0",
//1
"https://lh3.googleusercontent.com/pw/AP1GczNSPgeEd-qpW3a9OtDdhfedIcdDnb06c6iSiH34kPn4MeIiNAhvrayLDlER28yJNWraE1CvKz4nFRxGP9DC-18hhMIf2QApRb1-puUR3LYuPH14TOc8bzrX7JzTJmWJebvCsWbkmQa3lhM6SWdmcw_e=w423-h590-s-no-gm?authuser=0",
//2
"https://lh3.googleusercontent.com/pw/AP1GczMiOz51K6gks1aLTW3D9TbBqWK6m_Z2aXxJgRoF6Hqny77W7_-aTmyVEZw-Wq7gDbbJVe4tr9DD0KNCqRTRKucl7XRuVg9ldUMViNYGjcxYiUcN4rKFayeIADPSX4PD9hyLnGzubZZjSwAxmlJBEz8F=w476-h525-s-no-gm?authuser=0",
//3
"https://lh3.googleusercontent.com/pw/AP1GczO3k5L9Et5nWbBJoo1F-pD6HNNebnhEz86zLSzWN6kIXKOaE80wYI_fZuZEXaQJ-DKN7XzNOtTZH3AFRB9ON0V1UVWr5ocHbi0deiuHHITRgFKW3Q7O2gwTJLMOSLKkrDjHL9AUGzIKojHvmzW3xvNc=w421-h593-s-no-gm?authuser=0",
//4
"https://lh3.googleusercontent.com/pw/AP1GczOIZ0SvR5IpR1VA4wrqGRsXS-JpAyeEOa47OMVCUULGx1Uz9swiHub2LIsjBVc-qPWrkApB6gwxBXaERPArCsRxEZuNMMiWutuyg7H2HVXe8jofdk7DHPquuBFtwC7BlTjerwYgOMIeIl1QKlqKeZ6o=w415-h602-s-no-gm?authuser=0",
//5
"https://lh3.googleusercontent.com/pw/AP1GczNFI1fccw-UPRHFHQNXFezEhFEBoVJNIIGysE828kejN5L7gcj_nWVpgCppKBvTr0azLJR5gC7L95HCKe-IBKl0VRlLJy9dE8G9m68d3-lxT5AyhOR1tkSIKfsfKrLrPDiJL1sT8uIj75Fmz6a_QS1w=w500-h500-s-no-gm?authuser=0",
//6
"https://lh3.googleusercontent.com/pw/AP1GczMRiFM3mShevS1Di2aWZqadsNDWNhZXm7vv35fEwfpmlAx8vvq1xOUVVCPqxWOGgINoqZMRLGqwSch8MWavXT9pVnjLuWkiBOQJtzSyGlT_C94tXGhyW52rQmIZZr1jB7e9cxHFh6ICveuzj3QqOPH5=w439-h568-s-no-gm?authuser=0",
//7
"https://lh3.googleusercontent.com/pw/AP1GczMDG-qROgoCVj4hNIohzcV626EWXPTbijdpaLDUW3RWZZGW0_iODVlzgs1PC88K-ShNrplKDH-wozT8bpVTk0qeqCeDelv2NApx0eVMC8m47WJPdzrP3hG2jFjHZBVNYs-Sz2bjvb52vIIAkCtlutce=w433-h577-s-no-gm?authuser=0",
//8
"https://lh3.googleusercontent.com/pw/AP1GczMYr6rhcVz9JPzprd58rFS4HVVK3T_-4QnFcSXSxXakSKYuh9XkNIvRqlPS2k5TD2dOZ1Nmvt9EY_xOb86Ao0_HJBAUTSqCugJwLfqVl0lCWoFf480mAymKww_WSiGI2YghSu1BkEQvv1NGvD_Hw_ET=w433-h577-s-no-gm?authuser=0",
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
