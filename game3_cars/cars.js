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
    "https://lh3.googleusercontent.com/pw/AP1GczNUkg2pYB4PGDrYzwZKjmRF-MtKOVh-9Dw-A-P0v2ScxODlVldj2_LO8K1_kac7i9G01GnDyIVo9kX0z3YYNZyJTWfgGzwdussABlKHJrfwyWPokWxI7yC7dR3wYkSXjV9vGqLjyF5aL0CKnYO2fLm3NW8aYe6OzhbqdKK4Q_ZRqc5NK59CxRQEQjQQiBh-Mm_isv4830K7-h7E7MwUg9Hj93Ilk458iOQab9cTj-ZUkGJQpIEI4FvvWZC0asuH7ayuPkdMG8PnTjLK5FnobxYm9XQrYLZ_GBSQUYaAsyvAXDpSRFuSkPy2fQKuaa7V1tEBjRlr2qlzciUkRpWej8b2Lfu6pbkjAm1vOXGZnk4kL1QNMgGEcj3kX1psB82kKYN9_lbSrj3loqjdiirTve964U0aQfUYIIgELE6TbgAfHu0jgT9a06jTQxvR5VVzjFJB8KJU0j1hyzI58P31FmYIsxTP87ptALq10YStzfFxt5WxoFjIl2rNZEKZWx2tQl9lRWZVPI18enST4Ophhd-qoKWH3Nc4kFlWtyNz90JI_upyOwXFQEmpNhayzgP5KvSgQbg4G1VPplOb_1w-rv78AJ6q3PJRZpJJNUZg6u00_mtdiIbbty_cvRQgxLtzzjJkSbMP6PmY9sZMnCG91Ro3H9B-1mVAkv-MQWroWF1PlfsEI-rmH8ekdB54NLHR3fFMYo8_Ru8SpOlt0k_Czs9tCr90WsiIGQ5UmCoOYSmdB8BYxZnGXLb9_78yH74xT6Yd_teFe_zkG2dPPChEfcoUifOEIqRQIN8SY-dKtm0BWgsBdGQSBV3aTeMutfDq5Wuq90krqHj6f8J3Mfa1PhVTQQhl8kEBzPGXiW-eZldsCh7oLPOy83CUuIVDAbSkrqu4oxDEdqTVlGacBO3klGsopTi1Hjh8Z7xuqaXJJYtzpcnCm1AaNYsMhXkX3lTxTL50hljB8fRN2NQ-5ptQxH4QHD5txKM=w500-h375-s-no-gm?authuser=2",
    //2
    "https://lh3.googleusercontent.com/pw/AP1GczM66ob5pYc5FSBDTNG8KjDRieuafslyQ6ZICcuiqicU5BSP6WYPFDojKQUTypFmGLilBdZKqAO7sRdcyiqKePEu6-H-DAXNYkRKsfheLw2fviT9IHM35MbhCEGE_9atEPa_z5fnZXpBEIPSXKyHuckpuTyIyHieGlL-h6QLRyaKlWZ_q9tl_hK_--oqCbz3pJrPbE4Ra9IOqy-GHfm5_Zj4tcWYm1u6npD57EeY7j5HukajcPhf4IU-Oi1dOcKuVtL17qj7trt_UUPD8kP0KwAJkVJ_1AE7YrcUUbWquyR82jDwortQQvT33fuwKTk62lzu-nKvIwqcwJzflv8KpQqMGaoBiF6hHc2zx9CtyZp-33vcwqbaI9se-UE7qXU7Amre063OyQd8lSmWM021KhbRNLYoQ35nndh_MdeEnUjJ2X0PZQXBiNwoC-sRP6x2BfT8_O3WW8vm6ImCNAS69Rd0G3agAj5Ql9WswE-ksgnXZkvWBtTorLErgEjL9_3GCeHib9JPr7UbjQhz2uT-K5Odt6hRBt9DTHLu0xXnJWzb838jBgtBTR1-3IjyOf9GOZNuCKx3OK_UXf3uOvdrSW6QZ1FNuOSZwF-d741BL9O-JHknh3_z-QcyqE601R43kwJhiHUWwa28lqL5xDagfodRQWhJqbK0xnYAP88CGkwc43PZsfiunbNe8ow4_5EOV20BqibFJ_Y4fEzJG85dT1cEi8jc8tzF1Qc3V7Hl0APwuyiE-K8s5wAXbzGFIDBk7M8xFuGknYO1QigyM8cw3fLWGy2mDq_RabvuR3KvdsqXlOd7gA6CoaFAktR9ACB2t0vqnhrXUiSP6NJ-mQbhiqXId51jf4Tpn3Svuo5ndQFyNVXoLew_RyImUxioAGP9HEd82nrqJERnu4WHmrJGvu8b9YGPtucpFziEamuMHP3ZJUiw4Ry2FzzKjc_AafZwLQ2DgQGAZIKV8FnYlwjsIiT-nJy6xx4=w462-h304-s-no-gm?authuser=2",
    //3
    "https://lh3.googleusercontent.com/pw/AP1GczMQSU5U7DntoOF-Xj6k6FkoMajs_5uOumKiFoKftZUTtw-Cy-SK8Ak64aHcI3leqj48ACSkdb2PlIpVlw7yqWh2TsljOGH0sg7tnrRCmVTembHbAZkd0QC9QjgPW8_CDud5_KHdudAlYXr7eMAMXRKHWlBD9mwPD_Z-3NMRXOW3zkY6O7fXeQKV8WQE68Y1M2_kmGOputO0xM6VmLVTMMgYW-wtqyTDgfAT8_nhV_T3mJbf48N4lLLn-U36Y_6cnHcTTkvflRJsDEnbAMgMQaTTK53CdD6JnSPaH13jOY9594Me9IRuJ3jE39rXliJnTdHuRNmubbQJFZiBRGSbW6UuXLTy1p78FpIKGioqL83uy-g2Yu4rw2Fw4BtuzgPNWK5pv56zN3opbsVMj7qngLc9d2RMUs1lm2zBPPXq6GvJQ7T-EqKFueWrBw1LEWyGAfQKef25t-Xe1fa9nKv6cKKCtuYSGgvC6ZJ9PBLpUjh_GCGI5wOlBZjgnUVHX_k_HzLgNIggfaRFWT2BMSJ8dMngK9qXq9vv9Ril3lZWK20FhGpImbF8m4WNNxRl3y6Fq0bDA8GVdivRBgv_mFj2uUmY6v3XVwSIXIxdncEEdPxN9ndqACma2G-c2ky2wu0ua67VA_YAr1-b0pSuV-v9Ki5avbxbZsNtkY5CItnjk2_PsloBOdrjNArg8DSf02GZ3WT8UXIa8LMYtASQgv7PGqJq6HEKb0KbrUgA9rXhjq5w1LBq9tI5NIFX3qL6lKUEcVPnzjyxwuiVegxxz410ELahDl4OXucwRkBF4MeWRCjQB87hv4ktXXcq4oWlo1aQDFUCkpZlF2MUTTrlRY9_BFEwtS8GjnQbnfz01WgI9nnRToDr6d6YR7u89qysDvy3boUL0k7IlVT8bS20TBsQLrb9pGQ8MZhJ6SOkqfvCKeCmp1xEllPAoa0dlRq2Lddvu7NZU6L3DXUq0oxLmrVgwqbTVvW_3J0=w500-h500-s-no-gm?authuser=2",
    //4
    "https://lh3.googleusercontent.com/pw/AP1GczO3h3Lb_53qzqQchjvx56dOazlLbBi58GnthpInilgG7Q4UTI2TC3nnl461y3nerVIgcWmW6yNyZFsRDB7FGSKHg3PiiRIqtEA8Gb_eafmIX_zGX5ElrZWkpyZelvEo1i19e5ZzeVLjVxpYF28fUpe04jR_bzP1Y7q1BhKoUqx9DLY_D13NSR2uu_CCQTI2tXSFqfCpwADxaM3lE38gbbFTm9iIfBqoOiHfqKWI4DywZHi9O4mCHvekaP-kHip37Y2d0qT-DtwsSOeXoWSrqFpgr3tH1fWWiIvAeCI6oUYcSrgzkiQMNFhxSYZGIHz21hqPbQKgSHh9DXdpMdDmhQeg9GXPGhUi_62VipX9T_vDwAtQa02NscfBOlM-Lnubaf1VTy10SRD61KrPypboGqgcOAAat2Zl5lr6HP23shuV5Cxm4LxWJByqnLJEcJyVAhPgf-4-dJxKz-w-DpR5LmYtqsI8iovSAU-2QmlEqboMebiwVlpKfGZtZ2TilQHMVuaT35toQl2_Caz8N9oPT_WCCOLjQnNjkWVJba6jyx_ACT9RxhihG8DnswPffdXieUJEGx1yvCL686N7KI9B2MBHqFg99B8aPpwrLWRegPfIhlhowOGgGU6ZwFUKpI0KnkTItI1loDubziq8toMyNIB5njpZfYFtpsGtzWAULacNRJ8mW1QeCfHsLvQkspFkGtSgHPSniej2cADSdxqMS2Y4ubzE76fYbXfE-lzeR3xCBf3PE0CRL3vVgnA1wKA1FTE-wlXoqAPBH5B46iot94EUwJ_aDjplvHVrfjCdeK8JrovrhmImBsSFbtiXR3CwhuqqqYoxOwut1BKhmEFSUgOyGnp136VuKlCQxdZdbXSPQ8DjJoptf368Xv5RgKdrVOnT6KvLANj4IDRGEhFwIEIZGk07hNqrj6kzTpcQXNOAxXfm9WgfyOp6G52TpDUNvUMHP4vrglE33dFgi6kef73yyKPdokE=w375-h666-s-no-gm?authuser=2",
    //5
    "https://lh3.googleusercontent.com/pw/AP1GczNC4JA8NSA8ZivgtwaOzR5M9dM5q_Uo8nm6hPTS3dMcbeBJoHn5vZeP16yUE5sPtWH1l1O0SF-sNof3aJb-VkP3_Xw5HgivPZwyGxRKbrqQgRnLMta4-dkuyyLst0ZEzp6EcaQ7Dl8HyfjJokNYQmhIF-ju8cmR1iy-hrnSXBYTqWgYu0tOjYmQ1e6Ooy34g57Ze3Ndh5DUpVQuMsSDpqIStuBuR5hnFVGS0Z6oaSxJNzPWzHLkf8CaDxSzjdCBfON19AD0UOLkRYcO40GDD-j4HzEpwlO33OQDaAXkVphxsZ6ma4AAJevWj9gPMCwAewwHWhOl9o8Vr1Gyobq3AK1N0Ux-HgiAo3kkfJigL40z1Vy9rBAS-6oh7p2zbm-3eYRf7JepkrxvrU1RDs0TWP_hfj_eGuB0_6s3R5A0aZHrx6SPxW7cxV9U7FTTlalLqnVVls0ixGFpfR7e8DQUV2X_Zsbh3IjPg3PJe25skaBrmQDVNFLOJRAYqbfnJLOrzI5qEXf5kQAseSJUTe85VJ2CSvKsiPpcRVQTf5oyvV-Op84BQ2J_7ofkdBm2QWLw-nAuornOJYVYYTihAjYqrErgl9RRamVdEUX0NfSto_XNIdaVUquwUBmHPmopLFWxWgIOcpGVpIDAWI5PjAcNSxUzvTp5v37ExpPrE1SUEBtjmOH-3Ev9WLdhrkny8bpoL2FoCt6peC2ZErFOFasMro0WfAkOOYbSHWsoMlUisjyvHi8HP4YbHz_dvuoFNSdy-sGIOpTbNijcrdsBSar9JkUOxwTSruxf5O7asajzxpal0a9EfclLBP_IzcXfC7_kBSvDh7d0tpH7VvL5OIdCY3c-R0Kp0t6qXc2eOmmxw3q1hUP-hZ9PWzPpq80WneGNtXLkFfA7nlTitWJg723xqEwbpUF3_FmM4wifvwdNvNviT9i8BhamFoWRvhnYfoYH4TV72cqBeCydn0h0Im8fgv_NUeIgREo=w416-h416-s-no-gm?authuser=2",
    //6
    "https://lh3.googleusercontent.com/pw/AP1GczOt2wIe2vhu3hfgROb2Yg88r8bct3lGnTDaEI54zGQ3S32g8u2uB0efKgZvBVuywYcaoYmQfmhpC0qEKOn-9eHq85vrZUejp7D4Wmr675U3R7vhXJIV2VvAr8Bt0SDHHUbGUMJy6B5NzWsZyE62DMAKQ5ppdsTpKUqyRhSTn3sE8CupEu7EnEFBD2-nZYmvEDzRvETD1Ea8Wm0BToR-xKbkI9_ss3uxyGEsw-na4teskG3rlbEk1CTjDNiMMLCcf-yjldeHulfhRigIyhOulGZWH_nBgGvZs_f1pnDKMcHKGQMdjL72SudWNkmf_7YL9kQPyF_bRubX7d2XChlqigP-I7wVyO17kr1oIgm2KSH9rQq0yPhPOmf3ykNgmP8k4bUClfJBqcrBP4Of541qeqGfLiUuTg-RQgPgcimCbcB4WYVF200iSnC_ARUOoyEpwjM6qDk3VxIErmu4Fk7jeslMv5dpQvvK3-guygY643XJJey3Db01ZKxF16y-gMb1PbOYBhYo6qiCJU7yva2sVPEBdtqIm6q-1FDNqvDbkL5Au6WeBc_ZwBKpgf4nmqQ0PV7v5qW-0PuY6iwjluq_Crz2nhc7-Ea4Vg1rsVTY66XRmTr6P1gFF7GfZviKCVDSXAzbV2vsRCLAARH_4OpHCr7vfGo8TrPaz1u9kbRcgeNYYMcH-sKDKXJB85lXdqZE_BQR2G7ppYuiCGXi0fv2F24niIXXl52qT5qr_hOFWG5bPJaGocwiv4VFVKc_g7v0sfAdCyX14LSyAQ9TKvvgbjRc_i31L_8xqN6Q7yHiYI18QEBOsS1YH7VhFhT1D3n4o4sVMMghEAen-WznSTbN25M_mt32i9ZGrBt8BhAX9mvsGHKlPi8G4rnx4_wdCd2W6cLLzX7NtlIIOyWxclfRL0i3ru1oj3Vlxre3zXEUzKdeMNFyl4IEcinlQgPqeTANWeL1N59t4JH7LfxsFUrTvsAI-Ip7Gm4=w360-h360-s-no-gm?authuser=2",
    //7
    "https://lh3.googleusercontent.com/pw/AP1GczM53gNU2QUEYg5cbjb5oSQJc0ZVp_KuNtgEuwgPp8fWr3JLQoWkqqfAmcv6Av07GNPpQEW577zb-fSNzkXA_esbP3D2N5qJYH1QOsjyYPf6hXdEViR4wIAyg27pTTd_IGOuI30C-qLkDuofy-WueAUy1NmaIvND5rjnTCvGPdX86Cw9HcBNjtmADedLFXMGfu5YAH0wuvt3yXR-Fb0RIwVWLAQQvOjJ1HkVPB9yBKlQAFd_FMIXlFJwI6sj_9RR4Gx8XqdG-ch14_SVuX8Fd2qhA-gItyJ738SNK2REHz2-YoR6vFPmfvyEHwQEsuP8QzzpREHxlbIW9gq3qpfHPvdn92FuVQPLx2EC8QmaOyjOswNc6lNJ48Op9BJRRcBylPPlBSs4BAo2PhnlPo_9TkwplO-NBi1KGf2eT7tw5hag-7esHl8-QUzkOid33SCvCzOXS7WwGuMpNXI1809QTs6NcH0MtTAC7mLEkFPqanf-t_TtPQN2yZVY2DjKFDMqqWT0zbfQGQ0wKVzXdVV8p1AjB6t517lza3u3y4QccfZmtglp7i9K5NGHeFUK-S6se_j5PvXd-UajbaVpGv6pGEyDnb8pE_tAsd_x0-lpw8pQS4mj-FdtkJLEdQSlewYpELO_n2ifGwfr-UyqFwlS52MV7M7wVXgmBD_ZmrOe_-eEk08v64gMazVmgKziJCBslBAsXZpVjpyOcmtTUorZYZH4g_RzlAiuN1DzXUlKvhooUhbEPqX4kVFtgjiuKQufI8ZbH29IEKotJPjZ6jxkA-HjSjWOR7q-n8Bh_89oAR0hNMLWDvJtLv366vdEHprujpZeV3BsnRUQDsckdnNozE87ZyJ_Bdex5So-rRPfZeK42jOcf7dS2l9UngdxSbd5uPVU1L910pwJ4GTNNFdU8PBgkv9Y6A6YaOni8KEKN5asY3L03e2KJ9VG1eVRidkNCVMPAjYYlGBUiQzWexMi-ASdmwY4Qdk=w501-h498-s-no-gm?authuser=2",
    //8
    "https://lh3.googleusercontent.com/pw/AP1GczNL42wOqlpaDkQ6rLAcd4yFBYJw5GdYqowP3eW3RokUtbSttci_ftrWlrEV4MYj3q2ul9zFnYFpsHReyL7w5EY2edExuVJWNhujQFO466QVfML8Qv_6WF1tyynbW-wzjBmAuzShfP0MVzieKNWDNW0pabFqizknvpyTKJhfndGyrXSYRsJ4wBxcRLq8rWtnSosbbgbl82fUtvzXLPw-HVKtcAg7var-JVJxkyBHb3nyTzrYWMdnpE50IMClIrRdoGxjLqcEaiRQ9Crtsggh5dFl9nsQO_E8V9_vGPQvvvskyksTiv0UxA-6qjMtl-3NLa00L8nnwETBAKeuhcs75mUIa8rSOu9DZz_WKNkd4mMLWHOZCPPj4zOj_0hlSGzq8tPNG8Z69kRGXMXeiPtd7kXxVPH3ly9xzlXepwDuuAriwtmPymD6yrjYeXARxl7AfqtpmcsHqbwgwpLpwEOrp1gVKW6SGHsJV9MCzdLri6o8vCqcDjqMioTKF0Y5cfHuOwEC3cZGOMxQ_dBXyFXDeYJqWC_EtYr2HnNTCPMg7kHAXdc4WuvMYecjuYx2wSCBZyYxdKNzI07FcwtMuJsiKt8CDpW1H9-NrEfckGgzmQSJ-Jbz_9CcgKFPAo99LQ3mZbV9p1sb-Iz2RrZ6sIOHc2MRiS0bkBBQWBkeD1NmmJRFP03ls1OWCj87mZOqZvNzzWrByBIgqY2WnmWexJS6WgSA3At_wq_L8Qa3_kyken67wUivq5lDucUFhRdntFJoyob-Md6Ozd5BsUta8wCeWKOyvV3T_rM-8O0Lk8j_WCoOOrl6ZDZq9_GLfGQsgyCCRCRIGNoLZ7mx0zzEZsTxdv7q_N8I9yk4p6O8PLqx-opP6Ba9pqoYO_KXjs7uLQobnCXEcHB8cJiekSk7a75THOTDmDfxW0ZfTaeXlI866hTbvkRhVEVoh1lwk4a52LCEsCrAH4Z2gbionBRXV3EluT_X_eqLGvQ=w337-h225-no?authuser=2",
    //1
    "https://lh3.googleusercontent.com/pw/AP1GczNUkg2pYB4PGDrYzwZKjmRF-MtKOVh-9Dw-A-P0v2ScxODlVldj2_LO8K1_kac7i9G01GnDyIVo9kX0z3YYNZyJTWfgGzwdussABlKHJrfwyWPokWxI7yC7dR3wYkSXjV9vGqLjyF5aL0CKnYO2fLm3NW8aYe6OzhbqdKK4Q_ZRqc5NK59CxRQEQjQQiBh-Mm_isv4830K7-h7E7MwUg9Hj93Ilk458iOQab9cTj-ZUkGJQpIEI4FvvWZC0asuH7ayuPkdMG8PnTjLK5FnobxYm9XQrYLZ_GBSQUYaAsyvAXDpSRFuSkPy2fQKuaa7V1tEBjRlr2qlzciUkRpWej8b2Lfu6pbkjAm1vOXGZnk4kL1QNMgGEcj3kX1psB82kKYN9_lbSrj3loqjdiirTve964U0aQfUYIIgELE6TbgAfHu0jgT9a06jTQxvR5VVzjFJB8KJU0j1hyzI58P31FmYIsxTP87ptALq10YStzfFxt5WxoFjIl2rNZEKZWx2tQl9lRWZVPI18enST4Ophhd-qoKWH3Nc4kFlWtyNz90JI_upyOwXFQEmpNhayzgP5KvSgQbg4G1VPplOb_1w-rv78AJ6q3PJRZpJJNUZg6u00_mtdiIbbty_cvRQgxLtzzjJkSbMP6PmY9sZMnCG91Ro3H9B-1mVAkv-MQWroWF1PlfsEI-rmH8ekdB54NLHR3fFMYo8_Ru8SpOlt0k_Czs9tCr90WsiIGQ5UmCoOYSmdB8BYxZnGXLb9_78yH74xT6Yd_teFe_zkG2dPPChEfcoUifOEIqRQIN8SY-dKtm0BWgsBdGQSBV3aTeMutfDq5Wuq90krqHj6f8J3Mfa1PhVTQQhl8kEBzPGXiW-eZldsCh7oLPOy83CUuIVDAbSkrqu4oxDEdqTVlGacBO3klGsopTi1Hjh8Z7xuqaXJJYtzpcnCm1AaNYsMhXkX3lTxTL50hljB8fRN2NQ-5ptQxH4QHD5txKM=w500-h375-s-no-gm?authuser=2",
    //2
    "https://lh3.googleusercontent.com/pw/AP1GczM66ob5pYc5FSBDTNG8KjDRieuafslyQ6ZICcuiqicU5BSP6WYPFDojKQUTypFmGLilBdZKqAO7sRdcyiqKePEu6-H-DAXNYkRKsfheLw2fviT9IHM35MbhCEGE_9atEPa_z5fnZXpBEIPSXKyHuckpuTyIyHieGlL-h6QLRyaKlWZ_q9tl_hK_--oqCbz3pJrPbE4Ra9IOqy-GHfm5_Zj4tcWYm1u6npD57EeY7j5HukajcPhf4IU-Oi1dOcKuVtL17qj7trt_UUPD8kP0KwAJkVJ_1AE7YrcUUbWquyR82jDwortQQvT33fuwKTk62lzu-nKvIwqcwJzflv8KpQqMGaoBiF6hHc2zx9CtyZp-33vcwqbaI9se-UE7qXU7Amre063OyQd8lSmWM021KhbRNLYoQ35nndh_MdeEnUjJ2X0PZQXBiNwoC-sRP6x2BfT8_O3WW8vm6ImCNAS69Rd0G3agAj5Ql9WswE-ksgnXZkvWBtTorLErgEjL9_3GCeHib9JPr7UbjQhz2uT-K5Odt6hRBt9DTHLu0xXnJWzb838jBgtBTR1-3IjyOf9GOZNuCKx3OK_UXf3uOvdrSW6QZ1FNuOSZwF-d741BL9O-JHknh3_z-QcyqE601R43kwJhiHUWwa28lqL5xDagfodRQWhJqbK0xnYAP88CGkwc43PZsfiunbNe8ow4_5EOV20BqibFJ_Y4fEzJG85dT1cEi8jc8tzF1Qc3V7Hl0APwuyiE-K8s5wAXbzGFIDBk7M8xFuGknYO1QigyM8cw3fLWGy2mDq_RabvuR3KvdsqXlOd7gA6CoaFAktR9ACB2t0vqnhrXUiSP6NJ-mQbhiqXId51jf4Tpn3Svuo5ndQFyNVXoLew_RyImUxioAGP9HEd82nrqJERnu4WHmrJGvu8b9YGPtucpFziEamuMHP3ZJUiw4Ry2FzzKjc_AafZwLQ2DgQGAZIKV8FnYlwjsIiT-nJy6xx4=w462-h304-s-no-gm?authuser=2",
    //3
    "https://lh3.googleusercontent.com/pw/AP1GczMQSU5U7DntoOF-Xj6k6FkoMajs_5uOumKiFoKftZUTtw-Cy-SK8Ak64aHcI3leqj48ACSkdb2PlIpVlw7yqWh2TsljOGH0sg7tnrRCmVTembHbAZkd0QC9QjgPW8_CDud5_KHdudAlYXr7eMAMXRKHWlBD9mwPD_Z-3NMRXOW3zkY6O7fXeQKV8WQE68Y1M2_kmGOputO0xM6VmLVTMMgYW-wtqyTDgfAT8_nhV_T3mJbf48N4lLLn-U36Y_6cnHcTTkvflRJsDEnbAMgMQaTTK53CdD6JnSPaH13jOY9594Me9IRuJ3jE39rXliJnTdHuRNmubbQJFZiBRGSbW6UuXLTy1p78FpIKGioqL83uy-g2Yu4rw2Fw4BtuzgPNWK5pv56zN3opbsVMj7qngLc9d2RMUs1lm2zBPPXq6GvJQ7T-EqKFueWrBw1LEWyGAfQKef25t-Xe1fa9nKv6cKKCtuYSGgvC6ZJ9PBLpUjh_GCGI5wOlBZjgnUVHX_k_HzLgNIggfaRFWT2BMSJ8dMngK9qXq9vv9Ril3lZWK20FhGpImbF8m4WNNxRl3y6Fq0bDA8GVdivRBgv_mFj2uUmY6v3XVwSIXIxdncEEdPxN9ndqACma2G-c2ky2wu0ua67VA_YAr1-b0pSuV-v9Ki5avbxbZsNtkY5CItnjk2_PsloBOdrjNArg8DSf02GZ3WT8UXIa8LMYtASQgv7PGqJq6HEKb0KbrUgA9rXhjq5w1LBq9tI5NIFX3qL6lKUEcVPnzjyxwuiVegxxz410ELahDl4OXucwRkBF4MeWRCjQB87hv4ktXXcq4oWlo1aQDFUCkpZlF2MUTTrlRY9_BFEwtS8GjnQbnfz01WgI9nnRToDr6d6YR7u89qysDvy3boUL0k7IlVT8bS20TBsQLrb9pGQ8MZhJ6SOkqfvCKeCmp1xEllPAoa0dlRq2Lddvu7NZU6L3DXUq0oxLmrVgwqbTVvW_3J0=w500-h500-s-no-gm?authuser=2",
    //4
    "https://lh3.googleusercontent.com/pw/AP1GczO3h3Lb_53qzqQchjvx56dOazlLbBi58GnthpInilgG7Q4UTI2TC3nnl461y3nerVIgcWmW6yNyZFsRDB7FGSKHg3PiiRIqtEA8Gb_eafmIX_zGX5ElrZWkpyZelvEo1i19e5ZzeVLjVxpYF28fUpe04jR_bzP1Y7q1BhKoUqx9DLY_D13NSR2uu_CCQTI2tXSFqfCpwADxaM3lE38gbbFTm9iIfBqoOiHfqKWI4DywZHi9O4mCHvekaP-kHip37Y2d0qT-DtwsSOeXoWSrqFpgr3tH1fWWiIvAeCI6oUYcSrgzkiQMNFhxSYZGIHz21hqPbQKgSHh9DXdpMdDmhQeg9GXPGhUi_62VipX9T_vDwAtQa02NscfBOlM-Lnubaf1VTy10SRD61KrPypboGqgcOAAat2Zl5lr6HP23shuV5Cxm4LxWJByqnLJEcJyVAhPgf-4-dJxKz-w-DpR5LmYtqsI8iovSAU-2QmlEqboMebiwVlpKfGZtZ2TilQHMVuaT35toQl2_Caz8N9oPT_WCCOLjQnNjkWVJba6jyx_ACT9RxhihG8DnswPffdXieUJEGx1yvCL686N7KI9B2MBHqFg99B8aPpwrLWRegPfIhlhowOGgGU6ZwFUKpI0KnkTItI1loDubziq8toMyNIB5njpZfYFtpsGtzWAULacNRJ8mW1QeCfHsLvQkspFkGtSgHPSniej2cADSdxqMS2Y4ubzE76fYbXfE-lzeR3xCBf3PE0CRL3vVgnA1wKA1FTE-wlXoqAPBH5B46iot94EUwJ_aDjplvHVrfjCdeK8JrovrhmImBsSFbtiXR3CwhuqqqYoxOwut1BKhmEFSUgOyGnp136VuKlCQxdZdbXSPQ8DjJoptf368Xv5RgKdrVOnT6KvLANj4IDRGEhFwIEIZGk07hNqrj6kzTpcQXNOAxXfm9WgfyOp6G52TpDUNvUMHP4vrglE33dFgi6kef73yyKPdokE=w375-h666-s-no-gm?authuser=2",
    //5
    "https://lh3.googleusercontent.com/pw/AP1GczNC4JA8NSA8ZivgtwaOzR5M9dM5q_Uo8nm6hPTS3dMcbeBJoHn5vZeP16yUE5sPtWH1l1O0SF-sNof3aJb-VkP3_Xw5HgivPZwyGxRKbrqQgRnLMta4-dkuyyLst0ZEzp6EcaQ7Dl8HyfjJokNYQmhIF-ju8cmR1iy-hrnSXBYTqWgYu0tOjYmQ1e6Ooy34g57Ze3Ndh5DUpVQuMsSDpqIStuBuR5hnFVGS0Z6oaSxJNzPWzHLkf8CaDxSzjdCBfON19AD0UOLkRYcO40GDD-j4HzEpwlO33OQDaAXkVphxsZ6ma4AAJevWj9gPMCwAewwHWhOl9o8Vr1Gyobq3AK1N0Ux-HgiAo3kkfJigL40z1Vy9rBAS-6oh7p2zbm-3eYRf7JepkrxvrU1RDs0TWP_hfj_eGuB0_6s3R5A0aZHrx6SPxW7cxV9U7FTTlalLqnVVls0ixGFpfR7e8DQUV2X_Zsbh3IjPg3PJe25skaBrmQDVNFLOJRAYqbfnJLOrzI5qEXf5kQAseSJUTe85VJ2CSvKsiPpcRVQTf5oyvV-Op84BQ2J_7ofkdBm2QWLw-nAuornOJYVYYTihAjYqrErgl9RRamVdEUX0NfSto_XNIdaVUquwUBmHPmopLFWxWgIOcpGVpIDAWI5PjAcNSxUzvTp5v37ExpPrE1SUEBtjmOH-3Ev9WLdhrkny8bpoL2FoCt6peC2ZErFOFasMro0WfAkOOYbSHWsoMlUisjyvHi8HP4YbHz_dvuoFNSdy-sGIOpTbNijcrdsBSar9JkUOxwTSruxf5O7asajzxpal0a9EfclLBP_IzcXfC7_kBSvDh7d0tpH7VvL5OIdCY3c-R0Kp0t6qXc2eOmmxw3q1hUP-hZ9PWzPpq80WneGNtXLkFfA7nlTitWJg723xqEwbpUF3_FmM4wifvwdNvNviT9i8BhamFoWRvhnYfoYH4TV72cqBeCydn0h0Im8fgv_NUeIgREo=w416-h416-s-no-gm?authuser=2",
    //6
    "https://lh3.googleusercontent.com/pw/AP1GczOt2wIe2vhu3hfgROb2Yg88r8bct3lGnTDaEI54zGQ3S32g8u2uB0efKgZvBVuywYcaoYmQfmhpC0qEKOn-9eHq85vrZUejp7D4Wmr675U3R7vhXJIV2VvAr8Bt0SDHHUbGUMJy6B5NzWsZyE62DMAKQ5ppdsTpKUqyRhSTn3sE8CupEu7EnEFBD2-nZYmvEDzRvETD1Ea8Wm0BToR-xKbkI9_ss3uxyGEsw-na4teskG3rlbEk1CTjDNiMMLCcf-yjldeHulfhRigIyhOulGZWH_nBgGvZs_f1pnDKMcHKGQMdjL72SudWNkmf_7YL9kQPyF_bRubX7d2XChlqigP-I7wVyO17kr1oIgm2KSH9rQq0yPhPOmf3ykNgmP8k4bUClfJBqcrBP4Of541qeqGfLiUuTg-RQgPgcimCbcB4WYVF200iSnC_ARUOoyEpwjM6qDk3VxIErmu4Fk7jeslMv5dpQvvK3-guygY643XJJey3Db01ZKxF16y-gMb1PbOYBhYo6qiCJU7yva2sVPEBdtqIm6q-1FDNqvDbkL5Au6WeBc_ZwBKpgf4nmqQ0PV7v5qW-0PuY6iwjluq_Crz2nhc7-Ea4Vg1rsVTY66XRmTr6P1gFF7GfZviKCVDSXAzbV2vsRCLAARH_4OpHCr7vfGo8TrPaz1u9kbRcgeNYYMcH-sKDKXJB85lXdqZE_BQR2G7ppYuiCGXi0fv2F24niIXXl52qT5qr_hOFWG5bPJaGocwiv4VFVKc_g7v0sfAdCyX14LSyAQ9TKvvgbjRc_i31L_8xqN6Q7yHiYI18QEBOsS1YH7VhFhT1D3n4o4sVMMghEAen-WznSTbN25M_mt32i9ZGrBt8BhAX9mvsGHKlPi8G4rnx4_wdCd2W6cLLzX7NtlIIOyWxclfRL0i3ru1oj3Vlxre3zXEUzKdeMNFyl4IEcinlQgPqeTANWeL1N59t4JH7LfxsFUrTvsAI-Ip7Gm4=w360-h360-s-no-gm?authuser=2",
    //7
    "https://lh3.googleusercontent.com/pw/AP1GczM53gNU2QUEYg5cbjb5oSQJc0ZVp_KuNtgEuwgPp8fWr3JLQoWkqqfAmcv6Av07GNPpQEW577zb-fSNzkXA_esbP3D2N5qJYH1QOsjyYPf6hXdEViR4wIAyg27pTTd_IGOuI30C-qLkDuofy-WueAUy1NmaIvND5rjnTCvGPdX86Cw9HcBNjtmADedLFXMGfu5YAH0wuvt3yXR-Fb0RIwVWLAQQvOjJ1HkVPB9yBKlQAFd_FMIXlFJwI6sj_9RR4Gx8XqdG-ch14_SVuX8Fd2qhA-gItyJ738SNK2REHz2-YoR6vFPmfvyEHwQEsuP8QzzpREHxlbIW9gq3qpfHPvdn92FuVQPLx2EC8QmaOyjOswNc6lNJ48Op9BJRRcBylPPlBSs4BAo2PhnlPo_9TkwplO-NBi1KGf2eT7tw5hag-7esHl8-QUzkOid33SCvCzOXS7WwGuMpNXI1809QTs6NcH0MtTAC7mLEkFPqanf-t_TtPQN2yZVY2DjKFDMqqWT0zbfQGQ0wKVzXdVV8p1AjB6t517lza3u3y4QccfZmtglp7i9K5NGHeFUK-S6se_j5PvXd-UajbaVpGv6pGEyDnb8pE_tAsd_x0-lpw8pQS4mj-FdtkJLEdQSlewYpELO_n2ifGwfr-UyqFwlS52MV7M7wVXgmBD_ZmrOe_-eEk08v64gMazVmgKziJCBslBAsXZpVjpyOcmtTUorZYZH4g_RzlAiuN1DzXUlKvhooUhbEPqX4kVFtgjiuKQufI8ZbH29IEKotJPjZ6jxkA-HjSjWOR7q-n8Bh_89oAR0hNMLWDvJtLv366vdEHprujpZeV3BsnRUQDsckdnNozE87ZyJ_Bdex5So-rRPfZeK42jOcf7dS2l9UngdxSbd5uPVU1L910pwJ4GTNNFdU8PBgkv9Y6A6YaOni8KEKN5asY3L03e2KJ9VG1eVRidkNCVMPAjYYlGBUiQzWexMi-ASdmwY4Qdk=w501-h498-s-no-gm?authuser=2",
    //8
    "https://lh3.googleusercontent.com/pw/AP1GczNL42wOqlpaDkQ6rLAcd4yFBYJw5GdYqowP3eW3RokUtbSttci_ftrWlrEV4MYj3q2ul9zFnYFpsHReyL7w5EY2edExuVJWNhujQFO466QVfML8Qv_6WF1tyynbW-wzjBmAuzShfP0MVzieKNWDNW0pabFqizknvpyTKJhfndGyrXSYRsJ4wBxcRLq8rWtnSosbbgbl82fUtvzXLPw-HVKtcAg7var-JVJxkyBHb3nyTzrYWMdnpE50IMClIrRdoGxjLqcEaiRQ9Crtsggh5dFl9nsQO_E8V9_vGPQvvvskyksTiv0UxA-6qjMtl-3NLa00L8nnwETBAKeuhcs75mUIa8rSOu9DZz_WKNkd4mMLWHOZCPPj4zOj_0hlSGzq8tPNG8Z69kRGXMXeiPtd7kXxVPH3ly9xzlXepwDuuAriwtmPymD6yrjYeXARxl7AfqtpmcsHqbwgwpLpwEOrp1gVKW6SGHsJV9MCzdLri6o8vCqcDjqMioTKF0Y5cfHuOwEC3cZGOMxQ_dBXyFXDeYJqWC_EtYr2HnNTCPMg7kHAXdc4WuvMYecjuYx2wSCBZyYxdKNzI07FcwtMuJsiKt8CDpW1H9-NrEfckGgzmQSJ-Jbz_9CcgKFPAo99LQ3mZbV9p1sb-Iz2RrZ6sIOHc2MRiS0bkBBQWBkeD1NmmJRFP03ls1OWCj87mZOqZvNzzWrByBIgqY2WnmWexJS6WgSA3At_wq_L8Qa3_kyken67wUivq5lDucUFhRdntFJoyob-Md6Ozd5BsUta8wCeWKOyvV3T_rM-8O0Lk8j_WCoOOrl6ZDZq9_GLfGQsgyCCRCRIGNoLZ7mx0zzEZsTxdv7q_N8I9yk4p6O8PLqx-opP6Ba9pqoYO_KXjs7uLQobnCXEcHB8cJiekSk7a75THOTDmDfxW0ZfTaeXlI866hTbvkRhVEVoh1lwk4a52LCEsCrAH4Z2gbionBRXV3EluT_X_eqLGvQ=w337-h225-no?authuser=2", ];
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
