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
    "https://lh3.googleusercontent.com/pw/AP1GczOaB35Uho0UCzOd05UgXRGu5bUZAy06SUxWQrn1dry_dz8vX17gWpg3KgKx94AAlomXbQhspG0JorfrHZdjAxfooB6EVO4iCdDrNxNSeTf1_fZsaXYjb46YHugPk--PUc1vMwssN-q2-SV5fOQqwWAS=w501-h498-s-no-gm?authuser=0",
    //2
    "https://lh3.googleusercontent.com/pw/AP1GczNX-ANI_F0Www48NWkSTU3mSNmySXHZq5FYm8Eg3YvvZzMbmftjS247wU0ZPDq__J_aHjXMsSyk8X-ljzq2ZhmmWrY5TXebkL6PZg1tBmW96N7nJk1djrHd717bN6Jmew5RnMkLMzzI5sRs7WUGZtrj=w360-h360-s-no-gm?authuser=0",
    //3
    "https://lh3.googleusercontent.com/pw/AP1GczOsW3vVlJhE3-xh1gbxlJxeXD0gQccITY9YuEWhbBPYO3lVJyysDokxGNam-GrM9VkptQEXW33uw0IV-vLvopnFRFtisxpvxmJWn_h_ZtHZdeeAJT26Sa8TK4j7JKGgQtErL4OYFVe-GM2WRI1udUak=w416-h416-s-no-gm?authuser=0",
    //4
    "https://lh3.googleusercontent.com/pw/AP1GczPnOj3H-WenknYrlQ8wRfPI96DknkApGdVaFsqcREt2WyoFhikrQDFSKDhqiEtQ-6_gm4hutfP6EL1obee_Byl6AYxE889LxijDI_IhT1scWvKO2nZhQkcCde-x2Q-XyLB_3L5-02aRPLLUlcyZ0-JR=w375-h666-s-no-gm?authuser=0",
    //5
    "https://lh3.googleusercontent.com/pw/AP1GczPHHWTY0VvzAYCQJrH54-4UFli1H5rb7p_19FgqHf4fj5eDeJE6VWKBUL7pORCWA5cjtKCurmmyrUoacGbtP84C-2sxeokg7lo43VCSnXvyeBp-g3yDm_IJC6U63aW8j1ZW6nbBGuy3gQ4muWI636Lc=w500-h500-s-no-gm?authuser=0",
    //6
    "https://lh3.googleusercontent.com/pw/AP1GczPRil-kFHJURefCd5fhbkBoYcyBsKrhr3HhUWiNUZgxQN3eHTKazTFLdUoHdKWZ0yJZLzeBUPm-OwoQel96PB_rSVePyZt8kdB60B_TxR6J9-at0O3l2-oFcycPfXZ8w8VMgNoK40StSPLB7QRX0fzN=w462-h304-s-no-gm?authuser=0",
    //7
    "https://lh3.googleusercontent.com/pw/AP1GczPukATg3jAXCjZDY867BAb-j0ERu2HEc8RaFhFNanja4JN2R5PzQfXGHsINOSkzaT2NIsQyE-mKpzKaSPBf6vFwC3BFeuXF8wmNSWn9XFuXeLzpO46kDX6ltwcDIZxuWBnYihhxHeOhHMjAmhMXo7eu=w500-h375-s-no-gm?authuser=0",
    //8
    "https://lh3.googleusercontent.com/pw/AP1GczM0xrQmwPYspqtjCTkeghtJSin1l4HJSMzQX5WJVgQbE0PMJsAyGkpr5VOp1FmsNkheCx887rn_6QCZxK2ONo_QkQH_CN0O_SPRmPjJEX0tNf8yS0hOvjEir3JkG8DkwisUfisScSz0Fanz8YDFsv0p=w564-h376-s-no-gm?authuser=0",
    //1
    "https://lh3.googleusercontent.com/pw/AP1GczOaB35Uho0UCzOd05UgXRGu5bUZAy06SUxWQrn1dry_dz8vX17gWpg3KgKx94AAlomXbQhspG0JorfrHZdjAxfooB6EVO4iCdDrNxNSeTf1_fZsaXYjb46YHugPk--PUc1vMwssN-q2-SV5fOQqwWAS=w501-h498-s-no-gm?authuser=0",
    //2
    "https://lh3.googleusercontent.com/pw/AP1GczNX-ANI_F0Www48NWkSTU3mSNmySXHZq5FYm8Eg3YvvZzMbmftjS247wU0ZPDq__J_aHjXMsSyk8X-ljzq2ZhmmWrY5TXebkL6PZg1tBmW96N7nJk1djrHd717bN6Jmew5RnMkLMzzI5sRs7WUGZtrj=w360-h360-s-no-gm?authuser=0",
    //3
    "https://lh3.googleusercontent.com/pw/AP1GczOsW3vVlJhE3-xh1gbxlJxeXD0gQccITY9YuEWhbBPYO3lVJyysDokxGNam-GrM9VkptQEXW33uw0IV-vLvopnFRFtisxpvxmJWn_h_ZtHZdeeAJT26Sa8TK4j7JKGgQtErL4OYFVe-GM2WRI1udUak=w416-h416-s-no-gm?authuser=0",
    //4
    "https://lh3.googleusercontent.com/pw/AP1GczPnOj3H-WenknYrlQ8wRfPI96DknkApGdVaFsqcREt2WyoFhikrQDFSKDhqiEtQ-6_gm4hutfP6EL1obee_Byl6AYxE889LxijDI_IhT1scWvKO2nZhQkcCde-x2Q-XyLB_3L5-02aRPLLUlcyZ0-JR=w375-h666-s-no-gm?authuser=0",
    //5
    "https://lh3.googleusercontent.com/pw/AP1GczPHHWTY0VvzAYCQJrH54-4UFli1H5rb7p_19FgqHf4fj5eDeJE6VWKBUL7pORCWA5cjtKCurmmyrUoacGbtP84C-2sxeokg7lo43VCSnXvyeBp-g3yDm_IJC6U63aW8j1ZW6nbBGuy3gQ4muWI636Lc=w500-h500-s-no-gm?authuser=0",
    //6
    "https://lh3.googleusercontent.com/pw/AP1GczPRil-kFHJURefCd5fhbkBoYcyBsKrhr3HhUWiNUZgxQN3eHTKazTFLdUoHdKWZ0yJZLzeBUPm-OwoQel96PB_rSVePyZt8kdB60B_TxR6J9-at0O3l2-oFcycPfXZ8w8VMgNoK40StSPLB7QRX0fzN=w462-h304-s-no-gm?authuser=0",
    //7
    "https://lh3.googleusercontent.com/pw/AP1GczPukATg3jAXCjZDY867BAb-j0ERu2HEc8RaFhFNanja4JN2R5PzQfXGHsINOSkzaT2NIsQyE-mKpzKaSPBf6vFwC3BFeuXF8wmNSWn9XFuXeLzpO46kDX6ltwcDIZxuWBnYihhxHeOhHMjAmhMXo7eu=w500-h375-s-no-gm?authuser=0",
    //8
    "https://lh3.googleusercontent.com/pw/AP1GczM0xrQmwPYspqtjCTkeghtJSin1l4HJSMzQX5WJVgQbE0PMJsAyGkpr5VOp1FmsNkheCx887rn_6QCZxK2ONo_QkQH_CN0O_SPRmPjJEX0tNf8yS0hOvjEir3JkG8DkwisUfisScSz0Fanz8YDFsv0p=w564-h376-s-no-gm?authuser=0",
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
