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
      "https://media.discordapp.net/attachments/1229720027574304900/1235979454803607602/img-1.png?ex=66365711&is=66350591&hm=256a2ca50d43744a06b2258f49a078936f5e4a384d9f2f6c78f90cc7b9f10db1&=&format=webp&quality=lossless&width=340&height=473",
      //Link2
      "https://media.discordapp.net/attachments/1229720027574304900/1235979455131025490/img-2.png?ex=66365711&is=66350591&hm=9ad2304a4885405f106d3d59c70324b88ce7d49670b39133535c374254280a6d&=&format=webp&quality=lossless&width=340&height=473",
      //Link3
      "https://media.discordapp.net/attachments/1229720027574304900/1235979455470768244/img-3.png?ex=66365711&is=66350591&hm=1d1291a9509c3efcd6f937f166851d60afa527d6a485d192786d8ff89faf376a&=&format=webp&quality=lossless&width=341&height=473",
      //Link4
      "https://media.discordapp.net/attachments/1229720027574304900/1235979455852183552/img-4.png?ex=66365711&is=66350591&hm=ce5a0a43f01bc85c0d9199f68e687345e0902227d83b1811550357c5ad2bba18&=&format=webp&quality=lossless&width=340&height=472",
      //Link5
      "https://media.discordapp.net/attachments/1229720027574304900/1235979456196378666/img-5.png?ex=66365711&is=66350591&hm=88f2002ccfe564b47b13672ce7682581bc3c6a7c7b0783517396bb39a6f84722&=&format=webp&quality=lossless&width=340&height=473",
      //Link6
      "https://media.discordapp.net/attachments/1229720027574304900/1235979456686850058/img-6.png?ex=66365711&is=66350591&hm=d07f2a530a6e3e7c967ae2dcdc9e8865f2c6d5a237b525c36722a3049cdb3da2&=&format=webp&quality=lossless&width=340&height=473",
      //Link7
      "https://media.discordapp.net/attachments/1229720027574304900/1235979457022660730/img-7.png?ex=66365711&is=66350591&hm=5d4761bee366552b72bb8e23934d71abc80c22dcfbe2e40492f8b52bfd8e6fa5&=&format=webp&quality=lossless&width=340&height=473",
      //Link8
      "https://media.discordapp.net/attachments/1229720027574304900/1235979457416659106/img-8.png?ex=66365712&is=66350592&hm=b2091d2b6e7d0bef10c9ac2f3f552a537ae4734cdf9df15026731aba6c331c66&=&format=webp&quality=lossless&width=340&height=472",
      //Link1
      "https://media.discordapp.net/attachments/1229720027574304900/1235979454803607602/img-1.png?ex=66365711&is=66350591&hm=256a2ca50d43744a06b2258f49a078936f5e4a384d9f2f6c78f90cc7b9f10db1&=&format=webp&quality=lossless&width=340&height=473",
      //Link2
      "https://media.discordapp.net/attachments/1229720027574304900/1235979455131025490/img-2.png?ex=66365711&is=66350591&hm=9ad2304a4885405f106d3d59c70324b88ce7d49670b39133535c374254280a6d&=&format=webp&quality=lossless&width=340&height=473",
      //Link3
      "https://media.discordapp.net/attachments/1229720027574304900/1235979455470768244/img-3.png?ex=66365711&is=66350591&hm=1d1291a9509c3efcd6f937f166851d60afa527d6a485d192786d8ff89faf376a&=&format=webp&quality=lossless&width=341&height=473",
      //Link4
      "https://media.discordapp.net/attachments/1229720027574304900/1235979455852183552/img-4.png?ex=66365711&is=66350591&hm=ce5a0a43f01bc85c0d9199f68e687345e0902227d83b1811550357c5ad2bba18&=&format=webp&quality=lossless&width=340&height=472",
      //Link5
      "https://media.discordapp.net/attachments/1229720027574304900/1235979456196378666/img-5.png?ex=66365711&is=66350591&hm=88f2002ccfe564b47b13672ce7682581bc3c6a7c7b0783517396bb39a6f84722&=&format=webp&quality=lossless&width=340&height=473",
      //Link6
      "https://media.discordapp.net/attachments/1229720027574304900/1235979456686850058/img-6.png?ex=66365711&is=66350591&hm=d07f2a530a6e3e7c967ae2dcdc9e8865f2c6d5a237b525c36722a3049cdb3da2&=&format=webp&quality=lossless&width=340&height=473",
      //Link7
      "https://media.discordapp.net/attachments/1229720027574304900/1235979457022660730/img-7.png?ex=66365711&is=66350591&hm=5d4761bee366552b72bb8e23934d71abc80c22dcfbe2e40492f8b52bfd8e6fa5&=&format=webp&quality=lossless&width=340&height=473",
      //Link8
      "https://media.discordapp.net/attachments/1229720027574304900/1235979457416659106/img-8.png?ex=66365712&is=66350592&hm=b2091d2b6e7d0bef10c9ac2f3f552a537ae4734cdf9df15026731aba6c331c66&=&format=webp&quality=lossless&width=340&height=472"
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
