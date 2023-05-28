const images = ["spring.jpg", "summer.jpg", "fall.jpg", "winter.jpg"];
const index = Math.floor(Math.random() * images.length);
const image = images[index];

document.body.style.backgroundImage = `url(img/${image})`;
