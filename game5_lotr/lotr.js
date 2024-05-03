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
"https://media.discordapp.net/attachments/1229720027574304900/1235984010874716190/img-1.png?ex=66365b4f&is=663509cf&hm=c216d49c7aaea2a548622b739b1d5f1d48623cc1dc813c78ceb42c0dd6639288&=&format=webp&quality=lossless&width=399&height=473",
//Link2
"https://media.discordapp.net/attachments/1229720027574304900/1235984011180904570/img-2.png?ex=66365b4f&is=663509cf&hm=d5176b0e6b5598db7fd3f42ef5f497c302507c52a12a17f1d67d06a4eda034d8&=&format=webp&quality=lossless&width=473&height=473",
//Link3
"https://media.discordapp.net/attachments/1229720027574304900/1235984011449471057/img-3.png?ex=66365b4f&is=663509cf&hm=0160ba0be795a7c788c46d91c0b011d266cc2fdde036049549fe7b87d0afc8ed&=&format=webp&quality=lossless",
//Link4
"https://media.discordapp.net/attachments/1229720027574304900/1235984011726160032/img-4.png?ex=66365b4f&is=663509cf&hm=5d00c8101fc5c8d58af4a9c910b2f146c38779f487d50f371caa0b867866607f&=&format=webp&quality=lossless",
//Link5
"https://media.discordapp.net/attachments/1229720027574304900/1235984011986210817/img-5.png?ex=66365b4f&is=663509cf&hm=0562de4adb84cde4934d82e9e47b8f016c94b42cefced367c69af20d3962d418&=&format=webp&quality=lossless&width=473&height=473",
//Link6
"https://media.discordapp.net/attachments/1229720027574304900/1235984012221222964/img-6.png?ex=66365b4f&is=663509cf&hm=92083f70698f408017546f39b3e7a59407d9a19b5eae6f619a415384dfd841e7&=&format=webp&quality=lossless&width=442&height=473",
//Link7
"https://media.discordapp.net/attachments/1229720027574304900/1235984012464357457/img-7.png?ex=66365b50&is=663509d0&hm=35fdcc37f97b84474c65aa9d1f6f6e5055b1113a6b1492501a0aeb5265bade46&=&format=webp&quality=lossless&width=473&height=473",
//Link8
"https://media.discordapp.net/attachments/1229720027574304900/1235984012757962833/img-8.png?ex=66365b50&is=663509d0&hm=822569723b0c26fc2c2bb90aaaaee86fbd18ec28348413914841cafb1c792409&=&format=webp&quality=lossless&width=473&height=473",
//Link1
"https://media.discordapp.net/attachments/1229720027574304900/1235984010874716190/img-1.png?ex=66365b4f&is=663509cf&hm=c216d49c7aaea2a548622b739b1d5f1d48623cc1dc813c78ceb42c0dd6639288&=&format=webp&quality=lossless&width=399&height=473",
//Link2
"https://media.discordapp.net/attachments/1229720027574304900/1235984011180904570/img-2.png?ex=66365b4f&is=663509cf&hm=d5176b0e6b5598db7fd3f42ef5f497c302507c52a12a17f1d67d06a4eda034d8&=&format=webp&quality=lossless&width=473&height=473",
//Link3
"https://media.discordapp.net/attachments/1229720027574304900/1235984011449471057/img-3.png?ex=66365b4f&is=663509cf&hm=0160ba0be795a7c788c46d91c0b011d266cc2fdde036049549fe7b87d0afc8ed&=&format=webp&quality=lossless",
//Link4
"https://media.discordapp.net/attachments/1229720027574304900/1235984011726160032/img-4.png?ex=66365b4f&is=663509cf&hm=5d00c8101fc5c8d58af4a9c910b2f146c38779f487d50f371caa0b867866607f&=&format=webp&quality=lossless",
//Link5
"https://media.discordapp.net/attachments/1229720027574304900/1235984011986210817/img-5.png?ex=66365b4f&is=663509cf&hm=0562de4adb84cde4934d82e9e47b8f016c94b42cefced367c69af20d3962d418&=&format=webp&quality=lossless&width=473&height=473",
//Link6
"https://media.discordapp.net/attachments/1229720027574304900/1235984012221222964/img-6.png?ex=66365b4f&is=663509cf&hm=92083f70698f408017546f39b3e7a59407d9a19b5eae6f619a415384dfd841e7&=&format=webp&quality=lossless&width=442&height=473",
//Link7
"https://media.discordapp.net/attachments/1229720027574304900/1235984012464357457/img-7.png?ex=66365b50&is=663509d0&hm=35fdcc37f97b84474c65aa9d1f6f6e5055b1113a6b1492501a0aeb5265bade46&=&format=webp&quality=lossless&width=473&height=473",
//Link8
"https://media.discordapp.net/attachments/1229720027574304900/1235984012757962833/img-8.png?ex=66365b50&is=663509d0&hm=822569723b0c26fc2c2bb90aaaaee86fbd18ec28348413914841cafb1c792409&=&format=webp&quality=lossless&width=473&height=473"
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
