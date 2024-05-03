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
  "https://media.discordapp.net/attachments/1229720027574304900/1235981080683741184/img-1.png?ex=66365895&is=66350715&hm=b0eb7f57223163fdffe66c0c904ef17a28c02fa909fc0c6c7164e0af3b5355a0&=&format=webp&quality=lossless&width=476&height=473",
  //Link2
  "https://media.discordapp.net/attachments/1229720027574304900/1235981080969089156/img-2.png?ex=66365895&is=66350715&hm=2b59f3fbef6fdd4c2c9b91bcf3a05fb9bb6e9600d3fcac69a67a7f9af239d29b&=&format=webp&quality=lossless",
  //Link3
  "https://media.discordapp.net/attachments/1229720027574304900/1235981081241583706/img-3.png?ex=66365895&is=66350715&hm=9b2e9a4d5794189c370c8f4a6af70bb557998d622f89aa717e5ed091b1ffbabe&=&format=webp&quality=lossless",
  //Link4
  "https://media.discordapp.net/attachments/1229720027574304900/1235981081522737152/img-4.png?ex=66365895&is=66350715&hm=c4311284fa65d5559daa6dda8c083a804e0c0e5bdc6fe5dcd7770385cabd4ef2&=&format=webp&quality=lossless&width=266&height=472",
  //Link5
  "https://media.discordapp.net/attachments/1229720027574304900/1235981081811877948/img-5.png?ex=66365895&is=66350715&hm=fadaeeefef30770f24ac444d45abb56abde6ac60effee373257326f8d84b8b2c&=&format=webp&quality=lossless&width=473&height=473",
  //Link6
  "https://media.discordapp.net/attachments/1229720027574304900/1235981082097221693/img-6.png?ex=66365895&is=66350715&hm=bc259d2e51f298724948eaceb30b7863e572e3617208d9cf4981439d4c0fa7cd&=&format=webp&quality=lossless",
  //Link7
  "https://media.discordapp.net/attachments/1229720027574304900/1235981082390958110/img-7.png?ex=66365895&is=66350715&hm=9390ee872b6e18344c9c43223454aa50c4220f271f803a02612c1851ae340475&=&format=webp&quality=lossless",
  //Link8
  "https://media.discordapp.net/attachments/1229720027574304900/1235981082650738758/img-8.png?ex=66365895&is=66350715&hm=8e9dea1ca22c00ee34698bff80963c7a45e362b039441ebea385e84e0ae475f7&=&format=webp&quality=lossless",
  //Link1
  "https://media.discordapp.net/attachments/1229720027574304900/1235981080683741184/img-1.png?ex=66365895&is=66350715&hm=b0eb7f57223163fdffe66c0c904ef17a28c02fa909fc0c6c7164e0af3b5355a0&=&format=webp&quality=lossless&width=476&height=473",
  //Link2
  "https://media.discordapp.net/attachments/1229720027574304900/1235981080969089156/img-2.png?ex=66365895&is=66350715&hm=2b59f3fbef6fdd4c2c9b91bcf3a05fb9bb6e9600d3fcac69a67a7f9af239d29b&=&format=webp&quality=lossless",
  //Link3
  "https://media.discordapp.net/attachments/1229720027574304900/1235981081241583706/img-3.png?ex=66365895&is=66350715&hm=9b2e9a4d5794189c370c8f4a6af70bb557998d622f89aa717e5ed091b1ffbabe&=&format=webp&quality=lossless",
  //Link4
  "https://media.discordapp.net/attachments/1229720027574304900/1235981081522737152/img-4.png?ex=66365895&is=66350715&hm=c4311284fa65d5559daa6dda8c083a804e0c0e5bdc6fe5dcd7770385cabd4ef2&=&format=webp&quality=lossless&width=266&height=472",
  //Link5
  "https://media.discordapp.net/attachments/1229720027574304900/1235981081811877948/img-5.png?ex=66365895&is=66350715&hm=fadaeeefef30770f24ac444d45abb56abde6ac60effee373257326f8d84b8b2c&=&format=webp&quality=lossless&width=473&height=473",
  //Link6
  "https://media.discordapp.net/attachments/1229720027574304900/1235981082097221693/img-6.png?ex=66365895&is=66350715&hm=bc259d2e51f298724948eaceb30b7863e572e3617208d9cf4981439d4c0fa7cd&=&format=webp&quality=lossless",
  //Link7
  "https://media.discordapp.net/attachments/1229720027574304900/1235981082390958110/img-7.png?ex=66365895&is=66350715&hm=9390ee872b6e18344c9c43223454aa50c4220f271f803a02612c1851ae340475&=&format=webp&quality=lossless",
  //Link8
  "https://media.discordapp.net/attachments/1229720027574304900/1235981082650738758/img-8.png?ex=66365895&is=66350715&hm=8e9dea1ca22c00ee34698bff80963c7a45e362b039441ebea385e84e0ae475f7&=&format=webp&quality=lossless"
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
