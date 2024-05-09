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
    "https://lh3.googleusercontent.com/pw/AP1GczOo6FNGuDYQsWTmCmqaLwwfxCq37tor473Q3lfculCBv_qdgwN0-zpQDlhRDwHpuWEf-NQEenoR4kUosspyoDEcbVhYMWSkQIAc6sdfqk14b1fqbXyB-QEiUk929xp5VO2eaG8efdHTnaOldkHlUNKE=w474-h280-s-no-gm?authuser=0",
    //2
    "https://lh3.googleusercontent.com/pw/AP1GczOUOzBR6nJnFgA3hs4U9-63m2L7SiL-E3RN9xBihUYKLfcjNPC8eBxGg_I68np86weGb6Na10vsFDuboLHWs78QKkNkLMyJ_lIoqUq9ow80anH5lVUyOfKGD_ikhVUnVBBbmXcsxLhQLQUP4wjn66Kw=w427-h584-s-no-gm?authuser=0",
    //3
    "https://lh3.googleusercontent.com/pw/AP1GczM_GwGY18B3-cPLWTwki4lI598uYIJEvSyeGlw0As8_zbzqQzQaun_6WRWxC2CoyXz-BluI94YcJX6ym3oG9KYGBQ2Xs6zsbuW3Qs_upBGailh2lpRpYigS5znWxiZn5EenbcVm0Cml0TA93d7qSJ_T=w447-h559-s-no-gm?authuser=0",
    //4
    "https://lh3.googleusercontent.com/pw/AP1GczOCAxU2hQBzwLT3hOQBIAODlMy_2mRgR-yxSv4Tno2Xj6rHPlGzmzG2JWVXXp7-uKaC2cFvwcqVADamI3oictrqSR7Dlyh0CIl9LVaeZNmJUXyQ4AKlNbuR6UsGxvxf0ffyOIjhxm2ySSaCSHoiW1k-=w504-h495-s-no-gm?authuser=0",
    //5
    "https://lh3.googleusercontent.com/pw/AP1GczPmzvfIKXR2fLPTsh4J4vRitq0lKTALqQ4pwUmB8mcmMN1_D67cn_FCYqf0tx2QskhptUF49Y29k_9seY9u1fhYfWD1GqE64nlCkmFpD1n-Hh52lsRvLSNK_zzKPgUKcHytN3Lv1XP2zmpvc2g8yOkr=w563-h375-s-no-gm?authuser=0",
    //6
    "https://lh3.googleusercontent.com/pw/AP1GczP1vtQI-bjERaigaOG_sBIZeU-ELILTyhnI5HMrAu0ObxhK6OLYDla9e5rrr9l_gwcGJo5q3QxSDeJO6tmoJU17RXGGDOTGDOya3vBU0zoe29mOg2D3cERTBFzmnYL23CNcXSSFYZ04v2cVb4JfaWNh=w500-h500-s-no-gm?authuser=0",
    //7
    "https://lh3.googleusercontent.com/pw/AP1GczNUqru7qDMtzuKBuBc-PWLwRLzxzITdD6ndeRsX7-cSGb3s9ax9Pk5SXyVDpQXAFD_4s3jOSPIV27HmIcd0A4_gQXKxyAXYcpiQcD4QjxwU6XGvoBYUsIMoeL6jJznCTABHOLmSZ13ZIR2AIZ9IdAaa=w400-h500-s-no-gm?authuser=0",
    //8
    "https://lh3.googleusercontent.com/pw/AP1GczMS-kdoN3hNhcQQlEkPF2p1gJ94_GOpqcoC3c9USsHRaWiBmAa2w4EfKHrM0ibbPS2eH3ZoLKtKT_vlXJgP1vh5B5B5ztycbB-M0ZIFHJ1hqInQDr7EAXg8H6kleH5Sh66G9hbnlImfnIsAXJ6_5m8T=w433-h577-s-no-gm?authuser=0",
    //1
    "https://lh3.googleusercontent.com/pw/AP1GczOo6FNGuDYQsWTmCmqaLwwfxCq37tor473Q3lfculCBv_qdgwN0-zpQDlhRDwHpuWEf-NQEenoR4kUosspyoDEcbVhYMWSkQIAc6sdfqk14b1fqbXyB-QEiUk929xp5VO2eaG8efdHTnaOldkHlUNKE=w474-h280-s-no-gm?authuser=0",
    //2
    "https://lh3.googleusercontent.com/pw/AP1GczOUOzBR6nJnFgA3hs4U9-63m2L7SiL-E3RN9xBihUYKLfcjNPC8eBxGg_I68np86weGb6Na10vsFDuboLHWs78QKkNkLMyJ_lIoqUq9ow80anH5lVUyOfKGD_ikhVUnVBBbmXcsxLhQLQUP4wjn66Kw=w427-h584-s-no-gm?authuser=0",
    //3
    "https://lh3.googleusercontent.com/pw/AP1GczM_GwGY18B3-cPLWTwki4lI598uYIJEvSyeGlw0As8_zbzqQzQaun_6WRWxC2CoyXz-BluI94YcJX6ym3oG9KYGBQ2Xs6zsbuW3Qs_upBGailh2lpRpYigS5znWxiZn5EenbcVm0Cml0TA93d7qSJ_T=w447-h559-s-no-gm?authuser=0",
    //4
    "https://lh3.googleusercontent.com/pw/AP1GczOCAxU2hQBzwLT3hOQBIAODlMy_2mRgR-yxSv4Tno2Xj6rHPlGzmzG2JWVXXp7-uKaC2cFvwcqVADamI3oictrqSR7Dlyh0CIl9LVaeZNmJUXyQ4AKlNbuR6UsGxvxf0ffyOIjhxm2ySSaCSHoiW1k-=w504-h495-s-no-gm?authuser=0",
    //5
    "https://lh3.googleusercontent.com/pw/AP1GczPmzvfIKXR2fLPTsh4J4vRitq0lKTALqQ4pwUmB8mcmMN1_D67cn_FCYqf0tx2QskhptUF49Y29k_9seY9u1fhYfWD1GqE64nlCkmFpD1n-Hh52lsRvLSNK_zzKPgUKcHytN3Lv1XP2zmpvc2g8yOkr=w563-h375-s-no-gm?authuser=0",
    //6
    "https://lh3.googleusercontent.com/pw/AP1GczP1vtQI-bjERaigaOG_sBIZeU-ELILTyhnI5HMrAu0ObxhK6OLYDla9e5rrr9l_gwcGJo5q3QxSDeJO6tmoJU17RXGGDOTGDOya3vBU0zoe29mOg2D3cERTBFzmnYL23CNcXSSFYZ04v2cVb4JfaWNh=w500-h500-s-no-gm?authuser=0",
    //7
    "https://lh3.googleusercontent.com/pw/AP1GczNUqru7qDMtzuKBuBc-PWLwRLzxzITdD6ndeRsX7-cSGb3s9ax9Pk5SXyVDpQXAFD_4s3jOSPIV27HmIcd0A4_gQXKxyAXYcpiQcD4QjxwU6XGvoBYUsIMoeL6jJznCTABHOLmSZ13ZIR2AIZ9IdAaa=w400-h500-s-no-gm?authuser=0",
    //8
    "https://lh3.googleusercontent.com/pw/AP1GczMS-kdoN3hNhcQQlEkPF2p1gJ94_GOpqcoC3c9USsHRaWiBmAa2w4EfKHrM0ibbPS2eH3ZoLKtKT_vlXJgP1vh5B5B5ztycbB-M0ZIFHJ1hqInQDr7EAXg8H6kleH5Sh66G9hbnlImfnIsAXJ6_5m8T=w433-h577-s-no-gm?authuser=0",
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
