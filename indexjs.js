document.addEventListener("DOMContentLoaded", function() {
    const borderChoice = document.getElementById("boardChoice");
    const contentDiv = document.querySelector(".content");

    document.getElementById('boardChoice').addEventListener('click', function() {
        contentDiv.innerHTML = '';
        
        const images = [
            "https://media.discordapp.net/attachments/1229720027574304900/1230136296609943612/hp_background.jpg?ex=663238b3&is=661fc3b3&hm=88658657964911388edcbf5c48fe67a356aae75cce7790c37e10a662adc0afdc&=&format=webp&width=824&height=464",
            "https://media.discordapp.net/attachments/1229720027574304900/1229720946731122709/hatter.jpg?ex=6630b5e0&is=661e40e0&hm=04af5f7df764d2da72dfaf8a6de6eb2769af41e23f6754a67039e414f45ff3d9&=&format=webp&width=824&height=464",
            "https://media.discordapp.net/attachments/1229720027574304900/1230141863676350544/lamborghini.jpg?ex=66323de3&is=661fc8e3&hm=484df676945abfbbd3a0f06fb786a9744e6435dd1ca639ff04a424d8c2763262&=&format=webp&width=824&height=464",
            "https://media.discordapp.net/attachments/1229720027574304900/1230137892425437265/IMG_3762.jpg?ex=66323a30&is=661fc530&hm=36e51e4b724e0b2795609dc9ce84ce46425bf60e2bba1a47ad6c119580d41d85&=&format=webp&width=824&height=464",
            "https://media.discordapp.net/attachments/1229720027574304900/1230139204890005564/Lord_Of_the_rings.jpg?ex=66323b69&is=661fc669&hm=737596e29984a86df31a953639727ba831dd199ad5050bbba45f79ab67c99258&=&format=webp&width=961&height=405",
            "https://media.discordapp.net/attachments/1229720027574304900/1230140853712850974/disney.jpg?ex=66323cf2&is=661fc7f2&hm=4faf002e4b5e54ebd5898173ed925c736660b1cb483ddfdcab0b2f233139f2cf&=&format=webp&width=742&height=464",
            "https://media.discordapp.net/attachments/1229720027574304900/1230144635284881478/alcohol.jpg?ex=66324078&is=661fcb78&hm=08bdfc90c02af91358d8f3bf916d598f6bbf123824708d7ddb4ad6ee35ac0d22&=&format=webp&width=696&height=464",
            "https://media.discordapp.net/attachments/1229720027574304900/1230149967218344017/lion.jpg?ex=6632456f&is=661fd06f&hm=8089eebcb9678e254c11a09fe23b779c1ca34b26cfd5860301ef4e622fb9fb39&=&format=webp&width=824&height=464"
        ];
    
        const imageTrackDiv = document.getElementById('image-track');

        images.forEach((imageUrl, index) => {
            const container = document.createElement('div');
            container.classList.add('container');
            container.id = `game${index + 1}`;

            const img = document.createElement('img');
            img.classList.add('image');
            img.src = imageUrl;
            img.draggable = false;

            container.appendChild(img);
            imageTrackDiv.appendChild(container);
        });

        const newStyleSheet = document.createElement('link');
        newStyleSheet.rel = 'stylesheet';
        newStyleSheet.href = 'palyak/boardchoicestyle.css';
    
        const originalStyleSheet = document.querySelector('link[href="indexstyle.css"]');
        originalStyleSheet.remove();
    
        document.head.appendChild(newStyleSheet);
       
        initBoardChoice();
    });
});
