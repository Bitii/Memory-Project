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
    timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function stopTimer() {
    clearInterval(timerInterval);
}

function flipCard({target: clickedCard}) {
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
    "https://lh3.googleusercontent.com/pw/AP1GczN_DGBrqkA4P_8V_6DrNOnIqR_ENUiPAqCRvyGyHCBuKdeNhvGk9dO7xXR5XyaYBQcxfeZ6_y-5ClW8fNCODN_TuxGeXz7tptrcmZ_vRr7lpLtXHSx-Lx62CnZSZW_4zUdRMxohl7uZgXySecgajagzNAAMm_ei3sNnXBOCVzWbSzgBaFy4IiHR3F70QkOEQ8EGcrkHLIdpd-pIx6I93-F8hX45mpO1W5dcHj_op6NM0kf3pgaCJlsppinQesHHaeVq2KEbQnzkOwEY63aJCIajoL85ATp6wcsshN1hg-XEZ9KVbnPBdwlYCxkoWG6rrYCIiRQHlmA2f0JAWPKwdycfzYa5-VgIfDR6ZVVC9OhyLRIAUVTRtnxifS12qq2p4sU5-tpAL5cEMLEL-9F6yF7vzDFGO7_LXllnG4BHVRtKvGoSbvNbmSzjRG1gbBDSq_y5HoxtNzBDT8m8wjwadmvE_wTO0O3b7Vz9zs6XYhiPJMG3pgQnl-Uxm5XPHEM7nFHqkg_HN7L9WZmKnHdYvjcr9TRA2vH88z6tjJG1VMevKSHVCaGZqdX-wr7mZSuIghMl27rDa5o9O-1gPDqjEP-_1n8aIcqgoDGC7g43B1sN11HqTW6csRBdqqbAZHHn0LiICHFKAOGh2-k5PzmioBZmdjcsvvdptKfu_c0AMlYCCFNOR9ACjVC-YM_gZjcjZZRnCku3pNMRc9Z8vi8Rk1rbY2k-3H-aCV7THFWSGzZ0BrW928jPlYSUWA34uJWHtCqc8768ZE1CibHfvzcYe6tqzKDtSVJEd8YBMrOVeCj1oHBUFu2ZhZ36DjZXF8floIn8LEV4Ep4asZfOArK_lNUZCStwh49lho9zq7J4sZ8E2F8XIRDp6Lh4UVfX8PAM8Tc2uF-xuwGiRYVxVRXla4GmAGpQTTneMr0CWxImCsYAa2J8d7-yMWQSwYPp=w563-h375-s-no-gm?authuser=1",
    //2
    "https://lh3.googleusercontent.com/pw/AP1GczO_GoiPJ3-rPj0AMtmfyx-hkBSdlq0aY1BvFWxnIAir7d1I8rTbx4DOYoqWNGRcduYmegwK31kFnsxqLWZD_wHQJT8xmT4Izr62nzrmda8aoZMPaiFIs2hdJDp-cyGN5TphvNTHOxHa0599tLSVG2-dpRuj_riucygVCij-DRwSzXu3I1zQmJ6l3jQXbg9J4PYIpR8wFIEkIxIq80etMoA-a59kxZ0ztxU8hAxMZep8qqBR7H_FeiRhn5JXBFViNqis_yBFMy-9vDn08iEqCe8pmVAX8oAlyUPTs4q55-VcNyTA6ZC-yM09KuZlUSzpVeUewiUW4IJxVserQ8wNKqp0m8GhksDH1Q6PI29L-PvjHtKprHPvIhjmOySPcagwBp1tAo6cChf08a-Eq0c6uJYRIh1AGL01UzEVRnV0NEb_cdTmYU_RghzOmyN3CVEMrvXHbLtEi1HmznIOHj2MhN7jx6VjoJxkBeXpG3t5uHs0OsnqpyZU73TMvQPRd4XnNpI9VYjdl5FExMcFLMKMFfPuMyUNuTo4J8LivYkZScdOG5naoAK8h9-ydlXVsAqfvAJLUjjkiFz8GllNt-CZIsK-WaSvxlZq89tJ6zVd8R4iARXm5ySvHTVXjHKstzWmOEckZcrjMF0t0ddtLibW51Txgao_-AvQidJurZA2sfVvpnGadRj4VDXAUkrfWcih2DS_yMOqrm-KgQo-7c1bb_3inSjZjIeGrhntQJMu_Rb2kMEuhvLBjxOqXuAu-oAH23FyNIjiHPwCYIQgTbuhTVAgLpdA0JdSl3PS5Mos5zUoueGMkyKo5QyKONZYg-K2ZcetZhPLQZiP4XTDcU7mjLKclbtmhQcsKv8rI6dVkD4hWobSPEj-kmxtDfQQ84bYHo0Lqg3ZmcYv9fWM1ybBYDCbQwTSlYyOIaPEuLeRngJQalJX5g7srtO_HV_1=w500-h500-s-no-gm?authuser=1",
    //3
    "https://lh3.googleusercontent.com/pw/AP1GczMnJaYWrME16cjxbBJ8ef5GLwv2tWzrrKZYxfieN0BS-KIaJ8ebMYnaxa9h-lpKayyUp4lMXWrZTxk8msX7eOB02BKLe0BI9vhHGrdgk7PtUHQRcVf3QGGpMJEVw_C0GJhTJo7kaP_UH1E1Ft_w6EtJmz7N0QiEdUfmoJUrCZft1DsCP01QBC67CItKEfJJVR1M16pru3VsSdvvBuKZgk6QD7QSEKEG3deSIkF3ReLyo_8BhkfEHAxY5u2CLbZkio01MbXpdBrvQ6whYTEosywIBfLXCoW9P0hOwxwzDHDsw2-j87uNwxuP_NuiaIzGZ3OsTZRTjYjBJXBRw1XUkDDbW_nFnRdGPwUTqv1bKLtI_sPC-bv-72o_vNjmW_H0AvWkqcHrNuUfrWQ5TOX5enOxcLPM-enUpQUhFXZFeFIrn3SpicUnOqjLF11C4QQ9IYTRS8xVg-oV3woh0Va4YXWbkF-59_2CBVBEGDwLh9ETUB1BkoomvWITqf6h5UdSPhfpWA0BNIyE-Ohvy716BgJ4t2JeyK5mbam5U3scVxEr_JjUSFr6hpMlV8j3vIqDSLg7Ikk_Zwr_Qm-eZDvhMiRrd185rnp_j0qVK0RojPhZIJphMWUjnY_9RCsMTCtag6hQjQboGSP14RlMG-HVd3dxOOeHmdGPYaRl7VbQIY1-0V9ycVlgir-CRrJ9zgrBsaOWnhu6DEU2HlHRcM4_h3-aH8_FpbLgV4IBMM_f7lA1oM4BJfAFp7YkyUoiSbrjvG-AwOSR-U6ApdYG1vzH5uBLed2ukl7t_xjKGEuvEU341UA8tN0SdcnqOfP0HcUi1yXWEQcIm-3zZMHQpfunNyVH4yiNNW7rXCUkucgHKHmBB4OBX-GJAdKSWFx13kQldn6UZVScuZ28Pam9erASyeJWaobOmkvlZDqpdLYMKI5awo6xT0-ALiF2IUAV=w500-h500-s-no-gm?authuser=1",
    //4
    "https://lh3.googleusercontent.com/pw/AP1GczMetvLy3_nD1VsG9fZX2035EADmXNPAYOb9yG0XOQ4P3xd4KUzGGPlhMvWrg7GLlA9F0RYEdFn3MsAf8lfwUrOHlF0vuNWQgRWaV85Ma3M1KZqxgO6jgB8xLki9aBHQuAcE8LEVwFG-ToyWyi5_5yNlI8w92OmNm3lkKNydm9So3aSq5UzXvgKZVjb8J7YJUzaqoTRn3VWVVh3yDPz1TJEGI90Vnyr7HpVZlXBZ4XBBopgsg1xLtSfiGTw7V8xrbrAWJSL8GdpanuzHRyOO2mx84h_sUH4TIf1Yf7jDm3G8WCI0FDZjj0cFzwn6d7izSgybJwE1KgkmRuZqQm8yfm2xl6pf-5e84p5NE_m1VeKoxo0ziFkKRtTlMsN7Emrv6i0ni3whqOm1soOpEbYKox0EQ2RBDh_Eisfrq7Y-JBRgXqy2V43PAz5AqKlARclMnt3NqjKXpDtj-TgU50xqy0tm2I8BybXePJ5Y-e7yBlQhpaFcSjIiRyaR9zCRmHn8jQJ7i1TIp3sflTiHTN345uXXZEfOGHOd-SKu1L2YKeQTV2QRcz_AAPzcvkdqTNLA5qwkKmU8Ab1SdZ_M2xS7pFhUHRIvMB4eP8R8JPteX6rel0kWDox6TFd28ZxHsMRgDxY4BZLrtzF1UFTGqzqXCU03L-PBx-diDA6RURV1ysLo9R4xhdJHCmrwiw5rkJDbuiaRvdPc3-HbLbJjOIZ57aQQmecSz3EZ7zxYqryL_qoyfHKXb9yGIPRd3w9dTZWAh2jql6kI6v7TA8-Se-HZavDqS2gU4rQTSiEZihZfBkN3QTA_8WZpOy83C3dEuxK9lwdXVfZK5UGV58XVXnkWAjj4gH-o_5kNAyN4ir4UNEJjHAv3iuE5WSEMPdK23FmQkFnqCXX-j6asMp02ww1fv__EKEXoGr1ELEmrH45RuuS8Q1T1G0kCocGrNb9S=w385-h358-s-no-gm?authuser=1",
    //5
    "https://lh3.googleusercontent.com/pw/AP1GczMIGDkdkToCHMD8OAm-KgwFYumyj55vFKDvNY-BE00iRKT_nvm74jWbN9SPS8WiLRTVEM3559_dRzeDjfruc6F4pcpACG0levO8q38rLPDxidQedzJKwTPoU7E0LTErjNi01GiERhuN0DjGdjL7tnGRHvRwCZefj3zD245zWSAFcJ9_RxYwyqUr1GO6QTx90MX8l5_ENDWigtZ_k3FcahQ065u10gmNnGUkPew6duMmShmKPXMok9PtnUnDv6l2sv7g1aKxnERMQZBFlQ0I7h0zSHD3jfxsgqzJCq5r4MUZ376ETkSj3_Lk1gOSPad0ROYF2iDNn8DbXop_eUibO3awQeshHGmL7tWO2c3QW6c_8J0xrey-mjqGtvLMmuHc1mF9Wl-pSj1EwWbb0uBwge0c9jpMZcgXCYlYfHEOV-ZYiEOtiIlELxNzgU96cXGN_4fZjgMbqDxg14wTKAxJYdPywsiOMRMWkPCpWCEbAXOmjsYP5kTb8PUuVT-NRMEjor6xyi6Wks3pISneAv6jO6rYgymmaGQ8TbU9VuCZP4ca5gZluwaMdaP3YZgMu32NqgDu_lJbNfHbjn6Ahh0r0D3LmLGUDmkdVwlmpqIKj83tGt29Zozktgm7lQanwcPmS3c4go3GGU2IdSpvPbvDQ5B1EfOw0ENsajWWRuBHNvRXDnFb9PxlcjPJh_SIQ1FnUNv_wTha4pg0LVTd2uX6lkIiHhLh_ShWhrg6bi92TwwQnDydPuHC2UGCk1sykkhyi-3NUJ33J21qww_y5zO5_cEnCGHdPCHoDNyySPsuJSj3bNvQ72epNL1k8agVGe9_zTKAWaRDspk-jNEFZ7wt5OTlv4f_eO7b-kt1RpGpSoQq5qNGeZY3iN3WUhkSODzCZ2yl_Q4jRDfRijFu5-s1VUHONzmuZW05jzMBAto85eg2Xkf9Ci50hsjnG7uo=w408-h612-s-no-gm?authuser=1",
    //6
    "https://lh3.googleusercontent.com/pw/AP1GczM4fVKZC1KM9z4kZm8xY4puX080291uN0nWdg0Vs-_jJCyOiGsb29zUyvAmzywzXsdHZijuFHtFt3TkA0HJrr273BBgF2GPutI3ssv9UExO7ABJOiVN12sS4TNUWTYDhRzDZSYqwBKOSuJhrgVC_rx-I95IF-6w5QT9RjyGvQ4iHJBufu1QRfMO4mDSDVJVGusqjGtedfcdiBNZrMNnfFBBTJMQ3_iy1f3YLHWq9dVyW9vyIwzoGKA7YlV_jId_lII9kT8JcajRHbQ_ta0aQ913LBTJkH0ty7q6KLytg9qThMp7ZUhadjBbMoYW1uKOSw1BQAp_btvV2KDkXaC9hBEjy-_fgJRkFlXFUB3ODksSP5OmkxQQubA7kfGQnj6EXLZzbE8hoQwOMzBcDtz6piTIy0BqhB5f-G8kyflSAtH1T4mQ-kiJcNRquDYlZNgVIItwon4cHoV3zayzBEGNC7oD2Mo8g_vekn6G71Qc8BHykcMHYxN7eYUNlfffwYi4m3gNQTkmkP0uVaWdD1SD10K0vEt_0Yembjd7F1zXmOFogWkdbDohILTibofUqc_KA3eRCsUT7-Ehm0I09E9ja4CFWqQxgkaWcxTCAYNUDmnWY_RhH65wu5_F4NTZUyK5TBF3tkjQUX9N3B98o1JhShIS-CXaiHkMfHZLcfqR69QrtZjKJHFPHL6rnmNTb15l4nlUqxhWm0SM9fSKmp4Q-Elmo8tYpnIccP4RBmJbsJvtUVSeUlWFArPTXo-hcqEFz4lyGf8dopFrmoaOB3waNY520RWbG20oHSND2akLtegJNi6ChLd6CXxsnwhDRdj8I7yGb4qDpKmGLEJmXqpyj5puA2OQXHN4pIukj1pvELvN7Sv7Wtl-4EjrnnCijNEHDonToPdG1jRzAlHPK1TLV8DJoy73USgv5DPB_BWL6dC65T8iQN6Xb1Cp-EgB=w464-h538-s-no-gm?authuser=1",
    //7
    "https://lh3.googleusercontent.com/pw/AP1GczM8IYj7Y7Ma6TiiJpupYlZ2HCs8SK5H69fjiQ9Lg2jHK4gfyUApr2Zh-35tnnyhYVotLXHsui-7EMm0ysxcAhTGmr1AfrabxHVVDDR61K-3F3lKRyLEHvv058YAqxMkpJLRIDEpM3v4C9TJS7z3PtaUmBzNcMw5DryAfvgq-QbFw0zA4rI6qfBdodaJCqMtGWw582M1a9_rKVu83iMm1q4NjhbI74O5Q4vAUgjut_p8-0E2koU1AsO3t246uajVYfup9s7gjk-NMGVfsY1cISZ_GoF3HxvWEUedA83aFRQGxkPlo5s-vZziNBAp_1okKgUesZi56WVGn0Ugjo0ZevvNka_HUN25A1nnk17TgzklPDyu8E9QD_u1KM-6gAi3YQVfbMqDhUqbwHo5UiCgC_eO-3axh5lLcZ_LTGlOS5hDB1EPp-9v0n9_H5oxbZ8cH06haYs1qR_oI8KlVHImXUAom14YmXi4IpVeS8GduxrDqv5jhwv-MvOcPvOelx4O14swJJPejAmnc5CYQaRERFumtMdaf0R9YEfEzAcJtjpcabsTrfVQKB8mRJJr_6NXEQuLegKf14gQVVJWHE0QgwAwYsHg2R1I9ajBHF8hGceXdT7bHbyLN6yn6k5JAgGN1qHK_8aZfag9IVIs2aspDeaLXnXXz0kb4px8o4pxNOhAu-F4g6So8oPAzS8DC3Wr0dm81IPISLlrbwc40j5afAgyttbtPDWyMZQr83SWJBtOXIn-hfTJzjOZ779PaPLywoPJbP4__EOo1lB0eqf8IlRZvLmkfCdmVZqGa1FP6OzREs4qIAG6EtAlorlEr2u9h53L-bdLR1NPEa-2uo6q1M4c4Bg66wwPzcMcmGMn7NiLBgGcuXtPiy5qc2729S9OENCYS3zN6g_TdidSxsfoQRMBhTMLpUSCA2eT_wH8_TE_HvLeEV0dCar-GwrB=w433-h577-s-no-gm?authuser=1",
    //8
      "https://lh3.googleusercontent.com/pw/AP1GczOWt4QvXdeP06vfgqciRAnfNPEyqY1GlPtaXEncLf6G4Dn8Aq8MAdw5PEMfH1dDdPEOg7FQQ8nxQIZtXPnhn3r5vyGp6AQFkiY0KDj8NyfPdBScCyAc0Cj73BO7d4ddBKzW7Xl3-FUZ7UbfhDjoyHETd0dvANnE9GMAPLzLIT0SoLszHcJlRr7c8RNl3EHJ7OMHUsO_BZlKYP2z8epoe1XpHyyZ_Q3ZlJ6m3farKnD24pBpJxRInXo0vodb5lfALATovk0Sj7BXWLmV9hUDUd3ZfmHmH-o_RujwQ7TMSJIRI8Rr1f2vcySTB5W4kTX2AxVHP04Fy0HHvBwQu9bOMkv3D8EPG0N2xivAgPBpeVLq8E7ryZD3krYvAo7U0jjjnwQKVUVxhq-BvqrQGcGLVd--MNC-9VltomJz5oG8oG2mdvRyMxzm664zzr6RGQMONXXBxkqOGZ9DdU8KbCAcmOfvkGX-n7mqcGfyGRjpNyqNaZrYDikUcmW6bCMtbw-VJNaRtzQRhqb_PjOLvtsKOeW3kPN3RaGxrLQOLuhv-uLuxtndU0E_vg3OCWelv_0uxqpQ3D9bzsaWHYFqkTb2qCW8KRFQi5mqePzXlUtx8GIabaLAUShu84G2cXYXgtKWrQt5TjtRKUprPwlxYKBt-k2HWgx_zNYvaUhnHpAu0zK8CpM7I6MPsMEHA15ogFRea6xW4mnZtk4yZyztd9Pct4fhEUSK9kyepAgUWG4TzFJlShk8x3W8VHZTNP1nAy0lpWfE1325jkyoAMKOdhXomJKL8aSp2dItCK7YXmkmDBmvI6EgZtDnmcttqMzU3rPiG87slmHrPjHwdBYsvzwuCc4uUlaOMlMtoB4_ENjqdDJF3XfSmCFMAKBiJYz7hFvkPdshroUGy1OvUY6D1juHw0XLjRN9DS_OfDuZosx5miU4N7ah12rXc5WP-PJx=w432-h577-s-no-gm?authuser=1",

      //1
    "https://lh3.googleusercontent.com/pw/AP1GczN_DGBrqkA4P_8V_6DrNOnIqR_ENUiPAqCRvyGyHCBuKdeNhvGk9dO7xXR5XyaYBQcxfeZ6_y-5ClW8fNCODN_TuxGeXz7tptrcmZ_vRr7lpLtXHSx-Lx62CnZSZW_4zUdRMxohl7uZgXySecgajagzNAAMm_ei3sNnXBOCVzWbSzgBaFy4IiHR3F70QkOEQ8EGcrkHLIdpd-pIx6I93-F8hX45mpO1W5dcHj_op6NM0kf3pgaCJlsppinQesHHaeVq2KEbQnzkOwEY63aJCIajoL85ATp6wcsshN1hg-XEZ9KVbnPBdwlYCxkoWG6rrYCIiRQHlmA2f0JAWPKwdycfzYa5-VgIfDR6ZVVC9OhyLRIAUVTRtnxifS12qq2p4sU5-tpAL5cEMLEL-9F6yF7vzDFGO7_LXllnG4BHVRtKvGoSbvNbmSzjRG1gbBDSq_y5HoxtNzBDT8m8wjwadmvE_wTO0O3b7Vz9zs6XYhiPJMG3pgQnl-Uxm5XPHEM7nFHqkg_HN7L9WZmKnHdYvjcr9TRA2vH88z6tjJG1VMevKSHVCaGZqdX-wr7mZSuIghMl27rDa5o9O-1gPDqjEP-_1n8aIcqgoDGC7g43B1sN11HqTW6csRBdqqbAZHHn0LiICHFKAOGh2-k5PzmioBZmdjcsvvdptKfu_c0AMlYCCFNOR9ACjVC-YM_gZjcjZZRnCku3pNMRc9Z8vi8Rk1rbY2k-3H-aCV7THFWSGzZ0BrW928jPlYSUWA34uJWHtCqc8768ZE1CibHfvzcYe6tqzKDtSVJEd8YBMrOVeCj1oHBUFu2ZhZ36DjZXF8floIn8LEV4Ep4asZfOArK_lNUZCStwh49lho9zq7J4sZ8E2F8XIRDp6Lh4UVfX8PAM8Tc2uF-xuwGiRYVxVRXla4GmAGpQTTneMr0CWxImCsYAa2J8d7-yMWQSwYPp=w563-h375-s-no-gm?authuser=1",
    //2
    "https://lh3.googleusercontent.com/pw/AP1GczO_GoiPJ3-rPj0AMtmfyx-hkBSdlq0aY1BvFWxnIAir7d1I8rTbx4DOYoqWNGRcduYmegwK31kFnsxqLWZD_wHQJT8xmT4Izr62nzrmda8aoZMPaiFIs2hdJDp-cyGN5TphvNTHOxHa0599tLSVG2-dpRuj_riucygVCij-DRwSzXu3I1zQmJ6l3jQXbg9J4PYIpR8wFIEkIxIq80etMoA-a59kxZ0ztxU8hAxMZep8qqBR7H_FeiRhn5JXBFViNqis_yBFMy-9vDn08iEqCe8pmVAX8oAlyUPTs4q55-VcNyTA6ZC-yM09KuZlUSzpVeUewiUW4IJxVserQ8wNKqp0m8GhksDH1Q6PI29L-PvjHtKprHPvIhjmOySPcagwBp1tAo6cChf08a-Eq0c6uJYRIh1AGL01UzEVRnV0NEb_cdTmYU_RghzOmyN3CVEMrvXHbLtEi1HmznIOHj2MhN7jx6VjoJxkBeXpG3t5uHs0OsnqpyZU73TMvQPRd4XnNpI9VYjdl5FExMcFLMKMFfPuMyUNuTo4J8LivYkZScdOG5naoAK8h9-ydlXVsAqfvAJLUjjkiFz8GllNt-CZIsK-WaSvxlZq89tJ6zVd8R4iARXm5ySvHTVXjHKstzWmOEckZcrjMF0t0ddtLibW51Txgao_-AvQidJurZA2sfVvpnGadRj4VDXAUkrfWcih2DS_yMOqrm-KgQo-7c1bb_3inSjZjIeGrhntQJMu_Rb2kMEuhvLBjxOqXuAu-oAH23FyNIjiHPwCYIQgTbuhTVAgLpdA0JdSl3PS5Mos5zUoueGMkyKo5QyKONZYg-K2ZcetZhPLQZiP4XTDcU7mjLKclbtmhQcsKv8rI6dVkD4hWobSPEj-kmxtDfQQ84bYHo0Lqg3ZmcYv9fWM1ybBYDCbQwTSlYyOIaPEuLeRngJQalJX5g7srtO_HV_1=w500-h500-s-no-gm?authuser=1",
    //3
    "https://lh3.googleusercontent.com/pw/AP1GczMnJaYWrME16cjxbBJ8ef5GLwv2tWzrrKZYxfieN0BS-KIaJ8ebMYnaxa9h-lpKayyUp4lMXWrZTxk8msX7eOB02BKLe0BI9vhHGrdgk7PtUHQRcVf3QGGpMJEVw_C0GJhTJo7kaP_UH1E1Ft_w6EtJmz7N0QiEdUfmoJUrCZft1DsCP01QBC67CItKEfJJVR1M16pru3VsSdvvBuKZgk6QD7QSEKEG3deSIkF3ReLyo_8BhkfEHAxY5u2CLbZkio01MbXpdBrvQ6whYTEosywIBfLXCoW9P0hOwxwzDHDsw2-j87uNwxuP_NuiaIzGZ3OsTZRTjYjBJXBRw1XUkDDbW_nFnRdGPwUTqv1bKLtI_sPC-bv-72o_vNjmW_H0AvWkqcHrNuUfrWQ5TOX5enOxcLPM-enUpQUhFXZFeFIrn3SpicUnOqjLF11C4QQ9IYTRS8xVg-oV3woh0Va4YXWbkF-59_2CBVBEGDwLh9ETUB1BkoomvWITqf6h5UdSPhfpWA0BNIyE-Ohvy716BgJ4t2JeyK5mbam5U3scVxEr_JjUSFr6hpMlV8j3vIqDSLg7Ikk_Zwr_Qm-eZDvhMiRrd185rnp_j0qVK0RojPhZIJphMWUjnY_9RCsMTCtag6hQjQboGSP14RlMG-HVd3dxOOeHmdGPYaRl7VbQIY1-0V9ycVlgir-CRrJ9zgrBsaOWnhu6DEU2HlHRcM4_h3-aH8_FpbLgV4IBMM_f7lA1oM4BJfAFp7YkyUoiSbrjvG-AwOSR-U6ApdYG1vzH5uBLed2ukl7t_xjKGEuvEU341UA8tN0SdcnqOfP0HcUi1yXWEQcIm-3zZMHQpfunNyVH4yiNNW7rXCUkucgHKHmBB4OBX-GJAdKSWFx13kQldn6UZVScuZ28Pam9erASyeJWaobOmkvlZDqpdLYMKI5awo6xT0-ALiF2IUAV=w500-h500-s-no-gm?authuser=1",
    //4
    "https://lh3.googleusercontent.com/pw/AP1GczMetvLy3_nD1VsG9fZX2035EADmXNPAYOb9yG0XOQ4P3xd4KUzGGPlhMvWrg7GLlA9F0RYEdFn3MsAf8lfwUrOHlF0vuNWQgRWaV85Ma3M1KZqxgO6jgB8xLki9aBHQuAcE8LEVwFG-ToyWyi5_5yNlI8w92OmNm3lkKNydm9So3aSq5UzXvgKZVjb8J7YJUzaqoTRn3VWVVh3yDPz1TJEGI90Vnyr7HpVZlXBZ4XBBopgsg1xLtSfiGTw7V8xrbrAWJSL8GdpanuzHRyOO2mx84h_sUH4TIf1Yf7jDm3G8WCI0FDZjj0cFzwn6d7izSgybJwE1KgkmRuZqQm8yfm2xl6pf-5e84p5NE_m1VeKoxo0ziFkKRtTlMsN7Emrv6i0ni3whqOm1soOpEbYKox0EQ2RBDh_Eisfrq7Y-JBRgXqy2V43PAz5AqKlARclMnt3NqjKXpDtj-TgU50xqy0tm2I8BybXePJ5Y-e7yBlQhpaFcSjIiRyaR9zCRmHn8jQJ7i1TIp3sflTiHTN345uXXZEfOGHOd-SKu1L2YKeQTV2QRcz_AAPzcvkdqTNLA5qwkKmU8Ab1SdZ_M2xS7pFhUHRIvMB4eP8R8JPteX6rel0kWDox6TFd28ZxHsMRgDxY4BZLrtzF1UFTGqzqXCU03L-PBx-diDA6RURV1ysLo9R4xhdJHCmrwiw5rkJDbuiaRvdPc3-HbLbJjOIZ57aQQmecSz3EZ7zxYqryL_qoyfHKXb9yGIPRd3w9dTZWAh2jql6kI6v7TA8-Se-HZavDqS2gU4rQTSiEZihZfBkN3QTA_8WZpOy83C3dEuxK9lwdXVfZK5UGV58XVXnkWAjj4gH-o_5kNAyN4ir4UNEJjHAv3iuE5WSEMPdK23FmQkFnqCXX-j6asMp02ww1fv__EKEXoGr1ELEmrH45RuuS8Q1T1G0kCocGrNb9S=w385-h358-s-no-gm?authuser=1",
    //5
    "https://lh3.googleusercontent.com/pw/AP1GczMIGDkdkToCHMD8OAm-KgwFYumyj55vFKDvNY-BE00iRKT_nvm74jWbN9SPS8WiLRTVEM3559_dRzeDjfruc6F4pcpACG0levO8q38rLPDxidQedzJKwTPoU7E0LTErjNi01GiERhuN0DjGdjL7tnGRHvRwCZefj3zD245zWSAFcJ9_RxYwyqUr1GO6QTx90MX8l5_ENDWigtZ_k3FcahQ065u10gmNnGUkPew6duMmShmKPXMok9PtnUnDv6l2sv7g1aKxnERMQZBFlQ0I7h0zSHD3jfxsgqzJCq5r4MUZ376ETkSj3_Lk1gOSPad0ROYF2iDNn8DbXop_eUibO3awQeshHGmL7tWO2c3QW6c_8J0xrey-mjqGtvLMmuHc1mF9Wl-pSj1EwWbb0uBwge0c9jpMZcgXCYlYfHEOV-ZYiEOtiIlELxNzgU96cXGN_4fZjgMbqDxg14wTKAxJYdPywsiOMRMWkPCpWCEbAXOmjsYP5kTb8PUuVT-NRMEjor6xyi6Wks3pISneAv6jO6rYgymmaGQ8TbU9VuCZP4ca5gZluwaMdaP3YZgMu32NqgDu_lJbNfHbjn6Ahh0r0D3LmLGUDmkdVwlmpqIKj83tGt29Zozktgm7lQanwcPmS3c4go3GGU2IdSpvPbvDQ5B1EfOw0ENsajWWRuBHNvRXDnFb9PxlcjPJh_SIQ1FnUNv_wTha4pg0LVTd2uX6lkIiHhLh_ShWhrg6bi92TwwQnDydPuHC2UGCk1sykkhyi-3NUJ33J21qww_y5zO5_cEnCGHdPCHoDNyySPsuJSj3bNvQ72epNL1k8agVGe9_zTKAWaRDspk-jNEFZ7wt5OTlv4f_eO7b-kt1RpGpSoQq5qNGeZY3iN3WUhkSODzCZ2yl_Q4jRDfRijFu5-s1VUHONzmuZW05jzMBAto85eg2Xkf9Ci50hsjnG7uo=w408-h612-s-no-gm?authuser=1",
    //6
    "https://lh3.googleusercontent.com/pw/AP1GczM4fVKZC1KM9z4kZm8xY4puX080291uN0nWdg0Vs-_jJCyOiGsb29zUyvAmzywzXsdHZijuFHtFt3TkA0HJrr273BBgF2GPutI3ssv9UExO7ABJOiVN12sS4TNUWTYDhRzDZSYqwBKOSuJhrgVC_rx-I95IF-6w5QT9RjyGvQ4iHJBufu1QRfMO4mDSDVJVGusqjGtedfcdiBNZrMNnfFBBTJMQ3_iy1f3YLHWq9dVyW9vyIwzoGKA7YlV_jId_lII9kT8JcajRHbQ_ta0aQ913LBTJkH0ty7q6KLytg9qThMp7ZUhadjBbMoYW1uKOSw1BQAp_btvV2KDkXaC9hBEjy-_fgJRkFlXFUB3ODksSP5OmkxQQubA7kfGQnj6EXLZzbE8hoQwOMzBcDtz6piTIy0BqhB5f-G8kyflSAtH1T4mQ-kiJcNRquDYlZNgVIItwon4cHoV3zayzBEGNC7oD2Mo8g_vekn6G71Qc8BHykcMHYxN7eYUNlfffwYi4m3gNQTkmkP0uVaWdD1SD10K0vEt_0Yembjd7F1zXmOFogWkdbDohILTibofUqc_KA3eRCsUT7-Ehm0I09E9ja4CFWqQxgkaWcxTCAYNUDmnWY_RhH65wu5_F4NTZUyK5TBF3tkjQUX9N3B98o1JhShIS-CXaiHkMfHZLcfqR69QrtZjKJHFPHL6rnmNTb15l4nlUqxhWm0SM9fSKmp4Q-Elmo8tYpnIccP4RBmJbsJvtUVSeUlWFArPTXo-hcqEFz4lyGf8dopFrmoaOB3waNY520RWbG20oHSND2akLtegJNi6ChLd6CXxsnwhDRdj8I7yGb4qDpKmGLEJmXqpyj5puA2OQXHN4pIukj1pvELvN7Sv7Wtl-4EjrnnCijNEHDonToPdG1jRzAlHPK1TLV8DJoy73USgv5DPB_BWL6dC65T8iQN6Xb1Cp-EgB=w464-h538-s-no-gm?authuser=1",
    //7
    "https://lh3.googleusercontent.com/pw/AP1GczM8IYj7Y7Ma6TiiJpupYlZ2HCs8SK5H69fjiQ9Lg2jHK4gfyUApr2Zh-35tnnyhYVotLXHsui-7EMm0ysxcAhTGmr1AfrabxHVVDDR61K-3F3lKRyLEHvv058YAqxMkpJLRIDEpM3v4C9TJS7z3PtaUmBzNcMw5DryAfvgq-QbFw0zA4rI6qfBdodaJCqMtGWw582M1a9_rKVu83iMm1q4NjhbI74O5Q4vAUgjut_p8-0E2koU1AsO3t246uajVYfup9s7gjk-NMGVfsY1cISZ_GoF3HxvWEUedA83aFRQGxkPlo5s-vZziNBAp_1okKgUesZi56WVGn0Ugjo0ZevvNka_HUN25A1nnk17TgzklPDyu8E9QD_u1KM-6gAi3YQVfbMqDhUqbwHo5UiCgC_eO-3axh5lLcZ_LTGlOS5hDB1EPp-9v0n9_H5oxbZ8cH06haYs1qR_oI8KlVHImXUAom14YmXi4IpVeS8GduxrDqv5jhwv-MvOcPvOelx4O14swJJPejAmnc5CYQaRERFumtMdaf0R9YEfEzAcJtjpcabsTrfVQKB8mRJJr_6NXEQuLegKf14gQVVJWHE0QgwAwYsHg2R1I9ajBHF8hGceXdT7bHbyLN6yn6k5JAgGN1qHK_8aZfag9IVIs2aspDeaLXnXXz0kb4px8o4pxNOhAu-F4g6So8oPAzS8DC3Wr0dm81IPISLlrbwc40j5afAgyttbtPDWyMZQr83SWJBtOXIn-hfTJzjOZ779PaPLywoPJbP4__EOo1lB0eqf8IlRZvLmkfCdmVZqGa1FP6OzREs4qIAG6EtAlorlEr2u9h53L-bdLR1NPEa-2uo6q1M4c4Bg66wwPzcMcmGMn7NiLBgGcuXtPiy5qc2729S9OENCYS3zN6g_TdidSxsfoQRMBhTMLpUSCA2eT_wH8_TE_HvLeEV0dCar-GwrB=w433-h577-s-no-gm?authuser=1",
    //8
      "https://lh3.googleusercontent.com/pw/AP1GczOWt4QvXdeP06vfgqciRAnfNPEyqY1GlPtaXEncLf6G4Dn8Aq8MAdw5PEMfH1dDdPEOg7FQQ8nxQIZtXPnhn3r5vyGp6AQFkiY0KDj8NyfPdBScCyAc0Cj73BO7d4ddBKzW7Xl3-FUZ7UbfhDjoyHETd0dvANnE9GMAPLzLIT0SoLszHcJlRr7c8RNl3EHJ7OMHUsO_BZlKYP2z8epoe1XpHyyZ_Q3ZlJ6m3farKnD24pBpJxRInXo0vodb5lfALATovk0Sj7BXWLmV9hUDUd3ZfmHmH-o_RujwQ7TMSJIRI8Rr1f2vcySTB5W4kTX2AxVHP04Fy0HHvBwQu9bOMkv3D8EPG0N2xivAgPBpeVLq8E7ryZD3krYvAo7U0jjjnwQKVUVxhq-BvqrQGcGLVd--MNC-9VltomJz5oG8oG2mdvRyMxzm664zzr6RGQMONXXBxkqOGZ9DdU8KbCAcmOfvkGX-n7mqcGfyGRjpNyqNaZrYDikUcmW6bCMtbw-VJNaRtzQRhqb_PjOLvtsKOeW3kPN3RaGxrLQOLuhv-uLuxtndU0E_vg3OCWelv_0uxqpQ3D9bzsaWHYFqkTb2qCW8KRFQi5mqePzXlUtx8GIabaLAUShu84G2cXYXgtKWrQt5TjtRKUprPwlxYKBt-k2HWgx_zNYvaUhnHpAu0zK8CpM7I6MPsMEHA15ogFRea6xW4mnZtk4yZyztd9Pct4fhEUSK9kyepAgUWG4TzFJlShk8x3W8VHZTNP1nAy0lpWfE1325jkyoAMKOdhXomJKL8aSp2dItCK7YXmkmDBmvI6EgZtDnmcttqMzU3rPiG87slmHrPjHwdBYsvzwuCc4uUlaOMlMtoB4_ENjqdDJF3XfSmCFMAKBiJYz7hFvkPdshroUGy1OvUY6D1juHw0XLjRN9DS_OfDuZosx5miU4N7ah12rXc5WP-PJx=w432-h577-s-no-gm?authuser=1",
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
}

// zene lejátszása és megállítása
play.addEventListener("click", function () { 
    audio.play();
});

pause.addEventListener("click", function () { 
    audio.pause();
});

// play gomb megnyomásakor megjelenik a körvonal, pause gombról eltűnik
audio.onplay = function() {
    play.classList.add("outlined");
    pause.classList.remove("outlined");
};

// pause gomb megnyomásakor megjelenik a körvonal, play gombról eltűnik
audio.onpause = function() {
    play.classList.remove("outlined");
    pause.classList.add("outlined");
};
