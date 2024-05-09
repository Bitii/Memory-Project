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
"https://lh3.googleusercontent.com/pw/AP1GczOkVVUq__Ob-yJFXlHvL94jKuQfInNTHAA2rhaDWn_mZodlEbTxVA_ZFpkWUSqVyeykAHVaQIs93Y2t8TSS9I7sphOg8GZOFqRsinspWJyfleE2o51o2OOCNaNr6X7OI0srC17aQVFMn6xRIrlzofM5=w400-h400-s-no-gm?authuser=0",
//2
"https://lh3.googleusercontent.com/pw/AP1GczNRbaVqrC4gpotxIhDJbgSKOK8A6CAUKUdqNkm0SSzbi8gR-HOTX39CvqTLdpODq2VuUjgcEszVw9uIdrm3jobYWtKkXASRjdi1A2UhbvNqNn5D-CXQA2UdO_4oIzlT7mzZ_USfEBr9tsvS8aKsqZqy=w500-h500-s-no-gm?authuser=0",
//3
"https://lh3.googleusercontent.com/pw/AP1GczNUINIO1W-OZm7qgFCenC2ILF-lMmkq7ySE35n0otouLvk5mC-BZ6voXqTuQq2KLr8uaiUVCvnfB6TWxR6h0Vf3rQLmmdu4girL-FfGy3UDLH1qyMRbWK3VitzazfAw1RrEuFf8Qx0gLPW86UYepHaU=w459-h544-s-no-gm?authuser=0",
//4
"https://lh3.googleusercontent.com/pw/AP1GczMoeTobj3uyRDqXfAslelwO5qbI3YTng4G_Q1REHNSY3hAsIMeTYKW9EDg_nEfmHPpESkdtlcwDZJNNJDkV4bqPNSVtlO6_8y3kkHoRBJGhNljN2XqL9oQFm8f9Nbi5u0SZzvLxy_8kQzZ75ysMbqxE=w418-h418-s-no-gm?authuser=0",
//5
"https://lh3.googleusercontent.com/pw/AP1GczMo0XfnigfjGBbZDl1UPJx4j1BgEt8S8W-_c8axgnYS360Jd_Eq1b6GQnAveeXwSvjwhJZth3Zxvq47AbCTcM7ilQC1T5q5rB6NJ4v-vhLV5vnV7SZDsgb_rw_FoffI7ts_5JosjVrcXzfIMFG9Gh69=w500-h500-s-no-gm?authuser=0",
//6
"https://lh3.googleusercontent.com/pw/AP1GczNuXvePuhCbfrION6PC2EtMzklJkPROAR_zrp1w8Cl5ZoD3aOix4HG0DpJUQKciL5Va0ogxCf5qm23aLtNFK8JHaBP1xTFgfZT0QQroNW9cV8XQZxseiYdaao4Z1a9DWgEGJ_6pw_faDkL7LgI10WTa=w500-h500-s-no-gm?authuser=0",
//7
"https://lh3.googleusercontent.com/pw/AP1GczP52CtRlqfXA3ODI7Qs22Qmv3bY-eHQ-O6YrjgD1k0H2vjsO03PNq-cjjWJl0bY9PLCO3CVz6CuNeOMLbtZLCVlH9XIJKnxlf7169iderj65PAFLf4uEVcLKr6CYEhlafD1kDcXmNgPy134hYzdyJM=w483-h517-s-no-gm?authuser=0",
//8
"https://lh3.googleusercontent.com/pw/AP1GczPhwnf90MCQxkMeWR8cfzc4O0H3JC8Qp3qfvv_eFg2uhZBtiTD1Crr_AaDmGaqNnb04gMSKZgiZj8X_KUfeRXBnSHwP9Bcv4EoNgwRk-MImUp2WUXCV3iH9rztwmv2fam3KQBBhVjBI-Q8u21qEsb36=w500-h500-s-no-gm?authuser=0",
//1
"https://lh3.googleusercontent.com/pw/AP1GczOkVVUq__Ob-yJFXlHvL94jKuQfInNTHAA2rhaDWn_mZodlEbTxVA_ZFpkWUSqVyeykAHVaQIs93Y2t8TSS9I7sphOg8GZOFqRsinspWJyfleE2o51o2OOCNaNr6X7OI0srC17aQVFMn6xRIrlzofM5=w400-h400-s-no-gm?authuser=0",
//2
"https://lh3.googleusercontent.com/pw/AP1GczNRbaVqrC4gpotxIhDJbgSKOK8A6CAUKUdqNkm0SSzbi8gR-HOTX39CvqTLdpODq2VuUjgcEszVw9uIdrm3jobYWtKkXASRjdi1A2UhbvNqNn5D-CXQA2UdO_4oIzlT7mzZ_USfEBr9tsvS8aKsqZqy=w500-h500-s-no-gm?authuser=0",
//3
"https://lh3.googleusercontent.com/pw/AP1GczNUINIO1W-OZm7qgFCenC2ILF-lMmkq7ySE35n0otouLvk5mC-BZ6voXqTuQq2KLr8uaiUVCvnfB6TWxR6h0Vf3rQLmmdu4girL-FfGy3UDLH1qyMRbWK3VitzazfAw1RrEuFf8Qx0gLPW86UYepHaU=w459-h544-s-no-gm?authuser=0",
//4
"https://lh3.googleusercontent.com/pw/AP1GczMoeTobj3uyRDqXfAslelwO5qbI3YTng4G_Q1REHNSY3hAsIMeTYKW9EDg_nEfmHPpESkdtlcwDZJNNJDkV4bqPNSVtlO6_8y3kkHoRBJGhNljN2XqL9oQFm8f9Nbi5u0SZzvLxy_8kQzZ75ysMbqxE=w418-h418-s-no-gm?authuser=0",
//5
"https://lh3.googleusercontent.com/pw/AP1GczMo0XfnigfjGBbZDl1UPJx4j1BgEt8S8W-_c8axgnYS360Jd_Eq1b6GQnAveeXwSvjwhJZth3Zxvq47AbCTcM7ilQC1T5q5rB6NJ4v-vhLV5vnV7SZDsgb_rw_FoffI7ts_5JosjVrcXzfIMFG9Gh69=w500-h500-s-no-gm?authuser=0",
//6
"https://lh3.googleusercontent.com/pw/AP1GczNuXvePuhCbfrION6PC2EtMzklJkPROAR_zrp1w8Cl5ZoD3aOix4HG0DpJUQKciL5Va0ogxCf5qm23aLtNFK8JHaBP1xTFgfZT0QQroNW9cV8XQZxseiYdaao4Z1a9DWgEGJ_6pw_faDkL7LgI10WTa=w500-h500-s-no-gm?authuser=0",
//7
"https://lh3.googleusercontent.com/pw/AP1GczP52CtRlqfXA3ODI7Qs22Qmv3bY-eHQ-O6YrjgD1k0H2vjsO03PNq-cjjWJl0bY9PLCO3CVz6CuNeOMLbtZLCVlH9XIJKnxlf7169iderj65PAFLf4uEVcLKr6CYEhlafD1kDcXmNgPy134hYzdyJM=w483-h517-s-no-gm?authuser=0",
//8
"https://lh3.googleusercontent.com/pw/AP1GczPhwnf90MCQxkMeWR8cfzc4O0H3JC8Qp3qfvv_eFg2uhZBtiTD1Crr_AaDmGaqNnb04gMSKZgiZj8X_KUfeRXBnSHwP9Bcv4EoNgwRk-MImUp2WUXCV3iH9rztwmv2fam3KQBBhVjBI-Q8u21qEsb36=w500-h500-s-no-gm?authuser=0",
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
