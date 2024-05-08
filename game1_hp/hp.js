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
      "https://lh3.googleusercontent.com/pw/AP1GczOe3H2X-PB0UR_otlrfAcigS9iQloGlHJZTuqftvQQw44NRNN3oTz_FuUAxrXlQKxH2qJKtK5yPasOLp4_8stcULlSnsjLJZ0JHrhMihlCfd2EVfO9nW6VSOfPos3wwxF2fQOgXvInP4QnCsrmUm5t2=w433-h577-s-no",
      //Link2
      "https://lh3.googleusercontent.com/pw/AP1GczMO_AW0mp9cBdL56SyROMdET7t8XjocaHDWa2xURete82JsoaiVViPutCCBHlU-H-bxCCaxc3wvXBhHRT0v9oJl-NxNRG9zNKkBMoi6OT0e3caM-d5YgG4hTUi4NicIUTlBg5ENgD4NPWmzC2SdPrKo=w458-h544-s-no",
      //Link3
      "https://lh3.googleusercontent.com/pw/AP1GczO_sHPTb5znHpIw_zE-OciO--WA4whf7Pl0ySHb3VI1onruxOSGmZ5j5qHWtLXS3oBWFrEEXcCshhSPIecE5K77HNF--N1G3BJs-_s0TBZCDDC3lgJ0dT0Ty5ndlpBUWEN06z5seGKCvYDPauY2tPCf=w473-h527-s-no",
      //Link4
      "https://lh3.googleusercontent.com/pw/AP1GczOLeINJWodrVp5-gct8YRztC6jB0Y43p70nVFPEDTcnHsiZ_eYATQopnVrKfAhnH83v5TFkDrjzcJIgaakbr8mwax0i3d6MlAp1uP7udccRBVZjcDIr2JY1hRU2DDXxOJxnVTBPCPlG00RKTsUDMJ_q=w500-h500-s-no",
      //Link5
      "https://lh3.googleusercontent.com/pw/AP1GczNGvw6Lop0IZH9KeiL7UPhWYaZDDE5PXOQCowQpY-Hw4TXtvGC7TPV-1j08ienilPbptc32qbByppTi99Wp1bwUMBjkNAWwakR0AwLb9-z1OUFUW8yeaU3to6fq5FIdZRDfAwqqBJoAKuY8g0TITY4A=w456-h547-s-no",
      //Link6
      "https://lh3.googleusercontent.com/pw/AP1GczMHSC1gd4zJiaOLOOTleu7ClCRNmG5aW1FW0ND6dfLLbm_Q9iIJaGZiwLXeQXnHl6DD8sDmhP_IoJh-4JmAQrygBL6yYSUNaZCGDtAc_YXEnLn9k3YuRiy3lHjMCR3tuloHBbjc4I1BcvWD2c2ixq--=w421-h592-s-no",
      //Link7
      "https://lh3.googleusercontent.com/pw/AP1GczMMOu5K2IVZ7NA__NZsZvY5SLTsTwQlAB0F7vkRHYqCCseF3GVjNpsZml4kauTlsR-0ej1yV0Uvllpg-01_fFuS-Qp6GT_QAnxauoryF9lM8bmGZwCYrajUNFT3VNHFmW9FZaT1VO-D-azqZ-5opMlAxxDods-ybZySAE2UkQ7VVwIIT0bDgjL7mBpBsu8i25RXXxV38F243GrMJg9UsfmevmCppHfsPwW4koNxS4MBuA6LtE0YpSK2o0tfGh5AUsso2bN2EcObbOVJ_pg_JBFvwi9nXqL-cxgqAxWndqieaNl7lsKc0-JUUGv5C5pDsyNQXWriZGM1QrBaNab2VZOgnYVMPtb5tgFbhQSATAQt3Y-JrCP3Xj407XQuo_ajKuNFYXoQJsSrPSODNohFs5ahbj15FqfBDZXgVyr2EnE-iXcxqiNc7fZOe8nL7fbE0fmnmcHok5qs3ZkGqgeJcPR7FLhKyDQqq74h4w_bCQrCogobSER-FFRoJOksDbRjnynXj4Y4p9z1n0Jd_ocuhPlgtaRf0c8mYhBFX-xNzstiuTxoGAHgjnqe_Cbc6Woh0OFEnElz0fuEK4RZND8oM6aS9eN5fC2zB_L5Oe-fP6rlTgM91mocvsPAaM0RjmqldvIR_Bse7WsfWaxAUtgS9hVex6DwH-NbgvrH917mhulbf42FvGJOrMTIcV-GKe_AnHLdPOLNGLeZXpWLTRWTH0WNP3CKYa9ybjR9NaUbJzYPDMuqi9XGDdemwJtalPOkMOT_q-X75XNPDJi99QgWFzm2SOCHFgARU14Ea9o6UkXajaI6O4vF9raq-ZAprXZUmTvMhJ5JIST31--RB4d0dWov2utvP6oqPjDKaGcPLrok7xg-l3ypO7qePfOF3X9q2lmUwdLdjR2XnJyixAd2gXHOmnB4MOXh0tAvhbKeRJtVMH6z2qhKTacjd6C0p2qGwmGho0dZ_vy72AN2JXPInZW1n9trPWc=w500-h500-s-no-gm?authuser=2",
      //Link8
      "https://lh3.googleusercontent.com/pw/AP1GczNaeHQsrHRyAp1q879_G4jqH3SehD-tPOvZGqqaZeGkjQTtWN3KNafBryYCjym5w73DtYxsYSJbGpm0qN8uOhIVRh2oRXjfEpmGaOrhnIspQNOHPxKJ3gVYqlUVEeek2FVJbJBfMqMt41CLBiy9ZjpYexB3S1jlL3cSGHm-H-LnCtwqQZhjK-vVq0dwAqSilOzNb5m09LAVqyERjIxH98MHa4gApIx9tr9A0Kj8ytQuoDKzWH2ntIBiEXE_Q0aQEmroB8N7ZFMSiKKjRsbcUWe10wAc6PvZxZWG_6NOUtMVUa7IYLSULy1mgeJ6Zm2HxbpRzF1kZguMhyno6-3eG9VhlEhuvUJ4RSN90i29J4Jh93Qkby43vpeT1maFqxNIDVlON1X9mMhh2UMQuYO8Oqaj-J-EXcblnSukwV4_jtV7BPndHdAN8u9bwZHlwPK-crIo2dsP8kaP8C8OY3UXX7PWtfw8oAjaFKg5XXmxBFqZTcpTBNGBSIYgjN9pj-YpK4OT67iRBCCjygJZGau7xX2VMz6gybR8taGcLqwcKTfB_UDddMsDCVFVNWOpYl0PG2AWd0o1fJ4nlYamjvfbbf-VdF_CgyjbJYhrYwUTegd33n4QDIQa-ldEN3DwMDn8rdrUQ2HAAkk8oqbycd9u253zVnvP4qyUVVRZWI3Ph4cJ0MPtR6aShKYs6axM-J6-4oElxVZ5dUSLWxqVgqq-4N6dmbtNgtCiUdjiaAM4JvS27ewQHp_rrMoi1kddoOaX5vUM_AQTqWvRbxeeqepej5dQPTSlDJVlrnjm2iHabZpRFa9Ns0K8OKJgHdP3zuWCRDuxLS-PdgmXwLLotmiD9wlsQ6PF1mwfjxFeIrnhi1BGGVAOcE9hvnqBAglycx0tz907E0E1IriBsvWoHAoxFgeNnjEPPpviNsI6do-2V9Uepb8X7DXh8LknxObSc9G_j2e8QPdCp8SWhqFR24izU_7Aa3gxTGc=w433-h577-s-no-gm?authuser=2",
    //Link1
    "https://lh3.googleusercontent.com/pw/AP1GczOe3H2X-PB0UR_otlrfAcigS9iQloGlHJZTuqftvQQw44NRNN3oTz_FuUAxrXlQKxH2qJKtK5yPasOLp4_8stcULlSnsjLJZ0JHrhMihlCfd2EVfO9nW6VSOfPos3wwxF2fQOgXvInP4QnCsrmUm5t2=w433-h577-s-no",
    //Link2
    "https://lh3.googleusercontent.com/pw/AP1GczMO_AW0mp9cBdL56SyROMdET7t8XjocaHDWa2xURete82JsoaiVViPutCCBHlU-H-bxCCaxc3wvXBhHRT0v9oJl-NxNRG9zNKkBMoi6OT0e3caM-d5YgG4hTUi4NicIUTlBg5ENgD4NPWmzC2SdPrKo=w458-h544-s-no",
    //Link3
    "https://lh3.googleusercontent.com/pw/AP1GczO_sHPTb5znHpIw_zE-OciO--WA4whf7Pl0ySHb3VI1onruxOSGmZ5j5qHWtLXS3oBWFrEEXcCshhSPIecE5K77HNF--N1G3BJs-_s0TBZCDDC3lgJ0dT0Ty5ndlpBUWEN06z5seGKCvYDPauY2tPCf=w473-h527-s-no",
    //Link4
    "https://lh3.googleusercontent.com/pw/AP1GczOLeINJWodrVp5-gct8YRztC6jB0Y43p70nVFPEDTcnHsiZ_eYATQopnVrKfAhnH83v5TFkDrjzcJIgaakbr8mwax0i3d6MlAp1uP7udccRBVZjcDIr2JY1hRU2DDXxOJxnVTBPCPlG00RKTsUDMJ_q=w500-h500-s-no",
    //Link5
    "https://lh3.googleusercontent.com/pw/AP1GczNGvw6Lop0IZH9KeiL7UPhWYaZDDE5PXOQCowQpY-Hw4TXtvGC7TPV-1j08ienilPbptc32qbByppTi99Wp1bwUMBjkNAWwakR0AwLb9-z1OUFUW8yeaU3to6fq5FIdZRDfAwqqBJoAKuY8g0TITY4A=w456-h547-s-no",
    //Link6
    "https://lh3.googleusercontent.com/pw/AP1GczMHSC1gd4zJiaOLOOTleu7ClCRNmG5aW1FW0ND6dfLLbm_Q9iIJaGZiwLXeQXnHl6DD8sDmhP_IoJh-4JmAQrygBL6yYSUNaZCGDtAc_YXEnLn9k3YuRiy3lHjMCR3tuloHBbjc4I1BcvWD2c2ixq--=w421-h592-s-no",
    //Link7
    "https://lh3.googleusercontent.com/pw/AP1GczMMOu5K2IVZ7NA__NZsZvY5SLTsTwQlAB0F7vkRHYqCCseF3GVjNpsZml4kauTlsR-0ej1yV0Uvllpg-01_fFuS-Qp6GT_QAnxauoryF9lM8bmGZwCYrajUNFT3VNHFmW9FZaT1VO-D-azqZ-5opMlAxxDods-ybZySAE2UkQ7VVwIIT0bDgjL7mBpBsu8i25RXXxV38F243GrMJg9UsfmevmCppHfsPwW4koNxS4MBuA6LtE0YpSK2o0tfGh5AUsso2bN2EcObbOVJ_pg_JBFvwi9nXqL-cxgqAxWndqieaNl7lsKc0-JUUGv5C5pDsyNQXWriZGM1QrBaNab2VZOgnYVMPtb5tgFbhQSATAQt3Y-JrCP3Xj407XQuo_ajKuNFYXoQJsSrPSODNohFs5ahbj15FqfBDZXgVyr2EnE-iXcxqiNc7fZOe8nL7fbE0fmnmcHok5qs3ZkGqgeJcPR7FLhKyDQqq74h4w_bCQrCogobSER-FFRoJOksDbRjnynXj4Y4p9z1n0Jd_ocuhPlgtaRf0c8mYhBFX-xNzstiuTxoGAHgjnqe_Cbc6Woh0OFEnElz0fuEK4RZND8oM6aS9eN5fC2zB_L5Oe-fP6rlTgM91mocvsPAaM0RjmqldvIR_Bse7WsfWaxAUtgS9hVex6DwH-NbgvrH917mhulbf42FvGJOrMTIcV-GKe_AnHLdPOLNGLeZXpWLTRWTH0WNP3CKYa9ybjR9NaUbJzYPDMuqi9XGDdemwJtalPOkMOT_q-X75XNPDJi99QgWFzm2SOCHFgARU14Ea9o6UkXajaI6O4vF9raq-ZAprXZUmTvMhJ5JIST31--RB4d0dWov2utvP6oqPjDKaGcPLrok7xg-l3ypO7qePfOF3X9q2lmUwdLdjR2XnJyixAd2gXHOmnB4MOXh0tAvhbKeRJtVMH6z2qhKTacjd6C0p2qGwmGho0dZ_vy72AN2JXPInZW1n9trPWc=w500-h500-s-no-gm?authuser=2",
    //Link8
    "https://lh3.googleusercontent.com/pw/AP1GczNaeHQsrHRyAp1q879_G4jqH3SehD-tPOvZGqqaZeGkjQTtWN3KNafBryYCjym5w73DtYxsYSJbGpm0qN8uOhIVRh2oRXjfEpmGaOrhnIspQNOHPxKJ3gVYqlUVEeek2FVJbJBfMqMt41CLBiy9ZjpYexB3S1jlL3cSGHm-H-LnCtwqQZhjK-vVq0dwAqSilOzNb5m09LAVqyERjIxH98MHa4gApIx9tr9A0Kj8ytQuoDKzWH2ntIBiEXE_Q0aQEmroB8N7ZFMSiKKjRsbcUWe10wAc6PvZxZWG_6NOUtMVUa7IYLSULy1mgeJ6Zm2HxbpRzF1kZguMhyno6-3eG9VhlEhuvUJ4RSN90i29J4Jh93Qkby43vpeT1maFqxNIDVlON1X9mMhh2UMQuYO8Oqaj-J-EXcblnSukwV4_jtV7BPndHdAN8u9bwZHlwPK-crIo2dsP8kaP8C8OY3UXX7PWtfw8oAjaFKg5XXmxBFqZTcpTBNGBSIYgjN9pj-YpK4OT67iRBCCjygJZGau7xX2VMz6gybR8taGcLqwcKTfB_UDddMsDCVFVNWOpYl0PG2AWd0o1fJ4nlYamjvfbbf-VdF_CgyjbJYhrYwUTegd33n4QDIQa-ldEN3DwMDn8rdrUQ2HAAkk8oqbycd9u253zVnvP4qyUVVRZWI3Ph4cJ0MPtR6aShKYs6axM-J6-4oElxVZ5dUSLWxqVgqq-4N6dmbtNgtCiUdjiaAM4JvS27ewQHp_rrMoi1kddoOaX5vUM_AQTqWvRbxeeqepej5dQPTSlDJVlrnjm2iHabZpRFa9Ns0K8OKJgHdP3zuWCRDuxLS-PdgmXwLLotmiD9wlsQ6PF1mwfjxFeIrnhi1BGGVAOcE9hvnqBAglycx0tz907E0E1IriBsvWoHAoxFgeNnjEPPpviNsI6do-2V9Uepb8X7DXh8LknxObSc9G_j2e8QPdCp8SWhqFR24izU_7Aa3gxTGc=w433-h577-s-no-gm?authuser=2",
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
