const cardContainer = document.getElementById('card-container');
const resetButton = document.querySelector('button');

const allImages = Array.from({ length: 78 }, (_, i) => `c${i + 1}.png`);
let cards = [];

function createCard(image) {
    const card = document.createElement('div');
    card.classList.add('card');

    const front = document.createElement('div');
    front.classList.add('front');
    front.style.backgroundImage = `url('images/${image}')`;

    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = 'url("images/background.png")';

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', () => flipCard(card));

    return card;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function resetCards() {
    shuffle(allImages);

    cards.forEach((card, index) => {
        let imageName = allImages[index];
        imageName = findValidImage(imageName, index);

        card.querySelector('.front').style.backgroundImage = `url('images/${imageName}')`;
        card.classList.remove('flipped');
        card.querySelector('.front').style.display = 'none';
        card.querySelector('.back').style.display = 'block';
    });
}

function findValidImage(imageName, currentIndex) {
    const imagePath = `images/${imageName}`;
    const imageExists = new Image();
    imageExists.src = imagePath;

    if (!imageExists.complete || typeof imageExists.naturalWidth === "undefined" || imageExists.naturalWidth === 0 || isImageAttached(imageName, currentIndex)) {
        const validImages = allImages.filter(img => !isImageAttached(img) && doesImageExist(img));
        return validImages[Math.floor(Math.random() * validImages.length)];
    }

    return imageName;
}

function doesImageExist(imageName) {
    const imagePath = `images/${imageName}`;
    const imageExists = new Image();
    imageExists.src = imagePath;
    return imageExists.complete && typeof imageExists.naturalWidth !== "undefined" && imageExists.naturalWidth !== 0;
}

function isImageAttached(imageName, currentIndex) {
    return cards.some((card, index) => index !== currentIndex && card.querySelector('.front').style.backgroundImage.includes(imageName));
}

function flipCard(card) {
    card.classList.add('flipped');
    card.querySelector('.front').style.display = 'block';
    card.querySelector('.back').style.display = 'none';

    //if (cards.every(card => card.classList.contains('flipped'))) {
    //setTimeout(() => {
    // resetCards();
    // }, 1000);
    //  }
}


for (let i = 0; i < 4; i++) {
    const imageName = allImages[i];
    const card = createCard(imageName);
    cardContainer.appendChild(card);
    cards.push(card);
}

resetButton.addEventListener('click', resetCards);

