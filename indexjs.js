document.addEventListener("DOMContentLoaded", function () {
  const boardChoice = document.getElementById("boardChoice");
  const contentDiv = document.querySelector(".content");

  document.getElementById("boardChoice").addEventListener("click", function () {
    contentDiv.innerHTML = "";

    const images = [
      //hp
      "https://lh3.googleusercontent.com/pw/AP1GczO6Kw05h6y21acd-9SQSN5CZ5bUp28W2_8p8CE85h_yCqJeOHYJLhaEFPXbl9qdvgAo3LQZncWGb8_ePZALdON1o-sncafIlOBhxWh5nM-JE2OBy4RttQ_-4vE3ecm_dgH5vHfu9QWlF404qJkIRuI=w1080-h607-s-no-gm?authuser=0",
      //got
      "https://lh3.googleusercontent.com/pw/AP1GczNu-htEEAcqjIDSZsIMgVcgkWzW2H4opLedO7NikTIQd5v75VFjuvGM3HA7fXvjY0P7adSiY9yFClLeJG4c2Bt0CaggomXJEirrft9PuOQi2qfpIcciMnjbXIH9HfOsnv8BpMAzPszRRS7NDK4jpG0=w1639-h922-s-no-gm?authuser=0",
      //kocsi
      "https://lh3.googleusercontent.com/pw/AP1GczPeumNTkHCrPbASSfd3CoqRn_P8ZAXVoZPjM8pVtCYFT7jL-E838q3i-kksTZbMme5uTZbLOIdlYVSFr0IYLAv6nbmJU36LPPgay9dHBMoRkR0GeiWgvQF2QnWsutGHWuZJTqgqP-s0P3NUN7cr7GY=w1639-h922-s-no-gm?authuser=0",
      //sw
      "https://lh3.googleusercontent.com/pw/AP1GczNequYJOIlLRGCAWDNZQrEOcpVRMzqigE9fS0EsuYISxkD-nWXw8LylUEA3Rxdi2LUddXIEKO8uqCoQs6_PneNgo4szKiqWpF4U7Dls3c0MPXBIEvSY8SJrY4QenbGy-9OBgi4-lAu8BK8qkXdAyRQ=w1639-h922-s-no-gm?authuser=0",
      //gyuruk
      "https://lh3.googleusercontent.com/pw/AP1GczNZ2pMHcbjKd_IlyIFj6aHzxJ2EC4eG3q6K59Q2EQQX-j03DO-dXJeqF4lJ4FwunCnvkNJTCQ_4MwmzdFApLz69arttl-qMfeeGA4PWJ5wY96QT2rOtgevvPNa3cLodZS7XpKlJF7YHVcXwyHEzNJtq=w1475-h922-s-no-gm?authuser=0",
      //mesek
      "https://lh3.googleusercontent.com/pw/AP1GczODmERn-4GiyBmgfLFfNJxneiHnSPfUtMr2E-blLoktS0JbGUWUnA9C2as4SioXOGVdDOioGxgd5bSo_QW8yjtJOAcmVyvAOE0dshM--Iv5BGQXJLtSmnq4tRiV3cp5W185YNlIESB3TOD6xU7xs88=w1475-h922-s-no-gm?authuser=0",
      //piak
      "https://lh3.googleusercontent.com/pw/AP1GczNR-EkMwanlLZKD7Tp8G18kjC8w9tLjc440QoHXm_tUyMctMJT9snNs7XKtdEWcs2eXmmvrf7H43rJyDfcg95lJUJBSRFPAMdqMLyTC3jXbhItujFLfaP0tH9OnGL3ugxPvZjNEONsKaTEytvp9Kpoy=w1388-h922-s-no-gm?authuser=0",
      //allatok
      "https://lh3.googleusercontent.com/pw/AP1GczOF_xY9JWontaOxpeRmCk9oSddAOOxJYoM9iHCbyfQlZFHnrt2IwKl8XPSzqlTotpgfxJty4qj0GdZ2R4o1RzX1DsLBG-NmlRY4iOKd3GCYtmqGZnNBbgbuQ9293pJBSksLJE3GrTy4vACz1RnsMCuV=w1639-h922-s-no-gm?authuser=0",
    ];

    const imageTrackDiv = document.getElementById("image-track");

    images.forEach((imageUrl, index) => {
      const container = document.createElement("div");
      container.classList.add("container");
      container.id = `game${index + 1}`;

      const img = document.createElement("img");
      img.classList.add("image");
      img.src = imageUrl;
      img.draggable = false;

      container.appendChild(img);
      imageTrackDiv.appendChild(container);
    });

    const newStyleSheet = document.createElement("link");
    newStyleSheet.rel = "stylesheet";
    newStyleSheet.href = "palyak/boardchoicestyle.css";

    const originalStyleSheet = document.querySelector(
      'link[href="indexstyle.css"]'
    );
    originalStyleSheet.remove();

    document.head.appendChild(newStyleSheet);

    initBoardChoice();
  });
});

document.getElementById("exitGame").onclick = function () {
  window.close();
};
