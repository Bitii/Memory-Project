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
      "https://lh3.googleusercontent.com/pw/AP1GczMgDHZFSaHfYEupz2gtaYuKWxtHvVeAAkgCXu6KNDFgR4W_URsn6LAk8N-q_EiL6eS-D8vhupL9rMivgFC4hrz4VS_G-zcyRvAUeQCiptkNr0Bdgq0eh4zyUhbQozO0GxRT1kf7Br0H-Rmx5qfCLXLduWAjQ0F8tQGm8B0q3DymE3GaMu0plqnlc7ZZ-Fx5r5GIP-6J_2rGGnAxwOCYn5qtD6piDI4VDjxMNP3rlD_TwSUjKPABlBj0_DgaIM8mCtCpq6E056KSwOrUBLpXDJ7qmQgSRT6apWBoorkeyvsKBAWiiu9QxDnQg70rsvpcX6nnU9CoPWaylVBr8ZqI_qfvz4MrMnKS1Nzo-ZXEj2fk98iYtKzQjGueNWvWVx6bZtxfM7gFZn1BXkmCUaS0mwF8T6joCt419Vj1xAw7y4V7gFnj-sPJg-kz3iBWHrmfuP8ub-1OFJ6qDUOdJI3n9kGq6xdciasLyFQXxbcVvEdB53jbT0U0jU-nDNsSiLKiaz_kFuB5pUCv0Fm9PdUW8vhQulTKkAZYixm5unKphehEuUPgbwFPGz3QMZL2XM4yosc1dqUxFUjojpcwYR6c7sO-gGV2xA-yo8ynMxDqfMPiQmgMvvK-VPD8ri3MGx4q4UJjGBiKHenQbP7Qh6_1Yj7oVX-YfnBToMSkxEGqu1-sW5dLJnuogwK-FCqgf9xzpGZm35YwnU9PFvHXncFDG0AcwK3-_7g9XhTsCj4sg2nbrgOjey4M0so_xGAsdZPtkAi9vSm-puubwk_RbUcS-5eke_UdGMOlYR1iJFVEewh_dQnFgouGM9SR6vr_ebV_8B7XtF0EQEgNBBAYja5Pv8cKx0XtGb7v8l80ilElu1or3Rbuobx6xARtZFzp9f0hHtDHVNynQnWf5W-CVacpwMD_NXzsjdVJDqat96S4wGic5sXkuJlfy1Pn_UwpRTz0Y9gqqjdrXEOIMAcpvVRa_DPAOTeoYQ=w603-h839-s-no-gm?authuser=2",
    //2
      "https://lh3.googleusercontent.com/pw/AP1GczM6Nuf7nWKzaMP11petLAzi2Ticmvd5JJOu9wQLh-4CrjdvzUmJ5bRnHngy7HBw8sQ3RYQ8IWWhrnmYAfIveq5QYsD5ZEI1T948_nX1j_PXxi0nxVxn7hibV2hrPn4bqO-p52etgJCWNFvHGaVZxIvsSuWiQg015jGXD2lmMcIqifJY7Uc2BWyIWXj5SOxSHk2qeXJLObu_raR6nq_rsHDV7pUrKYz1U0TzdMhUj26v5im4xcfr-QuvUTIGhS0HQbfHO72rBMLaCJsZz7cn4yietR-xmD5HGLGwgQYfkhzeXJQt65A2OSpEQvvaPwd9c8L1pHzmfgUTnFGOGqHnm9q8jl9yx_dzJ-Awg-YISGVE9OOVpWXXvwj8tTfVPmwuNdLZL9cU92UOInpep6429OKO2g9mLSK7WIptkDBke9H25z6aud9wqZljjrJbmFBY9LBAby9uQJejc9RF3atZOzCCFUX5Hlhx13hNqKZDGPwCQtE9x8Q4v22Vi75QDRIfpFjgVj-fRdPlzxVhXRHVsSTAa5GVmu2EZuFh4OMj4nf8ZNcUyu7U_q-fdh_jlEcIp1K7KUVZkAsc47Xbjz7vd80xN8JRdZGQdby8C_8pjDcU-7rl6cFVYBTdHV1Vek64LNS0wXYeO81kRZwpm8VOD8Ce44lbSFp_znbCd4ajEsGMsrVGoG-zAjlySj22GnRSFr5PqbVR66yJxK5dtOwXaRTjRdC_Ml0JaHkaMGw_aqiWqUOaJUQXVQJLDJusIMl3Rw9UuU-xwOhda4CY6N3d_bCsd7iRUL8C110URWhf2gWWVXJvvVtU13r6NCZ-MmYR1FopARrlrida4RQCnZXm2jSKBJuZcQaCy3WOCZoWCPuU_NkDPGR1KFwR7vRVxtIihi0AYDVIiqWyiEymHvPVcvO0Jm8OxCJCixVJNJe51PfmIRaJhJcp9xRJkttSLMbMnnGIrbV4oK10PYMQ32s9UE6YN4mX3-k=w603-h839-s-no-gm?authuser=2",
    //3
      "https://lh3.googleusercontent.com/pw/AP1GczPcrQQk4G6l7W51zlnpCdMX3DW1KHtnAL2xa64VEYTcu2oDfFF035bk26333o1JCE3Nk5JdoyFVhQvqRVxh3m2Hy380QDQUeP7xg-fKy-3Gpwa4Dh_7SyAtdGsgpGwBhFbNziDuXYiSZe9jduUs9lq058LsQEFduzpSSjLuyHMTGhq8r7ktdqIaIKPIKz4vwQw-OM3gpY4tsjBHt84WiG--8OgDTR2Iw6KEnm1yl-IjM2m7D14ZcMa9Cheamk2otE-Syzy9PS78j3mnuoAfy922MFjBUx9GaGcJMzOofzGk0fZCseoTGJirpr465--6_JPErVVzAp8bMu7M07b1N9ix27R3vb4VcT1OcWd-vlPZMMDE9JoYyK9zGiQXxE0toVHDZGxrYjLda9JX9RBfge6WpwiSGbJG4DoHhJUtG-DsjXVsGNtaceqr6rrBhm1mNDXcOsLEzm2L9tkrDF6XCtOynXJb_kIIn-LjIxbD7X2_slajlfTZHh1dV1D3Cv_GZwqHe7JRwiz3auyadvzwAU2WfWfkj3oZNPC8FaWOFubGoCLjXeFXbjtkjlloAIArngGOj9GztwWNbXYoAwOZ4vVydcJIywueXCXD4SUMEnt8tHQT4vj_C5lkQvH8u8eSTRe6iCAMiojBYVh7XBZ9FUPgA5ojH7yAJT95R1TDtevl8e44O5IXxehE8KyfkYfprhCeiBOlZZFATiIO_TEWACkWudv3FpIT7FBBjls0SZt6af_c11zTahVpSspG1bgZaRt_Mnc9hGyP0qs3g5VF5Rpebq1CKkqlshaD3QanUp_ML7LcEdLf-_FQlQjzDqiGftkGtmTq0EZ4miCuLBK2LKgg48Uc9qBNOz1rZo-D6NbpkjnLU8Teu5OMn6tOn4Dlm-xvw2J49UwgPkf_AhPMiY7bxP6N4AfK3HkznvRcKSRCwDYpuQjbKstG8Y91D_VEw2rb-dzj21bH9gMPL3eXVX91IlwCYgk=w605-h839-s-no-gm?authuser=2",
    //4
      "https://lh3.googleusercontent.com/pw/AP1GczNtu23H6qerlMo1IrFRYCDldJQs30pD2Z2HP-lbI3iknKvnw2QP5RQr-XqINw5XoGCPrOH72_-zfRk0D4Ur13tUX0mwOUkz-04jb1_08c9IonZrK-rjylbtxym3uBU72o8QQzxPwqmRzFV8hwXk6rX9HwL-mNkj-GuxEcaUi4FzBcjdAq9uKaxHFDZ-RmiVUw6baQled-rJ_4Ur9o2yAZO_JhdowX2B3wCxCuMS9la8yVMRwkmHhkeTDCRQXZIkzjprtGDjg2GFR3nTxYdxvKSSBHO2307j5MESToLUeQVURZiPY2t9yOCjku7kOzQDlVBWlzCCFN9VkOrN9juph00ML82_npjnRcpD59KioyHuYKSbztcbUA4_2t7fuXhr00HLZjq2hHDWtj8jQoPlhLf16-uT3GeEMeQVw4p-oKtkMAn49Ep9E7CQxb126w5e-pGf0sAe8NWPxzZj3Iu08Yz9BPVejm7pPkRoQfF7mNafOKeH9WY-RVg0tHErMRe_iOp27YQau38yoW7-3mrRnrsWQQK26BviE4iKbCkRHRlLjyf466rYYHXELvNw9AfMGdVL-mSXxk2JMTU-yZ62vMCzsnxbT9GCL7dSiW6ltU52_yGBa0UfMQrkW3Chc818wtjWfR7m4dOe9yeawSSPdgvjrQNCxdb2Dw8UjO1XIozFodi28bKumYFANTu59r1Z0NKFlyaEmcQyM80eNnlFfJbgCQwhE18L1XajF-zVO42qiWwr7ddv0dgm4EQZekOntjZ54E5skyOwwewxbSZb20RIVjzRsx9_SvGB7cG5yrxsQ4rCwrgfwYqRr4lv3DsvctmWcjjxrwLJWMwv5lPoHoIJhBrQnqgKzhKnksjOS-0CDOhtqDsP5QVbzF8kK0nUjdPYQwRhD9bqKqfl8T8RHNTeeJYzBLhecNyWlSI6vEq_REn2H5-IKCTOXDfTn2zVeAzCvaLsL6L9TlWb6JEr--02x7s8BRM=w603-h839-s-no-gm?authuser=2",
    //5
      "https://lh3.googleusercontent.com/pw/AP1GczNY8IbOw2Ml2hPARGjW7jWykgubT6TLZGtCRF9gF38SiBh0c_GOAQqx5EzuV4yD5OEbrCi-KVpBvqjSyS7bwLW25IIqgnUqAVmh-dBPq6vs1OKf8bMZ6aoDx28CJnD5BJrn1CjTNLKAbRV4miwRdm0YCJVDYOMRT5ysTimxtBQqybJ63wvk4lcqL9bmRZ-zfGavKy1a1XuPR_4ChB1fOxy_Pa18FLfgwZtAc3ZlhQ9FCEkTTo5ig25TZdDF1PjAff-ONy3ilSnprtvr4jbZoePH-9BXN3pDVxpXTLmDPFb_G-3uvgoZrDRf0Cliv6ON9ImKYIRrSsEV8logMx05coZ936VCA_6mdLDy0mH2li55iuqDrCsXLH2y3CLV0MxB559uGBTeUnRxiAwd4zufu-JHuVIuPVRBqIP1HstXKqte138O31w_3PN7IyysxL3uvdYpH7BQWEaDohfZc7f_JRvClCnu4VAMPIcPWtBuApDDuEiSHz-Ps1E0LFQzDena3Q35ScdA8HHhqCF9P7vyKC0iewT6gtMl0-4txh95VfmHJarJLONXq-Gr-r1jt1U77BvUlSCJHpUpDbDOPSgWTnX0uQNWVe6_WeLXV8pP8X4az_XzY4zx-UNobzU4DOEKRrGCSz6vZZw2cLYSZJyPhaK7sXL48BHQuT1sNz3JqFiJ2nVAWwmeITckLjEuF1LmNDM_zecncRbNnRp1S-wvFVHPBQze3z0EUo98qEyp4ko8U4LRWJic8904q3h2DbeTs-WFCuMSAz14kFzbHPQeN9ec9NSw9GjV36XQNjlXt_4Bc_vp1wbrCMb0dqIdfpeTqwnMbNbm50u4ZO6OfppU3Yb8bI6_DOqvmE_aIiA4Umxwr2xpef5FxWwBQCRC7JyzcUmGrFvad-JCV6JQY5LM_fYoiV27j_zxUqa27zQ0YWWMJmGWfdIRLUwnXKySB0cdtsLMnMv3ezC4Z4Lsks_MXTwgjez_Z3w=w603-h839-s-no-gm?authuser=2",
    //6
      "https://lh3.googleusercontent.com/pw/AP1GczO_JP5w8wzFlXwqkwej3OtR28dUvrtLAFl26xRNq2LY_1XRsvuqzzUFecIfdF8fQGeqqPI7QtD6Yf5ducYUn6KBJ7qjEVir7sXq7_0sBiDe9pc6kinir6bf5w5QgNE80EaNvZEKq0XVTTyhKbIt8u3QKaHjn7g88CZcIHXBntlitIKB6Ub_yw1vwzKlsQEbkSDHI-omU4gm2drtrow-_uFrxIFEe6G7fHQGG-prxfQyRKxT6OC7TE9dt4n2LvYlh01ARRYJ7aredVUkn0mZZQ0t0DlZIGCNSDozysvGothjlQefieGmjgWnItsPyamByNZgF09TF960v7Zbo1DHbLPzBzMe-ClJMd5GA7TI8wU_3tTjAHPIoec8T85H7FTwEvATHUUmzcLjbneKHl2edZ6uifZ5Svry0L6ICfo0B1X5fRJy1gcOyFDqvhATweEKVpR4BNd4k9nTqJ0pLwumbPWQAA8Z_oUv8i2qZw1UetH3zqCc5LeBRFrYWnPbap9aHu0LsH1XPnuf-sdOj-Gq4bfM3f2ep4tjZlbg2Xsh5DFA8P81UNYfAr7ypC8LppA3Y_VaSfrV5__RH_z5I7aCH67kjesWtf-H4UFAWV2YnoO9cvup4lXELBmqbhTkwmgAUpDm_FuV9rCnAoYLNdzUk-TI_zAzDyp4B9qFXc8Q1vi42YgvI0VLa-5Eo_aj-3CZ0DsT-52jSVeZAlAwkqUu9uBK0dhGy1Y8VxqcAbXBFTzqfSqh7MvkyAMhLmyxrOlhXf4Ec0imFP31tQQgQaC0uok0Jppkk39WO3aay-MtSmdel8yIORw58_W3-I-oznQEfg2GQ-Hy9aXUKPR1ZUV8C49HELrQSt22PN783vFDuXsCPNo7UF-rAjj87ugB7Z-ZKZT48yr4hy2MClpMuazmqK_S3gtWjySiqpBvwCAM58tOaD6AgC6BqifRfudNSEoS7y9H18g2BITQYgux6h6drUH3t4IwwU8=w603-h839-s-no-gm?authuser=2",
    //7
      "https://lh3.googleusercontent.com/pw/AP1GczOAXllmRkiYWaQOf9geGVeh3TKFX9xRWuqByixpEUKMjBdFnystaEQVqYwZWqPjpKMkG-SvI91CROhBHpRavPiDAVeWx-CiHOmjYpU2oA2N79ahSAq6WBUxKfOBs4x-GkIqgwMnONLEPXY5s7EUPt1VOKpiD-ETIij6uuJH4ylkI2GyJlDKiRrvXtq-dI5v6Kp44Ql4up42FHb2NooIQaJxGMJRNorY4jo20-VWPWB9CoAO8ffM5W-5Mb1WW8jJh8nadWHW1YWLakCKFaI1khokpwBTKILoqa9HKVsoAnDMLMajA82QsAWKFO4ih79Jla9Z5g_YIVASHMuSx5uE4msFEUp5rPMd_WDnF0v5TC3Tqh0ONuDUyfgo52eE1KWkJs88xHfeSeIBebnozuED7cdMusS0zydK-lSWQD-Mti5iatH1jaP481Tr7S5sna1ch83TVz4UrAQN92ABRA3S9YIj22r5THFCkHuqlbsiKdNBLEIonJLe4CK7dFZ7S1vfiAJIbj8Wn3X8ygZvU4MMN_thu67GFMO8GsXn84fZpGlNgeiTaH4XT-_N8GKAWrAeAhLqOUu5li-hPLqor-gubJ9qPsKTvYK8h8cCD5lm6VZLO9SbTkBhPEVvGAMZ8UMAsRBHZEdwAi7bc3H_7I41FHckLt6AdLsCIyNyD-njRyGIzZLDD-S8zfxLgjsCFCLnYWorUKEuNpkwTQu6Y9CaBc-bSteHcBVlWNYgGDGIj4hR0aGZcMexcGPY8G595vtBvHtdTv9xzPhCfcob-IGGAaY19XZbEUltT1lF6g5KogsYaekgUN0uc4vKbcatXA2tMFy-ufh-vxGyp6ucydeRo9k-f5FWkLIehFh6j_9ogadS_oErmOFf1llK-SBj5fb1aCGr3AnsBrKHzF4n2sOOXp8ra3_h72ygdDd_Jzqe8hh4cIyFri_t020ITigF6ifdSHQE4VTXYKqb7KFRPYFpYm5kq4rISMI=w603-h839-s-no-gm?authuser=2",
    //8
      "https://lh3.googleusercontent.com/pw/AP1GczNSZmjvafT9efbo7tnN2BEoaEyA4xXLskD300JJIneVn7F5eUrM4LJ9N22EzBXs5biIDDwe8zYhOmgQ9xvtjDCCPyQElts7n73wZBx1hbftKyhSeKxYc4Dx3eSd708lm6tfWuRTB45a5uWvIPwrUoWeL7_P7YVCPBM_cAK8S9CS20UyFZDFcDdtaDBfy-Y5JIlXVrG8PFrchTV81VMulhrLZ-RRBYL7RFl5vf5pGYdiOJXWOr2zLdwi6KZ-_TpHSIXbkFu6IMVEbpgrqNpBdO8wMk03gDdjt8ybg1v_Q57F_HgqrR1dwasMryTiNbXMgHEhwmQ_OpvfaKB6nm6Zup8D9xmLGrSQxZaPWQvLx3YWXMX-pyjJpA5R5GVswZF4Voy6L7FxuufHmfpMJ1SEpApR4NAohVlIcuD4K5Rd19sZQV00eRxXdI_rJpt71FCxPf0wm8seBWECfMZZl7avdlurdHKTDoLjKSRv8hdEjRNjXLe3B1s2fA7nRPP0JM2LnY8Cc_Ofg1asDTYMKiHzLOpeGPbjVad5C8GYdnv13MJe6gQ3g7HhvD45BF-O0DdTd9lqhqEwfcX1dGHtutLny6SJJgy1H00ZCKQ6nrwafwMdL-zEE1eWLYAG3HH0Jtx-YLhcAFcoy-Al15Ba5Fu_f3LNNs2Zq67yzyjJyx4tekfN8j0k3Jf14k00jn2KVGuYewsducZhAPoPE_aRCIrYJ_w8k0120ZY1qcJ_0mXtQuiW9kgAJZVBow1JgS-vwOWd0XxhCO1N6GB4H3oxnO28AkXC6X6dTJ668VOfiDhVQ1EylLrmBGuTqQEFsy_GGSnB9xCrPW8WB2uUkLpyZ0pxK0u1FimHeFGmenshx627LFPnxA48UZe5klV1ZC-iCWMdiO2EsmaYtYhbP8HQbfOpAA_HCr85tjjFM5-6myuv-dlDesQYg8GtVBtBasTrzzlQwMGq_L1bh3eCVew_4HzNqEJKAKEhSNA=w603-h839-s-no-gm?authuser=2",
    //1
    "https://lh3.googleusercontent.com/pw/AP1GczMgDHZFSaHfYEupz2gtaYuKWxtHvVeAAkgCXu6KNDFgR4W_URsn6LAk8N-q_EiL6eS-D8vhupL9rMivgFC4hrz4VS_G-zcyRvAUeQCiptkNr0Bdgq0eh4zyUhbQozO0GxRT1kf7Br0H-Rmx5qfCLXLduWAjQ0F8tQGm8B0q3DymE3GaMu0plqnlc7ZZ-Fx5r5GIP-6J_2rGGnAxwOCYn5qtD6piDI4VDjxMNP3rlD_TwSUjKPABlBj0_DgaIM8mCtCpq6E056KSwOrUBLpXDJ7qmQgSRT6apWBoorkeyvsKBAWiiu9QxDnQg70rsvpcX6nnU9CoPWaylVBr8ZqI_qfvz4MrMnKS1Nzo-ZXEj2fk98iYtKzQjGueNWvWVx6bZtxfM7gFZn1BXkmCUaS0mwF8T6joCt419Vj1xAw7y4V7gFnj-sPJg-kz3iBWHrmfuP8ub-1OFJ6qDUOdJI3n9kGq6xdciasLyFQXxbcVvEdB53jbT0U0jU-nDNsSiLKiaz_kFuB5pUCv0Fm9PdUW8vhQulTKkAZYixm5unKphehEuUPgbwFPGz3QMZL2XM4yosc1dqUxFUjojpcwYR6c7sO-gGV2xA-yo8ynMxDqfMPiQmgMvvK-VPD8ri3MGx4q4UJjGBiKHenQbP7Qh6_1Yj7oVX-YfnBToMSkxEGqu1-sW5dLJnuogwK-FCqgf9xzpGZm35YwnU9PFvHXncFDG0AcwK3-_7g9XhTsCj4sg2nbrgOjey4M0so_xGAsdZPtkAi9vSm-puubwk_RbUcS-5eke_UdGMOlYR1iJFVEewh_dQnFgouGM9SR6vr_ebV_8B7XtF0EQEgNBBAYja5Pv8cKx0XtGb7v8l80ilElu1or3Rbuobx6xARtZFzp9f0hHtDHVNynQnWf5W-CVacpwMD_NXzsjdVJDqat96S4wGic5sXkuJlfy1Pn_UwpRTz0Y9gqqjdrXEOIMAcpvVRa_DPAOTeoYQ=w603-h839-s-no-gm?authuser=2",
    //2
      "https://lh3.googleusercontent.com/pw/AP1GczM6Nuf7nWKzaMP11petLAzi2Ticmvd5JJOu9wQLh-4CrjdvzUmJ5bRnHngy7HBw8sQ3RYQ8IWWhrnmYAfIveq5QYsD5ZEI1T948_nX1j_PXxi0nxVxn7hibV2hrPn4bqO-p52etgJCWNFvHGaVZxIvsSuWiQg015jGXD2lmMcIqifJY7Uc2BWyIWXj5SOxSHk2qeXJLObu_raR6nq_rsHDV7pUrKYz1U0TzdMhUj26v5im4xcfr-QuvUTIGhS0HQbfHO72rBMLaCJsZz7cn4yietR-xmD5HGLGwgQYfkhzeXJQt65A2OSpEQvvaPwd9c8L1pHzmfgUTnFGOGqHnm9q8jl9yx_dzJ-Awg-YISGVE9OOVpWXXvwj8tTfVPmwuNdLZL9cU92UOInpep6429OKO2g9mLSK7WIptkDBke9H25z6aud9wqZljjrJbmFBY9LBAby9uQJejc9RF3atZOzCCFUX5Hlhx13hNqKZDGPwCQtE9x8Q4v22Vi75QDRIfpFjgVj-fRdPlzxVhXRHVsSTAa5GVmu2EZuFh4OMj4nf8ZNcUyu7U_q-fdh_jlEcIp1K7KUVZkAsc47Xbjz7vd80xN8JRdZGQdby8C_8pjDcU-7rl6cFVYBTdHV1Vek64LNS0wXYeO81kRZwpm8VOD8Ce44lbSFp_znbCd4ajEsGMsrVGoG-zAjlySj22GnRSFr5PqbVR66yJxK5dtOwXaRTjRdC_Ml0JaHkaMGw_aqiWqUOaJUQXVQJLDJusIMl3Rw9UuU-xwOhda4CY6N3d_bCsd7iRUL8C110URWhf2gWWVXJvvVtU13r6NCZ-MmYR1FopARrlrida4RQCnZXm2jSKBJuZcQaCy3WOCZoWCPuU_NkDPGR1KFwR7vRVxtIihi0AYDVIiqWyiEymHvPVcvO0Jm8OxCJCixVJNJe51PfmIRaJhJcp9xRJkttSLMbMnnGIrbV4oK10PYMQ32s9UE6YN4mX3-k=w603-h839-s-no-gm?authuser=2",
    //3
      "https://lh3.googleusercontent.com/pw/AP1GczPcrQQk4G6l7W51zlnpCdMX3DW1KHtnAL2xa64VEYTcu2oDfFF035bk26333o1JCE3Nk5JdoyFVhQvqRVxh3m2Hy380QDQUeP7xg-fKy-3Gpwa4Dh_7SyAtdGsgpGwBhFbNziDuXYiSZe9jduUs9lq058LsQEFduzpSSjLuyHMTGhq8r7ktdqIaIKPIKz4vwQw-OM3gpY4tsjBHt84WiG--8OgDTR2Iw6KEnm1yl-IjM2m7D14ZcMa9Cheamk2otE-Syzy9PS78j3mnuoAfy922MFjBUx9GaGcJMzOofzGk0fZCseoTGJirpr465--6_JPErVVzAp8bMu7M07b1N9ix27R3vb4VcT1OcWd-vlPZMMDE9JoYyK9zGiQXxE0toVHDZGxrYjLda9JX9RBfge6WpwiSGbJG4DoHhJUtG-DsjXVsGNtaceqr6rrBhm1mNDXcOsLEzm2L9tkrDF6XCtOynXJb_kIIn-LjIxbD7X2_slajlfTZHh1dV1D3Cv_GZwqHe7JRwiz3auyadvzwAU2WfWfkj3oZNPC8FaWOFubGoCLjXeFXbjtkjlloAIArngGOj9GztwWNbXYoAwOZ4vVydcJIywueXCXD4SUMEnt8tHQT4vj_C5lkQvH8u8eSTRe6iCAMiojBYVh7XBZ9FUPgA5ojH7yAJT95R1TDtevl8e44O5IXxehE8KyfkYfprhCeiBOlZZFATiIO_TEWACkWudv3FpIT7FBBjls0SZt6af_c11zTahVpSspG1bgZaRt_Mnc9hGyP0qs3g5VF5Rpebq1CKkqlshaD3QanUp_ML7LcEdLf-_FQlQjzDqiGftkGtmTq0EZ4miCuLBK2LKgg48Uc9qBNOz1rZo-D6NbpkjnLU8Teu5OMn6tOn4Dlm-xvw2J49UwgPkf_AhPMiY7bxP6N4AfK3HkznvRcKSRCwDYpuQjbKstG8Y91D_VEw2rb-dzj21bH9gMPL3eXVX91IlwCYgk=w605-h839-s-no-gm?authuser=2",
    //4
      "https://lh3.googleusercontent.com/pw/AP1GczNtu23H6qerlMo1IrFRYCDldJQs30pD2Z2HP-lbI3iknKvnw2QP5RQr-XqINw5XoGCPrOH72_-zfRk0D4Ur13tUX0mwOUkz-04jb1_08c9IonZrK-rjylbtxym3uBU72o8QQzxPwqmRzFV8hwXk6rX9HwL-mNkj-GuxEcaUi4FzBcjdAq9uKaxHFDZ-RmiVUw6baQled-rJ_4Ur9o2yAZO_JhdowX2B3wCxCuMS9la8yVMRwkmHhkeTDCRQXZIkzjprtGDjg2GFR3nTxYdxvKSSBHO2307j5MESToLUeQVURZiPY2t9yOCjku7kOzQDlVBWlzCCFN9VkOrN9juph00ML82_npjnRcpD59KioyHuYKSbztcbUA4_2t7fuXhr00HLZjq2hHDWtj8jQoPlhLf16-uT3GeEMeQVw4p-oKtkMAn49Ep9E7CQxb126w5e-pGf0sAe8NWPxzZj3Iu08Yz9BPVejm7pPkRoQfF7mNafOKeH9WY-RVg0tHErMRe_iOp27YQau38yoW7-3mrRnrsWQQK26BviE4iKbCkRHRlLjyf466rYYHXELvNw9AfMGdVL-mSXxk2JMTU-yZ62vMCzsnxbT9GCL7dSiW6ltU52_yGBa0UfMQrkW3Chc818wtjWfR7m4dOe9yeawSSPdgvjrQNCxdb2Dw8UjO1XIozFodi28bKumYFANTu59r1Z0NKFlyaEmcQyM80eNnlFfJbgCQwhE18L1XajF-zVO42qiWwr7ddv0dgm4EQZekOntjZ54E5skyOwwewxbSZb20RIVjzRsx9_SvGB7cG5yrxsQ4rCwrgfwYqRr4lv3DsvctmWcjjxrwLJWMwv5lPoHoIJhBrQnqgKzhKnksjOS-0CDOhtqDsP5QVbzF8kK0nUjdPYQwRhD9bqKqfl8T8RHNTeeJYzBLhecNyWlSI6vEq_REn2H5-IKCTOXDfTn2zVeAzCvaLsL6L9TlWb6JEr--02x7s8BRM=w603-h839-s-no-gm?authuser=2",
    //5
      "https://lh3.googleusercontent.com/pw/AP1GczNY8IbOw2Ml2hPARGjW7jWykgubT6TLZGtCRF9gF38SiBh0c_GOAQqx5EzuV4yD5OEbrCi-KVpBvqjSyS7bwLW25IIqgnUqAVmh-dBPq6vs1OKf8bMZ6aoDx28CJnD5BJrn1CjTNLKAbRV4miwRdm0YCJVDYOMRT5ysTimxtBQqybJ63wvk4lcqL9bmRZ-zfGavKy1a1XuPR_4ChB1fOxy_Pa18FLfgwZtAc3ZlhQ9FCEkTTo5ig25TZdDF1PjAff-ONy3ilSnprtvr4jbZoePH-9BXN3pDVxpXTLmDPFb_G-3uvgoZrDRf0Cliv6ON9ImKYIRrSsEV8logMx05coZ936VCA_6mdLDy0mH2li55iuqDrCsXLH2y3CLV0MxB559uGBTeUnRxiAwd4zufu-JHuVIuPVRBqIP1HstXKqte138O31w_3PN7IyysxL3uvdYpH7BQWEaDohfZc7f_JRvClCnu4VAMPIcPWtBuApDDuEiSHz-Ps1E0LFQzDena3Q35ScdA8HHhqCF9P7vyKC0iewT6gtMl0-4txh95VfmHJarJLONXq-Gr-r1jt1U77BvUlSCJHpUpDbDOPSgWTnX0uQNWVe6_WeLXV8pP8X4az_XzY4zx-UNobzU4DOEKRrGCSz6vZZw2cLYSZJyPhaK7sXL48BHQuT1sNz3JqFiJ2nVAWwmeITckLjEuF1LmNDM_zecncRbNnRp1S-wvFVHPBQze3z0EUo98qEyp4ko8U4LRWJic8904q3h2DbeTs-WFCuMSAz14kFzbHPQeN9ec9NSw9GjV36XQNjlXt_4Bc_vp1wbrCMb0dqIdfpeTqwnMbNbm50u4ZO6OfppU3Yb8bI6_DOqvmE_aIiA4Umxwr2xpef5FxWwBQCRC7JyzcUmGrFvad-JCV6JQY5LM_fYoiV27j_zxUqa27zQ0YWWMJmGWfdIRLUwnXKySB0cdtsLMnMv3ezC4Z4Lsks_MXTwgjez_Z3w=w603-h839-s-no-gm?authuser=2",
    //6
      "https://lh3.googleusercontent.com/pw/AP1GczO_JP5w8wzFlXwqkwej3OtR28dUvrtLAFl26xRNq2LY_1XRsvuqzzUFecIfdF8fQGeqqPI7QtD6Yf5ducYUn6KBJ7qjEVir7sXq7_0sBiDe9pc6kinir6bf5w5QgNE80EaNvZEKq0XVTTyhKbIt8u3QKaHjn7g88CZcIHXBntlitIKB6Ub_yw1vwzKlsQEbkSDHI-omU4gm2drtrow-_uFrxIFEe6G7fHQGG-prxfQyRKxT6OC7TE9dt4n2LvYlh01ARRYJ7aredVUkn0mZZQ0t0DlZIGCNSDozysvGothjlQefieGmjgWnItsPyamByNZgF09TF960v7Zbo1DHbLPzBzMe-ClJMd5GA7TI8wU_3tTjAHPIoec8T85H7FTwEvATHUUmzcLjbneKHl2edZ6uifZ5Svry0L6ICfo0B1X5fRJy1gcOyFDqvhATweEKVpR4BNd4k9nTqJ0pLwumbPWQAA8Z_oUv8i2qZw1UetH3zqCc5LeBRFrYWnPbap9aHu0LsH1XPnuf-sdOj-Gq4bfM3f2ep4tjZlbg2Xsh5DFA8P81UNYfAr7ypC8LppA3Y_VaSfrV5__RH_z5I7aCH67kjesWtf-H4UFAWV2YnoO9cvup4lXELBmqbhTkwmgAUpDm_FuV9rCnAoYLNdzUk-TI_zAzDyp4B9qFXc8Q1vi42YgvI0VLa-5Eo_aj-3CZ0DsT-52jSVeZAlAwkqUu9uBK0dhGy1Y8VxqcAbXBFTzqfSqh7MvkyAMhLmyxrOlhXf4Ec0imFP31tQQgQaC0uok0Jppkk39WO3aay-MtSmdel8yIORw58_W3-I-oznQEfg2GQ-Hy9aXUKPR1ZUV8C49HELrQSt22PN783vFDuXsCPNo7UF-rAjj87ugB7Z-ZKZT48yr4hy2MClpMuazmqK_S3gtWjySiqpBvwCAM58tOaD6AgC6BqifRfudNSEoS7y9H18g2BITQYgux6h6drUH3t4IwwU8=w603-h839-s-no-gm?authuser=2",
    //7
      "https://lh3.googleusercontent.com/pw/AP1GczOAXllmRkiYWaQOf9geGVeh3TKFX9xRWuqByixpEUKMjBdFnystaEQVqYwZWqPjpKMkG-SvI91CROhBHpRavPiDAVeWx-CiHOmjYpU2oA2N79ahSAq6WBUxKfOBs4x-GkIqgwMnONLEPXY5s7EUPt1VOKpiD-ETIij6uuJH4ylkI2GyJlDKiRrvXtq-dI5v6Kp44Ql4up42FHb2NooIQaJxGMJRNorY4jo20-VWPWB9CoAO8ffM5W-5Mb1WW8jJh8nadWHW1YWLakCKFaI1khokpwBTKILoqa9HKVsoAnDMLMajA82QsAWKFO4ih79Jla9Z5g_YIVASHMuSx5uE4msFEUp5rPMd_WDnF0v5TC3Tqh0ONuDUyfgo52eE1KWkJs88xHfeSeIBebnozuED7cdMusS0zydK-lSWQD-Mti5iatH1jaP481Tr7S5sna1ch83TVz4UrAQN92ABRA3S9YIj22r5THFCkHuqlbsiKdNBLEIonJLe4CK7dFZ7S1vfiAJIbj8Wn3X8ygZvU4MMN_thu67GFMO8GsXn84fZpGlNgeiTaH4XT-_N8GKAWrAeAhLqOUu5li-hPLqor-gubJ9qPsKTvYK8h8cCD5lm6VZLO9SbTkBhPEVvGAMZ8UMAsRBHZEdwAi7bc3H_7I41FHckLt6AdLsCIyNyD-njRyGIzZLDD-S8zfxLgjsCFCLnYWorUKEuNpkwTQu6Y9CaBc-bSteHcBVlWNYgGDGIj4hR0aGZcMexcGPY8G595vtBvHtdTv9xzPhCfcob-IGGAaY19XZbEUltT1lF6g5KogsYaekgUN0uc4vKbcatXA2tMFy-ufh-vxGyp6ucydeRo9k-f5FWkLIehFh6j_9ogadS_oErmOFf1llK-SBj5fb1aCGr3AnsBrKHzF4n2sOOXp8ra3_h72ygdDd_Jzqe8hh4cIyFri_t020ITigF6ifdSHQE4VTXYKqb7KFRPYFpYm5kq4rISMI=w603-h839-s-no-gm?authuser=2",
    //8
      "https://lh3.googleusercontent.com/pw/AP1GczNSZmjvafT9efbo7tnN2BEoaEyA4xXLskD300JJIneVn7F5eUrM4LJ9N22EzBXs5biIDDwe8zYhOmgQ9xvtjDCCPyQElts7n73wZBx1hbftKyhSeKxYc4Dx3eSd708lm6tfWuRTB45a5uWvIPwrUoWeL7_P7YVCPBM_cAK8S9CS20UyFZDFcDdtaDBfy-Y5JIlXVrG8PFrchTV81VMulhrLZ-RRBYL7RFl5vf5pGYdiOJXWOr2zLdwi6KZ-_TpHSIXbkFu6IMVEbpgrqNpBdO8wMk03gDdjt8ybg1v_Q57F_HgqrR1dwasMryTiNbXMgHEhwmQ_OpvfaKB6nm6Zup8D9xmLGrSQxZaPWQvLx3YWXMX-pyjJpA5R5GVswZF4Voy6L7FxuufHmfpMJ1SEpApR4NAohVlIcuD4K5Rd19sZQV00eRxXdI_rJpt71FCxPf0wm8seBWECfMZZl7avdlurdHKTDoLjKSRv8hdEjRNjXLe3B1s2fA7nRPP0JM2LnY8Cc_Ofg1asDTYMKiHzLOpeGPbjVad5C8GYdnv13MJe6gQ3g7HhvD45BF-O0DdTd9lqhqEwfcX1dGHtutLny6SJJgy1H00ZCKQ6nrwafwMdL-zEE1eWLYAG3HH0Jtx-YLhcAFcoy-Al15Ba5Fu_f3LNNs2Zq67yzyjJyx4tekfN8j0k3Jf14k00jn2KVGuYewsducZhAPoPE_aRCIrYJ_w8k0120ZY1qcJ_0mXtQuiW9kgAJZVBow1JgS-vwOWd0XxhCO1N6GB4H3oxnO28AkXC6X6dTJ668VOfiDhVQ1EylLrmBGuTqQEFsy_GGSnB9xCrPW8WB2uUkLpyZ0pxK0u1FimHeFGmenshx627LFPnxA48UZe5klV1ZC-iCWMdiO2EsmaYtYhbP8HQbfOpAA_HCr85tjjFM5-6myuv-dlDesQYg8GtVBtBasTrzzlQwMGq_L1bh3eCVew_4HzNqEJKAKEhSNA=w603-h839-s-no-gm?authuser=2",  ];
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
