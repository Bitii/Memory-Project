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
    "https://lh3.googleusercontent.com/pw/AP1GczOVLaShmIbLLyBorWBmjL2j4r6etuMSSmTadmgADbjtMwlGdijm8bY7L2kJ2DEtKMDgz17b1LE-4UyLr0gd9udHD86lrmRSeSCYjGOJcicWGOAFgFvYKNoMJbBxwiRxIIVRBO_gEoJv4oLEqKNTrYDQhujH90YzoUYiTV0hIUh8erxk9FCfWdz55deivrhETq2VNtSSXFgx3JatMaNd-BSxP_KP52AaWBKzV2RMoKXpOgrIjmPV4A2yR05i_D5itq1S9DTIKPnKdTuuWbE2T-NxR_Cejq1Wz-k4qPeUdB7FRMZC_qjA8GL_7_zffbOTTPYPld6gTKVl6fi-il3nWtn-0aPhZnmVSt-9PpalHIV8VfN8lxD0AHmXD7JvBQDS1zemEMvbFfFnKOEUKHgdsJJxMmJOIiBuaFDulVJsM1Z7awgxEQXDgKrzp7fmA0A49qR_cwv_sROBOYWCAMoBd6K38ZLuNctLJbBSJC60anwfIG6hBfDKv1abZNApv8WNLsltuchqUCSZN2bOmuNl_pA2JgNGkJJNmDGInSlewJov2lHk_Jvs-C8b8NPjJag8Hnq-i6RXR4J0Z43Ttx45ys3wJJr0hlx2e1bzNBeoLLEQV7J_PjIPdZGZOb4b6Cr2Z52EK3rOTq5MkX-09zIBU-s0cjEe5M4s2xXPNYHgXqKaWRg9o_ob7aGccKh4O-K7Hih7Wqlpc07yOTqwWg4GbvEWeoDDY1u7vjhoFoTSLJqAO7f9fFQ5JVL47FEs1zqvNE7w34GsQ1LOrI78-9Gd-KKxFSJZ2MQwBEQaYwxnTuTc3bl4Rk5zkPl4r7Lvt_iro62UiwU_8m_OcvhG40VH6FvVb7uAeuTJ0kVR7nhQPc4DqORzhVjaLcsJpEEYfybSX8AH3WRY_wSBI9DF-ZvRXleQ9mED9IX8rGLxaD3ST9eH-jotx73vtYJ0qjfl=w554-h451-s-no-gm?authuser=1",
    //2
    "https://lh3.googleusercontent.com/pw/AP1GczPJ5GNNGkHg0QHWrXpid45IAx1ItHUQ1jeUJuDjB6614_L4AWY_d1Gby6oVtw7piehz9qum4j8AkbgqR42YrSwnFklZWDicPpvuMPhVawGsfMwc-ZHVT5bKTT_kaC-Di1y5-6i_DWp1H0PGzYq4K4TIqknmV-EGdkIppASHjia-GXn78fDnerWJm3z0n2y0d68hxzWbef3277JcoQlpRgMHqyznoFnv8afWbWK_AuxSldnjsOO89H0cnbvdCNI-2BoRJk3uwZ-1TYtj2Smi4w-uJk-pI-2XI5OHMCqqKgLwmWggsFlvQlb0S4uhaWa8iziSpJIoZrzJaRoWQxDglg8UQ_jbhSoDBfBf1Lv_KYFJywG199ENyyZfr54AyYblw-Kv_coKahxxFPH2D5tY4DEEOwosDvKecXx97TsZ8ZhCe0SAeYIGnMdcaZX6sE59Qeunp5wdqDGsaFvBlE-BNarZ6hXpZjUMb2syuwojaufb9O6S56YM5F31nxthx-upqIjuF80byEqyJtnN5cEfQac0ixWIujk4E-9-_ycdjDoVkmmTzR1F_atDvR9sronw_t9zHWTGXRKWOVFwVlxSlo0sUmdBILGPGSKiUi8ewWZTtY0riyEvc1F5VoUvrvH1wNLyDp--TF5Go9BhE_QmVNxbQJs7RebcXSS06LYxtBXP_3t66jJXc2uaMxFPgQSv0PfFqPtcYXwpODuTg2hd6gLoLeyfXjHFGzCNdA3Ghl5pcyBCEeiLV2Kvg4yCLdVQkgyqsJAArU7aCFX7Tzr3rEe7HIpcQJ9YMu4EqX5Zb_mPW0ODhls8pymw5IZLS_PBUcp4YPHls3l_N48BpCHHZqx35WBr2Bb1No92JBChjX05GKsjeEejy0TXgE-Ow68Ynp0wvxg5CQeYTJlnEKzmQ4A_28a4CKBMaW-Yej9T7NAhQefNM31yBfmP0lEo=w400-h537-s-no-gm?authuser=1",
    //3
    "https://lh3.googleusercontent.com/pw/AP1GczOrHRMGKeYU_MQ8TlYwu29ucFDxFNjRt_uaINZMThgRdtA8ylmv1JvKrt5UkJ9j3-rezTxL9KLdY6biN8OgEPdmbZonGKEy6gE8O_g7dcj8EDDaDU3uDnQy1lp4nGpCS2Ybg-UORlwem-ezUlJ5fQ6AvKx71JduVYXohQdGycT3HnELuF0hdvh6xsOnIgZvnt90SLMZMpwTmqnn_p7BY2xiSRs220kXCGF1JGLA5VBWDUTZGa0SNNlMf0nI2t7cN-Ho_RKgh-TUzaCJEOnCKM_lkco9TZ-rlIfaaaO0XWhDFhsC8qaQ0RaIEIc2ecLuifCGVdKaeF-A6YtW3iw_mPc32yMRZl7-JeXvpz7iGLwt_9CSmYmrJZLb2mYnwhXXLORaQpCNyLgB92gCsoQe733-pwmNOGhpg9N7xmIrci-Ue4-zRrCf2Ebw92-N8IU7APSVyWvQ8vcQM2ohIDEShe0uamifo3HYHefNVW7JDcDHK4AXZbeWuSHr619BMtst8l1mAhiHd0wd01Rzv5yuXs07cj3PYUf0pCDlxtTgTWMhKFmWTJdv9E9Pb02kMLGaFZPpk6dIRkAozVJRJu6dse8gERTeq0GSbrkqZKBy8AgcToSExWySmb0YSH809WZ75fK-fK1ByLlLk2fVTZsPVs8CgL9LmGnWzzz2w0xD9dXQdphTB1c_1qhmRYEoQDmznxmKW0hEtC45_YUpmq8BK3EWefP6QdB5IrydrNva1J3n0hPFGYJXJUA8Q9e3-OhzyH4rrr07G6xVm2GAUcVUaUGfJkfaqPlILtmJ58q7BTW6dznW7pYki-PrTKCkfAWrcm21v3F3ez_BAWfJNTSTsMEe959x-Dp0tgGZS4Ihkog089boQ4KCrrihJfrACta_GFWSZGn6kYSjtktBNDBTQ8Btixg_35aOVC3KqpFa4tGomHJX1d1Afh88n2ZI=w433-h577-s-no-gm?authuser=1",
    //4
    "https://lh3.googleusercontent.com/pw/AP1GczNGdWKa9M972kHP5CgVvFjVcfk5orKxd-5OYTZJF0or39hpHhJKixsZesqoqLW0l0WaBs1rXXzOXgkCvAuLkuxsrAHAp_43OesDFIvsXD-kbZMPg_1PQVXHFCUG2bfotGJXZvstsNJhdnnwG5CTmkr6wi1lAtBsgZ0Zjf7eEOOTPHyrmYVuxXb8psdo1kCHo11tc_5-MxRxTuDfwM2HB8g9qDF9cIrD6IElmMd_MCPZfVznPGAEdo2DNYj7CChg7hZalOyLJLS195VSEWSeNYISA-q6gzNQgthUOoY92GDgHCF8aZP0DkJS7IR9mOH_008gLLCoGOkTgnkbQgYDL9Zz_-Dlw4bhJczDyyZrkgmKZbm1TvCxcyGLPw6X5sWksFdZz-SSNDW1HvG9zZS040HjE0AmlJXGl4VX99uDVtKK49AO0G_uczgFFnmHfXwNxRiE_GuJIC3mOXfjHquzRq3LhMCv6amgK3rEEOKhx7faOJAAgF4voN_DrffeXR0oUx5lB9y6FmAJqjvmZKCnJ234wJK9jO2Zmj2w63gtdihk0YeUazXWv0l6OkVvsscljfoj-6mUa1FbKT-3QzRvrHJHhr5lmKBsqgQfPkpolTLZRoXMpD7Pfxr3jkIvxFFc804Qoll6UNY7Bt0CfEt17ZvKJZqCnJOZPXxkeQIL2pV0Qw6AkeG6MelH0OSyNFXw1T-cFKrMoLL_b-gTNcqgVi4CJ9X3G9xVFBFCnOo6NJw1HZgz0W95u1JtMP3hTsVufFtSBwuInKEwnGAr8uul6eTePnlnFXXUuuoOyTaUCQ1uj2VaBPOPxuqntJ2sejcEZjUkNbCRnLkndY3joKLU-SR4BVe0OZhkqeeI4SdFTo1TUOWmtNbk5r1d3R4GIahaDle3-6rVqqLxn5jA0_mWW6uCQxoogxNJts2uZsmvn5eIREC0S-yvmsUcZ_LP=w404-h618-s-no-gm?authuser=1",
    //5
    "https://lh3.googleusercontent.com/pw/AP1GczNNniSCD7c8ya0JkFMd3aThP64-LV_RJ4eoCtHdo_yge5nxPw4gCLEekHhZ6ykeo1xC526JdF3syHpS_awhw1ENvflzYkPZL1Yb2VpYfBE2dMQnu2OOeK0WV0RXtKBTDa6q6-4sTGgI8ZqHgqZAR8T7t3MT7-9b4itOmmLVrf6QrV7ReEPdy-2GMtm9yMeYUGRkSPQewi68iaP5XgRyhrx9CLUuyzHnaSQ364Pqp0Jc4apnpttLcJp1lOu0oPeW_ogJwTRpiyzQpRYPCVmZdgvp4DTNE7sWTpf1pGMXHviiFpMp_ph4kDV-TyPZflEdDttWo9d3YqUN78V-TOfACFEarDv0laWxarpv9QpLYS8Zb7BE8vAqKT1uaLj0AKhwfAt1rO9Jky7T5yglrSEIkYVvYW31CC9u0FiktOM9ygQfs0DESvswRfY_UBCB2YZlwAoTPbTS6IXfsYuaP9GxyaSyf6TGqGMTioz-crhyUOv5KvTHuWmi0sotOyLG-yL9QR5f0FMOS2WpTIT-VD6Wv4S81IkBfEUn9Q665D283XzUcooG7hBPeGKgRTQ142YTLFLdVfU3WqMj7doj5X2CsoAZkX-ROGqoBOftCsaweNMMwms0Pj1CtYPKhiEAb6TiT3krs0XSdcNyxUvfCcnZW6r8Bf7m_9Jda68a_-yajAzA_wXWTQUwIxwG0YmVpkrI1uUzNt_k0eZkJKRgj4xYGP9b5QInvauHxC7mBrSGvKwuaQl4uuibWOVZK7UXRTDHgZWTiUT7nZb4He5y4U67Y-mKKW-OnVaYmniUXf10qidAMGEYDCCIUA-iY-rrLJDxaPQ8MGCyHKStmGOS0aVZ0_eIOgpE6ff8hbHVzpGjoZVPFM6DN5XCi4a3uxtWNZNQLZ-ABrDvhN_-gx2aPWLRwROVdqtDTVOueCv-zdzoDp-jSQJB1k4V8iLGF7oz=w400-h623-s-no-gm?authuser=1",
    //6
    "https://lh3.googleusercontent.com/pw/AP1GczPMaLTMoVldCitg9gnQrOp0xEUUjefcWFriKdTGqpZNWqqWOqkE1gI-myqGltffIad1M6vf1WIyOii-SI2a-YaRo7g_IhUrpfNUrWtNB_G8D6yY1Gxg_nzvAo6KF026bX3ijSTVTovjXq15mrTETV_nSZvEfwVKdHpMtktCEED1Xwxl5NSxMa6cm3WMfhEIhj50n8FnF4bVBI___k-Qkkg_5AwZeuQYHYXKzzbexpERtcFcqh_H-DAJNbjpyKs_KTDXs2qGiKnGNjzjzqhHzFbdJ1YVJTKEAbflcK2e1yMCZEn7W5EGtySt9BCyJkkZEXTM13k9GKhYJi_sUXg1LPq3LMPSs7gkkUDgs_jZERznRB_kt6oGkb1CILqg81UnO18LJvRYDoXLpHnqvGaA1lz8jGT8pejtTFfg7W_FrroWdR0UXCMKOH4E_Ue39gum0najdhYMD14eUHfuklt0icvKV_g1sFLjkXY1jlJ2Gq-_-75zgwH2UOagCkpM6cD28Ec86xzubCxfNuK2tqKa0eWvXbwlPGXVrmxyQDaGInrQ9BFD2emNQOAlpIKFbnA0p-33ih5VbiF3flv5YqZM93DJ0X_T6XLewmn98x2RJU4la73Zb1xqEsJktiRKJ-49vTbty35IwHnvVPopEahHttzIpZwL3tMUsof60s-Th7Fb1bJxlm7DphLyVc_tNjh1SlgZ1cVvqG9UiiB_uNga3MvymMke9OOyHHmS2x8GGOVFosNIEMAttPmX6f005RoS5TXCE7iGlrz43dWyRamERAdFR00iEAGYiTncQqnxqQv1TOybzxITOE7d_WSjjnPwl8Sbt0BFOJAoBnv_KN6ZQrlDgymr3B6RK5HgyxgUuYejUEaTU9TpLLj9cT_UIhI9O7mMZNJYhzd8OtST1V_Bx8KAnfbjySkctRpUZAurwROjInUj1Ms16gqrgOus=w430-h580-s-no-gm?authuser=1",
    //7
    "https://lh3.googleusercontent.com/pw/AP1GczMGPYm1bIV19atpZCsT0P_jOYWp25YycUSU4a-tvj8-XwT8r4F5CJIfBWw3faTiPfMhepDO0AhWxsXnnPv18BJ2zt5aVCFjKiaQByjN9Vu3tCjP-sCRS8uhnGpxDWipuiF8f8zx79DXUcMSTQRbNByojQLeOwlj7yNp_xANrHMIaa7DjKvuIrzuwFMHIsVXGw3PH-vFdCatkYanxeVKhAFC375WQgSDbuSgqS0zGeHQR_neuivyCFuAbp9dSNSnIBKKEwUeXeaMJbt5NLYzCpHmS7eLGUL2vEJpe9wtlBJiNpmom-oblJYB_eubP7END94aCz28B_zCQUlgnj4Hj9sM_O9y4nKJiCWMJFbpeoP-z1Sfgp6lNQbjPJWN2CQ3MiehAj36L-057euDAobrbm4biW-wBQPnyAoDyYBeRUPrbnsV91azU1KM9f1aUTLBPUlB3E7LWscnoVTlMJrKreI8qmCXEsIxSIAsUsRrcMIL7YYSUBdk1YUSVKv9qOK5352U5qUHpLscCTRz6vQ68B3GxO3nHZG5NFp4h5Jn-ADtlRYaBI5K_0lICN52-XxwkmCeQnIPPy8F4RMKlr6UfSz64oPz-Er9z-nINO7jLrC-EpgUJ6A7BEa7DE9EyHhtaC0SDCqGaHpGJaI0Dd4Fy8qp_D1lFPHabViLPgIw592iGarjfOAIlq5MeIwbff6H_Fx2BGRauqhWzVAM2RhPUIf6aMK3w4pWVnPDl2-I6FxqLiSz3ao3CzOPdli4E9nuMAkjyzOgoWYAAycO1iQE4btiyAoEZrIkG5Z9TCigJUzzGPVZmQ20bYOMUe8bs81a6_EphJCVVtq4o9cBzoy9w2uFZWNK2mqGdt4Be1kMANZNzc3J-y5v5bfpf3UQyMI8sswSbIWZ7P5cMghbpZvMSwyehJJmb3kcC9tlldCjp0oBX0_Q1jrA4vISDh78=w390-h639-s-no-gm?authuser=1",
    //8
    "https://lh3.googleusercontent.com/pw/AP1GczM1aq12HLxK00dnkuDhspOwtqcuN3PEuqaGrtcRkF34ipV1Vs3Fj_jpbpxCj2SRfrgc3v3vkJ8qUXk6qvzEzNP0Kga18IJTZjYxPofg2947W-B35nBQ4jG_5p9vtwKDtxiJHVlrL5DtqjMgyIXpvuT41hAMusmMPlrGR6lc2XWz8ioUhsgUd96BO96z3gBr3VjrOe3YoAqGsUJTANiYrkZ2nFegZtHNwEPhSq6VrkUMZOeeE0LkL4muBv_HVJ0ROFfQj90ZEEqKzWCbSL6pYpgIEJ7d7kJNF-cK9BoV4sr1EyObKc-q4yd-kdMi_b4N579UKqnJwlrKwh_G_TY1vhAJi1KLFynoAT0fU-QQo2s3MUck-fftxW0mwKSoCR60VY9xIrySy4IAZld6Y8g-bd5EoLLLkmVTFJNq9cLSDurZIXgOAgnAKUqNGLb6NzNInhQaF-br68VcYz0z5k75YZ-jRFjUfgm2rCvVpnzV_cuaGvURCbBR46_gtduGzLeMLDrr2ryPbLUzuUulXGHuWgZ2sXoSuS2QuhSPYWpmDeMmXr9GN62c2PMaC9LVLCAdGbcq6kj2_W8cv8oC2BXNrAGPZVHJyO1k2C6ajFFh6DQ5vDhCkFtMmkHz5IlNYQ45YfRpdqm4Kvzj9o2kFDDMt9cwAqBsHKxzac_f0tsCqrwrkYTuQqboakr7AtNoJW7Jb4tb9A4nzBwPLvhhALsZoUD7epBnn-RWO44oA4R54wXA6eT6IY6ijFzFzu0OgOnXVO25Mqx5kLzaxqLoGLRcLlQw6RvJLDmFd5ZzMi-JimulRCHyENAOGQC4oSilqUHkLIGWwmEzkgaISp9HRPWtuVF97Gp716dz0rSLQwIe-aD9fyOg4oI9Q3Q_GEKN4v1OS9mtizqm2BkRO2bBtUVkoIns8aXIwcHFEPJFBtPZkZMYx178bg5Ue5F8Ir9Y=w500-h500-s-no-gm?authuser=1",
    //1
    "https://lh3.googleusercontent.com/pw/AP1GczOVLaShmIbLLyBorWBmjL2j4r6etuMSSmTadmgADbjtMwlGdijm8bY7L2kJ2DEtKMDgz17b1LE-4UyLr0gd9udHD86lrmRSeSCYjGOJcicWGOAFgFvYKNoMJbBxwiRxIIVRBO_gEoJv4oLEqKNTrYDQhujH90YzoUYiTV0hIUh8erxk9FCfWdz55deivrhETq2VNtSSXFgx3JatMaNd-BSxP_KP52AaWBKzV2RMoKXpOgrIjmPV4A2yR05i_D5itq1S9DTIKPnKdTuuWbE2T-NxR_Cejq1Wz-k4qPeUdB7FRMZC_qjA8GL_7_zffbOTTPYPld6gTKVl6fi-il3nWtn-0aPhZnmVSt-9PpalHIV8VfN8lxD0AHmXD7JvBQDS1zemEMvbFfFnKOEUKHgdsJJxMmJOIiBuaFDulVJsM1Z7awgxEQXDgKrzp7fmA0A49qR_cwv_sROBOYWCAMoBd6K38ZLuNctLJbBSJC60anwfIG6hBfDKv1abZNApv8WNLsltuchqUCSZN2bOmuNl_pA2JgNGkJJNmDGInSlewJov2lHk_Jvs-C8b8NPjJag8Hnq-i6RXR4J0Z43Ttx45ys3wJJr0hlx2e1bzNBeoLLEQV7J_PjIPdZGZOb4b6Cr2Z52EK3rOTq5MkX-09zIBU-s0cjEe5M4s2xXPNYHgXqKaWRg9o_ob7aGccKh4O-K7Hih7Wqlpc07yOTqwWg4GbvEWeoDDY1u7vjhoFoTSLJqAO7f9fFQ5JVL47FEs1zqvNE7w34GsQ1LOrI78-9Gd-KKxFSJZ2MQwBEQaYwxnTuTc3bl4Rk5zkPl4r7Lvt_iro62UiwU_8m_OcvhG40VH6FvVb7uAeuTJ0kVR7nhQPc4DqORzhVjaLcsJpEEYfybSX8AH3WRY_wSBI9DF-ZvRXleQ9mED9IX8rGLxaD3ST9eH-jotx73vtYJ0qjfl=w554-h451-s-no-gm?authuser=1",
    //2
    "https://lh3.googleusercontent.com/pw/AP1GczPJ5GNNGkHg0QHWrXpid45IAx1ItHUQ1jeUJuDjB6614_L4AWY_d1Gby6oVtw7piehz9qum4j8AkbgqR42YrSwnFklZWDicPpvuMPhVawGsfMwc-ZHVT5bKTT_kaC-Di1y5-6i_DWp1H0PGzYq4K4TIqknmV-EGdkIppASHjia-GXn78fDnerWJm3z0n2y0d68hxzWbef3277JcoQlpRgMHqyznoFnv8afWbWK_AuxSldnjsOO89H0cnbvdCNI-2BoRJk3uwZ-1TYtj2Smi4w-uJk-pI-2XI5OHMCqqKgLwmWggsFlvQlb0S4uhaWa8iziSpJIoZrzJaRoWQxDglg8UQ_jbhSoDBfBf1Lv_KYFJywG199ENyyZfr54AyYblw-Kv_coKahxxFPH2D5tY4DEEOwosDvKecXx97TsZ8ZhCe0SAeYIGnMdcaZX6sE59Qeunp5wdqDGsaFvBlE-BNarZ6hXpZjUMb2syuwojaufb9O6S56YM5F31nxthx-upqIjuF80byEqyJtnN5cEfQac0ixWIujk4E-9-_ycdjDoVkmmTzR1F_atDvR9sronw_t9zHWTGXRKWOVFwVlxSlo0sUmdBILGPGSKiUi8ewWZTtY0riyEvc1F5VoUvrvH1wNLyDp--TF5Go9BhE_QmVNxbQJs7RebcXSS06LYxtBXP_3t66jJXc2uaMxFPgQSv0PfFqPtcYXwpODuTg2hd6gLoLeyfXjHFGzCNdA3Ghl5pcyBCEeiLV2Kvg4yCLdVQkgyqsJAArU7aCFX7Tzr3rEe7HIpcQJ9YMu4EqX5Zb_mPW0ODhls8pymw5IZLS_PBUcp4YPHls3l_N48BpCHHZqx35WBr2Bb1No92JBChjX05GKsjeEejy0TXgE-Ow68Ynp0wvxg5CQeYTJlnEKzmQ4A_28a4CKBMaW-Yej9T7NAhQefNM31yBfmP0lEo=w400-h537-s-no-gm?authuser=1",
    //3
    "https://lh3.googleusercontent.com/pw/AP1GczOrHRMGKeYU_MQ8TlYwu29ucFDxFNjRt_uaINZMThgRdtA8ylmv1JvKrt5UkJ9j3-rezTxL9KLdY6biN8OgEPdmbZonGKEy6gE8O_g7dcj8EDDaDU3uDnQy1lp4nGpCS2Ybg-UORlwem-ezUlJ5fQ6AvKx71JduVYXohQdGycT3HnELuF0hdvh6xsOnIgZvnt90SLMZMpwTmqnn_p7BY2xiSRs220kXCGF1JGLA5VBWDUTZGa0SNNlMf0nI2t7cN-Ho_RKgh-TUzaCJEOnCKM_lkco9TZ-rlIfaaaO0XWhDFhsC8qaQ0RaIEIc2ecLuifCGVdKaeF-A6YtW3iw_mPc32yMRZl7-JeXvpz7iGLwt_9CSmYmrJZLb2mYnwhXXLORaQpCNyLgB92gCsoQe733-pwmNOGhpg9N7xmIrci-Ue4-zRrCf2Ebw92-N8IU7APSVyWvQ8vcQM2ohIDEShe0uamifo3HYHefNVW7JDcDHK4AXZbeWuSHr619BMtst8l1mAhiHd0wd01Rzv5yuXs07cj3PYUf0pCDlxtTgTWMhKFmWTJdv9E9Pb02kMLGaFZPpk6dIRkAozVJRJu6dse8gERTeq0GSbrkqZKBy8AgcToSExWySmb0YSH809WZ75fK-fK1ByLlLk2fVTZsPVs8CgL9LmGnWzzz2w0xD9dXQdphTB1c_1qhmRYEoQDmznxmKW0hEtC45_YUpmq8BK3EWefP6QdB5IrydrNva1J3n0hPFGYJXJUA8Q9e3-OhzyH4rrr07G6xVm2GAUcVUaUGfJkfaqPlILtmJ58q7BTW6dznW7pYki-PrTKCkfAWrcm21v3F3ez_BAWfJNTSTsMEe959x-Dp0tgGZS4Ihkog089boQ4KCrrihJfrACta_GFWSZGn6kYSjtktBNDBTQ8Btixg_35aOVC3KqpFa4tGomHJX1d1Afh88n2ZI=w433-h577-s-no-gm?authuser=1",
    //4
    "https://lh3.googleusercontent.com/pw/AP1GczNGdWKa9M972kHP5CgVvFjVcfk5orKxd-5OYTZJF0or39hpHhJKixsZesqoqLW0l0WaBs1rXXzOXgkCvAuLkuxsrAHAp_43OesDFIvsXD-kbZMPg_1PQVXHFCUG2bfotGJXZvstsNJhdnnwG5CTmkr6wi1lAtBsgZ0Zjf7eEOOTPHyrmYVuxXb8psdo1kCHo11tc_5-MxRxTuDfwM2HB8g9qDF9cIrD6IElmMd_MCPZfVznPGAEdo2DNYj7CChg7hZalOyLJLS195VSEWSeNYISA-q6gzNQgthUOoY92GDgHCF8aZP0DkJS7IR9mOH_008gLLCoGOkTgnkbQgYDL9Zz_-Dlw4bhJczDyyZrkgmKZbm1TvCxcyGLPw6X5sWksFdZz-SSNDW1HvG9zZS040HjE0AmlJXGl4VX99uDVtKK49AO0G_uczgFFnmHfXwNxRiE_GuJIC3mOXfjHquzRq3LhMCv6amgK3rEEOKhx7faOJAAgF4voN_DrffeXR0oUx5lB9y6FmAJqjvmZKCnJ234wJK9jO2Zmj2w63gtdihk0YeUazXWv0l6OkVvsscljfoj-6mUa1FbKT-3QzRvrHJHhr5lmKBsqgQfPkpolTLZRoXMpD7Pfxr3jkIvxFFc804Qoll6UNY7Bt0CfEt17ZvKJZqCnJOZPXxkeQIL2pV0Qw6AkeG6MelH0OSyNFXw1T-cFKrMoLL_b-gTNcqgVi4CJ9X3G9xVFBFCnOo6NJw1HZgz0W95u1JtMP3hTsVufFtSBwuInKEwnGAr8uul6eTePnlnFXXUuuoOyTaUCQ1uj2VaBPOPxuqntJ2sejcEZjUkNbCRnLkndY3joKLU-SR4BVe0OZhkqeeI4SdFTo1TUOWmtNbk5r1d3R4GIahaDle3-6rVqqLxn5jA0_mWW6uCQxoogxNJts2uZsmvn5eIREC0S-yvmsUcZ_LP=w404-h618-s-no-gm?authuser=1",
    //5
    "https://lh3.googleusercontent.com/pw/AP1GczNNniSCD7c8ya0JkFMd3aThP64-LV_RJ4eoCtHdo_yge5nxPw4gCLEekHhZ6ykeo1xC526JdF3syHpS_awhw1ENvflzYkPZL1Yb2VpYfBE2dMQnu2OOeK0WV0RXtKBTDa6q6-4sTGgI8ZqHgqZAR8T7t3MT7-9b4itOmmLVrf6QrV7ReEPdy-2GMtm9yMeYUGRkSPQewi68iaP5XgRyhrx9CLUuyzHnaSQ364Pqp0Jc4apnpttLcJp1lOu0oPeW_ogJwTRpiyzQpRYPCVmZdgvp4DTNE7sWTpf1pGMXHviiFpMp_ph4kDV-TyPZflEdDttWo9d3YqUN78V-TOfACFEarDv0laWxarpv9QpLYS8Zb7BE8vAqKT1uaLj0AKhwfAt1rO9Jky7T5yglrSEIkYVvYW31CC9u0FiktOM9ygQfs0DESvswRfY_UBCB2YZlwAoTPbTS6IXfsYuaP9GxyaSyf6TGqGMTioz-crhyUOv5KvTHuWmi0sotOyLG-yL9QR5f0FMOS2WpTIT-VD6Wv4S81IkBfEUn9Q665D283XzUcooG7hBPeGKgRTQ142YTLFLdVfU3WqMj7doj5X2CsoAZkX-ROGqoBOftCsaweNMMwms0Pj1CtYPKhiEAb6TiT3krs0XSdcNyxUvfCcnZW6r8Bf7m_9Jda68a_-yajAzA_wXWTQUwIxwG0YmVpkrI1uUzNt_k0eZkJKRgj4xYGP9b5QInvauHxC7mBrSGvKwuaQl4uuibWOVZK7UXRTDHgZWTiUT7nZb4He5y4U67Y-mKKW-OnVaYmniUXf10qidAMGEYDCCIUA-iY-rrLJDxaPQ8MGCyHKStmGOS0aVZ0_eIOgpE6ff8hbHVzpGjoZVPFM6DN5XCi4a3uxtWNZNQLZ-ABrDvhN_-gx2aPWLRwROVdqtDTVOueCv-zdzoDp-jSQJB1k4V8iLGF7oz=w400-h623-s-no-gm?authuser=1",
    //6
    "https://lh3.googleusercontent.com/pw/AP1GczPMaLTMoVldCitg9gnQrOp0xEUUjefcWFriKdTGqpZNWqqWOqkE1gI-myqGltffIad1M6vf1WIyOii-SI2a-YaRo7g_IhUrpfNUrWtNB_G8D6yY1Gxg_nzvAo6KF026bX3ijSTVTovjXq15mrTETV_nSZvEfwVKdHpMtktCEED1Xwxl5NSxMa6cm3WMfhEIhj50n8FnF4bVBI___k-Qkkg_5AwZeuQYHYXKzzbexpERtcFcqh_H-DAJNbjpyKs_KTDXs2qGiKnGNjzjzqhHzFbdJ1YVJTKEAbflcK2e1yMCZEn7W5EGtySt9BCyJkkZEXTM13k9GKhYJi_sUXg1LPq3LMPSs7gkkUDgs_jZERznRB_kt6oGkb1CILqg81UnO18LJvRYDoXLpHnqvGaA1lz8jGT8pejtTFfg7W_FrroWdR0UXCMKOH4E_Ue39gum0najdhYMD14eUHfuklt0icvKV_g1sFLjkXY1jlJ2Gq-_-75zgwH2UOagCkpM6cD28Ec86xzubCxfNuK2tqKa0eWvXbwlPGXVrmxyQDaGInrQ9BFD2emNQOAlpIKFbnA0p-33ih5VbiF3flv5YqZM93DJ0X_T6XLewmn98x2RJU4la73Zb1xqEsJktiRKJ-49vTbty35IwHnvVPopEahHttzIpZwL3tMUsof60s-Th7Fb1bJxlm7DphLyVc_tNjh1SlgZ1cVvqG9UiiB_uNga3MvymMke9OOyHHmS2x8GGOVFosNIEMAttPmX6f005RoS5TXCE7iGlrz43dWyRamERAdFR00iEAGYiTncQqnxqQv1TOybzxITOE7d_WSjjnPwl8Sbt0BFOJAoBnv_KN6ZQrlDgymr3B6RK5HgyxgUuYejUEaTU9TpLLj9cT_UIhI9O7mMZNJYhzd8OtST1V_Bx8KAnfbjySkctRpUZAurwROjInUj1Ms16gqrgOus=w430-h580-s-no-gm?authuser=1",
    //7
    "https://lh3.googleusercontent.com/pw/AP1GczMGPYm1bIV19atpZCsT0P_jOYWp25YycUSU4a-tvj8-XwT8r4F5CJIfBWw3faTiPfMhepDO0AhWxsXnnPv18BJ2zt5aVCFjKiaQByjN9Vu3tCjP-sCRS8uhnGpxDWipuiF8f8zx79DXUcMSTQRbNByojQLeOwlj7yNp_xANrHMIaa7DjKvuIrzuwFMHIsVXGw3PH-vFdCatkYanxeVKhAFC375WQgSDbuSgqS0zGeHQR_neuivyCFuAbp9dSNSnIBKKEwUeXeaMJbt5NLYzCpHmS7eLGUL2vEJpe9wtlBJiNpmom-oblJYB_eubP7END94aCz28B_zCQUlgnj4Hj9sM_O9y4nKJiCWMJFbpeoP-z1Sfgp6lNQbjPJWN2CQ3MiehAj36L-057euDAobrbm4biW-wBQPnyAoDyYBeRUPrbnsV91azU1KM9f1aUTLBPUlB3E7LWscnoVTlMJrKreI8qmCXEsIxSIAsUsRrcMIL7YYSUBdk1YUSVKv9qOK5352U5qUHpLscCTRz6vQ68B3GxO3nHZG5NFp4h5Jn-ADtlRYaBI5K_0lICN52-XxwkmCeQnIPPy8F4RMKlr6UfSz64oPz-Er9z-nINO7jLrC-EpgUJ6A7BEa7DE9EyHhtaC0SDCqGaHpGJaI0Dd4Fy8qp_D1lFPHabViLPgIw592iGarjfOAIlq5MeIwbff6H_Fx2BGRauqhWzVAM2RhPUIf6aMK3w4pWVnPDl2-I6FxqLiSz3ao3CzOPdli4E9nuMAkjyzOgoWYAAycO1iQE4btiyAoEZrIkG5Z9TCigJUzzGPVZmQ20bYOMUe8bs81a6_EphJCVVtq4o9cBzoy9w2uFZWNK2mqGdt4Be1kMANZNzc3J-y5v5bfpf3UQyMI8sswSbIWZ7P5cMghbpZvMSwyehJJmb3kcC9tlldCjp0oBX0_Q1jrA4vISDh78=w390-h639-s-no-gm?authuser=1",
    //8
    "https://lh3.googleusercontent.com/pw/AP1GczM1aq12HLxK00dnkuDhspOwtqcuN3PEuqaGrtcRkF34ipV1Vs3Fj_jpbpxCj2SRfrgc3v3vkJ8qUXk6qvzEzNP0Kga18IJTZjYxPofg2947W-B35nBQ4jG_5p9vtwKDtxiJHVlrL5DtqjMgyIXpvuT41hAMusmMPlrGR6lc2XWz8ioUhsgUd96BO96z3gBr3VjrOe3YoAqGsUJTANiYrkZ2nFegZtHNwEPhSq6VrkUMZOeeE0LkL4muBv_HVJ0ROFfQj90ZEEqKzWCbSL6pYpgIEJ7d7kJNF-cK9BoV4sr1EyObKc-q4yd-kdMi_b4N579UKqnJwlrKwh_G_TY1vhAJi1KLFynoAT0fU-QQo2s3MUck-fftxW0mwKSoCR60VY9xIrySy4IAZld6Y8g-bd5EoLLLkmVTFJNq9cLSDurZIXgOAgnAKUqNGLb6NzNInhQaF-br68VcYz0z5k75YZ-jRFjUfgm2rCvVpnzV_cuaGvURCbBR46_gtduGzLeMLDrr2ryPbLUzuUulXGHuWgZ2sXoSuS2QuhSPYWpmDeMmXr9GN62c2PMaC9LVLCAdGbcq6kj2_W8cv8oC2BXNrAGPZVHJyO1k2C6ajFFh6DQ5vDhCkFtMmkHz5IlNYQ45YfRpdqm4Kvzj9o2kFDDMt9cwAqBsHKxzac_f0tsCqrwrkYTuQqboakr7AtNoJW7Jb4tb9A4nzBwPLvhhALsZoUD7epBnn-RWO44oA4R54wXA6eT6IY6ijFzFzu0OgOnXVO25Mqx5kLzaxqLoGLRcLlQw6RvJLDmFd5ZzMi-JimulRCHyENAOGQC4oSilqUHkLIGWwmEzkgaISp9HRPWtuVF97Gp716dz0rSLQwIe-aD9fyOg4oI9Q3Q_GEKN4v1OS9mtizqm2BkRO2bBtUVkoIns8aXIwcHFEPJFBtPZkZMYx178bg5Ue5F8Ir9Y=w500-h500-s-no-gm?authuser=1",
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
