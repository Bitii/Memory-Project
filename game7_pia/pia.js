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
    "https://lh3.googleusercontent.com/pw/AP1GczO7tN0JmOtgKOWESC8MN-XQpcCyxpSU-MrKeiqY5dd1e9bpB6omhEMycnrIVO6wRC3AbE1Lg_2f7jsrfHLpo_AAa0i1diVUDMFNGGu72wI159tcD7TBYuCFdqKEYcY8Va1-A4Q5zPNcxu98oVYxm2j8Jwargov4IKKjS2R2xaKCtHXg-Xvhr4Xe7XNVaEoEiU96CTlBXke1uyI7HYERNW7z-lvRpkC0dgMabLZB_kzAIgYG4P3EXkWEewsu3mrta9Bub_hEdK0zoRHrN_JNgdcwY63SkgHsoWmxB0j6TQFfwXVoAcpjFcQRLTJ8qVrKgMJQG0MBxaoDg_uQc4i8Ll9PEUeXB6fHmuuA5Q7bARCh4CT3BJ8ZIWEgmgxJEWslnpYSj2u5NnBJQtNmgGUyEcH-tuRah8bVuBr3r5ofhpf0IP7QeWvHALXaVl_WSL1B7ESB4jcwE8GbwrCi_qxtbzhDGsbcgrcJMzDY8zG1Jr4Pc5Z0OVIX9-DDyDOOCUuNzQRliOBikz7bc5z1bSWDu1pK7a5riK3oC72R6gPf1jeb0vMX9qi__BfpdHl4SdOF8i4aHVJrmjgHn7ZDVp7cr5wsNnhmcqu_GSwl_iQCdXgtQeCbBv5IlGEmYeFN4o8v9tvwUUhFW3ER3lzq3roFwCGL4NYOtA2vq1yX7UM6Mr5RIPq-DzQYotfAugSABFTUu8aZjnjN52EaF5JoHG_S504-HOQuWNruZw3t2wP-y7DvByzq2IRwcjabsZrp4AzyvjWkIMgWWLfhSIoXttO4LMu8JcoPeaMYqBqyiqaJZtJNerg5eQ3dW2T22OnJZ9b6waxYycLFlHpeia8c1WUoKBPyRC2A6OPVfR4ZYl2ZrhsU3j1ICkagSSP3kvDTCzmgyXvNbSX6OTa6hKDFlbFx2qtFDfmJSyNxfPEVzUeaBtZ7513vQs88hpopm08D=w423-h590-s-no-gm?authuser=1",
    //2
    "https://lh3.googleusercontent.com/pw/AP1GczMhX1NDlEzJ1S7ns6f_wvwqthavkMWVY5oUEVsLBCVBLxAHoXshF4whmDL1vzozfXD8YJJTfKOly6YqiqOIZteDXjuphrTnHzza_BzZPzFtQVidNJwST1uaGnafktZvoUc6IaR9FtB98EjlCHGrs_z5WXgg1q6odncuIOgiHwu5vjHYmyC2Q7UHx16YIzYrTf0siCvkn0po147kbu9af_4H4bv8NEluGm4Jr3_czUbmM_lOKtCezJU4dfDEfGj-GEX_j8KUUqijQkEOAFy2lA0SXg1iZDFZpSm6DEd45cOJASgchuO2uDt2yrlMAkUqZzim0mMnuwBP5Jyc-0p4aNA51Tz-TD0_m0W4yzdsgUecesMGvhHN8drUwxL7MLupBm8guOK32rEq412gMXlaRVOy0CaG_TEv7Asuio9IKaphh0jaiaFvEOyVMkulpY-hoDNBU8kF0i_JUTTRZ_eosO4C4uAFrRs8XMtSohrlWzoQB68KR5wm4CTJto4FqeqqE_lIvCq4zhYLQY2653nB7EXrVZ8A8-vuWWpzILjN5LVEEZv4Ev2UbFz8ZxkkQQcFNLrKj2q9AS-v01JcklUx3ISl-BRSfRBcBSX-wMnMCbRh-BzWNN1eqwWpkLHWL91IlZDHmDwzQ7bYivawpk95eOIzeo9l0DPpll38UsyIGyN9TWfdM6zeoda90sr8vVY1woCDvVcLE_VEY9fFgwPE7OPrEoqNpUNujYxOdD7PC2W7YPSQViffXNpV0t0jdI19esXwwwqxSNJ1bTS8IkiezlhPOLb_vhhEthZruFfAQZQV064PrtqS5Fse2vtqZ94BaHw0u5zHka9yTlQA2idxvc97uHnO0IqtMH7qdcE2Pkgk1K7f1KCzWDA42R8sCRhT9xaw6bjMzLVrRrH9jwkzI7qdk-_R95miWHFlIfNpfVlshi9z_Jv9fmIuDPTR=w433-h577-s-no-gm?authuser=1",
    //3
    "https://lh3.googleusercontent.com/pw/AP1GczPq69bsL9tB31goqdH4fiR7MJbkHlZzxu1KrdB2iXZkI3Ouj4A24Lw1aM0SWZbkj1OXR5gXPxl8VIvCES7f22j3cR5jDwp8AazsfyVAETTV2DJCtb2RerXZBB4u5Cc0mlKXS198_OtdIvcpASIfhSEj-fAutdW1zWJDWi6DK-ftBehCRTc5Yb9LuJGLjzc0E8L-4dVavwikVfcaHtv9Iuqb0Un7ydEiA3hmSPOfwh5W_z1LTopgquNRQO-zSwcq9vshGImZ0URd5RpdR01t7pZ5QulpW9yz5HIFfCjjAqLr3uYXY72VhAEsayS9mWG3DtjSZo1dG_YMb3urbLRAlhKqicr85nMTTBIntK31xofo6SfZSuYWe_02RDX6vNx0dgoJHJC2b3edDQwqTbhSYWIFGK06na4pBJASt6lm0FLPW45N1IqveFEBspiH-T95lzGIb61kmwxAbsrAjYyWEsTvfpILHW8bEJDc2g0_SQ5cwiuhHwUMgvvkwDPeFgKA5AVm7Vuwi7BUn_qFexQDnsP4DUl7EgxXlRKDoC2A0dllwTNUjzuAHb7_s8esej9EX1R8Eg20NAAO6boprbFkl6bX-d4W0MOMeRgMAUPPrCn0engVIG1jWHkuXskoR-AJZDaWQ1XhjTWdhonA-dRbUbODTIKH2ql1LSN9u_G-2MXCta30Qmgjqeso2PntfbWyjxsJXf19Oy6XARHaH51YsoTi9QL1s1UVtbtRnZTk58qMld3Z3B5w5UgittyA2OVmTfa5YRg4d59CQgNIj_kC6HuYzuwbARwWjH5WumixBzYvhTWKzz18aq1NN0Oozn6hfvODzg3Y4hBc4-l2J5bydKY1fVi3pAcSZSTkh6gQOn_KfL_u1OWT_b2ONk4R0XwdUW8z2to35HvwsyERSkYQQApKclR40aOLs-EIL47KvFn30BNwYAspjTtMy3td=w439-h568-s-no-gm?authuser=1",
    //4
    "https://lh3.googleusercontent.com/pw/AP1GczNaiWWPRUndrd2-0-8fRYEo4CtESpi8rEwRJvi2HpgJFDK12qUh7aVUSEQSz2G7tqcEIJbqwwfJg6R4WApdHl5UUctVW4NKFm9-EkZ7y6YCXUBgE2BAJLMVIFMxNamGVTirm2C5hdbmCL59xxl9sWQO-uK6DdWS3nyrZGr37sGoBpy77yd5ycs55PY6rgGoLg5ZnbE-kxZeTPCpGJzlSyQ7iJIB7VKscQNsQGtnDtUnsj0n3hikJ76U2eAsWORUZie8G2sUuYc8Uj5dC3LpXCsM8XOgMTSQI1mjYiF8ZI0ZCUAOOIA3k9sFRwikufmj4WhAfz6RNHCGsh_gxrd3cOz-2xD5ct6OeiyM5HJAN59c5S1-Y7Wv7mgt4ZM6_gHVlLx2lnh48kWX0EeCfpoiUB_adPkQc8_PPQz2XW1OmgWeGPjCqG5bv-GTj2QKPietHKpNRksGvLN-t54QHC5Gc2swhituMqCx3i6-b5YIahVcNM2Ws2ITiQdFookkRH_nJLdBLF0W_pSPT3Qu3x9DxblmiYnTMenNgI4JJ4Nm2HmYg3K9WLMogFnHAhVbS5C7VvQkAJFUhs1K1UfEMSlCtuDgDttRVp1OftH_zrB-S6nDcPnMw3d37EmwFITTX38nyGY-KAh6fWFRIRHecqeJ6PpUZckJ0ATfOQW30SZbPRfG13zC-VomV5jHCYDE6Vu3ONizCfMnKSmCKjw9KpT98UowgQgxaRie4-zOrYpTY7PJeOTJxZOFxm8ozMtVOUsaKZlVgkKw_6sSrxtCY8sOFN69ZjAAZmPGJZLZG7ZpXiC8u9Xf__CI7KCU0WiOVml8s8RITE4faq03KToVzdwpJMrLXh8DmVgkFlt8B_rA3-8RKRTO9VEN5koTlyHpfkYAs3uNjqSHx8URbek6XQIrkvumJBPvQ8QUlmefq_nQ4DzC3vV4QqEa1bknRJZv=w421-h593-s-no-gm?authuser=1",
    //5
    "https://lh3.googleusercontent.com/pw/AP1GczP2e58OovHul97lWw4fiqC1SNNg-7_DY-1XQYDcp6D8_osx5F8MRJv2VbxG7YsBAU2hFFn3UgopDgf2ix-YoaaWXh16UaYKt4ms4Lr_Pnz_JmYhkRPVEQCbbg0Ic5F2peeTEdKxrjaaxGCckCNtk0ZIfn2qzI3WXrcQLkcA78WMYu0TKrEubYt_SNh884gZ7EWMXBm7-0Ake9wfLYTq9h0qKywqAh9MHudN0tjdFkl9msRRxYHLpuERvDoAdMjFRrsSngMiSZPMGuBbpiGLwkHdUYqLydBTR_DTrtM5163RJMDsk6Gd_Q-1ddHly-_Fl3krL8dJfKyNNkqZbjAJNBnwm2BkIlZXtmSgrxaGpArWEYtzV3GbVgQ24jQr214TKNxdFC5UoW5uSZDTxUak-NnG84MSkVpB-TSui-3sMp-A6JdWSvoERcUjv9btwtsUsLC_t2K0vO-RnCKmIHYCgosB4CpfruyKsE6W2E76072T8NyGDEkoyhCIJMOEGS5da05s3mN7KD22MPcuVBemtYmtZwkmM6Pb4cElglfntCh0BpVKOB9mxekI5_j5l1JrOZ4yvOuvo6Ye2XWXafGKArzuzcYv3G9uzPvQSBdsxVbt5QFD9OSQeVQFUIuvvaMZkBte1PJxEU0i443eGN7Sd-HZFvNdy5fgcm4SPKb4oqRaWGQDW5iho0z55g2X3mLOOBrWZgMy7R40WIgyREx3FcUZyxgBfbBP9_2EWtNtu55JuUOtka46AXssDCdhKi7zMz0pXBpq05nosfymCc6L5Lp_eqVIUyry45nlYaJKf_bTIMN8FG1Ay86Vn9VWxdI-Tzffibbh9LxMrD3PehdtUmV6FIViXUXEKHPXbfOBK8Hk4CXyGkFfWzJAiMqICDYW8Bg2WElsF7taEla8EMCweljJ7ef8vTbTzKuM9j7b2Qx_YQFFzaYh0svhVszR=w476-h525-s-no-gm?authuser=1",
    //6
    "https://lh3.googleusercontent.com/pw/AP1GczPxemYSPL6SH6oYtV3I4CYxgsxjSTmQAF3S3sX7yIP7UDlR9zEe5qOseakq1tmIfV2AEY6IkfBgO7CmrAx_DEQzhbhFeWH5X28dK3XhpQ5y8qaBUwVKe5Xsu-qO-bYSLMU0Kf6ROgExGOAU2Zvd6WQBRHNG9C4wrptPtHb1YnCm1uZj6Xubw8aMfNXD9xH834SqSJAK0oqM2hhlxE8VZOj04zLriM4_izyhqWs3pqE_stctY6DdyWZPhbTqU2LO35gw0v1zraCORv-0q8yyUtfxDvRpfGf8-2x5xnxeqvC_6EphQrhx3lRBCWmdd8ARZslZhggYFQ2vb3z6XiU650sHJtLRaTxp1vVcf7tcLmYmmKPlYyVJo_qnIPSNmFOJ_cU0vag-OOU_LtnVcFBA96poWxPGkBNRoJhXuXPDjMntCxSfCXenEzG2EP09XJnkYoL2ozUOleBsJPFSsvOGqbTr83VxTqK0uYYw3vD55ZsIlFmNML6cEKpywZNX5BnZ_MllkjNBoyzJeo9fMeBszm_VKN9vvac4VaQZjW2h2NLQ-DdbC-lNufyKF1RSqwwbRP6BJls7bQqnJiElpZxdJPmTyQHVchN0lr6nh0cq5ae6p5Xwcy_9Vfa20TZJYsrnM2FqZcQs8taD2OeytKORtzzTpJdrV-W4XUhDtpX9y6-_ClpkWAA9kqUj08izdkTsVPi376Hjox3QHaoIWnl7PXXgOAZzFgZSN7ysLxB5RxTyrFXDfzlHWkE-kGDrh5DDgZoQlLnjB3tpLz3RC1iBkE_a7sfbPuZE8v9q0crz2qn8IBnwoZwQdZ3d0n5R-Lr9H1A9CAfIK3kI0b12PA6uyi0sdbNluBwzGkT49gOyAGfrnUHDpVmvT2l4beKY08FP_WUAyxoVzOZRDfEdtALyYxDqbdJgHwzk_PSs_XPccduT0kG0-b62CFJ9D0cU=w433-h577-s-no-gm?authuser=1",
    //7
    "https://lh3.googleusercontent.com/pw/AP1GczMnY9ZuJOvRC63w9f19GgNqDU3gOQbwnIk5L0jiG6Nzc3lh4vBKojoONLW4pE4EwBXTQoqtz2hv9XhCNyb_0AHgNKLSFe1iY7iWgVLMubFnUNIu0kotgANbjzbsPpzslhG2Ar-odkqJR54Qp4f-Ay9u9Puqv7AIXAjFob4_mEiQGC7QHESf1Y3rUs_vaoCMxSkNB0sHHgC2S8PaK-Y84pQ8f-9xbvN7-BMWvujIHCp8dscCgcUyedLuT-JyRa1relsPzi7AXiVOaquHARY4ErTEiOlDER9K_heq0e53WQ1aMlagUgnfwgPTlFnvTtOFILor4thEAoEpxizVlEWJ_i4oNsWySyU5CL9QcIhN9KjU0gfo2ofj-HUMxiYn71wv-zfCoysKlUolp94rqg2kxhI1xAMkHdSCpwUZYx8R0IlfNrtErSmzL_HIvFeH-6CI5dt_l4kBugqzkv3rAZ1oBcYabCOzcpHGs8-MCSIxmP_CprQ68JE8dicnJZmd8n4Z100zEqoJDthvlVBY6TU-_GGfNXNwO13XHvNTwn4z2wRdUGZ8mYZ7XKVlK0E2K2hN12QU2xgY2W61Jc9dNdQiIksOVDxRS-jH55qQjoQ8QrOx9mlDYtiVC1M7vuUgZtF27jmqxMDA7zQltoEjokDBNi-r6fbq7vdFm8xZIOp008QMBsSrjfGTYp-6PLqlbHss_xwbgzHTvYLdCXqxICYxl4Ic9QXCn9JwDcR-tVzvlq1ZYoE3MvU0ls761zwrigg6n7H9FuZpu-hptrKrkK_iqBzyepdKNhksvZ8N_5i2ps3saWPtCZA136tsof7g57ZnB65KdT6GnmSgSbCYnYoabJnbFHv53Qud9ZQlfQuE0p3AzGl1oeleqYULrsniSNtz6YLiwthZizr2ocSGPq9a-yDX_TBIZn2hLOLtlnEBqeV9nguncSreMmYcHaB2=w500-h500-s-no-gm?authuser=1",
    //8
    "https://lh3.googleusercontent.com/pw/AP1GczPx3Dbs2u6z9nas4gTxhisceAC0yFDk7vfhMbKiT_Lt8Km1pC05NHWzH-lxv4g7IOlyrx69LO_l6hCzeo6uAK43xcX6oyOYMs2dlC0PwJg7m0tAOL_pQ5L41EWzTDJtA-G3mYfir5Eb9BI6KSq0TckNE58roUEb_oLC3jPJhpDcLqHrm0Di2TgySE0sY1RwNubvxZYiUykFabSXDOeEMjC7EuIQayeFl3QUI-gvLY-i1LDa-yWgUp7mGCbtV-QBpofRoAWgYQxCWzOKuXkh4ggop2gNlcqsUBoSWfskc2ANZcmFS0wuTHOJ606-UYaWSDkHCnkZLk0HP6aO1fnDQECM8yhnKVSVBvfhhVi7XCaEF0RXv5ehHQ6yNVXMiuvOs0-FkOtzANPIGfzVg59ZzKyq8ie4TLXNiMg6RWCZuQ-8Sfw_cDJTSaF0yqEXIRSLo36JCKuodqf27ZLZxsJpRmNF1S78dCjemPNU3bFWu141XvYeuioTaCzwiQAJ2Ww-KrvJwpSBJ-W5rQPP-koZUe1tBfOwhgm17fPtikeQ1C9p9txPz50Me4GxHeBp06s7F9gBfJtEfyvxto3hpPw_suiefVCfoll2Zt8kpWLbNpooFN9DSRuUgP1XaKKnDIqWxeW-CUmh68XUAYJsCKQvqDitDnGwAlqpyr8xRzztUHP9q-SoUCAEgOlQdnw7grgXqGG9XLkK2YOLW7gavDmjvE1qnKYic30dxIprKXZNebASgrwyY8GxZgpqFMkNf0zobFWpJPyPKGh2rTIrV2ChJFi0yAq3fEIfKwrVUvJuMGC217YbbB5k3ceE5CWzXq60tV7L_K2658tdOxZ_ifReO4KB8Zw3vQqCawhFarQHhyPvTdXki22CMFKQgocMElUASzVOtL9Vgcfrw7uzga9xyqGWz1SRWP-K8NqX2ZEOJLGoHKHTnjtcfabRG5Nz=w415-h602-s-no-gm?authuser=1",
  
    //1
    "https://lh3.googleusercontent.com/pw/AP1GczO7tN0JmOtgKOWESC8MN-XQpcCyxpSU-MrKeiqY5dd1e9bpB6omhEMycnrIVO6wRC3AbE1Lg_2f7jsrfHLpo_AAa0i1diVUDMFNGGu72wI159tcD7TBYuCFdqKEYcY8Va1-A4Q5zPNcxu98oVYxm2j8Jwargov4IKKjS2R2xaKCtHXg-Xvhr4Xe7XNVaEoEiU96CTlBXke1uyI7HYERNW7z-lvRpkC0dgMabLZB_kzAIgYG4P3EXkWEewsu3mrta9Bub_hEdK0zoRHrN_JNgdcwY63SkgHsoWmxB0j6TQFfwXVoAcpjFcQRLTJ8qVrKgMJQG0MBxaoDg_uQc4i8Ll9PEUeXB6fHmuuA5Q7bARCh4CT3BJ8ZIWEgmgxJEWslnpYSj2u5NnBJQtNmgGUyEcH-tuRah8bVuBr3r5ofhpf0IP7QeWvHALXaVl_WSL1B7ESB4jcwE8GbwrCi_qxtbzhDGsbcgrcJMzDY8zG1Jr4Pc5Z0OVIX9-DDyDOOCUuNzQRliOBikz7bc5z1bSWDu1pK7a5riK3oC72R6gPf1jeb0vMX9qi__BfpdHl4SdOF8i4aHVJrmjgHn7ZDVp7cr5wsNnhmcqu_GSwl_iQCdXgtQeCbBv5IlGEmYeFN4o8v9tvwUUhFW3ER3lzq3roFwCGL4NYOtA2vq1yX7UM6Mr5RIPq-DzQYotfAugSABFTUu8aZjnjN52EaF5JoHG_S504-HOQuWNruZw3t2wP-y7DvByzq2IRwcjabsZrp4AzyvjWkIMgWWLfhSIoXttO4LMu8JcoPeaMYqBqyiqaJZtJNerg5eQ3dW2T22OnJZ9b6waxYycLFlHpeia8c1WUoKBPyRC2A6OPVfR4ZYl2ZrhsU3j1ICkagSSP3kvDTCzmgyXvNbSX6OTa6hKDFlbFx2qtFDfmJSyNxfPEVzUeaBtZ7513vQs88hpopm08D=w423-h590-s-no-gm?authuser=1",
    //2
    "https://lh3.googleusercontent.com/pw/AP1GczMhX1NDlEzJ1S7ns6f_wvwqthavkMWVY5oUEVsLBCVBLxAHoXshF4whmDL1vzozfXD8YJJTfKOly6YqiqOIZteDXjuphrTnHzza_BzZPzFtQVidNJwST1uaGnafktZvoUc6IaR9FtB98EjlCHGrs_z5WXgg1q6odncuIOgiHwu5vjHYmyC2Q7UHx16YIzYrTf0siCvkn0po147kbu9af_4H4bv8NEluGm4Jr3_czUbmM_lOKtCezJU4dfDEfGj-GEX_j8KUUqijQkEOAFy2lA0SXg1iZDFZpSm6DEd45cOJASgchuO2uDt2yrlMAkUqZzim0mMnuwBP5Jyc-0p4aNA51Tz-TD0_m0W4yzdsgUecesMGvhHN8drUwxL7MLupBm8guOK32rEq412gMXlaRVOy0CaG_TEv7Asuio9IKaphh0jaiaFvEOyVMkulpY-hoDNBU8kF0i_JUTTRZ_eosO4C4uAFrRs8XMtSohrlWzoQB68KR5wm4CTJto4FqeqqE_lIvCq4zhYLQY2653nB7EXrVZ8A8-vuWWpzILjN5LVEEZv4Ev2UbFz8ZxkkQQcFNLrKj2q9AS-v01JcklUx3ISl-BRSfRBcBSX-wMnMCbRh-BzWNN1eqwWpkLHWL91IlZDHmDwzQ7bYivawpk95eOIzeo9l0DPpll38UsyIGyN9TWfdM6zeoda90sr8vVY1woCDvVcLE_VEY9fFgwPE7OPrEoqNpUNujYxOdD7PC2W7YPSQViffXNpV0t0jdI19esXwwwqxSNJ1bTS8IkiezlhPOLb_vhhEthZruFfAQZQV064PrtqS5Fse2vtqZ94BaHw0u5zHka9yTlQA2idxvc97uHnO0IqtMH7qdcE2Pkgk1K7f1KCzWDA42R8sCRhT9xaw6bjMzLVrRrH9jwkzI7qdk-_R95miWHFlIfNpfVlshi9z_Jv9fmIuDPTR=w433-h577-s-no-gm?authuser=1",
    //3
    "https://lh3.googleusercontent.com/pw/AP1GczPq69bsL9tB31goqdH4fiR7MJbkHlZzxu1KrdB2iXZkI3Ouj4A24Lw1aM0SWZbkj1OXR5gXPxl8VIvCES7f22j3cR5jDwp8AazsfyVAETTV2DJCtb2RerXZBB4u5Cc0mlKXS198_OtdIvcpASIfhSEj-fAutdW1zWJDWi6DK-ftBehCRTc5Yb9LuJGLjzc0E8L-4dVavwikVfcaHtv9Iuqb0Un7ydEiA3hmSPOfwh5W_z1LTopgquNRQO-zSwcq9vshGImZ0URd5RpdR01t7pZ5QulpW9yz5HIFfCjjAqLr3uYXY72VhAEsayS9mWG3DtjSZo1dG_YMb3urbLRAlhKqicr85nMTTBIntK31xofo6SfZSuYWe_02RDX6vNx0dgoJHJC2b3edDQwqTbhSYWIFGK06na4pBJASt6lm0FLPW45N1IqveFEBspiH-T95lzGIb61kmwxAbsrAjYyWEsTvfpILHW8bEJDc2g0_SQ5cwiuhHwUMgvvkwDPeFgKA5AVm7Vuwi7BUn_qFexQDnsP4DUl7EgxXlRKDoC2A0dllwTNUjzuAHb7_s8esej9EX1R8Eg20NAAO6boprbFkl6bX-d4W0MOMeRgMAUPPrCn0engVIG1jWHkuXskoR-AJZDaWQ1XhjTWdhonA-dRbUbODTIKH2ql1LSN9u_G-2MXCta30Qmgjqeso2PntfbWyjxsJXf19Oy6XARHaH51YsoTi9QL1s1UVtbtRnZTk58qMld3Z3B5w5UgittyA2OVmTfa5YRg4d59CQgNIj_kC6HuYzuwbARwWjH5WumixBzYvhTWKzz18aq1NN0Oozn6hfvODzg3Y4hBc4-l2J5bydKY1fVi3pAcSZSTkh6gQOn_KfL_u1OWT_b2ONk4R0XwdUW8z2to35HvwsyERSkYQQApKclR40aOLs-EIL47KvFn30BNwYAspjTtMy3td=w439-h568-s-no-gm?authuser=1",
    //4
    "https://lh3.googleusercontent.com/pw/AP1GczNaiWWPRUndrd2-0-8fRYEo4CtESpi8rEwRJvi2HpgJFDK12qUh7aVUSEQSz2G7tqcEIJbqwwfJg6R4WApdHl5UUctVW4NKFm9-EkZ7y6YCXUBgE2BAJLMVIFMxNamGVTirm2C5hdbmCL59xxl9sWQO-uK6DdWS3nyrZGr37sGoBpy77yd5ycs55PY6rgGoLg5ZnbE-kxZeTPCpGJzlSyQ7iJIB7VKscQNsQGtnDtUnsj0n3hikJ76U2eAsWORUZie8G2sUuYc8Uj5dC3LpXCsM8XOgMTSQI1mjYiF8ZI0ZCUAOOIA3k9sFRwikufmj4WhAfz6RNHCGsh_gxrd3cOz-2xD5ct6OeiyM5HJAN59c5S1-Y7Wv7mgt4ZM6_gHVlLx2lnh48kWX0EeCfpoiUB_adPkQc8_PPQz2XW1OmgWeGPjCqG5bv-GTj2QKPietHKpNRksGvLN-t54QHC5Gc2swhituMqCx3i6-b5YIahVcNM2Ws2ITiQdFookkRH_nJLdBLF0W_pSPT3Qu3x9DxblmiYnTMenNgI4JJ4Nm2HmYg3K9WLMogFnHAhVbS5C7VvQkAJFUhs1K1UfEMSlCtuDgDttRVp1OftH_zrB-S6nDcPnMw3d37EmwFITTX38nyGY-KAh6fWFRIRHecqeJ6PpUZckJ0ATfOQW30SZbPRfG13zC-VomV5jHCYDE6Vu3ONizCfMnKSmCKjw9KpT98UowgQgxaRie4-zOrYpTY7PJeOTJxZOFxm8ozMtVOUsaKZlVgkKw_6sSrxtCY8sOFN69ZjAAZmPGJZLZG7ZpXiC8u9Xf__CI7KCU0WiOVml8s8RITE4faq03KToVzdwpJMrLXh8DmVgkFlt8B_rA3-8RKRTO9VEN5koTlyHpfkYAs3uNjqSHx8URbek6XQIrkvumJBPvQ8QUlmefq_nQ4DzC3vV4QqEa1bknRJZv=w421-h593-s-no-gm?authuser=1",
    //5
    "https://lh3.googleusercontent.com/pw/AP1GczP2e58OovHul97lWw4fiqC1SNNg-7_DY-1XQYDcp6D8_osx5F8MRJv2VbxG7YsBAU2hFFn3UgopDgf2ix-YoaaWXh16UaYKt4ms4Lr_Pnz_JmYhkRPVEQCbbg0Ic5F2peeTEdKxrjaaxGCckCNtk0ZIfn2qzI3WXrcQLkcA78WMYu0TKrEubYt_SNh884gZ7EWMXBm7-0Ake9wfLYTq9h0qKywqAh9MHudN0tjdFkl9msRRxYHLpuERvDoAdMjFRrsSngMiSZPMGuBbpiGLwkHdUYqLydBTR_DTrtM5163RJMDsk6Gd_Q-1ddHly-_Fl3krL8dJfKyNNkqZbjAJNBnwm2BkIlZXtmSgrxaGpArWEYtzV3GbVgQ24jQr214TKNxdFC5UoW5uSZDTxUak-NnG84MSkVpB-TSui-3sMp-A6JdWSvoERcUjv9btwtsUsLC_t2K0vO-RnCKmIHYCgosB4CpfruyKsE6W2E76072T8NyGDEkoyhCIJMOEGS5da05s3mN7KD22MPcuVBemtYmtZwkmM6Pb4cElglfntCh0BpVKOB9mxekI5_j5l1JrOZ4yvOuvo6Ye2XWXafGKArzuzcYv3G9uzPvQSBdsxVbt5QFD9OSQeVQFUIuvvaMZkBte1PJxEU0i443eGN7Sd-HZFvNdy5fgcm4SPKb4oqRaWGQDW5iho0z55g2X3mLOOBrWZgMy7R40WIgyREx3FcUZyxgBfbBP9_2EWtNtu55JuUOtka46AXssDCdhKi7zMz0pXBpq05nosfymCc6L5Lp_eqVIUyry45nlYaJKf_bTIMN8FG1Ay86Vn9VWxdI-Tzffibbh9LxMrD3PehdtUmV6FIViXUXEKHPXbfOBK8Hk4CXyGkFfWzJAiMqICDYW8Bg2WElsF7taEla8EMCweljJ7ef8vTbTzKuM9j7b2Qx_YQFFzaYh0svhVszR=w476-h525-s-no-gm?authuser=1",
    //6
    "https://lh3.googleusercontent.com/pw/AP1GczPxemYSPL6SH6oYtV3I4CYxgsxjSTmQAF3S3sX7yIP7UDlR9zEe5qOseakq1tmIfV2AEY6IkfBgO7CmrAx_DEQzhbhFeWH5X28dK3XhpQ5y8qaBUwVKe5Xsu-qO-bYSLMU0Kf6ROgExGOAU2Zvd6WQBRHNG9C4wrptPtHb1YnCm1uZj6Xubw8aMfNXD9xH834SqSJAK0oqM2hhlxE8VZOj04zLriM4_izyhqWs3pqE_stctY6DdyWZPhbTqU2LO35gw0v1zraCORv-0q8yyUtfxDvRpfGf8-2x5xnxeqvC_6EphQrhx3lRBCWmdd8ARZslZhggYFQ2vb3z6XiU650sHJtLRaTxp1vVcf7tcLmYmmKPlYyVJo_qnIPSNmFOJ_cU0vag-OOU_LtnVcFBA96poWxPGkBNRoJhXuXPDjMntCxSfCXenEzG2EP09XJnkYoL2ozUOleBsJPFSsvOGqbTr83VxTqK0uYYw3vD55ZsIlFmNML6cEKpywZNX5BnZ_MllkjNBoyzJeo9fMeBszm_VKN9vvac4VaQZjW2h2NLQ-DdbC-lNufyKF1RSqwwbRP6BJls7bQqnJiElpZxdJPmTyQHVchN0lr6nh0cq5ae6p5Xwcy_9Vfa20TZJYsrnM2FqZcQs8taD2OeytKORtzzTpJdrV-W4XUhDtpX9y6-_ClpkWAA9kqUj08izdkTsVPi376Hjox3QHaoIWnl7PXXgOAZzFgZSN7ysLxB5RxTyrFXDfzlHWkE-kGDrh5DDgZoQlLnjB3tpLz3RC1iBkE_a7sfbPuZE8v9q0crz2qn8IBnwoZwQdZ3d0n5R-Lr9H1A9CAfIK3kI0b12PA6uyi0sdbNluBwzGkT49gOyAGfrnUHDpVmvT2l4beKY08FP_WUAyxoVzOZRDfEdtALyYxDqbdJgHwzk_PSs_XPccduT0kG0-b62CFJ9D0cU=w433-h577-s-no-gm?authuser=1",
    //7
    "https://lh3.googleusercontent.com/pw/AP1GczMnY9ZuJOvRC63w9f19GgNqDU3gOQbwnIk5L0jiG6Nzc3lh4vBKojoONLW4pE4EwBXTQoqtz2hv9XhCNyb_0AHgNKLSFe1iY7iWgVLMubFnUNIu0kotgANbjzbsPpzslhG2Ar-odkqJR54Qp4f-Ay9u9Puqv7AIXAjFob4_mEiQGC7QHESf1Y3rUs_vaoCMxSkNB0sHHgC2S8PaK-Y84pQ8f-9xbvN7-BMWvujIHCp8dscCgcUyedLuT-JyRa1relsPzi7AXiVOaquHARY4ErTEiOlDER9K_heq0e53WQ1aMlagUgnfwgPTlFnvTtOFILor4thEAoEpxizVlEWJ_i4oNsWySyU5CL9QcIhN9KjU0gfo2ofj-HUMxiYn71wv-zfCoysKlUolp94rqg2kxhI1xAMkHdSCpwUZYx8R0IlfNrtErSmzL_HIvFeH-6CI5dt_l4kBugqzkv3rAZ1oBcYabCOzcpHGs8-MCSIxmP_CprQ68JE8dicnJZmd8n4Z100zEqoJDthvlVBY6TU-_GGfNXNwO13XHvNTwn4z2wRdUGZ8mYZ7XKVlK0E2K2hN12QU2xgY2W61Jc9dNdQiIksOVDxRS-jH55qQjoQ8QrOx9mlDYtiVC1M7vuUgZtF27jmqxMDA7zQltoEjokDBNi-r6fbq7vdFm8xZIOp008QMBsSrjfGTYp-6PLqlbHss_xwbgzHTvYLdCXqxICYxl4Ic9QXCn9JwDcR-tVzvlq1ZYoE3MvU0ls761zwrigg6n7H9FuZpu-hptrKrkK_iqBzyepdKNhksvZ8N_5i2ps3saWPtCZA136tsof7g57ZnB65KdT6GnmSgSbCYnYoabJnbFHv53Qud9ZQlfQuE0p3AzGl1oeleqYULrsniSNtz6YLiwthZizr2ocSGPq9a-yDX_TBIZn2hLOLtlnEBqeV9nguncSreMmYcHaB2=w500-h500-s-no-gm?authuser=1",
    //8
    "https://lh3.googleusercontent.com/pw/AP1GczPx3Dbs2u6z9nas4gTxhisceAC0yFDk7vfhMbKiT_Lt8Km1pC05NHWzH-lxv4g7IOlyrx69LO_l6hCzeo6uAK43xcX6oyOYMs2dlC0PwJg7m0tAOL_pQ5L41EWzTDJtA-G3mYfir5Eb9BI6KSq0TckNE58roUEb_oLC3jPJhpDcLqHrm0Di2TgySE0sY1RwNubvxZYiUykFabSXDOeEMjC7EuIQayeFl3QUI-gvLY-i1LDa-yWgUp7mGCbtV-QBpofRoAWgYQxCWzOKuXkh4ggop2gNlcqsUBoSWfskc2ANZcmFS0wuTHOJ606-UYaWSDkHCnkZLk0HP6aO1fnDQECM8yhnKVSVBvfhhVi7XCaEF0RXv5ehHQ6yNVXMiuvOs0-FkOtzANPIGfzVg59ZzKyq8ie4TLXNiMg6RWCZuQ-8Sfw_cDJTSaF0yqEXIRSLo36JCKuodqf27ZLZxsJpRmNF1S78dCjemPNU3bFWu141XvYeuioTaCzwiQAJ2Ww-KrvJwpSBJ-W5rQPP-koZUe1tBfOwhgm17fPtikeQ1C9p9txPz50Me4GxHeBp06s7F9gBfJtEfyvxto3hpPw_suiefVCfoll2Zt8kpWLbNpooFN9DSRuUgP1XaKKnDIqWxeW-CUmh68XUAYJsCKQvqDitDnGwAlqpyr8xRzztUHP9q-SoUCAEgOlQdnw7grgXqGG9XLkK2YOLW7gavDmjvE1qnKYic30dxIprKXZNebASgrwyY8GxZgpqFMkNf0zobFWpJPyPKGh2rTIrV2ChJFi0yAq3fEIfKwrVUvJuMGC217YbbB5k3ceE5CWzXq60tV7L_K2658tdOxZ_ifReO4KB8Zw3vQqCawhFarQHhyPvTdXki22CMFKQgocMElUASzVOtL9Vgcfrw7uzga9xyqGWz1SRWP-K8NqX2ZEOJLGoHKHTnjtcfabRG5Nz=w415-h602-s-no-gm?authuser=1",
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
