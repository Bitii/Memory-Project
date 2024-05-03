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
      "https://media.discordapp.net/attachments/1229720027574304900/1235954573139775569/img-1.png?ex=66363fe5&is=6634ee65&hm=095df20f5b8cd7464067b024045243798c713e8316958030fcafaafa11d18dcb&=&format=webp&quality=lossless&width=355&height=473",
      //Link2
      "https://media.discordapp.net/attachments/1229720027574304900/1235954573445693542/img-2.png?ex=66363fe5&is=6634ee65&hm=1d5cd224b8ee31bf9c84075d2638638b58e456583b9c3ea06facff1d5a7f5671&=&format=webp&quality=lossless&width=398&height=473",
      //Link3
      "https://media.discordapp.net/attachments/1229720027574304900/1235954573705875486/img-3.png?ex=66363fe5&is=6634ee65&hm=c2ebc90c6c65c6d6bdada848f85a85ba0ad12d0aa931b5540b3003545a3c9630&=&format=webp&quality=lossless&width=424&height=473",
      //Link4
      "https://media.discordapp.net/attachments/1229720027574304900/1235954573974442046/img-4.png?ex=66363fe5&is=6634ee65&hm=e38d7de10718c80a7c3e757250aaa660c0d20bbc071e94c649601f4f918212b8&=&format=webp&quality=lossless&width=473&height=473",
      //Link5
      "https://media.discordapp.net/attachments/1229720027574304900/1235954574221639680/img-5.png?ex=66363fe5&is=6634ee65&hm=b676679618d93c184538f846a2513cd86811931afd04e241a8ed9e8631a3b118&=&format=webp&quality=lossless&width=394&height=473",
      //Link6
      "https://media.discordapp.net/attachments/1229720027574304900/1235954574507118632/img-6.png?ex=66363fe5&is=6634ee65&hm=5d3d041a1f9692131d3251a0b66e50b8c2dfb354c7a0423a43df7eb72211cb06&=&format=webp&quality=lossless&width=336&height=472",
      //Link7
      "https://media.discordapp.net/attachments/1229720027574304900/1235954574817230891/img-7.png?ex=66363fe5&is=6634ee65&hm=10742316b31750ac86fa01992786cb3c03a4c0f6b1fea45ec10c26a48d672477&=&format=webp&quality=lossless&width=473&height=473",
      //Link8
      "https://media.discordapp.net/attachments/1229720027574304900/1235954575106773152/img-8.png?ex=66363fe5&is=6634ee65&hm=18e3bfb40b439348e39610d9c9c91c6e255a5a1809a8683dd736f92972bdefb8&=&format=webp&quality=lossless&width=355&height=473",
      //Link1
      "https://media.discordapp.net/attachments/1229720027574304900/1235954573139775569/img-1.png?ex=66363fe5&is=6634ee65&hm=095df20f5b8cd7464067b024045243798c713e8316958030fcafaafa11d18dcb&=&format=webp&quality=lossless&width=355&height=473",
      //Link2
      "https://media.discordapp.net/attachments/1229720027574304900/1235954573445693542/img-2.png?ex=66363fe5&is=6634ee65&hm=1d5cd224b8ee31bf9c84075d2638638b58e456583b9c3ea06facff1d5a7f5671&=&format=webp&quality=lossless&width=398&height=473",
      //Link3
      "https://media.discordapp.net/attachments/1229720027574304900/1235954573705875486/img-3.png?ex=66363fe5&is=6634ee65&hm=c2ebc90c6c65c6d6bdada848f85a85ba0ad12d0aa931b5540b3003545a3c9630&=&format=webp&quality=lossless&width=424&height=473",
      //Link4
      "https://media.discordapp.net/attachments/1229720027574304900/1235954573974442046/img-4.png?ex=66363fe5&is=6634ee65&hm=e38d7de10718c80a7c3e757250aaa660c0d20bbc071e94c649601f4f918212b8&=&format=webp&quality=lossless&width=473&height=473",
      //Link5
      "https://media.discordapp.net/attachments/1229720027574304900/1235954574221639680/img-5.png?ex=66363fe5&is=6634ee65&hm=b676679618d93c184538f846a2513cd86811931afd04e241a8ed9e8631a3b118&=&format=webp&quality=lossless&width=394&height=473",
      //Link6
      "https://media.discordapp.net/attachments/1229720027574304900/1235954574507118632/img-6.png?ex=66363fe5&is=6634ee65&hm=5d3d041a1f9692131d3251a0b66e50b8c2dfb354c7a0423a43df7eb72211cb06&=&format=webp&quality=lossless&width=336&height=472",
      //Link7
      "https://media.discordapp.net/attachments/1229720027574304900/1235954574817230891/img-7.png?ex=66363fe5&is=6634ee65&hm=10742316b31750ac86fa01992786cb3c03a4c0f6b1fea45ec10c26a48d672477&=&format=webp&quality=lossless&width=473&height=473",
      //Link8
      "https://media.discordapp.net/attachments/1229720027574304900/1235954575106773152/img-8.png?ex=66363fe5&is=6634ee65&hm=18e3bfb40b439348e39610d9c9c91c6e255a5a1809a8683dd736f92972bdefb8&=&format=webp&quality=lossless&width=355&height=473"
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
