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
   "https://media.discordapp.net/attachments/1229720027574304900/1235987368885096540/img-1.png?ex=66365e70&is=66350cf0&hm=3706036a4192faca13fa8d328d397e839a439bdca15ede0b12379b214dad0816&=&format=webp&quality=lossless&width=336&height=473",
   //Link2
   "https://media.discordapp.net/attachments/1229720027574304900/1235987369161658569/img-2.png?ex=66365e70&is=66350cf0&hm=5ccfd8f57c3a0635da215014edaf946047154742c1655c047895886a3811c4d4&=&format=webp&quality=lossless&width=326&height=473",
   //Link3
   "https://media.discordapp.net/attachments/1229720027574304900/1235987369421701211/img-3.png?ex=66365e70&is=66350cf0&hm=593a69425f81a59f4558fb79018b624eb5cd152d18413d1dbf62f96bcf54fcc1&=&format=webp&quality=lossless&width=365&height=473",
   //Link4
   "https://media.discordapp.net/attachments/1229720027574304900/1235987369648459836/img-4.png?ex=66365e70&is=66350cf0&hm=88d2e9a18d701ea498be7b7581ce0458f374763e4be5f1cd1c7b14630411513b&=&format=webp&quality=lossless&width=339&height=473",
   //Link5
   "https://media.discordapp.net/attachments/1229720027574304900/1235987369983737886/img-5.png?ex=66365e70&is=66350cf0&hm=3bd7af1ede45af4a3a2901bfb1a27ec933b791dab79de7d70b469aac977dfb6f&=&format=webp&quality=lossless&width=429&height=473",
   //Link6
   "https://media.discordapp.net/attachments/1229720027574304900/1235987370302771241/img-6.png?ex=66365e70&is=66350cf0&hm=5440ab78851c56b2f21692cad438c3fb1db94789eef6005e325afd16479258c4&=&format=webp&quality=lossless&width=473&height=473",
   //Link7
   "https://media.discordapp.net/attachments/1229720027574304900/1235987370734522530/img-7.png?ex=66365e70&is=66350cf0&hm=b413a31d52fc2f691b4184912f50bc659812f959552ded2618c4256e613e95e5&=&format=webp&quality=lossless&width=355&height=473",
   //Link8
   "https://media.discordapp.net/attachments/1229720027574304900/1235987371061940315/img-8.png?ex=66365e70&is=66350cf0&hm=faee3fd3265f48882ed520aad7706592e3d1ec7a1f8b395c7c50fd4495b0f8e7&=&format=webp&quality=lossless&width=355&height=473",
   //Link1
   "https://media.discordapp.net/attachments/1229720027574304900/1235987368885096540/img-1.png?ex=66365e70&is=66350cf0&hm=3706036a4192faca13fa8d328d397e839a439bdca15ede0b12379b214dad0816&=&format=webp&quality=lossless&width=336&height=473",
   //Link2
   "https://media.discordapp.net/attachments/1229720027574304900/1235987369161658569/img-2.png?ex=66365e70&is=66350cf0&hm=5ccfd8f57c3a0635da215014edaf946047154742c1655c047895886a3811c4d4&=&format=webp&quality=lossless&width=326&height=473",
   //Link3
   "https://media.discordapp.net/attachments/1229720027574304900/1235987369421701211/img-3.png?ex=66365e70&is=66350cf0&hm=593a69425f81a59f4558fb79018b624eb5cd152d18413d1dbf62f96bcf54fcc1&=&format=webp&quality=lossless&width=365&height=473",
   //Link4
   "https://media.discordapp.net/attachments/1229720027574304900/1235987369648459836/img-4.png?ex=66365e70&is=66350cf0&hm=88d2e9a18d701ea498be7b7581ce0458f374763e4be5f1cd1c7b14630411513b&=&format=webp&quality=lossless&width=339&height=473",
   //Link5
   "https://media.discordapp.net/attachments/1229720027574304900/1235987369983737886/img-5.png?ex=66365e70&is=66350cf0&hm=3bd7af1ede45af4a3a2901bfb1a27ec933b791dab79de7d70b469aac977dfb6f&=&format=webp&quality=lossless&width=429&height=473",
   //Link6
   "https://media.discordapp.net/attachments/1229720027574304900/1235987370302771241/img-6.png?ex=66365e70&is=66350cf0&hm=5440ab78851c56b2f21692cad438c3fb1db94789eef6005e325afd16479258c4&=&format=webp&quality=lossless&width=473&height=473",
   //Link7
   "https://media.discordapp.net/attachments/1229720027574304900/1235987370734522530/img-7.png?ex=66365e70&is=66350cf0&hm=b413a31d52fc2f691b4184912f50bc659812f959552ded2618c4256e613e95e5&=&format=webp&quality=lossless&width=355&height=473",
   //Link8
   "https://media.discordapp.net/attachments/1229720027574304900/1235987371061940315/img-8.png?ex=66365e70&is=66350cf0&hm=faee3fd3265f48882ed520aad7706592e3d1ec7a1f8b395c7c50fd4495b0f8e7&=&format=webp&quality=lossless&width=355&height=473"
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
