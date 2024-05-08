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
    //Link1
      "https://lh3.googleusercontent.com/pw/AP1GczOe3H2X-PB0UR_otlrfAcigS9iQloGlHJZTuqftvQQw44NRNN3oTz_FuUAxrXlQKxH2qJKtK5yPasOLp4_8stcULlSnsjLJZ0JHrhMihlCfd2EVfO9nW6VSOfPos3wwxF2fQOgXvInP4QnCsrmUm5t2=w433-h577-s-no",
      //Link2
      "https://lh3.googleusercontent.com/pw/AP1GczMO_AW0mp9cBdL56SyROMdET7t8XjocaHDWa2xURete82JsoaiVViPutCCBHlU-H-bxCCaxc3wvXBhHRT0v9oJl-NxNRG9zNKkBMoi6OT0e3caM-d5YgG4hTUi4NicIUTlBg5ENgD4NPWmzC2SdPrKo=w458-h544-s-no",
      //Link3
      "https://lh3.googleusercontent.com/pw/AP1GczO_sHPTb5znHpIw_zE-OciO--WA4whf7Pl0ySHb3VI1onruxOSGmZ5j5qHWtLXS3oBWFrEEXcCshhSPIecE5K77HNF--N1G3BJs-_s0TBZCDDC3lgJ0dT0Ty5ndlpBUWEN06z5seGKCvYDPauY2tPCf=w473-h527-s-no",
      //Link4
      "https://lh3.googleusercontent.com/pw/AP1GczOLeINJWodrVp5-gct8YRztC6jB0Y43p70nVFPEDTcnHsiZ_eYATQopnVrKfAhnH83v5TFkDrjzcJIgaakbr8mwax0i3d6MlAp1uP7udccRBVZjcDIr2JY1hRU2DDXxOJxnVTBPCPlG00RKTsUDMJ_q=w500-h500-s-no",
      //Link5
      "https://lh3.googleusercontent.com/pw/AP1GczNGvw6Lop0IZH9KeiL7UPhWYaZDDE5PXOQCowQpY-Hw4TXtvGC7TPV-1j08ienilPbptc32qbByppTi99Wp1bwUMBjkNAWwakR0AwLb9-z1OUFUW8yeaU3to6fq5FIdZRDfAwqqBJoAKuY8g0TITY4A=w456-h547-s-no",
      //Link6
      "https://lh3.googleusercontent.com/pw/AP1GczMHSC1gd4zJiaOLOOTleu7ClCRNmG5aW1FW0ND6dfLLbm_Q9iIJaGZiwLXeQXnHl6DD8sDmhP_IoJh-4JmAQrygBL6yYSUNaZCGDtAc_YXEnLn9k3YuRiy3lHjMCR3tuloHBbjc4I1BcvWD2c2ixq--=w421-h592-s-no",
      //Link7
      "https://lh3.googleusercontent.com/pw/AP1GczOIY06x7hKfH58jkYbzvRe2IFIRk3etA9PpNOoprNd8p148sHnQ_foPM5gHI3AO2MgwpUtwt698HgHJH4_9XPUq0eJixA-4NZGHbJGgan4R3FiVB4iFmV_egdosY74v2iQtM1onDmWq5Xptix80D6aM=w433-h577-s-no-gm?authuser=0",
      //Link8
      "https://lh3.googleusercontent.com/pw/AP1GczO7wOV-NDArHMiLXFklx1-iG9ZoqdZ68fmSvlQxKTBEPGog47joXYCRdFqljdXXqTQhTS23_lGABT8JWZAlxolCVThI48fKfPQx9QbwH8B5M3hrI1OeVPIpVhYIYfdJVEmvdFsPJ685aOOsveN67vqc=w500-h500-s-no-gm?authuser=0",
    //Link1
    "https://lh3.googleusercontent.com/pw/AP1GczOe3H2X-PB0UR_otlrfAcigS9iQloGlHJZTuqftvQQw44NRNN3oTz_FuUAxrXlQKxH2qJKtK5yPasOLp4_8stcULlSnsjLJZ0JHrhMihlCfd2EVfO9nW6VSOfPos3wwxF2fQOgXvInP4QnCsrmUm5t2=w433-h577-s-no",
    //Link2
    "https://lh3.googleusercontent.com/pw/AP1GczMO_AW0mp9cBdL56SyROMdET7t8XjocaHDWa2xURete82JsoaiVViPutCCBHlU-H-bxCCaxc3wvXBhHRT0v9oJl-NxNRG9zNKkBMoi6OT0e3caM-d5YgG4hTUi4NicIUTlBg5ENgD4NPWmzC2SdPrKo=w458-h544-s-no",
    //Link3
    "https://lh3.googleusercontent.com/pw/AP1GczO_sHPTb5znHpIw_zE-OciO--WA4whf7Pl0ySHb3VI1onruxOSGmZ5j5qHWtLXS3oBWFrEEXcCshhSPIecE5K77HNF--N1G3BJs-_s0TBZCDDC3lgJ0dT0Ty5ndlpBUWEN06z5seGKCvYDPauY2tPCf=w473-h527-s-no",
    //Link4
    "https://lh3.googleusercontent.com/pw/AP1GczOLeINJWodrVp5-gct8YRztC6jB0Y43p70nVFPEDTcnHsiZ_eYATQopnVrKfAhnH83v5TFkDrjzcJIgaakbr8mwax0i3d6MlAp1uP7udccRBVZjcDIr2JY1hRU2DDXxOJxnVTBPCPlG00RKTsUDMJ_q=w500-h500-s-no",
    //Link5
    "https://lh3.googleusercontent.com/pw/AP1GczNGvw6Lop0IZH9KeiL7UPhWYaZDDE5PXOQCowQpY-Hw4TXtvGC7TPV-1j08ienilPbptc32qbByppTi99Wp1bwUMBjkNAWwakR0AwLb9-z1OUFUW8yeaU3to6fq5FIdZRDfAwqqBJoAKuY8g0TITY4A=w456-h547-s-no",
    //Link6
    "https://lh3.googleusercontent.com/pw/AP1GczMHSC1gd4zJiaOLOOTleu7ClCRNmG5aW1FW0ND6dfLLbm_Q9iIJaGZiwLXeQXnHl6DD8sDmhP_IoJh-4JmAQrygBL6yYSUNaZCGDtAc_YXEnLn9k3YuRiy3lHjMCR3tuloHBbjc4I1BcvWD2c2ixq--=w421-h592-s-no",
    //Link7
    "https://lh3.googleusercontent.com/pw/AP1GczOIY06x7hKfH58jkYbzvRe2IFIRk3etA9PpNOoprNd8p148sHnQ_foPM5gHI3AO2MgwpUtwt698HgHJH4_9XPUq0eJixA-4NZGHbJGgan4R3FiVB4iFmV_egdosY74v2iQtM1onDmWq5Xptix80D6aM=w433-h577-s-no-gm?authuser=0",
    //Link8
    "https://lh3.googleusercontent.com/pw/AP1GczO7wOV-NDArHMiLXFklx1-iG9ZoqdZ68fmSvlQxKTBEPGog47joXYCRdFqljdXXqTQhTS23_lGABT8JWZAlxolCVThI48fKfPQx9QbwH8B5M3hrI1OeVPIpVhYIYfdJVEmvdFsPJ685aOOsveN67vqc=w500-h500-s-no-gm?authuser=0",
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
