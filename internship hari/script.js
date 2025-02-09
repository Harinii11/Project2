
let currentIndex = 0;
let slides = document.querySelectorAll('.slide');
let thumbnails = document.querySelectorAll('.thumb');
let touchStartX = 0;
let touchEndX = 0;

function showSlide(index) {
    if (index >= slides.length) currentIndex = 0;
    else if (index < 0) currentIndex = slides.length - 1;
    else currentIndex = index;

    slides.forEach((slide, i) => {
        slide.style.display = (i === currentIndex) ? "block" : "none";
    });

    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active-thumb', i === currentIndex);
    });
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

function setSlide(index) {
    showSlide(index);
}

let slideInterval = setInterval(nextSlide, 3000);

document.querySelector('.slider-container').addEventListener('mouseover', () => {
    clearInterval(slideInterval);
});
document.querySelector('.slider-container').addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 3000);
});

document.querySelector('.slider-container').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.slider-container').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchStartX - touchEndX > 50) nextSlide();
    if (touchEndX - touchStartX > 50) prevSlide();
}

showSlide(currentIndex);
