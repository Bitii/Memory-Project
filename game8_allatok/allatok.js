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
"https://lh3.googleusercontent.com/pw/AP1GczNLCoZWmpSbYywyF7ljd4RofPu700C8S_m39p4UuDqAeQBfHtfxRlv15MO3AF5kgwEAjg_X_fLF1zrGVBEQ8eEeaVqgfEiOW0d0FpaSw1PXtzmCKju9bQMDSlwxTxhttVkBDGuOUeOcgvp8SA9o0cpZ=w500-h500-s-no-gm?authuser=0",
//2
"https://lh3.googleusercontent.com/pw/AP1GczPw_wVXf2k6zax21jM0slCoLrSr03eU0JtGpW178NkX3QTQWtfBAwvvhJopdhvwNB2Jv2GgNhgEnDEpA53rtXKAjc_WtOIRPZFmXS1QsyA2VrR6_Yh0kP0ZZYOSEXbBrJejL5vW2dPfreCkViAqli5K=w500-h500-s-no-gm?authuser=0",
//3
"https://lh3.googleusercontent.com/pw/AP1GczPwmaccK27hOXsObNkaRdsN1Mp4Gde257vvV4mFO2CTBRr6-iY05HhSyFKik_xw1HBeohPMkbL460etpwQtumZ4pF2bHOxzN2LGJYgBd2jCuxzDzinKqhZ8eh4KjQCKtlOusimS82iBv6tZtB5s5Jdj=w433-h577-s-no-gm?authuser=0",
//4
"https://lh3.googleusercontent.com/pw/AP1GczP9MVKWpy7xsg3KSJHNiYDNTCETmB_EtQ2_BqSYVOytQ2wAFdY8k39sCuadz8WW0XrMAGig6Dk4BL3uAISp-KwxblvbYkf8wD6VHgADsfATwJxUobORRWowwjNAWtc1SxeUvldP7Ej_Max6_EO7GY66=w464-h538-s-no-gm?authuser=0",
//5
"https://lh3.googleusercontent.com/pw/AP1GczPXZAJp0iH4W8LXEUFu3s4Dacbrq6RpgpVPcA8amifyWSVrjEXor1U-ILa1KnKT5QzWESK2Vd_tR7hYJoSuCfW4hGPDfzEJAwKZiHOH5nja8FM8YcthhkJnY37OoMG_qnVQqZFOzbO27Hcc1lz-w-Wu=w408-h612-s-no-gm?authuser=0",
//6
"https://lh3.googleusercontent.com/pw/AP1GczObHZmxmIOFqar5Rk05z5KbkFMs9gR3HloeRIGuTUuHFOL7RfvOtN_fuWsZztWYdO1i-HNH6_A5_HQ96P1OUxBPeHCC_U6Pd4OwMXuqYVB4PUR8qKTIstmxaG-gGZj1JyE_RC5_rzt9uLSIUAxlnTqF=w563-h375-s-no-gm?authuser=0",
//7
"https://lh3.googleusercontent.com/pw/AP1GczO6CMRt4chryuZifGA2tRIfY-Kd5H-53e2MF5SmB1GKEk_B2Huu1rZDRzt_q1KOO_ew_GI4B44d6k6aHM1cv8Zxn10tLu_dRjSnGw8KzrPCI4HuuH6aWYCxr2y277723rku5ueD2idh26gaEEMwu1Gh=w385-h358-s-no-gm?authuser=0",
//8
"https://lh3.googleusercontent.com/pw/AP1GczOjb6HcWqr6Xz7oFjYuaj6NirLZRsbTOkidbipjJML85PGRg74_0rXFIyQbSOywE9tjHstpwOqZg2ssN4WWYnim4wyDHfs0Ujl44pBRjJ8358MEs_9utsnQb0jPDWxEAOOq5TzXef2X_ISESDsOHKNt=w432-h577-s-no-gm?authuser=0",
//1
"https://lh3.googleusercontent.com/pw/AP1GczNLCoZWmpSbYywyF7ljd4RofPu700C8S_m39p4UuDqAeQBfHtfxRlv15MO3AF5kgwEAjg_X_fLF1zrGVBEQ8eEeaVqgfEiOW0d0FpaSw1PXtzmCKju9bQMDSlwxTxhttVkBDGuOUeOcgvp8SA9o0cpZ=w500-h500-s-no-gm?authuser=0",
//2
"https://lh3.googleusercontent.com/pw/AP1GczPw_wVXf2k6zax21jM0slCoLrSr03eU0JtGpW178NkX3QTQWtfBAwvvhJopdhvwNB2Jv2GgNhgEnDEpA53rtXKAjc_WtOIRPZFmXS1QsyA2VrR6_Yh0kP0ZZYOSEXbBrJejL5vW2dPfreCkViAqli5K=w500-h500-s-no-gm?authuser=0",
//3
"https://lh3.googleusercontent.com/pw/AP1GczPwmaccK27hOXsObNkaRdsN1Mp4Gde257vvV4mFO2CTBRr6-iY05HhSyFKik_xw1HBeohPMkbL460etpwQtumZ4pF2bHOxzN2LGJYgBd2jCuxzDzinKqhZ8eh4KjQCKtlOusimS82iBv6tZtB5s5Jdj=w433-h577-s-no-gm?authuser=0",
//4
"https://lh3.googleusercontent.com/pw/AP1GczP9MVKWpy7xsg3KSJHNiYDNTCETmB_EtQ2_BqSYVOytQ2wAFdY8k39sCuadz8WW0XrMAGig6Dk4BL3uAISp-KwxblvbYkf8wD6VHgADsfATwJxUobORRWowwjNAWtc1SxeUvldP7Ej_Max6_EO7GY66=w464-h538-s-no-gm?authuser=0",
//5
"https://lh3.googleusercontent.com/pw/AP1GczPXZAJp0iH4W8LXEUFu3s4Dacbrq6RpgpVPcA8amifyWSVrjEXor1U-ILa1KnKT5QzWESK2Vd_tR7hYJoSuCfW4hGPDfzEJAwKZiHOH5nja8FM8YcthhkJnY37OoMG_qnVQqZFOzbO27Hcc1lz-w-Wu=w408-h612-s-no-gm?authuser=0",
//6
"https://lh3.googleusercontent.com/pw/AP1GczObHZmxmIOFqar5Rk05z5KbkFMs9gR3HloeRIGuTUuHFOL7RfvOtN_fuWsZztWYdO1i-HNH6_A5_HQ96P1OUxBPeHCC_U6Pd4OwMXuqYVB4PUR8qKTIstmxaG-gGZj1JyE_RC5_rzt9uLSIUAxlnTqF=w563-h375-s-no-gm?authuser=0",
//7
"https://lh3.googleusercontent.com/pw/AP1GczO6CMRt4chryuZifGA2tRIfY-Kd5H-53e2MF5SmB1GKEk_B2Huu1rZDRzt_q1KOO_ew_GI4B44d6k6aHM1cv8Zxn10tLu_dRjSnGw8KzrPCI4HuuH6aWYCxr2y277723rku5ueD2idh26gaEEMwu1Gh=w385-h358-s-no-gm?authuser=0",
//8
"https://lh3.googleusercontent.com/pw/AP1GczOjb6HcWqr6Xz7oFjYuaj6NirLZRsbTOkidbipjJML85PGRg74_0rXFIyQbSOywE9tjHstpwOqZg2ssN4WWYnim4wyDHfs0Ujl44pBRjJ8358MEs_9utsnQb0jPDWxEAOOq5TzXef2X_ISESDsOHKNt=w432-h577-s-no-gm?authuser=0",
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
