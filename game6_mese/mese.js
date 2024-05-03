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
   "https://media.discordapp.net/attachments/1229720027574304900/1235986079639797770/img-1.png?ex=66365d3c&is=66350bbc&hm=adb1eb8b25bc42ac5979f72780987bcf335d7792969bfeb356bb21b0581443f3&=&format=webp&quality=lossless",
   //Link2
   "https://media.discordapp.net/attachments/1229720027574304900/1235986079958437888/img-2.png?ex=66365d3c&is=66350bbc&hm=2fc71a9d3372f82ec5df8d0b1fa321ce8399e5f24b07795f736356d7fb5c9468&=&format=webp&quality=lossless&width=352&height=473",
   //Link3
   "https://media.discordapp.net/attachments/1229720027574304900/1235986080352964721/img-3.png?ex=66365d3d&is=66350bbd&hm=f3395d23147fc6756e7aa3b9c8a1994fe3b91f7650ad8ff40e2cdf3b5bc9005d&=&format=webp&quality=lossless&width=288&height=473",
   //Link4
   "https://media.discordapp.net/attachments/1229720027574304900/1235986080734511246/img-4.png?ex=66365d3d&is=66350bbd&hm=e9fd70333c7492e04f9cd22702d332b18281b0520d3a674cc86aa9b12858e00c&=&format=webp&quality=lossless&width=309&height=473",
   //Link5
   "https://media.discordapp.net/attachments/1229720027574304900/1235986081078317179/img-5.png?ex=66365d3d&is=66350bbd&hm=9111354703e677adef6743dcf0e29dd9fb675a19b90d433eeab613508f149e23&=&format=webp&quality=lossless&width=355&height=473",
   //Link6
   "https://media.discordapp.net/attachments/1229720027574304900/1235986081384628315/img-6.png?ex=66365d3d&is=66350bbd&hm=e196a1da9df0b20b1c33792de9f216c170772cbe0129106c1ffacbe841fe1adb&=&format=webp&quality=lossless&width=473&height=473",
   //Link7
   "https://media.discordapp.net/attachments/1229720027574304900/1235986081690685490/img-7.png?ex=66365d3d&is=66350bbd&hm=e3abbce454c46afad9a7d4da8abb538a85982456d0a60b194e98f966fb86b168&=&format=webp&quality=lossless&width=304&height=473",
   //Link8
   "https://media.discordapp.net/attachments/1229720027574304900/1235986081976160360/img-8.png?ex=66365d3d&is=66350bbd&hm=7ab296de58cb75bd2f147f1b0c98c4a966278179b308566ac9fc944475bb48bc&=&format=webp&quality=lossless&width=351&height=473",
   //Link1
   "https://media.discordapp.net/attachments/1229720027574304900/1235986079639797770/img-1.png?ex=66365d3c&is=66350bbc&hm=adb1eb8b25bc42ac5979f72780987bcf335d7792969bfeb356bb21b0581443f3&=&format=webp&quality=lossless",
   //Link2
   "https://media.discordapp.net/attachments/1229720027574304900/1235986079958437888/img-2.png?ex=66365d3c&is=66350bbc&hm=2fc71a9d3372f82ec5df8d0b1fa321ce8399e5f24b07795f736356d7fb5c9468&=&format=webp&quality=lossless&width=352&height=473",
   //Link3
   "https://media.discordapp.net/attachments/1229720027574304900/1235986080352964721/img-3.png?ex=66365d3d&is=66350bbd&hm=f3395d23147fc6756e7aa3b9c8a1994fe3b91f7650ad8ff40e2cdf3b5bc9005d&=&format=webp&quality=lossless&width=288&height=473",
   //Link4
   "https://media.discordapp.net/attachments/1229720027574304900/1235986080734511246/img-4.png?ex=66365d3d&is=66350bbd&hm=e9fd70333c7492e04f9cd22702d332b18281b0520d3a674cc86aa9b12858e00c&=&format=webp&quality=lossless&width=309&height=473",
   //Link5
   "https://media.discordapp.net/attachments/1229720027574304900/1235986081078317179/img-5.png?ex=66365d3d&is=66350bbd&hm=9111354703e677adef6743dcf0e29dd9fb675a19b90d433eeab613508f149e23&=&format=webp&quality=lossless&width=355&height=473",
   //Link6
   "https://media.discordapp.net/attachments/1229720027574304900/1235986081384628315/img-6.png?ex=66365d3d&is=66350bbd&hm=e196a1da9df0b20b1c33792de9f216c170772cbe0129106c1ffacbe841fe1adb&=&format=webp&quality=lossless&width=473&height=473",
   //Link7
   "https://media.discordapp.net/attachments/1229720027574304900/1235986081690685490/img-7.png?ex=66365d3d&is=66350bbd&hm=e3abbce454c46afad9a7d4da8abb538a85982456d0a60b194e98f966fb86b168&=&format=webp&quality=lossless&width=304&height=473",
   //Link8
   "https://media.discordapp.net/attachments/1229720027574304900/1235986081976160360/img-8.png?ex=66365d3d&is=66350bbd&hm=7ab296de58cb75bd2f147f1b0c98c4a966278179b308566ac9fc944475bb48bc&=&format=webp&quality=lossless&width=351&height=473"
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
