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
 "https://media.discordapp.net/attachments/1229720027574304900/1235982748343341107/img-1.png?ex=66365a22&is=663508a2&hm=a6f7af8aca87cc72f31148bbf480e570c34b474a0c3fff1b9ffdcd8ae640eae5&=&format=webp&quality=lossless",
 //Link2
 "https://media.discordapp.net/attachments/1229720027574304900/1235982748787933225/img-2.png?ex=66365a22&is=663508a2&hm=a2142a89a15ceb8b13659b1740156a02abffed38fb5ddbbb7282d66dc4b05609&=&format=webp&quality=lossless&width=346&height=473",
 //Link3
 "https://media.discordapp.net/attachments/1229720027574304900/1235982749039595572/img-3.png?ex=66365a22&is=663508a2&hm=c961544214d208c15c0d7e1b6543c1f9debe5a9c76fd01f27e591aa06ece4779&=&format=webp&quality=lossless&width=378&height=473",
 //Link4
 "https://media.discordapp.net/attachments/1229720027574304900/1235982749534519417/img-4.png?ex=66365a22&is=663508a2&hm=caea82cc6d2325251b64312e2cd4cb8a4d746052ff5d290c6e7f55082a9a0baf&=&format=webp&quality=lossless&width=482&height=473",
 //Link5
 "https://media.discordapp.net/attachments/1229720027574304900/1235982749999960084/img-5.png?ex=66365a23&is=663508a3&hm=b141a35511be56d4ad1ddf905f0bd6f8bb92e75c627315896160e7b7d4d27427&=&format=webp&quality=lossless",
 //Link6
 "https://media.discordapp.net/attachments/1229720027574304900/1235982750440493210/img-6.png?ex=66365a23&is=663508a3&hm=59e652c0e437b92555cde4b495f663ba09bebeafd1420f76f1060904699e97e3&=&format=webp&quality=lossless&width=473&height=473",
 //Link7
 "https://media.discordapp.net/attachments/1229720027574304900/1235982750671175791/img-7.png?ex=66365a23&is=663508a3&hm=e1a0ef57a41cb0617755aed9dd7a9de96dfa97ac2d104bc0cfbf0cf70b62847a&=&format=webp&quality=lossless&width=378&height=473",
 //Link8
 "https://media.discordapp.net/attachments/1229720027574304900/1235982750960455860/img-8.png?ex=66365a23&is=663508a3&hm=d9f071bcec20a57ec57c8e822285cb2ea049ada9eb3a85eaea52322448a111f1&=&format=webp&quality=lossless&width=355&height=473",
 //Link1
 "https://media.discordapp.net/attachments/1229720027574304900/1235982748343341107/img-1.png?ex=66365a22&is=663508a2&hm=a6f7af8aca87cc72f31148bbf480e570c34b474a0c3fff1b9ffdcd8ae640eae5&=&format=webp&quality=lossless",
 //Link2
 "https://media.discordapp.net/attachments/1229720027574304900/1235982748787933225/img-2.png?ex=66365a22&is=663508a2&hm=a2142a89a15ceb8b13659b1740156a02abffed38fb5ddbbb7282d66dc4b05609&=&format=webp&quality=lossless&width=346&height=473",
 //Link3
 "https://media.discordapp.net/attachments/1229720027574304900/1235982749039595572/img-3.png?ex=66365a22&is=663508a2&hm=c961544214d208c15c0d7e1b6543c1f9debe5a9c76fd01f27e591aa06ece4779&=&format=webp&quality=lossless&width=378&height=473",
 //Link4
 "https://media.discordapp.net/attachments/1229720027574304900/1235982749534519417/img-4.png?ex=66365a22&is=663508a2&hm=caea82cc6d2325251b64312e2cd4cb8a4d746052ff5d290c6e7f55082a9a0baf&=&format=webp&quality=lossless&width=482&height=473",
 //Link5
 "https://media.discordapp.net/attachments/1229720027574304900/1235982749999960084/img-5.png?ex=66365a23&is=663508a3&hm=b141a35511be56d4ad1ddf905f0bd6f8bb92e75c627315896160e7b7d4d27427&=&format=webp&quality=lossless",
 //Link6
 "https://media.discordapp.net/attachments/1229720027574304900/1235982750440493210/img-6.png?ex=66365a23&is=663508a3&hm=59e652c0e437b92555cde4b495f663ba09bebeafd1420f76f1060904699e97e3&=&format=webp&quality=lossless&width=473&height=473",
 //Link7
 "https://media.discordapp.net/attachments/1229720027574304900/1235982750671175791/img-7.png?ex=66365a23&is=663508a3&hm=e1a0ef57a41cb0617755aed9dd7a9de96dfa97ac2d104bc0cfbf0cf70b62847a&=&format=webp&quality=lossless&width=378&height=473",
 //Link8
 "https://media.discordapp.net/attachments/1229720027574304900/1235982750960455860/img-8.png?ex=66365a23&is=663508a3&hm=d9f071bcec20a57ec57c8e822285cb2ea049ada9eb3a85eaea52322448a111f1&=&format=webp&quality=lossless&width=355&height=473"
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
