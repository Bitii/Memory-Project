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
    //Link1
    "https://media.discordapp.net/attachments/1229720027574304900/1235988786203070645/img-1.png?ex=66365fc2&is=66350e42&hm=4573d2943eb319161f728b26acbd0e08b3548045f0f175a565a7996de3101a42&=&format=webp&quality=lossless",
    //Link2
    "https://media.discordapp.net/attachments/1229720027574304900/1235988786492473447/img-2.png?ex=66365fc2&is=66350e42&hm=053f95f9bbed5b55083afbbe1e178fb678cfba2f47a194c33074c1a8cf8afda4&=&format=webp&quality=lossless&width=315&height=473",
    //Link3
    "https://media.discordapp.net/attachments/1229720027574304900/1235988786773758042/img-3.png?ex=66365fc2&is=66350e42&hm=9b1cc972c8164037e2e9e238d669e01e7742c8beb328f0135033e2053d9cbf81&=&format=webp&quality=lossless&width=473&height=473",
    //Link4
    "https://media.discordapp.net/attachments/1229720027574304900/1235988787117424701/img-4.png?ex=66365fc2&is=66350e42&hm=c99c2e321cb3b90214fdf8ee38b9b42c8dd5ae5e5cdca8e0d841775809684df1&=&format=webp&quality=lossless&width=473&height=473",
    //Link5
    "https://media.discordapp.net/attachments/1229720027574304900/1235988787449040896/img-5.png?ex=66365fc2&is=66350e42&hm=86874bec5867265c432d1e9fa0bd8854dbd607d36f3479618c135aaa290b6e16&=&format=webp&quality=lossless&width=355&height=473",
    //Link6
    "https://media.discordapp.net/attachments/1229720027574304900/1235988787708825691/img-6.png?ex=66365fc2&is=66350e42&hm=c8a0ee579b2acfa36beb5dd73172458b219b78e3ff89b7223beaa588785656b5&=&format=webp&quality=lossless&width=408&height=473",
    //Link7
    "https://media.discordapp.net/attachments/1229720027574304900/1235988788061143173/img-7.png?ex=66365fc2&is=66350e42&hm=616f56543f05854a9bd9d24771ea7e9dff540dd6223b49f3332fc3fcde100cee&=&format=webp&quality=lossless",
    //Link8
    "https://media.discordapp.net/attachments/1229720027574304900/1235988788304678912/img-8.png?ex=66365fc2&is=66350e42&hm=fd0859f22b7d261e8641c71ba5fe1bcb21f849e1c8241715619eb21038c6c90e&=&format=webp&quality=lossless&width=354&height=473",
    //Link1
    "https://media.discordapp.net/attachments/1229720027574304900/1235988786203070645/img-1.png?ex=66365fc2&is=66350e42&hm=4573d2943eb319161f728b26acbd0e08b3548045f0f175a565a7996de3101a42&=&format=webp&quality=lossless",
    //Link2
    "https://media.discordapp.net/attachments/1229720027574304900/1235988786492473447/img-2.png?ex=66365fc2&is=66350e42&hm=053f95f9bbed5b55083afbbe1e178fb678cfba2f47a194c33074c1a8cf8afda4&=&format=webp&quality=lossless&width=315&height=473",
    //Link3
    "https://media.discordapp.net/attachments/1229720027574304900/1235988786773758042/img-3.png?ex=66365fc2&is=66350e42&hm=9b1cc972c8164037e2e9e238d669e01e7742c8beb328f0135033e2053d9cbf81&=&format=webp&quality=lossless&width=473&height=473",
    //Link4
    "https://media.discordapp.net/attachments/1229720027574304900/1235988787117424701/img-4.png?ex=66365fc2&is=66350e42&hm=c99c2e321cb3b90214fdf8ee38b9b42c8dd5ae5e5cdca8e0d841775809684df1&=&format=webp&quality=lossless&width=473&height=473",
    //Link5
    "https://media.discordapp.net/attachments/1229720027574304900/1235988787449040896/img-5.png?ex=66365fc2&is=66350e42&hm=86874bec5867265c432d1e9fa0bd8854dbd607d36f3479618c135aaa290b6e16&=&format=webp&quality=lossless&width=355&height=473",
    //Link6
    "https://media.discordapp.net/attachments/1229720027574304900/1235988787708825691/img-6.png?ex=66365fc2&is=66350e42&hm=c8a0ee579b2acfa36beb5dd73172458b219b78e3ff89b7223beaa588785656b5&=&format=webp&quality=lossless&width=408&height=473",
    //Link7
    "https://media.discordapp.net/attachments/1229720027574304900/1235988788061143173/img-7.png?ex=66365fc2&is=66350e42&hm=616f56543f05854a9bd9d24771ea7e9dff540dd6223b49f3332fc3fcde100cee&=&format=webp&quality=lossless",
    //Link8
    "https://media.discordapp.net/attachments/1229720027574304900/1235988788304678912/img-8.png?ex=66365fc2&is=66350e42&hm=fd0859f22b7d261e8641c71ba5fe1bcb21f849e1c8241715619eb21038c6c90e&=&format=webp&quality=lossless&width=354&height=473"
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
