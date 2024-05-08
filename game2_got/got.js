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
    "https://lh3.googleusercontent.com/pw/AP1GczMeAjiodyMyhGhgSzpT9rJr1gh6CqWHUzXspLxIawDhKoKec9_UkaclsM8GnrLL13Yun2idQqkT5gZttFtN4W19SfL8khlqd9EQZVbSjr6KjBg2u6iA3BKRr4ZAP6METVSJQ-7p_2RmbC_e1xZQLbwO=w623-h866-s-no-gm?authuser=0",
    //2
    "https://lh3.googleusercontent.com/pw/AP1GczOZqwohJZh04cBlIqF9Sp8akqe2eUFGdHAo_Z9skbY91FLGtQEln5EV4AaXXdqBOSja4XJqu9AtFQ-KwL0_eEU8xflLPuR3iwCWNUKT-uDyKhfnkl_5rd9pfONV9NJbLlocwoX9rOMzdUbAiKIMC2py=w623-h866-s-no-gm?authuser=0",
    //3
    "https://lh3.googleusercontent.com/pw/AP1GczPYqKCHhAtyCTtACJZt4rRAKuAvty-mNzOjvV3Cuk3pCjprT_RlziWXOFXpdeb2Z0uO-9DybqQRvIhMP6kH10YlBZqSD4qwaL8vUfiMbqeRzmGoMvw4mmMwAvtTfJru4S4uCnaEMstTG1cse9GbEeTh=w624-h866-s-no-gm?authuser=0",
    //4
    "https://lh3.googleusercontent.com/pw/AP1GczPSZ22DUGnBD6D0aEd8J8P3SfyOBgEjOU53A7fGlYY5jyDyaXbf5R-YyzhyYzClNxYJoras5SJxbquiWNZfsKE6co12SDkpWF_LxJxjc21oW93UzJxS3UCClTqn8YXETSEgjCpImxD_l9ph2w4dUK_G=w623-h866-s-no-gm?authuser=0",
    //5
    "https://lh3.googleusercontent.com/pw/AP1GczP13CnQdXgYi-yfw3tOrZkBpZ4ZFjD6s1vIUgKTzp2UgcAQiHaUgWvO2nmfY1y8ASAPgWmOHOpPG36bhTz_ktCXJvd-84afGfhOVZdQ35c8TxhygeIjh0TQWxR_I4MnZ4HQZ2aBi1dy-HwHeMW5rsH7=w623-h866-s-no-gm?authuser=0",
    //6
    "https://lh3.googleusercontent.com/pw/AP1GczPUbDHUI7YUZH3MNCJ1kXYHzZQr68zNCeZvTUkIJwMVy9NeDnmkHO1h4pqFXw2cl1Tb1wpJhnOHIEmBskM0JFapfNMYqxTlXuzbhH1SusQSGFq_zAGuWuTPNxyw_-5QwjVI0QaYpRcDfZr3dqC1yShE=w623-h866-s-no-gm?authuser=0",
    //7
    "https://lh3.googleusercontent.com/pw/AP1GczPjy4sW7YUR_FAgrKYvqC7pApfYhizyUUud_XL2I54LUp7fNUoQCzlEFZ1Jn7-zHx7xnaLdSpdKaM2ffXW_jWSBthROwiPhQkWPKDe33OUvHcBtwuj24Yn_UrPK3xrVSuA0ZhLcYrsmKDO50LmOYTsH=w623-h866-s-no-gm?authuser=0",
    //8
    "https://lh3.googleusercontent.com/pw/AP1GczMBx0JswZi1qPfJHj5nnoaaRlxldnhy6wcB_5h6G3r2P7yf0tuI7e3hpFkFLd9FBfEwvqfRsYzvDaFSs3IeoKw1rXP9CZxMQFIRJdiq8WivgydYKm7qn9WhtLy-Lf4zDZGtBPNVKGHckwg16EMMI6en=w623-h866-s-no-gm?authuser=0",
    //1
    "https://lh3.googleusercontent.com/pw/AP1GczMeAjiodyMyhGhgSzpT9rJr1gh6CqWHUzXspLxIawDhKoKec9_UkaclsM8GnrLL13Yun2idQqkT5gZttFtN4W19SfL8khlqd9EQZVbSjr6KjBg2u6iA3BKRr4ZAP6METVSJQ-7p_2RmbC_e1xZQLbwO=w623-h866-s-no-gm?authuser=0",
    //2
    "https://lh3.googleusercontent.com/pw/AP1GczOZqwohJZh04cBlIqF9Sp8akqe2eUFGdHAo_Z9skbY91FLGtQEln5EV4AaXXdqBOSja4XJqu9AtFQ-KwL0_eEU8xflLPuR3iwCWNUKT-uDyKhfnkl_5rd9pfONV9NJbLlocwoX9rOMzdUbAiKIMC2py=w623-h866-s-no-gm?authuser=0",
    //3
    "https://lh3.googleusercontent.com/pw/AP1GczPYqKCHhAtyCTtACJZt4rRAKuAvty-mNzOjvV3Cuk3pCjprT_RlziWXOFXpdeb2Z0uO-9DybqQRvIhMP6kH10YlBZqSD4qwaL8vUfiMbqeRzmGoMvw4mmMwAvtTfJru4S4uCnaEMstTG1cse9GbEeTh=w624-h866-s-no-gm?authuser=0",
    //4
    "https://lh3.googleusercontent.com/pw/AP1GczPSZ22DUGnBD6D0aEd8J8P3SfyOBgEjOU53A7fGlYY5jyDyaXbf5R-YyzhyYzClNxYJoras5SJxbquiWNZfsKE6co12SDkpWF_LxJxjc21oW93UzJxS3UCClTqn8YXETSEgjCpImxD_l9ph2w4dUK_G=w623-h866-s-no-gm?authuser=0",
    //5
    "https://lh3.googleusercontent.com/pw/AP1GczP13CnQdXgYi-yfw3tOrZkBpZ4ZFjD6s1vIUgKTzp2UgcAQiHaUgWvO2nmfY1y8ASAPgWmOHOpPG36bhTz_ktCXJvd-84afGfhOVZdQ35c8TxhygeIjh0TQWxR_I4MnZ4HQZ2aBi1dy-HwHeMW5rsH7=w623-h866-s-no-gm?authuser=0",
    //6
    "https://lh3.googleusercontent.com/pw/AP1GczPUbDHUI7YUZH3MNCJ1kXYHzZQr68zNCeZvTUkIJwMVy9NeDnmkHO1h4pqFXw2cl1Tb1wpJhnOHIEmBskM0JFapfNMYqxTlXuzbhH1SusQSGFq_zAGuWuTPNxyw_-5QwjVI0QaYpRcDfZr3dqC1yShE=w623-h866-s-no-gm?authuser=0",
    //7
    "https://lh3.googleusercontent.com/pw/AP1GczPjy4sW7YUR_FAgrKYvqC7pApfYhizyUUud_XL2I54LUp7fNUoQCzlEFZ1Jn7-zHx7xnaLdSpdKaM2ffXW_jWSBthROwiPhQkWPKDe33OUvHcBtwuj24Yn_UrPK3xrVSuA0ZhLcYrsmKDO50LmOYTsH=w623-h866-s-no-gm?authuser=0",
    //8
    "https://lh3.googleusercontent.com/pw/AP1GczMBx0JswZi1qPfJHj5nnoaaRlxldnhy6wcB_5h6G3r2P7yf0tuI7e3hpFkFLd9FBfEwvqfRsYzvDaFSs3IeoKw1rXP9CZxMQFIRJdiq8WivgydYKm7qn9WhtLy-Lf4zDZGtBPNVKGHckwg16EMMI6en=w623-h866-s-no-gm?authuser=0",
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
